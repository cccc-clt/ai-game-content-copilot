import type { ReactNode } from "react";

type ChipTone = "sky" | "amber" | "emerald" | "violet" | "slate";

const TONES: Record<ChipTone, string> = {
  sky: "bg-sky-50 text-sky-800 ring-sky-200/80",
  amber: "bg-amber-50 text-amber-900 ring-amber-200/80",
  emerald: "bg-emerald-50 text-emerald-800 ring-emerald-200/80",
  violet: "bg-violet-50 text-violet-800 ring-violet-200/80",
  slate: "bg-slate-50 text-slate-700 ring-slate-200/80",
};

export function Chip({
  children,
  tone = "slate",
}: {
  children: ReactNode;
  tone?: ChipTone;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}
