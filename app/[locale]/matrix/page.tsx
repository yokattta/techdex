import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TypeChart } from "@/components/TypeChart";
import { isLocale, locales, strings } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return { title: "Not found" };
  const s = strings(locale);
  return { title: s("matrixTitle"), description: s("matrixIntro") };
}

export default async function MatrixPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const s = strings(locale);

  return (
    <div className="grid gap-6">
      <section className="grid gap-2">
        <h1 className="text-4xl font-black tracking-tight">{s("matrixTitle")}</h1>
        <p className="max-w-3xl text-base text-muted">{s("matrixIntro")}</p>
      </section>

      <TypeChart locale={locale} />
    </div>
  );
}
