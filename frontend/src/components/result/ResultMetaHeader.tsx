import type { GameContentPackage, MetaInfo } from "../../types/gameContent";
import { ExportBar } from "../ExportBar";

interface ResultMetaHeaderProps {
  meta: MetaInfo;
  data: GameContentPackage;
}

export function ResultMetaHeader({ meta, data }: ResultMetaHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-sky-100/90 bg-gradient-to-br from-white via-sky-50/40 to-violet-50/30 p-5 shadow-card sm:p-6">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-200/30 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-6 left-1/3 h-24 w-24 rounded-full bg-amber-200/25 blur-2xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 pr-0 sm:pr-4">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-sky-600 ring-1 ring-sky-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            内容包已生成
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
            {meta.title}
          </h2>
          <p className="mt-1.5 text-sm font-medium text-sky-700">{meta.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {meta.one_line_pitch}
          </p>
          {meta.core_experience && (
            <p className="mt-3 rounded-lg border border-violet-100/80 bg-violet-50/50 px-3 py-2 text-sm text-violet-900">
              <span className="font-medium">核心体验 · </span>
              {meta.core_experience}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200/80">
              {meta.genre}
            </span>
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200/80">
              {meta.target_audience}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 justify-end sm:flex-col sm:items-end">
          <ExportBar data={data} placement="header" />
        </div>
      </div>
    </div>
  );
}
