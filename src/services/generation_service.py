import json
from datetime import datetime, timezone

from pydantic import ValidationError

from src.config.settings import Settings, get_settings
from src.prompts import optimize_prompt
from src.prompts.router import get_prompt_builder
from src.schemas.copilot import (
    CONTENT_TYPE_LABELS,
    ContentEvaluation,
    ContentVersion,
    CopilotGenerateRequest,
    CopilotGenerateResponse,
    CopilotMeta,
    CopilotOptimizeRequest,
    CopilotOptimizeResponse,
)
from src.services.llm_service import chat_json, create_client
from src.utils.text_utils import extract_json_object

MAX_ATTEMPTS = 3
PROJECT_NAME = "AI Game Content Copilot"


def _normalize_evaluation(data: dict) -> ContentEvaluation:
    ev = data.get("evaluation", data)
    dims = (
        "persona_consistency",
        "creativity",
        "usability",
        "language_style",
        "immersion",
    )
    total = ev.get("total")
    if not total:
        total = sum(int(ev.get(k, 0) or 0) for k in dims)
    return ContentEvaluation(
        persona_consistency=int(ev.get("persona_consistency", 0)),
        creativity=int(ev.get("creativity", 0)),
        usability=int(ev.get("usability", 0)),
        language_style=int(ev.get("language_style", 0)),
        immersion=int(ev.get("immersion", 0)),
        total=int(total),
        summary=str(ev.get("summary", "")),
        suggestions=list(ev.get("suggestions") or []),
    )


def _build_retry_user(raw: str, error: str) -> str:
    return f"""上一次输出无法通过 JSON 校验：{error}

请仅输出修正后的 JSON，必须包含 versions（A/B/C 三个）与 evaluation 字段。
错误片段：
{raw[:1500]}
"""


def generate_copilot_content(
    req: CopilotGenerateRequest,
    settings: Settings | None = None,
) -> CopilotGenerateResponse:
    settings = settings or get_settings()
    client = create_client(settings)
    label = CONTENT_TYPE_LABELS[req.content_type]
    builder = get_prompt_builder(req.content_type)
    system, user = builder(req.character, req.content_type, label, req.user_requirement)

    last_error: str | None = None
    raw = ""

    for attempt in range(MAX_ATTEMPTS):
        try:
            if attempt == 0:
                raw = chat_json(client, settings, system, user)
            else:
                raw = chat_json(
                    client,
                    settings,
                    system,
                    _build_retry_user(raw, last_error or "unknown"),
                )

            data = extract_json_object(raw)
            versions = [ContentVersion.model_validate(v) for v in data.get("versions", [])]
            if len(versions) < 3:
                raise ValueError("Expected 3 versions (A, B, C)")

            evaluation = _normalize_evaluation(data)
            generated_at = datetime.now(timezone.utc).isoformat()

            return CopilotGenerateResponse(
                meta=CopilotMeta(
                    project_name=PROJECT_NAME,
                    generated_at=generated_at,
                    content_type=req.content_type,
                    content_type_label=label,
                ),
                versions=versions,
                evaluation=evaluation,
            )
        except (json.JSONDecodeError, ValueError, ValidationError) as e:
            last_error = str(e)
            if attempt == MAX_ATTEMPTS - 1:
                raise ValueError(
                    f"Failed to parse Copilot response after {MAX_ATTEMPTS} attempts: {last_error}"
                ) from e
        except Exception as e:
            last_error = str(e)
            if attempt == MAX_ATTEMPTS - 1:
                raise ValueError(f"Copilot generation failed: {last_error}") from e

    raise ValueError("Copilot generation failed")


def optimize_copilot_content(
    req: CopilotOptimizeRequest,
    settings: Settings | None = None,
) -> CopilotOptimizeResponse:
    settings = settings or get_settings()
    client = create_client(settings)
    label = CONTENT_TYPE_LABELS[req.content_type]
    system, user = optimize_prompt.build_messages(
        req.character,
        req.content_type,
        label,
        req.user_requirement,
        req.selected_variant,
        req.selected_content,
        req.user_feedback,
    )

    raw = chat_json(client, settings, system, user, temperature=0.6)
    data = extract_json_object(raw)
    evaluation = _normalize_evaluation(data)
    optimized = str(data.get("optimized_content", "")).strip()
    if not optimized:
        raise ValueError("LLM returned empty optimized_content")

    return CopilotOptimizeResponse(
        optimized_content=optimized,
        evaluation=evaluation,
        generated_at=datetime.now(timezone.utc).isoformat(),
    )
