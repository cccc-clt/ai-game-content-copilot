import { CONTENT_TYPE_OPTIONS, type ContentType } from "../../types/copilot";

interface ContentTypeSelectProps {
  value: ContentType;
  onChange: (value: ContentType) => void;
  disabled?: boolean;
}

export function ContentTypeSelect({
  value,
  onChange,
  disabled,
}: ContentTypeSelectProps) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-slate-800">内容类型</h3>
      <div className="flex flex-wrap gap-2">
        {CONTENT_TYPE_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition ${
              value === opt.value
                ? "border-sky-400 bg-sky-50 font-medium text-sky-800"
                : "border-slate-200 bg-white text-slate-700 hover:border-sky-200"
            } ${disabled ? "pointer-events-none opacity-60" : ""}`}
          >
            <input
              type="radio"
              name="content_type"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
              disabled={disabled}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}
