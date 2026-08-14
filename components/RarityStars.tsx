import { strings } from "@/lib/i18n";
import type { Locale, Rarity } from "@/lib/types";

const rarityKey = {
  1: "rarityCommon",
  2: "rarityRare",
  3: "rarityLegendary",
} as const;

export function rarityLabel(rarity: Rarity, locale: Locale): string {
  return strings(locale)(rarityKey[rarity]);
}

export function RarityStars({
  rarity,
  locale,
}: {
  rarity: Rarity;
  locale: Locale;
}) {
  const label = rarityLabel(rarity, locale);
  return (
    <span
      title={label}
      className={[
        "font-mono text-xs leading-none tracking-tight",
        rarity === 3 ? "text-amber-500" : "text-muted",
      ].join(" ")}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">{"★".repeat(rarity)}</span>
    </span>
  );
}
