from typing import Callable

from src.prompts import (
    character_dialogue_prompt,
    event_copywriting_prompt,
    quest_description_prompt,
    story_expansion_prompt,
    worldbuilding_prompt,
)
from src.schemas.copilot import CharacterProfile, ContentType

PromptBuilder = Callable[
    [CharacterProfile, ContentType, str, str],
    tuple[str, str],
]

_PROMPT_BUILDERS: dict[ContentType, PromptBuilder] = {
    ContentType.CHARACTER_DIALOGUE: character_dialogue_prompt.build_messages,
    ContentType.QUEST_DESCRIPTION: quest_description_prompt.build_messages,
    ContentType.STORY_EXPANSION: story_expansion_prompt.build_messages,
    ContentType.EVENT_COPYWRITING: event_copywriting_prompt.build_messages,
    ContentType.WORLD_BUILDING: worldbuilding_prompt.build_messages,
    ContentType.NPC_DIALOGUE: worldbuilding_prompt.build_messages,
    ContentType.ITEM_DESCRIPTION: worldbuilding_prompt.build_messages,
}


def get_prompt_builder(content_type: ContentType) -> PromptBuilder:
    builder = _PROMPT_BUILDERS.get(content_type)
    if not builder:
        raise ValueError(f"Unsupported content type: {content_type}")
    return builder
