from src.prompts._shared import CONTENT_RULES, format_character_block
from src.schemas.copilot import CharacterProfile, ContentType

EVAL_SCHEMA = """
## 输出 JSON（仅 evaluation 对象，snake_case）

{
  "evaluation": {
    "persona_consistency": 0-10,
    "creativity": 0-10,
    "usability": 0-10,
    "language_style": 0-10,
    "immersion": 0-10,
    "total": 五项之和,
    "summary": "简短总评",
    "suggestions": ["建议1", "建议2"]
  }
}

## 评分维度说明
- persona_consistency 人设一致性：是否符合角色性格、说话风格与世界观。
- creativity 创意度：意象、结构或玩法联想是否有新意。
- usability 可用性：能否直接用于游戏生产流程。
- language_style 语言风格：是否符合类型化游戏文案要求。
- immersion 沉浸感：是否能让玩家产生代入感。
"""


def build_messages(
    character: CharacterProfile,
    content_type: ContentType,
    content_type_label: str,
    user_requirement: str,
    content: str,
) -> tuple[str, str]:
    system = f"""你是游戏内容质量评审专家，负责对已生成文案进行 AI Evaluation。

{CONTENT_RULES}

{EVAL_SCHEMA}
"""
    user = "\n".join(
        [
            format_character_block(character),
            "",
            f"## 内容类型\n{content_type_label}",
            "",
            "## 用户需求",
            user_requirement.strip(),
            "",
            "## 待评内容",
            content.strip(),
            "",
            "请仅输出包含 evaluation 字段的 JSON 对象。",
        ]
    )
    return system, user
