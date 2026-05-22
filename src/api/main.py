from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.routes import copilot, health, legacy
from src.config.settings import get_settings


def create_app() -> FastAPI:
    settings = get_settings()
    application = FastAPI(
        title="AI Game Content Copilot",
        description="AI-powered game content generation API",
        version="0.2.0",
    )
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origin_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    application.include_router(health.router)
    application.include_router(copilot.router)
    application.include_router(legacy.router)
    return application


app = create_app()
