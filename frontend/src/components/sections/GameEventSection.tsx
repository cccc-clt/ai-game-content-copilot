import type { GameEvent } from "../../types/gameContent";
import { SectionLabel } from "../ui/SectionLabel";
import { TagGroup } from "../ui/TagGroup";

export function GameEventSection({ data }: { data: GameEvent }) {
  return (
    <div className="space-y-5">
      <article className="relative overflow-hidden rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-500/10 via-white to-amber-50/40 p-5 shadow-soft sm:p-6">
        <div className="absolute right-4 top-4 rounded-full bg-sky-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
          主活动
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-600">
          {data.theme}
        </p>
        <h3 className="mt-1 text-xl font-bold text-slate-800 sm:text-2xl">
          {data.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-slate-700">{data.hook}</p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-sky-100">
          <span className="text-sky-500">⏱</span>
          活动周期 · {data.duration}
        </div>
      </article>

      {data.emotion_curve.length > 0 && (
        <div>
          <SectionLabel icon="📈">情绪曲线</SectionLabel>
          <div className="relative flex flex-col gap-0 sm:flex-row sm:items-stretch">
            {data.emotion_curve.map((beat, i) => (
              <div key={i} className="relative flex flex-1 flex-col items-center sm:px-1">
                {i < data.emotion_curve.length - 1 && (
                  <span
                    className="absolute left-1/2 top-6 hidden h-0.5 w-full bg-gradient-to-r from-sky-300 to-sky-100 sm:block"
                    aria-hidden
                  />
                )}
                <div className="relative z-10 w-full rounded-xl border border-sky-100 bg-white p-3 shadow-sm">
                  <p className="text-center text-xs font-bold text-sky-700">
                    {beat.phase}
                  </p>
                  <p className="mt-1 text-center text-sm font-medium text-slate-800">
                    {beat.mood}
                  </p>
                  <p className="mt-2 text-center text-xs leading-snug text-slate-500">
                    {beat.player_goal}
                  </p>
                  <div className="mx-auto mt-3 h-2 w-full max-w-[80px] overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-400"
                      style={{ width: `${(beat.intensity / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.acts.length > 0 && (
        <div>
          <SectionLabel icon="🎬">剧情分幕</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.acts.map((act, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <span className="text-[10px] font-bold text-sky-500">
                  ACT {i + 1}
                </span>
                <h4 className="mt-1 font-semibold text-slate-800">{act.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {act.summary}
                </p>
                {act.player_experience && (
                  <p className="mt-3 rounded-lg bg-sky-50/80 px-2.5 py-2 text-xs text-sky-800">
                    {act.player_experience}
                  </p>
                )}
                {act.key_beats.length > 0 && (
                  <ul className="mt-3 space-y-1 border-t border-slate-50 pt-3">
                    {act.key_beats.map((b, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-xs text-slate-600"
                      >
                        <span className="font-bold text-amber-500">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <TagGroup title="可玩性亮点" items={data.playability_highlights} tone="sky" />
        <TagGroup title="传播点" items={data.spread_points} tone="amber" />
        <TagGroup title="活动奖励" items={data.rewards} tone="emerald" />
      </div>
    </div>
  );
}
