import type { DialogueTree } from "../../types/gameContent";
import { orderDialogueNodesByDepth } from "../../utils/dialogueTree";
import { SectionLabel } from "../ui/SectionLabel";

export function DialogueTreeSection({ data }: { data: DialogueTree }) {
  const layered = orderDialogueNodesByDepth(data);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600 ring-1 ring-slate-100">
        <span className="font-medium text-slate-700">对话根节点</span>
        <code className="rounded-md bg-white px-2 py-0.5 font-mono text-sky-700 ring-1 ring-sky-100">
          {data.root_id}
        </code>
      </div>

      {data.design_notes && (
        <p className="rounded-xl border border-violet-100 bg-violet-50/50 px-4 py-3 text-sm text-violet-900">
          {data.design_notes}
        </p>
      )}

      <SectionLabel icon="💬">分支层级</SectionLabel>

      <div className="space-y-3">
        {layered.map(({ node, depth }) => {
          const isRoot = node.id === data.root_id;
          return (
            <div
              key={node.id}
              className="relative"
              style={{ marginLeft: `${depth * 20}px` }}
            >
              {depth > 0 && (
                <span
                  className="absolute -left-3 top-5 bottom-0 w-px bg-sky-200"
                  aria-hidden
                />
              )}
              <div
                className={`rounded-xl border p-4 shadow-sm ${
                  isRoot
                    ? "border-sky-300/80 bg-gradient-to-br from-sky-50 to-white ring-1 ring-sky-100"
                    : "border-slate-100 bg-white"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {depth > 0 && (
                    <span className="text-[10px] font-medium text-slate-400">
                      L{depth}
                    </span>
                  )}
                  <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-sky-700">
                    {node.id}
                  </span>
                  <span className="text-sm font-semibold text-slate-800">
                    {node.speaker}
                  </span>
                  {node.emotion && (
                    <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-700">
                      {node.emotion}
                    </span>
                  )}
                  {isRoot && (
                    <span className="rounded-full bg-sky-500 px-2 py-0.5 text-[10px] font-bold text-white">
                      ROOT
                    </span>
                  )}
                </div>

                <p className="mt-3 rounded-lg bg-slate-50/80 px-3 py-2.5 text-sm leading-relaxed text-slate-700">
                  {node.text}
                </p>

                {node.choices.length > 0 && (
                  <ul className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                    {node.choices.map((c, i) => (
                      <li
                        key={i}
                        className="flex flex-wrap items-center gap-2 rounded-lg border border-emerald-100/80 bg-emerald-50/40 px-3 py-2 text-xs"
                      >
                        <span className="font-semibold text-emerald-800">
                          {c.label}
                        </span>
                        <span className="text-slate-300">↓</span>
                        <code className="font-mono text-sky-700">{c.target_id}</code>
                        {c.emotional_tone && (
                          <span className="text-slate-500">· {c.emotional_tone}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
