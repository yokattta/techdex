"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, localeNames, locales, strings } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

/**
 * Swaps the leading `/{locale}` segment and keeps the rest of the path, so
 * switching language on a card stays on that card.
 */
export function LocaleSwitch({ current }: { current: Locale }) {
  const pathname = usePathname() ?? `/${current}`;
  const s = strings(current);

  const segments = pathname.split("/");
  const rest = isLocale(segments[1] ?? "") ? segments.slice(2) : segments.slice(1);

  return (
    <nav aria-label={s("langSwitchLabel")} className="flex items-center gap-1">
      {locales.map((locale) => {
        const active = locale === current;
        const href = `/${[locale, ...rest].filter(Boolean).join("/")}`;
        return (
          <Link
            key={locale}
            href={href}
            aria-current={active ? "true" : undefined}
            className={[
              "rounded-full border-2 border-black px-3 py-1 text-xs font-extrabold",
              active ? "bg-black text-white" : "bg-surface hover:bg-black/5",
            ].join(" ")}
          >
            {localeNames[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
