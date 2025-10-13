# Redisson

## 🧩 Redisson 是什么？

> **Redisson** 是一个基于 **Redis** 的 **Java 驻内存分布式框架（Redis client + distributed toolkit）**。
>
> 它不仅仅是一个 Redis 客户端（像 Jedis、Lettuce），
> 更是一个帮助你 **轻松实现分布式锁、分布式集合、分布式执行、缓存、限流等功能** 的框架。

---

## ⚙️ Redisson 的主要作用

| 领域         | 功能                                             | 举例                                           |
|------------|------------------------------------------------|----------------------------------------------|
| 🔐 分布式同步   | 分布式锁、读写锁、公平锁、信号量、CountDownLatch                | `RLock`, `RReadWriteLock`, `RSemaphore`      |
| 💾 分布式数据结构 | 提供与 Java 同步的 Redis 数据结构                        | `RMap`, `RList`, `RSet`, `RQueue`, `RBucket` |
| 🧠 分布式缓存   | 提供本地缓存 + Redis 缓存的二级缓存机制                       | `RLocalCachedMap`                            |
| 📡 分布式服务   | 远程执行（RRemoteService）、分布式任务调度（RExecutorService） | 分布式执行任务                                      |
| ⏱ 限流与过期    | 分布式限流器、过期监听                                    | `RRateLimiter`, `RExpirable`                 |
| ☁️ 集群支持    | 自动支持 Redis Cluster、Sentinel、Master-Slave 等     | 无需修改代码                                       |

---

## 🧱 Redisson vs 其他 Redis 客户端

| 对比项        | **Redisson**            | **Jedis**   | **Lettuce** |
|------------|-------------------------|-------------|-------------|
| 基础操作       | ✅ 支持                    | ✅ 支持        | ✅ 支持        |
| 异步操作       | ✅ 支持 (Reactive + Async) | ❌           | ✅           |
| 分布式锁       | ✅ 内置                    | ❌           | ❌           |
| 集合封装       | ✅ 高级数据结构                | ❌           | ❌           |
| 缓存功能       | ✅ 二级缓存、注解支持             | ❌           | ❌           |
| Cluster 支持 | ✅ 自动                    | ✅           | ✅           |
| 使用复杂度      | 中                       | 简单          | 中           |
| 适合场景       | 企业分布式系统                 | 简单 Redis 读写 | 响应式场景       |

---

## 💡 常见用法示例

### 1️⃣ 分布式锁

```java
RLock lock = redissonClient.getLock("order:lock");
try {
    lock.lock(10, TimeUnit.SECONDS);
    // 执行业务逻辑
} finally {
    lock.unlock();
}
```

### 2️⃣ 分布式 Map

```java
RMap<String, String> map = redissonClient.getMap("user:info");
map.put("name", "Clarence");
System.out.println(map.get("name"));
```

### 3️⃣ 限流器

```java
RRateLimiter rateLimiter = redissonClient.getRateLimiter("api:limit");
rateLimiter.trySetRate(RateType.OVERALL, 5, 1, RateIntervalUnit.SECONDS);
if (rateLimiter.tryAcquire()) {
    System.out.println("允许访问");
} else {
    System.out.println("被限流");
}
```

---

## 🧠 底层原理简述

* 通过 Redis 的命令（如 `SETNX`, `EXPIRE`, `EVAL`）实现分布式锁；
* 使用 Lua 脚本保证操作原子性；
* 内置看门狗机制，防止锁过期释放导致的“锁丢失”；
* 提供异步（Async）、反应式（Reactive）、RxJava 模式；
* 自动处理 Redis 集群、主从切换等复杂拓扑。

---

## 🚀 常用场景

* 分布式锁（订单扣减、防重复下单）
* 分布式限流（接口防刷）
* 延迟任务（Redisson DelayQueue）
* 二级缓存（本地 + Redis）
* 分布式执行器（任务调度）

---

## ✅ 总结一句话：

> **Redisson 是一个在 Java 中基于 Redis 的分布式工具包，能让你像用本地对象一样使用分布式锁、集合、缓存、限流等高级功能。**
