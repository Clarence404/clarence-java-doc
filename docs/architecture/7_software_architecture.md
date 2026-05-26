# 软件设计架构

::: warning Todo
以下为初步大纲，后续将结合实际项目经验持续补充完善。
:::

> 本文聚焦 Java 后端开发，整理常见的架构思想、模式与风格，适合作为学习路线或架构笔记起点。

---

## 核心架构思想（适用于 Java 工程）

- **DDD（领域驱动设计）**  
  以业务建模为核心，强调限界上下文、聚合、领域服务等。

- **TDD（测试驱动开发）**  
  通过先编写测试用例，驱动实现代码编写，提高可维护性。

- **Clean Architecture / Onion Architecture**  
  强调分层与依赖反转，业务逻辑与技术实现解耦。

- **Hexagonal Architecture（六边形架构）**  
  通过端口与适配器解耦内部逻辑与外部交互（例如 Web、数据库）。

---

## 常见架构模式（Java 项目常见）

- **MVC（Model-View-Controller）**  
  Java Web 应用最常见结构，Spring MVC 即基于该模式。

- **CQRS（命令查询职责分离）**  
  在复杂业务中拆分写操作和读操作，提升性能与扩展性。

- **Event Sourcing（事件溯源）**  
  用事件记录状态变化，适用于追溯和审计场景。

- **Layered Architecture（三层/多层架构）**  
  表现层（Controller）、服务层（Service）、持久层（Repository）是 Java 项目默认架构。

- **Plugin Architecture（插件式架构）**  
  常用于中间件、平台型系统，核心系统+插件动态加载。

---

## 系统架构风格（后端系统选型参考）

- **单体架构（Monolithic）**  
  初期项目常用，部署简单，结构紧凑。

- **微服务架构（Microservices）**  
  以服务为单位独立开发、部署，Spring Cloud / Dubbo 是主流技术栈。

- **事件驱动架构（EDA）**  
  基于消息队列（如 Kafka、RocketMQ）进行服务间通信。

- **Serverless 架构（可选）**  
  适用于函数触发类任务，例如定时计算、图片处理（Java 可选用阿里云函数计算或 AWS Lambda）。

---

## 实战组合建议

- `Spring Boot + DDD + MyBatis Plus`
- `Spring Cloud + DDD + CQRS + Kafka`
- `Spring Boot + Clean Architecture + Redis + RabbitMQ`
- `单体 MVC + 分层架构（传统企业项目）`

---

> 🚧 持续更新中，如需某部分扩展为实践案例，可留言提出。
