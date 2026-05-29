# 开发总结-系统架构

> 精华提炼，细节详见 [architecture/](../architecture/0_system_structure)、[microservices/](../microservices/0_base_concept)

## 架构演进

```
单体 → 垂直拆分 → SOA → 微服务 → 服务网格
```

- 微服务拆分原则：单一职责、高内聚低耦合、按业务域（DDD 限界上下文）划分
- 拆分粒度：不是越细越好，过细导致分布式事务多、运维复杂度高

## DDD 核心概念

- **领域**：业务问题空间；**限界上下文**：解决方案空间的边界
- **聚合根**：维护聚合内数据一致性的入口实体
- **值对象**：无身份标识，通过属性判等（如金额、地址）
- **领域事件**：聚合状态变化的通知，驱动最终一致

## 微服务核心组件

| 组件 | 选型 |
|------|------|
| 注册中心 | Nacos（推荐）/ Eureka / Consul / Zookeeper |
| 配置中心 | Nacos / Apollo / Spring Cloud Config |
| 网关 | Spring Cloud Gateway / APISIX |
| 负载均衡 | Ribbon（停维）→ Spring Cloud LoadBalancer |
| 熔断限流 | Sentinel / Resilience4j |
| 链路追踪 | SkyWalking / Zipkin / Jaeger |

## 幂等设计

- 场景：支付回调、MQ 消费、接口重试
- 方案：唯一索引去重、Redis SETNX、数据库乐观锁版本号、Token 机制

## 访问控制模型

- RBAC（角色）：用户-角色-权限，主流方案
- ABAC（属性）：基于上下文属性，灵活但复杂
- ACL（访问控制列表）：细粒度资源控制

## 日志系统设计

- 统一日志格式（TraceId + SpanId 贯穿链路）
- 采集：Filebeat / Fluentd → Kafka → Logstash → Elasticsearch → Kibana（ELK）
- 关键：结构化日志（JSON）、日志分级、敏感信息脱敏
