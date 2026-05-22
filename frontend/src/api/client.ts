import type { GameContentPackage, GenerateRequest } from "../types/gameContent";
import { apiUrl } from "./baseUrl";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function generateContent(
  req: GenerateRequest
): Promise<GameContentPackage> {
  const res = await fetch(apiUrl("/api/generate"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const detail =
      typeof data.detail === "string"
        ? data.detail
        : Array.isArray(data.detail)
          ? data.detail.map((d: { msg?: string }) => d.msg).join("; ")
          : `Request failed (${res.status})`;
    throw new ApiError(detail, res.status);
  }

  return data as GameContentPackage;
}

export async function checkHealth(): Promise<{
  status: string;
  apiKeyConfigured: boolean;
  modelConfigured: boolean;
  ready: boolean;
}> {
  const res = await fetch(apiUrl("/api/health"));
  if (!res.ok) throw new ApiError("Health check failed", res.status);
  return res.json();
}

export async function exportMarkdown(
  pkg: GameContentPackage
): Promise<string> {
  const res = await fetch(apiUrl("/api/export/markdown"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pkg),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(
      typeof data.detail === "string"
        ? data.detail
        : `Export failed (${res.status})`,
      res.status
    );
  }

  return typeof data.markdown === "string" ? data.markdown : "";
}
