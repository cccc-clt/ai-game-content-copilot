/** 与 frontend/.env.example 中 VITE_API_BASE_URL 默认值保持一致 */
const DEFAULT_API_BASE_URL = "http://127.0.0.1:8001";

export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
  return raw.replace(/\/$/, "");
}

export function apiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalized}`;
}
