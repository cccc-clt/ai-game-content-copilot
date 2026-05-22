import type { ReactNode } from "react";

interface SectionLabelProps {
  icon?: string;
  children: ReactNode;
}

export function SectionLabel({ icon, children }: SectionLabelProps) {
  return (
    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
      {icon && (
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-100 text-[10px] text-sky-600">
          {icon}
        </span>
      )}
      {children}
    </p>
  );
}
