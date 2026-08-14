import { unitMap } from "@/lib/units";
import type { Locale, UnitId } from "@/lib/types";

/**
 * The unit name is a technical label and stays in English in both locales;
 * only the tooltip explaining it gets translated.
 */
export function UnitBadge({
  unit,
  locale,
  size = "sm",
}: {
  unit: UnitId;
  locale: Locale;
  size?: "sm" | "md";
}) {
  const u = unitMap[unit];
  return (
    <span
      style={{ ["--unit" as string]: u.hue }}
      title={u.tagline[locale]}
      className={[
        "inline-flex items-center gap-1 rounded-full border-2 border-black",
        "bg-[hsl(var(--unit))] font-bold uppercase tracking-wide text-white",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
      ].join(" ")}
    >
      <span aria-hidden="true">{u.glyph}</span>
      {u.name}
    </span>
  );
}
