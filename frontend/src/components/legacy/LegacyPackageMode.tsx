import { useCallback, useState } from "react";
import { ApiError, generateContent } from "../../api/client";
import type { GameContentPackage } from "../../types/gameContent";
import { ExamplePlaceholder } from "../ExamplePlaceholder";
import { GenerateStatus } from "../GenerateStatus";
import { IdeaForm, type IdeaFormValues } from "../IdeaForm";
import { ResultPanel } from "../ResultPanel";

export function LegacyPackageMode() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GameContentPackage | null>(null);

  const handleSubmit = useCallback(async (values: IdeaFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const pkg = await generateContent(values);
      setResult(pkg);
    } catch (e) {
      if (e instanceof ApiError) {
        setError(e.message);
      } else {
        setError(e instanceof Error ? e.message : "生成失败，请稍后重试");
      }
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <p className="mb-4 text-sm text-slate-600">
        高级模式：输入游戏创意，一次生成 8 大结构化内容模块（剧情活动、NPC、对话树、任务流程等）。
      </p>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div>
          <IdeaForm loading={loading} onSubmit={handleSubmit} />
          {error && (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}
        </div>
        <div>
          {loading && <GenerateStatus />}
          {!loading && result && <ResultPanel data={result} />}
          {!loading && !result && <ExamplePlaceholder />}
        </div>
      </div>
    </div>
  );
}
