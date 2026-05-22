import { useCallback, useState } from "react";
import { ApiError, generateCopilot, optimizeCopilot } from "../../api/client";
import type {
  ContentVersion,
  CopilotFormValues,
  CopilotGenerateResponse,
  CopilotSessionSnapshot,
} from "../../types/copilot";
import { GenerateStatus } from "../GenerateStatus";
import { CharacterProfileForm } from "./CharacterProfileForm";
import { ContentTypeSelect } from "./ContentTypeSelect";
import { EvaluationPanel } from "./EvaluationPanel";
import { VersionCard } from "./VersionCard";
import { EMPTY_CHARACTER, EXAMPLE_PRESETS } from "./examplePresets";
import { useCopilotExport } from "./useCopilotExport";

const DEFAULT_FORM: CopilotFormValues = {
  character: { ...EMPTY_CHARACTER },
  content_type: "character_dialogue",
  user_requirement: "",
};

export function CopilotWorkspace() {
  const [form, setForm] = useState<CopilotFormValues>(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CopilotGenerateResponse | null>(null);
  const [selected, setSelected] = useState<ContentVersion | null>(null);
  const [feedback, setFeedback] = useState("");
  const [finalContent, setFinalContent] = useState<string | null>(null);
  const [finalEval, setFinalEval] = useState<CopilotGenerateResponse["evaluation"] | null>(
    null
  );
  const { exporting, downloadMarkdown, downloadTxt } = useCopilotExport();

  const applyPreset = (values: CopilotFormValues) => {
    setForm(values);
    setResult(null);
    setSelected(null);
    setFinalContent(null);
    setFinalEval(null);
    setError(null);
  };

  const handleGenerate = useCallback(async () => {
    const req = form.user_requirement.trim();
    if (req.length < 10) {
      setError("用户需求至少 10 字");
      return;
    }
    const c = form.character;
    if (!c.name.trim()) {
      setError("请填写角色名称");
      return;
    }
    if (!c.personality.trim() || !c.world_background.trim() || !c.speech_style.trim()) {
      setError("请填写角色性格、世界观背景与说话风格");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    setSelected(null);
    setFinalContent(null);
    setFinalEval(null);
    try {
      const res = await generateCopilot({
        character: form.character,
        content_type: form.content_type,
        user_requirement: req,
      });
      setResult(res);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "生成失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  }, [form]);

  const handleOptimize = useCallback(async () => {
    if (!selected || !result) return;
    setOptimizing(true);
    setError(null);
    try {
      const res = await optimizeCopilot({
        character: form.character,
        content_type: form.content_type,
        user_requirement: form.user_requirement.trim(),
        selected_variant: selected.variant,
        selected_content: selected.content,
        user_feedback: feedback.trim() || undefined,
      });
      setFinalContent(res.optimized_content);
      setFinalEval(res.evaluation);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "优化失败，请稍后重试");
    } finally {
      setOptimizing(false);
    }
  }, [selected, result, form, feedback]);

  const buildSnapshot = (): CopilotSessionSnapshot | null => {
    if (!result) return null;
    const content = finalContent ?? selected?.content;
    const evaluation = finalEval ?? result.evaluation;
    if (!content) return null;
    return {
      project_name: result.meta.project_name,
      generated_at: finalEval ? new Date().toISOString() : result.meta.generated_at,
      character: form.character,
      content_type: form.content_type,
      content_type_label: result.meta.content_type_label,
      user_requirement: form.user_requirement.trim(),
      final_content: content,
      selected_variant: selected?.variant,
      evaluation,
    };
  };

  const snapshot = buildSnapshot();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-card backdrop-blur sm:p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {EXAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.values)}
              disabled={loading}
              className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-800 transition hover:bg-sky-100 disabled:opacity-50"
            >
              {preset.label}
            </button>
          ))}
        </div>

        <CharacterProfileForm
          value={form.character}
          onChange={(character) => setForm((f) => ({ ...f, character }))}
          disabled={loading}
        />

        <div className="mt-5">
          <ContentTypeSelect
            value={form.content_type}
            onChange={(content_type) => setForm((f) => ({ ...f, content_type }))}
            disabled={loading}
          />
        </div>

        <div className="mt-5">
          <label className="mb-1 block text-sm font-semibold text-slate-800">
            用户需求
          </label>
          <textarea
            value={form.user_requirement}
            onChange={(e) =>
              setForm((f) => ({ ...f, user_requirement: e.target.value }))
            }
            rows={4}
            disabled={loading}
            placeholder="描述你想生成的具体场景、语气、长度要求……"
            className="input-field resize-y"
          />
          <p className="mt-1 text-xs text-slate-500">10–2000 字</p>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="mt-5 w-full rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:from-sky-600 hover:to-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "正在生成三版本内容…" : "生成 A / B / C 三版本"}
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {loading && (
        <GenerateStatus label="正在调用 AI 生成三版本与评分…" />
      )}

      {!loading && result && (
        <div className="space-y-6">
          <EvaluationPanel evaluation={result.evaluation} />

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800">生成结果 · 三版本对比</h3>
            {result.versions.map((v) => (
              <VersionCard
                key={v.variant}
                version={v}
                selected={selected?.variant === v.variant}
                onSelect={() => {
                  setSelected(v);
                  setFinalContent(null);
                  setFinalEval(null);
                }}
              />
            ))}
          </div>

          {selected && (
            <div className="rounded-2xl border border-sky-200 bg-sky-50/40 p-5">
              <h3 className="text-sm font-semibold text-slate-800">
                继续优化 · 版本 {selected.variant}
              </h3>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={2}
                disabled={optimizing}
                placeholder="可选：补充优化方向，如更简短、更诗意、加强悬念……"
                className="input-field mt-3 resize-y"
              />
              <button
                type="button"
                onClick={handleOptimize}
                disabled={optimizing}
                className="mt-3 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
              >
                {optimizing ? "优化中…" : "生成优化稿"}
              </button>
            </div>
          )}

          {finalContent && finalEval && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <h3 className="mb-3 text-sm font-semibold text-slate-800">优化后最终内容</h3>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
                  {finalContent}
                </p>
              </div>
              <EvaluationPanel evaluation={finalEval} title="优化后 AI Evaluation" />
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
            <p className="text-sm font-medium text-slate-800">导出</p>
            {!snapshot ? (
              <p className="mt-1 text-xs text-slate-600">
                请先选择一个版本；若已优化，将导出优化后的最终内容与评分。
              </p>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={exporting}
                  onClick={() => downloadMarkdown(snapshot)}
                  className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-50"
                >
                  导出 Markdown
                </button>
                <button
                  type="button"
                  disabled={exporting}
                  onClick={() => downloadTxt(snapshot)}
                  className="rounded-lg border border-sky-300 bg-white px-4 py-2 text-sm font-semibold text-sky-800 hover:bg-sky-50 disabled:opacity-50"
                >
                  导出 TXT
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
