from app.schemas.request import GenerateRequest


def build_user_prompt(req: GenerateRequest) -> str:
    parts = [
        "## 用户创意",
        req.idea.strip(),
        "",
        "## 生成要求",
        "- 围绕上述创意展开完整内容包，各模块之间设定一致、互相引用时逻辑自洽。",
        "- 重点打磨玩家情绪曲线、角色记忆点、可玩性循环与传播话题点。",
        "- 输出单个 JSON 对象，字段名使用 snake_case。",
    ]
    if req.genre:
        parts.insert(2, f"偏好类型：{req.genre.value}")
    if req.platform:
        parts.insert(3, f"目标平台：{req.platform.value}")
    if req.tone:
        parts.insert(4, f"叙事基调：{req.tone.value}")
    return "\n".join(parts)
