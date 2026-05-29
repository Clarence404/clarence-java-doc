# 开发总结-分布式

> 精华提炼，细节详见 [distributed/](../distributed/0_distributed)

## CAP 理论 / BASE 理论

- **CAP**：一致性（C）、可用性（A）、分区容忍性（P）三者不可兼得，分布式系统必须容忍分区，故只能选 CP 或 AP
- **BASE**：基本可用（Basically Available）、软状态（Soft State）、最终一致性（Eventually Consistent）
- Zookeeper 是 CP；Eureka 是 AP；Redis Cluster 是 AP

## 分布式锁

- **Redis 实现**：`SET key value NX EX` + Lua 脚本原子释放；Redisson 封装了看门狗续期机制
- **Zookeeper 实现**：临时顺序节点 + Watch，天然公平锁，性能低于 Redis
- **数据库实现**：基于唯一索引，性能差，兜底方案
- 常见坑：锁过期业务未结束（续期）、主从切换丢锁（RedLock）

## 分布式事务

| 方案 | 原理 | 适用场景 |
|------|------|----------|
| 2PC | 两阶段提交，强一致 | 跨库事务，性能差 |
| TCC | Try-Confirm-Cancel，业务侵入 | 金融强一致 |
| Saga | 长事务补偿，最终一致 | 长流程业务 |
| 消息事务 | 可靠消息 + 本地事务 | 跨服务最终一致 |
| Seata AT | 自动生成补偿 SQL | 快速接入，非极端场景 |

## 分布式 ID

- Snowflake：时间戳（41）+ 机器ID（10）+ 序列号（12），有时钟回拨问题
- 数据库号段：批量申请，性能好
- Redis INCR：依赖 Redis 可用性
- UUIDv7（时序 UUID）：新标准，趋势递增

## 一致性哈希

- 解决节点增减时大规模 key 迁移问题
- 虚拟节点解决数据倾斜
- 应用：Redis Cluster、Nginx upstream 负载均衡

## 分布式任务调度

- XXL-Job：轻量，国内主流
- Elastic-Job：分片执行，适合大数据量任务
- Quartz Cluster：数据库锁，经典方案
