from src.prompts._shared import build_base_system, build_base_user
from src.schemas.copilot import CharacterProfile, ContentType

SCENE = """
## 场景说明：角色台词
生成游戏角色在特定情境下的台词/独白，需符合人设、世界观与说话风格。
台词应可直接用于剧情演出、过场或角色首次登场等场景。
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
            "台词长度适中（通常 2–8 句），可含舞台指示括号。",
        ),
    )
