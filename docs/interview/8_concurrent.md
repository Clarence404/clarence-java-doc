# 开发总结-高并发与高可用

> 精华提炼，细节详见 [high-con/](../high-con/0_concurrent)、[high-avail/](../high-avail/0_high_availability)

## 线程池

- 核心参数：corePoolSize / maximumPoolSize / keepAliveTime / workQueue / handler
- 拒绝策略：AbortPolicy（默认）/ CallerRunsPolicy / DiscardPolicy / DiscardOldestPolicy
- 队列选择：无界队列（LinkedBlockingQueue）会导致 OOM；有界队列（ArrayBlockingQueue）配合合理拒绝策略
- 实践：禁用 `Executors.newFixedThreadPool`（无界队列）；按业务隔离线程池，避免慢任务拖垮

## Java 并发工具

- **synchronized vs ReentrantLock**：ReentrantLock 支持公平锁、可中断、tryLock 超时
- **volatile**：保证可见性和有序性，不保证原子性
- **CAS**：乐观锁基础，ABA 问题用 AtomicStampedReference 解决
- **CountDownLatch / CyclicBarrier / Semaphore**：一次性倒计时 / 可重用屏障 / 许可证限流

## 常见并发问题

| 问题 | 原因 | 解决 |
|------|------|------|
| 死锁 | 多锁循环等待 | 固定加锁顺序、tryLock 超时 |
| 活锁 | 互相谦让导致无法推进 | 随机退避 |
| 线程饥饿 | 低优先级线程长期得不到执行 | 公平锁、优先级调整 |

## 限流

- **令牌桶**（Token Bucket）：允许突发流量，Guava RateLimiter 实现
- **漏桶**（Leaky Bucket）：平滑输出，不允许突发
- **滑动窗口**：Redis + Lua 实现，精度高
- **分布式限流**：Sentinel、Redis + Lua、Gateway 内置

## 熔断降级

- **Hystrix**（已停维护）→ **Resilience4j** / **Sentinel**
- 熔断三状态：Closed → Open → Half-Open
- 降级策略：返回默认值、读缓存、返回兜底数据
- Sentinel 规则：QPS 限流、线程数限流、热点参数限流

## 高并发系统设计要点

- 读多写少 → 缓存 + CDN
- 写多 → 消息队列削峰 + 异步处理
- 热点数据 → 本地缓存（Caffeine）+ 分布式缓存（Redis）
- 数据库 → 读写分离 + 分库分表 + 连接池调优
