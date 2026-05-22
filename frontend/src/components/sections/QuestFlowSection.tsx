import type { QuestFlow } from "../../types/gameContent";
import { SectionLabel } from "../ui/SectionLabel";

export function QuestFlowSection({ data }: { data: QuestFlow }) {
  return (
    <div className="space-y-5">
      {data.loop_summary && (
        <div className="rounded-xl border border-sky-100 bg-sky-50/60 px-4 py-3 text-sm leading-relaxed text-slate-700">
          <span className="font-semibold text-sky-800">玩法循环 · </span>
          {data.loop_summary}
        </div>
      )}

      <SectionLabel icon="🗓">任务时间线</SectionLabel>

      <div className="relative pl-2">
        {data.steps.map((step, i) => (
          <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
            {i < data.steps.length - 1 && (
              <span
                className="absolute left-[19px] top-10 h-[calc(100%-12px)] w-0.5 bg-gradient-to-b from-sky-400 via-sky-200 to-transparent"
                aria-hidden
              />
            )}

            <div className="relative z-10 flex flex-col items-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-600 text-sm font-bold text-white shadow-soft ring-4 ring-white">
                {i + 1}
              </span>
              <span className="mt-1 font-mono text-[9px] text-sky-600">
                {step.id}
              </span>
            </div>

            <div className="min-w-0 flex-1 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <h4 className="text-base font-semibold text-slate-800">
                {step.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.objective}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {step.player_emotion && (
                  <span className="rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-800">
                    😊 {step.player_emotion}
                  </span>
                )}
                {step.playability_note && (
                  <span className="rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-800">
                    🎮 {step.playability_note}
                  </span>
                )}
              </div>

              {step.triggers.length > 0 && (
                <p className="mt-3 border-t border-slate-50 pt-3 text-xs text-slate-500">
                  <span className="font-medium text-slate-600">触发条件 · </span>
                  {step.triggers.join(" · ")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
