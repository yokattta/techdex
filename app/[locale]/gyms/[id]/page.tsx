import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BrandTile } from "@/components/BrandMark";
import { EraBadge } from "@/components/EraBadge";
import { RouteProgress } from "@/components/RouteProgress";
import { UnitBadge } from "@/components/UnitBadge";
import { getGym, gymRoster, gyms, tracksWithGym } from "@/lib/gyms";
import { isLocale, locales, strings } from "@/lib/i18n";
import { unitMap } from "@/lib/units";

export function generateStaticParams() {
  return locales.flatMap((locale) => gyms.map((gym) => ({ locale, id: gym.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const gym = getGym(id);
  if (!gym || !isLocale(locale)) return { title: "Not found" };
  return { title: gym.name[locale], description: gym.situation[locale] };
}

export default async function GymPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();

  const gym = getGym(id);
  if (!gym) notFound();

  const s = strings(locale);
  const roster = gymRoster(gym);
  const onTracks = tracksWithGym(gym.id);

  return (
    <div className="grid gap-6">
      <p>
        <Link
          href={`/${locale}/gyms`}
          className="text-sm font-bold text-muted underline underline-offset-4 hover:text-foreground"
        >
          ← {s("gymBackToGyms")}
        </Link>
      </p>

      <section className="grid gap-3">
        <h1 className="flex flex-wrap items-center gap-3 text-4xl font-black tracking-tight">
          <span aria-hidden="true">{gym.glyph}</span>
          {gym.name[locale]}
        </h1>
        {onTracks.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {onTracks.map((track) => (
              <li key={track.id}>
                <span
                  style={{ ["--route" as string]: track.hue }}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-[hsl(var(--route))] px-3 py-1 text-[10px] font-black tracking-wide text-white"
                >
                  <span aria-hidden="true">{track.glyph}</span>
                  {track.role}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card-outline rounded-2xl bg-surface p-5">
        <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-muted">
          {s("gymSituation")}
        </h2>
        <p className="text-base leading-relaxed">{gym.situation[locale]}</p>
      </section>

      <section className="card-outline rounded-2xl bg-surface p-5">
        <h2 className="mb-3 text-xs font-black uppercase tracking-widest text-muted">
          {s("gymRoster")}
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-3">
          {roster.map((entry) => (
            <li key={entry.id} className="grid">
              <Link
                href={`/${locale}/dex/${entry.id}`}
                style={{ ["--unit" as string]: unitMap[entry.units[0]].hue }}
                className="pop grid gap-2 rounded-xl border-2 border-black bg-[hsl(var(--unit)/0.1)] p-3"
              >
                <div className="flex items-center gap-2">
                  <BrandTile
                    entry={entry}
                    size={20}
                    className="size-9 shrink-0 rounded-lg"
                  />
                  <span className="text-sm leading-tight font-extrabold">
                    {entry.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {entry.units.map((unit) => (
                    <UnitBadge key={unit} unit={unit} locale={locale} />
                  ))}
                  <EraBadge era={entry.era} locale={locale} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <RouteProgress
            entryIds={roster.map((entry) => entry.id)}
            locale={locale}
            label="gymCaught"
          />
        </div>
      </section>

      {/* The question is the point of the gym — reading the roster should not
          be enough to answer it. `details` keeps the reveal working without JS. */}
      <section className="card-outline rounded-2xl bg-[hsl(var(--route)/0.1)] p-5">
        <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-muted">
          {s("gymQuestion")}
        </h2>
        <blockquote className="border-l-4 border-black pl-4 text-lg leading-snug font-bold">
          {gym.question[locale]}
        </blockquote>

        <details className="mt-4 rounded-xl border-2 border-black bg-surface p-3">
          <summary className="cursor-pointer text-sm font-black">
            {s("gymReveal")}
          </summary>
          <h3 className="mt-3 mb-1 text-[10px] font-black uppercase tracking-widest text-muted">
            {s("gymAnswer")}
          </h3>
          <p className="text-sm leading-relaxed">{gym.answer[locale]}</p>
        </details>
      </section>
    </div>
  );
}
