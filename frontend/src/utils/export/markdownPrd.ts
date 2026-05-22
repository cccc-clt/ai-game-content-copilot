import type { GameContentPackage } from "../../types/gameContent";
import { formatExportDate } from "./filename";

/**
 * 生成游戏内容策划 PRD 风格的 Markdown 文档。
 */
export function packageToMarkdownPrd(pkg: GameContentPackage): string {
  const m = pkg.meta;
  const ge = pkg.game_event;
  const ws = pkg.world_setting;
  const eventName = m.title || ge.title;
  const dateStr = formatExportDate(pkg.generated_at);

  const lines: string[] = [
    `# 游戏内容策划 PRD · ${eventName}`,
    "",
    "> **文档说明**：由 AI Game Content Copilot 自动生成，内容为原创虚构设定。",
    `> **导出日期**：${dateStr}`,
    "",
    "---",
    "",
    "## 1. 活动名称",
    "",
    `**项目名称**：${m.title}`,
    `**活动名称**：${ge.title}`,
    `**活动主题**：${ge.theme}`,
    `**活动周期**：${ge.duration}`,
    "",
    "## 2. 核心创意",
    "",
    `**一句话卖点**：${m.one_line_pitch}`,
    "",
    `**核心体验**：${m.core_experience || "—"}`,
    "",
    `**活动钩子**：${ge.hook}`,
    "",
    `**类型定位**：${m.genre}`,
    "",
    m.tagline ? `**宣传语**：${m.tagline}` : "",
    "",
    "## 3. 目标玩家",
    "",
    `**目标受众**：${m.target_audience}`,
    "",
  ];

  if (ge.playability_highlights.length > 0) {
    lines.push("**可玩性亮点**：", "");
    ge.playability_highlights.forEach((h) => lines.push(`- ${h}`));
    lines.push("");
  }
  if (ge.spread_points.length > 0) {
    lines.push("**传播点**：", "");
    ge.spread_points.forEach((p) => lines.push(`- ${p}`));
    lines.push("");
  }

  lines.push("## 4. 世界观设定", "", ws.overview, "");
  lines.push(`- **时代**：${ws.era}`);
  lines.push(`- **地理**：${ws.geography}`);
  lines.push(`- **美学基调**：${ws.aesthetic_tone}`);
  lines.push(`- **核心冲突**：${ws.core_conflict}`);
  lines.push("");

  if (ws.locations.length > 0) {
    lines.push("### 关键地点", "");
    ws.locations.forEach((loc) => {
      lines.push(`- **${loc.name}**（${loc.mood}）：${loc.description}`);
    });
    lines.push("");
  }
  if (ws.factions.length > 0) {
    lines.push("### 势力", "");
    ws.factions.forEach((f) => {
      lines.push(
        `- **${f.name}**：${f.agenda}${f.player_relation ? `（与玩家：${f.player_relation}）` : ""}`
      );
    });
    lines.push("");
  }
  if (ws.memory_anchors.length > 0) {
    lines.push("### 世界记忆锚点", "");
    ws.memory_anchors.forEach((a) => lines.push(`- ${a}`));
    lines.push("");
  }

  lines.push("## 5. 剧情大纲", "");
  if (ge.emotion_curve.length > 0) {
    lines.push("### 情绪曲线", "");
    ge.emotion_curve.forEach((beat) => {
      lines.push(
        `- **${beat.phase}** · ${beat.mood}（强度 ${beat.intensity}/5）— ${beat.player_goal}`
      );
    });
    lines.push("");
  }
  ge.acts.forEach((act, i) => {
    lines.push(`### 第 ${i + 1} 幕：${act.title}`, "", act.summary, "");
    if (act.player_experience) {
      lines.push(`*玩家体验*：${act.player_experience}`, "");
    }
    if (act.key_beats.length > 0) {
      lines.push("**关键节拍**：");
      act.key_beats.forEach((b) => lines.push(`- ${b}`));
      lines.push("");
    }
  });
  if (ge.rewards.length > 0) {
    lines.push("**活动奖励**：");
    ge.rewards.forEach((r) => lines.push(`- ${r}`));
    lines.push("");
  }

  lines.push("## 6. NPC 人设", "");
  pkg.npc_profiles.forEach((npc) => {
    lines.push(
      `### ${npc.name}（${npc.role}）`,
      "",
      `- **性格**：${npc.personality}`,
      `- **记忆点**：${npc.memory_hook}`,
      `- **情绪弧光**：${npc.emotional_arc || "—"}`,
      `- **说话风格**：${npc.speech_style}`,
      ""
    );
    if (npc.goals.length > 0) {
      lines.push("**目标**：");
      npc.goals.forEach((g) => lines.push(`- ${g}`));
      lines.push("");
    }
    if (npc.relationship_notes) {
      lines.push(`**关系备注**：${npc.relationship_notes}`, "");
    }
  });

  const dt = pkg.dialogue_tree;
  lines.push("## 7. 分支对话树", "", `**根节点**：\`${dt.root_id}\``, "");
  if (dt.design_notes) {
    lines.push(`*设计说明*：${dt.design_notes}`, "");
  }
  dt.nodes.forEach((node) => {
    lines.push(
      `### [${node.id}] ${node.speaker}${node.emotion ? `（${node.emotion}）` : ""}`,
      "",
      node.text,
      ""
    );
    if (node.choices.length > 0) {
      lines.push("**分支选项**：");
      node.choices.forEach((c) => {
        lines.push(
          `- ${c.label} → \`${c.target_id}\`${c.emotional_tone ? `（${c.emotional_tone}）` : ""}`
        );
      });
      lines.push("");
    }
  });

  const qf = pkg.quest_flow;
  lines.push("## 8. 任务流程", "");
  if (qf.loop_summary) {
    lines.push(`**玩法循环**：${qf.loop_summary}`, "");
  }
  qf.steps.forEach((step, i) => {
    lines.push(
      `### 步骤 ${i + 1}：${step.title}（${step.id}）`,
      "",
      `- **目标**：${step.objective}`,
      `- **玩家情绪**：${step.player_emotion || "—"}`,
      `- **可玩性说明**：${step.playability_note || "—"}`
    );
    if (step.triggers.length > 0) {
      lines.push(`- **触发条件**：${step.triggers.join("；")}`);
    }
    lines.push("");
  });

  const pf = pkg.player_feedback;
  lines.push("## 9. 玩家反馈模拟", "", `**整体情绪**：${pf.overall_sentiment || "—"}`, "");
  if (pf.personas.length > 0) {
    lines.push("### 玩家画像", "");
    pf.personas.forEach((p) => {
      lines.push(
        `- **${p.name}**（${p.play_style || "—"}）：${p.description}`
      );
    });
    lines.push("");
  }
  if (pf.experience_highlights.length > 0) {
    lines.push("### 体验亮点", "");
    pf.experience_highlights.forEach((h) => lines.push(`- ${h}`));
    lines.push("");
  }
  if (pf.predicted_reactions.length > 0) {
    lines.push("### 预测反馈", "");
    pf.predicted_reactions.forEach((r) => {
      lines.push(
        `#### ${r.persona_name}（${r.sentiment}${r.emotion_tag ? ` · ${r.emotion_tag}` : ""}）`,
        "",
        `> ${r.quote}`,
        "",
        `- 留存风险：${r.retention_risk || "—"}`,
        `- 传播潜力：${r.shareability || "—"}`,
        ""
      );
    });
  }

  const cc = pkg.consistency_check;
  lines.push(
    "## 10. 内容一致性检查",
    "",
    `**总评分**：${cc.score} / 100`,
    "",
    cc.summary || "",
    ""
  );
  if (cc.dimension_scores.length > 0) {
    lines.push("### 维度评分", "");
    cc.dimension_scores.forEach((ds) => {
      lines.push(`- **${ds.dimension}**：${ds.score} 分 — ${ds.note || "—"}`);
    });
    lines.push("");
  }
  if (cc.issues.length > 0) {
    lines.push("### 待修复问题", "");
    cc.issues.forEach((issue) => {
      lines.push(
        `- [${issue.severity}] ${issue.description}（${issue.location}${issue.dimension ? ` · ${issue.dimension}` : ""}）`
      );
    });
    lines.push("");
  }

  const imp = pkg.improvement_suggestions;
  lines.push("## 11. 后续优化建议", "");
  if (imp.next_iteration_focus) {
    lines.push(`**下一轮迭代重点**：${imp.next_iteration_focus}`, "");
  }
  imp.items.forEach((item) => {
    lines.push(
      `### [${item.priority}] ${item.title}`,
      "",
      `- **类别**：${item.category}`,
      `- **详情**：${item.detail}`,
      `- **预期影响**：${item.expected_impact || "—"}`,
      ""
    );
  });

  lines.push("---", "", "*本文档由 AI Game Content Copilot 导出。*");

  return lines.filter((line, i, arr) => {
    if (line !== "") return true;
    return i === 0 || arr[i - 1] !== "";
  }).join("\n");
}
