import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ApiError, exportMarkdown } from "../api/client";
import type { GameContentPackage } from "../types/gameContent";
import { downloadJson, downloadMarkdown } from "../utils/export";

interface ExportBarProps {
  data: GameContentPackage;
}

export function ExportBar({ data }: ExportBarProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  useEffect(() => {
    setMarkdown(null);
    setExportError(null);
  }, [data]);

  const getMarkdown = async () => {
    if (markdown) return markdown;
    setExporting(true);
    setExportError(null);
    try {
      const md = await exportMarkdown(data);
      setMarkdown(md);
      return md;
    } catch (e) {
      const message =
        e instanceof ApiError
          ? e.message
          : e instanceof Error
            ? e.message
            : "Markdown 导出失败";
      setExportError(message);
      return null;
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => downloadJson(data)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-sky-200 hover:text-sky-700"
        >
          下载 JSON
        </button>
        <button
          type="button"
          onClick={async () => {
            const md = await getMarkdown();
            if (md) setPreviewOpen(true);
          }}
          disabled={exporting}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-sky-200 hover:text-sky-700"
        >
          {exporting ? "导出中…" : "预览 Markdown"}
        </button>
        <button
          type="button"
          onClick={async () => {
            const md = await getMarkdown();
            if (md) downloadMarkdown(md, data);
          }}
          disabled={exporting}
          className="rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 ring-1 ring-sky-200/80 transition hover:bg-sky-100"
        >
          下载 Markdown
        </button>
      </div>
      {exportError && (
        <p className="mt-2 text-xs text-rose-600">{exportError}</p>
      )}

      {previewOpen && markdown && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
              <h3 className="text-sm font-semibold text-slate-800">
                Markdown 预览
              </h3>
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-100"
              >
                关闭
              </button>
            </div>
            <div className="prose prose-sm max-w-none overflow-y-auto px-5 py-4 prose-headings:text-slate-800 prose-p:text-slate-600">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
