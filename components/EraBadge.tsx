import { eraMap, statusLabels } from "@/lib/eras";
import type { EraId, Status } from "@/lib/eras";
import type { Locale } from "@/lib/types";

/** Generation chip. The name is a label, so it stays English in both locales. */
export function EraBadge({ era, locale }: { era: EraId; locale: Locale }) {
  const e = eraMap[era];
  return (
    <span
      style={{ ["--era" as string]: e.hue }}
      title={e.shift[locale]}
      className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-[hsl(var(--era))] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white"
    >
      <span aria-hidden="true">{e.glyph}</span>
      GEN {era}
    </span>
  );
}

/**
 * Whether the ground is still moving. Only worth showing when it is — a
 * "settled" chip on two thirds of the dex would be noise.
 */
export function StatusBadge({
  status,
  locale,
}: {
  status: Status;
  locale: Locale;
}) {
  if (status !== "rising") return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-amber-300 px-2 py-0.5 text-[10px] font-bold tracking-wide text-black">
      <span aria-hidden="true">📈</span>
      {statusLabels[status][locale]}
    </span>
  );
}
