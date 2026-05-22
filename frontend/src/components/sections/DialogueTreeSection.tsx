import type { DialogueTree } from "../../types/gameContent";

export function DialogueTreeSection({ data }: { data: DialogueTree }) {
  const nodeMap = new Map(data.nodes.map((n) => [n.id, n]));

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-500">
        根节点：<code className="rounded bg-slate-100 px-1.5 py-0.5 text-sky-700">{data.rootId}</code>
      </p>
      {data.nodes.map((node) => (
        <div
          key={node.id}
          className={`rounded-xl border p-4 ${
            node.id === data.rootId
              ? "border-sky-200 bg-sky-50/50"
              : "border-slate-100 bg-white"
          }`}
          style={{
            marginLeft: `${Math.min(node.id.length % 3, 2) * 12}px`,
          }}
        >
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-mono text-sky-600">{node.id}</span>
            <span>·</span>
            <span className="font-medium text-slate-700">{node.speaker}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{node.text}</p>
          {node.choices.length > 0 && (
            <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
              {node.choices.map((c, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-xs text-slate-600"
                >
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-emerald-700 ring-1 ring-emerald-100">
                    {c.label}
                  </span>
                  <span className="text-slate-400">→</span>
                  <span className="font-mono text-sky-600">
                    {nodeMap.has(c.targetId) ? c.targetId : c.targetId}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
