import type { GameContentPackage } from "../../types/gameContent";

/** 导出文件名：`活动标题_YYYY-MM-DD`（去除非法字符） */
export function buildExportBasename(pkg: GameContentPackage): string {
  const title =
    pkg.meta.title?.trim() ||
    pkg.game_event.title?.trim() ||
    "game-content";
  const slug = title
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48);
  const date = formatExportDate(pkg.generated_at);
  return `${slug}_${date}`;
}

export function formatExportDate(iso?: string): string {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }
  return d.toISOString().slice(0, 10);
}

export function jsonFilename(pkg: GameContentPackage): string {
  return `${buildExportBasename(pkg)}.json`;
}

export function markdownFilename(pkg: GameContentPackage): string {
  return `${buildExportBasename(pkg)}.md`;
}
