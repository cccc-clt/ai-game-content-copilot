from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

_BACKEND_DIR = Path(__file__).resolve().parent.parent
_ROOT_DIR = _BACKEND_DIR.parent

# 本地开发默认允许的前端地址（可通过 CORS_ORIGINS 覆盖或扩展）
DEFAULT_CORS_ORIGINS = (
    "http://localhost:5173,"
    "http://localhost:5174,"
    "http://127.0.0.1:5173,"
    "http://127.0.0.1:5174"
)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(_ROOT_DIR / ".env", _BACKEND_DIR / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    openai_api_key: str = ""
    openai_base_url: str = "https://api.openai.com/v1"
    openai_model: str = "your-model-name"
    cors_origins: str = DEFAULT_CORS_ORIGINS

    @property
    def cors_origin_list(self) -> list[str]:
        origins: list[str] = []
        seen: set[str] = set()
        for part in self.cors_origins.split(","):
            origin = part.strip()
            if origin and origin not in seen:
                seen.add(origin)
                origins.append(origin)
        return origins if origins else [
            o.strip() for o in DEFAULT_CORS_ORIGINS.split(",") if o.strip()
        ]

    @property
    def api_key_configured(self) -> bool:
        key = self.openai_api_key.strip()
        return bool(key) and key != "your_api_key_here"

    @property
    def model_configured(self) -> bool:
        model = self.openai_model.strip()
        return bool(model) and model != "your-model-name"

    @property
    def ready(self) -> bool:
        return self.api_key_configured and self.model_configured


@lru_cache
def get_settings() -> Settings:
    return Settings()
