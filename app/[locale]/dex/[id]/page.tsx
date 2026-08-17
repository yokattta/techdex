import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BrandTile } from "@/components/BrandMark";
import { CaughtButton } from "@/components/CaughtButton";
import { EraBadge, StatusBadge } from "@/components/EraBadge";
import { RarityStars, rarityLabel } from "@/components/RarityStars";
import { StatBars } from "@/components/StatBars";
import { UnitBadge } from "@/components/UnitBadge";
import { MigrationList } from "@/components/MigrationList";
import {
  clashesFor,
  entries,
  evolutionChain,
  getEntry,
  migrationsFrom,
  migrationsInto,
  rarityOf,
} from "@/lib/entries";
import { isLocale, locales, strings } from "@/lib/i18n";
import { gymsWithEntry } from "@/lib/gyms";
import { routesContaining } from "@/lib/routes";
import { unitMap } from "@/lib/units";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    entries.map((entry) => ({ locale, id: entry.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const entry = getEntry(id);
  if (!entry || !isLocale(locale)) return { title: "Not found" };
  return {
    title: entry.name,
    description: entry.tagline[locale],
  };
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();

  const entry = getEntry(id);
  if (!entry) notFound();

  const s = strings(locale);
  const primary = unitMap[entry.units[0]];
  const chain = evolutionChain(entry.id);
  const clashes = clashesFor(entry.id);
  const rarity = rarityOf(entry);
  const onRoutes = routesContaining(entry.id);
  const movesOut = migrationsFrom(entry.id);
  const movesIn = migrationsInto(entry.id);
  const inGyms = gymsWithEntry(entry.id);

  return (
    <div
      style={{ ["--unit" as string]: primary.hue }}
      className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-start"
    >
      <p className="lg:col-span-2">
        <Link
          href={`/${locale}`}
          className="text-sm font-bold text-muted underline underline-offset-4 hover:text-foreground"
        >
          ← {s("backToDex")}
        </Link>
      </p>

      {/* Card face */}
      <aside className="card-outline-lg unit-tint mx-auto grid w-full max-w-sm gap-4 rounded-3xl bg-surface p-5 lg:sticky lg:top-6 lg:max-w-none">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-muted">
              #{String(entry.dex).padStart(3, "0")}
            </span>
            <RarityStars rarity={rarity} locale={locale} />
            <span className="text-[10px] font-bold uppercase tracking-wide text-muted">
              {rarityLabel(rarity, locale)}
            </span>
          </span>
          <div className="flex flex-wrap justify-end gap-1.5">
            {entry.units.map((u) => (
              <UnitBadge key={u} unit={u} locale={locale} />
            ))}
            <EraBadge era={entry.era} locale={locale} />
            <StatusBadge status={entry.status} locale={locale} />
          </div>
        </div>

        <BrandTile
          entry={entry}
          size={84}
          className="aspect-[4/3] rounded-2xl border-3!"
        />

        <div className="grid gap-1">
          <h1 className="text-3xl leading-tight font-black">{entry.name}</h1>
          <p className="text-sm text-muted">{entry.tagline[locale]}</p>
        </div>

        <CaughtButton id={entry.id} locale={locale} />
      </aside>

      <div className="grid gap-6">
        <section className="card-outline rounded-2xl bg-surface p-5">
          <p className="text-base leading-relaxed">{entry.description[locale]}</p>
        </section>

        {/* The payoff for reading the description, and the most quotable thing
            on the page — so it gets pulled out rather than buried in prose. */}
        <section className="card-outline rounded-2xl bg-[hsl(var(--unit)/0.12)] p-5">
          <h2 className="mb-1 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted">
            <span aria-hidden="true">💬</span>
            {s("oneLiner")}
          </h2>
          <p className="mb-3 text-xs text-muted">{s("oneLinerHint")}</p>
          <blockquote className="border-l-4 border-black pl-4 text-lg leading-snug font-bold">
            {entry.oneLiner[locale]}
          </blockquote>
        </section>

        {/* Sits right after the description: the hook lands before the detail. */}
        <section className="card-outline unit-tint rounded-2xl bg-surface p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted">
            <span aria-hidden="true">📖</span>
            {s("lore")}
          </h2>
          <p className="text-base leading-relaxed">{entry.lore[locale]}</p>
        </section>

        <section className="card-outline rounded-2xl bg-surface p-5">
          <h2 className="mb-3 text-sm font-black uppercase tracking-widest text-muted">
            {s("howItWorks")}
          </h2>
          <p className="text-base leading-relaxed">{entry.deepDive[locale]}</p>
        </section>

        <section className="card-outline rounded-2xl bg-amber-50 p-5 dark:bg-amber-950/40">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted">
            <span aria-hidden="true">⚠️</span>
            {s("pitfall")}
          </h2>
          <p className="text-base leading-relaxed">{entry.pitfall[locale]}</p>
        </section>

        {clashes.length > 0 && (
          <section className="card-outline rounded-2xl bg-surface p-5">
            <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted">
              <span aria-hidden="true">⚡</span>
              {s("clashes")}
            </h2>
            <p className="mt-1 mb-4 text-xs text-muted">{s("clashesHint")}</p>
            <ul className="grid gap-3">
              {clashes.map(({ entry: other, note }) => (
                <li
                  key={other.id}
                  className="grid gap-3 rounded-xl border-2 border-black bg-[hsl(var(--unit)/0.06)] p-3 sm:grid-cols-[auto_1fr] sm:items-start"
                >
                  <Link
                    href={`/${locale}/dex/${other.id}`}
                    style={{ ["--unit" as string]: unitMap[other.units[0]].hue }}
                    className="pop flex min-w-28 flex-col items-center gap-1.5 rounded-lg border-2 border-black bg-[hsl(var(--unit)/0.12)] p-2 text-center"
                  >
                    <BrandTile entry={other} size={22} className="size-10 rounded-lg" />
                    <span className="text-xs font-extrabold">{other.name}</span>
                  </Link>
                  <p className="text-sm leading-relaxed">{note[locale]}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="card-outline rounded-2xl bg-surface p-5">
          <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-muted">
            {s("baseStats")}
          </h2>
          <StatBars stats={entry.stats} locale={locale} />
        </section>

        <section className="card-outline rounded-2xl bg-surface p-5">
          <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-muted">
            {s("moves")}
          </h2>
          <ul className="grid gap-3">
            {entry.moves.map((move) => (
              <li
                key={move.name}
                className="rounded-xl border-2 border-black bg-[hsl(var(--unit)/0.08)] p-3"
              >
                <p className="font-mono text-sm font-bold">{move.name}</p>
                <p className="mt-1 text-sm leading-snug text-muted">
                  {move.effect[locale]}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {chain.length > 0 && (
          <section className="card-outline rounded-2xl bg-surface p-5">
            <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-muted">
              {s("evolution")}
            </h2>
            <ol className="flex flex-wrap items-stretch gap-3">
              {chain.map((step, i) => (
                <li key={step.id} className="flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-xl text-muted">
                      →
                    </span>
                  )}
                  <Link
                    href={`/${locale}/dex/${step.id}`}
                    aria-current={step.id === entry.id ? "page" : undefined}
                    style={{ ["--unit" as string]: unitMap[step.units[0]].hue }}
                    className={[
                      "pop flex min-w-32 flex-col items-center gap-1.5 rounded-xl border-2 border-black p-3 text-center",
                      step.id === entry.id
                        ? "bg-[hsl(var(--unit)/0.22)]"
                        : "bg-surface",
                    ].join(" ")}
                  >
                    <BrandTile entry={step} size={26} className="size-12 rounded-lg" />
                    <span className="text-xs font-extrabold">{step.name}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        )}

        <MigrationList items={movesOut} locale={locale} direction="out" />
        <MigrationList items={movesIn} locale={locale} direction="in" />

        {inGyms.length > 0 && (
          <section className="card-outline rounded-2xl bg-surface p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted">
              <span aria-hidden="true">🏟️</span>
              {s("gymEntryAppearsIn")}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {inGyms.map((gym) => (
                <li key={gym.id}>
                  <Link
                    href={`/${locale}/gyms/${gym.id}`}
                    className="pop flex items-center gap-1.5 rounded-full border-2 border-black bg-black/5 px-3 py-1.5 text-xs font-bold dark:bg-white/10"
                  >
                    <span aria-hidden="true">{gym.glyph}</span>
                    {gym.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {onRoutes.length > 0 && (
          <section className="card-outline rounded-2xl bg-surface p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-muted">
              <span aria-hidden="true">🧭</span>
              {s("routeAppearsOn")}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {onRoutes.map((route) => (
                <li key={route.id}>
                  <Link
                    href={`/${locale}/routes/${route.id}`}
                    style={{ ["--route" as string]: route.hue }}
                    className="pop flex items-center gap-1.5 rounded-full border-2 border-black bg-[hsl(var(--route)/0.14)] px-3 py-1.5 text-xs font-bold"
                  >
                    <span aria-hidden="true">{route.glyph}</span>
                    {route.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {entry.links && entry.links.length > 0 && (
          <section className="card-outline rounded-2xl bg-surface p-5">
            <h2 className="mb-3 text-sm font-black uppercase tracking-widest text-muted">
              {s("learnMore")}
            </h2>
            <ul className="grid gap-1.5">
              {entry.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm font-bold underline underline-offset-4"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
