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
  target_audience: string;
  one_line_pitch: string;
  core_experience: string;
}

export interface EmotionBeat {
  phase: string;
  mood: string;
  player_goal: string;
  intensity: number;
}

export interface EventAct {
  title: string;
  summary: string;
  key_beats: string[];
  player_experience: string;
}

export interface GameEvent {
  title: string;
  theme: string;
  hook: string;
  duration: string;
  emotion_curve: EmotionBeat[];
  acts: EventAct[];
  rewards: string[];
  playability_highlights: string[];
  spread_points: string[];
}

export interface WorldLocation {
  name: string;
  description: string;
  mood: string;
}

export interface WorldFaction {
  name: string;
  agenda: string;
  player_relation: string;
}

export interface WorldSetting {
  overview: string;
  era: string;
  geography: string;
  locations: WorldLocation[];
  factions: WorldFaction[];
  core_conflict: string;
  aesthetic_tone: string;
  memory_anchors: string[];
}

export interface NpcProfile {
  name: string;
  role: string;
  personality: string;
  memory_hook: string;
  emotional_arc: string;
  goals: string[];
  speech_style: string;
  relationship_notes: string;
}

export interface DialogueChoice {
  label: string;
  target_id: string;
  emotional_tone: string;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  emotion: string;
  choices: DialogueChoice[];
}

export interface DialogueTree {
  root_id: string;
  nodes: DialogueNode[];
  design_notes: string;
}

export interface QuestStep {
  id: string;
  title: string;
  objective: string;
  triggers: string[];
  player_emotion: string;
  playability_note: string;
}

export interface QuestFlow {
  steps: QuestStep[];
  loop_summary: string;
}

export interface PlayerPersona {
  name: string;
  description: string;
  play_style: string;
}

export interface PredictedReaction {
  persona_name: string;
  sentiment: string;
  emotion_tag: string;
  quote: string;
  retention_risk: string;
  shareability: string;
}

export interface PlayerFeedback {
  personas: PlayerPersona[];
  predicted_reactions: PredictedReaction[];
  overall_sentiment: string;
  experience_highlights: string[];
}

export interface ConsistencyIssue {
  severity: string;
  description: string;
  location: string;
  dimension: string;
}

export interface DimensionScore {
  dimension: string;
  score: number;
  note: string;
}

export interface ConsistencyCheck {
  score: number;
  issues: ConsistencyIssue[];
  dimension_scores: DimensionScore[];
  summary: string;
}

export interface ImprovementItem {
  priority: string;
  category: string;
  title: string;
  detail: string;
  expected_impact: string;
}

export interface ImprovementSuggestions {
  items: ImprovementItem[];
  next_iteration_focus: string;
}

export interface GameContentPackage {
  meta: MetaInfo;
  game_event: GameEvent;
  world_setting: WorldSetting;
  npc_profiles: NpcProfile[];
  dialogue_tree: DialogueTree;
  quest_flow: QuestFlow;
  player_feedback: PlayerFeedback;
  consistency_check: ConsistencyCheck;
  improvement_suggestions: ImprovementSuggestions;
  generated_at?: string;
}

export type SectionId =
  | "event"
  | "world"
  | "npcs"
  | "dialogue"
  | "quest"
  | "feedback"
  | "consistency"
  | "improve";

export const SECTION_TABS: { id: SectionId; label: string }[] = [
  { id: "event", label: "剧情活动" },
  { id: "world", label: "世界观" },
  { id: "npcs", label: "NPC 人设" },
  { id: "dialogue", label: "分支对话" },
  { id: "quest", label: "任务流程" },
  { id: "feedback", label: "玩家反馈" },
  { id: "consistency", label: "一致性" },
  { id: "improve", label: "优化建议" },
];
