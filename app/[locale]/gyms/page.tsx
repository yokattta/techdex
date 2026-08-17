import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BrandMark, BrandTile } from "@/components/BrandMark";
import { RouteProgress } from "@/components/RouteProgress";
import { isLocale, locales, strings } from "@/lib/i18n";
import { gymRoster, trackFormation, trackGyms, tracks } from "@/lib/gyms";
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
  return { title: s("gymsTitle"), description: s("gymsIntro") };
}

export default async function GymsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = strings(locale);

  return (
    <div className="grid gap-8">
      <section className="grid gap-2">
        <h1 className="text-4xl font-black tracking-tight">{s("gymsTitle")}</h1>
        <p className="max-w-3xl text-base text-muted">{s("gymsIntro")}</p>
      </section>

      <ul className="grid gap-6">
        {tracks.map((track) => {
          const circuit = trackGyms(track);
          const formation = trackFormation(track);

          return (
            <li
              key={track.id}
              style={{ ["--route" as string]: track.hue }}
              className="card-outline grid gap-5 rounded-2xl bg-surface p-5"
            >
              <div className="grid gap-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xl" aria-hidden="true">
                    {track.glyph}
                  </span>
                  <h2 className="text-2xl font-black">{track.name[locale]}</h2>
                  <span className="rounded-full border-2 border-black bg-[hsl(var(--route))] px-2.5 py-0.5 text-[10px] font-black tracking-wide text-white">
                    {track.role}
                  </span>
                </div>
                <p className="max-w-3xl text-sm leading-relaxed text-muted">
                  {track.intro[locale]}
                </p>
              </div>

              {/* Formation — the six, which is the answer to "what should I be
                  solid on", separate from "what does this gym run". */}
              <div className="grid gap-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-muted">
                    {s("gymFormation")}
                  </h3>
                  <span className="text-xs text-muted">
                    {s("gymFormationHint")}
                  </span>
                </div>
                <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {formation.map((entry) => (
                    <li key={entry.id} className="grid">
                      <Link
                        href={`/${locale}/dex/${entry.id}`}
                        style={{
                          ["--unit" as string]: unitMap[entry.units[0]].hue,
                        }}
                        className="pop grid justify-items-center gap-1.5 rounded-xl border-2 border-black bg-[hsl(var(--unit)/0.1)] p-2 text-center"
                      >
                        <BrandTile
                          entry={entry}
                          size={22}
                          className="size-10 rounded-lg"
                        />
                        <span className="text-[10px] leading-tight font-extrabold">
                          {entry.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <RouteProgress
                  entryIds={formation.map((entry) => entry.id)}
                  locale={locale}
                  compact
                  label="gymCaught"
                />
              </div>

              {/* Circuit */}
              <div className="grid gap-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-muted">
                  {s("gymCircuit")}
                </h3>
                <ol className="grid gap-2">
                  {circuit.map((gym, index) => (
                    <li key={gym.id}>
                      <Link
                        href={`/${locale}/gyms/${gym.id}`}
                        className="pop flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border-2 border-black bg-[hsl(var(--route)/0.08)] p-3"
                      >
                        <span className="grid size-7 shrink-0 place-items-center rounded-full border-2 border-black bg-[hsl(var(--route))] font-mono text-xs font-black text-white">
                          {index + 1}
                        </span>
                        <span aria-hidden="true" className="text-lg">
                          {gym.glyph}
                        </span>
                        <span className="font-extrabold">{gym.name[locale]}</span>
                        <span className="flex flex-wrap gap-1">
                          {gymRoster(gym).map((entry) => (
                            <BrandMark key={entry.id} entry={entry} size={14} />
                          ))}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>

              {track.gap && (
                <p className="rounded-xl border-2 border-dashed border-black/40 bg-amber-50 p-3 text-sm leading-relaxed dark:bg-amber-950/40">
                  <span className="mr-1.5 font-black uppercase tracking-wide">
                    {s("gymGap")}:
                  </span>
                  {track.gap[locale]}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
