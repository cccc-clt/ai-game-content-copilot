import type { ContentVersion } from "../../types/copilot";

interface VersionCardProps {
  version: ContentVersion;
  selected: boolean;
  onSelect: () => void;
}

const VARIANT_STYLES: Record<string, string> = {
  A: "border-emerald-200 bg-emerald-50/50",
  B: "border-violet-200 bg-violet-50/50",
  C: "border-amber-200 bg-amber-50/50",
};

export function VersionCard({ version, selected, onSelect }: VersionCardProps) {
  const style = VARIANT_STYLES[version.variant] ?? "border-slate-200 bg-white";

  return (
    <article
      className={`rounded-2xl border-2 p-5 shadow-card transition ${style} ${
        selected ? "ring-2 ring-sky-400 ring-offset-2" : ""
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            版本 {version.variant}
          </span>
          <h4 className="text-base font-semibold text-slate-800">
            {version.variant_label}
          </h4>
        </div>
        <span className="shrink-0 rounded-lg bg-white/80 px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
          AI {version.variant_score.total}
        </span>
      </div>

      <div className="mb-4 whitespace-pre-wrap rounded-xl bg-white/70 p-4 text-sm leading-relaxed text-slate-800">
        {version.content}
      </div>

      {version.variant_score.brief && (
        <p className="mb-3 text-xs text-slate-600">{version.variant_score.brief}</p>
      )}

      {version.pros.length > 0 && (
        <div className="mb-2">
          <p className="text-xs font-medium text-slate-700">优点</p>
          <ul className="mt-1 space-y-0.5 text-xs text-slate-600">
            {version.pros.map((p, i) => (
              <li key={i}>· {p}</li>
            ))}
          </ul>
        </div>
      )}

      {version.use_cases.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-medium text-slate-700">适用场景</p>
          <ul className="mt-1 space-y-0.5 text-xs text-slate-600">
            {version.use_cases.map((u, i) => (
              <li key={i}>· {u}</li>
            ))}
          </ul>
        </div>
      )}

      {version.optimization_tips.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-slate-700">优化建议</p>
          <ul className="mt-1 space-y-0.5 text-xs text-slate-600">
            {version.optimization_tips.map((t, i) => (
              <li key={i}>· {t}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={onSelect}
        className={`w-full rounded-xl px-4 py-2 text-sm font-semibold transition ${
          selected
            ? "bg-sky-600 text-white"
            : "bg-white text-sky-700 ring-1 ring-sky-300 hover:bg-sky-50"
        }`}
      >
        {selected ? "已选中 · 可继续优化" : "选择此版本继续优化"}
      </button>
    </article>
  );
}
