import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TechDex",
    template: "%s · TechDex",
  },
  description:
    "A cartoon field guide to the tech stack — DevOps, models, platforms, concepts, apps and UI/UX. Bilingual EN / 中文.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // `lang` is corrected per-locale by <HtmlLang /> in app/[locale]/layout.tsx.
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
