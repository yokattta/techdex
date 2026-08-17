"use client";

import { useCaught } from "@/lib/caught";
import { strings } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

/**
 * How much of a route the learner has caught. Reuses the existing progress
 * store rather than inventing per-route state, so marking a card caught
 * anywhere moves every route it appears on.
 */
export function RouteProgress({
  entryIds,
  locale,
  compact = false,
}: {
  entryIds: string[];
  locale: Locale;
  compact?: boolean;
}) {
  const s = strings(locale);
  const { caught } = useCaught();
  const done = entryIds.filter((id) => caught.has(id)).length;
  const pct = entryIds.length === 0 ? 0 : (done / entryIds.length) * 100;

  return (
    <div
      className={compact ? "flex items-center gap-2" : "grid gap-1.5"}
      aria-label={`${s("routeProgress")}: ${done} / ${entryIds.length}`}
    >
      {!compact && (
        <span className="text-xs font-bold uppercase tracking-wide text-muted">
          {s("routeProgress")}
        </span>
      )}
      <div className="flex items-center gap-2">
        <div className="h-3 min-w-24 flex-1 rounded-full border-2 border-black bg-black/10">
          <div
            className="h-full rounded-full bg-[hsl(var(--route))] transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="font-mono text-xs font-bold tabular-nums">
          {done}/{entryIds.length}
        </span>
      </div>
    </div>
  );
}
