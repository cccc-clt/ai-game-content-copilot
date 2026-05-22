import type { NpcCard } from "../../types/gameContent";

export function NpcsSection({ data }: { data: NpcCard[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {data.map((npc, i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-100 bg-gradient-to-br from-white to-sky-50/30 p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-slate-800">{npc.name}</h4>
            <span className="shrink-0 rounded-full bg-sky-100 px-2 py-0.5 text-xs text-sky-700">
              {npc.role}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600">{npc.personality}</p>
          <p className="mt-2 text-xs text-slate-500">
            <span className="font-medium text-slate-600">说话风格：</span>
            {npc.speechStyle}
          </p>
          {npc.goals.length > 0 && (
            <ul className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-xs text-slate-500">
              {npc.goals.map((g, j) => (
                <li key={j}>→ {g}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
