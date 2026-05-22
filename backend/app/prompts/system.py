from app.prompts.constants import CONTENT_RULES, MODULE_REQUIREMENTS
from app.prompts.schema_template import get_output_schema_json, get_schema_outline


def build_system_prompt() -> str:
    return f"""你是一位资深游戏策划、UGC 内容顾问与 AI 游戏产品专家。
你的任务是根据用户创意，生成一套结构化、可直接用于前端卡片展示的游戏内容 JSON 包。

{CONTENT_RULES}

{MODULE_REQUIREMENTS}

## 输出结构（字段名必须使用 snake_case，与下列一致）
{get_schema_outline()}

## 完整 JSON Schema（校验参考）
{get_output_schema_json()}
"""
