import { getLogo } from "@/lib/logos";
import type { Entry } from "@/lib/types";

/**
 * Products show their real logo; concepts show their emoji glyph. Half the dex
 * is ideas — Observability, CAP Theorem, Idempotency — which have no trademark
 * and should not pretend to, so the split is content, not a fallback.
 *
 * Both are decorative: the entry name is always rendered next to the mark.
 */
export function BrandMark({ entry, size }: { entry: Entry; size: number }) {
  const logo = getLogo(entry.id);

  if (!logo) {
    return (
      <span aria-hidden="true" style={{ fontSize: size, lineHeight: 1 }}>
        {entry.glyph}
      </span>
    );
  }

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={logo.hex}
    >
      <path d={logo.path} />
    </svg>
  );
}

/**
 * The mark plus its backing tile. Logos sit on white in both themes so brand
 * colours keep their contrast — several marks (Kafka, Next.js) are near-black.
 */
export function BrandTile({
  entry,
  size,
  className = "",
}: {
  entry: Entry;
  size: number;
  className?: string;
}) {
  const hasLogo = getLogo(entry.id) !== undefined;

  return (
    <span
      className={[
        "grid place-items-center border-2 border-black",
        hasLogo ? "bg-white" : "bg-[hsl(var(--unit)/0.18)]",
        className,
      ].join(" ")}
    >
      <BrandMark entry={entry} size={size} />
    </span>
  );
}
