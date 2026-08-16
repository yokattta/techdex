import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BrandMark } from "@/components/BrandMark";
import { StatusBadge } from "@/components/EraBadge";
import { entriesByDex } from "@/lib/entries";
import { eras } from "@/lib/eras";
import { isLocale, locales, strings } from "@/lib/i18n";
import { unitMap } from "@/lib/units";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return { title: "Not found" };
  const s = strings(locale);
  return { title: s("erasTitle"), description: s("erasIntro") };
}

export default async function ErasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = strings(locale);

  const rows = eras.map((era) => ({
    era,
    entries: entriesByDex.filter((entry) => entry.era === era.id),
  }));
  // The thinnest generation is worth pointing at rather than padding out — a
  // visible gap is a to-do list.
  const thinnest = Math.min(...rows.map((row) => row.entries.length));

  return (
    <div className="grid gap-8">
      <section className="grid gap-2">
        <h1 className="text-4xl font-black tracking-tight">{s("erasTitle")}</h1>
        <p className="max-w-3xl text-base text-muted">{s("erasIntro")}</p>
      </section>

      <ol className="grid gap-5">
        {rows.map(({ era, entries }) => (
          <li
            key={era.id}
            style={{ ["--era" as string]: era.hue }}
            className="card-outline grid gap-4 rounded-2xl bg-surface p-5 sm:grid-cols-[13rem_1fr] sm:gap-6"
          >
            <div className="grid content-start gap-2">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-black bg-[hsl(var(--era))] px-3 py-1 text-xs font-black tracking-wide text-white">
                <span aria-hidden="true">{era.glyph}</span>
                GEN {era.id}
              </span>
              <h2 className="text-2xl leading-tight font-black">{era.name}</h2>
              <p className="font-mono text-xs text-muted">{era.span}</p>
              <p className="text-xs font-bold uppercase tracking-wide text-muted">
                {entries.length} {s("erasCount")}
              </p>
            </div>

            <div className="grid content-start gap-3">
              <div>
                <h3 className="mb-1 text-[10px] font-black uppercase tracking-widest text-muted">
                  {s("erasShift")}
                </h3>
                <p className="text-sm leading-relaxed">{era.shift[locale]}</p>
              </div>

              <ul className="flex flex-wrap gap-2">
                {entries.map((entry) => (
                  <li key={entry.id}>
                    <Link
                      href={`/${locale}/dex/${entry.id}`}
                      style={{
                        ["--unit" as string]: unitMap[entry.units[0]].hue,
                      }}
                      className="pop flex items-center gap-1.5 rounded-full border-2 border-black bg-[hsl(var(--unit)/0.14)] py-1 pr-3 pl-2 text-xs font-bold"
                    >
                      <BrandMark entry={entry} size={14} />
                      {entry.name}
                      <StatusBadge status={entry.status} locale={locale} />
                    </Link>
                  </li>
                ))}
              </ul>

              {entries.length === thinnest && (
                <p className="rounded-lg border-2 border-dashed border-black/40 px-3 py-2 text-xs text-muted">
                  {s("erasGap")}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
