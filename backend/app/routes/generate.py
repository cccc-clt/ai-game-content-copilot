from fastapi import APIRouter, HTTPException

from app.config import get_settings
from app.schemas.request import GenerateRequest
from app.schemas.response import GameContentPackage
from app.services.generator import generate_content
from app.services.markdown import package_to_markdown

router = APIRouter(prefix="/api", tags=["generate"])


@router.get("/health")
def health() -> dict:
    settings = get_settings()
    return {
        "status": "ok",
        "apiKeyConfigured": settings.api_key_configured,
    }


@router.post("/generate", response_model=GameContentPackage)
def generate(req: GenerateRequest) -> GameContentPackage:
    settings = get_settings()
    if not settings.api_key_configured:
        raise HTTPException(
            status_code=503,
            detail=(
                "OPENAI_API_KEY is not configured. "
                "Copy .env.example to backend/.env and set your API key."
            ),
        )
    try:
        return generate_content(req, settings)
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e)) from e
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Generation failed: {e}",
        ) from e


@router.post("/export/markdown")
def export_markdown(pkg: GameContentPackage) -> dict:
    return {"markdown": package_to_markdown(pkg)}
