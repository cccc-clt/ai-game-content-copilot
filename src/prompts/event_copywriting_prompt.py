from src.prompts._shared import build_base_system, build_base_user
from src.schemas.copilot import CharacterProfile, ContentType

SCENE = """
## 场景说明：活动文案
生成手游/端游限时活动、版本活动或运营活动的宣传文案。
需有吸引力、信息密度适中，适合活动页、弹窗或社媒短文案。
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
            "可含活动主题、核心卖点、参与方式一句、情绪号召语。",
        ),
    )
