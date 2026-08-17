import Link from "next/link";
import { strings } from "@/lib/i18n";
import { unitMap } from "@/lib/units";
import { BrandTile } from "./BrandMark";
import type { Entry, Locale, Migration } from "@/lib/types";

/**
 * One direction of the migration edge. `dontIf` gets the loudest treatment
 * because it is the part that is hard to find elsewhere — every vendor page
 * already tells you what you gain.
 */
export function MigrationList({
  items,
  locale,
  direction,
}: {
  items: { entry: Entry; migration: Migration }[];
  locale: Locale;
  direction: "out" | "in";
}) {
  const s = strings(locale);
  if (items.length === 0) return null;

  return (
    <section className="card-outline rounded-2xl bg-surface p-5">
      <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted">
        <span aria-hidden="true">{direction === "out" ? "➡️" : "⬅️"}</span>
        {s(direction === "out" ? "migrationsOut" : "migrationsIn")}
      </h2>
      <p className="mt-1 mb-4 text-xs text-muted">{s("migrationsHint")}</p>

      <ul className="grid gap-4">
        {items.map(({ entry, migration }) => (
          <li
            key={entry.id}
            className="grid gap-3 rounded-xl border-2 border-black bg-[hsl(var(--unit)/0.05)] p-3 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-4"
          >
            <Link
              href={`/${locale}/dex/${entry.id}`}
              style={{ ["--unit" as string]: unitMap[entry.units[0]].hue }}
              className="pop flex min-w-28 flex-col items-center gap-1.5 rounded-lg border-2 border-black bg-[hsl(var(--unit)/0.12)] p-2 text-center"
            >
              <BrandTile entry={entry} size={22} className="size-10 rounded-lg" />
              <span className="text-xs font-extrabold">{entry.name}</span>
            </Link>

            <dl className="grid gap-2.5">
              <div>
                <dt className="text-[10px] font-black uppercase tracking-widest text-muted">
                  {s("migrationWhy")}
                </dt>
                <dd className="text-sm leading-relaxed">
                  {migration.why[locale]}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-black uppercase tracking-widest text-muted">
                  {s("migrationCost")}
                </dt>
                <dd className="text-sm leading-relaxed">
                  {migration.cost[locale]}
                </dd>
              </div>
              <div className="rounded-lg border-2 border-black bg-amber-50 p-2.5 dark:bg-amber-950/40">
                <dt className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted">
                  <span aria-hidden="true">🛑</span>
                  {s("migrationDontIf")}
                </dt>
                <dd className="mt-0.5 text-sm leading-relaxed font-bold">
                  {migration.dontIf[locale]}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
