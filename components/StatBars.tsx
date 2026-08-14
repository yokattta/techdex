import { statLabels, statOrder } from "@/lib/units";
import type { Locale, Stats } from "@/lib/types";

export function StatBars({
  stats,
  locale,
}: {
  stats: Stats;
  locale: Locale;
}) {
  return (
    <dl className="grid gap-2.5">
      {statOrder.map((key) => {
        const value = stats[key];
        return (
          <div key={key} className="grid grid-cols-[7rem_1fr_2.5rem] items-center gap-3">
            <dt className="text-xs font-bold uppercase tracking-wide text-muted">
              {statLabels[key].label[locale]}
            </dt>
            <dd className="h-4 rounded-full border-2 border-black bg-black/10">
              <div
                className="h-full rounded-full bg-[hsl(var(--unit))]"
                style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
              />
            </dd>
            <dd className="text-right font-mono text-sm font-bold tabular-nums">
              {value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
