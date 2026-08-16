import type { L10n } from "./types";

/**
 * Generations, the way a Pokémon game has them. An entry's era is **when it
 * became something a working engineer had to know**, not when it was invented
 * — Postgres is 1986 and CAP is 2000, but neither mattered to most people then.
 *
 * Each era is defined by one shift in what you could stop thinking about.
 * That's the test for whether a boundary is real: if nothing about the job
 * changed, it isn't a generation, it's a fashion.
 */
export type EraId = 1 | 2 | 3 | 4 | 5;

export type Era = {
  id: EraId;
  /** Untranslated — a label, like a unit name. */
  name: string;
  span: string;
  /** The one sentence that makes the boundary real. */
  shift: L10n;
  glyph: string;
  hue: string;
};

export const eras: Era[] = [
  {
    id: 1,
    name: "Monolith",
    span: "≈1995–2006",
    shift: {
      en: "One machine, one process, one database — and the server was a thing you could physically point at. Everything since has been about giving that up.",
      zh: "一台机器、一个进程、一个数据库 —— 而那台服务器是你可以用手指着的实物。之后的一切，都是在放弃这一点。",
    },
    glyph: "🗿",
    hue: "28 45% 38%",
  },
  {
    id: 2,
    name: "Cloud",
    span: "≈2006–2013",
    shift: {
      en: "Capacity stopped being a purchase and became a dial. You still thought in machines, but you stopped waiting weeks for one — which is what made distributed systems everyone's problem instead of Google's.",
      zh: "容量不再是一次采购，变成了一个旋钮。你仍然按机器思考，但不用再等几周才拿到一台 —— 正是这一点，让分布式系统从 Google 的问题变成了所有人的问题。",
    },
    glyph: "☁️",
    hue: "205 70% 42%",
  },
  {
    id: 3,
    name: "Containers",
    span: "≈2013–2018",
    shift: {
      en: "The artifact started carrying its own environment, so the machine underneath stopped mattering. The unit of deployment stopped being a server and became an image.",
      zh: "产物开始自带运行环境，于是底下那台机器不再重要。部署的单位从一台服务器变成了一个镜像。",
    },
    glyph: "📦",
    hue: "192 80% 34%",
  },
  {
    id: 4,
    name: "Managed",
    span: "≈2018–2022",
    shift: {
      en: "Running things became someone else's job and choosing them became yours. The scarce skill moved from operating a database to knowing which one, and to seeing what your system was doing at all.",
      zh: "运行这些东西成了别人的工作，而挑选它们成了你的工作。稀缺的能力从「会运维一个数据库」变成了「知道该选哪一个」，以及「看得见自己的系统在干什么」。",
    },
    glyph: "🛠️",
    hue: "266 55% 48%",
  },
  {
    id: 5,
    name: "LLM-native",
    span: "2022–",
    shift: {
      en: "Output stopped being a function of input. Everything downstream — testing, caching, error handling, the interface itself — had assumed determinism, and quietly stopped being able to.",
      zh: "输出不再是输入的函数。而下游的一切 —— 测试、缓存、错误处理、乃至界面本身 —— 都建立在确定性的假设上，然后悄无声息地失效了。",
    },
    glyph: "🔮",
    hue: "330 70% 46%",
  },
];

export const eraMap: Record<EraId, Era> = Object.fromEntries(
  eras.map((era) => [era.id, era]),
) as Record<EraId, Era>;

/**
 * Whether the ground under an entry is still moving. Useful because it answers
 * a question a learner actually has: will what I learn here still be true in
 * five years? Postgres knowledge keeps; RAG tooling knowledge may not.
 */
export type Status = "rising" | "settled";

export const statusLabels: Record<Status, L10n> = {
  rising: { en: "Still moving", zh: "还在变" },
  settled: { en: "Settled", zh: "已稳定" },
};

export const statusHint: Record<Status, L10n> = {
  rising: {
    en: "The practices here are still being worked out — expect what you learn to shift.",
    zh: "这里的实践还在成形 —— 你学到的东西预期会变。",
  },
  settled: {
    en: "The fundamentals here have held for years and are safe to invest in.",
    zh: "这里的基本盘已经稳了很多年，值得投入。",
  },
};
