import type { EventPlan } from "../../types/gameContent";

export function EventPlanSection({ data }: { data: EventPlan }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-sky-50/80 p-4 ring-1 ring-sky-100">
        <p className="text-xs font-medium uppercase tracking-wide text-sky-600">
          活动钩子
        </p>
        <p className="mt-1 text-sm leading-relaxed text-slate-700">{data.hook}</p>
      </div>
      <p className="text-xs text-slate-500">
        建议周期：<span className="font-medium text-slate-700">{data.duration}</span>
      </p>
      {data.acts.map((act, i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
        >
          <h4 className="font-medium text-slate-800">
            幕 {i + 1}：{act.title}
          </h4>
          <p className="mt-2 text-sm text-slate-600">{act.summary}</p>
          {act.keyBeats.length > 0 && (
            <ul className="mt-3 space-y-1 text-xs text-slate-500">
              {act.keyBeats.map((b, j) => (
                <li key={j} className="flex gap-2">
                  <span className="text-sky-400">•</span>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      {data.rewards.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium text-slate-500">活动奖励</p>
          <div className="flex flex-wrap gap-2">
            {data.rewards.map((r, i) => (
              <span
                key={i}
                className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-800 ring-1 ring-amber-200/60"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
