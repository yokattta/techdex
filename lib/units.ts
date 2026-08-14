import type { StatId, Unit, UnitId, L10n } from "./types";

export const units: Unit[] = [
  {
    id: "devops",
    name: "DevOps",
    tagline: {
      en: "Ship it, run it, keep it alive.",
      zh: "把东西发出去，并且让它活着。",
    },
    glyph: "🚀",
    hue: "14 88% 44%",
  },
  {
    id: "model",
    name: "Model",
    tagline: {
      en: "How machines learn and what they learn from.",
      zh: "机器怎么学，以及从什么里学。",
    },
    glyph: "🧠",
    hue: "270 62% 50%",
  },
  {
    id: "platform",
    name: "Platform",
    tagline: {
      en: "The load-bearing infrastructure everything sits on.",
      zh: "所有东西都压在上面的承重层。",
    },
    glyph: "🏗️",
    hue: "212 92% 40%",
  },
  {
    id: "concept",
    name: "Concept",
    tagline: {
      en: "Ideas that outlive whichever tool is fashionable.",
      zh: "比任何当红工具活得都久的想法。",
    },
    glyph: "💡",
    hue: "168 74% 29%",
  },
  {
    id: "app",
    name: "App",
    tagline: {
      en: "Frameworks you actually write features in.",
      zh: "你真正拿来写功能的那些框架。",
    },
    glyph: "🧩",
    hue: "36 96% 34%",
  },
  {
    id: "uiux",
    name: "UI / UX",
    tagline: {
      en: "The part of the system a human touches.",
      zh: "系统里被人直接摸到的那一层。",
    },
    glyph: "🎨",
    hue: "330 74% 44%",
  },
];

export const unitMap: Record<UnitId, Unit> = Object.fromEntries(
  units.map((u) => [u.id, u]),
) as Record<UnitId, Unit>;

export const statLabels: Record<StatId, { name: string; label: L10n }> = {
  difficulty: {
    name: "DIFF",
    label: { en: "Difficulty", zh: "上手难度" },
  },
  ubiquity: {
    name: "UBIQ",
    label: { en: "Ubiquity", zh: "普及程度" },
  },
  impact: {
    name: "IMPT",
    label: { en: "Impact", zh: "影响力" },
  },
  ops: {
    name: "OPS",
    label: { en: "Ops cost", zh: "运维成本" },
  },
};

export const statOrder: StatId[] = ["difficulty", "ubiquity", "impact", "ops"];
