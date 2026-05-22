export type ContentType =
  | "character_dialogue"
  | "quest_description"
  | "story_expansion"
  | "event_copywriting"
  | "world_building"
  | "npc_dialogue"
  | "item_description";

export const CONTENT_TYPE_OPTIONS: { value: ContentType; label: string }[] = [
  { value: "character_dialogue", label: "角色台词" },
  { value: "quest_description", label: "任务描述" },
  { value: "story_expansion", label: "剧情片段" },
  { value: "event_copywriting", label: "活动文案" },
  { value: "world_building", label: "世界观设定" },
  { value: "npc_dialogue", label: "NPC 对话" },
  { value: "item_description", label: "道具描述" },
];

export interface CharacterProfile {
  name: string;
  personality: string;
  faction: string;
  world_background: string;
  speech_style: string;
  motivation: string;
}

export interface CopilotGenerateRequest {
  character: CharacterProfile;
  content_type: ContentType;
  user_requirement: string;
}

export interface VariantScore {
  total: number;
  brief: string;
}

export interface ContentVersion {
  variant: "A" | "B" | "C";
  variant_label: string;
  content: string;
  pros: string[];
  use_cases: string[];
  variant_score: VariantScore;
  optimization_tips: string[];
}

export interface ContentEvaluation {
  persona_consistency: number;
  creativity: number;
  usability: number;
  language_style: number;
  immersion: number;
  total: number;
  summary: string;
  suggestions: string[];
}

export interface CopilotMeta {
  project_name: string;
  generated_at: string;
  content_type: ContentType;
  content_type_label: string;
}

export interface CopilotGenerateResponse {
  meta: CopilotMeta;
  versions: ContentVersion[];
  evaluation: ContentEvaluation;
}

export interface CopilotOptimizeRequest {
  character: CharacterProfile;
  content_type: ContentType;
  user_requirement: string;
  selected_variant: "A" | "B" | "C";
  selected_content: string;
  user_feedback?: string;
}

export interface CopilotOptimizeResponse {
  optimized_content: string;
  evaluation: ContentEvaluation;
  generated_at: string;
}

export interface CopilotSessionSnapshot {
  project_name: string;
  generated_at: string;
  character: CharacterProfile;
  content_type: ContentType;
  content_type_label: string;
  user_requirement: string;
  final_content: string;
  selected_variant?: string;
  evaluation: ContentEvaluation;
}

export interface CopilotFormValues {
  character: CharacterProfile;
  content_type: ContentType;
  user_requirement: string;
}
