from datetime import datetime

from app.schemas.response import GameContentPackage


def _export_date(pkg: GameContentPackage) -> str:
    if pkg.generated_at:
        try:
            return datetime.fromisoformat(
                pkg.generated_at.replace("Z", "+00:00")
            ).strftime("%Y-%m-%d")
        except ValueError:
            pass
    return datetime.utcnow().strftime("%Y-%m-%d")


def render_prd_markdown(pkg: GameContentPackage) -> str:
    m = pkg.meta
    ge = pkg.game_event
    ws = pkg.world_setting
    event_name = m.title or ge.title
    date_str = _export_date(pkg)

    lines: list[str] = [
        f"# 游戏内容策划 PRD · {event_name}",
        "",
        "> **文档说明**：由 AI Game Content Copilot 自动生成，内容为原创虚构设定。",
        f"> **导出日期**：{date_str}",
        "",
        "---",
        "",
        "## 1. 活动名称",
        "",
        f"**项目名称**：{m.title}",
        f"**活动名称**：{ge.title}",
        f"**活动主题**：{ge.theme}",
        f"**活动周期**：{ge.duration}",
        "",
        "## 2. 核心创意",
        "",
        f"**一句话卖点**：{m.one_line_pitch}",
        "",
        f"**核心体验**：{m.core_experience or '—'}",
        "",
        f"**活动钩子**：{ge.hook}",
        "",
        f"**类型定位**：{m.genre}",
        "",
    ]
    if m.tagline:
        lines.extend([f"**宣传语**：{m.tagline}", ""])

    lines.extend(["## 3. 目标玩家", "", f"**目标受众**：{m.target_audience}", ""])
    if ge.playability_highlights:
        lines.append("**可玩性亮点**：")
        for h in ge.playability_highlights:
            lines.append(f"- {h}")
        lines.append("")
    if ge.spread_points:
        lines.append("**传播点**：")
        for p in ge.spread_points:
            lines.append(f"- {p}")
        lines.append("")

    lines.extend(["## 4. 世界观设定", "", ws.overview, ""])
    lines.extend(
        [
            f"- **时代**：{ws.era}",
            f"- **地理**：{ws.geography}",
            f"- **美学基调**：{ws.aesthetic_tone}",
            f"- **核心冲突**：{ws.core_conflict}",
            "",
        ]
    )
    if ws.locations:
        lines.append("### 关键地点")
        for loc in ws.locations:
            lines.append(f"- **{loc.name}**（{loc.mood}）：{loc.description}")
        lines.append("")
    if ws.factions:
        lines.append("### 势力")
        for f in ws.factions:
            rel = f"（与玩家：{f.player_relation}）" if f.player_relation else ""
            lines.append(f"- **{f.name}**：{f.agenda}{rel}")
        lines.append("")
    if ws.memory_anchors:
        lines.append("### 世界记忆锚点")
        for a in ws.memory_anchors:
            lines.append(f"- {a}")
        lines.append("")

    lines.append("## 5. 剧情大纲")
    if ge.emotion_curve:
        lines.extend(["", "### 情绪曲线"])
        for beat in ge.emotion_curve:
            lines.append(
                f"- **{beat.phase}** · {beat.mood}（强度 {beat.intensity}/5）— {beat.player_goal}"
            )
        lines.append("")
    for i, act in enumerate(ge.acts, 1):
        lines.extend([f"### 第 {i} 幕：{act.title}", "", act.summary, ""])
        if act.player_experience:
            lines.append(f"*玩家体验*：{act.player_experience}")
            lines.append("")
        if act.key_beats:
            lines.append("**关键节拍**：")
            for b in act.key_beats:
                lines.append(f"- {b}")
            lines.append("")
    if ge.rewards:
        lines.append("**活动奖励**：")
        for r in ge.rewards:
            lines.append(f"- {r}")
        lines.append("")

    lines.append("## 6. NPC 人设")
    for npc in pkg.npc_profiles:
        lines.extend(
            [
                f"### {npc.name}（{npc.role}）",
                "",
                f"- **性格**：{npc.personality}",
                f"- **记忆点**：{npc.memory_hook}",
                f"- **情绪弧光**：{npc.emotional_arc or '—'}",
                f"- **说话风格**：{npc.speech_style}",
                "",
            ]
        )
        if npc.goals:
            lines.append("**目标**：")
            for g in npc.goals:
                lines.append(f"- {g}")
            lines.append("")
        if npc.relationship_notes:
            lines.append(f"**关系备注**：{npc.relationship_notes}")
            lines.append("")

    dt = pkg.dialogue_tree
    lines.extend(["## 7. 分支对话树", "", f"**根节点**：`{dt.root_id}`", ""])
    if dt.design_notes:
        lines.extend([f"*设计说明*：{dt.design_notes}", ""])
    for node in dt.nodes:
        emo = f"（{node.emotion}）" if node.emotion else ""
        lines.extend([f"### [{node.id}] {node.speaker}{emo}", "", node.text, ""])
        if node.choices:
            lines.append("**分支选项**：")
            for c in node.choices:
                tone = f"（{c.emotional_tone}）" if c.emotional_tone else ""
                lines.append(f"- {c.label} → `{c.target_id}`{tone}")
            lines.append("")

    qf = pkg.quest_flow
    lines.append("## 8. 任务流程")
    if qf.loop_summary:
        lines.extend(["", f"**玩法循环**：{qf.loop_summary}", ""])
    for i, step in enumerate(qf.steps, 1):
        lines.extend(
            [
                f"### 步骤 {i}：{step.title}（{step.id}）",
                "",
                f"- **目标**：{step.objective}",
                f"- **玩家情绪**：{step.player_emotion or '—'}",
                f"- **可玩性说明**：{step.playability_note or '—'}",
            ]
        )
        if step.triggers:
            lines.append(f"- **触发条件**：{'；'.join(step.triggers)}")
        lines.append("")

    pf = pkg.player_feedback
    lines.extend(
        [
            "## 9. 玩家反馈模拟",
            "",
            f"**整体情绪**：{pf.overall_sentiment or '—'}",
            "",
        ]
    )
    if pf.personas:
        lines.append("### 玩家画像")
        for p in pf.personas:
            lines.append(f"- **{p.name}**（{p.play_style or '—'}）：{p.description}")
        lines.append("")
    if pf.experience_highlights:
        lines.append("### 体验亮点")
        for h in pf.experience_highlights:
            lines.append(f"- {h}")
        lines.append("")
    if pf.predicted_reactions:
        lines.append("### 预测反馈")
        for r in pf.predicted_reactions:
            tag = f" · {r.emotion_tag}" if r.emotion_tag else ""
            lines.extend(
                [
                    f"#### {r.persona_name}（{r.sentiment}{tag}）",
                    "",
                    f"> {r.quote}",
                    "",
                    f"- 留存风险：{r.retention_risk or '—'}",
                    f"- 传播潜力：{r.shareability or '—'}",
                    "",
                ]
            )

    cc = pkg.consistency_check
    lines.extend(
        [
            "## 10. 内容一致性检查",
            "",
            f"**总评分**：{cc.score} / 100",
            "",
            cc.summary or "",
            "",
        ]
    )
    if cc.dimension_scores:
        lines.append("### 维度评分")
        for ds in cc.dimension_scores:
            lines.append(f"- **{ds.dimension}**：{ds.score} 分 — {ds.note or '—'}")
        lines.append("")
    if cc.issues:
        lines.append("### 待修复问题")
        for issue in cc.issues:
            dim = f" · {issue.dimension}" if issue.dimension else ""
            lines.append(
                f"- [{issue.severity}] {issue.description}（{issue.location}{dim}）"
            )
        lines.append("")

    imp = pkg.improvement_suggestions
    lines.append("## 11. 后续优化建议")
    if imp.next_iteration_focus:
        lines.extend(["", f"**下一轮迭代重点**：{imp.next_iteration_focus}", ""])
    for item in imp.items:
        lines.extend(
            [
                f"### [{item.priority}] {item.title}",
                "",
                f"- **类别**：{item.category}",
                f"- **详情**：{item.detail}",
                f"- **预期影响**：{item.expected_impact or '—'}",
                "",
            ]
        )

    lines.extend(["---", "", "*本文档由 AI Game Content Copilot 导出。*"])
    return "\n".join(lines)
