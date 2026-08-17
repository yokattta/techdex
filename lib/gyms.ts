import { getEntry } from "./entries";
import type { Entry, L10n } from "./types";

/**
 * Gyms are **archetype organisations**, not named companies. "Company X uses Y"
 * goes stale within a year, is often wrong from the outside, and reads as an
 * endorsement nobody asked for. An archetype — a kind of problem at a kind of
 * scale — teaches the shape instead, and the shape is what transfers.
 *
 * Each gym has a leader question: the thing you would actually be asked, chosen
 * so that reading about the stack does not get you through it.
 */
export type Gym = {
  id: string;
  name: L10n;
  glyph: string;
  /** The situation that produced this stack. */
  situation: L10n;
  /** What the leader asks. */
  question: L10n;
  /** What a good answer contains — and why the question separates people. */
  answer: L10n;
  /** Entry ids this organisation's stack rests on. */
  roster: string[];
};

export type Track = {
  id: string;
  /** Untranslated role label, like a unit name. */
  role: string;
  name: L10n;
  glyph: string;
  hue: string;
  intro: L10n;
  /** Gym ids, in the order worth taking them. */
  gyms: string[];
  /** The six entries this role is actually built on. */
  formation: string[];
  /** Set when the dex genuinely under-serves this track. */
  gap?: L10n;
};

