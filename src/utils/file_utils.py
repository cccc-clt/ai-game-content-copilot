import re
from datetime import datetime, timezone


def sanitize_filename(name: str, max_len: int = 60) -> str:
    cleaned = re.sub(r'[<>:"/\\|?*]', "", name.strip())
    cleaned = re.sub(r"\s+", "-", cleaned)
    if not cleaned:
        cleaned = "export"
    return cleaned[:max_len]


def iso_timestamp() -> str:
    return datetime.now(timezone.utc).isoformat()
