"use client";

import { useState } from "react";
import { coupling, effectivenessLabel, isSelf } from "@/lib/matrix";
import { strings } from "@/lib/i18n";
import { unitMap, units } from "@/lib/units";
import type { Effectiveness } from "@/lib/matrix";
import type { Locale, UnitId } from "@/lib/types";

type Selection = { row: UnitId; column: UnitId };

const cellStyles: Record<Effectiveness, string> = {
  2: "bg-[hsl(var(--unit))] text-white",
  1: "bg-surface text-muted",
  0.5: "bg-black/5 text-muted dark:bg-white/5",
};

const cellGlyph: Record<Effectiveness, string> = {
  2: "×2",
  1: "×1",
  0.5: "×½",
};

export function TypeChart({ locale }: { locale: Locale }) {
  const s = strings(locale);
  const [selected, setSelected] = useState<Selection | null>(null);

  const cell = selected ? coupling[selected.row][selected.column] : null;
  const detail = (() => {
    if (!selected || !cell) return s("matrixPickCell");
    if (isSelf(selected.row, selected.column)) return s("matrixSelfCell");
    return cell.note ? cell.note[locale] : s("matrixNoNote");
  })();

  return (
    <div className="grid gap-4">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[38rem] border-separate border-spacing-1">
          <caption className="mb-3 text-left text-xs font-bold uppercase tracking-wide text-muted">
            {s("matrixRowLabel")} · {s("matrixColumnLabel")}
          </caption>
          <thead>
            <tr>
              <th className="w-28" />
              {units.map((unit) => (
                <th
                  key={unit.id}
                  scope="col"
                  style={{ ["--unit" as string]: unit.hue }}
                  className="rounded-lg border-2 border-black bg-[hsl(var(--unit))] px-1 py-2 text-[10px] font-black uppercase tracking-wide text-white"
                >
                  <span aria-hidden="true">{unit.glyph}</span> {unit.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {units.map((rowUnit) => (
              <tr key={rowUnit.id}>
                <th
                  scope="row"
                  style={{ ["--unit" as string]: rowUnit.hue }}
                  className="rounded-lg border-2 border-black bg-[hsl(var(--unit))] px-2 py-2 text-left text-[10px] font-black uppercase tracking-wide text-white"
                >
                  <span aria-hidden="true">{rowUnit.glyph}</span> {rowUnit.name}
                </th>

                {units.map((columnUnit) => {
                  const entry = coupling[rowUnit.id][columnUnit.id];
                  const self = isSelf(rowUnit.id, columnUnit.id);
                  const active =
                    selected?.row === rowUnit.id &&
                    selected?.column === columnUnit.id;

                  return (
                    <td key={columnUnit.id} className="p-0">
                      <button
                        type="button"
                        onClick={() =>
                          setSelected({ row: rowUnit.id, column: columnUnit.id })
                        }
                        aria-pressed={active}
                        style={{ ["--unit" as string]: rowUnit.hue }}
                        className={[
                          "grid h-11 w-full place-items-center rounded-lg border-2 border-black font-mono text-xs font-bold",
                          self
                            ? "bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(0,0,0,0.12)_4px,rgba(0,0,0,0.12)_8px)] text-transparent"
                            : cellStyles[entry.value],
                          active ? "shadow-[3px_3px_0_#000]" : "",
                        ].join(" ")}
                      >
                        <span className="sr-only">
                          {rowUnit.name} → {columnUnit.name}:{" "}
                          {effectivenessLabel[entry.value][locale]}
                        </span>
                        <span aria-hidden="true">
                          {self ? "" : cellGlyph[entry.value]}
                        </span>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail panel — aria-live so keyboard users hear the note they selected. */}
      <div
        aria-live="polite"
        className="card-outline grid min-h-28 gap-2 rounded-2xl bg-surface p-4"
      >
        {selected && cell && !isSelf(selected.row, selected.column) && (
          <p className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wide">
            <span>{unitMap[selected.row].name}</span>
            <span aria-hidden="true">→</span>
            <span>{unitMap[selected.column].name}</span>
            <span className="rounded-full border-2 border-black px-2 py-0.5 text-[10px]">
              {effectivenessLabel[cell.value][locale]}
            </span>
          </p>
        )}
        <p className="text-sm leading-relaxed">{detail}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <span className="font-black uppercase tracking-wide">
          {s("matrixLegend")}:
        </span>
        {([2, 1, 0.5] as Effectiveness[]).map((value) => (
          <span key={value} className="flex items-center gap-1.5">
            <span
              style={{ ["--unit" as string]: "0 0% 25%" }}
              className={[
                "grid size-6 place-items-center rounded border-2 border-black font-mono text-[10px] font-bold",
                cellStyles[value],
              ].join(" ")}
            >
              {cellGlyph[value]}
            </span>
            {effectivenessLabel[value][locale]}
          </span>
        ))}
      </div>
    </div>
  );
}
