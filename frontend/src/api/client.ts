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
}> {
  const res = await fetch(apiUrl("/api/health"));
  if (!res.ok) throw new ApiError("Health check failed", res.status);
  return res.json();
}
