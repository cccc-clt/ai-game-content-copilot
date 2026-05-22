const CAPABILITIES = [
  {
    title: "多版本内容生成",
    desc: "一次生成稳妥 / 创意 / 角色风格三版方案，便于策划快速比选。",
  },
  {
    title: "AI 五维评分",
    desc: "从人设一致性、创意度、可用性、语言风格与沉浸感量化评估。",
  },
  {
    title: "迭代优化导出",
    desc: "选中版本继续优化，支持 Markdown / TXT 导出，方便作品集展示。",
  },
  {
    title: "7 类游戏文案",
    desc: "覆盖角色台词、任务、剧情、活动、世界观、NPC 对话与道具描述。",
  },
];

export function HomeHero() {
  return (
    <section className="mb-8 rounded-2xl border border-sky-100/80 bg-white/90 p-6 shadow-card sm:p-8">
      <p className="text-sm font-medium text-sky-700">
        为游戏策划、剧情文案和内容运营打造的 AI 内容生产 Copilot
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
        输入角色设定与内容需求，快速获得可直接用于游戏生产的文案方案。支持三版本对比、AI
        质量评分与迭代优化，帮助团队缩短从创意到可落地文本的路径。
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            目标用户
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li>· 游戏策划与剧情文案</li>
            <li>· 内容运营与活动文案</li>
            <li>· UGC / 二创内容创作者</li>
          </ul>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            产品介绍
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            不是通用聊天机器人，而是面向游戏生产管线的内容 Copilot。所有输出为原创虚构，不含真实
            IP。
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((c) => (
          <div
            key={c.title}
            className="rounded-xl border border-slate-100 bg-gradient-to-b from-white to-sky-50/30 p-4"
          >
            <h4 className="text-sm font-semibold text-slate-800">{c.title}</h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
