from src.schemas.copilot import CharacterProfile, ContentType

CONTENT_RULES = """
## 内容硬性规则
1. 必须完全原创，不得引用、模仿或提及任何真实游戏 IP、角色名、地名、剧情或版权素材。
2. 所有人名、地名、组织、道具名须为虚构。
3. 全文使用中文，面向游戏策划、剧情文案与内容运营，表述具体可落地。
4. 游戏文本风格：短句有力、沉浸感强、适合 UI 展示与配音；避免说明书腔。
5. 只输出一个合法 JSON 对象，禁止 Markdown 代码块与 JSON 之外的说明文字。
"""

COPILOT_OUTPUT_SCHEMA = """
## 输出 JSON 结构（字段名必须使用 snake_case）

{
  "versions": [
    {
      "variant": "A",
      "variant_label": "稳妥正式版",
      "content": "string — 完整生成正文",
      "pros": ["优点1", "优点2"],
      "use_cases": ["适用场景1", "适用场景2"],
      "variant_score": { "total": 0-50, "brief": "一句话评分说明" },
      "optimization_tips": ["优化建议1", "优化建议2"]
    },
    {
      "variant": "B",
      "variant_label": "更有创意版",
      ...
    },
    {
      "variant": "C",
      "variant_label": "更具角色风格版",
      ...
    }
  ],
  "evaluation": {
    "persona_consistency": 0-10,
    "creativity": 0-10,
    "usability": 0-10,
    "language_style": 0-10,
    "immersion": 0-10,
    "total": 五项之和,
    "summary": "简短总评",
    "suggestions": ["优化建议1", "优化建议2"]
  }
}

## 三版本差异要求
- 版本 A（稳妥正式版）：语气稳重、信息完整、适合主线/正式场合。
- 版本 B（更有创意版）：结构或意象更有新意，仍保持可玩性与可理解性。
- 版本 C（更具角色风格版）：强烈贴合角色说话风格与人设，可适度文学化。
"""


def format_character_block(character: CharacterProfile) -> str:
    return f"""## 角色设定
- 角色名称：{character.name}
- 角色性格：{character.personality}
- 所属阵营：{character.faction or "未指定"}
- 世界观背景：{character.world_background}
- 说话风格：{character.speech_style}
- 角色目标/动机：{character.motivation or "未指定"}"""


def build_base_system(scene_instruction: str) -> str:
    return f"""你是一位资深游戏文案策划与 AI 游戏内容 Copilot。
你的任务是根据角色设定与用户需求，生成可直接用于游戏的三套内容方案，并完成 AI 内容评分。

{CONTENT_RULES}

{scene_instruction}

{COPILOT_OUTPUT_SCHEMA}
"""


def build_base_user(
    character: CharacterProfile,
    content_type: ContentType,
    content_type_label: str,
    user_requirement: str,
    extra_requirements: str = "",
) -> str:
    parts = [
        format_character_block(character),
        "",
        f"## 内容类型\n{content_type_label}（{content_type.value}）",
        "",
        "## 用户需求",
        user_requirement.strip(),
        "",
        "## 生成要求",
        "- 同时输出 A/B/C 三个版本，差异符合三版本说明。",
        "- evaluation 针对整体最优版本（或三版本综合）给出五维评分。",
        "- pros、use_cases、optimization_tips 各至少 2 条。",
    ]
    if extra_requirements:
        parts.extend(["", extra_requirements])
    return "\n".join(parts)
