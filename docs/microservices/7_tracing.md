# 链路追踪

> 参考资料：
> * SkyWalking：[https://skywalking.apache.org/docs/](https://skywalking.apache.org/docs/)
> * Zipkin：[https://zipkin.io/](https://zipkin.io/)
> * Jaeger：[https://www.jaegertracing.io/docs/](https://www.jaegertracing.io/docs/)
> * OpenTelemetry：[https://opentelemetry.io/docs/](https://opentelemetry.io/docs/)

---

## 一、为什么需要链路追踪

微服务架构中，一次请求可能经过十几个服务。当出现性能瓶颈或异常时，需要链路追踪来：
- 还原完整调用链路
- 定位耗时瓶颈
- 快速找到故障服务

## 二、核心概念

| 概念 | 说明 |
|------|------|
| Trace | 一次完整请求的全链路记录 |
| Span | 链路中每一个服务调用的单元 |
| TraceId | 全局唯一 ID，贯穿整条链路 |
| SpanId | 当前节点的唯一 ID |

## 三、主流方案对比

| 组件 | 特点 |
|------|------|
| SkyWalking | 国产顶流，APM + 链路追踪，Java Agent 无侵入 |
| Zipkin | 轻量级，Spring Cloud Sleuth 原生集成 |
| Jaeger | Uber 出品，CNCF 项目，Kubernetes 友好 |
| OpenTelemetry | 厂商中立的可观测性标准，未来趋势 |

> [!warning]
> 待补充
