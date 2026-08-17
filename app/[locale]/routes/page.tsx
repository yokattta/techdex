import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BrandMark } from "@/components/BrandMark";
import { RouteProgress } from "@/components/RouteProgress";
import { isLocale, locales, strings } from "@/lib/i18n";
import { routeEntries, routes } from "@/lib/routes";

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
  return { title: s("routesTitle"), description: s("routesIntro") };
}

export default async function RoutesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = strings(locale);

  return (
    <div className="grid gap-6">
      <section className="grid gap-2">
        <h1 className="text-4xl font-black tracking-tight">{s("routesTitle")}</h1>
        <p className="max-w-3xl text-base text-muted">{s("routesIntro")}</p>
      </section>

      <ul className="grid gap-4">
        {routes.map((route) => {
          const steps = routeEntries(route);
          return (
            <li key={route.id} style={{ ["--route" as string]: route.hue }}>
              <Link
                href={`/${locale}/routes/${route.id}`}
                className="pop card-outline grid gap-3 rounded-2xl bg-surface p-5"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-2xl" aria-hidden="true">
                    {route.glyph}
                  </span>
                  <h2 className="text-xl font-black">{route.name[locale]}</h2>
                  <span className="font-mono text-xs font-bold text-muted">
                    {steps.length} {s("routeSteps")}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-muted">
                  {route.outcome[locale]}
                </p>

                {/* The path itself, as a strip — the shape is the pitch. */}
                <ol className="flex flex-wrap items-center gap-1.5">
                  {steps.map(({ entry }, index) => (
                    <li key={entry.id} className="flex items-center gap-1.5">
                      {index > 0 && (
                        <span aria-hidden="true" className="text-xs text-muted">
                          →
                        </span>
                      )}
                      <span className="flex items-center gap-1 rounded-full border-2 border-black bg-[hsl(var(--route)/0.12)] py-0.5 pr-2 pl-1.5 text-[11px] font-bold">
                        <BrandMark entry={entry} size={12} />
                        {entry.name}
                      </span>
                    </li>
                  ))}
                </ol>

                <RouteProgress
                  entryIds={steps.map((step) => step.entry.id)}
                  locale={locale}
                  compact
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
