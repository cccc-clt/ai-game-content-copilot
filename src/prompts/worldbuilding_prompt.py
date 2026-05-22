from src.prompts._shared import build_base_system, build_base_user
from src.schemas.copilot import CharacterProfile, ContentType

SCENE_WORLD = """
## 场景说明：世界观设定
输出结构化的世界观片段：时代、地理、势力、核心冲突、美学基调与记忆锚点。
需与角色所属世界观一致，便于策划文档与后续扩写。
"""

SCENE_ITEM = """
## 场景说明：道具描述
生成游戏道具的名称、外观、来历、效果描述与叙事彩蛋。
文案适合背包 UI、图鉴与掉落提示，兼顾玩法信息与沉浸感。
"""

SCENE_NPC = """
## 场景说明：NPC 对话
生成 NPC 与玩家（或角色）的对话内容，含可选分支语气提示。
对话需符合 NPC 人设及场景目标，避免 OOC。
"""


def build_messages(
    character: CharacterProfile,
    content_type: ContentType,
    content_type_label: str,
    user_requirement: str,
) -> tuple[str, str]:
    if content_type == ContentType.ITEM_DESCRIPTION:
        scene = SCENE_ITEM
        extra = "包含道具名、稀有度暗示、效果与一句话 lore。"
    elif content_type == ContentType.NPC_DIALOGUE:
        scene = SCENE_NPC
        extra = "可含 3–6 轮对话轮次，标注说话者与情绪。"
    else:
        scene = SCENE_WORLD
        extra = "分条列出世界观要素，每条简洁可扫描。"

    return (
        build_base_system(scene),
        build_base_user(
            character,
            content_type,
            content_type_label,
            user_requirement,
            extra,
        ),
    )
