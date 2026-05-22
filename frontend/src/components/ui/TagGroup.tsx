import { SectionLabel } from "./SectionLabel";
import { Chip } from "./Chip";

type TagTone = "sky" | "amber" | "emerald";

export function TagGroup({
  title,
  items,
  tone = "sky",
}: {
  title: string;
  items: string[];
  tone?: TagTone;
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <SectionLabel>{title}</SectionLabel>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <Chip key={i} tone={tone}>
            {item}
          </Chip>
        ))}
      </div>
    </div>
  );
}
