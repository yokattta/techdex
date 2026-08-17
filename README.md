# TechDex

A cartoon field guide to the tech stack — browse it like a Pokédex, catch what
you've learned. Bilingual: **English / 中文**, with technical terms left in
English on both sides.

## Units

Every entry belongs to one or two units, the way a Pokémon has one or two types:

| Unit | What lives there |
| --- | --- |
| 🚀 DevOps | Docker, Kubernetes, Terraform, CI/CD |
| 🧠 Model | Transformer, Embeddings, RAG, Fine-tuning, Prompt Engineering, Agents, Model Eval |
| 🏗️ Platform | Kafka, PostgreSQL, Redis, Nginx, Vector Database, Load Balancing, Sharding |
| 💡 Concept | Observability, CAP Theorem, Idempotency, Eventual Consistency, Caching, Rate Limiting, Backpressure, Guardrails, Hallucination |
| 🧩 App | Flask, FastAPI, React, Next.js, Pydantic |
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

## Generations

`/[locale]/eras` places every card on a timeline. An entry's generation is
**when it became something a working engineer had to know**, not when it was
invented — Postgres is from 1986 and CAP was proved in 2002, and neither
mattered to most people then.

| | | |
| --- | --- | --- |
| Gen 1 | Monolith | one machine you could physically point at |
| Gen 2 | Cloud | capacity became a dial, so distribution became everyone's problem |
| Gen 3 | Containers | the artifact started carrying its own environment |
| Gen 4 | Managed | running things became someone else's job; choosing became yours |
| Gen 5 | LLM-native | output stopped being a function of input |

The test for whether a boundary is real: if nothing about the job changed, it
isn't a generation, it's a fashion.

`status` is the second axis — `rising` or `settled`, answering a question a
learner actually has: *will what I learn here still be true in five years?*
Postgres knowledge keeps. RAG tooling knowledge may not.

The page shows how many entries each generation has and points at the
thinnest one rather than padding it out. A visible gap is a to-do list — the
first batch of new entries was written by reading that page.

## Routes

`/[locale]/routes` is five ordered paths through the dex: system design, AI
engineering, shipping and running things, a Python backend, a frontend that
lasts. Every entry sits on at least one.

The ordered list is the cheap part. Each step carries a `why` that has to
justify its **position** — what the previous step left you holding, and what
problem this one answers. Kafka comes before idempotency because at-least-once
delivery is precisely what makes idempotency necessary. Accessibility sits in
the middle of the frontend route rather than at the end, because that is when
it is cheap. A step whose `why` merely re-describes the card is a playlist
entry, not a route, and should be rewritten.

Progress reuses the existing caught store, so marking a card anywhere moves
every route it appears on.

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
load-bearing, not because someone tuned a drop table.

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

Each entry needs six pieces of prose, and they answer different questions:
`tagline` (one line), `description` (what it is), `oneLiner` (what to say),
`lore` (where it came from), `deepDive` (how it actually works and what that
costs), and `pitfall` (the specific way people get it wrong). Optionally
`clashes` — see above.

One rule for `oneLiner`: it has to carry something specific — a mechanism, a
limit, the question a practitioner asks first. "Kafka is good for streaming" is
worthless; "ordering is per partition, never per topic, so we key by user id and
promise nothing across users" is the sentence that shows you have run it.
Generic wisdom signals nothing, which is the entire test.

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
    routes/page.tsx      the five learning paths
    routes/[id]/page.tsx one path, step by step
    lines/page.tsx       one-liner cheat sheet
    eras/page.tsx        the generation timeline
    gacha/page.tsx       booster pack opening
    matrix/page.tsx      the type chart
    battle/page.tsx      scenario quiz
components/              cards, badges, stat bars, filters, pack flip, chart
lib/
  types.ts               Entry / Unit / Clash / L10n types
  units.ts               the six units and their colours
  entries.ts             all content, plus evolution and clash resolution
  routes.ts              curated paths, and why each step sits where it does
  eras.ts                the five generations and what each one changed
  matrix.ts              the 6x6 coupling grid and its reasons
  battles.ts             scenarios, options and verdicts
  logos.ts               generated brand marks — see scripts/generate-logos.mjs
  i18n.ts                UI strings
  caught.ts              localStorage progress store
  packs.ts               localStorage pack counter
```

## Licence

Split, because the two halves are worth different things.

| | Licence | |
| --- | --- | --- |
| **Code** | [MIT](LICENSE) | Take the engine. It's Next.js and Tailwind — there's no secret in it. |
| **Content** | [CC BY-NC-SA 4.0](LICENSE-CONTENT) | The written entries, clash notes, coupling reasons and battle verdicts. Credit it, share alike, don't sell it. |

The moat here was never the idea — a Pokédex-shaped learning site is one of the
most-built projects on the internet. It's the writing: every entry needs a real
mechanism, a real pitfall, an honest clash and a story that encodes the property
you're meant to remember. That's labour, not a secret, and labour doesn't
benefit from being hidden. Contributions are the point.

Brand marks in `lib/logos.ts` are trademarks of their respective owners, used
nominatively to identify the products described, and are covered by neither
licence.

Want to use the content commercially? Open an issue — that's a conversation.
