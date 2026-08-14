"use client";

import { useMemo, useState } from "react";
import { units } from "@/lib/units";
import { strings } from "@/lib/i18n";
import { useCaught } from "@/lib/caught";
import { DexCard } from "./DexCard";
import type { Entry, Locale, UnitId } from "@/lib/types";

export function DexBrowser({
  entries,
  locale,
}: {
  entries: Entry[];
  locale: Locale;
}) {
  const s = strings(locale);
  const { caught, reset } = useCaught();
  const [unit, setUnit] = useState<UnitId | "all">("all");
  const [query, setQuery] = useState("");
  const [caughtOnly, setCaughtOnly] = useState(false);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      if (unit !== "all" && !e.units.includes(unit)) return false;
      if (caughtOnly && !caught.has(e.id)) return false;
      if (!q) return true;
      // Search both locales' prose plus the never-translated names, so "Kafka"
      // and "重放" both find the same card.
      const haystack = [
        e.name,
        e.tagline.en,
        e.tagline.zh,
        e.description.en,
        e.description.zh,
        ...e.moves.map((m) => m.name),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [entries, unit, query, caughtOnly, caught]);

  const total = entries.length;
  const caughtCount = entries.filter((e) => caught.has(e.id)).length;
  const pct = total === 0 ? 0 : Math.round((caughtCount / total) * 100);

  return (
    <div className="grid gap-6">
      {/* Progress */}
      <div className="card-outline flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-surface px-4 py-3">
        <span className="text-xs font-bold uppercase tracking-wide text-muted">
          {s("progress")}
        </span>
        <div className="h-4 min-w-40 flex-1 rounded-full border-2 border-black bg-black/10">
          <div
            className="h-full rounded-full bg-[linear-gradient(hsl(0_85%_50%),hsl(0_85%_42%))] transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="font-mono text-sm font-bold tabular-nums">
          {caughtCount} / {total}
        </span>
        {caughtCount > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm(s("resetConfirm"))) reset();
            }}
            className="rounded-full border-2 border-black px-3 py-1 text-xs font-bold hover:bg-black/5"
          >
            {s("resetProgress")}
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip
            active={unit === "all"}
            onClick={() => setUnit("all")}
            label={s("allUnits")}
            glyph="✨"
          />
          {units.map((u) => (
            <FilterChip
              key={u.id}
              active={unit === u.id}
              onClick={() => setUnit(u.id)}
              label={u.name}
              glyph={u.glyph}
              hue={u.hue}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={s("searchPlaceholder")}
            aria-label={s("searchPlaceholder")}
            className="card-outline min-w-0 flex-1 rounded-xl bg-surface px-4 py-2 text-sm"
          />
          <label className="card-outline flex cursor-pointer items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm font-bold">
            <input
              type="checkbox"
              checked={caughtOnly}
              onChange={(e) => setCaughtOnly(e.target.checked)}
              className="size-4 accent-red-600"
            />
            {s("caughtOnly")}
          </label>
        </div>

        <p className="text-xs font-bold uppercase tracking-wide text-muted">
          {s("showing")} {visible.length} {s("of")} {total}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="card-outline rounded-2xl bg-surface px-4 py-10 text-center text-sm text-muted">
          {s("noResults")}
        </p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
          {visible.map((entry) => (
            <li key={entry.id} className="grid">
              <DexCard entry={entry} locale={locale} caught={caught.has(entry.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  glyph,
  hue,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  glyph: string;
  hue?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={hue ? { ["--unit" as string]: hue } : undefined}
      className={[
        "inline-flex items-center gap-1.5 rounded-full border-2 border-black px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide",
        active
          ? "bg-[hsl(var(--unit))] text-white shadow-[3px_3px_0_#000]"
          : "bg-surface hover:bg-black/5",
      ].join(" ")}
    >
      <span aria-hidden="true">{glyph}</span>
      {label}
    </button>
  );
}
