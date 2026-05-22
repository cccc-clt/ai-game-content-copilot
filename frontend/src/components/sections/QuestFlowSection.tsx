import type { QuestFlow } from "../../types/gameContent";

export function QuestFlowSection({ data }: { data: QuestFlow }) {
  return (
    <ol className="relative space-y-0">
      {data.steps.map((step, i) => (
        <li key={step.id} className="relative flex gap-4 pb-6 last:pb-0">
          {i < data.steps.length - 1 && (
            <span
              className="absolute left-[15px] top-8 h-full w-0.5 bg-gradient-to-b from-sky-200 to-transparent"
              aria-hidden
            />
          )}
          <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white shadow-soft">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-sky-600">{step.id}</span>
              <h4 className="font-medium text-slate-800">{step.title}</h4>
            </div>
            <p className="mt-2 text-sm text-slate-600">{step.objective}</p>
            {step.triggers.length > 0 && (
              <p className="mt-2 text-xs text-slate-500">
                触发：{step.triggers.join(" · ")}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
