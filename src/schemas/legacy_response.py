from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field, model_validator


class MetaInfo(BaseModel):
    title: str
    tagline: str
    genre: str
    target_audience: str
    one_line_pitch: str
    core_experience: str = Field(
        default="",
        description="核心玩家体验一句话",
    )


class EmotionBeat(BaseModel):
    phase: str
    mood: str
    player_goal: str
    intensity: int = Field(ge=1, le=5, description="情绪强度 1-5")


class EventAct(BaseModel):
    title: str
    summary: str
    key_beats: list[str] = Field(default_factory=list)
    player_experience: str = Field(default="")


class GameEvent(BaseModel):
    title: str
    theme: str
    hook: str
    duration: str
    emotion_curve: list[EmotionBeat] = Field(default_factory=list)
    acts: list[EventAct] = Field(default_factory=list)
    rewards: list[str] = Field(default_factory=list)
    playability_highlights: list[str] = Field(default_factory=list)
    spread_points: list[str] = Field(default_factory=list)


class WorldLocation(BaseModel):
    name: str
    description: str
    mood: str = ""


class WorldFaction(BaseModel):
    name: str
    agenda: str
    player_relation: str = ""


class WorldSetting(BaseModel):
    overview: str
    era: str
    geography: str
    locations: list[WorldLocation] = Field(default_factory=list)
    factions: list[WorldFaction] = Field(default_factory=list)
    core_conflict: str
    aesthetic_tone: str
    memory_anchors: list[str] = Field(default_factory=list)


class NpcProfile(BaseModel):
    name: str
    role: str
    personality: str
    memory_hook: str = Field(description="角色记忆点")
    emotional_arc: str = ""
    goals: list[str] = Field(default_factory=list)
    speech_style: str
    relationship_notes: str = ""


class DialogueChoice(BaseModel):
    label: str
    target_id: str
    emotional_tone: str = ""


class DialogueNode(BaseModel):
    id: str
    speaker: str
    text: str
    emotion: str = ""
    choices: list[DialogueChoice] = Field(default_factory=list)


class DialogueTree(BaseModel):
    root_id: str
    nodes: list[DialogueNode] = Field(default_factory=list)
    design_notes: str = ""


class QuestStep(BaseModel):
    id: str
    title: str
    objective: str
    triggers: list[str] = Field(default_factory=list)
    player_emotion: str = ""
    playability_note: str = ""


class QuestFlow(BaseModel):
    steps: list[QuestStep] = Field(default_factory=list)
    loop_summary: str = ""


class PlayerPersona(BaseModel):
    name: str
    description: str
    play_style: str = ""


class PredictedReaction(BaseModel):
    persona_name: str
    sentiment: str
    emotion_tag: str = ""
    quote: str
    retention_risk: str = ""
    shareability: str = ""


class PlayerFeedback(BaseModel):
    personas: list[PlayerPersona] = Field(default_factory=list)
    predicted_reactions: list[PredictedReaction] = Field(default_factory=list)
    overall_sentiment: str = ""
    experience_highlights: list[str] = Field(default_factory=list)


class ConsistencyIssue(BaseModel):
    severity: str
    description: str
    location: str
    dimension: str = ""


class DimensionScore(BaseModel):
    dimension: str
    score: int = Field(ge=0, le=100)
    note: str = ""


class ConsistencyCheck(BaseModel):
    score: int = Field(ge=0, le=100)
    issues: list[ConsistencyIssue] = Field(default_factory=list)
    dimension_scores: list[DimensionScore] = Field(default_factory=list)
    summary: str = ""


class ImprovementItem(BaseModel):
    priority: str
    category: str
    title: str
    detail: str
    expected_impact: str = ""


class ImprovementSuggestions(BaseModel):
    items: list[ImprovementItem] = Field(default_factory=list)
    next_iteration_focus: str = ""


class GameContentPackage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    meta: MetaInfo
    game_event: GameEvent
    world_setting: WorldSetting
    npc_profiles: list[NpcProfile] = Field(default_factory=list)
    dialogue_tree: DialogueTree
    quest_flow: QuestFlow
    player_feedback: PlayerFeedback
    consistency_check: ConsistencyCheck
    improvement_suggestions: ImprovementSuggestions
    generated_at: Optional[str] = None

    @model_validator(mode="before")
    @classmethod
    def normalize_legacy_keys(cls, data: Any) -> Any:
        if not isinstance(data, dict):
            return data
        normalized = dict(data)
        legacy_map = {
            "eventPlan": "game_event",
            "event_plan": "game_event",
            "gameEvent": "game_event",
            "worldSetting": "world_setting",
            "npcs": "npc_profiles",
            "npcProfiles": "npc_profiles",
            "dialogueTree": "dialogue_tree",
            "questFlow": "quest_flow",
            "playerFeedback": "player_feedback",
            "consistencyCheck": "consistency_check",
            "improvementSuggestions": "improvement_suggestions",
            "prd": None,
        }
        for old, new in legacy_map.items():
            if old in normalized and new and new not in normalized:
                normalized[new] = normalized.pop(old)
            elif old in normalized:
                normalized.pop(old, None)
        if "meta" in normalized and isinstance(normalized["meta"], dict):
            meta = normalized["meta"]
            for old_k, new_k in (
                ("targetAudience", "target_audience"),
                ("oneLinePitch", "one_line_pitch"),
                ("coreExperience", "core_experience"),
            ):
                if old_k in meta and new_k not in meta:
                    meta[new_k] = meta.pop(old_k)
        return normalized
