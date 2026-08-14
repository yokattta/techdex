import Link from "next/link";
import { notFound } from "next/navigation";
import { HtmlLang } from "@/components/HtmlLang";
import { LocaleSwitch } from "@/components/LocaleSwitch";
import { isLocale, locales, strings } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = strings(locale);

  return (
    <>
      <HtmlLang locale={locale} />

      <header className="border-b-3 border-black bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <span
              className="grid size-10 place-items-center rounded-full border-3 border-black bg-[linear-gradient(hsl(0_85%_50%)_0_50%,#fff_50%_100%)] text-lg"
              aria-hidden="true"
            />
            <span className="text-2xl leading-none font-black tracking-tight">
              {s("title")}
            </span>
          </Link>
          <LocaleSwitch current={locale} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>

      <footer className="border-t-3 border-black bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted">
          {s("builtWith")}
        </div>
      </footer>
    </>
  );
}
