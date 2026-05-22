from fastapi import APIRouter, HTTPException
from fastapi.responses import PlainTextResponse

from src.config.settings import get_settings
from src.schemas.copilot import (
    CopilotEvaluateRequest,
    CopilotGenerateRequest,
    CopilotGenerateResponse,
    CopilotOptimizeRequest,
    CopilotOptimizeResponse,
    CopilotSessionSnapshot,
    ContentEvaluation,
)
from src.services.evaluation_service import evaluate_content
from src.services.export_service import copilot_to_markdown, copilot_to_txt
from src.services.generation_service import (
    generate_copilot_content,
    optimize_copilot_content,
)

router = APIRouter(prefix="/api/copilot", tags=["copilot"])


def _ensure_ready() -> None:
    settings = get_settings()
    if not settings.api_key_configured:
        raise HTTPException(
            status_code=503,
            detail=(
                "OPENAI_API_KEY is not configured. "
                "Copy .env.example to .env and set your API key."
            ),
        )
    if not settings.model_configured:
        raise HTTPException(
            status_code=503,
            detail="OPENAI_MODEL is not configured. Set a real model name in .env.",
        )


@router.post("/generate", response_model=CopilotGenerateResponse)
def generate(req: CopilotGenerateRequest) -> CopilotGenerateResponse:
    _ensure_ready()
    try:
        return generate_copilot_content(req)
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail="Copilot generation failed. Check backend logs.",
        ) from e


@router.post("/optimize", response_model=CopilotOptimizeResponse)
def optimize(req: CopilotOptimizeRequest) -> CopilotOptimizeResponse:
    _ensure_ready()
    try:
        return optimize_copilot_content(req)
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(status_code=502, detail="Optimize failed.") from e


@router.post("/evaluate", response_model=ContentEvaluation)
def evaluate(req: CopilotEvaluateRequest) -> ContentEvaluation:
    _ensure_ready()
    try:
        return evaluate_content(req)
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e)) from e


@router.post("/export/markdown")
def export_markdown(snapshot: CopilotSessionSnapshot) -> dict:
    return {"markdown": copilot_to_markdown(snapshot)}


@router.post("/export/txt")
def export_txt(snapshot: CopilotSessionSnapshot) -> PlainTextResponse:
    return PlainTextResponse(
        content=copilot_to_txt(snapshot),
        media_type="text/plain; charset=utf-8",
    )
