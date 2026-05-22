import type { ContentEvaluation } from "../../types/copilot";

const DIMENSIONS: { key: keyof ContentEvaluation; label: string }[] = [
  { key: "persona_consistency", label: "人设一致性" },
  { key: "creativity", label: "创意度" },
  { key: "usability", label: "可用性" },
  { key: "language_style", label: "语言风格" },
  { key: "immersion", label: "沉浸感" },
];

interface EvaluationPanelProps {
  evaluation: ContentEvaluation;
  title?: string;
}

export function EvaluationPanel({
  evaluation,
  title = "AI Evaluation",
}: EvaluationPanelProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-800">
          总分 {evaluation.total} / 50
        </span>
      </div>
      <div className="space-y-3">
        {DIMENSIONS.map(({ key, label }) => {
          const score = evaluation[key] as number;
          return (
            <div key={key}>
              <div className="mb-1 flex justify-between text-xs text-slate-600">
                <span>{label}</span>
                <span className="font-medium text-slate-800">{score} / 10</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all"
                  style={{ width: `${(score / 10) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {evaluation.summary && (
        <p className="mt-4 text-sm leading-relaxed text-slate-700">
          {evaluation.summary}
        </p>
      )}
      {evaluation.suggestions.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-slate-600">
          {evaluation.suggestions.map((s, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-sky-500">·</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
