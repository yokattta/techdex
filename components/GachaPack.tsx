"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { entries, rarityOf } from "@/lib/entries";
import { strings } from "@/lib/i18n";
import { useCaught } from "@/lib/caught";
import { usePacksOpened } from "@/lib/packs";
import { unitMap } from "@/lib/units";
import { BrandTile } from "./BrandMark";
import { RarityStars, rarityLabel } from "./RarityStars";
import { UnitBadge } from "./UnitBadge";
import type { Entry, Locale } from "@/lib/types";

const PACK_SIZE = 5;

/**
 * Four uniform pulls plus one slot reserved for rare-or-better, which always
 * lands last so the flips build toward it. No duplicates inside a pack.
 */
function drawPack(): Entry[] {
  const pool = [...entries];
  const picked: Entry[] = [];

  for (let i = 0; i < PACK_SIZE - 1 && pool.length > 0; i++) {
    const [taken] = pool.splice(Math.floor(Math.random() * pool.length), 1);
    picked.push(taken);
  }

  const rares = pool.filter((entry) => rarityOf(entry) >= 2);
  const finalPool = rares.length > 0 ? rares : pool;
  if (finalPool.length > 0) {
    picked.push(finalPool[Math.floor(Math.random() * finalPool.length)]);
  }

  return picked;
}

export function GachaPack({ locale }: { locale: Locale }) {
  const s = strings(locale);
  const { caught } = useCaught();
  const { packsOpened, recordPack } = usePacksOpened();
  const [pack, setPack] = useState<Entry[] | null>(null);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const open = useCallback(() => {
    setPack(drawPack());
    setFlipped(new Set());
    recordPack();
  }, [recordPack]);

  const flip = useCallback((id: string) => {
    setFlipped((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const allFlipped = pack !== null && pack.every((entry) => flipped.has(entry.id));

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={open}
          className="pop card-outline rounded-full bg-red-600 px-5 py-2.5 text-sm font-black text-white uppercase tracking-wide"
        >
          {pack === null ? s("gachaOpen") : s("gachaAgain")}
        </button>

        {pack !== null && !allFlipped && (
          <button
            type="button"
            onClick={() => setFlipped(new Set(pack.map((entry) => entry.id)))}
            className="card-outline rounded-full bg-surface px-4 py-2 text-sm font-bold"
          >
            {s("gachaFlipAll")}
          </button>
        )}

        {packsOpened > 0 && (
          <span className="text-xs font-bold uppercase tracking-wide text-muted">
            {s("gachaPacksOpened")}: {packsOpened}
          </span>
        )}
      </div>

      {pack === null ? (
        <p className="card-outline rounded-2xl bg-surface px-4 py-10 text-center text-sm text-muted">
          {s("gachaDailyNote")}
        </p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-4">
          {pack.map((entry, index) => (
            <li
              key={entry.id}
              className="pack-pop grid"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <PackCard
                entry={entry}
                locale={locale}
                flipped={flipped.has(entry.id)}
                caught={caught.has(entry.id)}
                onFlip={() => flip(entry.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PackCard({
  entry,
  locale,
  flipped,
  caught,
  onFlip,
}: {
  entry: Entry;
  locale: Locale;
  flipped: boolean;
  caught: boolean;
  onFlip: () => void;
}) {
  const s = strings(locale);
  const rarity = rarityOf(entry);
  const primary = unitMap[entry.units[0]];

  return (
    <div className="flip-scene grid">
      <div className="flip-inner" data-flipped={flipped}>
        {/* Face down */}
        <button
          type="button"
          onClick={onFlip}
          aria-hidden={flipped}
          tabIndex={flipped ? -1 : 0}
          aria-label={s("gachaTapToFlip")}
          className="flip-face card-outline pop grid aspect-[3/4] place-items-center gap-2 rounded-2xl bg-[linear-gradient(150deg,#2b2440,#141020)] p-4"
        >
          <span
            className="size-14 rounded-full border-3 border-black bg-[linear-gradient(hsl(0_85%_50%)_0_50%,#fff_50%_100%)]"
            aria-hidden="true"
          />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/70">
            {s("gachaTapToFlip")}
          </span>
        </button>

        {/* Face up */}
        <div
          data-face="back"
          aria-hidden={!flipped}
          style={{ ["--unit" as string]: primary.hue }}
          className={[
            "flip-face card-outline unit-tint relative grid aspect-[3/4] grid-rows-[auto_1fr_auto] gap-2 overflow-hidden rounded-2xl bg-surface p-3",
            flipped && rarity === 3 ? "shine" : "",
          ].join(" ")}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] font-bold text-muted">
              #{String(entry.dex).padStart(3, "0")}
            </span>
            <RarityStars rarity={rarity} locale={locale} />
          </div>

          <div className="grid place-items-center gap-1.5 text-center">
            <BrandTile entry={entry} size={34} className="size-16 rounded-xl" />
            <span className="text-sm leading-tight font-extrabold">{entry.name}</span>
            <span className="text-[10px] font-bold uppercase tracking-wide text-muted">
              {caught ? s("caught") : s("gachaNewToYou")}
            </span>
          </div>

          <div className="grid gap-2">
            <div className="flex flex-wrap justify-center gap-1">
              {entry.units.map((unit) => (
                <UnitBadge key={unit} unit={unit} locale={locale} />
              ))}
            </div>
            <Link
              href={`/${locale}/dex/${entry.id}`}
              tabIndex={flipped ? 0 : -1}
              className="rounded-full border-2 border-black bg-surface py-1 text-center text-[10px] font-black uppercase tracking-wide hover:bg-black/5"
            >
              {s("gachaReadIt")}
            </Link>
          </div>

          <span className="sr-only">{rarityLabel(rarity, locale)}</span>
        </div>
      </div>
    </div>
  );
}
