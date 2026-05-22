import type {
  CopilotGenerateRequest,
  CopilotGenerateResponse,
  CopilotOptimizeRequest,
  CopilotOptimizeResponse,
  CopilotSessionSnapshot,
} from "../types/copilot";
import type { GameContentPackage, GenerateRequest } from "../types/gameContent";
import { apiUrl } from "./baseUrl";

async function parseResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail =
      typeof data.detail === "string"
        ? data.detail
        : Array.isArray(data.detail)
          ? data.detail
              .map((d: { msg?: string; loc?: (string | number)[] }) => {
                const field = Array.isArray(d.loc)
                  ? d.loc.filter((x) => x !== "body").join(".")
                  : "";
                return field ? `${field}: ${d.msg ?? "校验失败"}` : (d.msg ?? "校验失败");
              })
              .join("; ")
          : `Request failed (${res.status})`;
    throw new ApiError(detail, res.status);
  }
  return data as T;
}

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

  return parseResponse<GameContentPackage>(res);
}

export async function generateCopilot(
  req: CopilotGenerateRequest
): Promise<CopilotGenerateResponse> {
  const res = await fetch(apiUrl("/api/copilot/generate"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  return parseResponse<CopilotGenerateResponse>(res);
}

export async function optimizeCopilot(
  req: CopilotOptimizeRequest
): Promise<CopilotOptimizeResponse> {
  const res = await fetch(apiUrl("/api/copilot/optimize"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  return parseResponse<CopilotOptimizeResponse>(res);
}

export async function exportCopilotMarkdown(
  snapshot: CopilotSessionSnapshot
): Promise<string> {
  const res = await fetch(apiUrl("/api/copilot/export/markdown"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(snapshot),
  });
  const data = await parseResponse<{ markdown: string }>(res);
  return data.markdown;
}

export async function exportCopilotTxt(
  snapshot: CopilotSessionSnapshot
): Promise<string> {
  const res = await fetch(apiUrl("/api/copilot/export/txt"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(snapshot),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new ApiError(
      typeof data.detail === "string" ? data.detail : `Export failed (${res.status})`,
      res.status
    );
  }
  return res.text();
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

  const data = await parseResponse<{ markdown: string }>(res);
  return data.markdown;
}
