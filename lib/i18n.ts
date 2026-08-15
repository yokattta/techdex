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
  oneLiner: { en: "Say this", zh: "说这句" },
  oneLinerHint: {
    en: "The sentence that shows you've operated it, not just read the docs.",
    zh: "证明你真的用过、而不是只读过文档的那句话。",
  },
  lore: { en: "Where it came from", zh: "它是怎么来的" },

  // One-liner cheat sheet
  navLines: { en: "Lines", zh: "一句话" },
  linesTitle: { en: "One-liners", zh: "一句话速查" },
  linesIntro: {
    en: "Every card's give-away sentence in one place. Each one carries something specific — a mechanism, a limit, the question a practitioner asks first — because generic wisdom signals nothing.",
    zh: "把每张卡那句「露底」的话集中在一处。每句都带着具体的东西 —— 一个机制、一个限制、或者内行会先问的那个问题 —— 因为泛泛的道理什么也证明不了。",
  },
  linesSearch: { en: "Filter lines…", zh: "筛选…" },
  linesCopy: { en: "Copy", zh: "复制" },
  linesCopied: { en: "Copied", zh: "已复制" },
  linesEmpty: { en: "Nothing matches.", zh: "没有匹配的。" },
  howItWorks: { en: "How it actually works", zh: "它究竟怎么运作" },
  pitfall: { en: "Common pitfall", zh: "常见坑" },
  clashes: { en: "Clashes with", zh: "相克" },
  clashesHint: {
    en: "Same job, opposite promises. Reaching for the wrong one usually fails quietly.",
    zh: "干同一件事，给的却是相反的承诺。选错那个，通常是静默地出问题。",
  },
  rarity: { en: "Rarity", zh: "稀有度" },
  rarityCommon: { en: "Common", zh: "常见" },
  rarityRare: { en: "Rare", zh: "稀有" },
  rarityLegendary: { en: "Legendary", zh: "传说" },

  // Gacha
  gacha: { en: "Open a pack", zh: "抽卡" },
  gachaTitle: { en: "Booster pack", zh: "补充包" },
  gachaIntro: {
    en: "Five cards, one guaranteed rare or better. Tap each card to flip it — then go read the one you know least about.",
    zh: "五张卡，保底一张稀有以上。点每张卡翻面 —— 然后去读你最不熟的那一张。",
  },
  gachaOpen: { en: "Open pack", zh: "开包" },
  gachaAgain: { en: "Open another", zh: "再来一包" },
  gachaFlipAll: { en: "Flip all", zh: "全部翻开" },
  gachaTapToFlip: { en: "Tap to flip", zh: "点击翻面" },
  gachaPacksOpened: { en: "Packs opened", zh: "已开包数" },
  gachaNewToYou: { en: "Not caught yet", zh: "还没收服" },
  gachaReadIt: { en: "Read the entry", zh: "查看条目" },
  gachaDailyNote: {
    en: "Draws are uniform across all 24 entries, with one slot reserved for a rare card.",
    zh: "抽取在 24 个条目上是均匀的，其中一个位置留给稀有卡。",
  },

  // Navigation
  navDex: { en: "Dex", zh: "图鉴" },
  navMatrix: { en: "Type chart", zh: "相性表" },
  navBattle: { en: "Battle", zh: "对战" },

  // Type chart
  matrixTitle: { en: "Type chart", zh: "相性表" },
  matrixIntro: {
    en: "Read one direction only: a decision in the row unit forces a decision in the column unit. Not damage — coupling. The question it answers is 'if I change this, what am I signing up to rewrite?'",
    zh: "只按一个方向读：行单元里的一个决定，会逼着列单元也做出决定。这里不是伤害，是耦合。它回答的问题是：「我改了这个，等于签下了重写什么的合同？」",
  },
  matrixRowLabel: { en: "Change here ↓", zh: "这里变了 ↓" },
  matrixColumnLabel: { en: "…and this follows →", zh: "…这里就得跟着变 →" },
  matrixPickCell: {
    en: "Pick a cell to see why.",
    zh: "点一个格子看理由。",
  },
  matrixNoNote: {
    en: "Some influence, nothing structural — no defence needed.",
    zh: "有影响，但不涉及结构 —— 不需要额外解释。",
  },
  matrixSelfCell: {
    en: "A unit against itself. Nothing to say here.",
    zh: "单元对自己。这里没什么好说的。",
  },
  matrixLegend: { en: "Legend", zh: "图例" },

  // Battle
  battleTitle: { en: "Battle", zh: "对战" },
  battleIntro: {
    en: "A scenario, three cards. The wrong answers are the tempting ones — each explains how it would have failed, and most of them fail quietly.",
    zh: "一个场景，三张卡。错的选项都是有诱惑力的那种 —— 每个都会解释它会怎么出事，而其中大多数出事时是静默的。",
  },
  battleScenario: { en: "Scenario", zh: "场景" },
  battlePick: { en: "Which card do you send out?", zh: "你派哪张卡上场？" },
  battleCorrect: { en: "Effective", zh: "打中了" },
  battleWrong: { en: "It fails here", zh: "这里会出事" },
  battleYourPick: { en: "Your pick", zh: "你选的" },
  battleAnswerWas: { en: "The answer", zh: "正确答案" },
  battleNext: { en: "Next battle", zh: "下一场" },
  battleRestart: { en: "Start over", zh: "重新开始" },
  battleStreak: { en: "Streak", zh: "连胜" },
  battleScore: { en: "Score", zh: "战绩" },
  battleDone: { en: "That's all of them.", zh: "全部打完了。" },
  battleReadCard: { en: "Read the card", zh: "查看这张卡" },
  battleProgress: { en: "Battle", zh: "第" },
  battleOf: { en: "of", zh: "场 /" },
  learnMore: { en: "Learn more", zh: "延伸阅读" },
  backToDex: { en: "Back to the dex", zh: "返回图鉴" },
  entryNotFound: { en: "No such entry.", zh: "没有这个条目。" },
  unitsLabel: { en: "Units", zh: "单元" },
  builtWith: {
    en: "Built with Next.js, TypeScript and Tailwind.",
    zh: "使用 Next.js、TypeScript 和 Tailwind 构建。",
  },
  trademarks: {
    en: "Product logos are trademarks of their respective owners and are used here only to identify the products described. Mark artwork from simple-icons (CC0-1.0).",
    zh: "产品 logo 为各自所有者的商标，此处仅用于指代所描述的产品。图形来自 simple-icons（CC0-1.0）。",
  },
  langSwitchLabel: { en: "Language", zh: "语言" },
} satisfies Record<string, L10n>;

export type DictKey = keyof typeof dict;

/** `const s = strings(locale); s("caught")` */
export function strings(locale: Locale) {
  return (key: DictKey): string => dict[key][locale];
}
