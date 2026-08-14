import Link from "next/link";
import { unitMap } from "@/lib/units";
import { UnitBadge } from "./UnitBadge";
import type { Entry, Locale } from "@/lib/types";

export function DexCard({
  entry,
  locale,
  caught,
}: {
  entry: Entry;
  locale: Locale;
  caught: boolean;
}) {
  const primary = unitMap[entry.units[0]];

  return (
    <Link
      href={`/${locale}/dex/${entry.id}`}
      style={{ ["--unit" as string]: primary.hue }}
      className="pop card-outline unit-tint relative flex flex-col gap-3 rounded-2xl bg-surface p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-xs font-bold text-muted">
          #{String(entry.dex).padStart(3, "0")}
        </span>
        {caught && (
          <span
            className="size-4 shrink-0 rounded-full border-2 border-black bg-[linear-gradient(hsl(0_85%_50%)_0_50%,#fff_50%_100%)]"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="flex items-center gap-3">
        <span
          className="grid size-14 shrink-0 place-items-center rounded-xl border-2 border-black bg-[hsl(var(--unit)/0.18)] text-3xl"
          aria-hidden="true"
        >
          {entry.glyph}
        </span>
        <h3 className="text-lg leading-tight font-extrabold">{entry.name}</h3>
      </div>

      <p className="text-sm leading-snug text-muted">{entry.tagline[locale]}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {entry.units.map((u) => (
          <UnitBadge key={u} unit={u} locale={locale} />
        ))}
      </div>
    </Link>
  );
}
