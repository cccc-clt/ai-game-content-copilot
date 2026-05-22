from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class ContentType(str, Enum):
    CHARACTER_DIALOGUE = "character_dialogue"
    QUEST_DESCRIPTION = "quest_description"
    STORY_EXPANSION = "story_expansion"
    EVENT_COPYWRITING = "event_copywriting"
    WORLD_BUILDING = "world_building"
    NPC_DIALOGUE = "npc_dialogue"
    ITEM_DESCRIPTION = "item_description"


CONTENT_TYPE_LABELS: dict[ContentType, str] = {
    ContentType.CHARACTER_DIALOGUE: "角色台词",
    ContentType.QUEST_DESCRIPTION: "任务描述",
    ContentType.STORY_EXPANSION: "剧情片段",
    ContentType.EVENT_COPYWRITING: "活动文案",
    ContentType.WORLD_BUILDING: "世界观设定",
    ContentType.NPC_DIALOGUE: "NPC 对话",
    ContentType.ITEM_DESCRIPTION: "道具描述",
}


class CharacterProfile(BaseModel):
    name: str = Field(..., min_length=1, max_length=80)
    personality: str = Field(..., min_length=1, max_length=500)
    faction: str = Field(default="", max_length=200)
    world_background: str = Field(..., min_length=1, max_length=1000)
    speech_style: str = Field(..., min_length=1, max_length=300)
    motivation: str = Field(default="", max_length=500)


class CopilotGenerateRequest(BaseModel):
    character: CharacterProfile
    content_type: ContentType
    user_requirement: str = Field(..., min_length=10, max_length=2000)


class VariantScore(BaseModel):
    total: int = Field(ge=0, le=50)
    brief: str = ""


class ContentVersion(BaseModel):
    variant: str = Field(pattern=r"^[ABC]$")
    variant_label: str
    content: str
    pros: list[str] = Field(default_factory=list)
    use_cases: list[str] = Field(default_factory=list)
    variant_score: VariantScore
    optimization_tips: list[str] = Field(default_factory=list)


class ContentEvaluation(BaseModel):
    persona_consistency: int = Field(ge=0, le=10)
    creativity: int = Field(ge=0, le=10)
    usability: int = Field(ge=0, le=10)
    language_style: int = Field(ge=0, le=10)
    immersion: int = Field(ge=0, le=10)
    total: int = Field(ge=0, le=50)
    summary: str = ""
    suggestions: list[str] = Field(default_factory=list)


class CopilotMeta(BaseModel):
    project_name: str = "AI Game Content Copilot"
    generated_at: str
    content_type: ContentType
    content_type_label: str


class CopilotGenerateResponse(BaseModel):
    meta: CopilotMeta
    versions: list[ContentVersion]
    evaluation: ContentEvaluation


class CopilotOptimizeRequest(BaseModel):
    character: CharacterProfile
    content_type: ContentType
    user_requirement: str = Field(..., min_length=10, max_length=2000)
    selected_variant: str = Field(pattern=r"^[ABC]$")
    selected_content: str = Field(..., min_length=1)
    user_feedback: str = Field(default="", max_length=1000)


class CopilotOptimizeResponse(BaseModel):
    optimized_content: str
    evaluation: ContentEvaluation
    generated_at: str


class CopilotEvaluateRequest(BaseModel):
    character: CharacterProfile
    content_type: ContentType
    user_requirement: str
    content: str = Field(..., min_length=1)


class CopilotSessionSnapshot(BaseModel):
    project_name: str = "AI Game Content Copilot"
    generated_at: str
    character: CharacterProfile
    content_type: ContentType
    content_type_label: str
    user_requirement: str
    final_content: str
    selected_variant: Optional[str] = None
    evaluation: ContentEvaluation
