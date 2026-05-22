export function ExamplePlaceholder() {
  return (
    <div className="rounded-2xl border border-dashed border-sky-200/80 bg-white/50 p-6 backdrop-blur">
      <h3 className="text-sm font-semibold text-sky-700">示例：星港纪元 · 萤石湾</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        输入左侧创意后，将自动生成剧情活动、NPC 人设、分支对话、任务流程、玩家反馈模拟、一致性检查与
        PRD——全部为原创虚构内容。
      </p>
      <ul className="mt-4 space-y-2 text-xs text-slate-500">
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          8 大内容模块一键生成
        </li>
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          支持 JSON / Markdown 导出
        </li>
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          面向策划 · UGC · AI 产品协作
        </li>
      </ul>
    </div>
  );
}
