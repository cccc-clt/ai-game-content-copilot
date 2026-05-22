import json

from pydantic import ValidationError

from src.config.settings import Settings, get_settings
from src.prompts import evaluation_prompt
from src.schemas.copilot import (
    CONTENT_TYPE_LABELS,
    ContentEvaluation,
    CopilotEvaluateRequest,
)
from src.services.generation_service import _normalize_evaluation
from src.services.llm_service import chat_json, create_client
from src.utils.text_utils import extract_json_object


def evaluate_content(
    req: CopilotEvaluateRequest,
    settings: Settings | None = None,
) -> ContentEvaluation:
    settings = settings or get_settings()
    client = create_client(settings)
    label = CONTENT_TYPE_LABELS[req.content_type]
    system, user = evaluation_prompt.build_messages(
        req.character,
        req.content_type,
        label,
        req.user_requirement,
        req.content,
    )

    raw = chat_json(client, settings, system, user, temperature=0.3)
    try:
        data = extract_json_object(raw)
        return _normalize_evaluation(data)
    except (json.JSONDecodeError, ValueError, ValidationError) as e:
        raise ValueError(f"Evaluation parse failed: {e}") from e
