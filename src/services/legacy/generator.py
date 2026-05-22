import json
from datetime import datetime, timezone

from pydantic import ValidationError

from src.config.settings import Settings, get_settings
from src.prompts.legacy import build_retry_prompt, build_system_prompt, build_user_prompt
from src.schemas.legacy import GameContentPackage, GenerateRequest
from src.services.llm_service import chat_json, create_client
from src.utils.text_utils import extract_json_object

MAX_ATTEMPTS = 3


def _parse_package(raw: str) -> GameContentPackage:
    data = extract_json_object(raw)
    return GameContentPackage.model_validate(data)


def generate_legacy_content(
    req: GenerateRequest,
    settings: Settings | None = None,
) -> GameContentPackage:
    settings = settings or get_settings()
    client = create_client(settings)
    system = build_system_prompt()
    user = build_user_prompt(req)

    last_error: str | None = None
    raw = ""

    for attempt in range(MAX_ATTEMPTS):
        try:
            if attempt == 0:
                raw = chat_json(client, settings, system, user)
            else:
                retry_user = build_retry_prompt(raw, last_error or "unknown")
                raw = chat_json(client, settings, system, retry_user)

            package = _parse_package(raw)
            package.generated_at = datetime.now(timezone.utc).isoformat()
            return package
        except (json.JSONDecodeError, ValueError, ValidationError) as e:
            last_error = str(e)
            if attempt == MAX_ATTEMPTS - 1:
                raise ValueError(
                    f"Failed to parse LLM response after {MAX_ATTEMPTS} attempts: {last_error}"
                ) from e
        except Exception as e:
            last_error = str(e)
            if attempt == MAX_ATTEMPTS - 1:
                raise ValueError(f"Generation failed: {last_error}") from e

    raise ValueError("Generation failed")
