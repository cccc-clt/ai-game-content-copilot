import { useCallback, useEffect, useState } from "react";
import type { GameContentPackage } from "../../types/gameContent";
import {
  buildMarkdownPrd,
  copyPackageJson,
  downloadPackageJson,
  downloadPackageMarkdown,
} from "../../utils/export";

export function useExportActions(data: GameContentPackage) {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [copyOk, setCopyOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMarkdown(null);
    setCopyOk(false);
    setError(null);
    setPreviewOpen(false);
  }, [data]);

  const getMarkdown = useCallback(() => {
    if (!markdown) {
      const md = buildMarkdownPrd(data);
      setMarkdown(md);
      return md;
    }
    return markdown;
  }, [data, markdown]);

  const handleCopyJson = useCallback(async () => {
    setError(null);
    try {
      await copyPackageJson(data);
      setCopyOk(true);
      window.setTimeout(() => setCopyOk(false), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "复制失败");
    }
  }, [data]);

  const handleDownloadJson = useCallback(() => {
    setError(null);
    downloadPackageJson(data);
  }, [data]);

  const handlePreviewMarkdown = useCallback(() => {
    setError(null);
    getMarkdown();
    setPreviewOpen(true);
  }, [getMarkdown]);

  const handleDownloadMarkdown = useCallback(() => {
    setError(null);
    downloadPackageMarkdown(data);
  }, [data]);

  const closePreview = useCallback(() => setPreviewOpen(false), []);

  return {
    markdown: markdown ?? buildMarkdownPrd(data),
    previewOpen,
    copyOk,
    error,
    handleCopyJson,
    handleDownloadJson,
    handlePreviewMarkdown,
    handleDownloadMarkdown,
    closePreview,
  };
}
