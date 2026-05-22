import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { GameContentPackage } from "../types/gameContent";
import {
  downloadJson,
  downloadMarkdown,
  packageToMarkdown,
} from "../utils/export";

interface ExportBarProps {
  data: GameContentPackage;
}

export function ExportBar({ data }: ExportBarProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const markdown = packageToMarkdown(data);

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
          onClick={() => setPreviewOpen(true)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-sky-200 hover:text-sky-700"
        >
          预览 Markdown
        </button>
        <button
          type="button"
          onClick={() => downloadMarkdown(markdown, data)}
          className="rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 ring-1 ring-sky-200/80 transition hover:bg-sky-100"
        >
          下载 Markdown
        </button>
      </div>

      {previewOpen && (
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
