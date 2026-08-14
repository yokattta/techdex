import { notFound } from "next/navigation";
import { DexBrowser } from "@/components/DexBrowser";
import { entriesByDex } from "@/lib/entries";
import { isLocale, locales, strings } from "@/lib/i18n";
import { units } from "@/lib/units";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function DexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = strings(locale);

  return (
    <div className="grid gap-8">
      <section className="grid gap-3">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          {s("title")}
        </h1>
        <p className="max-w-2xl text-base text-muted">{s("subtitle")}</p>
      </section>

      <section className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-3">
        {units.map((u) => (
          <div
            key={u.id}
            style={{ ["--unit" as string]: u.hue }}
            className="card-outline unit-tint rounded-2xl bg-surface p-3"
          >
            <p className="flex items-center gap-2 font-extrabold">
              <span aria-hidden="true">{u.glyph}</span>
              {u.name}
            </p>
            <p className="mt-1 text-xs leading-snug text-muted">
              {u.tagline[locale]}
            </p>
          </div>
        ))}
      </section>

      <DexBrowser entries={entriesByDex} locale={locale} />
    </div>
  );
}
