import json
import re
from datetime import datetime, timezone

from app.config import Settings, get_settings
from app.prompts.system import build_retry_prompt, build_system_prompt, build_user_prompt
from app.schemas.request import GenerateRequest
from app.schemas.response import GameContentPackage
from app.services.llm import chat_json, create_client


def _strip_markdown_fence(text: str) -> str:
    text = text.strip()
    match = re.match(r"^```(?:json)?\s*([\s\S]*?)\s*```$", text, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    return text


def _extract_json_object(text: str) -> dict:
    cleaned = _strip_markdown_fence(text)
    decoder = json.JSONDecoder()

    for i, char in enumerate(cleaned):
        if char != "{":
            continue
        try:
            data, _ = decoder.raw_decode(cleaned[i:])
        except json.JSONDecodeError:
            continue
        if isinstance(data, dict):
            return data

    raise json.JSONDecodeError("No JSON object found", cleaned, 0)


def _parse_package(raw: str) -> GameContentPackage:
    data = _extract_json_object(raw)
    return GameContentPackage.model_validate(data)


def generate_content(
    req: GenerateRequest,
    settings: Settings | None = None,
) -> GameContentPackage:
    settings = settings or get_settings()
    client = create_client(settings)
    system = build_system_prompt()
    user = build_user_prompt(req)

    last_error: str | None = None
    raw = ""

    for attempt in range(2):
        try:
            if attempt == 0:
                raw = chat_json(client, settings, system, user)
            else:
                retry_user = build_retry_prompt(raw, last_error or "unknown")
                raw = chat_json(client, settings, system, retry_user)

            package = _parse_package(raw)
            package.generated_at = datetime.now(timezone.utc).isoformat()
            return package
        except (json.JSONDecodeError, ValueError) as e:
            last_error = str(e)
            if attempt == 1:
                raise ValueError(
                    f"Failed to parse LLM response after retry: {last_error}"
                ) from e

    raise ValueError("Generation failed")
