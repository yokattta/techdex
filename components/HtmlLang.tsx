"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/types";

/**
 * The root layout can't see the `[locale]` param, so the locale layout sets the
 * document language from the client instead. Screen readers and `:lang()` rules
 * depend on this being right.
 */
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-Hans" : "en";
  }, [locale]);

  return null;
}
