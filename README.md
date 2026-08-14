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

Translation rule, worth keeping: `name` and `moves[].name` are plain strings and
are **never** translated — a Chinese reader looking for "Kafka" should find the
string "Kafka". Only prose (`tagline`, `description`, `moves[].effect`) has
`en` / `zh` variants.

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
components/              cards, badges, stat bars, filters
lib/
  types.ts               Entry / Unit / L10n types
  units.ts               the six units and their colours
  entries.ts             all content
  i18n.ts                UI strings
  caught.ts              localStorage progress store
```