export const gyms: Gym[] = [
  {
    id: "startup-monolith",
    name: { en: "The Startup Monolith", zh: "创业期单体" },
    glyph: "🏠",
    situation: {
      en: "Three engineers, one product, one machine. Everything runs in one process next to one database, and the binding constraint is how fast you can change your mind.",
      zh: "三个工程师、一个产品、一台机器。所有东西跑在一个进程里，旁边一个数据库，而真正的约束是「你改主意能有多快」。",
    },
    question: {
      en: "What would you add next — and more importantly, what would you refuse to add?",
      zh: "下一步你会加什么 —— 更重要的是，你会拒绝加什么？",
    },
    answer: {
      en: "The refusals are the signal. Kubernetes, sharding and a message broker are all defensible in the abstract and all wrong here, because each one buys automation for work nobody is doing yet while charging operational rent from day one. A good answer adds CI and a managed Postgres, and says out loud which metric would change its mind.",
      zh: "拒绝什么才是信号。Kubernetes、分片、消息中间件在抽象层面都说得通，在这里都是错的 —— 因为它们各自把「还没人在做的工作」自动化了，同时从第一天起就开始收运维租金。好的回答会加 CI 和一个托管 Postgres，并且明说哪个指标变了会让它改主意。",
    },
    roster: ["docker", "postgresql", "nginx", "ci-cd", "fastapi", "pydantic"],
  },
  {
    id: "scaling-marketplace",
    name: { en: "The Scaling Marketplace", zh: "增长期交易平台" },
    glyph: "📈",
    situation: {
      en: "Traffic outgrew one machine. There are now several application servers behind a proxy, a cache in front of the database, and a growing suspicion that some users see stale data.",
      zh: "流量超出了一台机器。现在代理后面有好几台应用服务器，数据库前面有一层缓存，以及一个越来越强的怀疑：有些用户看到的是旧数据。",
    },
    question: {
      en: "The cache is there to protect the database. What happens the moment a very popular key expires?",
      zh: "缓存是用来保护数据库的。那么一个非常热的 key 过期的那一瞬间，会发生什么？",
    },
    answer: {
      en: "A thousand concurrent requests miss at once and all of them hit the database in the same instant — the cache scheduled the outage it was installed to prevent. Naming the stampede is table stakes; the answer that lands also says which fix and why: one request recomputes while the rest serve stale, or the key is never reused in the first place.",
      zh: "一千个并发请求同时 miss，然后在同一瞬间全部砸向数据库 —— 缓存给它本该阻止的那次故障排好了日程。能说出「击穿」只是及格；真正到位的回答还会说清选哪种修法以及为什么：让一个请求去重算、其余的先吃旧值，或者干脆从一开始就不复用这个 key。",
    },
    roster: ["load-balancing", "caching", "redis", "rate-limiting", "observability"],
  },
  {
    id: "event-backbone",
    name: { en: "The Event Backbone", zh: "事件中枢" },
    glyph: "📮",
    situation: {
      en: "A dozen services that used to call each other directly now publish events instead. Nothing is synchronous any more, and every team owns a consumer they did not write the producer for.",
      zh: "十几个原本互相直接调用的服务，现在改成发布事件了。什么都不再是同步的，而每个团队都维护着一个「生产者不是自己写的」消费者。",
    },
    question: {
      en: "A consumer was down for an hour this morning. Does it catch up — and what did that cost you?",
      zh: "今天早上有个消费者宕了一小时。它能补上吗 —— 而这件事让你付出了什么代价？",
    },
    answer: {
      en: "It catches up, because the log is retained and the group's offset is its own. The cost is the part people skip: catching up means replaying an hour of events at full speed into a downstream that was sized for real-time, and it means every one of those events arrives a second time for anyone who already saw them. Which is why idempotency is not optional here — it is the price of being able to recover at all.",
      zh: "能补上，因为日志被保留着，而这个 group 的 offset 是它自己的。代价才是大家跳过的部分：补数意味着把一小时的事件全速重放进一个按实时流量设计的下游，也意味着这些事件对已经见过它们的人会再来一次。所以幂等在这里不是可选项 —— 它是「你还能恢复」的价格。",
    },
    roster: ["kafka", "idempotency", "eventual-consistency", "backpressure", "observability"],
  },
  {
    id: "data-platform",
    name: { en: "The Data Platform", zh: "数据平台" },
    glyph: "🗄️",
    situation: {
      en: "The same data has to serve product queries in milliseconds and analytical queries that scan years. One database was doing both until it wasn't.",
      zh: "同一份数据既要在毫秒内服务产品查询，又要支撑扫描好几年的分析查询。一个数据库一直在同时干这两件事 —— 直到干不动了。",
    },
    question: {
      en: "You are about to shard. Which of your existing queries become scatter-gather, and can the product afford them?",
      zh: "你正准备分片。你现有的哪些查询会变成 scatter-gather，而产品付得起吗？",
    },
    answer: {
      en: "Everything not filtered by the shard key, which in practice means most reporting and every admin screen. Scatter-gather is as slow as the slowest shard and gets slower as you add shards, so the honest version of this answer names the queries that will break, and checks whether one machine is genuinely exhausted first — a surprising share of 'we need to shard' is a missing index.",
      zh: "所有没按 shard key 过滤的查询 —— 实际上就是大部分报表和每一个后台管理页面。Scatter-gather 慢得和最慢的分片一样，而且分片越多越慢。所以诚实的回答会点名哪些查询会垮，并且先确认单机是不是真的榨干了 —— 相当一部分「我们得分片了」其实是缺了个索引。",
    },
    roster: ["postgresql", "sharding", "kafka", "cap-theorem", "eventual-consistency", "observability"],
  },
  {
    id: "kubernetes-shop",
    name: { en: "The Kubernetes Shop", zh: "Kubernetes 车间" },
    glyph: "☸️",
    situation: {
      en: "Enough services that scheduling them by hand stopped being possible, and enough environments that clicking in a console stopped being traceable. There is a platform team now.",
      zh: "服务多到手动调度已经不可能，环境多到在控制台里点已经无法追溯。现在有一个平台团队了。",
    },
    question: {
      en: "Terraform declares the cluster. Who declares what runs inside it?",
      zh: "Terraform 声明了集群。那么集群里跑什么，由谁来声明？",
    },
    answer: {
      en: "The cluster does — and the line has to be drawn explicitly, because both systems will reconcile whatever they are told to own. Let Terraform declare deployments too and every routine scaling event becomes a config change, while a kubectl fix during an incident gets silently reverted three days later by the next apply. Two controllers reconciling one object take turns undoing each other, forever.",
      zh: "由集群自己声明 —— 而这条线必须被明确划出来，因为两个系统都会去 reconcile 任何被交给它们的东西。让 Terraform 也声明 deployment，每一次常规扩缩容就变成一次配置变更；而事故中用 kubectl 做的修复，三天后会被下一次 apply 静默撤销。两个 controller reconcile 同一个对象，会永远轮流撤销对方。",
    },
    roster: ["kubernetes", "terraform", "docker", "nginx", "ci-cd", "observability"],
  },
  {
    id: "rag-product",
    name: { en: "The RAG Product", zh: "RAG 产品" },
    glyph: "📚",
    situation: {
      en: "A model answering questions over documents the company owns. It demos beautifully and gets quietly wrong answers in front of customers, which is a harder problem than being obviously broken.",
      zh: "一个基于公司自有文档回答问题的模型。演示效果极好，然后在客户面前悄悄给出错误答案 —— 这比「明显坏掉」难对付得多。",
    },
    question: {
      en: "An answer came back wrong. Was that retrieval or generation, and how do you know without guessing?",
      zh: "一个答案是错的。这是检索的问题还是生成的问题，而你怎么在不靠猜的情况下知道？",
    },
    answer: {
      en: "You measure retrieval on its own: for a set of real questions, was the correct chunk in the top k at all? If it wasn't, no prompt change will ever fix that answer and everyone tuning prompts is wasting weeks. If it was, the failure is downstream — ordering, conflicting chunks, or a model never told it may say 'not in the documents'. Teams that cannot separate these two debug by vibes.",
      zh: "单独度量检索：拿一组真实问题，正确的片段到底有没有进 top k？如果没有，那么改再多 prompt 也修不好这个答案，而所有在调 prompt 的人都在浪费几周。如果进了，失败就在下游 —— 顺序、互相矛盾的片段，或者从没被告知可以回答「文档里没有」的模型。分不开这两者的团队，是在靠感觉排查。",
    },
    roster: ["embeddings", "vector-database", "rag", "prompt-engineering", "hallucination", "guardrails"],
  },
  {
    id: "agent-platform",
    name: { en: "The Agent Platform", zh: "Agent 平台" },
    glyph: "🦾",
    situation: {
      en: "Models that call tools and take actions on real systems. Every loop iteration is a chance to be wrong, and unlike a wrong sentence, a wrong action has already happened by the time you notice.",
      zh: "会调用工具、在真实系统上执行动作的模型。循环的每一轮都是一次出错的机会 —— 而和一句错话不同，一个错误的动作在你发现时已经发生了。",
    },
    question: {
      en: "Your agent retried a tool call that had already charged a customer's card. What in your design was supposed to prevent that?",
      zh: "你的 agent 重试了一次「已经给客户扣过款」的工具调用。你的设计里，本来是什么东西该拦住它？",
    },
    answer: {
      en: "An idempotency key generated before the first attempt, so the second call returns the original receipt instead of charging again. The deeper answer is that the agent loop makes at-least-once the default for every side effect you expose as a tool — so the question is not whether retries happen but which of your tools are safe to retry, and whether the unsafe ones are behind a confirmation the model cannot bypass.",
      zh: "一个在第一次尝试之前就生成好的 idempotency key，让第二次调用返回原来的收据而不是再扣一次。更深一层的回答是：agent 循环让「至少一次」成了你暴露出去的每一个副作用的默认语义 —— 所以问题不是「会不会重试」，而是「你的哪些工具重试是安全的」，以及不安全的那些是不是被放在了模型绕不过去的确认之后。",
    },
    roster: ["agents", "guardrails", "model-eval", "idempotency", "rate-limiting", "observability"],
  },
  {
    id: "design-system-org",
    name: { en: "The Design System Org", zh: "设计系统组织" },
    glyph: "🧱",
    situation: {
      en: "Several product teams shipping one brand. There is a component library, a Figma file, and a persistent argument about whether either of them is the source of truth.",
      zh: "好几个产品团队在交付同一个品牌。有一个组件库、一个 Figma 文件，以及一场关于「这两者谁才是事实来源」的持久争论。",
    },
    question: {
      en: "Three teams have quietly built their own button. Is that a governance problem or an API problem?",
      zh: "三个团队各自悄悄做了自己的按钮。这是治理问题还是 API 问题？",
    },
    answer: {
      en: "Almost always an API problem wearing governance clothes. Teams fork when the system is slower to change than their deadline, so stricter rules make it worse — the fix is a shorter path from 'I need a variant' to 'it shipped'. The metric that matters is adoption, not component count: forty components with three shadow buttons is a failed system, twelve that everyone imports is not.",
      zh: "几乎总是穿着治理外衣的 API 问题。团队去 fork，是因为这套系统改起来比他们的 deadline 还慢 —— 所以更严的规矩只会更糟；解法是把「我需要一个变体」到「它上线了」的路径缩短。重要的指标是采纳率而不是组件数：四十个组件外加三个影子按钮是失败的系统，十二个所有人都在 import 的不是。",
    },
    roster: ["design-tokens", "design-system", "accessibility", "react", "nextjs", "figma"],
  },
];

