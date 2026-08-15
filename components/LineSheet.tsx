"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { entriesByDex } from "@/lib/entries";
import { strings } from "@/lib/i18n";
import { unitMap, units } from "@/lib/units";
import { BrandMark } from "./BrandMark";
import type { Locale } from "@/lib/types";

export function LineSheet({ locale }: { locale: Locale }) {
  const s = strings(locale);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return units
      .map((unit) => ({
        unit,
        // An entry's primary unit decides where it appears, so a dual-type card
        // is listed once rather than in two places saying the same thing.
        entries: entriesByDex.filter(
          (entry) =>
            entry.units[0] === unit.id &&
            (!q ||
              [entry.name, entry.oneLiner.en, entry.oneLiner.zh]
                .join(" ")
                .toLowerCase()
                .includes(q)),
        ),
      }))
      .filter((group) => group.entries.length > 0);
  }, [query]);

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied((c) => (c === id ? null : c)), 1600);
    } catch {
      // Clipboard is permission-gated; the text is selectable either way.
    }
  };

  return (
    <div className="grid gap-6">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={s("linesSearch")}
        aria-label={s("linesSearch")}
        className="card-outline rounded-xl bg-surface px-4 py-2 text-sm"
      />

      {groups.length === 0 ? (
        <p className="card-outline rounded-2xl bg-surface px-4 py-10 text-center text-sm text-muted">
          {s("linesEmpty")}
        </p>
      ) : (
        groups.map(({ unit, entries }) => (
          <section
            key={unit.id}
            style={{ ["--unit" as string]: unit.hue }}
            className="grid gap-3"
          >
            <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest">
              <span aria-hidden="true">{unit.glyph}</span>
              {unit.name}
            </h2>

            <ul className="grid gap-2">
              {entries.map((entry) => {
                const line = entry.oneLiner[locale];
                return (
                  <li
                    key={entry.id}
                    className="card-outline grid gap-2 rounded-xl bg-surface p-4 sm:grid-cols-[10rem_1fr_auto] sm:items-start sm:gap-4"
                  >
                    <Link
                      href={`/${locale}/dex/${entry.id}`}
                      style={{
                        ["--unit" as string]: unitMap[entry.units[0]].hue,
                      }}
                      className="flex items-center gap-2 font-extrabold hover:underline"
                    >
                      <BrandMark entry={entry} size={18} />
                      {entry.name}
                    </Link>

                    <blockquote className="border-l-4 border-[hsl(var(--unit))] pl-3 text-sm leading-snug">
                      {line}
                    </blockquote>

                    <button
                      type="button"
                      onClick={() => copy(entry.id, line)}
                      className="justify-self-start rounded-full border-2 border-black px-3 py-1 text-xs font-bold hover:bg-black/5 sm:justify-self-end"
                    >
                      {copied === entry.id ? s("linesCopied") : s("linesCopy")}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
