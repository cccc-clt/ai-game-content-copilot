from openai import OpenAI

from src.config.settings import Settings


def create_client(settings: Settings) -> OpenAI:
    return OpenAI(
        api_key=settings.openai_api_key,
        base_url=settings.openai_base_url.rstrip("/"),
    )


def _looks_like_response_format_error(exc: Exception) -> bool:
    message = str(exc).lower()
    return "response_format" in message or "json_object" in message


def _create_completion_with_json_fallback(client: OpenAI, kwargs: dict):
    try:
        return client.chat.completions.create(**kwargs)
    except Exception as exc:
        if "response_format" not in kwargs or not _looks_like_response_format_error(exc):
            raise
        fallback_kwargs = dict(kwargs)
        fallback_kwargs.pop("response_format", None)
        return client.chat.completions.create(**fallback_kwargs)


def chat_json(
    client: OpenAI,
    settings: Settings,
    system: str,
    user: str,
    *,
    temperature: float = 0.7,
) -> str:
    kwargs: dict = {
        "model": settings.openai_model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "temperature": temperature,
    }
    kwargs["response_format"] = {"type": "json_object"}

    response = _create_completion_with_json_fallback(client, kwargs)
    content = response.choices[0].message.content
    if not content:
        raise ValueError("LLM returned empty content")
    return content.strip()
