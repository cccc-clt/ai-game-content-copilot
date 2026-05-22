from app.schemas.response import GameContentPackage


def package_to_markdown(pkg: GameContentPackage) -> str:
    m = pkg.meta
    lines: list[str] = [
        f"# {m.title}",
        "",
        f"> {m.tagline}",
        "",
        f"**类型**：{m.genre}  |  **受众**：{m.target_audience}",
        "",
        f"**一句话卖点**：{m.one_line_pitch}",
        "",
    ]
    if pkg.generated_at:
        lines.extend([f"*生成时间：{pkg.generated_at}*", ""])

    ep = pkg.event_plan
    lines.extend(
        [
            "## 剧情活动方案",
            "",
            f"**钩子**：{ep.hook}",
            "",
            f"**周期**：{ep.duration}",
            "",
        ]
    )
    for i, act in enumerate(ep.acts, 1):
        lines.append(f"### 幕 {i}：{act.title}")
        lines.append("")
        lines.append(act.summary)
        lines.append("")
        if act.key_beats:
            lines.append("**关键节拍**：")
            for beat in act.key_beats:
                lines.append(f"- {beat}")
            lines.append("")
    if ep.rewards:
        lines.append("**奖励**：")
        for r in ep.rewards:
            lines.append(f"- {r}")
        lines.append("")

    lines.extend(["## NPC 人设卡", ""])
    for npc in pkg.npcs:
        lines.extend(
            [
                f"### {npc.name}（{npc.role}）",
                "",
                f"**性格**：{npc.personality}",
                "",
                f"**说话风格**：{npc.speech_style}",
                "",
            ]
        )
        if npc.goals:
            lines.append("**目标**：")
            for g in npc.goals:
                lines.append(f"- {g}")
            lines.append("")

    dt = pkg.dialogue_tree
    lines.extend(["## 分支对话树", "", f"**根节点**：`{dt.root_id}`", ""])
    for node in dt.nodes:
        lines.extend([f"### [{node.id}] {node.speaker}", "", node.text, ""])
        if node.choices:
            lines.append("**选项**：")
            for c in node.choices:
                lines.append(f"- {c.label} → `{c.target_id}`")
            lines.append("")

    lines.extend(["## 任务流程", ""])
    for step in pkg.quest_flow.steps:
        lines.extend(
            [
                f"### {step.id}：{step.title}",
                "",
                f"**目标**：{step.objective}",
                "",
            ]
        )
        if step.triggers:
            lines.append(f"**触发**：{', '.join(step.triggers)}")
            lines.append("")

    pf = pkg.player_feedback
    lines.extend(["## 玩家反馈模拟", ""])
    for p in pf.personas:
        lines.append(f"- **{p.name}**：{p.description}")
    lines.append("")
    for r in pf.predicted_reactions:
        lines.extend(
            [
                f"### {r.persona_name}（{r.sentiment}）",
                "",
                f"> {r.quote}",
                "",
            ]
        )

    cc = pkg.consistency_check
    lines.extend(
        [
            "## 内容一致性检查",
            "",
            f"**评分**：{cc.score} / 100",
            "",
        ]
    )
    if cc.issues:
        lines.append("**问题**：")
        for issue in cc.issues:
            lines.append(
                f"- [{issue.severity}] {issue.description}（{issue.location}）"
            )
        lines.append("")
    if cc.suggestions:
        lines.append("**建议**：")
        for s in cc.suggestions:
            lines.append(f"- {s}")
        lines.append("")

    prd = pkg.prd
    lines.extend(["## PRD 文档", "", prd.overview, "", "### 用户故事", ""])
    for story in prd.user_stories:
        lines.append(f"- {story}")
    lines.append("")
    if prd.metrics:
        lines.extend(["### 成功指标", ""])
        for metric in prd.metrics:
            lines.append(f"- {metric}")
        lines.append("")
    if prd.risks:
        lines.extend(["### 风险", ""])
        for risk in prd.risks:
            lines.append(f"- {risk}")
        lines.append("")
    lines.extend(["### MVP 范围", "", prd.mvp_scope, ""])

    return "\n".join(lines)
