import type { EraId, Status } from "./eras";

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

/**
 * Two technologies that compete for the same job while making opposite
 * promises. Not "one is bad" — reaching for the wrong one usually fails
 * quietly, which is what makes the pairing worth memorising.
 */
export type Clash = {
  /** The other entry's id. */
  with: string;
  /** What the tension actually is. */
  note: L10n;
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
  /** The one-paragraph answer to "what is this". */
  description: L10n;
  /**
   * The sentence that shows you have actually operated this, rather than read
   * its docs. It has to carry something specific — a mechanism, a limit, a
   * question a practitioner would ask — because generic wisdom signals nothing.
   */
  oneLiner: L10n;
  /** How it actually works underneath, and what that costs. */
  deepDive: L10n;
  /** The specific way people get this wrong. */
  pitfall: L10n;
  /**
   * Where it came from — but only the part that doubles as a mnemonic. Trivia
   * that doesn't encode a property of the thing has no business being here.
   */
  lore: L10n;
  /**
   * The generation this became something a working engineer had to know — not
   * when it was invented. See lib/eras.ts.
   */
  era: EraId;
  /** Whether the ground under it is still moving. */
  status: Status;
  /** 0–100, rendered as species-stat bars. */
  stats: Stats;
  moves: Move[];
  /** Entry id this one builds on, forming an evolution chain. */
  evolvesFrom?: string;
  /**
   * Declared on one side only — `clashesFor()` resolves them in both
   * directions, the same way `evolutionChain()` walks `evolvesFrom` backwards.
   */
  clashes?: Clash[];
  links?: { label: string; url: string }[];
};

/** Derived from `stats.impact` — see `rarityOf()`. Never stored on an entry. */
export type Rarity = 1 | 2 | 3;
