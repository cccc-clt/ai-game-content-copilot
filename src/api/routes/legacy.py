from fastapi import APIRouter, HTTPException

from src.config.settings import get_settings
from src.schemas.legacy import GameContentPackage, GenerateRequest
from src.services.export_service import legacy_package_to_markdown
from src.services.legacy.generator import generate_legacy_content

router = APIRouter(prefix="/api", tags=["legacy"])


@router.post("/generate", response_model=GameContentPackage)
def generate(req: GenerateRequest) -> GameContentPackage:
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
    try:
        return generate_legacy_content(req, settings)
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail="Generation failed. Check backend logs and provider settings.",
        ) from e


@router.post("/export/markdown")
def export_markdown(pkg: GameContentPackage) -> dict:
    return {"markdown": legacy_package_to_markdown(pkg)}
