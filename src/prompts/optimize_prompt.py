from src.prompts._shared import CONTENT_RULES, format_character_block
from src.schemas.copilot import CharacterProfile, ContentType

OPTIMIZE_SCHEMA = """
## 输出 JSON（snake_case）

{
  "optimized_content": "优化后的完整正文",
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
"""


def build_messages(
    character: CharacterProfile,
    content_type: ContentType,
    content_type_label: str,
    user_requirement: str,
    selected_variant: str,
    selected_content: str,
    user_feedback: str = "",
) -> tuple[str, str]:
    system = f"""你是游戏文案优化专家。基于用户选中的版本，在保持人设一致的前提下迭代优化，并重新评分。

{CONTENT_RULES}

{OPTIMIZE_SCHEMA}
"""
    parts = [
        format_character_block(character),
        "",
        f"## 内容类型\n{content_type_label}",
        "",
        "## 用户需求",
        user_requirement.strip(),
        "",
        f"## 选中版本\n版本 {selected_variant}",
        "",
        selected_content.strip(),
    ]
    if user_feedback.strip():
        parts.extend(["", "## 用户补充反馈", user_feedback.strip()])
    parts.extend(
        [
            "",
            "## 优化要求",
            "- 保留原版优点，针对性改进人设贴合度、沉浸感与可用性。",
            "- 输出 optimized_content 与更新后的 evaluation。",
        ]
    )
    return system, "\n".join(parts)
