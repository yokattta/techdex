import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaughtButton } from "@/components/CaughtButton";
import { StatBars } from "@/components/StatBars";
import { UnitBadge } from "@/components/UnitBadge";
import { entries, evolutionChain, getEntry } from "@/lib/entries";
import { isLocale, locales, strings } from "@/lib/i18n";
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
          <span className="font-mono text-sm font-bold text-muted">
            #{String(entry.dex).padStart(3, "0")}
          </span>
          <div className="flex flex-wrap justify-end gap-1.5">
            {entry.units.map((u) => (
              <UnitBadge key={u} unit={u} locale={locale} />
            ))}
          </div>
        </div>

        <div
          className="grid aspect-[4/3] place-items-center rounded-2xl border-3 border-black bg-[hsl(var(--unit)/0.16)] text-7xl"
          aria-hidden="true"
        >
          {entry.glyph}
        </div>

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
                      "pop flex min-w-32 flex-col items-center gap-1 rounded-xl border-2 border-black p-3 text-center",
                      step.id === entry.id
                        ? "bg-[hsl(var(--unit)/0.22)]"
                        : "bg-surface",
                    ].join(" ")}
                  >
                    <span className="text-3xl" aria-hidden="true">
                      {step.glyph}
                    </span>
                    <span className="text-xs font-extrabold">{step.name}</span>
                  </Link>
                </li>
              ))}
            </ol>
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
