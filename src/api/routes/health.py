from fastapi import APIRouter

from src.config.settings import get_settings

router = APIRouter(prefix="/api", tags=["health"])


@router.get("/health")
def health() -> dict:
    settings = get_settings()
    return {
        "status": "ok",
        "apiKeyConfigured": settings.api_key_configured,
        "modelConfigured": settings.model_configured,
        "ready": settings.ready,
    }
