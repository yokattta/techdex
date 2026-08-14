import type { Entry } from "./types";

/**
 * The dex. Adding an entry is just appending an object here — `dex` numbers are
 * the display order and must stay unique.
 *
 * Translation rule: `name` and `moves[].name` are never translated. A Chinese
 * reader looking for "Kafka" should find the string "Kafka".
 */
export const entries: Entry[] = [
  // ── DevOps ────────────────────────────────────────────────────────────────
  {
    id: "docker",
    dex: 1,
    units: ["devops"],
    name: "Docker",
    glyph: "🐳",
    tagline: {
      en: "Puts your app and its whole world in one box.",
      zh: "把你的应用和它的整个世界装进一个盒子。",
    },
    description: {
      en: "A container image is a frozen filesystem plus a command to run. Because the image carries its own libraries, the machine underneath stops mattering — the same artifact you built locally is the one that runs in production. That single property is what killed 'works on my machine'.",
      zh: "一个 container image 就是一份冻结的文件系统，加上一条启动命令。因为镜像自带依赖库，底下那台机器长什么样就不重要了 —— 你本地构建出来的那个产物，就是生产环境跑的那个。就是这一条性质终结了「在我机器上是好的」。",
    },
    stats: { difficulty: 35, ubiquity: 95, impact: 90, ops: 30 },
    moves: [
      {
        name: "Layer cache",
        effect: {
          en: "Reuses unchanged build steps, so a one-line code change rebuilds in seconds.",
          zh: "复用没变过的构建步骤，改一行代码只要几秒就能重新构建完。",
        },
      },
      {
        name: "Multi-stage build",
        effect: {
          en: "Compiles in a fat image, then copies only the binary into a tiny one.",
          zh: "在臃肿的镜像里编译，然后只把产物拷进一个很小的镜像。",
        },
      },
      {
        name: "Bind mount",
        effect: {
          en: "Maps a host directory into the container for live-reload development.",
          zh: "把宿主机目录映射进容器，用于开发时的热重载。",
        },
      },
    ],
    links: [{ label: "docs.docker.com", url: "https://docs.docker.com/" }],
  },
  {
    id: "kubernetes",
    dex: 2,
    units: ["devops", "platform"],
    name: "Kubernetes",
    glyph: "☸️",
    tagline: {
      en: "Evolves from Docker. Now you have a thousand of them.",
      zh: "从 Docker 进化而来。现在你有一千个了。",
    },
    description: {
      en: "You describe the desired state — ten replicas, this image, that much memory — and a control loop spends forever making reality match. Nothing is imperative: you never say 'start a container', you say what should be true and the reconciler figures out the diff. Powerful, and the reason the learning curve is a wall.",
      zh: "你描述期望状态 —— 十个副本、这个镜像、这么多内存 —— 然后一个控制循环永远在让现实向它靠拢。这里没有命令式的东西：你从不说「启动一个容器」，你说什么应该成立，由 reconciler 算出差异。很强大，也正是学习曲线陡成一堵墙的原因。",
    },
    stats: { difficulty: 88, ubiquity: 78, impact: 92, ops: 85 },
    moves: [
      {
        name: "Reconciliation loop",
        effect: {
          en: "Continuously drags actual state toward declared state, forever.",
          zh: "持续不断地把实际状态往声明的状态上拽，永不停止。",
        },
      },
      {
        name: "Rolling update",
        effect: {
          en: "Replaces pods a few at a time so the service never fully drops.",
          zh: "一次替换几个 pod，让服务始终不会整体中断。",
        },
      },
      {
        name: "Horizontal Pod Autoscaler",
        effect: {
          en: "Adds replicas when a metric crosses a threshold, removes them after.",
          zh: "指标越过阈值时加副本，之后再减掉。",
        },
      },
    ],
    evolvesFrom: "docker",
    links: [{ label: "kubernetes.io", url: "https://kubernetes.io/docs/home/" }],
  },
  {
    id: "terraform",
    dex: 3,
    units: ["devops"],
    name: "Terraform",
    glyph: "🗺️",
    tagline: {
      en: "Your cloud account, written down and version-controlled.",
      zh: "把你的云账号写下来，然后纳入版本管理。",
    },
    description: {
      en: "Infrastructure as code: the buckets, databases and networks live in files, and a state file remembers what was already created. `plan` shows you the diff before anything happens — which is the whole point, because clicking around a cloud console leaves no record of why anything exists.",
      zh: "Infrastructure as code：存储桶、数据库、网络都写在文件里，一份 state 文件记住已经创建过什么。`plan` 会在任何变更发生前把差异摆给你看 —— 这才是重点，因为在云控制台里点来点去，不会留下任何关于「这东西为什么存在」的记录。",
    },
    stats: { difficulty: 55, ubiquity: 70, impact: 75, ops: 45 },
    moves: [
      {
        name: "terraform plan",
        effect: {
          en: "Dry-runs the change set so surprises happen before production does.",
          zh: "对变更集做一次演练，让意外发生在生产环境之前。",
        },
      },
      {
        name: "State drift detection",
        effect: {
          en: "Notices when someone changed things by hand in the console.",
          zh: "发现有人直接在控制台里手动改过东西。",
        },
      },
      {
        name: "Module",
        effect: {
          en: "Packages a reusable stack so every environment is built the same way.",
          zh: "把一套可复用的基础设施打包，让每个环境都用同一种方式搭起来。",
        },
      },
    ],
  },
  {
    id: "ci-cd",
    dex: 4,
    units: ["devops", "concept"],
    name: "CI / CD",
    glyph: "🔁",
    tagline: {
      en: "A robot that refuses to let broken code merge.",
      zh: "一个死活不让坏代码合进去的机器人。",
    },
    description: {
      en: "Continuous integration runs your tests on every push; continuous delivery takes what passed and puts it somewhere real. The value is not automation for its own sake — it is that the feedback arrives in minutes instead of at the end of a release cycle, when the change is still fresh in your head.",
      zh: "Continuous integration 在每次 push 时跑测试；continuous delivery 把通过的产物真正部署出去。它的价值不在于「自动化」本身 —— 而在于反馈几分钟就到，而不是等到发布周期结束，那时候你脑子里还记得这次改了什么。",
    },
    stats: { difficulty: 40, ubiquity: 90, impact: 82, ops: 35 },
    moves: [
      {
        name: "Pipeline",
        effect: {
          en: "Chains lint, test and build so a failure stops everything downstream.",
          zh: "把 lint、测试、构建串起来，一步失败就挡住后面所有步骤。",
        },
      },
      {
        name: "Matrix build",
        effect: {
          en: "Runs the same suite across several versions or platforms at once.",
          zh: "同时在多个版本或平台上跑同一套测试。",
        },
      },
      {
        name: "Artifact",
        effect: {
          en: "Keeps the exact build output so deploy and test share one binary.",
          zh: "保留确切的构建产物，让部署和测试共用同一个二进制。",
        },
      },
    ],
  },

  // ── Platform ──────────────────────────────────────────────────────────────
  {
    id: "kafka",
    dex: 5,
    units: ["platform"],
    name: "Apache Kafka",
    glyph: "📮",
    tagline: {
      en: "An append-only log that many readers walk at their own pace.",
      zh: "一份只能追加的日志，很多读者按各自的节奏在上面走。",
    },
    description: {
      en: "Not a queue in the usual sense: messages are not deleted when read. Each consumer group keeps its own offset — a bookmark — into a partition, so a slow analytics job and a real-time service can read the same stream without interfering. Replay is therefore free, which is why Kafka ends up being the system of record.",
      zh: "它不是通常意义上的队列：消息被读走后并不会删除。每个 consumer group 在 partition 上维护自己的 offset（一个书签），所以一个慢吞吞的分析任务和一个实时服务可以读同一条流而互不干扰。因此重放是免费的 —— 这也是 Kafka 最后往往成为「事实来源」的原因。",
    },
    stats: { difficulty: 72, ubiquity: 74, impact: 88, ops: 78 },
    moves: [
      {
        name: "Partition",
        effect: {
          en: "Splits a topic so throughput scales, at the cost of only per-key ordering.",
          zh: "把 topic 切开以扩展吞吐，代价是只保证同一 key 内部有序。",
        },
      },
      {
        name: "Consumer offset",
        effect: {
          en: "Each group's own bookmark, so replaying history is just rewinding it.",
          zh: "每个 group 自己的书签，所以重放历史只是把它往回拨。",
        },
      },
      {
        name: "Log compaction",
        effect: {
          en: "Keeps only the newest value per key, turning the log into a snapshot.",
          zh: "每个 key 只保留最新值，把日志变成一份快照。",
        },
      },
    ],
    links: [{ label: "kafka.apache.org", url: "https://kafka.apache.org/documentation/" }],
  },
  {
    id: "postgresql",
    dex: 6,
    units: ["platform"],
    name: "PostgreSQL",
    glyph: "🐘",
    tagline: {
      en: "The boring correct answer to most data questions.",
      zh: "大多数数据问题里那个无聊但正确的答案。",
    },
    description: {
      en: "A relational database that has quietly absorbed JSON documents, full-text search, geospatial queries and time-series extensions. The reason to reach for it first is transactional integrity: either the whole change lands or none of it does, and no amount of clever application code buys you that after the fact.",
      zh: "一个关系型数据库，悄悄地把 JSON 文档、全文检索、地理空间查询和时序扩展都吃了进来。优先选它的理由是事务完整性：一次变更要么整体生效，要么完全不生效 —— 这一点，事后再写多聪明的应用代码都补不回来。",
    },
    stats: { difficulty: 45, ubiquity: 92, impact: 90, ops: 50 },
    moves: [
      {
        name: "ACID transaction",
        effect: {
          en: "All-or-nothing writes, even when the process dies halfway through.",
          zh: "全有或全无的写入，即使进程在中途挂掉也一样。",
        },
      },
      {
        name: "EXPLAIN ANALYZE",
        effect: {
          en: "Shows the real query plan and timing instead of your guess about it.",
          zh: "给出真实的查询计划和耗时，而不是你对它的猜测。",
        },
      },
      {
        name: "JSONB column",
        effect: {
          en: "Stores schemaless documents that are still indexable and queryable.",
          zh: "存无 schema 的文档，同时仍然可索引、可查询。",
        },
      },
    ],
  },
  {
    id: "redis",
    dex: 7,
    units: ["platform"],
    name: "Redis",
    glyph: "⚡",
    tagline: {
      en: "Data structures that live in RAM and answer instantly.",
      zh: "住在内存里、秒答的数据结构。",
    },
    description: {
      en: "Think of it as a shared dictionary your whole fleet can reach in under a millisecond, with lists, sets, sorted sets and counters built in. The tradeoff is honest and worth saying out loud: it is memory-bound, and anything you have not deliberately persisted is gone when the process restarts.",
      zh: "把它想成一本共享字典，整个集群都能在一毫秒内访问，还内置了 list、set、sorted set 和计数器。它的取舍很坦白，值得说明白：它受内存容量限制，而且任何你没有刻意持久化的东西，进程重启后就没了。",
    },
    stats: { difficulty: 30, ubiquity: 85, impact: 72, ops: 40 },
    moves: [
      {
        name: "TTL expiry",
        effect: {
          en: "Keys delete themselves, which is most of what a cache actually needs.",
          zh: "key 会自己删掉自己，而这基本就是缓存真正需要的全部功能。",
        },
      },
      {
        name: "Sorted set",
        effect: {
          en: "Keeps a live leaderboard or rate-limit window without a scan.",
          zh: "无需扫描就能维护实时排行榜或限流窗口。",
        },
      },
      {
        name: "Pub/Sub",
        effect: {
          en: "Fan-out messaging for listeners connected right now — no replay.",
          zh: "面向当前在线订阅者的广播 —— 没有重放。",
        },
      },
    ],
  },
  {
    id: "nginx",
    dex: 8,
    units: ["platform", "devops"],
    name: "Nginx",
    glyph: "🚦",
    tagline: {
      en: "The doorman standing in front of everything else.",
      zh: "站在所有东西前面的那个门卫。",
    },
    description: {
      en: "A reverse proxy terminates TLS, spreads requests across backends, serves static files and shields slow application servers from slow clients. It is unglamorous and it is everywhere, because putting one process in front of many is the cheapest way to add routing, caching and rate limiting at once.",
      zh: "反向代理负责终止 TLS、把请求分发到多个后端、直接吐静态文件，并且把慢客户端挡在慢应用服务器之外。它一点也不炫，但到处都是 —— 因为在一堆服务前面放一个进程，是同时获得路由、缓存和限流的最便宜方式。",
    },
    stats: { difficulty: 38, ubiquity: 88, impact: 70, ops: 32 },
    moves: [
      {
        name: "Reverse proxy",
        effect: {
          en: "Hides many backends behind one hostname and one certificate.",
          zh: "把多个后端藏在一个域名和一张证书后面。",
        },
      },
      {
        name: "TLS termination",
        effect: {
          en: "Handles encryption once at the edge so app servers speak plain HTTP.",
          zh: "在边缘统一处理加密，应用服务器只讲普通 HTTP。",
        },
      },
      {
        name: "Upstream health check",
        effect: {
          en: "Stops routing to a backend that stopped answering.",
          zh: "不再把流量路由到已经不响应的后端。",
        },
      },
    ],
  },

  // ── Concept ───────────────────────────────────────────────────────────────
  {
    id: "observability",
    dex: 9,
    units: ["concept", "devops"],
    name: "Observability",
    glyph: "🔭",
    tagline: {
      en: "Can you answer a question you didn't plan for?",
      zh: "对于一个你没预料到的问题，你答得上来吗？",
    },
    description: {
      en: "Monitoring answers questions you wrote down in advance; observability is whether the system emits enough detail to answer new ones. The practical difference shows up at 3am: a dashboard tells you error rate is up, but only high-cardinality data — this user, this endpoint, this deploy — tells you which change caused it.",
      zh: "Monitoring 回答的是你事先写好的问题；observability 说的是系统吐出的细节够不够回答新问题。区别在凌晨三点最明显：仪表盘告诉你错误率上升了，但只有高基数的数据 —— 这个用户、这个 endpoint、这次发布 —— 才能告诉你是哪次变更导致的。",
    },
    stats: { difficulty: 60, ubiquity: 68, impact: 86, ops: 55 },
    moves: [
      {
        name: "Distributed trace",
        effect: {
          en: "Follows one request across every service it touched, with timings.",
          zh: "跟着一个请求穿过它经过的每个服务，并带上各段耗时。",
        },
      },
      {
        name: "Structured log",
        effect: {
          en: "Logs as key-value events, so you can query them instead of grepping.",
          zh: "把日志写成键值事件，于是你可以查询它们，而不是 grep。",
        },
      },
      {
        name: "SLO burn rate",
        effect: {
          en: "Alerts on how fast you're spending your error budget, not on raw spikes.",
          zh: "按错误预算的消耗速度告警，而不是对着毛刺告警。",
        },
      },
    ],
    links: [{ label: "opentelemetry.io", url: "https://opentelemetry.io/docs/" }],
  },
  {
    id: "cap-theorem",
    dex: 10,
    units: ["concept"],
    name: "CAP Theorem",
    glyph: "⚖️",
    tagline: {
      en: "When the network splits, pick: correct, or available.",
      zh: "网络分区时，二选一：正确，还是可用。",
    },
    description: {
      en: "Consistency, availability, partition tolerance — pick two, except partitions are not optional in a real network, so the real choice is only between the other two. It is less a design menu than a warning: any distributed system claiming all three is quietly making the tradeoff somewhere you haven't looked.",
      zh: "Consistency、availability、partition tolerance，三选二 —— 但在真实网络里 partition 不是可选项，所以真正的选择只在另外两个之间。它与其说是一份设计菜单，不如说是一句警告：任何号称三者兼得的分布式系统，都只是把取舍藏在了你没看的地方。",
    },
    stats: { difficulty: 55, ubiquity: 62, impact: 80, ops: 10 },
    moves: [
      {
        name: "Partition tolerance",
        effect: {
          en: "The assumption you don't get to opt out of once there's a network.",
          zh: "只要有网络，这个假设你就没法退出。",
        },
      },
      {
        name: "Quorum",
        effect: {
          en: "Requires a majority to agree, trading latency for a consistent answer.",
          zh: "要求多数派达成一致，用延迟换一个一致的答案。",
        },
      },
    ],
  },
  {
    id: "eventual-consistency",
    dex: 11,
    units: ["concept"],
    name: "Eventual Consistency",
    glyph: "⏳",
    tagline: {
      en: "Everyone agrees, just not yet.",
      zh: "大家最终会一致，只是还没到时候。",
    },
    description: {
      en: "If writes stop, all replicas converge on the same value — eventually. Chosen deliberately, it buys enormous availability: your post appears immediately for you and a moment later for everyone else. Chosen by accident, it produces the bug where a user updates a setting, reloads, and sees the old one.",
      zh: "如果写入停止，所有副本最终会收敛到同一个值 —— 最终。有意识地选它，能换来巨大的可用性：你发的帖子对你立刻可见，对别人稍后可见。无意识地撞上它，就会出现那个 bug：用户改了设置、刷新、看到的还是旧值。",
    },
    stats: { difficulty: 65, ubiquity: 70, impact: 78, ops: 20 },
    moves: [
      {
        name: "Read-your-writes",
        effect: {
          en: "Pins one user to a replica so their own change is never missing.",
          zh: "把一个用户固定到某个副本上，保证他至少看得见自己的改动。",
        },
      },
      {
        name: "Conflict resolution",
        effect: {
          en: "Decides which concurrent write wins — last-write-wins, or a merge.",
          zh: "决定并发写入里谁赢 —— last-write-wins，或者做合并。",
        },
      },
    ],
    evolvesFrom: "cap-theorem",
  },
  {
    id: "idempotency",
    dex: 12,
    units: ["concept"],
    name: "Idempotency",
    glyph: "🔂",
    tagline: {
      en: "Doing it twice is the same as doing it once.",
      zh: "做两次和做一次结果一样。",
    },
    description: {
      en: "Networks retry. A payment request that times out may or may not have succeeded, and the client has no way to tell. An idempotency key makes the retry safe: the server recognises it has already processed that exact request and returns the original result instead of charging the card again.",
      zh: "网络会重试。一个超时的支付请求可能成功了也可能没有，客户端无从判断。Idempotency key 让重试变得安全：服务端认出自己已经处理过这个请求，于是返回原来的结果，而不是再扣一次款。",
    },
    stats: { difficulty: 42, ubiquity: 66, impact: 84, ops: 15 },
    moves: [
      {
        name: "Idempotency key",
        effect: {
          en: "A client-generated id the server dedupes on for a fixed window.",
          zh: "客户端生成的 id，服务端在固定时间窗口内据此去重。",
        },
      },
      {
        name: "At-least-once delivery",
        effect: {
          en: "The guarantee most queues give, which is why you need this at all.",
          zh: "多数队列给的保证 —— 也正是你需要幂等的根本原因。",
        },
      },
    ],
  },

  // ── Model ─────────────────────────────────────────────────────────────────
  {
    id: "transformer",
    dex: 13,
    units: ["model"],
    name: "Transformer",
    glyph: "🔮",
    tagline: {
      en: "Every token gets to look at every other token.",
      zh: "每个 token 都能看到其他所有 token。",
    },
    description: {
      en: "Attention lets each position weigh all the others directly, instead of passing information down a chain the way a recurrent network does. Two consequences follow: long-range relationships survive, and the whole sequence can be processed in parallel — which is what made training on internet-scale text affordable.",
      zh: "Attention 让每个位置直接对其他所有位置加权，而不是像循环网络那样沿着一条链传递信息。由此有两个结果：长距离关系不会丢失，而且整个序列可以并行处理 —— 正是这一点让在互联网规模文本上训练变得可负担。",
    },
    stats: { difficulty: 85, ubiquity: 80, impact: 96, ops: 40 },
    moves: [
      {
        name: "Self-attention",
        effect: {
          en: "Scores how much each token should care about every other token.",
          zh: "算出每个 token 应该在多大程度上关注其他每个 token。",
        },
      },
      {
        name: "Positional encoding",
        effect: {
          en: "Re-injects word order, which attention alone would happily ignore.",
          zh: "把词序重新注入 —— 光靠 attention 是完全不管顺序的。",
        },
      },
      {
        name: "Context window",
        effect: {
          en: "The hard limit on how many tokens can be attended to at once.",
          zh: "一次能被注意到的 token 数量上限，是个硬限制。",
        },
      },
    ],
    links: [
      { label: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762" },
    ],
  },
  {
    id: "embeddings",
    dex: 14,
    units: ["model"],
    name: "Embeddings",
    glyph: "🧭",
    tagline: {
      en: "Meaning turned into coordinates.",
      zh: "把含义变成坐标。",
    },
    description: {
      en: "A model maps text to a vector such that similar meanings land near each other. That single property replaces keyword matching with semantic search: 'how do I cancel' finds the refund policy page even though the two share no words at all.",
      zh: "模型把文本映射成向量，让含义相近的东西落在相近的位置。就这一条性质，把关键词匹配换成了语义检索：搜「怎么取消」能找到退款政策页，哪怕两者一个字都不重合。",
    },
    stats: { difficulty: 50, ubiquity: 82, impact: 85, ops: 35 },
    moves: [
      {
        name: "Cosine similarity",
        effect: {
          en: "Measures the angle between two vectors, ignoring their magnitude.",
          zh: "衡量两个向量的夹角，忽略它们的长度。",
        },
      },
      {
        name: "Vector index",
        effect: {
          en: "Approximate nearest-neighbour search, so lookup stays fast at millions.",
          zh: "近似最近邻检索，让百万量级下的查找依然很快。",
        },
      },
      {
        name: "Chunking",
        effect: {
          en: "Splits documents small enough that one vector still means something.",
          zh: "把文档切到足够小，让一个向量仍然代表得了它。",
        },
      },
    ],
    evolvesFrom: "transformer",
  },
  {
    id: "rag",
    dex: 15,
    units: ["model", "app"],
    name: "RAG",
    glyph: "📚",
    tagline: {
      en: "Look it up first, then answer.",
      zh: "先查资料，再回答。",
    },
    description: {
      en: "Retrieval-Augmented Generation fetches relevant documents and puts them in the prompt, so the model reasons over text it can actually see rather than what it half-remembers from training. Most RAG failures are retrieval failures, not model failures — if the right chunk never made it into the context, no amount of prompt tuning saves the answer.",
      zh: "Retrieval-Augmented Generation 先取回相关文档、塞进 prompt，让模型基于它真正看得见的文本推理，而不是训练时半记不记的东西。大多数 RAG 的失败是检索的失败，不是模型的失败 —— 如果正确的片段压根没进上下文，再怎么调 prompt 也救不了那个答案。",
    },
    stats: { difficulty: 58, ubiquity: 76, impact: 88, ops: 50 },
    moves: [
      {
        name: "Hybrid search",
        effect: {
          en: "Combines vector and keyword hits, covering each other's blind spots.",
          zh: "把向量检索和关键词检索的结果合起来，互相补盲区。",
        },
      },
      {
        name: "Reranking",
        effect: {
          en: "A second, slower model reorders candidates before they hit the prompt.",
          zh: "用第二个更慢的模型对候选重新排序，然后再进 prompt。",
        },
      },
      {
        name: "Grounded citation",
        effect: {
          en: "Makes the answer point at its source, so a wrong claim is checkable.",
          zh: "让答案指向它的来源，于是错误的说法是可以被核对的。",
        },
      },
    ],
    evolvesFrom: "embeddings",
  },
  {
    id: "fine-tuning",
    dex: 16,
    units: ["model"],
    name: "Fine-tuning",
    glyph: "🎯",
    tagline: {
      en: "Teaching form, not facts.",
      zh: "教的是形式，不是事实。",
    },
    description: {
      en: "Further training on your own examples shifts how a model behaves — tone, format, a narrow classification boundary. It is a poor way to add knowledge, which is what RAG is for; the useful question to ask first is whether your problem is the model not knowing something, or the model not answering the way you want.",
      zh: "用你自己的样本继续训练，会改变模型的行为方式 —— 语气、格式、某个很窄的分类边界。它并不适合用来灌输知识，那是 RAG 的活；先该问的问题是：你的问题究竟是模型不知道某件事，还是模型没按你要的方式回答。",
    },
    stats: { difficulty: 78, ubiquity: 48, impact: 66, ops: 65 },
    moves: [
      {
        name: "LoRA",
        effect: {
          en: "Trains a small adapter instead of every weight, cutting cost enormously.",
          zh: "只训练一个小 adapter 而不是全部权重，成本大幅下降。",
        },
      },
      {
        name: "Catastrophic forgetting",
        effect: {
          en: "The failure mode where new training erases unrelated old ability.",
          zh: "一种失败模式：新的训练把不相关的旧能力抹掉了。",
        },
      },
    ],
  },

  // ── App ───────────────────────────────────────────────────────────────────
  {
    id: "flask",
    dex: 17,
    units: ["app"],
    name: "Flask",
    glyph: "🍶",
    tagline: {
      en: "A web framework small enough to read in an afternoon.",
      zh: "一个小到能在一个下午读完的 web 框架。",
    },
    description: {
      en: "Routing, request parsing, templating — and then it stops and lets you choose everything else. That minimalism is the appeal and the catch: the first hundred lines are delightful, and by the tenth thousand you have assembled your own opinionated framework anyway, just undocumented.",
      zh: "路由、请求解析、模板 —— 然后它就停下了，其余的全让你自己选。这种极简既是吸引力也是陷阱：前一百行写得很愉快，到了第一万行，你其实已经攒出了一个自己的有主见的框架，只是没有文档。",
    },
    stats: { difficulty: 22, ubiquity: 72, impact: 62, ops: 25 },
    moves: [
      {
        name: "Route decorator",
        effect: {
          en: "Binds a URL to a function with one line above it.",
          zh: "用函数上面的一行，把 URL 绑到函数上。",
        },
      },
      {
        name: "Blueprint",
        effect: {
          en: "Groups routes into modules once one file stops being enough.",
          zh: "在单文件不够用之后，把路由分组成模块。",
        },
      },
      {
        name: "WSGI",
        effect: {
          en: "The synchronous interface it speaks — one worker, one request.",
          zh: "它使用的同步接口 —— 一个 worker 处理一个请求。",
        },
      },
    ],
  },
  {
    id: "fastapi",
    dex: 18,
    units: ["app"],
    name: "FastAPI",
    glyph: "⚙️",
    tagline: {
      en: "Flask's evolution: async, and the type hints do real work.",
      zh: "Flask 的进化型：异步，而且 type hint 真的干活。",
    },
    description: {
      en: "Your function signature is the contract. Python type annotations drive request validation, response serialisation and the generated OpenAPI docs at once, so the three cannot silently disagree. Add async handlers and it holds far more concurrent connections than a thread-per-request server.",
      zh: "你的函数签名就是接口契约。Python 的类型标注同时驱动请求校验、响应序列化和自动生成的 OpenAPI 文档，于是这三者不可能悄悄对不上。再加上 async 处理函数，它能撑住的并发连接远多于「一请求一线程」的服务器。",
    },
    stats: { difficulty: 40, ubiquity: 70, impact: 74, ops: 30 },
    moves: [
      {
        name: "Pydantic model",
        effect: {
          en: "Validates and coerces the request body from a plain class definition.",
          zh: "用一个普通的类定义，就完成请求体的校验和类型转换。",
        },
      },
      {
        name: "Dependency injection",
        effect: {
          en: "Declares what a route needs — db session, current user — as parameters.",
          zh: "把路由需要的东西（数据库会话、当前用户）声明成参数。",
        },
      },
      {
        name: "Auto OpenAPI",
        effect: {
          en: "Generates live API docs that cannot drift from the code.",
          zh: "生成永远不会和代码脱节的实时 API 文档。",
        },
      },
    ],
    evolvesFrom: "flask",
  },
  {
    id: "react",
    dex: 19,
    units: ["app", "uiux"],
    name: "React",
    glyph: "⚛️",
    tagline: {
      en: "UI as a function of state.",
      zh: "把 UI 写成 state 的函数。",
    },
    description: {
      en: "You never write 'now hide that element'. You describe what the screen looks like for a given state, change the state, and let the library work out the minimum DOM edits. The mental shift is the entire lesson — most React bugs are really someone still thinking imperatively about the DOM.",
      zh: "你从不写「现在把那个元素藏起来」。你描述给定 state 下屏幕长什么样，然后改 state，剩下的最小 DOM 修改交给库去算。这个思维转变就是全部要点 —— 大多数 React 的 bug，其实是有人还在用命令式的方式想 DOM。",
    },
    stats: { difficulty: 48, ubiquity: 94, impact: 90, ops: 20 },
    moves: [
      {
        name: "Reconciliation",
        effect: {
          en: "Diffs the new tree against the old and patches only what changed.",
          zh: "把新树和旧树做 diff，只修改真正变了的部分。",
        },
      },
      {
        name: "Hook",
        effect: {
          en: "Attaches state and side effects to a plain function component.",
          zh: "把 state 和副作用挂到一个普通函数组件上。",
        },
      },
      {
        name: "Lifting state up",
        effect: {
          en: "Moves shared state to the closest common parent — the usual fix.",
          zh: "把共享 state 提到最近的公共父组件 —— 常规解法。",
        },
      },
    ],
  },
  {
    id: "nextjs",
    dex: 20,
    units: ["app"],
    name: "Next.js",
    glyph: "▲",
    tagline: {
      en: "React's evolution: the server gets to render too.",
      zh: "React 的进化型：服务端也来渲染。",
    },
    description: {
      en: "Components run on the server by default and stream HTML down; only the pieces that need interactivity ship JavaScript to the browser. The payoff is a page that is fast and indexable on first load. The cost is a new boundary you must hold in your head — what runs where, and what can cross.",
      zh: "组件默认在服务端运行并流式下发 HTML，只有真正需要交互的那部分才把 JavaScript 送到浏览器。回报是首屏又快又可被索引。代价是你脑子里得多装一条边界 —— 什么在哪边跑，以及什么能跨过去。",
    },
    stats: { difficulty: 62, ubiquity: 80, impact: 82, ops: 35 },
    moves: [
      {
        name: "Server Component",
        effect: {
          en: "Renders on the server and sends zero JavaScript for that subtree.",
          zh: "在服务端渲染，该子树下发的 JavaScript 为零。",
        },
      },
      {
        name: "Static generation",
        effect: {
          en: "Pre-builds pages at deploy time so a request is just a file read.",
          zh: "在部署时预先构建页面，一次请求就只是读一个文件。",
        },
      },
      {
        name: "Streaming with Suspense",
        effect: {
          en: "Sends the shell immediately and fills slow parts in as they resolve.",
          zh: "先把外壳发出去，慢的部分等就绪后再填进来。",
        },
      },
    ],
    evolvesFrom: "react",
  },

  // ── UI / UX ───────────────────────────────────────────────────────────────
  {
    id: "design-tokens",
    dex: 21,
    units: ["uiux"],
    name: "Design Tokens",
    glyph: "🎟️",
    tagline: {
      en: "Naming a colour so it can change everywhere at once.",
      zh: "给颜色起个名字，好让它能一次性到处改。",
    },
    description: {
      en: "A token is a named decision — `color.danger`, `space.4` — rather than a raw value scattered through the code. Once the name is the interface, dark mode, rebrands and density modes become a matter of swapping the values underneath instead of hunting hex codes across a hundred files.",
      zh: "一个 token 是一个有名字的决策 —— `color.danger`、`space.4` —— 而不是散落在代码各处的字面值。一旦名字成为接口，暗色模式、品牌换新、紧凑模式就变成了换掉底下那层值的事，而不是在一百个文件里翻十六进制色号。",
    },
    stats: { difficulty: 25, ubiquity: 64, impact: 70, ops: 15 },
    moves: [
      {
        name: "Semantic naming",
        effect: {
          en: "Names by role, not appearance — `danger`, never `red-500`.",
          zh: "按角色命名而不是按外观 —— 叫 `danger`，绝不叫 `red-500`。",
        },
      },
      {
        name: "Theme swap",
        effect: {
          en: "Repoints every token at once so light and dark stay in sync.",
          zh: "一次性重指所有 token，让亮色和暗色始终同步。",
        },
      },
    ],
  },
  {
    id: "design-system",
    dex: 22,
    units: ["uiux"],
    name: "Design System",
    glyph: "🧱",
    tagline: {
      en: "Tokens evolve into components everyone actually reuses.",
      zh: "Token 进化成大家真的会复用的组件。",
    },
    description: {
      en: "Tokens plus components plus the written rules for when to use which. The hard part was never building the button — it is the governance: who approves a new variant, how a change rolls out, and what stops each team from quietly forking their own copy.",
      zh: "Token 加组件，再加上「什么时候该用哪个」的成文规则。难的从来不是把按钮做出来 —— 难的是治理：谁批准新的变体、变更怎么推广，以及靠什么阻止每个团队悄悄 fork 一份自己的。",
    },
    stats: { difficulty: 55, ubiquity: 58, impact: 76, ops: 45 },
    moves: [
      {
        name: "Component API",
        effect: {
          en: "Constrains props so misuse is impossible rather than merely discouraged.",
          zh: "约束 props，让误用不可能发生，而不只是「不建议」。",
        },
      },
      {
        name: "Visual regression test",
        effect: {
          en: "Screenshots every component so an accidental pixel change fails CI.",
          zh: "给每个组件截图，意外的像素变化会让 CI 失败。",
        },
      },
    ],
    evolvesFrom: "design-tokens",
  },
  {
    id: "accessibility",
    dex: 23,
    units: ["uiux", "concept"],
    name: "Accessibility",
    glyph: "♿",
    tagline: {
      en: "If it only works with a mouse and good eyes, it's broken.",
      zh: "如果它只对鼠标和好视力有效，那它就是坏的。",
    },
    description: {
      en: "Semantic HTML, keyboard reachability, sufficient contrast, and labels a screen reader can announce. Almost all of it is free if you use the right element and expensive if you retrofit it — a `div` with a click handler needs four extra attributes to do what a `button` did for nothing.",
      zh: "语义化 HTML、键盘可达、足够的对比度，以及读屏软件念得出来的标签。只要用对元素，这些几乎都是免费的；等到事后补救就很贵 —— 一个挂了 click 的 `div`，要额外加四个属性，才能做到 `button` 白送的事。",
    },
    stats: { difficulty: 44, ubiquity: 60, impact: 88, ops: 20 },
    moves: [
      {
        name: "Semantic HTML",
        effect: {
          en: "Uses the element that already means what you mean.",
          zh: "直接用那个本来就表达了你意图的元素。",
        },
      },
      {
        name: "Focus management",
        effect: {
          en: "Sends keyboard focus where the eye already went, e.g. into a dialog.",
          zh: "把键盘焦点送到视线已经过去的地方，比如刚打开的对话框里。",
        },
      },
      {
        name: "Contrast ratio",
        effect: {
          en: "Keeps text legible at 4.5:1, which also helps everyone in sunlight.",
          zh: "把正文对比度保持在 4.5:1，顺带也帮了所有在阳光下看屏幕的人。",
        },
      },
    ],
    links: [{ label: "WCAG quick reference", url: "https://www.w3.org/WAI/WCAG22/quickref/" }],
  },
  {
    id: "figma",
    dex: 24,
    units: ["uiux"],
    name: "Figma",
    glyph: "🖌️",
    tagline: {
      en: "Where the argument about the design happens.",
      zh: "关于设计的争论发生的地方。",
    },
    description: {
      en: "Multiplayer design in the browser, but the part that matters to engineers is that components, variants and auto-layout map closely onto how the front-end is actually built. When the file is structured like the code, handoff stops being a translation step.",
      zh: "浏览器里的多人协作设计工具，但对工程师真正重要的是：component、variant 和 auto-layout 和前端实际的搭法高度对应。当设计文件的结构和代码一致时，交付就不再是一次翻译了。",
    },
    stats: { difficulty: 30, ubiquity: 86, impact: 68, ops: 10 },
    moves: [
      {
        name: "Auto layout",
        effect: {
          en: "Flexbox in the design file, so mockups reflow like the real thing.",
          zh: "设计文件里的 flexbox，让稿子像真页面一样重排。",
        },
      },
      {
        name: "Variant",
        effect: {
          en: "One component with states, mirroring props on the coded version.",
          zh: "一个带状态的组件，对应代码版本上的 props。",
        },
      },
    ],
  },
];

export const entriesByDex = [...entries].sort((a, b) => a.dex - b.dex);

export function getEntry(id: string): Entry | undefined {
  return entries.find((e) => e.id === id);
}

/** Full chain containing `id`, root first. */
export function evolutionChain(id: string): Entry[] {
  const start = getEntry(id);
  if (!start) return [];

  const back: Entry[] = [];
  let cursor = start;
  const guard = new Set<string>([start.id]);
  while (cursor.evolvesFrom) {
    const prev = getEntry(cursor.evolvesFrom);
    if (!prev || guard.has(prev.id)) break;
    guard.add(prev.id);
    back.unshift(prev);
    cursor = prev;
  }

  const forward: Entry[] = [];
  let tail = start;
  for (;;) {
    const next = entries.find((e) => e.evolvesFrom === tail.id);
    if (!next || guard.has(next.id)) break;
    guard.add(next.id);
    forward.push(next);
    tail = next;
  }

  const chain = [...back, start, ...forward];
  return chain.length > 1 ? chain : [];
}
