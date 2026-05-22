import ReactMarkdown from "react-markdown";

interface MarkdownPreviewModalProps {
  markdown: string;
  title?: string;
  onClose: () => void;
}

export function MarkdownPreviewModal({
  markdown,
  title = "Markdown 预览",
  onClose,
}: MarkdownPreviewModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="md-preview-title"
    >
      <div
        className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-3">
          <h3
            id="md-preview-title"
            className="text-sm font-semibold text-slate-800"
          >
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100"
          >
            关闭
          </button>
        </div>
        <div className="prose prose-sm max-w-none overflow-y-auto px-5 py-5 prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
