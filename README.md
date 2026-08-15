# TechDex

A cartoon field guide to the tech stack — browse it like a Pokédex, catch what
you've learned. Bilingual: **English / 中文**, with technical terms left in
English on both sides.

## Units

Every entry belongs to one or two units, the way a Pokémon has one or two types:

| Unit | What lives there |
| --- | --- |
| 🚀 DevOps | Docker, Kubernetes, Terraform, CI/CD |
| 🧠 Model | Transformer, Embeddings, RAG, Fine-tuning |
| 🏗️ Platform | Kafka, PostgreSQL, Redis, Nginx |
| 💡 Concept | Observability, CAP Theorem, Idempotency, Eventual Consistency |
| 🧩 App | Flask, FastAPI, React, Next.js |
| 🎨 UI / UX | Design Tokens, Design System, Accessibility, Figma |

Entries carry base stats (difficulty, ubiquity, impact, ops cost), "moves" (the
techniques worth knowing), and evolution lines — `Docker → Kubernetes`,
`Transformer → Embeddings → RAG`, `React → Next.js`.

## Clashes

The other relationship, and the one worth reading for: two technologies that
compete for the same job while making **opposite promises**, where reaching for
the wrong one fails quietly rather than loudly. Kafka's replayable log against
Redis Pub/Sub's fire-and-forget. RAG changing what a model can see against
fine-tuning changing how it behaves. Terraform and Kubernetes both believing
they own the same object.

A clash is declared on one entry only; `clashesFor()` resolves it in both
directions so each card shows the full picture.

## Logos and glyphs

Products show their real logo; concepts show an emoji glyph. That split is
content, not a fallback — half the dex is ideas (Observability, CAP Theorem,
Idempotency, RAG, Design Tokens) that have no trademark and should not pretend
to. Logos sit on a white tile in both themes so brand colours keep their
contrast; several marks are near-black.

Mark artwork comes from [simple-icons](https://simpleicons.org) (CC0-1.0) and is
baked into `lib/logos.ts` at author time, so nothing extra ships at runtime —
`dependencies` is still just `next`, `react` and `react-dom`. To add or refresh
one, edit the list in `scripts/generate-logos.mjs` and run:

```bash
node scripts/generate-logos.mjs
```

The marks themselves remain trademarks of their respective owners and appear
here nominatively, to identify the products described.

## Type chart

`/[locale]/matrix` is a 6×6 grid read in one direction only: **a decision in the
row unit forces a decision in the column unit**. Not damage — coupling. It
answers "if I change this, what am I signing up to rewrite?"

`×2` strongly constrains, `×1` normal, `×½` largely independent. Every non-`×1`
cell carries a written reason, because a matrix without them is decoration.
Concept is the closest thing to a Dragon type: consistency and idempotency
decisions constrain almost every layer beneath them.

## Battle

`/[locale]/battle` puts up a scenario and three cards. The wrong options are the
tempting ones, mostly drawn from the clash pairs, and every verdict says *how*
the wrong pick would have failed — an hour of Pub/Sub messages gone with no
error, a fine-tune that learns the shape of your policies instead of their
content, an `async def` that is slower than the `def` it replaced.

## Booster packs

`/[locale]/gacha` deals five cards, with the last slot reserved for
rare-or-better so the flips build toward something. Rarity is **derived** from
`stats.impact`, never authored — a card is rare because the idea is
load-bearing, not because someone tuned a drop table. It happens to split the
current 24 entries evenly across ★ / ★★ / ★★★.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. It redirects to `/en`; `/zh` is the Chinese
version of the same page.

```bash
npm run build   # static export of every entry in both locales
npm run lint
```

## Stack

Next.js 16 (App Router, React Server Components) · TypeScript · Tailwind CSS 4.
No database and no runtime dependencies beyond React — every page is
prerendered at build time, and learner progress lives in `localStorage`.

## Adding an entry

Append an object to `entries` in [`lib/entries.ts`](lib/entries.ts). The `dex`
number sets display order and must be unique; everything else follows the
`Entry` type in [`lib/types.ts`](lib/types.ts). Setting `evolvesFrom` to another
entry's id puts both of them in the same evolution line automatically.

Each entry needs five pieces of prose, and they answer different questions:
`tagline` (one line), `description` (what it is), `lore` (where it came from),
`deepDive` (how it actually works and what that costs), and `pitfall` (the
specific way people get it wrong). Optionally `clashes` — see above.

One rule for `lore`, and it is the whole point of the field: **the story has to
encode the property you need to remember.** Kafka is named after a novelist
because it is "a system optimized for writing" — that is a mnemonic for an
append-only log. Nginx exists because of the C10K problem, which is why it does
not give each connection a thread. Trivia that doesn't hook onto a property of
the thing does not belong here, however good the anecdote is.

Translation rule, worth keeping: `name` and `moves[].name` are plain strings and
are **never** translated — a Chinese reader looking for "Kafka" should find the
string "Kafka". Only prose (`tagline`, `description`, `lore`, `deepDive`,
`pitfall`, `moves[].effect`, `clashes[].note`) has `en` / `zh` variants.

## Adding a unit

Add to `units` in [`lib/units.ts`](lib/units.ts) and to the `UnitId` union in
`lib/types.ts`. The `hue` is an HSL triple that drives that unit's badge, card
tint and stat bars; keep lightness at or below ~50% so white badge text stays
legible.

## Layout

```
app/
  [locale]/
    layout.tsx           header, footer, language switch
    page.tsx             the dex grid
    dex/[id]/page.tsx    one entry
    gacha/page.tsx       booster pack opening
    matrix/page.tsx      the type chart
    battle/page.tsx      scenario quiz
components/              cards, badges, stat bars, filters, pack flip, chart
lib/
  types.ts               Entry / Unit / Clash / L10n types
  units.ts               the six units and their colours
  entries.ts             all content, plus evolution and clash resolution
  matrix.ts              the 6x6 coupling grid and its reasons
  battles.ts             scenarios, options and verdicts
  logos.ts               generated brand marks — see scripts/generate-logos.mjs
  i18n.ts                UI strings
  caught.ts              localStorage progress store
  packs.ts               localStorage pack counter
```
