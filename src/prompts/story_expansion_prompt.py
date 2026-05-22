from src.prompts._shared import build_base_system, build_base_user
from src.schemas.copilot import CharacterProfile, ContentType

SCENE = """
## 场景说明：剧情片段
扩写一段可演出的剧情片段，含场景氛围、角色行动与情绪转折。
注重沉浸感与节奏，适合过场动画或关卡内叙事。
"""


def build_messages(
    character: CharacterProfile,
    content_type: ContentType,
    content_type_label: str,
    user_requirement: str,
) -> tuple[str, str]:
    return (
        build_base_system(SCENE),
        build_base_user(
            character,
            content_type,
            content_type_label,
            user_requirement,
            "可采用场景描写 + 对话混合；标明情绪曲线（起—承—转）。",
        ),
    )
