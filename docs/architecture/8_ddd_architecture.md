# DDD 领域驱动设计

## 一、什么是 DDD？

- 定义：DDD（领域驱动设计）的基本概念
- 背景：为什么会出现 DDD，解决了什么问题
- 与传统开发方式的对比（例如：面向过程、三层架构）

## 二、DDD 的核心理念

- 以领域为中心建模
- 统一语言（Ubiquitous Language）
- 领域专家与开发人员协作建模
- 聚焦复杂业务而非技术细节

## 三、DDD 的核心构建块（战术设计）

- 实体（Entity）
- 值对象（Value Object）
- 聚合与聚合根（Aggregate & Aggregate Root）
- 领域服务（Domain Service）
- 工厂（Factory）
- 仓储（Repository）

## 四、DDD 的分层架构（战略设计）

- 表现层（Interface Layer）
- 应用层（Application Layer）
- 领域层（Domain Layer）
- 基础设施层（Infrastructure Layer）

## 五、限界上下文（Bounded Context）

- 什么是限界上下文
- 如何划分上下文
- 上下文之间的集成方式（REST、事件、共享内核等）
- 结合微服务的场景应用

## 六、常见实践与工具

- 如何在项目中落地 DDD
- 与 Spring Boot、MyBatis、Event Sourcing、CQRS 的结合
- 示例代码结构（可选）

## 七、DDD 的优势与挑战

- 优势：可维护性、业务复杂性管理、团队协作
- 挑战：学习成本高、建模难度大、过度设计风险