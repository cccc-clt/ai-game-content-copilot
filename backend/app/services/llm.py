from openai import OpenAI

from app.config import Settings


def create_client(settings: Settings) -> OpenAI:
    return OpenAI(
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url.rstrip("/"),
    )


def chat_json(
    client: OpenAI,
    settings: Settings,
    system: str,
    user: str,
) -> str:
    kwargs: dict = {
        "model": settings.openai_model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "temperature": 0.7,
    }
    kwargs["response_format"] = {"type": "json_object"}

    response = client.chat.completions.create(**kwargs)
    content = response.choices[0].message.content
    if not content:
        raise ValueError("LLM returned empty content")
    return content.strip()
