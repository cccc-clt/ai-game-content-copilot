import json
import re
from typing import Any


def strip_markdown_fence(text: str) -> str:
    text = text.strip()
    match = re.match(r"^```(?:json)?\s*([\s\S]*?)\s*```$", text, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    if text.startswith("```"):
        lines = text.split("\n")
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        return "\n".join(lines).strip()
    return text


def repair_json_text(text: str) -> str:
    repaired = text
    repaired = re.sub(r",\s*}", "}", repaired)
    repaired = re.sub(r",\s*]", "]", repaired)
    repaired = repaired.replace("'", '"')
    return repaired


def extract_json_object(text: str) -> dict[str, Any]:
    cleaned = strip_markdown_fence(text)
    decoder = json.JSONDecoder()

    for i, char in enumerate(cleaned):
        if char != "{":
            continue
        try:
            data, _ = decoder.raw_decode(cleaned[i:])
        except json.JSONDecodeError:
            continue
        if isinstance(data, dict):
            return data

    try:
        repaired = repair_json_text(cleaned)
        data = json.loads(repaired)
        if isinstance(data, dict):
            return data
    except json.JSONDecodeError:
        pass

    raise json.JSONDecodeError("No valid JSON object found in LLM response", cleaned, 0)
