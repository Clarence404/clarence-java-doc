# clarence-java-doc 知识库总览

> Java 后端技术知识体系文档站，基于 VuePress 构建，覆盖从基础原理到系统架构的完整知识图谱。
> 定位：开发总结 + 工程实践参考手册。

---

## 项目结构

```
docs/
├── interview/      开发总结（各方向高频问题汇总）
├── java/           Java 8+ 语言特性
├── jvm/            JVM 原理与调优
├── algorithms/     算法与数据结构
├── patterns/       设计模式（23 种 GoF）
├── spring/         Spring Framework / WebFlux / Security
├── spring-boot/    Spring Boot / Flyway
├── netty/          IO 模型 / Reactor / Netty / WebSocket / SSE
├── distributed/    分布式理论 / 锁 / 事务 / 会话
├── high-con/       高并发：JUC / 线程池 / 系统设计
├── high-avail/     高可用：限流 / 熔断 / 降级
├── messaging/      消息队列：Kafka / RocketMQ / RabbitMQ
├── microservices/  微服务：概念 / 拆分 / 组件 / 模式
├── database/       数据库：MySQL / 列存 / 分布式 / 时序 / 文档 / 搜索
├── cache/          缓存：Redis / Caffeine
├── architecture/   系统架构 / DDD / 幂等 / 访问控制
├── protocols/      通信协议：网络 / IoT / 数据交换 / 安全
├── cloud-native/   云原生：Linux / Docker / Kubernetes / VPS
├── iot/            物联网：基础 / 协议 / 开源平台
├── ai/             AI：框架 / RAG / Agent / MCP / API 接入 / 工具
├── scenario/       业务场景：大数据
```

---

## 模块索引

| 模块 | 路径 | 覆盖主题 |
|------|------|----------|
| 面试专题 | `docs/interview/` | Java / DB / 缓存 / JVM / Spring / MQ 高频题 |
| Java 特性 | `docs/java/` | Java 8–21 核心新特性 |
| JVM | `docs/jvm/` | 内存结构 / 类加载 / GC / 调优 |
| 算法 | `docs/algorithms/` | 数据结构 / 搜索 / 排序 / DP / LeetCode |
| 设计模式 | `docs/patterns/` | 23 种 GoF 模式 |
| Spring | `docs/spring/` | IoC / AOP / WebFlux / Security |
| Spring Boot | `docs/spring-boot/` | 自动配置 / Flyway 数据迁移 |
| Netty | `docs/netty/` | IO 模型 / Reactor / WebSocket / SSE |
| 分布式 | `docs/distributed/` | CAP / Raft / 分布式锁 / 事务 |
| 高并发 | `docs/high-con/` | JUC / 线程池 / 压测 / Profiler |
| 高可用 | `docs/high-avail/` | 限流 / 熔断 / 降级 |
| 消息队列 | `docs/messaging/` | Kafka / RocketMQ / RabbitMQ |
| 微服务 | `docs/microservices/` | 拆分 / 注册发现 / 网关 / 模式 |
| 数据库 | `docs/database/` | MySQL / 分库分表 / 各类 NoSQL |
| 缓存 | `docs/cache/` | Redis / Caffeine / 两级缓存 |
| 系统架构 | `docs/architecture/` | 架构设计 / DDD / 幂等 / 对象存储 |
| 通信协议 | `docs/protocols/` | TCP/UDP / HTTP / IoT 协议 / gRPC |
| 云原生 | `docs/cloud-native/` | Linux 运维 / Docker / Kubernetes / Helm / VPS |
| IoT | `docs/iot/` | 物联网架构 / 协议 / 开源平台 |
| AI | `docs/ai/` | Spring AI / LangChain4j / RAG / Agent / MCP / API 接入 / AI 工具 |
| 业务场景 | `docs/scenario/` | 大数据场景方案 |

---

## 推荐学习路径

```
基础层：  Java 特性 → JVM → 算法 → 设计模式
框架层：  Spring → Spring Boot → Netty
数据层：  数据库 → 缓存 → 消息队列
分布式层：分布式理论 → 高并发 → 高可用 → 微服务
进阶层：  系统架构 → 协议 → 云原生 → IoT → AI
面试：    interview/ 各专题汇总复习
```

---

## 文档约定

- 文件命名：`数字_主题.md`，数字前缀决定侧边栏顺序，全部使用下划线分隔
- 文件夹命名：全小写，多单词使用连字符（kebab-case），如 `cloud-native`、`spring-boot`
- 图片存放：`docs/assets/<模块名>/`
- 待补充内容用 VuePress `warning` callout 标记：`> [!warning] 待补充`
- 参考链接放文章顶部，便于溯源
- 站点部署：GitHub Actions → `.github/workflows/deploy-docs.yml`
