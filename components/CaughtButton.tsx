"use client";

import { strings } from "@/lib/i18n";
import { useCaught } from "@/lib/caught";
import type { Locale } from "@/lib/types";

export function CaughtButton({ id, locale }: { id: string; locale: Locale }) {
  const s = strings(locale);
  const { caught, toggle } = useCaught();
  const isCaught = caught.has(id);

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={isCaught}
      className={[
        "pop card-outline inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold",
        isCaught ? "bg-red-600 text-white" : "bg-surface",
      ].join(" ")}
    >
      <span
        className="size-4 shrink-0 rounded-full border-2 border-black bg-[linear-gradient(hsl(0_85%_50%)_0_50%,#fff_50%_100%)]"
        aria-hidden="true"
      />
      {isCaught ? s("caught") : s("markCaught")}
    </button>
  );
}
