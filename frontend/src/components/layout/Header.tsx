export function Header() {
  return (
    <header className="border-b border-sky-100/80 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-lg font-bold text-white shadow-soft">
            AI
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-800 sm:text-xl">
              AI Game Content Copilot
            </h1>
            <p className="text-sm text-slate-500">
              从创意到可落地的游戏内容包
            </p>
          </div>
        </div>
        <span className="hidden rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-200/80 sm:inline">
          原创虚构 · 无版权 IP
        </span>
      </div>
    </header>
  );
}
