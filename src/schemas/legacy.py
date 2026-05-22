"""Legacy 8-module content package schemas."""

from src.schemas.legacy_request import (
    GenerateRequest,
    Genre,
    Platform,
    Tone,
)
from src.schemas.legacy_response import GameContentPackage

__all__ = [
    "GenerateRequest",
    "Genre",
    "Platform",
    "Tone",
    "GameContentPackage",
]
