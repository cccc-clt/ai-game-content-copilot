import type { NpcProfile } from "../../types/gameContent";

const AVATAR_GRADIENTS = [
  "from-sky-400 to-indigo-500",
  "from-violet-400 to-purple-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-500",
  "from-rose-400 to-pink-500",
];

function avatarInitial(name: string): string {
  const trimmed = name.replace(/[·\s]/g, "");
  return trimmed.slice(0, 1) || "?";
}

export function NpcsSection({ data }: { data: NpcProfile[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {data.map((npc, i) => (
        <article
          key={i}
          className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition hover:shadow-soft"
        >
          <div
            className={`flex items-center gap-4 bg-gradient-to-r ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} px-4 py-4`}
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/25 text-2xl font-bold text-white shadow-inner backdrop-blur-sm">
              {avatarInitial(npc.name)}
            </div>
            <div className="min-w-0 text-white">
              <h4 className="truncate text-lg font-bold">{npc.name}</h4>
              <p className="text-xs font-medium text-white/90">{npc.role}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-4">
            <div className="rounded-lg border border-amber-100 bg-amber-50/70 px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-wide text-amber-800">
                记忆点
              </p>
              <p className="mt-0.5 text-sm font-medium text-amber-950">
                {npc.memory_hook}
              </p>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {npc.personality}
            </p>

            {npc.emotional_arc && (
              <p className="mt-3 text-xs leading-relaxed text-violet-800">
                <span className="font-semibold">情绪弧光 · </span>
                {npc.emotional_arc}
              </p>
            )}

            <p className="mt-2 rounded-md bg-slate-50 px-2.5 py-2 text-xs italic text-slate-600">
              「{npc.speech_style}」
            </p>

            {npc.goals.length > 0 && (
              <ul className="mt-3 space-y-1 border-t border-slate-100 pt-3">
                {npc.goals.map((g, j) => (
                  <li key={j} className="flex gap-2 text-xs text-slate-600">
                    <span className="text-sky-500">→</span>
                    {g}
                  </li>
                ))}
              </ul>
            )}

            {npc.relationship_notes && (
              <p className="mt-auto pt-3 text-xs text-sky-700">
                {npc.relationship_notes}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
