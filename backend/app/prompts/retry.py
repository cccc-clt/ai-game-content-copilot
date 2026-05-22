from app.prompts.schema_template import get_schema_outline


def build_retry_prompt(raw: str, error: str) -> str:
    return f"""上一次输出无法通过 JSON 校验，错误信息：
{error}

请仅输出修正后的完整 JSON 对象，要求：
1. 不要 Markdown 代码块，不要任何解释文字
2. 严格使用 snake_case 字段名
3. 必须包含全部 8 个模块：game_event, world_setting, npc_profiles, dialogue_tree, quest_flow, player_feedback, consistency_check, improvement_suggestions，以及 meta

结构参考：
{get_schema_outline()}

错误输出片段（截断）：
{raw[:1200]}
"""
