---
home: true
title: 首页

heroImage: /images/logo.png
heroText: Clarence Java Doc
tagline: Java 后端技术知识体系 · 开发总结 + 工程实践参考手册
heroFullScreen: true

actions:
  - text: 面试专题
    link: /interview/0_java
    type: primary
    icon: circle-question
  - text: 开始阅读
    link: /java/5_feature
    type: default
    icon: book-open

highlights:
  - header: 基础体系
    description: 扎实根基，以不变应万变
    features:
      - title: Java 特性
        icon: code
        details: Java 8 → 21 核心新特性，Stream / Lambda / Record / Virtual Thread
        link: /java/5_feature
      - title: JVM
        icon: gears
        details: 内存结构 / 类加载 / GC 算法 / 参数调优 / 线上问题排查
        link: /jvm/0_jvm_memory
      - title: 算法与数据结构
        icon: diagram-project
        details: 复杂度分析 + 13 种算法范式，LeetCode / 华为 OJ 分类题解
        link: /algorithms/0_complexity
      - title: 设计模式
        icon: shapes
        details: GoF 23 种经典模式，结合 Spring / JDK 真实场景讲解
        link: /patterns/0_design_intro

  - header: 框架生态
    description: Spring 全家桶与高性能网络编程
    bgImageStyle:
      background-color: rgba(236, 244, 255, 0.6)
    features:
      - title: Spring Framework
        icon: leaf
        details: IoC 容器 / AOP 原理 / Bean 生命周期 / 事务传播 / 循环依赖三级缓存
        link: /spring/0_spring_framework
      - title: Spring Boot
        icon: rocket
        details: 自动配置原理 / Actuator / Flyway 数据库版本迁移
        link: /springboot/0_springboot
      - title: Netty
        icon: network-wired
        details: BIO → NIO → IO多路复用 / Reactor 模式 / WebSocket / SSE
        link: /netty/1_io_model

  - header: 数据存储
    description: 关系型 · NoSQL · 消息中间件，数据全链路
    features:
      - title: 数据库
        icon: database
        details: MySQL 索引 / 事务 / MVCC / 分库分表，列式 / 时序 / 搜索引擎选型
        link: /database/1_mysql_feature
      - title: 缓存
        icon: bolt
        details: Caffeine 本地缓存 / 两级缓存架构 / 缓存穿透击穿雪崩
        link: /cache/2_caffeine
      - title: 消息队列
        icon: comments
        details: Kafka / RocketMQ / RabbitMQ 原理对比，消息可靠性保障方案
        link: /messaging/0_mq

  - header: 分布式架构
    description: 高并发 · 高可用 · 微服务，架构进阶核心
    bgImageStyle:
      background-color: rgba(236, 244, 255, 0.6)
    features:
      - title: 分布式理论
        icon: globe
        details: CAP / BASE / Raft / Gossip / 分布式锁 / 事务 / Session
        link: /distributed/0_distributed
      - title: 高并发
        icon: fire
        details: JUC / 线程池调优 / 高并发系统设计 / 压测 / Arthas Profiler
        link: /high-con/0_concurrent
      - title: 高可用
        icon: shield-halved
        details: 限流算法 / 熔断三态 / 降级策略，Sentinel / Resilience4j 实战
        link: /high-avail/0_high_availability
      - title: 微服务
        icon: cubes
        details: 服务拆分 / 注册发现 / API 网关 / 链路追踪 / 微服务模式
        link: /microservices/0_base_concept

  - header: 进阶拓展
    description: 云原生 · IoT · AI，开拓技术视野
    features:
      - title: 系统架构
        icon: building-columns
        details: 技术选型 / DDD 领域驱动 / 幂等设计 / 访问控制模型
        link: /architecture/0_system_structure
      - title: 通信协议
        icon: tower-broadcast
        details: TCP/HTTP/gRPC / IoT 协议 / 安全协议，全栈协议体系
        link: /protocols/0_protocols_base
      - title: 云原生
        icon: cloud
        details: Linux 运维 / Kubernetes / Helm，容器化最佳实践
        link: /cloud-native/1_linux_centos
      - title: IoT 物联网
        icon: microchip
        details: 物联网四层架构 / MQTT / OPC-UA / 开源平台 ThingsBoard
        link: /iot/0_base
      - title: 人工智能
        icon: robot
        details: Spring AI / LangChain4j / RAG 检索增强 / Ollama 本地部署
        link: /ai/0_ai
      - title: 面试专题
        icon: circle-question
        details: Java / DB / 缓存 / JVM / Spring / MQ 高频题汇总，临考速查
        link: /interview/0_java

footer: MIT 协议 | 版权所有 © 2025-至今 Clarence
---

<div style="display:flex; justify-content:center; align-items:center; gap:3rem; flex-wrap:wrap; padding: 2.5rem 1rem 1.5rem;">
  <img src="/images/slogan.png" style="max-width:320px; width:75%; filter:drop-shadow(0 8px 24px rgba(168,85,247,0.2));" alt="Clarence Java Doc" />
  <div style="text-align:left; max-width:320px;">
    <p style="font-size:1rem; line-height:1.9; color:var(--vp-c-text-2, #555);">
      📚 覆盖 <strong>22 个</strong>技术模块<br/>
      💡 面向 Java 后端工程师<br/>
      🎯 开发总结 + 工程实践双轨并行<br/>
      🔄 持续更新迭代
    </p>
  </div>
</div>

### 推荐博客

| 博客名称 | 链接 |
|---------|------|
| Java 全栈知识体系 | [pdai.tech](https://www.pdai.tech) |
| 小傅哥 bugstack 虫洞栈 | [bugstack.cn](https://bugstack.cn) |
| 互联网公司常用框架源码赏析 | [doocs.org](https://schunter.doocs.org) |
