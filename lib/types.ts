export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

/**
 * Prose that gets translated. Proper nouns (Kafka, Observability, Flask) never
 * live in here — they stay as plain strings so the Chinese site keeps the
 * English technical vocabulary.
 */
export type L10n = Record<Locale, string>;

export type UnitId =
  | "devops"
  | "model"
  | "platform"
  | "concept"
  | "app"
  | "uiux";

export type Unit = {
  id: UnitId;
  /** Untranslated label, e.g. "DevOps" — shown identically in both locales. */
  name: string;
  tagline: L10n;
  /** Emoji stands in for a sprite. No image assets, no extra deps. */
  glyph: string;
  /** Drives the CSS custom properties in globals.css. */
  hue: string;
};

export type StatId = "difficulty" | "ubiquity" | "impact" | "ops";

export type Stats = Record<StatId, number>;

export type Move = {
  /** Kept in English in both locales — it's a command, API or technique name. */
  name: string;
  effect: L10n;
};

export type Entry = {
  id: string;
  dex: number;
  /** Primary unit first; a second unit is optional, like a dual-type Pokémon. */
  units: [UnitId] | [UnitId, UnitId];
  /** Never translated. */
  name: string;
  glyph: string;
  tagline: L10n;
  description: L10n;
  /** 0–100, rendered as species-stat bars. */
  stats: Stats;
  moves: Move[];
  /** Entry id this one builds on, forming an evolution chain. */
  evolvesFrom?: string;
  links?: { label: string; url: string }[];
};
