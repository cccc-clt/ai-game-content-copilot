import type { WorldSetting } from "../../types/gameContent";
import { SectionLabel } from "../ui/SectionLabel";

export function WorldSettingSection({ data }: { data: WorldSetting }) {
  return (
    <div className="space-y-5">
      <article className="relative overflow-hidden rounded-2xl border border-amber-200/60 bg-gradient-to-b from-amber-50/80 via-white to-slate-50/50 p-5 shadow-card">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-sm">
            🌍
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            背景设定卡
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
          {data.overview}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-amber-100">
            时代 · {data.era}
          </span>
          <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-amber-100">
            地理 · {data.geography}
          </span>
        </div>
        <p className="mt-4 text-sm text-slate-600">
          <span className="font-semibold text-slate-800">美学基调 · </span>
          {data.aesthetic_tone}
        </p>
      </article>

      <div className="rounded-xl border-l-4 border-rose-300 bg-rose-50/50 px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-wide text-rose-700">
          核心冲突
        </p>
        <p className="mt-1 text-sm leading-relaxed text-slate-800">
          {data.core_conflict}
        </p>
      </div>

      {data.locations.length > 0 && (
        <div>
          <SectionLabel icon="📍">关键地点</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.locations.map((loc, i) => (
              <div
                key={i}
                className="group rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-amber-200/80 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-slate-800">{loc.name}</h4>
                  {loc.mood && (
                    <span className="shrink-0 rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                      {loc.mood}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {loc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.factions.length > 0 && (
        <div>
          <SectionLabel icon="⚔">势力关系</SectionLabel>
          <div className="space-y-2">
            {data.factions.map((f, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span className="font-semibold text-slate-800">{f.name}</span>
                  <p className="text-sm text-slate-600">{f.agenda}</p>
                </div>
                {f.player_relation && (
                  <span className="shrink-0 text-xs font-medium text-sky-700">
                    玩家关系 · {f.player_relation}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.memory_anchors.length > 0 && (
        <div>
          <SectionLabel icon="◆">世界记忆锚点</SectionLabel>
          <div className="grid gap-2 sm:grid-cols-2">
            {data.memory_anchors.map((a, i) => (
              <div
                key={i}
                className="rounded-lg border border-amber-100/80 bg-gradient-to-r from-amber-50/60 to-white px-3 py-2.5 text-sm text-slate-700"
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
