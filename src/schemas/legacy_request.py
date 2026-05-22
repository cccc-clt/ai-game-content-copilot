from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class Genre(str, Enum):
    SCI_FI = "科幻"
    FANTASY = "奇幻"
    URBAN = "都市"
    MYSTERY = "悬疑"


class Platform(str, Enum):
    MOBILE = "手游"
    PC = "PC"
    CONSOLE = "主机"


class Tone(str, Enum):
    LIGHT = "轻松"
    EPIC = "史诗"
    HEALING = "治愈"


class GenerateRequest(BaseModel):
    idea: str = Field(..., min_length=10, max_length=2000)
    genre: Optional[Genre] = None
    platform: Optional[Platform] = None
    tone: Optional[Tone] = None
