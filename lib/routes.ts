import { getEntry } from "./entries";
import type { Entry, L10n } from "./types";

/**
 * Curated paths through the dex. The ordered list is the cheap part — the value
 * is in `why`, which has to justify the *position*: what the previous step left
 * you with, and what problem this one answers. A step whose `why` just
 * re-describes the card is a playlist entry, not a route.
 */
export type RouteStep = {
  /** Entry id. */
  entry: string;
  why: L10n;
};

export type Route = {
  id: string;
  name: L10n;
  glyph: string;
  hue: string;
  /** What you can do at the end that you couldn't at the start. */
  outcome: L10n;
  /** Why the route is shaped this way. */
  intro: L10n;
  steps: RouteStep[];
};

export const routes: Route[] = [
  {
    id: "system-design",
    name: {
      en: "System design from zero",
      zh: "从零学 System Design",
    },
    glyph: "🏛️",
    hue: "212 92% 40%",
    outcome: {
      en: "You can sketch a system that survives its own traffic, and say out loud which guarantee you gave up to get there.",
      zh: "你能画出一个扛得住自己流量的系统，并且说得出为此放弃了哪个保证。",
    },
    intro: {
      en: "The order matters more than the list. Each step here creates the problem the next one solves, which is why reading these in a different order makes them feel like a pile of disconnected tricks.",
      zh: "顺序比清单重要。这里每一步都制造出下一步要解决的问题 —— 所以换个顺序读，它们就会像一堆互不相干的技巧。",
    },
    steps: [
      {
        entry: "load-balancing",
        why: {
          en: "Start here because it is the first thing you add when one machine stops being enough, and it forces the question everything downstream inherits: what happens when one of these is unhealthy?",
          zh: "从这里开始，因为一台机器不够用时你加的第一个东西就是它 —— 而它逼出了后面一切都要继承的那个问题：其中一台不健康时会怎样？",
        },
      },
      {
        entry: "caching",
        why: {
          en: "You have spread the work across machines; now stop doing it twice. This is also where you unknowingly introduce your first inconsistency, which several later steps are about repaying.",
          zh: "你已经把工作摊到多台机器上了，接下来是别把同一件事做两遍。这一步也是你在不知不觉中引入第一个不一致的地方 —— 后面好几步都是在还这笔债。",
        },
      },
      {
        entry: "postgresql",
        why: {
          en: "Every layer above is a way of avoiding this one. Understand what it actually guarantees before you learn how people give those guarantees up.",
          zh: "上面每一层都是在设法绕开这一层。先搞清楚它到底保证了什么，再去学别人是怎么放弃这些保证的。",
        },
      },
      {
        entry: "sharding",
        why: {
          en: "One database stopped being enough. This is the step that converts a capacity problem into a routing problem, and the key choice inside it is close to irreversible.",
          zh: "一个数据库不够用了。这一步把容量问题变成路由问题，而其中最关键的那个选择基本不可逆。",
        },
      },
      {
        entry: "cap-theorem",
        why: {
          en: "Now that your data lives on more than one machine, the theorem stops being a reading assignment. You are already making this trade — this step is about naming which side you picked.",
          zh: "数据一旦跨多台机器，这个定理就不再是读物了。你其实已经在做这个取舍了；这一步是给你选的那一边命名。",
        },
      },
      {
        entry: "eventual-consistency",
        why: {
          en: "The side most systems pick. Learn the sub-guarantees, because 'eventually consistent' on its own rules out none of the bugs a user would actually notice.",
          zh: "多数系统选的那一边。要学的是它的各个子保证 —— 光说「最终一致」，一个用户真会注意到的 bug 都排除不掉。",
        },
      },
      {
        entry: "kafka",
        why: {
          en: "The first thing here that is not a database. Decoupling services through a log buys you replay and independent consumers, and it hands you at-least-once delivery — which is precisely the problem the next step exists to solve.",
          zh: "这条路线上第一个不是数据库的东西。用一份日志把服务解耦，换来重放和互不干扰的消费者，同时也塞给你 at-least-once 投递 —— 而那恰好就是下一步存在的理由。",
        },
      },
      {
        entry: "idempotency",
        why: {
          en: "At-least-once delivery and network retries both mean the same request arrives twice. This is the property that makes that survivable rather than a double charge.",
          zh: "At-least-once 投递和网络重试，都意味着同一个请求会到两次。这条性质让那件事变得可以承受，而不是变成一次重复扣款。",
        },
      },
      {
        entry: "rate-limiting",
        why: {
          en: "You can serve a lot now. This is how you decide who doesn't get to — while that decision is still yours, rather than being made for you by a crash.",
          zh: "现在你能扛很多了。这一步是决定谁不能进 —— 趁着这个决定还在你手里，而不是被一次崩溃替你做掉。",
        },
      },
      {
        entry: "backpressure",
        why: {
          en: "The other answer to more work than you can do: keep it, and slow the source down. Knowing when to reject and when to slow is the actual skill; the algorithms are the easy half.",
          zh: "对付「活比你能做的多」的另一个答案：留住它，让源头慢下来。真正的本事是知道什么时候拒绝、什么时候减速；算法反而是简单的那一半。",
        },
      },
      {
        entry: "observability",
        why: {
          en: "Last, because everything above will fail in a way you did not predict, and this is the only step that helps you once it has.",
          zh: "放在最后，因为上面所有东西都会以你没预料到的方式失败 —— 而只有这一步，在失败之后还帮得上忙。",
        },
      },
    ],
  },

  {
    id: "ai-engineer",
    name: {
      en: "AI engineer",
      zh: "AI 工程师",
    },
    glyph: "🔮",
    hue: "330 70% 46%",
    outcome: {
      en: "You can build something on top of a model and explain why it fails, which turns out to be most of the job.",
      zh: "你能在模型之上做出东西，并且解释得清它为什么会失败 —— 而这就是这份工作的大部分。",
    },
    intro: {
      en: "Almost every step here fixes a specific failure the previous step created. Skipping to the end is how you get a demo that impresses and a product that does not survive contact with real questions.",
      zh: "这里几乎每一步都在修上一步造出来的某个具体失败。直接跳到最后，你会得到一个很唬人的 demo，和一个撑不过真实问题的产品。",
    },
    steps: [
      {
        entry: "transformer",
        why: {
          en: "Start with the shape of the thing. Two facts from here explain most of the cost and latency surprises later: attention grows with the square of length, and output tokens are far more expensive than input ones.",
          zh: "先搞清楚这东西的形状。这里的两个事实能解释后面大部分成本和延迟上的意外：attention 随长度平方增长，而输出 token 比输入 token 贵得多。",
        },
      },
      {
        entry: "embeddings",
        why: {
          en: "The bridge from text to something searchable. Note which notion of similarity your model was trained for — retrieval quality is decided here, long before you write a prompt.",
          zh: "从文本通向「可检索」的那座桥。注意你的模型是为哪一种「相似」训练的 —— 检索质量在这里就决定了，远早于你开始写 prompt。",
        },
      },
      {
        entry: "vector-database",
        why: {
          en: "Where those vectors live at scale, and where the word 'approximate' enters your system. Recall is a setting, and it silently caps everything downstream of it.",
          zh: "这些向量在规模上住的地方，也是「近似」这个词进入你系统的地方。Recall 是一个设置项，而它无声地给下游一切设了上限。",
        },
      },
      {
        entry: "rag",
        why: {
          en: "The previous two assembled into an answer. Debug it as two systems, because a retrieval failure and a generation failure look identical from the outside.",
          zh: "把前两步组装成一个答案。要当两个系统来排查 —— 检索失败和生成失败，从外面看长得一模一样。",
        },
      },
      {
        entry: "prompt-engineering",
        why: {
          en: "The cheapest knob, and the one to exhaust before touching anything expensive. Also the one that overfits fastest to the three examples you keep rereading.",
          zh: "最便宜的旋钮，也是在动任何昂贵东西之前该榨干的那个。同时它也是最快对「你反复看的那三个例子」过拟合的那个。",
        },
      },
      {
        entry: "hallucination",
        why: {
          en: "Now you have a system that answers. This step is about why it will confidently answer wrong, and why writing 'be accurate' into the prompt does nothing at all.",
          zh: "现在你有一个会回答的系统了。这一步讲的是它为什么会自信地答错，以及为什么在 prompt 里写「请准确」毫无作用。",
        },
      },
      {
        entry: "guardrails",
        why: {
          en: "The deterministic layer you wrap around all of the above, because there is no way to assert anything about how the answer was produced.",
          zh: "你包在上面这一切之外的那层确定性 —— 因为对「答案是怎么产生的」，你没法做任何断言。",
        },
      },
      {
        entry: "model-eval",
        why: {
          en: "The step that turns opinions into a number. Without it, every change above is judged by whoever last looked at three outputs, at exactly the moment they are least objective.",
          zh: "把意见变成数字的那一步。没有它，上面每一次改动都由「最后看了三条输出的那个人」来裁决 —— 而那恰好是他最不客观的时刻。",
        },
      },
      {
        entry: "agents",
        why: {
          en: "Second to last, because it multiplies every failure mode above by the number of steps in the loop. Reach for it only when one retrieval genuinely was not enough.",
          zh: "倒数第二，因为它把上面每一种失败模式都乘以循环的步数。只有在一次检索确实不够的时候，才伸手去拿它。",
        },
      },
      {
        entry: "fine-tuning",
        why: {
          en: "Deliberately last, and most people never arrive. Everything before it is cheaper, reversible and testable in an afternoon. Come here only once an eval exists and it says the remaining gap is behaviour rather than knowledge — because fine-tuning fixes the first and not the second.",
          zh: "刻意放在最后，而且大多数人根本走不到这里。它之前的每一步都更便宜、可逆、一个下午就能测。只有在评测集已经存在、并且它告诉你剩下的差距是行为而不是知识时，才来这一步 —— 因为 fine-tuning 修的是前者，不是后者。",
        },
      },
    ],
  },

  {
    id: "ship-it",
    name: {
      en: "Ship it and keep it up",
      zh: "发出去，并且让它活着",
    },
    glyph: "🚀",
    hue: "14 88% 44%",
    outcome: {
      en: "You can take something that works on your laptop and keep it working somewhere else, without being the person who has to stay awake for it.",
      zh: "你能把在自己笔记本上跑得通的东西搬到别处继续跑通 —— 而且不必是那个必须一直醒着的人。",
    },
    intro: {
      en: "Deliberately short. Most of the pain in this area comes from adopting the last two steps before you needed the first three.",
      zh: "刻意做短。这个领域里大部分痛苦，来自在还不需要前三步的时候就上了最后两步。",
    },
    steps: [
      {
        entry: "docker",
        why: {
          en: "The artifact that carries its own environment. Everything downstream quietly assumes this already exists.",
          zh: "一个自带环境的产物。下游的一切都默默假设它已经存在。",
        },
      },
      {
        entry: "ci-cd",
        why: {
          en: "Before orchestration, not after. A fast honest pipeline prevents more incidents than a clever deployment strategy does, and it costs a fraction as much to run.",
          zh: "在编排之前，不是之后。一条又快又诚实的流水线，比一套聪明的部署策略能拦下更多事故，而运行成本只是零头。",
        },
      },
      {
        entry: "nginx",
        why: {
          en: "One process in front of many. This is the cheapest way to get routing, TLS and rate limiting at once — and for a surprising number of systems it is the whole answer.",
          zh: "一堆服务前面的一个进程。这是同时拿到路由、TLS 和限流的最便宜方式 —— 而且对相当多的系统来说，它就是全部答案。",
        },
      },
      {
        entry: "terraform",
        why: {
          en: "Write down what exists, so the next person can find out why. Before this step your infrastructure is an oral tradition with one surviving speaker.",
          zh: "把存在的东西写下来，好让下一个人查得到它为什么存在。在这一步之前，你的基础设施是一门只剩一个人会说的口头传统。",
        },
      },
      {
        entry: "kubernetes",
        why: {
          en: "Only here, and only if the work it automates is work you were already doing by hand. Below that scale it is a distributed system adopted to run a program that fits on one box.",
          zh: "到这里才上，而且只有当它自动化的那些活，本来就是你在手动做的时候。在那个规模以下，它只是为了跑一个单机装得下的程序而引进的一整套分布式系统。",
        },
      },
      {
        entry: "observability",
        why: {
          en: "The step that makes all of the above debuggable. Add it before you need it, because an outage cannot be instrumented retroactively.",
          zh: "让上面这一切变得可排查的那一步。在需要它之前就加上 —— 事故没法事后补埋点。",
        },
      },
    ],
  },

  {
    id: "python-backend",
    name: {
      en: "A Python backend that holds up",
      zh: "撑得住的 Python 后端",
    },
    glyph: "🐍",
    hue: "36 96% 34%",
    outcome: {
      en: "You can build an API whose contract is enforced rather than merely described, and tell which of its calls are lying about being async.",
      zh: "你能做出一个接口契约是被强制、而不只是被描述的 API，并且看得出它哪些调用在假装自己是异步的。",
    },
    intro: {
      en: "Framework first, then the thing that makes it trustworthy, then the store. Reversing the last two is how projects end up with clever application code compensating for a database nobody understood.",
      zh: "先框架，再是让它可信的那个东西，最后是存储。把后两步颠倒过来，项目就会变成：用聪明的应用代码，去补一个没人真正理解的数据库。",
    },
    steps: [
      {
        entry: "flask",
        why: {
          en: "Start small enough to read in an afternoon. What you take from here is the request/response shape, and the request context that will confuse you exactly once.",
          zh: "从小到一个下午能读完的开始。你从这里带走的是请求/响应的形状，以及那个恰好会让你困惑一次的 request context。",
        },
      },
      {
        entry: "pydantic",
        why: {
          en: "Before the framework that depends on it, so you know which half of the magic is which. This is where your type hints stop being comments.",
          zh: "先于那个依赖它的框架，这样你才分得清魔法是哪一半变的。就是在这里，你的类型标注不再是注释。",
        },
      },
      {
        entry: "fastapi",
        why: {
          en: "The previous two combined, plus async. The async part is where the performance claims are won — or quietly lost to one synchronous driver.",
          zh: "前两步的组合，再加上异步。异步这部分正是性能承诺被赢下的地方 —— 或者被一个同步驱动悄悄输掉的地方。",
        },
      },
      {
        entry: "postgresql",
        why: {
          en: "The store to reach for first and stay with longest. Learn MVCC here; it explains most of what will otherwise surprise you in production.",
          zh: "最该先拿起、也最久不放的那个存储。在这里学 MVCC —— 它能解释生产环境里大部分本来会让你意外的事。",
        },
      },
      {
        entry: "redis",
        why: {
          en: "Added when the database is repeating work it shouldn't have to. Note carefully what it does not promise about durability before you put anything irreplaceable in it.",
          zh: "当数据库在重复做不该重复的工作时才加它。在把任何无法重建的东西放进去之前，仔细看清它对持久性并没有承诺什么。",
        },
      },
      {
        entry: "idempotency",
        why: {
          en: "The property your endpoints need before the first client retries — which is earlier than you think, because the first retry is usually a mobile network, not a bug.",
          zh: "在第一个客户端重试之前，你的接口就该具备的性质 —— 而那比你以为的早，因为第一次重试通常来自移动网络，不是来自 bug。",
        },
      },
    ],
  },

  {
    id: "durable-frontend",
    name: {
      en: "A frontend that lasts",
      zh: "撑得久的前端",
    },
    glyph: "🎨",
    hue: "330 74% 44%",
    outcome: {
      en: "You can build an interface a second team can extend without forking it, and that works with the mouse unplugged.",
      zh: "你能做出一个第二个团队不用 fork 就能扩展的界面 —— 而且拔掉鼠标它照样能用。",
    },
    intro: {
      en: "Accessibility sits in the middle rather than at the end on purpose. Retrofitting it costs several times what building it in does, and the position of a step is an argument about when it is cheap.",
      zh: "可访问性被刻意放在中间而不是最后。事后补救的成本是内建的好几倍 —— 而一个步骤的位置，本身就是在论证它什么时候最便宜。",
    },
    steps: [
      {
        entry: "react",
        why: {
          en: "The mental shift first: describe the screen for a given state, do not manipulate the screen. Most React bugs are someone still doing the second thing.",
          zh: "先完成思维转变：为给定的 state 描述屏幕，而不是去操作屏幕。大多数 React 的 bug，是有人还在做后者。",
        },
      },
      {
        entry: "nextjs",
        why: {
          en: "Where the server gets to render too. The client/server boundary is genuinely new and it is the thing you will get wrong first.",
          zh: "服务端也来渲染的地方。客户端/服务端这条边界是真的新，也是你会第一个搞错的东西。",
        },
      },
      {
        entry: "design-tokens",
        why: {
          en: "Before components, because naming decisions by role is exactly what makes those components themeable later. Do it after and you are renaming everything you were trying to protect.",
          zh: "先于组件，因为「按角色命名决策」正是让这些组件之后能换肤的原因。反过来做，你就得去重命名当初想保护的那一切。",
        },
      },
      {
        entry: "design-system",
        why: {
          en: "Components plus the governance around them. The hard part was never the button, and adoption is the only metric that means anything.",
          zh: "组件，加上围绕它们的治理。难的从来不是那个按钮，而采纳率是唯一有意义的指标。",
        },
      },
      {
        entry: "accessibility",
        why: {
          en: "Here rather than last, because at this point you own the components and can fix it in one place. A year later it is a hundred places.",
          zh: "放在这里而不是最后，因为此刻组件还在你手上，一处就能改完。一年之后，那是一百处。",
        },
      },
      {
        entry: "figma",
        why: {
          en: "Where the argument happens. Knowing what a mockup does not specify — empty, loading, errored, at 200% text zoom — is what stops you discovering it during review.",
          zh: "争论发生的地方。知道一张稿子没有规定什么 —— 空状态、加载中、报错、文字放大到 200% —— 才不会等到评审时才发现。",
        },
      },
    ],
  },
];

export function getRoute(id: string): Route | undefined {
  return routes.find((route) => route.id === id);
}

/** Steps with their entries resolved; unknown ids are dropped rather than thrown. */
export function routeEntries(route: Route): { entry: Entry; why: L10n }[] {
  return route.steps.flatMap((step) => {
    const entry = getEntry(step.entry);
    return entry ? [{ entry, why: step.why }] : [];
  });
}

/** Routes that include a given entry, for cross-linking from a card. */
export function routesContaining(entryId: string): Route[] {
  return routes.filter((route) =>
    route.steps.some((step) => step.entry === entryId),
  );
}
