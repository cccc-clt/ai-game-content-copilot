import type { GameContentPackage } from "../types/gameContent";

export function downloadJson(pkg: GameContentPackage): void {
  const blob = new Blob([JSON.stringify(pkg, null, 2)], {
    type: "application/json",
  });
  const ts = pkg.generatedAt
    ? new Date(pkg.generatedAt).getTime()
    : Date.now();
  triggerDownload(blob, `game-content-${ts}.json`);
}

export function downloadMarkdown(md: string, pkg: GameContentPackage): void {
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const ts = pkg.generatedAt
    ? new Date(pkg.generatedAt).getTime()
    : Date.now();
  triggerDownload(blob, `game-content-${ts}.md`);
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
