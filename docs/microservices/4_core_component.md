# 核心组件

主要基于 [Spring Cloud Alibaba](https://sca.aliyun.com/) + 国际流行方案扩展。

---

## 1、服务网关与路由（API Gateway）

- **Spring Cloud Gateway**（Spring 官方，异步非阻塞）
- **Kong**（国外非常流行，基于 Nginx）
- **Traefik**（云原生友好，Kubernetes 集成好）
- **APISIX**（国产开源，Apache 顶级项目）

说明：如果是 IoT、高并发，建议用 Spring Cloud Gateway 或 Traefik。

---

## 2、服务注册与配置管理（Service Discovery & Config）

- **Nacos**（注册中心 + 配置中心）
- **Apollo**（配置中心，特别适合复杂配置）
- **Consul**（HashiCorp 出品，服务发现与 KV 配置）
- **etcd**（CoreOS 出品，Kubernetes 核心组件之一）

说明：大规模云原生集群，etcd/Consul 比较常见。

---

## 3、服务通信与调用（RPC / Service Mesh）

- **Dubbo**（阿里出品，RPC 框架）
- **OpenSergo**（下一代服务治理标准）
- **gRPC**（Google 出品，Protocol Buffers 通信）
- **Istio**（服务网格 Service Mesh，基于 Envoy）
- **OpenFeign**（Spring Cloud 提供的声明式 HTTP 客户端，简化服务间调用）

说明：如果追求更标准的跨语言通信，gRPC + Istio 是国际主流组合。

---

## 4、流量控制与熔断限流（Resilience）

- **Sentinel**（流量控制、熔断、降级）
- **Resilience4j**（Spring 官方推荐的熔断器）
- **Envoy**（代理级流控能力）

说明：国内项目 Sentinel 多，国际项目 Resilience4j 也很火。

---

## 5、分布式事务（Distributed Transaction）

- **Seata**（阿里出品）
- **Saga Pattern（架构模式）**（微服务补偿式事务）
- **Event Sourcing**（事件驱动事务，偏云原生）

说明：Seata 是最实用的工具；大型复杂项目可能采用 Saga+事件溯源。

---

## 6、消息中间件（Messaging / Event Bus）

- **RocketMQ**（阿里出品）
- **Kafka**（全球最流行的流处理平台）
- **RabbitMQ**（轻量消息中间件）
- **Pulsar**（Apache Pulsar，消息+流统一）

说明：数据量爆炸式增长（IoT、金融），Kafka 更适合；RocketMQ 适合中小型系统。

---

## 7、链路追踪与监控（Observability）

- **SkyWalking**（国产顶流，APM+Trace）
- **Zipkin**（轻量级链路追踪）
- **Jaeger**（Uber 出品，CNCF 项目）
- **Prometheus**（指标监控，K8s 标配）
- **Grafana**（可视化展示平台）

说明：现在主流是 Prometheus + Grafana + SkyWalking/Jaeger 配合使用。

---

## 8、超简总结表

| 模块   | 国内主流                        | 国际主流                      |
|:-----|:----------------------------|:--------------------------|
| 网关   | Spring Cloud Gateway、APISIX | Kong、Traefik              |
| 注册发现 | Nacos                       | Consul、etcd               |
| 通信   | Dubbo、OpenSergo、OpenFeign   | gRPC、Istio                |
| 流控   | Sentinel                    | Resilience4j、Envoy        |
| 事务   | Seata                       | Saga/Event Sourcing       |
| 消息   | RocketMQ                    | Kafka、RabbitMQ、Pulsar     |
| 监控   | SkyWalking、Zipkin           | Jaeger、Prometheus、Grafana |

---

::: tip 小提示

- 国内偏向「**一站式集成**」（比如 Spring Cloud Alibaba）
- 国外偏向「**组合搭积木式**」（比如 gRPC + Consul + Envoy + Jaeger）
- 如果你做的是 IoT 项目，需要重点关注：
    - 高并发流量控制（Sentinel / Envoy）
    - 实时消息处理（Kafka / RocketMQ）
    - 高可用注册中心（Nacos / Consul）
    - 全链路监控（SkyWalking / Prometheus）
  
:::