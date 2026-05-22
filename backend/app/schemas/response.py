from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class MetaInfo(BaseModel):
    model_config = ConfigDict(populate_by_name=True, ser_json_by_alias=True)

    title: str
    tagline: str
    genre: str
    target_audience: str = Field(alias="targetAudience")
    one_line_pitch: str = Field(alias="oneLinePitch")


class EventAct(BaseModel):
    model_config = ConfigDict(populate_by_name=True, ser_json_by_alias=True)

    title: str
    summary: str
    key_beats: list[str] = Field(default_factory=list, alias="keyBeats")


class EventPlan(BaseModel):
    hook: str
    acts: list[EventAct] = Field(default_factory=list)
    rewards: list[str] = Field(default_factory=list)
    duration: str


class NpcCard(BaseModel):
    model_config = ConfigDict(populate_by_name=True, ser_json_by_alias=True)

    name: str
    role: str
    personality: str
    goals: list[str] = Field(default_factory=list)
    speech_style: str = Field(alias="speechStyle")


class DialogueChoice(BaseModel):
    model_config = ConfigDict(populate_by_name=True, ser_json_by_alias=True)

    label: str
    target_id: str = Field(alias="targetId")


class DialogueNode(BaseModel):
    id: str
    speaker: str
    text: str
    choices: list[DialogueChoice] = Field(default_factory=list)


class DialogueTree(BaseModel):
    model_config = ConfigDict(populate_by_name=True, ser_json_by_alias=True)

    root_id: str = Field(alias="rootId")
    nodes: list[DialogueNode] = Field(default_factory=list)


class QuestStep(BaseModel):
    id: str
    title: str
    objective: str
    triggers: list[str] = Field(default_factory=list)


class QuestFlow(BaseModel):
    steps: list[QuestStep] = Field(default_factory=list)


class PlayerPersona(BaseModel):
    name: str
    description: str


class PredictedReaction(BaseModel):
    model_config = ConfigDict(populate_by_name=True, ser_json_by_alias=True)

    persona_name: str = Field(alias="personaName")
    sentiment: str
    quote: str


class PlayerFeedback(BaseModel):
    model_config = ConfigDict(populate_by_name=True, ser_json_by_alias=True)

    personas: list[PlayerPersona] = Field(default_factory=list)
    predicted_reactions: list[PredictedReaction] = Field(
        default_factory=list, alias="predictedReactions"
    )


class ConsistencyIssue(BaseModel):
    severity: str
    description: str
    location: str


class ConsistencyCheck(BaseModel):
    score: int = Field(ge=0, le=100)
    issues: list[ConsistencyIssue] = Field(default_factory=list)
    suggestions: list[str] = Field(default_factory=list)


class PrdDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True, ser_json_by_alias=True)

    overview: str
    user_stories: list[str] = Field(default_factory=list, alias="userStories")
    metrics: list[str] = Field(default_factory=list)
    risks: list[str] = Field(default_factory=list)
    mvp_scope: str = Field(alias="mvpScope")


class GameContentPackage(BaseModel):
    model_config = ConfigDict(populate_by_name=True, ser_json_by_alias=True)

    meta: MetaInfo
    event_plan: EventPlan = Field(alias="eventPlan")
    npcs: list[NpcCard] = Field(default_factory=list)
    dialogue_tree: DialogueTree = Field(alias="dialogueTree")
    quest_flow: QuestFlow = Field(alias="questFlow")
    player_feedback: PlayerFeedback = Field(alias="playerFeedback")
    consistency_check: ConsistencyCheck = Field(alias="consistencyCheck")
    prd: PrdDocument
    generated_at: Optional[str] = Field(default=None, alias="generatedAt")
