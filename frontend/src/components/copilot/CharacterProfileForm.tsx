import type { CharacterProfile } from "../../types/copilot";

interface CharacterProfileFormProps {
  value: CharacterProfile;
  onChange: (value: CharacterProfile) => void;
  disabled?: boolean;
}

const FIELDS: {
  key: keyof CharacterProfile;
  label: string;
  rows?: number;
  required?: boolean;
}[] = [
  { key: "name", label: "角色名称", required: true },
  { key: "personality", label: "角色性格", rows: 2, required: true },
  { key: "faction", label: "所属阵营" },
  { key: "world_background", label: "世界观背景", rows: 2, required: true },
  { key: "speech_style", label: "说话风格", rows: 2, required: true },
  { key: "motivation", label: "角色目标 / 动机", rows: 2 },
];

export function CharacterProfileForm({
  value,
  onChange,
  disabled,
}: CharacterProfileFormProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-800">角色设定</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {FIELDS.map(({ key, label, rows, required }) => (
          <div key={key} className={rows && rows > 1 ? "sm:col-span-2" : ""}>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              {label}
              {required ? <span className="text-rose-500"> *</span> : null}
            </label>
            {rows && rows > 1 ? (
              <textarea
                value={value[key]}
                onChange={(e) => onChange({ ...value, [key]: e.target.value })}
                rows={rows}
                disabled={disabled}
                className="input-field resize-y"
              />
            ) : (
              <input
                type="text"
                value={value[key]}
                onChange={(e) => onChange({ ...value, [key]: e.target.value })}
                disabled={disabled}
                className="input-field"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
