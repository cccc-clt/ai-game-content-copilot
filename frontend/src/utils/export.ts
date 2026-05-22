import type { GameContentPackage } from "../types/gameContent";

export function downloadJson(pkg: GameContentPackage): void {
  const blob = new Blob([JSON.stringify(pkg, null, 2)], {
    type: "application/json",
  });
  const ts = pkg.generatedAt
    ? new Date(pkg.generatedAt).getTime()
    : Date.now();
  triggerDownload(blob, `game-content-${ts}.json`);
}

export function downloadMarkdown(md: string, pkg: GameContentPackage): void {
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const ts = pkg.generatedAt
    ? new Date(pkg.generatedAt).getTime()
    : Date.now();
  triggerDownload(blob, `game-content-${ts}.md`);
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function packageToMarkdown(pkg: GameContentPackage): string {
  const m = pkg.meta;
  const lines: string[] = [
    `# ${m.title}`,
    "",
    `> ${m.tagline}`,
    "",
    `**类型**：${m.genre}  |  **受众**：${m.targetAudience}`,
    "",
    `**一句话卖点**：${m.oneLinePitch}`,
    "",
  ];
  if (pkg.generatedAt) {
    lines.push(`*生成时间：${pkg.generatedAt}*`, "");
  }

  const ep = pkg.eventPlan;
  lines.push(
    "## 剧情活动方案",
    "",
    `**钩子**：${ep.hook}`,
    "",
    `**周期**：${ep.duration}`,
    ""
  );
  ep.acts.forEach((act, i) => {
    lines.push(`### 幕 ${i + 1}：${act.title}`, "", act.summary, "");
    if (act.keyBeats.length) {
      lines.push("**关键节拍**：");
      act.keyBeats.forEach((b) => lines.push(`- ${b}`));
      lines.push("");
    }
  });
  if (ep.rewards.length) {
    lines.push("**奖励**：");
    ep.rewards.forEach((r) => lines.push(`- ${r}`));
    lines.push("");
  }

  lines.push("## NPC 人设卡", "");
  pkg.npcs.forEach((npc) => {
    lines.push(
      `### ${npc.name}（${npc.role}）`,
      "",
      `**性格**：${npc.personality}`,
      "",
      `**说话风格**：${npc.speechStyle}`,
      ""
    );
    if (npc.goals.length) {
      lines.push("**目标**：");
      npc.goals.forEach((g) => lines.push(`- ${g}`));
      lines.push("");
    }
  });

  const dt = pkg.dialogueTree;
  lines.push("## 分支对话树", "", `**根节点**：\`${dt.rootId}\``, "");
  dt.nodes.forEach((node) => {
    lines.push(`### [${node.id}] ${node.speaker}`, "", node.text, "");
    if (node.choices.length) {
      lines.push("**选项**：");
      node.choices.forEach((c) =>
        lines.push(`- ${c.label} → \`${c.targetId}\``)
      );
      lines.push("");
    }
  });

  lines.push("## 任务流程", "");
  pkg.questFlow.steps.forEach((step) => {
    lines.push(
      `### ${step.id}：${step.title}`,
      "",
      `**目标**：${step.objective}`,
      ""
    );
    if (step.triggers.length) {
      lines.push(`**触发**：${step.triggers.join(", ")}`, "");
    }
  });

  const pf = pkg.playerFeedback;
  lines.push("## 玩家反馈模拟", "");
  pf.personas.forEach((p) => lines.push(`- **${p.name}**：${p.description}`));
  lines.push("");
  pf.predictedReactions.forEach((r) => {
    lines.push(
      `### ${r.personaName}（${r.sentiment}）`,
      "",
      `> ${r.quote}`,
      ""
    );
  });

  const cc = pkg.consistencyCheck;
  lines.push("## 内容一致性检查", "", `**评分**：${cc.score} / 100`, "");
  if (cc.issues.length) {
    lines.push("**问题**：");
    cc.issues.forEach((issue) =>
      lines.push(
        `- [${issue.severity}] ${issue.description}（${issue.location}）`
      )
    );
    lines.push("");
  }
  if (cc.suggestions.length) {
    lines.push("**建议**：");
    cc.suggestions.forEach((s) => lines.push(`- ${s}`));
    lines.push("");
  }

  const prd = pkg.prd;
  lines.push("## PRD 文档", "", prd.overview, "", "### 用户故事", "");
  prd.userStories.forEach((s) => lines.push(`- ${s}`));
  lines.push("");
  if (prd.metrics.length) {
    lines.push("### 成功指标", "");
    prd.metrics.forEach((m) => lines.push(`- ${m}`));
    lines.push("");
  }
  if (prd.risks.length) {
    lines.push("### 风险", "");
    prd.risks.forEach((r) => lines.push(`- ${r}`));
    lines.push("");
  }
  lines.push("### MVP 范围", "", prd.mvpScope, "");

  return lines.join("\n");
}
