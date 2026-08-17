"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { strings } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

/** `segment` is the path after `/{locale}`; the dex lives at the root. */
// Ordered by what a newcomer needs first: browse, then a path through it, then
// the drills, then the reference material.
const sections: { segment: string; label: DictKey; glyph: string }[] = [
  { segment: "", label: "navDex", glyph: "📕" },
  { segment: "routes", label: "navRoutes", glyph: "🧭" },
  { segment: "gyms", label: "navGyms", glyph: "🏟️" },
  { segment: "lines", label: "navLines", glyph: "💬" },
  { segment: "battle", label: "navBattle", glyph: "⚔️" },
  { segment: "gacha", label: "gacha", glyph: "🎴" },
  { segment: "eras", label: "navEras", glyph: "🕰️" },
  { segment: "matrix", label: "navMatrix", glyph: "🧮" },
];

export function SiteNav({ locale }: { locale: Locale }) {
  const s = strings(locale);
  const pathname = usePathname() ?? `/${locale}`;
  const current = pathname.split("/")[2] ?? "";

  return (
    <nav className="flex flex-wrap items-center gap-1.5">
      {sections.map(({ segment, label, glyph }) => {
        // A dex entry page (/{locale}/dex/...) still counts as the dex section.
        const active =
          segment === "" ? current === "" || current === "dex" : current === segment;

        return (
          <Link
            key={segment}
            href={`/${locale}${segment ? `/${segment}` : ""}`}
            aria-current={active ? "page" : undefined}
            className={[
              "inline-flex items-center gap-1.5 rounded-full border-2 border-black px-3 py-1.5 text-xs font-black uppercase tracking-wide",
              active ? "bg-black text-white" : "bg-surface hover:bg-black/5",
            ].join(" ")}
          >
            <span aria-hidden="true">{glyph}</span>
            {s(label)}
          </Link>
        );
      })}
    </nav>
  );
}
