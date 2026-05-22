import type { GameContentPackage } from "../types/gameContent";
import { MarkdownPreviewModal } from "./export/MarkdownPreviewModal";
import { useExportActions } from "./export/useExportActions";

interface ExportBarProps {
  data: GameContentPackage;
  placement?: "inline" | "header";
}

const btnBase =
  "rounded-lg text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-sky-300/60";

export function ExportBar({ data, placement = "inline" }: ExportBarProps) {
  const isHeader = placement === "header";
  const {
    markdown,
    previewOpen,
    copyOk,
    error,
    handleCopyJson,
    handleDownloadJson,
    handlePreviewMarkdown,
    handleDownloadMarkdown,
    closePreview,
  } = useExportActions(data);

  const btnClass = isHeader
    ? `${btnBase} border border-slate-200/90 bg-white/95 px-3 py-2 text-slate-700 shadow-sm hover:border-sky-300 hover:text-sky-700`
    : `${btnBase} border border-slate-200 bg-white px-3 py-1.5 text-slate-600 shadow-sm hover:border-sky-200 hover:text-sky-700`;
  const btnPrimary = isHeader
    ? `${btnBase} bg-sky-500 px-3 py-2 text-white shadow-soft hover:bg-sky-600`
    : `${btnBase} bg-sky-50 px-3 py-1.5 text-sky-700 ring-1 ring-sky-200/80 hover:bg-sky-100`;

  return (
    <>
      <div
        className={
          isHeader
            ? "flex flex-wrap items-center justify-end gap-2"
            : "flex flex-wrap gap-2"
        }
      >
        <button
          type="button"
          onClick={() => void handleCopyJson()}
          className={btnClass}
          title="复制完整 JSON 到剪贴板"
        >
          {copyOk ? "已复制" : "复制 JSON"}
        </button>
        <button
          type="button"
          onClick={handleDownloadJson}
          className={btnClass}
          title="下载 JSON 文件"
        >
          下载 JSON
        </button>
        <button
          type="button"
          onClick={handlePreviewMarkdown}
          className={btnClass}
          title="预览 PRD 风格 Markdown"
        >
          预览 MD
        </button>
        <button
          type="button"
          onClick={handleDownloadMarkdown}
          className={btnPrimary}
          title="下载 Markdown 文件"
        >
          下载 MD
        </button>
      </div>

      {error && (
        <p
          className={`text-xs text-rose-600 ${isHeader ? "mt-2 text-right" : "mt-2"}`}
        >
          {error}
        </p>
      )}

      {previewOpen && (
        <MarkdownPreviewModal
          markdown={markdown}
          title="游戏内容策划 PRD · 预览"
          onClose={closePreview}
        />
      )}
    </>
  );
}
