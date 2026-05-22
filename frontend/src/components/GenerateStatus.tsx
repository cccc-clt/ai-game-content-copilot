import { useEffect, useState } from "react";

const STEPS = [
  "正在解析游戏创意…",
  "正在构建剧情活动方案…",
  "正在设计 NPC 人设卡…",
  "正在生成分支对话树…",
  "正在编排任务流程…",
  "正在模拟玩家反馈…",
  "正在进行一致性检查…",
  "正在撰写 PRD 文档…",
];

export function GenerateStatus() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % STEPS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-card backdrop-blur">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-200 border-t-sky-500" />
        <p className="text-sm font-medium text-slate-700">{STEPS[index]}</p>
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-4 animate-pulse rounded-lg bg-gradient-to-r from-slate-100 via-sky-50 to-slate-100"
            style={{ width: `${90 - i * 12}%` }}
          />
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-400">
        通常需要 15–60 秒，取决于模型与网络
      </p>
    </div>
  );
}
