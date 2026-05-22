import type { ImprovementSuggestions } from "../../types/gameContent";
import { SectionLabel } from "../ui/SectionLabel";

const PRIORITY_STYLES: Record<
  string,
  { badge: string; border: string; accent: string }
> = {
  P0: {
    badge: "bg-rose-500 text-white",
    border: "border-rose-200",
    accent: "bg-rose-50",
  },
  P1: {
    badge: "bg-amber-500 text-white",
    border: "border-amber-200",
    accent: "bg-amber-50",
  },
  P2: {
    badge: "bg-sky-500 text-white",
    border: "border-sky-200",
    accent: "bg-sky-50",
  },
};

export function ImprovementSection({ data }: { data: ImprovementSuggestions }) {
  return (
    <div className="space-y-5">
      {data.next_iteration_focus && (
        <div className="rounded-2xl border border-sky-200/80 bg-gradient-to-r from-sky-50 via-white to-violet-50/40 p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-700">
            下一轮迭代重点
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-800 sm:text-base">
            {data.next_iteration_focus}
          </p>
        </div>
      )}

      <SectionLabel icon="💡">优化建议卡</SectionLabel>

      <div className="grid gap-3 sm:grid-cols-2">
        {data.items.map((item, i) => {
          const style = PRIORITY_STYLES[item.priority] ?? PRIORITY_STYLES.P2;
          return (
            <article
              key={i}
              className={`overflow-hidden rounded-2xl border shadow-sm ${style.border}`}
            >
              <div
                className={`flex items-center gap-2 px-4 py-2.5 ${style.accent}`}
              >
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${style.badge}`}
                >
                  {item.priority}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  {item.category}
                </span>
              </div>
              <div className="bg-white p-4">
                <h4 className="font-semibold text-slate-800">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.detail}
                </p>
                {item.expected_impact && (
                  <p className="mt-3 rounded-lg bg-emerald-50/80 px-2.5 py-2 text-xs text-emerald-800">
                    <span className="font-semibold">预期影响 · </span>
                    {item.expected_impact}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