export const tracks: Track[] = [
  {
    id: "sde",
    role: "SDE",
    name: { en: "Software engineer", zh: "软件工程师" },
    glyph: "🔴",
    hue: "0 78% 46%",
    intro: {
      en: "The generalist circuit. It starts where restraint is the skill and ends where the automation finally earns its keep — in that order, because doing it backwards is the most common expensive mistake in this job.",
      zh: "通才路线。它从「克制才是本事」的地方开始，到「自动化终于值回票价」的地方结束 —— 顺序不能颠倒，因为反着来是这份工作里最常见也最贵的错误。",
    },
    gyms: ["startup-monolith", "scaling-marketplace", "event-backbone", "kubernetes-shop"],
    formation: ["docker", "postgresql", "caching", "idempotency", "observability", "ci-cd"],
  },
  {
    id: "de",
    role: "DE",
    name: { en: "Data engineer", zh: "数据工程师" },
    glyph: "🔵",
    hue: "212 92% 40%",
    intro: {
      en: "Pipelines and the guarantees they carry. Almost every hard problem on this circuit is the same problem wearing different clothes: the same record arrived twice, or arrived out of order, or arrived an hour late.",
      zh: "管道，以及管道携带的那些保证。这条路线上几乎每个难题都是同一个问题换了身衣服：同一条记录来了两次、或者顺序乱了、或者晚到了一小时。",
    },
    gyms: ["event-backbone", "data-platform", "kubernetes-shop"],
    formation: ["kafka", "postgresql", "idempotency", "sharding", "eventual-consistency", "backpressure"],
  },
  {
    id: "ai-engineer",
    role: "AI Engineer",
    name: { en: "AI engineer", zh: "AI 工程师" },
    glyph: "🟣",
    hue: "270 62% 50%",
    intro: {
      en: "The newest circuit and the one where the ground moves under you. Note how much of the formation is not about models at all — the durable half of this job is the engineering that surrounds a component you did not write and cannot assert anything about.",
      zh: "最新的一条路线，也是地基还在动的那条。注意阵型里有多少东西根本和模型无关 —— 这份工作里持久的那一半，是围绕一个「你没写、也无法对它做任何断言」的组件所做的工程。",
    },
    gyms: ["rag-product", "agent-platform"],
    formation: ["embeddings", "rag", "prompt-engineering", "model-eval", "guardrails", "observability"],
  },
  {
    id: "frontend",
    role: "Frontend",
    name: { en: "Frontend engineer", zh: "前端工程师" },
    glyph: "🎨",
    hue: "330 74% 44%",
    intro: {
      en: "One circuit, because the hard part of this role is not the framework — it is everything that has to stay true while several teams change the same surface for years.",
      zh: "只有一站，因为这个角色难的部分不是框架 —— 而是「好几个团队连着几年改同一个界面，同时还得保持成立」的那一切。",
    },
    gyms: ["design-system-org"],
    formation: ["react", "nextjs", "design-tokens", "design-system", "accessibility", "figma"],
  },
  {
    id: "ds",
    role: "DS",
    name: { en: "Data scientist", zh: "数据科学家" },
    glyph: "🟡",
    hue: "45 95% 38%",
    intro: {
      en: "The thinnest circuit here, and the honest thing to do is say so rather than dress up the entries that happen to exist.",
      zh: "这里最单薄的一条路线 —— 而诚实的做法是直说，而不是把碰巧存在的那几个条目拿来充数。",
    },
    gyms: ["data-platform", "rag-product"],
    formation: ["postgresql", "model-eval", "embeddings", "observability", "sharding", "caching"],
    gap: {
      en: "The dex covers the modelling and platform half of this role and almost none of the statistical half. Missing, and worth writing before this circuit means anything: experiment design and statistical power, A/B testing and its failure modes, data leakage, feature engineering, and the gap between a notebook and something that runs on a schedule. This gap is a to-do list, not a claim that the role is small.",
      zh: "图鉴覆盖了这个角色里建模和平台的那一半，统计的那一半几乎完全没有。缺的、并且值得在这条路线有意义之前先写的：实验设计与统计功效、A/B 测试及其失败模式、数据泄漏、特征工程，以及「一个 notebook」和「一个按时跑起来的东西」之间的距离。这个缺口是一份待办清单，不是在说这个角色很小。",
    },
  },
];

export function getGym(id: string): Gym | undefined {
  return gyms.find((gym) => gym.id === id);
}

export function getTrack(id: string): Track | undefined {
  return tracks.find((track) => track.id === id);
}

/** Roster with entries resolved; unknown ids are dropped rather than thrown. */
export function gymRoster(gym: Gym): Entry[] {
  return gym.roster.flatMap((id) => {
    const entry = getEntry(id);
    return entry ? [entry] : [];
  });
}

export function trackGyms(track: Track): Gym[] {
  return track.gyms.flatMap((id) => {
    const gym = getGym(id);
    return gym ? [gym] : [];
  });
}

export function trackFormation(track: Track): Entry[] {
  return track.formation.flatMap((id) => {
    const entry = getEntry(id);
    return entry ? [entry] : [];
  });
}

/** Tracks whose circuit includes a given gym — a gym can serve several roles. */
export function tracksWithGym(gymId: string): Track[] {
  return tracks.filter((track) => track.gyms.includes(gymId));
}

/** Gyms whose roster includes a given entry, for cross-linking from a card. */
export function gymsWithEntry(entryId: string): Gym[] {
  return gyms.filter((gym) => gym.roster.includes(entryId));
}
