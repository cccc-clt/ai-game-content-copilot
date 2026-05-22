import type { ReactNode } from "react";
import type { SectionId } from "../../types/gameContent";
import { SECTION_TABS } from "../../types/gameContent";

interface ResultTabPanelProps {
  activeTab: SectionId;
  onTabChange: (id: SectionId) => void;
  children: ReactNode;
}

export function ResultTabPanel({
  activeTab,
  onTabChange,
  children,
}: ResultTabPanelProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-card backdrop-blur">
      <div
        className="flex gap-1 overflow-x-auto border-b border-slate-100/80 bg-slate-50/50 px-2 py-2.5"
        role="tablist"
      >
        {SECTION_TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeTab === id}
            onClick={() => onTabChange(id)}
            className={`shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              activeTab === id
                ? "bg-white text-sky-700 shadow-sm ring-1 ring-sky-200/80"
                : "text-slate-600 hover:bg-white/60 hover:text-slate-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="min-h-[280px] p-4 sm:p-6" role="tabpanel">
        {children}
      </div>
    </div>
  );
}
