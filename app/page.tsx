import Link from "next/link";
import { LocaleRedirect } from "@/components/LocaleRedirect";
import { defaultLocale, localeNames, locales } from "@/lib/i18n";

/**
 * The root used to call `redirect()`, which a static export cannot do — there
 * is no server to issue the 307. Picking the locale on the client is the
 * portable version, and it is also the better one: a Chinese visitor now lands
 * on /zh instead of being sent to /en and having to notice the switcher.
 *
 * The links below are the no-JavaScript path, and they render for the fraction
 * of a second before the redirect fires.
 */
export default function RootPage() {
  return (
    <>
      <LocaleRedirect />
      <main className="mx-auto grid max-w-md gap-6 px-4 py-24 text-center">
        <h1 className="text-4xl font-black tracking-tight">TechDex</h1>
        <p className="text-sm text-muted">Choose a language · 选择语言</p>
        <div className="flex justify-center gap-3">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}`}
              prefetch={locale === defaultLocale}
              className="card-outline pop rounded-full bg-surface px-5 py-2.5 text-sm font-black"
            >
              {localeNames[locale]}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
