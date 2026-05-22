import { useCallback, useState } from "react";
import { exportCopilotMarkdown, exportCopilotTxt } from "../../api/client";
import type { CopilotSessionSnapshot } from "../../types/copilot";

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function safeName(name: string) {
  return name.replace(/[<>:"/\\|?*]/g, "").replace(/\s+/g, "-").slice(0, 40) || "copilot";
}

export function useCopilotExport() {
  const [exporting, setExporting] = useState(false);

  const downloadMarkdown = useCallback(async (snapshot: CopilotSessionSnapshot) => {
    setExporting(true);
    try {
      const md = await exportCopilotMarkdown(snapshot);
      const date = snapshot.generated_at.slice(0, 10);
      downloadBlob(md, `${safeName(snapshot.character.name)}_${date}.md`, "text/markdown");
    } finally {
      setExporting(false);
    }
  }, []);

  const downloadTxt = useCallback(async (snapshot: CopilotSessionSnapshot) => {
    setExporting(true);
    try {
      const txt = await exportCopilotTxt(snapshot);
      const date = snapshot.generated_at.slice(0, 10);
      downloadBlob(txt, `${safeName(snapshot.character.name)}_${date}.txt`, "text/plain");
    } finally {
      setExporting(false);
    }
  }, []);

  return { exporting, downloadMarkdown, downloadTxt };
}
