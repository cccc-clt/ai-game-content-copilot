import { useEffect, useState } from "react";
import { checkHealth } from "./api/client";
import { CopilotWorkspace } from "./components/copilot/CopilotWorkspace";
import { LegacyPackageMode } from "./components/legacy/LegacyPackageMode";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { HomeHero } from "./components/layout/HomeHero";

type TabId = "copilot" | "legacy";

export default function App() {
  const [tab, setTab] = useState<TabId>("copilot");
  const [apiReady, setApiReady] = useState<boolean | null>(null);

  useEffect(() => {
    checkHealth()
      .then((h) => setApiReady(h.ready ?? h.apiKeyConfigured))
      .catch(() => setApiReady(null));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-50">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {apiReady === false && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            后端环境变量未配置完整：请将{" "}
            <code className="text-xs font-medium">.env.example</code> 复制为项目根目录{" "}
            <code className="text-xs font-medium">.env</code>，并填写{" "}
            <code className="text-xs font-medium">OPENAI_API_KEY</code> 与{" "}
            <code className="text-xs font-medium">OPENAI_MODEL</code>。
          </div>
        )}

        <HomeHero />

        <div className="mb-6 flex gap-2 rounded-xl border border-slate-200 bg-white/80 p-1 shadow-sm">
          <TabButton
            active={tab === "copilot"}
            onClick={() => setTab("copilot")}
            label="内容 Copilot"
          />
          <TabButton
            active={tab === "legacy"}
            onClick={() => setTab("legacy")}
            label="内容包模式"
          />
        </div>

        {tab === "copilot" ? <CopilotWorkspace /> : <LegacyPackageMode />}
      </main>
      <Footer />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
        active
          ? "bg-sky-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
      }`}
    >
      {label}
    </button>
  );
}
