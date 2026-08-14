import { locales, type L10n, type Locale } from "./types";

export { locales };
export type { Locale };

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Picks the right side of a translated string. */
export function t(text: L10n, locale: Locale): string {
  return text[locale];
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

/**
 * UI chrome only. Anything that is a technical term stays in English on both
 * sides on purpose — a Chinese reader should still search for "Ops cost" as
 * "运维成本" but for "Kafka" as "Kafka".
 */
const dict = {
  title: { en: "TechDex", zh: "TechDex" },
  subtitle: {
    en: "A field guide to the tech stack. Catch them all.",
    zh: "一本技术栈图鉴。把它们全收了。",
  },
  allUnits: { en: "All units", zh: "全部单元" },
  searchPlaceholder: {
    en: "Search by name or idea…",
    zh: "按名称或概念搜索…",
  },
  noResults: {
    en: "Nothing matches. Try a different filter.",
    zh: "没有匹配的条目。换个筛选条件试试。",
  },
  showing: { en: "Showing", zh: "显示" },
  of: { en: "of", zh: "/" },
  caught: { en: "Caught", zh: "已收服" },
  notCaught: { en: "Not caught", zh: "未收服" },
  markCaught: { en: "Mark as caught", zh: "标记为已收服" },
  markNotCaught: { en: "Mark as not caught", zh: "取消已收服" },
  caughtOnly: { en: "Caught only", zh: "只看已收服" },
  progress: { en: "Progress", zh: "收服进度" },
  resetProgress: { en: "Reset progress", zh: "重置进度" },
  resetConfirm: {
    en: "Clear all caught marks? This cannot be undone.",
    zh: "清除所有已收服标记？此操作无法撤销。",
  },
  baseStats: { en: "Base stats", zh: "种族值" },
  moves: { en: "Moves", zh: "招式" },
  evolution: { en: "Evolution line", zh: "进化链" },
  learnMore: { en: "Learn more", zh: "延伸阅读" },
  backToDex: { en: "Back to the dex", zh: "返回图鉴" },
  entryNotFound: { en: "No such entry.", zh: "没有这个条目。" },
  unitsLabel: { en: "Units", zh: "单元" },
  builtWith: {
    en: "Built with Next.js, TypeScript and Tailwind.",
    zh: "使用 Next.js、TypeScript 和 Tailwind 构建。",
  },
  langSwitchLabel: { en: "Language", zh: "语言" },
} satisfies Record<string, L10n>;

export type DictKey = keyof typeof dict;

/** `const s = strings(locale); s("caught")` */
export function strings(locale: Locale) {
  return (key: DictKey): string => dict[key][locale];
}
