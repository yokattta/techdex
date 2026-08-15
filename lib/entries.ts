import type { Clash, Entry, Rarity } from "./types";

/**
 * The dex. Adding an entry is just appending an object here — `dex` numbers are
 * the display order and must stay unique.
 *
 * Translation rule: `name` and `moves[].name` are never translated. A Chinese
 * reader looking for "Kafka" should find the string "Kafka".
 *
 * `clashes` is declared on one side of each pair only (by convention, the lower
 * dex number). `clashesFor()` below resolves them in both directions.
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
    oneLiner: {
      en: "Same image, different machine — that's the whole point. The moment we need a different image per environment, we've thrown the property away.",
      zh: "同一个镜像，换台机器照跑 —— 这才是重点。一旦每个环境要用不同镜像，这个性质就已经被我们扔掉了。",
    },
    deepDive: {
      en: "A container is not a small virtual machine. It is one ordinary Linux process that the kernel has lied to: namespaces give it a private view of the filesystem, network and process table, and cgroups cap how much CPU and memory it may take. There is no guest kernel, which is why a container starts in milliseconds while a VM takes tens of seconds. The image itself is a stack of read-only layers plus one thin writable layer on top — so a hundred containers from the same image share one copy on disk, and everything written into that top layer disappears when the container does.",
      zh: "容器不是一台小虚拟机。它就是一个普通的 Linux 进程，只不过内核对它撒了谎：namespace 给它一份私有的文件系统、网络和进程表视图，cgroup 限制它能占用多少 CPU 和内存。这里没有 guest kernel —— 所以容器启动是毫秒级，而虚拟机要几十秒。镜像本身是一叠只读 layer 加最上面一层很薄的可写层，因此同一个镜像跑一百个容器，磁盘上只有一份；而写进最上层的一切，在容器消失时也一起消失。",
    },
    pitfall: {
      en: "Treating the writable layer as storage. Logs, uploads and database files written inside a container are gone the moment it restarts — and containers restart constantly. Anything that must survive belongs in a volume, deliberately mounted.",
      zh: "把可写层当存储用。写在容器内部的日志、上传文件和数据库文件，在容器重启的一瞬间就没了 —— 而容器是会不停重启的。任何需要活下来的东西，都得放进一个明确挂载的 volume。",
    },
    lore: {
      en: "Solomon Hykes first showed Docker in a five-minute lightning talk at PyCon in 2013, when it was still an internal tool at dotCloud, a company that was running out of runway. Five minutes was enough because the whole demo was watching things start instantly — which is the property.",
      zh: "Solomon Hykes 第一次公开 Docker，是 2013 年 PyCon 上一个五分钟的闪电演讲 —— 当时它还只是 dotCloud 这家快烧完钱的公司的内部工具。五分钟够用，是因为整个演示就是看着东西瞬间起来 —— 而那正是它的性质。",
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
    clashes: [
      {
        with: "postgresql",
        note: {
          en: "Containers are designed to be disposable; a database is the one thing that must not be. Running Postgres in a container works fine until a restart lands it on a node without its volume, or two replicas mount the same disk. Stateless workloads and stateful ones want opposite things from the same runtime.",
          zh: "容器被设计成用完即弃，而数据库恰恰是唯一不能被丢弃的东西。在容器里跑 Postgres 一直没问题 —— 直到某次重启把它调度到一个没有它 volume 的节点上，或者两个副本挂载了同一块盘。无状态负载和有状态负载，对同一个运行时的要求是相反的。",
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
    oneLiner: {
      en: "Don't ask what command ran — ask which controller owns the object and what it thinks the spec says.",
      zh: "别问执行了什么命令 —— 问哪个 controller 拥有这个对象、它认为 spec 是什么。",
    },
    deepDive: {
      en: "Everything is one pattern repeated: an object in etcd says what should be true, a controller watches for changes, compares, and acts. The scheduler is a controller that assigns pods to nodes; the deployment controller is a controller that creates replica sets. Because the loop never stops, deleting a pod by hand does nothing lasting — one gets recreated within seconds. This is also why debugging means asking 'which controller owns this object, and what does it think the spec says', not 'what command ran'.",
      zh: "所有东西都是同一个模式的重复：etcd 里的一个对象声明什么应该成立，一个 controller 监听变化、比对、然后动手。scheduler 是一个把 pod 分配到 node 的 controller；deployment controller 是一个创建 replica set 的 controller。因为这个循环永不停止，你手动删掉一个 pod 是没有持久效果的 —— 几秒内就会重建一个。这也是为什么排查问题的思路是「哪个 controller 拥有这个对象，它认为 spec 是什么」，而不是「刚才执行了什么命令」。",
    },
    pitfall: {
      en: "Adopting it for three services. The reconciliation model only pays for itself when the thing it automates — rescheduling, rollout, scaling across many machines — is work you were actually doing. Below that scale you have bought a distributed system to run a program that fits on one box.",
      zh: "为了三个服务就上 Kubernetes。这套 reconciliation 模型能回本，前提是它自动化的那些事 —— 重新调度、滚动发布、跨多机扩缩容 —— 本来就是你在做的工作。在那个规模以下，你只是为了跑一个单机装得下的程序，引进了一整套分布式系统。",
    },
    lore: {
      en: "Greek for 'helmsman'. Its ancestor inside Google was Borg, and the project's original codename was Seven — after Seven of Nine, the Star Trek character freed from the Borg collective. The logo has seven spokes.",
      zh: "希腊语里的「舵手」。它在 Google 内部的前身叫 Borg，而项目最初的代号是 Seven —— 取自《星际迷航》里那个从 Borg 集合体中被解放出来的角色 Seven of Nine。logo 上正好七根辐条。",
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
    clashes: [
      {
        with: "terraform",
        note: {
          en: "Both want to own the same objects, and neither knows the other exists. Terraform's state file says it created that deployment; Kubernetes' controller says it manages it. Change it on either side and the next apply silently reverts the other. Draw the line at the cluster boundary — Terraform builds the cluster, the cluster manages what runs in it.",
          zh: "两边都想拥有同一批对象，而且谁也不知道对方存在。Terraform 的 state 文件说这个 deployment 是它创建的；Kubernetes 的 controller 说这归它管。任意一边改动，下一次 apply 就会静默地把另一边覆盖回去。界线画在集群边界上 —— Terraform 负责把集群建出来，集群自己管理里面跑什么。",
        },
      },
      {
        with: "nginx",
        note: {
          en: "You will end up with two proxy layers whether you planned for it or not — an ingress controller in front, your own Nginx behind. When their timeouts, body-size limits and retry policies disagree, you get 504s that neither layer's logs explain on their own. Pick which layer owns each policy and keep the other out of it.",
          zh: "不管你有没有计划，最后都会有两层代理 —— 前面一个 ingress controller，后面你自己的 Nginx。当两边的超时、请求体大小限制和重试策略对不上时，你会收到 504，而单看任何一层的日志都解释不了。决定每项策略归哪一层管，另一层就别插手。",
        },
      },
    ],
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
    oneLiner: {
      en: "If it was urgent enough to click in the console, it's urgent enough to import back into state before you go home.",
      zh: "如果紧急到要在控制台点鼠标，那也就紧急到下班前必须把它 import 回 state。",
    },
    deepDive: {
      en: "The state file is the whole design and the whole risk. Terraform does not read your cloud account to decide what to do; it compares your config against state, and state against reality. That indirection is what makes `plan` fast and precise — and what makes a lost or stale state file catastrophic, because Terraform will happily propose creating a second copy of infrastructure it no longer remembers owning. Hence remote state with locking: two engineers applying at once against one state file is how you get half a network.",
      zh: "state 文件既是整个设计，也是整个风险所在。Terraform 不会去读你的云账号来决定该做什么；它拿配置和 state 比，再拿 state 和现实比。这层间接性让 `plan` 又快又准 —— 也让 state 文件丢失或过期变得灾难性，因为 Terraform 会心安理得地提议再创建一份它已经不记得自己拥有的基础设施。所以才要用带锁的 remote state：两个人同时对着一份 state apply，就是你得到半张网络的方式。",
    },
    pitfall: {
      en: "Fixing something by hand in the console 'just this once'. The next `plan` sees drift and offers to undo your fix, usually at the least convenient moment. If it is urgent enough to click, it is urgent enough to import back into state afterwards.",
      zh: "「就这一次」在控制台里手动改一下。下一次 `plan` 会看到 drift，然后提议把你的修复撤销掉，而且通常挑最不合适的时机。如果紧急到必须点鼠标，那也就紧急到事后必须把它 import 回 state。",
    },
    lore: {
      en: "Named after terraforming: turning a barren planet into a habitable one. That is literally the job — you write down the planet you want, and something else spends its time dragging reality toward it.",
      zh: "名字来自科幻里的「地球化改造」：把一颗荒芜的行星改造成可居住的。这就是它字面上的工作 —— 你把想要的星球写下来，然后由别的东西花时间把现实往那儿拽。",
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
    oneLiner: {
      en: "A suite that fails one run in twenty catches nothing — it just teaches everyone to hit re-run.",
      zh: "二十次里失败一次的测试什么都拦不住 —— 它只是教会所有人去点重跑。",
    },
    deepDive: {
      en: "The number that decides whether a pipeline helps or hurts is how long it takes and how often it lies. Under ten minutes, people wait for it and act on the result. Past twenty, they context-switch, and the feedback loop you paid for is gone. Worse is flakiness: a suite that fails randomly one time in twenty teaches the whole team to re-run rather than read, and from then on it catches nothing. Speed and trustworthiness are not polish — they are the feature.",
      zh: "决定一条流水线是帮忙还是添乱的，是它跑多久、以及它多经常说谎。十分钟以内，人们会等着它、并且根据结果行动。超过二十分钟，人就切去干别的了，你花钱买的反馈闭环也就没了。更糟的是 flaky：一套二十次里随机失败一次的测试，会教会整个团队「重跑」而不是「去看」，从那以后它什么都拦不住。快和可信不是打磨细节 —— 它们才是功能本身。",
    },
    pitfall: {
      en: "Letting a flaky test live because re-running is faster than fixing it. Every re-run is a small lesson that red does not mean broken, and that lesson generalises to the failures that were real.",
      zh: "因为「重跑比修快」而留着一个 flaky 测试。每一次重跑都在教一个小道理：红了不代表坏了 —— 而这个道理会推广到那些真的坏了的情况上。",
    },
    lore: {
      en: "Grady Booch coined 'continuous integration' in 1991, but he meant once a day. Extreme Programming pushed it to every commit — and frequency turned out to be the whole variable. The idea did not change; the interval did.",
      zh: "Grady Booch 在 1991 年造了 continuous integration 这个词，但他说的是「每天一次」。是极限编程把它推到了「每次提交」—— 而频率才是那个真正起作用的变量。想法没变，变的是间隔。",
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
    oneLiner: {
      en: "Ordering is per partition, never per topic — so we key by user id and promise nothing across users.",
      zh: "有序是 partition 级的，从来不是 topic 级 —— 所以我们用 user id 做 key，跨用户不做任何承诺。",
    },
    deepDive: {
      en: "Ordering is the detail everyone gets wrong. Kafka guarantees order within a partition, never across a topic. Which partition a message lands in comes from hashing its key, so all events for one user stay in order relative to each other — and say nothing about their order relative to another user's. This is the trade that makes it fast: partitions are independent, so throughput scales by adding them. But partition count also caps parallelism, since one partition is read by at most one consumer in a group, and raising it later rehashes keys and breaks the ordering you were relying on.",
      zh: "顺序是所有人都会搞错的那个细节。Kafka 保证的是 partition 内部有序，从来不是 topic 全局有序。消息落到哪个 partition 取决于对 key 做哈希，所以同一个用户的所有事件彼此之间保持有序 —— 而对另一个用户的事件顺序则什么都不保证。这正是它快的原因：partition 之间互相独立，加 partition 就能扩吞吐。但 partition 数量同时也是并行度上限，因为一个 partition 在一个 group 里最多被一个 consumer 读；而事后调大它会导致 key 重新哈希，把你原本依赖的顺序打破。",
    },
    pitfall: {
      en: "Sizing partitions for today's traffic. Adding them later reshuffles which key goes where, so events for one user can arrive out of order exactly once — during the resize, which is also when nobody is looking.",
      zh: "按今天的流量来定 partition 数量。事后加 partition 会重新洗牌哪个 key 去哪里，于是同一个用户的事件会恰好乱序一次 —— 就在扩容的那一刻，而那也正是没人盯着的时候。",
    },
    lore: {
      en: "Jay Kreps at LinkedIn named it after Franz Kafka, on the grounds that it was 'a system optimized for writing'. A novelist's name on an append-only log: the name is the mnemonic.",
      zh: "LinkedIn 的 Jay Kreps 用弗朗茨·卡夫卡给它命名，理由是「这是一个为写入优化的系统」。用一个作家的名字，装一份只能追加的日志 —— 名字本身就是助记符。",
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
    clashes: [
      {
        with: "redis",
        note: {
          en: "Both will happily deliver a message to N listeners, and they mean completely different things by it. Redis Pub/Sub delivers to whoever is connected right now and forgets instantly; Kafka keeps the log and lets a consumer catch up tomorrow. Build event sourcing on Pub/Sub and you lose every event that arrived while a service was restarting — with no error anywhere.",
          zh: "两个都能把一条消息发给 N 个监听者，而它们对这件事的含义完全不同。Redis Pub/Sub 发给此刻正连着的人，然后立刻忘掉；Kafka 保留日志，允许一个 consumer 明天再追上来。用 Pub/Sub 做事件溯源，你会丢掉服务重启期间到达的每一个事件 —— 而且哪里都不会报错。",
        },
      },
    ],
    links: [
      { label: "kafka.apache.org", url: "https://kafka.apache.org/documentation/" },
    ],
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
    oneLiner: {
      en: "An idle session sitting on an open BEGIN will bloat the table — VACUUM can't reclaim anything newer than the oldest open transaction.",
      zh: "一个开着 BEGIN 不动的空闲会话会让表膨胀 —— VACUUM 回收不了任何比最老的未结束事务更新的东西。",
    },
    deepDive: {
      en: "MVCC is the mechanism worth understanding, because it explains most surprising behaviour. An UPDATE does not overwrite a row; it writes a new version and leaves the old one for transactions that started earlier. That is how readers never block writers. The cost is dead rows, which VACUUM must reclaim — and if a long-running transaction sits open, VACUUM cannot clean up anything newer than it, so the table quietly bloats. A forgotten `BEGIN` in an idle session is a genuine production incident, not a curiosity.",
      zh: "MVCC 是最值得理解的机制，因为它能解释大多数令人意外的行为。一次 UPDATE 并不覆盖原行；它写一个新版本，把旧版本留给更早开始的事务。这就是读不阻塞写的原因。代价是死行，需要 VACUUM 来回收 —— 而如果有一个长事务一直开着，VACUUM 就清理不掉任何比它新的东西，表会悄悄膨胀。一个空闲会话里被遗忘的 `BEGIN`，是货真价实的生产事故，不是奇闻。",
    },
    pitfall: {
      en: "Adding indexes until writes crawl. Every index is another structure each INSERT must update, and an index the planner never chooses costs you writes forever while returning nothing. Check `pg_stat_user_indexes` before adding the next one.",
      zh: "一路加索引，直到写入慢成爬。每个索引都是每次 INSERT 都得更新的一份额外结构；而一个 planner 从来不选的索引，会永远拖慢写入却什么也不回报。加下一个之前，先看看 `pg_stat_user_indexes`。",
    },
    lore: {
      en: "Michael Stonebraker built Ingres at Berkeley, then called the follow-up POSTGRES — literally 'post-Ingres'. Forty years later the sequel is everywhere and the original is a footnote.",
      zh: "Michael Stonebraker 在伯克利做完 Ingres，把下一个项目叫 POSTGRES —— 字面意思就是「Ingres 之后」。四十年过去，续集到处都是，原作成了脚注。",
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
    clashes: [
      {
        with: "eventual-consistency",
        note: {
          en: "Postgres gives you a transaction that is true the instant it commits. Put a cache or a read replica in front of it and that guarantee quietly stops holding, but every line of code you wrote still assumes it does. The bug is always the same: a user saves a setting, reloads, and sees the old value. Decide per read path which guarantee applies — mixing them without marking the boundary is what hurts.",
          zh: "Postgres 给你的事务在提交那一刻就是真的。在它前面放一个缓存或只读副本，这个保证就悄悄失效了，而你写的每一行代码仍然假设它成立。出的 bug 永远是同一个：用户保存了设置、刷新、看到旧值。逐条读路径决定适用哪种保证 —— 真正伤人的是把两者混在一起却不标出边界。",
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
    oneLiner: {
      en: "It's single-threaded, so KEYS * on a live instance stalls every other command. SCAN, or don't.",
      zh: "它是单线程的，所以在活着的实例上跑 KEYS * 会卡住其他每一条命令。要么用 SCAN，要么别做。",
    },
    deepDive: {
      en: "Command execution is single-threaded, and that is a feature: every command is atomic without you asking, so an increment or a set-add can never interleave badly. The flip side is that one slow command blocks everything — `KEYS *` on a large database will stall the entire instance for seconds, and so will deleting a huge collection. Anything O(n) over a big structure should be a `SCAN` loop instead. Fast by default, catastrophically slow the moment you forget the model.",
      zh: "命令执行是单线程的，而这是个特性：每条命令天然原子，你不用做什么，自增或者往集合里加元素永远不会错误地交叉执行。反面是一条慢命令会阻塞所有东西 —— 在大库上执行 `KEYS *` 会让整个实例停顿好几秒，删除一个巨大的集合也一样。任何对大结构的 O(n) 操作都应该换成 `SCAN` 循环。默认很快，一旦忘了这个模型就慢得灾难性。",
    },
    pitfall: {
      en: "Using it as the only copy of something. Default persistence is a periodic snapshot, so a crash loses the last few minutes — fine for a cache, quietly unacceptable for a queue or a session store you cannot rebuild.",
      zh: "把它当成某样东西的唯一副本。默认持久化是周期性快照，所以崩溃会丢掉最后几分钟 —— 对缓存无所谓，但对一个你重建不出来的队列或 session 存储，这是悄无声息的不可接受。",
    },
    lore: {
      en: "Short for REmote DIctionary Server. Salvatore Sanfilippo wrote it for his own real-time analytics product because he needed something faster than disk — and because a dictionary was all he actually needed.",
      zh: "REmote DIctionary Server 的缩写。Salvatore Sanfilippo 是为自己那个实时分析产品写的，因为他需要比磁盘快的东西 —— 也因为他真正需要的就只是一本字典。",
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
    oneLiner: {
      en: "Before blaming the backend, check proxy_read_timeout — the client got a 504 while the backend carried on and succeeded.",
      zh: "怪后端之前先看 proxy_read_timeout —— 客户端收到 504 的时候，后端可能一直在干活并且成功了。",
    },
    deepDive: {
      en: "The reason it survives absurd connection counts is an event loop rather than a thread per request. A worker process handles thousands of sockets by only touching the ones with data ready, so idle connections cost a few kilobytes instead of a whole stack. That is also the real job it does for you: a mobile client on a bad network takes eight seconds to send its request body, and Nginx absorbs those eight seconds so your application worker — which probably is one-request-per-thread — is occupied for milliseconds instead.",
      zh: "它能扛住荒唐的连接数，靠的是事件循环而不是「一请求一线程」。一个 worker 进程处理上千个 socket，只碰那些数据已就绪的，所以空闲连接的成本是几 KB，而不是一整个调用栈。这也是它真正替你干的活：一个网络很差的移动客户端要花八秒才把请求体发完，Nginx 把这八秒吸收掉，于是你那个多半是「一请求一线程」的应用 worker，只被占用几毫秒。",
    },
    pitfall: {
      en: "Leaving `proxy_read_timeout` at its 60-second default in front of a long-running endpoint. The client gets a 504 while the backend happily keeps working and eventually succeeds — so the logs show success and the user swears it failed.",
      zh: "在一个耗时较长的接口前面，把 `proxy_read_timeout` 留在 60 秒的默认值上。客户端收到 504，而后端还在心安理得地干活并最终成功 —— 于是日志显示成功，用户咬定它失败了。",
    },
    lore: {
      en: "Igor Sysoev started it in 2002 against the C10K problem: how does one machine hold ten thousand connections at once? The answer was to stop giving each connection a thread, and that answer is still the whole design.",
      zh: "Igor Sysoev 在 2002 年开始写它，为了对付 C10K 问题：一台机器怎么同时扛住一万个连接？答案是别再给每个连接分配一个线程 —— 而这个答案至今仍是它的全部设计。",
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
    oneLiner: {
      en: "A dashboard tells you the error rate moved. Only high-cardinality data tells you which deploy moved it.",
      zh: "仪表盘告诉你错误率动了。只有高基数的数据能告诉你是哪次发布让它动的。",
    },
    deepDive: {
      en: "Cardinality is where the money goes and where the answers come from, and those are the same place. A metric tagged with user id has millions of series and costs accordingly; a metric tagged only with region has twelve and cannot tell you that the outage is one customer's traffic. The usual resolution is to split by signal: cheap low-cardinality metrics for alerting, expensive high-cardinality traces sampled for investigation — and to make sure the sampling keeps the errors rather than a uniform slice, since the interesting requests are by definition rare.",
      zh: "基数既是钱花的地方，也是答案来的地方，而这两处是同一处。一个带 user id 标签的指标有几百万条时间序列，成本也相应地高；一个只带 region 标签的指标只有十二条，但它没法告诉你这次故障其实是某一个客户的流量造成的。通常的解法是按信号拆开：用便宜的低基数指标做告警，用昂贵的高基数 trace 做采样排查 —— 并且要确保采样保留的是错误请求，而不是均匀切一刀，因为有意思的请求按定义就是稀有的。",
    },
    pitfall: {
      en: "Alerting on symptoms nobody feels. A page for 'CPU above 80%' trains people to ignore pages; a page for 'checkout success rate dropped below the SLO' does not, because it always means a user is affected.",
      zh: "对没人感受得到的症状告警。「CPU 超过 80%」这种告警会训练人忽略告警；「下单成功率跌破 SLO」不会，因为它总是意味着真的有用户受影响。",
    },
    lore: {
      en: "Rudolf Kálmán defined the word in control theory in 1960: can you infer a system's internal state from its external outputs? Software borrowed it around 2016 without changing a word of the definition.",
      zh: "Rudolf Kálmán 1960 年在控制论里定义了这个词：你能不能从系统的外部输出推断出它的内部状态？软件行业 2016 年前后把它借了过来，定义一个字都没改。",
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
    oneLiner: {
      en: "'We're AP' means nothing on its own — say what a client sees during a partition: a stale read, a rejected write, or a conflict resolved later.",
      zh: "光说「我们是 AP」等于什么都没说 —— 要说清分区时客户端看到什么：读到旧值、写被拒绝，还是留一个之后再解决的冲突。",
    },
    deepDive: {
      en: "The theorem only describes the moment a partition is actually happening, which is rare — and that is exactly why it is so often misapplied. The more useful extension is PACELC: during a Partition, choose Availability or Consistency; Else, in normal operation, choose Latency or Consistency. Most of your system's felt behaviour comes from that second clause, because 'else' is 99.9% of the time. A system that waits for a quorum on every read is not partitioned, it is just slower, forever, by design.",
      zh: "这个定理描述的只是分区正在发生的那一刻，而那种时刻很罕见 —— 这恰恰是它经常被误用的原因。更有用的扩展是 PACELC：在 Partition 时，选 Availability 还是 Consistency；Else，也就是正常运行时，选 Latency 还是 Consistency。你的系统给人的实际体感，大部分来自第二个分句，因为「Else」占了 99.9% 的时间。一个每次读都要等 quorum 的系统并没有分区，它只是被设计成了永远更慢一点。",
    },
    pitfall: {
      en: "Citing it to justify a design without saying which choice you made. 'We're AP' is only meaningful alongside what a client sees during a partition — stale data, a rejected write, or a silent conflict resolved later.",
      zh: "拿它来给一个设计背书，却不说清你选了哪一边。「我们是 AP」只有在同时说明分区期间客户端会看到什么时才有意义 —— 是旧数据、被拒绝的写入，还是一个之后才被静默解决的冲突。",
    },
    lore: {
      en: "Eric Brewer floated it as a conjecture in a conference keynote in 2000. Two years later Seth Gilbert and Nancy Lynch at MIT proved it, which is how a hunch from a talk became a theorem you are not allowed to argue with.",
      zh: "Eric Brewer 在 2000 年一场大会主题演讲上把它作为一个猜想抛了出来。两年后 MIT 的 Seth Gilbert 和 Nancy Lynch 证明了它 —— 一个演讲上的直觉，就这样变成了你没法反驳的定理。",
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
    oneLiner: {
      en: "'Eventually consistent' isn't a guarantee. Name which one: read-your-writes, monotonic reads, or causal.",
      zh: "「最终一致」不是一个保证。说清是哪一个：read-your-writes、单调读，还是因果一致。",
    },
    deepDive: {
      en: "'Eventually' is not one guarantee but a family of them, and the useful skill is naming which one you have. Read-your-writes says you at least see your own changes. Monotonic reads says time never appears to run backwards for one client. Causal consistency says a reply never shows up before the message it answers. Each is cheaper than full linearizability and each rules out a specific class of bug that users actually notice — 'eventual' alone rules out none of them.",
      zh: "「最终」不是一个保证，而是一族保证，真正的能力是说清你手上的是哪一个。Read-your-writes 说的是你至少看得见自己的改动。Monotonic reads 说的是对同一个客户端，时间不会显得在倒流。Causal consistency 说的是回复不会出现在它所回复的那条消息之前。每一种都比完整的线性一致便宜，而且每一种都排除掉一类用户真会注意到的 bug —— 光说「最终一致」，一个都排除不掉。",
    },
    pitfall: {
      en: "Reading back from a replica right after writing to the primary. Replication lag is usually milliseconds, which is exactly long enough for the redirect after a form submit to arrive first.",
      zh: "刚写完主库就从副本读回来。复制延迟通常是毫秒级 —— 而这个长度恰好够表单提交后的那次跳转先一步到达。",
    },
    lore: {
      en: "Amazon's Werner Vogels popularised it after the Dynamo paper, and the shopping cart is the canonical example: better that you briefly see a stale item than that 'add to cart' ever refuses to work.",
      zh: "Amazon 的 Werner Vogels 在 Dynamo 论文之后把它推广开来，而购物车是那个经典例子：宁可让你短暂地看到一件旧商品，也不能让「加入购物车」这个按钮有一刻点不动。",
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
    oneLiner: {
      en: "The key has to come from the client before the first attempt. A server-generated id can't work — the client never saw it.",
      zh: "key 必须由客户端在第一次尝试之前生成。服务端生成的 id 没用 —— 客户端根本没收到过它。",
    },
    deepDive: {
      en: "The key must be generated by the client, before the first attempt, and reused unchanged across every retry — a server-generated id cannot work, because the whole problem is that the client never learned it. Storing the key is not enough either: you have to store the response alongside it, atomically with the effect, or a crash between charging and recording leaves the retry free to charge again. In practice the dedupe record and the business write belong in one transaction.",
      zh: "这个 key 必须由客户端生成，在第一次尝试之前，并且在每次重试中原样复用 —— 服务端生成的 id 是不行的，因为问题的核心恰恰是客户端从来没收到过它。只存 key 也不够：你得把响应和它一起存下来，而且要和副作用原子地一起完成，否则「扣款成功但记录失败」之间的一次崩溃，会让重试可以自由地再扣一次。实践上，去重记录和业务写入应该在同一个事务里。",
    },
    pitfall: {
      en: "Deduplicating on request-body hash instead of an explicit key. Two genuinely separate $5 coffees a minute apart hash identically, and the second one silently returns the first one's receipt.",
      zh: "用请求体的哈希做去重，而不是用显式的 key。相隔一分钟的两杯真的各买了一次的 5 块钱咖啡，哈希完全一样，第二次会静默地返回第一次的收据。",
    },
    lore: {
      en: "Benjamin Peirce coined 'idempotent' in 1870 for algebraic elements that equal themselves when squared. A hundred and fifty years later Stripe turned it into an HTTP header — same property, applied to a retry.",
      zh: "Benjamin Peirce 在 1870 年造了 idempotent 这个词，用来指「自乘等于自身」的代数元素。一百五十年后Stripe 把它变成了一个 HTTP header —— 同一条性质，只是拿去对付重试。",
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
    oneLiner: {
      en: "Long input is cheap, long output isn't — the prompt is one parallel pass, and every output token is a full forward.",
      zh: "长输入便宜，长输出不便宜 —— prompt 是一次并行走完的，而每个输出 token 都要一次完整前向。",
    },
    deepDive: {
      en: "Attention compares every token to every other one, so the work grows with the square of sequence length: double the context and you quadruple the cost. That single fact explains most of the field's engineering — why context windows were small for years, why serving long prompts is expensive, and why so much research is about approximating attention cheaply. Note the asymmetry at inference time: the prompt is processed in one parallel pass, but output tokens come one at a time, each requiring a full forward pass. Long input is cheap relative to long output.",
      zh: "Attention 要把每个 token 和其他每个 token 比一遍，所以计算量随序列长度的平方增长：上下文翻倍，成本变四倍。就这一个事实解释了这个领域的大部分工程取向 —— 为什么上下文窗口多年来都很小、为什么长 prompt 服务起来很贵、以及为什么那么多研究都在想办法廉价地近似 attention。注意推理时的不对称：prompt 是一次并行处理完的，而输出 token 是一个一个来的，每个都要走一遍完整前向。相对而言，长输入比长输出便宜得多。",
    },
    pitfall: {
      en: "Assuming a bigger context window means the model uses all of it evenly. Attention concentrates at the beginning and end of a long prompt, so instructions buried in the middle get measurably less weight than the same words at the top.",
      zh: "以为上下文窗口更大就等于模型会均匀地用完它。在长 prompt 里，attention 会集中在开头和结尾，所以埋在中间的指令，得到的权重明显低于同样的话放在最前面。",
    },
    lore: {
      en: "The 2017 paper is called 'Attention Is All You Need' — eight authors at Google, and a title riffing on the Beatles. An entire field ended up built on top of that joke.",
      zh: "2017 年那篇论文的标题是《Attention Is All You Need》—— 八个 Google 作者，标题在玩 Beatles 的《All You Need Is Love》。后来整个领域都建在这个玩笑上面。",
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
        name: "KV cache",
        effect: {
          en: "Reuses earlier tokens' keys and values so each new token is cheap.",
          zh: "复用前面 token 的 key 和 value，让每生成一个新 token 都很便宜。",
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
    oneLiner: {
      en: "Which embedding model, though? A paraphrase-trained one will hand you other questions instead of the answers.",
      zh: "不过用的是哪个 embedding 模型？拿改写任务训出来的模型，会把一堆其他问题递给你，而不是答案。",
    },
    deepDive: {
      en: "Similarity is not one thing, and the embedding model decides which one you get. Some are trained so that a question lands near its answer; others so that two paraphrases land together. Use a paraphrase model for question-answering retrieval and it will confidently return other questions rather than the answers, because that is what it was taught 'similar' means. Vectors from different models are also not comparable at all — reindexing is mandatory when you swap models, and a half-migrated index degrades silently rather than erroring.",
      zh: "「相似」不是一件事，而是由 embedding 模型决定你拿到的是哪一种。有的模型被训练成让问题和它的答案靠近；有的则是让两句同义改写靠在一起。拿一个改写模型去做问答检索，它会自信地返回一堆其他问题而不是答案，因为它学到的「相似」就是那个意思。此外，不同模型产出的向量完全不可比 —— 换模型时必须重建索引，而一个迁移到一半的索引会静默地劣化，不会报错。",
    },
    pitfall: {
      en: "Chunking by fixed character count. A split mid-sentence produces a vector for half an idea, and the half that mattered ends up in a neighbouring chunk that never gets retrieved.",
      zh: "按固定字符数切块。从句子中间切开产生的是「半个想法」的向量，而真正重要的那一半落在了相邻的、永远不会被检索到的块里。",
    },
    lore: {
      en: "word2vec became famous for one subtraction: king − man + woman ≈ queen. Meaning turned into coordinates, so you can do arithmetic on it — that single line is enough to remember what an embedding is.",
      zh: "word2vec 出名靠的是一个减法：king − man + woman ≈ queen。含义变成了坐标，于是可以对它做算术 —— 就这一行，足够记住 embedding 是什么了。",
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
    oneLiner: {
      en: "Measure retrieval on its own first — if the right chunk isn't in the top k, no prompt change is going to save that answer.",
      zh: "先单独度量检索 —— 正确的片段没进 top k，再怎么改 prompt 都救不了那个答案。",
    },
    deepDive: {
      en: "Debug it as two separate systems or you will tune the wrong one for weeks. Measure retrieval on its own: for a set of real questions, is the correct chunk in the top k at all? If recall is bad, no prompt change helps. If recall is good and answers are still wrong, the problem is in generation — ordering, conflicting chunks, or a model that is not being told it may say 'not in the documents'. The second failure mode is subtler than the first and much more dangerous, because a confident answer built from retrieved-but-irrelevant text looks exactly like a correct one.",
      zh: "把它当两个独立系统来排查，否则你会花几周调错那一个。单独度量检索：拿一组真实问题，正确的片段到底有没有进 top k？如果召回不行，改 prompt 一点用都没有。如果召回没问题但答案还是错，问题就在生成端 —— 顺序、互相矛盾的片段，或者你压根没告诉模型它可以回答「文档里没有」。第二种失败比第一种更隐蔽，也危险得多，因为一个用「检索到了但不相关」的文本编出来的自信答案，看起来和正确答案一模一样。",
    },
    pitfall: {
      en: "Never giving the model an escape hatch. Without an explicit instruction that 'not in the provided documents' is an acceptable answer, it will synthesise something plausible from whatever chunks it was handed.",
      zh: "从不给模型一个台阶下。如果没有明确告诉它「文档里没有」是一个可接受的回答，它就会拿手上那几个片段合成一个听起来很像样的东西。",
    },
    lore: {
      en: "The acronym comes from a 2020 Facebook AI paper. Its first author, Patrick Lewis, has said publicly that had he known it would catch on, he would have picked a better-sounding name.",
      zh: "这个缩写来自 2020 年 Facebook AI 的一篇论文。第一作者 Patrick Lewis 后来公开说过，早知道它会这么火，当初就取个好听点的名字了。",
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
    clashes: [
      {
        with: "fine-tuning",
        note: {
          en: "Both are sold as the way to make a model 'know your stuff', and they fix different problems. RAG changes what the model can see; fine-tuning changes how it behaves. Fine-tune to inject facts and you get a model that has learned the shape of your documents and will confidently invent things in that shape — which is worse than not knowing, because it is no longer detectable.",
          zh: "两个都被当作让模型「懂你的东西」的方案在卖，但它们解决的是不同的问题。RAG 改变模型能看见什么；fine-tuning 改变它的行为方式。用 fine-tuning 去灌事实，你会得到一个学会了你文档的「形状」、并且能自信地按那个形状编造内容的模型 —— 这比不知道更糟，因为它已经不可被察觉了。",
        },
      },
    ],
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
    oneLiner: {
      en: "What's the eval set? Without one, 'it seems better' is the only measurement you have, and it's the one a week of work bends the most.",
      zh: "评测集是什么？没有它，「感觉好像好一点」就是你唯一的度量 —— 而它恰恰最容易被「我刚花了一周」掰弯。",
    },
    deepDive: {
      en: "Data quality dominates data quantity, by a lot. A few hundred examples that are consistent with each other will outperform tens of thousands that disagree, because the model faithfully learns the inconsistency too — including the parts your labellers got wrong. This is why the expensive part of a fine-tune is never the GPU time; it is building an evaluation set you trust before you start, so you can tell whether the new model is actually better or merely different.",
      zh: "数据质量的重要性远远压过数据数量。几百条彼此一致的样本，会胜过几万条互相矛盾的 —— 因为模型会忠实地把矛盾也学下来，包括标注员标错的那部分。这就是为什么一次 fine-tune 里贵的从来不是 GPU 时间，而是在开始之前构建一套你信得过的评测集，好让你能判断新模型究竟是更好了，还是只是变得不一样了。",
    },
    pitfall: {
      en: "Having no evaluation set before training. Without one, 'it seems better' is the only available measurement, and it is the one most influenced by having just spent a week on it.",
      zh: "训练之前没有评测集。没有它，「感觉好像好一点」就是你唯一能拿到的度量 —— 而这个度量最容易被「我刚在这上面花了一周」影响。",
    },
    lore: {
      en: "Its ancestor is transfer learning in computer vision: take a model trained on ImageNet and replace only the last layer. The core has never changed — you are borrowing learned representations, not knowledge.",
      zh: "它的祖宗是计算机视觉里的迁移学习：拿一个在 ImageNet 上训好的模型，只换掉最后一层。核心从来没变过 —— 你借的是已经学会的表示，不是知识。",
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
    oneLiner: {
      en: "`request` is a proxy bound to a per-request context, not a global — which is exactly why it blows up in a background thread.",
      zh: "`request` 是一个绑定到「每请求上下文」的代理，不是全局变量 —— 这正是它在后台线程里会炸的原因。",
    },
    deepDive: {
      en: "The thing that confuses newcomers most is the request context. `request` is importable as a global yet somehow holds the current request — it is a proxy bound to a context that Flask pushes per request, per thread. That design makes handlers pleasantly free of plumbing, and it is exactly why background threads and async code blow up with 'working outside of request context': the object was never global, it just looked like it. Under WSGI each worker handles one request start to finish, so concurrency is worker count, and one slow database call occupies a whole worker.",
      zh: "最让新手困惑的是 request context。`request` 可以像全局变量一样 import，却又恰好持有当前请求 —— 它其实是一个代理，绑定到 Flask 为每个请求、每个线程压入的上下文上。这个设计让 handler 里干干净净没有管道代码，也正是为什么后台线程和异步代码一碰就炸「working outside of request context」：那个对象从来就不是全局的，只是长得像。在 WSGI 下每个 worker 从头到尾处理一个请求，所以并发度等于 worker 数量，一次慢数据库调用就占住一整个 worker。",
    },
    pitfall: {
      en: "Reaching for `request` inside a background thread or a helper called after the response. The proxy is bound to the request that has already ended, and the error names the symptom rather than the cause.",
      zh: "在后台线程里、或者在响应已经返回之后被调用的辅助函数里去碰 `request`。那个代理绑定的请求已经结束了，而报错说的是症状，不是原因。",
    },
    lore: {
      en: "Released on 1 April 2010 as an April Fools' joke: Armin Ronacher built a 'single-file microframework' to mock the microframework craze. The joke was too popular, so he had to go and make it real.",
      zh: "2010 年 4 月 1 日作为愚人节玩笑发布：Armin Ronacher 做了个「单文件微框架」来嘲讽当时的微框架热潮。玩笑太受欢迎了，他只好回过头去把它做成真的。",
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
    oneLiner: {
      en: "Is that driver actually async? One blocking call inside `async def` freezes every concurrent request on the worker.",
      zh: "那个驱动真的是异步的吗？`async def` 里一次阻塞调用，会冻住这个 worker 上所有并发请求。",
    },
    deepDive: {
      en: "Async only helps if nothing blocks the event loop, and one blocking call is enough to erase the benefit for every concurrent request on that worker. A synchronous database driver, `requests`, or a CPU-heavy loop inside `async def` freezes everything until it returns. FastAPI does hand plain `def` handlers to a thread pool, which makes mixed codebases work — but a blocking call inside an `async def` handler gets no such rescue. Know which of your libraries are actually async before assuming you got concurrency.",
      zh: "async 只有在没有任何东西阻塞事件循环时才有用，而一次阻塞调用就足以抹掉那个 worker 上所有并发请求的收益。一个同步数据库驱动、`requests`，或者 `async def` 里一段吃 CPU 的循环，都会把一切冻住直到它返回。FastAPI 确实会把普通的 `def` handler 丢进线程池，这让混合代码库能工作 —— 但写在 `async def` handler 里的阻塞调用得不到这份搭救。在认为自己拿到了并发之前，先搞清楚你的库里哪些是真的异步。",
    },
    pitfall: {
      en: "Declaring a handler `async def` and calling a synchronous client inside it. It runs, it passes tests, and under load it is slower than the plain `def` version would have been.",
      zh: "把 handler 声明成 `async def`，里面却调一个同步客户端。它能跑、测试也过，然后在压力下比写成普通 `def` 还要慢。",
    },
    lore: {
      en: "Sebastián Ramírez did not write it from scratch — he glued Starlette (async) to Pydantic (type validation). All of FastAPI's magic is one idea: make the type annotations you were already writing do actual work.",
      zh: "Sebastián Ramírez 并不是从零写的 —— 他把 Starlette（异步）和 Pydantic（类型校验）粘在了一起。FastAPI 的全部魔法其实只有一个想法：让你本来就在写的类型标注真的干活。",
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
    oneLiner: {
      en: "If you're setting state in a `useEffect` because state changed, it should have been computed during render.",
      zh: "如果你在 `useEffect` 里因为 state 变了而去 set state，那它本来就该在渲染的时候算出来。",
    },
    deepDive: {
      en: "Most state does not need to be state. If a value can be computed from props and existing state during render, computing it is always correct; copying it into `useState` creates a second source of truth that must be resynchronised, and that resynchronisation is where `useEffect` bugs breed. The rule that removes whole categories of bug: `useEffect` is for synchronising with something outside React — a subscription, the document title, a network request — not for reacting to your own state changing.",
      zh: "大多数 state 根本不需要是 state。如果一个值能在渲染时从 props 和现有 state 算出来，那么算它永远是对的；把它拷进 `useState` 则制造了第二个事实来源，需要被重新同步 —— 而 `useEffect` 的 bug 就是在这种「重新同步」里滋生的。有一条规则能消掉整类 bug：`useEffect` 是用来和 React 之外的东西同步的（订阅、文档标题、网络请求），不是用来对你自己的 state 变化做出反应的。",
    },
    pitfall: {
      en: "Deriving state in `useEffect`. Setting state in response to state renders twice, shows the intermediate value for a frame, and creates a dependency chain that eventually loops.",
      zh: "在 `useEffect` 里派生 state。因为 state 变化而 set state，会渲染两次、有一帧显示中间值，并且会长出一条最终会成环的依赖链。",
    },
    lore: {
      en: "Jordan Walke's prototype at Facebook was called FaxJS, built for the ads system — a place with more state than imperative DOM code could survive. When it was open-sourced in 2013, the community's first reaction was to hate JSX.",
      zh: "Jordan Walke 在 Facebook 的原型叫 FaxJS，最初是为广告系统做的 —— 一个状态多到命令式 DOM 代码已经撑不住的地方。2013 年开源时，社区的第一反应是讨厌 JSX。",
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
    clashes: [
      {
        with: "accessibility",
        note: {
          en: "Rendering whatever you like is React's whole appeal, and it is why so much React is inaccessible. A `div` with `onClick` looks identical and is invisible to a keyboard and a screen reader. Client-side routing compounds it: the URL changes, the page does not reload, and nothing announces that the view changed — so a screen reader user is left on a page that silently became a different one.",
          zh: "想渲染什么就渲染什么是 React 的全部吸引力，也正是那么多 React 应用不可访问的原因。一个挂了 `onClick` 的 `div` 看起来一模一样，但对键盘和读屏软件完全隐形。客户端路由让问题加倍：URL 变了、页面没有重新加载、没有任何东西播报视图已经变了 —— 于是读屏用户被留在一个悄悄变成了另一个页面的页面上。",
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
    oneLiner: {
      en: "`'use client'` marks an entry point, not a leaf — everything imported below it ships to the browser too.",
      zh: "`'use client'` 标记的是入口，不是叶子 —— 它下面 import 的一切也会一起发到浏览器。",
    },
    deepDive: {
      en: "`'use client'` marks an entry point, not a leaf. Everything imported below that file joins the client bundle too, so one `'use client'` near the top of a tree quietly ships the whole subtree to the browser and undoes the reason you chose this framework. The pattern that keeps it honest is to push the directive as far down as possible and pass server-rendered content in as `children` — a client component can wrap server-rendered children without turning them into client components.",
      zh: "`'use client'` 标记的是一个入口，不是一个叶子。那个文件往下 import 的所有东西也会一起进客户端 bundle，所以在树顶附近写一个 `'use client'`，会悄悄把整棵子树送到浏览器，把你选这个框架的理由抵消掉。让它保持诚实的做法是把这条指令尽量往下推，并把服务端渲染的内容作为 `children` 传进去 —— 一个客户端组件可以包裹服务端渲染的 children，而不会把它们变成客户端组件。",
    },
    pitfall: {
      en: "Putting `'use client'` at the top of a layout to use one hook. Every page and component underneath it becomes a client component, and the server rendering you were paying for silently stops happening.",
      zh: "为了用一个 hook，就在 layout 顶上写 `'use client'`。它下面的每个页面和组件都变成了客户端组件，你花代价换来的服务端渲染悄无声息地就不再发生了。",
    },
    lore: {
      en: "Shipped by ZEIT (now Vercel) in 2016 to fix one thing: React apps that showed a blank screen first and could not be crawled. Server rendering was the starting point, not a feature bolted on later.",
      zh: "2016 年由 ZEIT（现在的 Vercel）发布，只为解决一件事：React 应用首屏白屏、搜索引擎抓不到。服务端渲染是它的起点，不是后来加上去的功能。",
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
    oneLiner: {
      en: "Name by role, not appearance — `color.danger`, never `red-500`, or dark mode will come and find you.",
      zh: "按角色命名，不按外观 —— 叫 `color.danger`，绝不叫 `red-500`，否则暗色模式迟早会来找你。",
    },
    deepDive: {
      en: "Two layers, and skipping the split is the mistake. The primitive layer is the palette — `blue.600`, `gray.100` — and it describes appearance. The semantic layer is `color.text.danger` or `color.surface.raised`, and it describes role. Components only ever reference the semantic layer, so a theme swap repoints semantics at different primitives and nothing else changes. A component that reaches straight for `red.500` has hardcoded a look, and it will be the one thing that stays bright red in dark mode.",
      zh: "两层，而跳过这个拆分就是那个错误。primitive 层是调色板 —— `blue.600`、`gray.100` —— 它描述外观。semantic 层是 `color.text.danger` 或 `color.surface.raised`，它描述角色。组件只引用 semantic 层，于是换主题就是把 semantic 重新指向不同的 primitive，其余什么都不用改。一个直接去拿 `red.500` 的组件是把外观写死了，它会成为暗色模式下唯一还亮着大红色的那个东西。",
    },
    pitfall: {
      en: "Naming tokens after what they look like. `color.blue` is a dead end the day the brand goes green, and renaming it later means touching every component you were trying to protect.",
      zh: "按外观给 token 命名。品牌改成绿色的那天，`color.blue` 就是条死路 —— 事后重命名意味着要去动你当初想保护的每一个组件。",
    },
    lore: {
      en: "Jina Anne coined the term at Salesforce around 2014, because one set of design decisions had to ship to web, iOS and Android at once. Cross-platform is why it exists — which is why it was never just CSS variables.",
      zh: "这个词是 Salesforce 的 Jina Anne 在 2014 年前后造的，起因是同一套设计决策要同时输出到 web、iOS 和 Android。跨平台是它诞生的原因 —— 所以它从来就不只是 CSS 变量。",
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
    clashes: [
      {
        with: "figma",
        note: {
          en: "Two systems of record for the same decision. The design file has its own styles and the code has its own tokens, and nothing forces them to agree — so they drift a shade at a time until nobody can say which one is correct. Either generate the code tokens from the design file or the other way round, but pick a direction; 'we keep them in sync manually' means 'they are not in sync'.",
          zh: "同一个决策有了两个事实来源。设计文件有自己的样式，代码有自己的 token，而没有任何机制强制它们一致 —— 于是它们一次差一个色阶地漂移，直到没人说得清哪个才是对的。要么从设计文件生成代码 token，要么反过来，但必须选一个方向；「我们手动保持同步」的意思就是「它们没有同步」。",
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
    oneLiner: {
      en: "The metric is adoption, not component count. Forty components with three teams quietly maintaining their own buttons is a failed system.",
      zh: "指标是采纳率，不是组件数量。四十个组件，同时三个团队在偷偷维护自己的按钮 —— 这套系统是失败的。",
    },
    deepDive: {
      en: "The health metric is adoption, not component count, and the two often move in opposite directions. Teams fork when the system is slower to change than their deadline — so the fix is almost never stricter rules, it is a shorter path from 'I need a variant' to 'it shipped'. A system with forty components and three teams quietly maintaining their own buttons has failed; one with twelve components that everyone actually imports has not.",
      zh: "健康度指标是采纳率，不是组件数量，而这两者经常朝相反方向走。团队去 fork，是因为这套系统改起来比他们的 deadline 还慢 —— 所以解法几乎从来不是更严的规矩，而是把「我需要一个变体」到「它上线了」的路径缩短。一个有四十个组件、同时有三个团队在偷偷维护自己按钮的系统是失败的；一个只有十二个组件但所有人真的在 import 的系统不是。",
    },
    pitfall: {
      en: "Adding a `className` escape hatch to every component. It removes the friction that would have told you the API was missing something, and within a year the system constrains nothing.",
      zh: "给每个组件都开一个 `className` 后门。它消除了本该告诉你「这个 API 缺了点东西」的那份摩擦，一年之内，这套系统就什么也约束不了了。",
    },
    lore: {
      en: "Its ancestor is the 1975 NASA Graphics Standards Manual: a thick binder specifying the logo, the typeface, the spacing, and how to apply them to a rocket. Governance was the hard part then too.",
      zh: "它的祖先是 1975 年的《NASA Graphics Standards Manual》—— 一本厚册子，规定了标志、字体、间距，以及这些东西怎么用在火箭上。那时候难的部分也是治理。",
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
    oneLiner: {
      en: "Automated checkers find maybe a third of it. Unplug the mouse and walk your own main flow — the rest shows up in a minute.",
      zh: "自动检查工具大概能查出三分之一。拔掉鼠标，把自己产品的主流程走一遍 —— 剩下的一分钟内就会现形。",
    },
    deepDive: {
      en: "Automated checkers find perhaps a third of real problems, and knowing which third keeps you honest. Contrast, missing alt text and unlabelled inputs are detectable by a machine. Whether the focus order matches the visual order, whether a modal traps focus, whether an alt text is useful rather than merely present — those need a person with a keyboard. The cheapest habit worth building: unplug the mouse and complete your own main flow. Most of what is broken becomes obvious within a minute.",
      zh: "自动检查工具大概能发现真实问题的三分之一，而知道是哪三分之一能让你保持诚实。对比度、缺失的 alt 文本、没有 label 的输入框，机器查得出来。焦点顺序是否和视觉顺序一致、模态框有没有困住焦点、alt 文本是有用还是仅仅「存在」—— 这些需要一个人拿着键盘去试。最值得养成也最便宜的习惯：拔掉鼠标，把你自己产品的主流程走一遍。坏掉的东西大部分一分钟内就会现形。",
    },
    pitfall: {
      en: "Removing the focus outline because it looks untidy. That single line of CSS makes the entire product unusable by keyboard, and it is invisible to everyone testing with a mouse.",
      zh: "因为觉得不好看就把焦点轮廓去掉。就这一行 CSS，让整个产品对键盘用户彻底不可用，而所有用鼠标测试的人都看不见这件事。",
    },
    lore: {
      en: "Remember the curb cut: the dip in the pavement cut for wheelchairs, which ended up used most by people with strollers, suitcases and skateboards. Design for the edge case and the benefit lands on everyone.",
      zh: "记住「路缘坡」：为轮椅在人行道上切开的那个缺口，最后用得最多的是推婴儿车的、拖行李箱的和踩滑板的人。为边缘情况设计，收益落在所有人身上。",
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
    links: [
      { label: "WCAG quick reference", url: "https://www.w3.org/WAI/WCAG22/quickref/" },
    ],
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
    oneLiner: {
      en: "The mockup is one state at one width. What does it look like empty, mid-load, errored, at 200% text zoom?",
      zh: "稿子是一个宽度下的一个状态。空的时候长什么样？加载中呢？报错呢？文字放大到 200% 呢？",
    },
    deepDive: {
      en: "A mockup is one state of one screen at one width, and shipped software is the full cross-product of states. The gap between them is where handoff arguments live: what does this look like empty, mid-load, with an error, with a name forty characters long, at 320px, at 200% text zoom? None of that is Figma's fault — it is simply not in the artefact. The teams that ship cleanly agree upfront that the mockup covers the happy path and that the other states get decided together, not discovered in review.",
      zh: "一张稿子是「一个屏幕、一种状态、一个宽度」，而上线的软件是所有状态的完整笛卡尔积。两者之间的缺口就是交付时争论发生的地方：空状态长什么样、加载中呢、报错呢、名字有四十个字符呢、320px 宽呢、文字放大到 200% 呢？这都不是 Figma 的错 —— 这些东西本来就不在那个产物里。交付顺畅的团队会事先说好：稿子覆盖的是主路径，其他状态一起定，而不是等到评审时才发现。",
    },
    pitfall: {
      en: "Treating the mockup as the spec. Everything it does not show still has to be decided by someone — usually the engineer, at the end, alone, at speed.",
      zh: "把稿子当成需求文档。它没画出来的一切仍然需要有人来定 —— 通常是工程师，在最后阶段，一个人，赶时间。",
    },
    lore: {
      en: "Dylan Field and Evan Wallace took a Thiel Fellowship in 2012 to drop out and bet that WebGL could run a real design tool in a browser. It took them four years to ship the first version.",
      zh: "Dylan Field 和 Evan Wallace 在 2012 年拿了 Thiel Fellowship 辍学，赌的是 WebGL 能在浏览器里跑起一个真正的设计工具。他们做了四年才发布第一个版本。",
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

/**
 * Rarity is derived, never authored — it tracks `impact`, so a card is rare
 * because the idea is load-bearing, not because someone tuned a drop table.
 */
export function rarityOf(entry: Entry): Rarity {
  if (entry.stats.impact >= 88) return 3;
  if (entry.stats.impact >= 76) return 2;
  return 1;
}

/** Full chain containing `id`, root first. Empty when the entry stands alone. */
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

/**
 * Clashes are authored on one side only; this returns both the ones `id`
 * declares and the ones that name it, so each card shows the full picture.
 */
export function clashesFor(id: string): { entry: Entry; note: Clash["note"] }[] {
  const own = (getEntry(id)?.clashes ?? []).flatMap((clash) => {
    const other = getEntry(clash.with);
    return other ? [{ entry: other, note: clash.note }] : [];
  });

  const incoming = entries.flatMap((candidate) => {
    const match = candidate.clashes?.find((clash) => clash.with === id);
    return match ? [{ entry: candidate, note: match.note }] : [];
  });

  const seen = new Set<string>();
  return [...own, ...incoming].filter(({ entry }) => {
    if (seen.has(entry.id)) return false;
    seen.add(entry.id);
    return true;
  });
}
