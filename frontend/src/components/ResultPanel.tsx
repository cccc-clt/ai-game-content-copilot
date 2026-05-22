import { useState } from "react";
import type { GameContentPackage, SectionId } from "../types/gameContent";
import { ResultMetaHeader } from "./result/ResultMetaHeader";
import { ResultTabPanel } from "./result/ResultTabPanel";
import { ConsistencySection } from "./sections/ConsistencySection";
import { DialogueTreeSection } from "./sections/DialogueTreeSection";
import { GameEventSection } from "./sections/GameEventSection";
import { ImprovementSection } from "./sections/ImprovementSection";
import { NpcsSection } from "./sections/NpcsSection";
import { PlayerFeedbackSection } from "./sections/PlayerFeedbackSection";
import { QuestFlowSection } from "./sections/QuestFlowSection";
import { WorldSettingSection } from "./sections/WorldSettingSection";

interface ResultPanelProps {
  data: GameContentPackage;
}

export function ResultPanel({ data }: ResultPanelProps) {
  const [tab, setTab] = useState<SectionId>("event");

  return (
    <div className="space-y-4">
      <ResultMetaHeader meta={data.meta} data={data} />

      <ResultTabPanel activeTab={tab} onTabChange={setTab}>
        {tab === "event" && <GameEventSection data={data.game_event} />}
        {tab === "world" && <WorldSettingSection data={data.world_setting} />}
        {tab === "npcs" && <NpcsSection data={data.npc_profiles} />}
        {tab === "dialogue" && (
          <DialogueTreeSection data={data.dialogue_tree} />
        )}
        {tab === "quest" && <QuestFlowSection data={data.quest_flow} />}
        {tab === "feedback" && (
          <PlayerFeedbackSection data={data.player_feedback} />
        )}
        {tab === "consistency" && (
          <ConsistencySection data={data.consistency_check} />
        )}
        {tab === "improve" && (
          <ImprovementSection data={data.improvement_suggestions} />
        )}
      </ResultTabPanel>
    </div>
  );
}
