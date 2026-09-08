import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BrandTile } from "@/components/BrandMark";
import { EraBadge } from "@/components/EraBadge";
import { RouteProgress } from "@/components/RouteProgress";
import { UnitBadge } from "@/components/UnitBadge";
import { isLocale, locales, strings } from "@/lib/i18n";
import { coreSteps, detourSteps, getRoute, routes } from "@/lib/routes";
import type { ResolvedStep } from "@/lib/routes";
import type { Locale } from "@/lib/types";
import { unitMap } from "@/lib/units";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    routes.map((route) => ({ locale, id: route.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const route = getRoute(id);
  if (!route || !isLocale(locale)) return { title: "Not found" };
  return { title: route.name[locale], description: route.outcome[locale] };
}

export default async function RoutePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();

  const route = getRoute(id);
  if (!route) notFound();

  const s = strings(locale);
  const core = coreSteps(route);
  const detours = detourSteps(route);

  return (
    <div
      style={{ ["--route" as string]: route.hue }}
      className="grid gap-6"
    >
      <p>
        <Link
          href={`/${locale}/routes`}
          className="text-sm font-bold text-muted underline underline-offset-4 hover:text-foreground"
        >
          ← {s("routeBackToRoutes")}
        </Link>
      </p>

      <section className="grid gap-3">
        <h1 className="flex flex-wrap items-center gap-3 text-4xl font-black tracking-tight">
          <span aria-hidden="true">{route.glyph}</span>
          {route.name[locale]}
        </h1>
        <p className="max-w-3xl text-base text-muted">{route.intro[locale]}</p>
      </section>

      <section className="card-outline grid gap-2 rounded-2xl bg-[hsl(var(--route)/0.1)] p-5">
        <h2 className="text-xs font-black uppercase tracking-widest text-muted">
          {s("routeOutcome")}
        </h2>
        <p className="text-base leading-relaxed font-bold">
          {route.outcome[locale]}
        </p>
      </section>

      {/* Progress counts the core path only. A route you have finished should
          not read as incomplete because you skipped an optional side-trip. */}
      <div className="card-outline rounded-2xl bg-surface px-4 py-3">
        <RouteProgress
          entryIds={core.map((step) => step.entry.id)}
          locale={locale}
        />
      </div>

      <ol className="grid gap-4">
        {core.map((step, index) => (
          <li key={step.entry.id}>
            <StepCard step={step} locale={locale} marker={String(index + 1)} />
          </li>
        ))}
      </ol>

      {detours.length > 0 && (
        <details className="card-outline rounded-2xl bg-surface p-5">
          <summary className="flex cursor-pointer flex-wrap items-center gap-2 text-sm font-black uppercase tracking-widest text-muted">
            <span aria-hidden="true">🔀</span>
            {s("routeDetours")}
            <span className="font-mono">+{detours.length}</span>
          </summary>
          <p className="mt-3 mb-4 max-w-3xl text-xs text-muted">
            {s("routeDetourHint")}
          </p>
          <ul className="grid gap-4">
            {detours.map((step) => (
              <li key={step.entry.id}>
                <StepCard step={step} locale={locale} marker="🔀" />
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

/**
 * One step. The marker is the position on the core path, or a branch glyph for
 * a side-trip — detours are deliberately unnumbered so the core path keeps a
 * clean 1..N and skipping one leaves no gap.
 */
function StepCard({
  step,
  locale,
  marker,
}: {
  step: ResolvedStep;
  locale: Locale;
  marker: string;
}) {
  const s = strings(locale);
  const { entry, why, detour } = step;

  return (
    <div className="card-outline grid gap-3 rounded-2xl bg-surface p-4 sm:grid-cols-[auto_1fr] sm:gap-5">
      <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2">
        <span
          className={[
            "grid size-8 shrink-0 place-items-center rounded-full border-2 border-black font-mono text-sm font-black",
            detour
              ? "bg-surface"
              : "bg-[hsl(var(--route))] text-white",
          ].join(" ")}
          aria-hidden={detour}
        >
          {marker}
        </span>
        <Link
          href={`/${locale}/dex/${entry.id}`}
          style={{ ["--unit" as string]: unitMap[entry.units[0]].hue }}
          className="pop"
        >
          <BrandTile entry={entry} size={26} className="size-14 shrink-0 rounded-xl" />
        </Link>
      </div>

      <div className="grid gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/${locale}/dex/${entry.id}`}
            className="text-lg font-extrabold hover:underline"
          >
            {entry.name}
          </Link>
          {entry.units.map((unit) => (
            <UnitBadge key={unit} unit={unit} locale={locale} />
          ))}
          <EraBadge era={entry.era} locale={locale} />
          {detour && (
            <span className="rounded-full border-2 border-black bg-black/5 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide dark:bg-white/10">
              {s("routeDetourBadge")}
            </span>
          )}
        </div>

        <p className="text-sm text-muted">{entry.tagline[locale]}</p>

        <div className="rounded-xl border-2 border-black bg-[hsl(var(--route)/0.08)] p-3">
          <h3 className="mb-1 text-[10px] font-black uppercase tracking-widest text-muted">
            {s("routeWhyHere")}
          </h3>
          <p className="text-sm leading-relaxed">{why[locale]}</p>
        </div>
      </div>
    </div>
  );
}
