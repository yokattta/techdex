"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { battles } from "@/lib/battles";
import { getEntry } from "@/lib/entries";
import { strings } from "@/lib/i18n";
import { unitMap } from "@/lib/units";
import { BrandMark, BrandTile } from "./BrandMark";
import { UnitBadge } from "./UnitBadge";
import type { Locale } from "@/lib/types";

export function BattleArena({ locale }: { locale: Locale }) {
  const s = strings(locale);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);

  const battle = battles[index];
  const finished = index >= battles.length;

  const pick = useCallback(
    (id: string) => {
      if (picked !== null || !battle) return;
      setPicked(id);
      if (id === battle.answer) {
        setCorrect((n) => n + 1);
        setStreak((n) => {
          const next = n + 1;
          setBest((b) => Math.max(b, next));
          return next;
        });
      } else {
        setStreak(0);
      }
    },
    [battle, picked],
  );

  const next = useCallback(() => {
    setPicked(null);
    setIndex((i) => i + 1);
  }, []);

  const restart = useCallback(() => {
    setIndex(0);
    setPicked(null);
    setCorrect(0);
    setStreak(0);
  }, []);

  const options = useMemo(
    () =>
      (battle?.options ?? []).flatMap((id) => {
        const entry = getEntry(id);
        return entry ? [entry] : [];
      }),
    [battle],
  );

  if (finished) {
    return (
      <div className="card-outline grid gap-4 rounded-2xl bg-surface p-6 text-center">
        <p className="text-lg font-black">{s("battleDone")}</p>
        <p className="font-mono text-3xl font-black tabular-nums">
          {correct} / {battles.length}
        </p>
        <p className="text-xs font-bold uppercase tracking-wide text-muted">
          {s("battleStreak")}: {best}
        </p>
        <p>
          <button
            type="button"
            onClick={restart}
            className="pop card-outline rounded-full bg-red-600 px-5 py-2.5 text-sm font-black uppercase tracking-wide text-white"
          >
            {s("battleRestart")}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-wide text-muted">
        <span>
          {s("battleProgress")} {index + 1} {s("battleOf")} {battles.length}
        </span>
        <span>
          {s("battleScore")}: {correct}
        </span>
        <span>
          {s("battleStreak")}: {streak}
        </span>
      </div>

      <section className="card-outline rounded-2xl bg-surface p-5">
        <h2 className="mb-2 text-xs font-black uppercase tracking-widest text-muted">
          {s("battleScenario")}
        </h2>
        <p className="text-base leading-relaxed">{battle.scenario[locale]}</p>
      </section>

      <p className="text-sm font-black">{s("battlePick")}</p>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-3">
        {options.map((entry) => {
          const isAnswer = entry.id === battle.answer;
          const isPicked = entry.id === picked;
          const revealed = picked !== null;

          return (
            <li key={entry.id} className="grid">
              <button
                type="button"
                onClick={() => pick(entry.id)}
                disabled={revealed}
                aria-pressed={isPicked}
                style={{ ["--unit" as string]: unitMap[entry.units[0]].hue }}
                className={[
                  "card-outline grid gap-2 rounded-2xl p-4 text-left",
                  revealed ? "" : "pop unit-tint bg-surface",
                  revealed && isAnswer ? "bg-emerald-100 dark:bg-emerald-950/60" : "",
                  revealed && isPicked && !isAnswer
                    ? "bg-red-100 dark:bg-red-950/60"
                    : "",
                  revealed && !isPicked && !isAnswer ? "bg-surface opacity-60" : "",
                ].join(" ")}
              >
                <span className="flex items-center gap-2.5">
                  <BrandTile entry={entry} size={22} className="size-10 shrink-0 rounded-lg" />
                  <span className="font-extrabold">{entry.name}</span>
                </span>
                <span className="flex flex-wrap gap-1">
                  {entry.units.map((unit) => (
                    <UnitBadge key={unit} unit={unit} locale={locale} />
                  ))}
                </span>
                {revealed && (
                  <span className="text-[10px] font-black uppercase tracking-wide">
                    {isAnswer
                      ? `✓ ${s("battleCorrect")}`
                      : isPicked
                        ? `✕ ${s("battleWrong")}`
                        : ""}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {picked !== null && (
        <div aria-live="polite" className="grid gap-3">
          {options.map((entry) => {
            const verdict = battle.verdicts[entry.id];
            if (!verdict) return null;
            const isAnswer = entry.id === battle.answer;
            const isPicked = entry.id === picked;

            // Show the answer and the pick in full; the untaken third is
            // still worth reading, just quieter.
            return (
              <div
                key={entry.id}
                className={[
                  "card-outline rounded-2xl p-4",
                  isAnswer
                    ? "bg-emerald-50 dark:bg-emerald-950/40"
                    : isPicked
                      ? "bg-red-50 dark:bg-red-950/40"
                      : "bg-surface",
                ].join(" ")}
              >
                <p className="mb-1 flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wide">
                  <BrandMark entry={entry} size={16} />
                  <span>{entry.name}</span>
                  {isAnswer && (
                    <span className="rounded-full border-2 border-black bg-emerald-500 px-2 py-0.5 text-[10px] text-white">
                      {s("battleAnswerWas")}
                    </span>
                  )}
                  {isPicked && !isAnswer && (
                    <span className="rounded-full border-2 border-black bg-red-600 px-2 py-0.5 text-[10px] text-white">
                      {s("battleYourPick")}
                    </span>
                  )}
                </p>
                <p className="text-sm leading-relaxed">{verdict[locale]}</p>
                <p className="mt-2">
                  <Link
                    href={`/${locale}/dex/${entry.id}`}
                    className="text-xs font-bold underline underline-offset-4"
                  >
                    {s("battleReadCard")} →
                  </Link>
                </p>
              </div>
            );
          })}

          <p>
            <button
              type="button"
              onClick={next}
              className="pop card-outline rounded-full bg-red-600 px-5 py-2.5 text-sm font-black uppercase tracking-wide text-white"
            >
              {index + 1 >= battles.length ? s("battleDone") : s("battleNext")}
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
