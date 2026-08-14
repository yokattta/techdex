import type { L10n, UnitId } from "./types";

/**
 * The type chart, read one direction only: **a decision in the row unit forces
 * a decision in the column unit**. Not damage — coupling. The useful question
 * it answers is "if I change this, what am I signing up to rewrite?"
 *
 * 2   strongly constrains — changing the row usually rewrites the column
 * 1   normal — some influence, nothing structural
 * 0.5 largely independent — the column barely notices
 *
 * Notes only exist for the 2s and 0.5s; a 1 needs no defence.
 */
export type Effectiveness = 0.5 | 1 | 2;

export type MatrixCell = {
  value: Effectiveness;
  note?: L10n;
};

const normal: MatrixCell = { value: 1 };

/** Self-coupling is meaningless; rendered as an empty diagonal. */
const self: MatrixCell = { value: 1 };

export const coupling: Record<UnitId, Record<UnitId, MatrixCell>> = {
  devops: {
    devops: self,
    model: normal,
    platform: {
      value: 2,
      note: {
        en: "Where you run decides which platform primitives you get. Pick managed Kubernetes and half your service discovery, secrets and storage decisions have already been made for you.",
        zh: "你在哪儿跑，决定了你能拿到哪些平台原语。选了托管 Kubernetes，服务发现、密钥和存储的决定就已经有一半替你做完了。",
      },
    },
    concept: {
      value: 0.5,
      note: {
        en: "Switching CI systems does not make eventual consistency any easier. The idea layer does not move when the tooling does.",
        zh: "换一套 CI 不会让最终一致性变得容易一点。工具变了，原理层不动。",
      },
    },
    app: normal,
    uiux: {
      value: 0.5,
      note: {
        en: "How you deploy barely touches what a button looks like. The one real channel is release frequency, which sets how fast design gets to iterate.",
        zh: "怎么部署几乎碰不到按钮长什么样。唯一真正的通道是发布频率 —— 它决定了设计能以多快的节奏迭代。",
      },
    },
  },

  model: {
    devops: {
      value: 2,
      note: {
        en: "Model serving rewrites your infrastructure: GPUs, batching, cold starts, images measured in tens of gigabytes. Almost nothing you tuned for stateless web services carries over.",
        zh: "模型服务会把基础设施重写一遍：GPU、批处理、冷启动、几十 GB 的镜像。你为无状态 web 服务调好的那一套，几乎没有能直接搬过来的。",
      },
    },
    model: self,
    platform: normal,
    concept: normal,
    app: {
      value: 2,
      note: {
        en: "Adding a model adds non-determinism and second-scale latency. The request-response mental model stops holding, and you rebuild around streaming, job queues and partially-complete states.",
        zh: "引入模型就引入了不确定性和秒级延迟。请求-响应的心智模型撑不住了，你得围绕流式、任务队列和「部分完成」的状态重新搭一遍。",
      },
    },
    uiux: {
      value: 2,
      note: {
        en: "Something slow, fallible and different every time needs a new interface vocabulary: token streaming, a stop button, an obvious retry, and somewhere honest to say 'this may be wrong'.",
        zh: "一个又慢、会出错、每次还不一样的东西，需要一套新的界面语言：逐字流式、停止按钮、显眼的重试，以及一个诚实地写着「这可能是错的」的位置。",
      },
    },
  },

  platform: {
    devops: {
      value: 2,
      note: {
        en: "The stateful things set the ceiling on operational difficulty. Stateless services can be restarted at will; a database and a broker make backup, failover and capacity planning your daily work.",
        zh: "有状态的那些东西决定了运维难度的上限。无状态服务想重启就重启；一个数据库加一个 broker，会把备份、故障转移和容量规划变成你的日常。",
      },
    },
    model: {
      value: 0.5,
      note: {
        en: "Swapping databases does not make a model more accurate. It only changes how fast you can feed it context.",
        zh: "换数据库不会让模型变得更准。它只改变你能多快把上下文喂进去。",
      },
    },
    platform: self,
    concept: normal,
    app: {
      value: 2,
      note: {
        en: "Choosing Kafka or Redis already writes half your application code. Replay, deduplication and ordering are platform properties leaking upward into every handler.",
        zh: "选 Kafka 还是 Redis，已经替你写好了一半应用代码。重放、去重、顺序保证都是平台性质，会一路渗到每一个 handler 里。",
      },
    },
    uiux: {
      value: 0.5,
      note: {
        en: "Users cannot tell which broker you run. Latency is the only property that reaches the interface at all.",
        zh: "用户看不出你用的是哪个 broker。唯一能抵达界面的性质是延迟。",
      },
    },
  },

  concept: {
    devops: {
      value: 2,
      note: {
        en: "Deciding on SLOs rather than uptime, or idempotency rather than 'just retry', rebuilds your pipeline and your alerting from the premises up.",
        zh: "决定用 SLO 而不是 uptime、用幂等而不是「重试一下就行」，会从前提开始把你的流水线和告警重建一遍。",
      },
    },
    model: normal,
    platform: {
      value: 2,
      note: {
        en: "The consistency guarantee you need decides which platforms are candidates at all. Require strong consistency across partitions and half the shortlist disappears before you evaluate anything.",
        zh: "你需要的一致性保证，直接决定了哪些平台还算候选。要求跨分区强一致，候选名单在你开始评估之前就少了一半。",
      },
    },
    concept: self,
    app: {
      value: 2,
      note: {
        en: "Idempotency, causal ordering, retry semantics — these are not libraries you install. They are how every handler ends up being written.",
        zh: "幂等、因果顺序、重试语义 —— 这些不是你装个库就有的东西。它们是每一个 handler 最终被写成什么样。",
      },
    },
    uiux: normal,
  },

  app: {
    devops: normal,
    model: {
      value: 0.5,
      note: {
        en: "Moving from Flask to FastAPI does not change what the model knows or how it behaves.",
        zh: "从 Flask 换到 FastAPI，不会改变模型知道什么、也不会改变它的行为。",
      },
    },
    platform: normal,
    concept: {
      value: 0.5,
      note: {
        en: "A framework will not decide idempotency for you. It will only make it easier to forget that you had to.",
        zh: "框架不会替你决定要不要幂等。它只会让你更容易忘记这件事本来需要你决定。",
      },
    },
    app: self,
    uiux: {
      value: 2,
      note: {
        en: "The framework decides which interactions are cheap. Server components make optimistic updates expensive, so they quietly stop appearing in the designs.",
        zh: "框架决定了哪些交互是便宜的。Server Component 让乐观更新变贵，于是它就悄悄地不再出现在设计稿里了。",
      },
    },
  },

  uiux: {
    devops: {
      value: 0.5,
      note: {
        en: "Changing a spacing scale does not touch the pipeline.",
        zh: "改一套间距标度，碰不到流水线。",
      },
    },
    model: {
      value: 0.5,
      note: {
        en: "The interface cannot change what a model knows — though it can decide whether the user notices it was wrong.",
        zh: "界面改不了模型知道什么 —— 但它能决定用户会不会察觉模型错了。",
      },
    },
    platform: {
      value: 0.5,
      note: {
        en: "A mockup does not pick your database.",
        zh: "一张设计稿不会替你选数据库。",
      },
    },
    concept: {
      value: 0.5,
      note: {
        en: "Accessibility is the one idea that flows the other way: it constrains the interface far more than the interface constrains it.",
        zh: "Accessibility 是唯一反向流动的想法：它对界面的约束，远大于界面对它的约束。",
      },
    },
    app: {
      value: 2,
      note: {
        en: "A design system is a component API contract in disguise. Fix the variants and you have fixed the props.",
        zh: "设计系统本质上是一份组件 API 契约。定死了 variant，也就定死了 props。",
      },
    },
    uiux: self,
  },
};

export const effectivenessLabel: Record<Effectiveness, L10n> = {
  2: { en: "Strongly constrains", zh: "强约束" },
  1: { en: "Normal", zh: "一般" },
  0.5: { en: "Largely independent", zh: "基本独立" },
};

export function isSelf(row: UnitId, column: UnitId): boolean {
  return row === column;
}
