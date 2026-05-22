from src.schemas.copilot import CopilotSessionSnapshot
from src.schemas.legacy import GameContentPackage
from src.services.legacy.markdown import package_to_markdown

DIMENSION_LABELS = {
    "persona_consistency": "人设一致性",
    "creativity": "创意度",
    "usability": "可用性",
    "language_style": "语言风格",
    "immersion": "沉浸感",
}


def _character_section(snapshot: CopilotSessionSnapshot) -> list[str]:
    c = snapshot.character
    return [
        f"- **角色名称**：{c.name}",
        f"- **角色性格**：{c.personality}",
        f"- **所属阵营**：{c.faction or '未指定'}",
        f"- **世界观背景**：{c.world_background}",
        f"- **说话风格**：{c.speech_style}",
        f"- **角色目标/动机**：{c.motivation or '未指定'}",
    ]


def _evaluation_section(snapshot: CopilotSessionSnapshot) -> list[str]:
    ev = snapshot.evaluation
    lines = [
        f"- **人设一致性**：{ev.persona_consistency} / 10",
        f"- **创意度**：{ev.creativity} / 10",
        f"- **可用性**：{ev.usability} / 10",
        f"- **语言风格**：{ev.language_style} / 10",
        f"- **沉浸感**：{ev.immersion} / 10",
        f"- **总分**：{ev.total} / 50",
        "",
        f"**评价**：{ev.summary or '—'}",
    ]
    if ev.suggestions:
        lines.append("")
        lines.append("**优化建议**：")
        for s in ev.suggestions:
            lines.append(f"- {s}")
    return lines


def copilot_to_markdown(snapshot: CopilotSessionSnapshot) -> str:
    lines = [
        f"# {snapshot.project_name}",
        "",
        f"> **生成时间**：{snapshot.generated_at}",
        f"> **内容类型**：{snapshot.content_type_label}",
        "",
        "---",
        "",
        "## 角色设定",
        "",
        *_character_section(snapshot),
        "",
        "## 用户需求",
        "",
        snapshot.user_requirement,
        "",
        "## 最终内容",
        "",
    ]
    if snapshot.selected_variant:
        lines.append(f"*基于版本 {snapshot.selected_variant} 优化*")
        lines.append("")
    lines.append(snapshot.final_content)
    lines.append("")
    lines.extend(["## AI 评分", "", *_evaluation_section(snapshot)])
    lines.extend(["", "---", "", "*由 AI Game Content Copilot 导出*"])
    return "\n".join(lines)


def copilot_to_txt(snapshot: CopilotSessionSnapshot) -> str:
    lines = [
        snapshot.project_name,
        "=" * 40,
        f"生成时间: {snapshot.generated_at}",
        f"内容类型: {snapshot.content_type_label}",
        "",
        "【角色设定】",
        *_character_section(snapshot),
        "",
        "【用户需求】",
        snapshot.user_requirement,
        "",
        "【最终内容】",
    ]
    if snapshot.selected_variant:
        lines.append(f"(版本 {snapshot.selected_variant})")
    lines.append(snapshot.final_content)
    lines.append("")
    lines.append("【AI 评分】")
    lines.extend(_evaluation_section(snapshot))
    return "\n".join(lines)


def legacy_package_to_markdown(pkg: GameContentPackage) -> str:
    return package_to_markdown(pkg)
