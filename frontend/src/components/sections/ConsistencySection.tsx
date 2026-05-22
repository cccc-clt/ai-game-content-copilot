import type { ConsistencyCheck } from "../../types/gameContent";

const SEVERITY_STYLES: Record<string, string> = {
  高: "bg-rose-100 text-rose-700",
  中: "bg-amber-100 text-amber-700",
  低: "bg-slate-100 text-slate-600",
};

export function ConsistencySection({ data }: { data: ConsistencyCheck }) {
  const scoreColor =
    data.score >= 80
      ? "text-emerald-600"
      : data.score >= 60
        ? "text-amber-600"
        : "text-rose-600";

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-6">
        <div
          className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-card ring-4 ring-sky-100"
          role="img"
          aria-label={`一致性评分 ${data.score}`}
        >
          <span className={`text-2xl font-bold ${scoreColor}`}>
            {data.score}
          </span>
          <span className="absolute bottom-3 text-[10px] text-slate-400">
            / 100
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-800">内容一致性评分</p>
          <p className="mt-1 text-xs text-slate-500">
            综合剧情、人设、对话与任务设定的内部一致性
          </p>
        </div>
      </div>

      {data.issues.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium text-slate-500">发现问题</p>
          <ul className="space-y-2">
            {data.issues.map((issue, i) => (
              <li
                key={i}
                className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-sm"
              >
                <span
                  className={`mr-2 inline rounded px-1.5 py-0.5 text-xs font-medium ${
                    SEVERITY_STYLES[issue.severity] ?? SEVERITY_STYLES["低"]
                  }`}
                >
                  {issue.severity}
                </span>
                <span className="text-slate-700">{issue.description}</span>
                <span className="mt-1 block text-xs text-slate-400">
                  {issue.location}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.suggestions.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium text-slate-500">优化建议</p>
          <ul className="space-y-1.5 text-sm text-slate-600">
            {data.suggestions.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-sky-400">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
