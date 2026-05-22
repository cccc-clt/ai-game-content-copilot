import json

from app.schemas.response import GameContentPackage


def get_output_schema_json() -> str:
    schema = GameContentPackage.model_json_schema()
    return json.dumps(schema, ensure_ascii=False, indent=2)


def get_schema_outline() -> str:
    return """
{
  "meta": {
    "title": "string",
    "tagline": "string",
    "genre": "string",
    "target_audience": "string",
    "one_line_pitch": "string",
    "core_experience": "string"
  },
  "game_event": {
    "title": "string",
    "theme": "string",
    "hook": "string",
    "duration": "string",
    "emotion_curve": [{ "phase": "string", "mood": "string", "player_goal": "string", "intensity": 1-5 }],
    "acts": [{ "title": "string", "summary": "string", "key_beats": ["string"], "player_experience": "string" }],
    "rewards": ["string"],
    "playability_highlights": ["string"],
    "spread_points": ["string"]
  },
  "world_setting": {
    "overview": "string",
    "era": "string",
    "geography": "string",
    "locations": [{ "name": "string", "description": "string", "mood": "string" }],
    "factions": [{ "name": "string", "agenda": "string", "player_relation": "string" }],
    "core_conflict": "string",
    "aesthetic_tone": "string",
    "memory_anchors": ["string"]
  },
  "npc_profiles": [{
    "name": "string", "role": "string", "personality": "string",
    "memory_hook": "string", "emotional_arc": "string",
    "goals": ["string"], "speech_style": "string", "relationship_notes": "string"
  }],
  "dialogue_tree": {
    "root_id": "string",
    "nodes": [{ "id": "string", "speaker": "string", "text": "string", "emotion": "string",
      "choices": [{ "label": "string", "target_id": "string", "emotional_tone": "string" }] }],
    "design_notes": "string"
  },
  "quest_flow": {
    "steps": [{ "id": "string", "title": "string", "objective": "string", "triggers": ["string"],
      "player_emotion": "string", "playability_note": "string" }],
    "loop_summary": "string"
  },
  "player_feedback": {
    "personas": [{ "name": "string", "description": "string", "play_style": "string" }],
    "predicted_reactions": [{ "persona_name": "string", "sentiment": "string", "emotion_tag": "string",
      "quote": "string", "retention_risk": "string", "shareability": "string" }],
    "overall_sentiment": "string",
    "experience_highlights": ["string"]
  },
  "consistency_check": {
    "score": 0-100,
    "issues": [{ "severity": "高|中|低", "description": "string", "location": "string", "dimension": "string" }],
    "dimension_scores": [{ "dimension": "string", "score": 0-100, "note": "string" }],
    "summary": "string"
  },
  "improvement_suggestions": {
    "items": [{ "priority": "P0|P1|P2", "category": "string", "title": "string", "detail": "string",
      "expected_impact": "string" }],
    "next_iteration_focus": "string"
  }
}
""".strip()
