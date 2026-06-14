// OpenQuartz 项目数据
const projects = [
    {
        name: "easy-file",
        description: "快速、简洁、小巧、优雅、解决大文件导出常见的各种问题的，可靠的，可扩展的集成框架",
        descriptionEn: "Fast, concise, compact, elegant, reliable and extensible integration framework for solving common problems of large file export",
        url: "https://github.com/openquartz/easy-file",
        language: "Java",
        stars: 16,
        forks: 4,
        tags: ["大文件处理", "导出", "框架", "Excel"]
    },
    {
        name: "easy-event",
        description: "分布式的，可靠的，实时的，可扩展的, 易用的，轻量级的 基于本地消息实现的EventBus事件总线",
        descriptionEn: "Distributed, reliable, real-time, scalable, easy-to-use, lightweight, EventBus event bus implemented based on local messages",
        url: "https://github.com/openquartz/easy-event",
        language: "Java",
        stars: 24,
        forks: 9,
        tags: ["事件总线", "分布式", "消息处理", "DDD"]
    },
    {
        name: "spring-cloud-feign-plugin",
        description: "SpringCloud-Feign插件，支持服务或接口级别的动态超时时间设置",
        descriptionEn: "Spring Cloud Feign plug-in that supports dynamic timeout settings at the service or interface level",
        url: "https://github.com/openquartz/spring-cloud-feign-plugin",
        language: "Java",
        stars: 6,
        forks: 2,
        tags: ["Spring Cloud", "Feign", "动态超时"]
    },
    {
        name: "easy-transaction",
        description: "轻量级最大努力重试型TCC、Saga分布式柔性事务解决方案",
        descriptionEn: "Lightweight best-effort retry TCC, Saga distributed flexible transaction solution",
        url: "https://github.com/openquartz/easy-transaction",
        language: "Java",
        stars: 2,
        forks: 3,
        tags: ["分布式事务", "TCC", "Saga"]
    },
    {
        name: "easy-biz-log",
        description: "通用业务操作日志组件。简单、优雅地记录业务操作日志",
        descriptionEn: "General business operation log component. Simple and elegant recording of business operation logs",
        url: "https://github.com/openquartz/easy-biz-log",
        language: "Java",
        stars: 5,
        forks: 1,
        tags: ["操作日志", "业务组件"]
    },
    {
        name: "spring-ai-jmanus-ollama",
        description: "基于Spring AI + Ollama实现的Java 版的OpenManus",
        descriptionEn: "OpenManus for Java based on Spring AI and Ollama",
        url: "https://github.com/openquartz/spring-ai-jmanus-ollama",
        language: "Java",
        stars: 2,
        forks: 1,
        tags: ["AI", "Spring AI", "Ollama"]
    },
    {
        name: "easy-statemachine",
        description: "一款轻量级，高性能的状态机框架",
        descriptionEn: "A lightweight, high-performance state machine framework",
        url: "https://github.com/openquartz/easy-statemachine",
        language: "Java",
        stars: 2,
        forks: 1,
        tags: ["状态机", "高性能"]
    },
    {
        name: "message-tools",
        description: "消息处理优化小工具。助力提升服务稳定性。",
        descriptionEn: "Message Processing Optimization Widget. Help improve service stability.",
        url: "https://github.com/openquartz/message-tools",
        language: "Java",
        stars: 1,
        forks: 0,
        tags: ["消息处理", "工具", "稳定性"]
    },
    {
        name: "java-obj-diff",
        description: "功能强大的java比较对象差异工具类",
        descriptionEn: "Powerful Java Compare Object Differences Utility Class.",
        url: "https://github.com/openquartz/java-obj-diff",
        language: "Java",
        stars: 1,
        forks: 0,
        tags: ["对象比较", "工具", "差异检测"]
    },
    {
        name: "mq-degrade",
        description: "MQ通用降级方案(稳定性保障支持)、与主流配置中心接入。支持自动降级、手动降级等。",
        descriptionEn: "MQ general degradation scheme (stability assurance support) and access to mainstream configuration centers. Support automatic downgrade, manual downgrade, etc.",
        url: "https://github.com/openquartz/mq-degrade",
        language: "Java",
        stars: 1,
        forks: 0,
        tags: ["MQ", "降级", "稳定性"]
    },
    {
        name: "easy-indicator-rule",
        description: "一个面向 Spring Boot 业务系统的指标规则组件：用代码定义指标元数据，用页面管理规则，用运行时执行真实业务对象上的规则",
        descriptionEn: "An indicator rule component for Spring Boot business systems: define indicator metadata in code, manage rules via UI, execute rules against real business objects at runtime",
        url: "https://github.com/openquartz/easy-indicator-rule",
        language: "Java",
        stars: 0,
        forks: 0,
        tags: ["指标规则", "Spring Boot", "规则引擎", "QLExpress"]
    }

];