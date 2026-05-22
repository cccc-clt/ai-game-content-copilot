import type { PlayerFeedback } from "../../types/gameContent";
import { SectionLabel } from "../ui/SectionLabel";

const SENTIMENT_STYLES: Record<string, { ring: string; bg: string; dot: string }> = {
  正面: {
    ring: "ring-emerald-200",
    bg: "bg-emerald-50",
    dot: "bg-emerald-500",
  },
  中性: {
    ring: "ring-slate-200",
    bg: "bg-slate-50",
    dot: "bg-slate-400",
  },
  负面: {
    ring: "ring-rose-200",
    bg: "bg-rose-50",
    dot: "bg-rose-500",
  },
};

const PERSONA_COLORS = [
  "from-sky-100 to-sky-50 border-sky-200",
  "from-violet-100 to-violet-50 border-violet-200",
  "from-amber-100 to-amber-50 border-amber-200",
  "from-emerald-100 to-emerald-50 border-emerald-200",
];

export function PlayerFeedbackSection({ data }: { data: PlayerFeedback }) {
  return (
    <div className="space-y-6">
      {data.overall_sentiment && (
        <div className="rounded-2xl border border-violet-200/60 bg-gradient-to-r from-violet-50 to-white px-5 py-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
            整体玩家情绪
          </p>
          <p className="mt-1 text-lg font-semibold text-violet-900">
            {data.overall_sentiment}
          </p>
        </div>
      )}

      <div>
        <SectionLabel icon="👥">玩家画像</SectionLabel>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.personas.map((p, i) => (
            <div
              key={i}
              className={`rounded-2xl border bg-gradient-to-br p-4 shadow-sm ${PERSONA_COLORS[i % PERSONA_COLORS.length]}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-lg shadow-sm">
                {p.name.slice(0, 1)}
              </div>
              <h4 className="mt-3 font-bold text-slate-800">{p.name}</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {p.description}
              </p>
              {p.play_style && (
                <p className="mt-2 text-xs font-medium text-sky-700">
                  游玩风格 · {p.play_style}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {data.experience_highlights.length > 0 && (
        <div>
          <SectionLabel>体验亮点</SectionLabel>
          <ul className="grid gap-2 sm:grid-cols-2">
            {data.experience_highlights.map((h, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-lg bg-emerald-50/80 px-3 py-2 text-sm text-emerald-900"
              >
                <span className="font-bold text-emerald-500">✦</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <SectionLabel icon="💭">预测反馈</SectionLabel>
        <div className="grid gap-3 lg:grid-cols-2">
          {data.predicted_reactions.map((r, i) => {
            const style =
              SENTIMENT_STYLES[r.sentiment] ?? SENTIMENT_STYLES["中性"];
            return (
              <div
                key={i}
                className={`rounded-2xl border p-4 shadow-sm ring-1 ${style.ring} ${style.bg}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${style.dot}`}
                    aria-hidden
                  />
                  <span className="font-semibold text-slate-800">
                    {r.persona_name}
                  </span>
                  <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                    {r.sentiment}
                  </span>
                  {r.emotion_tag && (
                    <span className="text-[10px] text-violet-700">
                      {r.emotion_tag}
                    </span>
                  )}
                </div>
                <blockquote className="mt-3 border-l-2 border-slate-300/60 pl-3 text-sm italic leading-relaxed text-slate-700">
                  「{r.quote}」
                </blockquote>
                <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-600">
                  {r.retention_risk && (
                    <span>留存 · {r.retention_risk}</span>
                  )}
                  {r.shareability && (
                    <span>传播 · {r.shareability}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
