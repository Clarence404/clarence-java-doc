# 待重构

以下为建议思路：

```
高可用架构（High Availability Architecture）
├── 负载均衡（Load Balancing）
│     ├── 软负载（Nginx、LVS、Traefik）
│     ├── 硬负载（F5、A10）
│     ├── 负载均衡算法（轮询、最少连接、哈希一致性等）
│
├── 故障转移（Failover）
│     ├── 主从切换（MySQL 主从、Redis Sentinel）
│     ├── 服务实例自动恢复（Kubernetes 自愈能力）
│     ├── DNS 级别故障转移（AWS Route53）
│
├── 数据高可用（Data Availability）
│     ├── 分布式存储（HDFS、Ceph）
│     ├── 数据副本（MySQL、MongoDB 副本集）
│     ├── 强一致性 vs 最终一致性
│
├── ** 服务保护（Service Protection）**
│     ├── 限流（Throttling）→ 令牌桶、漏桶算法
│     ├── 熔断（Circuit Breaker）→ Hystrix、Sentinel
│     ├── 降级（Fallback）→ 兜底策略、降级方案
│
├── 弹性扩展（Elastic Scaling）
│     ├── 自动扩缩容（Kubernetes HPA）
│     ├── 无状态化设计（减少对 Session 依赖）
│
├── 服务治理（Service Governance）
├── API 网关（Kong、Spring Cloud Gateway）
├── 服务注册与发现（Nacos、Eureka）
├── 配置中心（Apollo、Consul）
```

