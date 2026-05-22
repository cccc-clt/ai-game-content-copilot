from src.prompts._shared import build_base_system, build_base_user
from src.schemas.copilot import CharacterProfile, ContentType

SCENE = """
## 场景说明：任务描述
生成主线/支线任务描述文案，包含任务背景、目标、阶段要点与玩家动机。
需体现可玩性、引导清晰度与叙事张力。
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
            "建议包含：任务标题、背景、目标、关键步骤提示（3–5 条）。",
        ),
    )
