import type { ReactNode } from "react";
import type { PrdDocument } from "../../types/gameContent";

export function PrdSection({ data }: { data: PrdDocument }) {
  return (
    <div className="space-y-5 text-sm">
      <div className="rounded-xl bg-slate-50/80 p-4 ring-1 ring-slate-100">
        <p className="text-xs font-medium text-slate-500">产品概述</p>
        <p className="mt-2 leading-relaxed text-slate-700">{data.overview}</p>
      </div>

      {data.userStories.length > 0 && (
        <Section title="用户故事">
          <ul className="space-y-2 text-slate-600">
            {data.userStories.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-mono text-xs text-sky-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {data.metrics.length > 0 && (
        <Section title="成功指标">
          <ul className="list-inside list-disc space-y-1 text-slate-600">
            {data.metrics.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </Section>
      )}

      {data.risks.length > 0 && (
        <Section title="风险">
          <ul className="space-y-2">
            {data.risks.map((r, i) => (
              <li
                key={i}
                className="rounded-lg border border-amber-100 bg-amber-50/50 px-3 py-2 text-slate-600"
              >
                {r}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="MVP 范围">
        <p className="leading-relaxed text-slate-600">{data.mvpScope}</p>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h4>
      {children}
    </div>
  );
}
