import json

from app.schemas.request import GenerateRequest
from app.schemas.response import GameContentPackage

_SCHEMA_HINT = """
输出必须是单个 JSON 对象，使用 camelCase 字段名，结构如下：
{
  "meta": { "title", "tagline", "genre", "targetAudience", "oneLinePitch" },
  "eventPlan": { "hook", "acts": [{ "title", "summary", "keyBeats": [] }], "rewards": [], "duration" },
  "npcs": [{ "name", "role", "personality", "goals": [], "speechStyle" }],
  "dialogueTree": { "rootId", "nodes": [{ "id", "speaker", "text", "choices": [{ "label", "targetId" }] }] },
  "questFlow": { "steps": [{ "id", "title", "objective", "triggers": [] }] },
  "playerFeedback": {
    "personas": [{ "name", "description" }],
    "predictedReactions": [{ "personaName", "sentiment", "quote" }]
  },
  "consistencyCheck": { "score": 0-100, "issues": [{ "severity", "description", "location" }], "suggestions": [] },
  "prd": { "overview", "userStories": [], "metrics": [], "risks": [], "mvpScope" }
}
至少包含 2 个 NPC、4 个对话节点、3 个任务步骤、2 个玩家画像。
"""


def build_system_prompt() -> str:
    return f"""你是一位资深游戏策划、UGC 内容顾问与 AI 游戏产品专家。
根据用户的游戏创意，生成一套完整的原创游戏内容包，全部使用中文。

硬性规则：
1. 必须完全原创，不得引用、模仿或提及任何真实存在的游戏 IP、角色名、地名或版权素材。
2. 人名、地名、组织名须为虚构（例如「星港纪元」「旅者·零」「萤石商会」）。
3. 只输出合法 JSON，不要 Markdown 代码块，不要额外说明文字。
4. 内容要具体可执行，适合策划与 UGC 团队直接使用。

{_SCHEMA_HINT}

严格参考以下 JSON Schema，字段名必须使用别名中的 camelCase：
{get_schema_json()}
"""


def build_user_prompt(req: GenerateRequest) -> str:
    parts = [f"游戏创意：\n{req.idea.strip()}"]
    if req.genre:
        parts.append(f"偏好类型：{req.genre.value}")
    if req.platform:
        parts.append(f"目标平台：{req.platform.value}")
    if req.tone:
        parts.append(f"叙事基调：{req.tone.value}")
    parts.append("请生成完整 JSON 内容包。")
    return "\n\n".join(parts)


def build_retry_prompt(raw: str, error: str) -> str:
    return (
        f"上一次输出无法解析，错误：{error}\n"
        f"请修正并仅输出符合 schema 的 JSON。\n"
        f"错误片段（截断）：{raw[:800]}"
    )


def get_schema_json() -> str:
    return json.dumps(GameContentPackage.model_json_schema(), ensure_ascii=False, indent=0)
