import { useState } from "react";
import type { GameContentPackage, SectionId } from "../types/gameContent";
import { SECTION_TABS } from "../types/gameContent";
import { ExportBar } from "./ExportBar";
import { ConsistencySection } from "./sections/ConsistencySection";
import { DialogueTreeSection } from "./sections/DialogueTreeSection";
import { EventPlanSection } from "./sections/EventPlanSection";
import { NpcsSection } from "./sections/NpcsSection";
import { PlayerFeedbackSection } from "./sections/PlayerFeedbackSection";
import { PrdSection } from "./sections/PrdSection";
import { QuestFlowSection } from "./sections/QuestFlowSection";

interface ResultPanelProps {
  data: GameContentPackage;
}

export function ResultPanel({ data }: ResultPanelProps) {
  const [tab, setTab] = useState<SectionId>("event");
  const { meta } = data;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-sky-100/80 bg-gradient-to-br from-white to-sky-50/40 p-5 shadow-card">
        <h2 className="text-xl font-semibold text-slate-800">{meta.title}</h2>
        <p className="mt-1 text-sm text-sky-700">{meta.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {meta.oneLinePitch}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-white px-2.5 py-1 text-slate-600 ring-1 ring-slate-200/80">
            {meta.genre}
          </span>
          <span className="rounded-full bg-white px-2.5 py-1 text-slate-600 ring-1 ring-slate-200/80">
            {meta.targetAudience}
          </span>
        </div>
        <div className="mt-4">
          <ExportBar data={data} />
        </div>
      </div>

      <div className="rounded-2xl border border-white/60 bg-white/80 shadow-card backdrop-blur">
        <div
          className="flex gap-1 overflow-x-auto border-b border-slate-100 px-2 py-2"
          role="tablist"
        >
          {SECTION_TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                tab === id
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-slate-600 hover:bg-sky-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="p-4 sm:p-5" role="tabpanel">
          {tab === "event" && <EventPlanSection data={data.eventPlan} />}
          {tab === "npcs" && <NpcsSection data={data.npcs} />}
          {tab === "dialogue" && (
            <DialogueTreeSection data={data.dialogueTree} />
          )}
          {tab === "quest" && <QuestFlowSection data={data.questFlow} />}
          {tab === "feedback" && (
            <PlayerFeedbackSection data={data.playerFeedback} />
          )}
          {tab === "consistency" && (
            <ConsistencySection data={data.consistencyCheck} />
          )}
          {tab === "prd" && <PrdSection data={data.prd} />}
        </div>
      </div>
    </div>
  );
}
