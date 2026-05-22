export type Genre = "科幻" | "奇幻" | "都市" | "悬疑";
export type Platform = "手游" | "PC" | "主机";
export type Tone = "轻松" | "史诗" | "治愈";

export interface GenerateRequest {
  idea: string;
  genre?: Genre;
  platform?: Platform;
  tone?: Tone;
}

export interface MetaInfo {
  title: string;
  tagline: string;
  genre: string;
  targetAudience: string;
  oneLinePitch: string;
}

export interface EventAct {
  title: string;
  summary: string;
  keyBeats: string[];
}

export interface EventPlan {
  hook: string;
  acts: EventAct[];
  rewards: string[];
  duration: string;
}

export interface NpcCard {
  name: string;
  role: string;
  personality: string;
  goals: string[];
  speechStyle: string;
}

export interface DialogueChoice {
  label: string;
  targetId: string;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  choices: DialogueChoice[];
}

export interface DialogueTree {
  rootId: string;
  nodes: DialogueNode[];
}

export interface QuestStep {
  id: string;
  title: string;
  objective: string;
  triggers: string[];
}

export interface QuestFlow {
  steps: QuestStep[];
}

export interface PlayerPersona {
  name: string;
  description: string;
}

export interface PredictedReaction {
  personaName: string;
  sentiment: string;
  quote: string;
}

export interface PlayerFeedback {
  personas: PlayerPersona[];
  predictedReactions: PredictedReaction[];
}

export interface ConsistencyIssue {
  severity: string;
  description: string;
  location: string;
}

export interface ConsistencyCheck {
  score: number;
  issues: ConsistencyIssue[];
  suggestions: string[];
}

export interface PrdDocument {
  overview: string;
  userStories: string[];
  metrics: string[];
  risks: string[];
  mvpScope: string;
}

export interface GameContentPackage {
  meta: MetaInfo;
  eventPlan: EventPlan;
  npcs: NpcCard[];
  dialogueTree: DialogueTree;
  questFlow: QuestFlow;
  playerFeedback: PlayerFeedback;
  consistencyCheck: ConsistencyCheck;
  prd: PrdDocument;
  generatedAt?: string;
}

export type SectionId =
  | "event"
  | "npcs"
  | "dialogue"
  | "quest"
  | "feedback"
  | "consistency"
  | "prd";

export const SECTION_TABS: { id: SectionId; label: string }[] = [
  { id: "event", label: "剧情活动" },
  { id: "npcs", label: "NPC 人设" },
  { id: "dialogue", label: "分支对话" },
  { id: "quest", label: "任务流程" },
  { id: "feedback", label: "玩家反馈" },
  { id: "consistency", label: "一致性" },
  { id: "prd", label: "PRD" },
];
