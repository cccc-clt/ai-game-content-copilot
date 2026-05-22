"""兼容旧启动路径：uvicorn app.main:app（在 backend 目录下）。"""
from src.api.main import app

__all__ = ["app"]
