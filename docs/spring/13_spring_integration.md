# Spring Integration

> 参考资料：
> * Spring Integration 官方文档：[https://docs.spring.io/spring-integration/reference/](https://docs.spring.io/spring-integration/reference/)
> * Spring Integration 概览：[https://www.baeldung.com/spring-integration](https://www.baeldung.com/spring-integration)

## 一、是什么

Spring Integration 是企业集成模式（EIP）的 Java 实现，用于构建**消息驱动的集成流**，连接不同系统、协议和数据源。

## 二、核心概念

| 概念 | 说明 |
|------|------|
| Message | 消息对象 = Header（元数据）+ Payload（数据） |
| Channel | 消息传输通道，发送方和接收方解耦 |
| Endpoint | 处理消息的节点（过滤 / 转换 / 路由 / 聚合等） |
| Adapter | 与外部系统交互（文件 / HTTP / JMS / AMQP 等） |

## 三、适用场景

- 多系统数据同步（文件、数据库、MQ 之间流转）
- 事件驱动管道
- 协议适配（HTTP → MQ → 数据库）

> ⚠️ 日常 CRUD 业务不需要用 Spring Integration，复杂度较高，适合企业集成场景。

> [!warning]
> 待补充
