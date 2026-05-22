import type { ConsistencyCheck } from "../../types/gameContent";
import { SectionLabel } from "../ui/SectionLabel";

export function ConsistencySection({ data }: { data: ConsistencyCheck }) {
  const scoreColor =
    data.score >= 80
      ? "text-emerald-600 ring-emerald-100"
      : data.score >= 60
        ? "text-amber-600 ring-amber-100"
        : "text-rose-600 ring-rose-100";

  const dimensionPass = (score: number) => score >= 70;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
        <div
          className={`mx-auto flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full bg-white shadow-card ring-8 sm:mx-0 ${scoreColor}`}
          role="img"
          aria-label={`一致性评分 ${data.score}`}
        >
          <span className="text-3xl font-bold">{data.score}</span>
          <span className="text-xs text-slate-400">/ 100</span>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm font-bold text-slate-800">内容一致性总评</p>
          {data.summary && (
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {data.summary}
            </p>
          )}
        </div>
      </div>

      {data.dimension_scores.length > 0 && (
        <div>
          <SectionLabel icon="✓">维度 Checklist</SectionLabel>
          <ul className="space-y-2">
            {data.dimension_scores.map((ds, i) => {
              const pass = dimensionPass(ds.score);
              return (
                <li
                  key={i}
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${
                    pass
                      ? "border-emerald-100 bg-emerald-50/50"
                      : "border-amber-100 bg-amber-50/40"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      pass ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                    aria-hidden
                  >
                    {pass ? "✓" : "!"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-slate-800">
                        {ds.dimension}
                      </span>
                      <span
                        className={`text-sm font-bold ${pass ? "text-emerald-700" : "text-amber-700"}`}
                      >
                        {ds.score} 分
                      </span>
                    </div>
                    {ds.note && (
                      <p className="mt-1 text-sm text-slate-600">{ds.note}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {data.issues.length > 0 && (
        <div>
          <SectionLabel icon="⚠">待修复项</SectionLabel>
          <ul className="space-y-2">
            {data.issues.map((issue, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50/30 px-4 py-3"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white"
                  aria-hidden
                >
                  ✕
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-800">
                      {issue.severity}
                    </span>
                    {issue.dimension && (
                      <span className="text-xs text-sky-700">
                        {issue.dimension}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-800">
                    {issue.description}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{issue.location}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
