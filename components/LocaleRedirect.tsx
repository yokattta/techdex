"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale, isLocale } from "@/lib/i18n";

/**
 * Sends the root at `/` to the locale the visitor's browser asks for. Runs on
 * the client because a static export has no server to redirect from.
 *
 * `router.replace` rather than `push` so the back button leaves the site
 * instead of bouncing off this page and immediately redirecting again.
 */
export function LocaleRedirect() {
  const router = useRouter();

  useEffect(() => {
    const preferred = navigator.languages
      .map((tag) => tag.split("-")[0].toLowerCase())
      .find(isLocale);

    router.replace(`/${preferred ?? defaultLocale}`);
  }, [router]);

  return null;
}
