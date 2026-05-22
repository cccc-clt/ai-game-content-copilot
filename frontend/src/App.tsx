import { useCallback, useEffect, useState } from "react";
import { ApiError, checkHealth, generateContent } from "./api/client";
import { ExamplePlaceholder } from "./components/ExamplePlaceholder";
import { GenerateStatus } from "./components/GenerateStatus";
import { IdeaForm, type IdeaFormValues } from "./components/IdeaForm";
import { ResultPanel } from "./components/ResultPanel";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import type { GameContentPackage } from "./types/gameContent";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GameContentPackage | null>(null);
  const [apiReady, setApiReady] = useState<boolean | null>(null);

  useEffect(() => {
    checkHealth()
      .then((h) => setApiReady(h.ready ?? h.apiKeyConfigured))
      .catch(() => setApiReady(null));
  }, []);

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
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-50">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {apiReady === false && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            后端环境变量未配置完整：请将{" "}
            <code className="text-xs">.env.example</code> 复制为{" "}
            <code className="text-xs">backend/.env</code>，并填写{" "}
            <code className="text-xs">OPENAI_API_KEY</code> 与{" "}
            <code className="text-xs">OPENAI_MODEL</code>。
          </div>
        )}
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
      </main>
      <Footer />
    </div>
  );
}
