import type { FormEvent } from "react";
import type { Genre, Platform, Tone } from "../types/gameContent";

const GENRES: Genre[] = ["科幻", "奇幻", "都市", "悬疑"];
const PLATFORMS: Platform[] = ["手游", "PC", "主机"];
const TONES: Tone[] = ["轻松", "史诗", "治愈"];

const EXAMPLE_IDEA =
  "在漂浮的星港都市「萤石湾」，玩家扮演失忆的旅者，通过修复古老的共鸣装置，逐步揭开一场关于记忆贸易的阴谋。核心玩法是探索 + 轻社交解谜，每周推出可协作完成的限时剧情活动。";

export interface IdeaFormValues {
  idea: string;
  genre?: Genre;
  platform?: Platform;
  tone?: Tone;
}

interface IdeaFormProps {
  loading: boolean;
  onSubmit: (values: IdeaFormValues) => void;
}

export function IdeaForm({ loading, onSubmit }: IdeaFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const idea = (fd.get("idea") as string).trim();
    if (!idea) return;
    onSubmit({
      idea,
      genre: (fd.get("genre") as Genre) || undefined,
      platform: (fd.get("platform") as Platform) || undefined,
      tone: (fd.get("tone") as Tone) || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-card backdrop-blur sm:p-6"
    >
      <label className="mb-2 block text-sm font-medium text-slate-700">
        游戏创意
      </label>
      <textarea
        name="idea"
        required
        minLength={10}
        maxLength={2000}
        rows={6}
        defaultValue={EXAMPLE_IDEA}
        placeholder="描述你的游戏世界观、核心玩法、目标玩家……"
        className="w-full resize-y rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-sm leading-relaxed text-slate-700 placeholder:text-slate-400 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200/60"
        disabled={loading}
      />
      <p className="mt-1 text-xs text-slate-400">10–2000 字</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <SelectField name="genre" label="类型" options={GENRES} disabled={loading} />
        <SelectField
          name="platform"
          label="平台"
          options={PLATFORMS}
          disabled={loading}
        />
        <SelectField name="tone" label="基调" options={TONES} disabled={loading} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:from-sky-600 hover:to-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "正在生成内容包…" : "生成内容包"}
      </button>
    </form>
  );
}

function SelectField({
  name,
  label,
  options,
  disabled,
}: {
  name: string;
  label: string;
  options: string[];
  disabled: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-500">
        {label}
      </label>
      <select
        name={name}
        disabled={disabled}
        defaultValue=""
        className="w-full rounded-lg border border-slate-200/80 bg-white px-3 py-2 text-sm text-slate-700 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-200/60"
      >
        <option value="">不限</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
