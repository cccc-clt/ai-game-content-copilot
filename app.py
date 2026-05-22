"""
FastAPI 后端入口（请在项目根目录运行）。

推荐启动方式（二选一）：
  uvicorn app:app --reload --host 127.0.0.1 --port 8001
  python app.py
"""
from src.api.main import app

__all__ = ["app"]

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app:app",
        host="127.0.0.1",
        port=8001,
        reload=True,
    )
