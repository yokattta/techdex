import type { L10n } from "./types";

/**
 * A battle is one scenario and three cards, where the wrong options are the
 * tempting ones — mostly drawn from the clash pairs in `entries.ts`. The
 * verdict on a wrong pick has to say *how it fails*, not just that it does,
 * because these are all choices that fail quietly.
 */
export type Battle = {
  id: string;
  scenario: L10n;
  /** Entry ids, shown in this order. */
  options: string[];
  /** The entry id that actually solves it. */
  answer: string;
  /** Keyed by entry id — one for every option, including the answer. */
  verdicts: Record<string, L10n>;
};

export const battles: Battle[] = [
  {
    id: "replayable-events",
    scenario: {
      en: "Your order service publishes events that three other services consume. A new fraud-detection service needs to process the last thirty days of orders before it can go live — and one of the existing consumers was down for an hour this morning and must catch up.",
      zh: "你的订单服务发布事件，有三个服务在消费。现在新上一个反欺诈服务，它需要先处理过去三十天的订单才能上线 —— 而且今天早上有一个已有的消费者宕了一小时，需要补上。",
    },
    options: ["kafka", "redis", "postgresql"],
    answer: "kafka",
    verdicts: {
      kafka: {
        en: "Right. The log is retained and each consumer group holds its own offset, so the new service rewinds thirty days while the recovered one resumes exactly where it stopped — neither affecting the other.",
        zh: "对。日志被保留下来，每个 consumer group 有自己的 offset，所以新服务可以往回拨三十天，而恢复的那个从它停下的位置继续 —— 互不影响。",
      },
      redis: {
        en: "This is the quiet failure. Pub/Sub delivers only to whoever is connected at that instant, so the hour of downtime is simply gone — no error, no dead-letter queue, no way to notice except a customer eventually asking where their order went.",
        zh: "这就是那个静默失败。Pub/Sub 只发给那一刻正连着的人，所以宕机那一小时的消息就是没了 —— 没有报错，没有死信队列，除了某个客户最后来问订单去哪了，你没有别的办法发现。",
      },
      postgresql: {
        en: "Workable but you are building a queue by hand: polling, locking, per-consumer cursors, cleanup. Every one of those is a Kafka feature you are about to reimplement slightly wrong.",
        zh: "能做，但你是在手搓一个队列：轮询、加锁、每个消费者的游标、清理。这里面每一样都是 Kafka 已有的功能，而你即将把它们各自实现得略有偏差。",
      },
    },
  },
  {
    id: "internal-docs",
    scenario: {
      en: "Support agents keep asking the assistant about your refund policy, which changed last month. The model answers confidently and cites the old rule. The policy document lives in Notion and is edited weekly.",
      zh: "客服一直在问助手你们的退款政策，而这个政策上个月改过。模型自信地回答，引用的却是旧规则。政策文档在 Notion 里，每周都会被编辑。",
    },
    options: ["rag", "fine-tuning", "embeddings"],
    answer: "rag",
    verdicts: {
      rag: {
        en: "Right, and the weekly edits are the deciding detail. Retrieval reads the current document at question time, so a policy change takes effect the moment the page is saved.",
        zh: "对，而且「每周都改」是决定性的细节。检索是在提问时读当前文档，所以政策一改、页面一存，就立刻生效了。",
      },
      "fine-tuning": {
        en: "The expensive wrong answer. You would teach the model the shape of your policies rather than their content — and it will keep confidently inventing rules in that shape. Worse, it is stale again the next time the document is edited.",
        zh: "昂贵的错误答案。你教给模型的是政策的形状，不是内容 —— 它会继续自信地按那个形状编规则。更糟的是，文档下次被编辑之后，它又过期了。",
      },
      embeddings: {
        en: "Half the answer. Embeddings are how the right chunk gets found, but on their own they retrieve and stop — something still has to put the chunk in front of the model and make it answer from that text.",
        zh: "只答了一半。Embeddings 是「怎么把正确的片段找出来」，但它自己检索完就停了 —— 还得有东西把片段摆到模型面前，并让它基于那段文本回答。",
      },
    },
  },
  {
    id: "double-charge",
    scenario: {
      en: "A payment call times out. The mobile client retries automatically. Support is now seeing customers charged twice, but the backend logs show one successful charge per request it received.",
      zh: "一次支付调用超时了。移动端自动重试。现在客服看到有客户被扣了两次款，但后端日志显示：它收到的每个请求都只成功扣款一次。",
    },
    options: ["idempotency", "eventual-consistency", "ci-cd"],
    answer: "idempotency",
    verdicts: {
      idempotency: {
        en: "Right. The client generates a key before its first attempt and reuses it on every retry, so the server recognises the second call as the same request and returns the original receipt instead of charging again.",
        zh: "对。客户端在第一次尝试之前就生成一个 key，并在每次重试中复用它，于是服务端认出第二次调用是同一个请求，返回原来的收据而不是再扣一次。",
      },
      "eventual-consistency": {
        en: "Wrong diagnosis. Nothing here is a replication lag problem — the two charges are both genuinely committed. Reading from a fresher replica would not have prevented either one.",
        zh: "诊断错了。这里没有任何东西是复制延迟问题 —— 两次扣款都是真真正正提交了的。从一个更新的副本上读，哪一次都拦不住。",
      },
      "ci-cd": {
        en: "A pipeline cannot catch this. The bug only appears when a real network times out mid-request, which is exactly the condition a test suite does not reproduce.",
        zh: "流水线抓不到这个。这个 bug 只在真实网络于请求中途超时时才出现，而这恰恰是测试套件不会复现的条件。",
      },
    },
  },
  {
    id: "stale-setting",
    scenario: {
      en: "A user changes their notification setting, the page reloads, and the old value is back. Trying again works. It reproduces maybe one time in five, and never on a developer machine.",
      zh: "用户改了通知设置，页面刷新，旧值又回来了。再试一次就好了。五次里大概复现一次，而且在开发机上从不复现。",
    },
    options: ["eventual-consistency", "redis", "idempotency"],
    answer: "eventual-consistency",
    verdicts: {
      "eventual-consistency": {
        en: "Right — the write went to the primary and the reload read a replica that had not caught up. Replication lag is milliseconds, which is exactly long enough for a redirect to lose the race, and zero on a single-node dev machine.",
        zh: "对 —— 写入去了主库，而刷新读的是还没追上的副本。复制延迟是毫秒级的，这个长度恰好够让一次跳转输掉竞争；而在单节点开发机上它是零。",
      },
      redis: {
        en: "Plausible, and worth checking — a stale cache produces identical symptoms. But it is the same underlying story: a read path with a weaker guarantee than the write path. Naming that is what lets you fix both cases.",
        zh: "有道理，也值得查 —— 缓存过期会产生完全一样的症状。但底下是同一个故事：某条读路径的保证弱于写路径。把这件事命名出来，才能把两种情况一起修好。",
      },
      idempotency: {
        en: "Different failure. Idempotency is about the same write happening twice; here the write happened once and correctly. The problem is entirely on the read side.",
        zh: "不是同一类失败。幂等针对的是同一次写入发生了两次；这里写入只发生了一次，而且是对的。问题完全在读的那一侧。",
      },
    },
  },
  {
    id: "who-owns-the-deployment",
    scenario: {
      en: "Your Terraform config declares the cluster and also the deployments running inside it. A teammate scales a deployment with kubectl during an incident. The next Terraform apply, three days later, silently scales it back down.",
      zh: "你的 Terraform 配置既声明了集群，也声明了跑在集群里的 deployment。事故期间，一个同事用 kubectl 扩了容。三天后的下一次 Terraform apply，静默地把它又缩回去了。",
    },
    options: ["kubernetes", "terraform", "docker"],
    answer: "kubernetes",
    verdicts: {
      kubernetes: {
        en: "Right — draw the line at the cluster boundary. Terraform builds the cluster; the cluster's own controllers manage what runs inside it. Two systems reconciling the same object will always take turns undoing each other.",
        zh: "对 —— 界线画在集群边界上。Terraform 负责把集群建出来；集群自己的 controller 管理里面跑什么。两个系统 reconcile 同一个对象，永远会轮流撤销对方。",
      },
      terraform: {
        en: "Doubling down. You can make Terraform own the deployments, but then every routine scaling event becomes a config change and a plan — and the incident response above becomes impossible to do quickly.",
        zh: "把错的方向再加倍。你确实可以让 Terraform 拥有这些 deployment，但那样每一次常规扩缩容都变成一次配置变更加一次 plan —— 上面那种事故响应就没法快速做了。",
      },
      docker: {
        en: "One layer too low. The image is not in dispute here; the question is which control loop is allowed to decide how many replicas of it exist.",
        zh: "低了一层。这里争的不是镜像；问题是哪个控制循环有权决定它跑几个副本。",
      },
    },
  },
  {
    id: "three-am-latency",
    scenario: {
      en: "Error rate is up 4% since a deploy two hours ago. The dashboard confirms it. Nothing on the dashboard tells you which of the eleven services, which endpoint, or which customers — and the deploy contained changes from four teams.",
      zh: "自两小时前的一次发布以来，错误率上升了 4%。仪表盘证实了这一点。但仪表盘上没有任何东西告诉你是十一个服务里的哪一个、哪个 endpoint、哪些客户 —— 而这次发布包含了四个团队的改动。",
    },
    options: ["observability", "ci-cd", "kubernetes"],
    answer: "observability",
    verdicts: {
      observability: {
        en: "Right, and the specific gap is cardinality. A dashboard answers questions written in advance; only per-request data tagged with service, endpoint, customer and build lets you ask the one question you did not anticipate.",
        zh: "对，而且缺的那一块具体来说是基数。仪表盘回答的是事先写好的问题；只有带上服务、endpoint、客户、构建版本标签的逐请求数据，才让你能问出那个你没预料到的问题。",
      },
      "ci-cd": {
        en: "It would have helped yesterday, not now. Smaller, single-team deploys shrink the search space — real prevention, useless once the bad change is already live and you need to find it.",
        zh: "它昨天能帮上忙，现在不行。更小的、单团队的发布能缩小搜索范围 —— 那是真正的预防，但坏改动已经上线、你需要找出它的时候，它没有用。",
      },
      kubernetes: {
        en: "A rollback undoes the symptom without telling you which of the four teams' changes caused it — so it ships again next week.",
        zh: "回滚能消掉症状，但不会告诉你是四个团队里哪个改动造成的 —— 于是它下周会再上线一次。",
      },
    },
  },
  {
    id: "keyboard-trap",
    scenario: {
      en: "A keyboard user reports they cannot dismiss your modal. It opens on click, looks correct, and closes fine with the mouse. Your automated accessibility checker reports zero violations on that page.",
      zh: "一个键盘用户反馈说他关不掉你的模态框。它点击能打开、看起来也正常、用鼠标关闭没问题。你的自动可访问性检查工具在那个页面上报告零违规。",
    },
    options: ["accessibility", "react", "design-system"],
    answer: "accessibility",
    verdicts: {
      accessibility: {
        en: "Right, and note which third of the problem this is. Automated tools catch contrast and missing labels; whether focus is trapped inside the dialog and returns afterwards needs a person with a keyboard. Unplug the mouse and try it.",
        zh: "对，而且注意这属于问题的哪三分之一。自动工具能查对比度和缺失的标签；焦点有没有被困在对话框里、关闭后有没有还回去，这些需要一个人拿着键盘去试。拔掉鼠标走一遍。",
      },
      react: {
        en: "It enabled the bug rather than caused it. Rendering a `div` where a `dialog` belonged is what removed the browser's built-in focus handling — but React was happy to render either one.",
        zh: "它是 bug 的成因条件，不是原因。该用 `dialog` 的地方渲染了 `div`，才把浏览器内建的焦点处理弄没了 —— 但 React 对这两种写法一视同仁。",
      },
      "design-system": {
        en: "The right place to put the fix, and the wrong place to look for the diagnosis. Once you know what focus management the dialog needs, centralising it means every team gets it — which is the argument for the system, not the answer to this bug.",
        zh: "这是放修复的正确位置，但不是找诊断的地方。一旦你知道这个对话框需要怎样的焦点管理，把它集中起来就意味着每个团队都能拿到 —— 那是设计系统的论据，不是这个 bug 的答案。",
      },
    },
  },
  {
    id: "async-that-isnt",
    scenario: {
      en: "You moved a FastAPI endpoint to `async def` expecting more throughput. Under load it is slower than before, and adding workers helps more than it should. The handler calls your database through a synchronous driver.",
      zh: "你把一个 FastAPI 接口改成了 `async def`，指望吞吐能上去。结果压力下比原来还慢，而且加 worker 带来的改善大得不太正常。这个 handler 通过一个同步驱动访问数据库。",
    },
    options: ["fastapi", "nginx", "kubernetes"],
    answer: "fastapi",
    verdicts: {
      fastapi: {
        en: "Right. One blocking call inside `async def` freezes the event loop for every concurrent request on that worker. A plain `def` handler would have been handed to a thread pool and done better — `async` without an async driver is strictly worse than not asking for it.",
        zh: "对。`async def` 里的一次阻塞调用，会把那个 worker 上所有并发请求的事件循环一起冻住。写成普通的 `def` 反而会被丢进线程池、表现更好 —— 没有异步驱动的 `async`，严格地比不写它更糟。",
      },
      nginx: {
        en: "It is already doing its job — absorbing slow clients so your workers are not held open. The stall is happening behind it, inside a single worker process.",
        zh: "它已经在干自己的活了 —— 吸收慢客户端，让你的 worker 不被占住。卡顿发生在它后面，在某一个 worker 进程内部。",
      },
      kubernetes: {
        en: "Autoscaling makes the symptom affordable and leaves the cause in place. You would be buying replicas to work around one function that blocks.",
        zh: "自动扩缩容让症状变得付得起，却把原因原封不动留在那里。你会为了绕开一个会阻塞的函数而不停买副本。",
      },
    },
  },
];

export function getBattle(id: string): Battle | undefined {
  return battles.find((battle) => battle.id === id);
}
