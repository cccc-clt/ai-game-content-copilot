import type { PlayerFeedback } from "../../types/gameContent";

const SENTIMENT_COLORS: Record<string, string> = {
  正面: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  中性: "bg-slate-100 text-slate-600 ring-slate-200",
  负面: "bg-rose-50 text-rose-700 ring-rose-100",
};

export function PlayerFeedbackSection({ data }: { data: PlayerFeedback }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-xs font-medium text-slate-500">玩家画像</p>
        <div className="flex flex-wrap gap-2">
          {data.personas.map((p, i) => (
            <div
              key={i}
              className="max-w-xs rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-800">{p.name}</p>
              <p className="text-xs text-slate-500">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-slate-500">预测反馈</p>
        <div className="space-y-3">
          {data.predictedReactions.map((r, i) => {
            const color =
              SENTIMENT_COLORS[r.sentiment] ??
              "bg-sky-50 text-sky-700 ring-sky-100";
            return (
              <blockquote
                key={i}
                className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    {r.personaName}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ring-1 ${color}`}
                  >
                    {r.sentiment}
                  </span>
                </div>
                <p className="text-sm italic leading-relaxed text-slate-600">
                  「{r.quote}」
                </p>
              </blockquote>
            );
          })}
        </div>
      </div>
    </div>
  );
}
