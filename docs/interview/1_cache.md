# Java 总结-缓存

## 一、缓存数据不一致性问题

**【场景一】** 先操作缓存，再写数据库成功之前，如果有读请求发生，可能导致旧数据入缓存，引发数据不一致。在分布式环境下，数据的读
写都是并发的，一个服务多机器部署，对同一个数据进行读写，在数据库层面并不能保证完成顺序，就有可能后读的操作先完成
（读取到的是脏数据），如果不采用给缓存设置过期时间策略，该数据永远都是脏数据。

**【解决办法】**：<br>

- 可采用更新前后双删除缓存策略；<br>
  > 参考链接：[延迟双删如此好用，为何大厂从来不用](https://mp.weixin.qq.com/s/CR7e6pjKd5cPdVnkq5mqbw)

```java
import java.util.concurrent.TimeUnit;

public class CacheService {

    // 缓存客户端，比如 Redis
    private CacheClient cacheClient;
    // 数据库服务接口
    private DatabaseService databaseService;

    public CacheService(CacheClient cacheClient, DatabaseService databaseService) {
        this.cacheClient = cacheClient;
        this.databaseService = databaseService;
    }

    public void updateDataWithCache(String key, String value) {
        // 1. 第一次删除缓存
        cacheClient.delete(key);

        // 2. 更新数据库
        databaseService.update(key, value);

        // 3. 延迟删除缓存
        new Thread(() -> {
            try {
                // 延迟一段时间（具体时间根据业务实际情况设定，通常是事务提交所需时间）
                TimeUnit.SECONDS.sleep(1);
                cacheClient.delete(key);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.out.println("延迟双删任务被中断：" + e.getMessage());
            }
        }).start();
    }
}

```

- 可以通过“串行化”解决，保证同一个数据的读写落在同一个后端服务上:

  - 核心思路：

    通过<span style="color: red;">**哈希一致性或分布式锁，确保对同一个 key 的读写请求串行执行**</span>，从而避免并发冲突。

```java
import java.util.concurrent.locks.ReentrantLock;

public class CacheServiceWithSerialization {

    private CacheClient cacheClient; // 缓存客户端
    private DatabaseService databaseService; // 数据库服务接口

    private static final ReentrantLock lock = new ReentrantLock(); // 本地锁示例

    public void updateDataWithSerialization(String key, String value) {
        // 获取分布式锁，确保同一时刻只有一个线程操作 key
        boolean lockAcquired = DistributedLock.tryLock(key, 5, TimeUnit.SECONDS);
        if (!lockAcquired) {
            System.out.println("未能获得锁，操作已被其他线程占用");
            return;
        }

        try {
            // 1. 写缓存
            cacheClient.set(key, value);

            // 2. 更新数据库
            databaseService.update(key, value);

            // 3. 删除缓存
            cacheClient.delete(key);

        } finally {
            DistributedLock.release(key); // 释放分布式锁
        }
    }
}

```

**【场景二】** 先操作数据库，再清除缓存。如果删缓存失败了，就会出现数据不一致问题。

**【方案一】** ：将删除失败的 key 值存入队列中重复删除，如下图：

![img.png](../assets/interview/cache-diff-one.png)

（1）更新数据库数据。

（2）缓存因为种种问题删除失败。

（3）将需要删除的 key 发送至消息队列。

（4）自己消费消息，获得需要删除的 key。

（5）继续重试删除操作，直到成功。

::: warning
【缺点】：对业务线代码造成大量的侵入。于是有了方案二。
:::

**【方案二】**：通过订阅 binlog 获取需要重新删除的 Key 值数据。在应用程序中，另起一段程序，获得这个订阅程序传来的消息，进行删除缓存操作。

![img.png](../assets/interview/cache-diff-two.png)

（1）更新数据库数据

（2）数据库会将操作信息写入 binlog 日志当中

（3）订阅程序提取出所需要的数据以及 key

（4）另起一段非业务代码，获得该信息

（5）尝试删除缓存操作，发现删除失败

（6）将这些信息发送至消息队列

（7）重新从消息队列中获得该数据，重试操作

## 二、Redis 内存用完会发生什么

Redis 是一个基于内存的数据库，所有数据都存储在内存中。当内存用完时，Redis 的行为取决于配置，可能包括：

- 默认情况下，新写入操作会失败，Redis 返回错误。

- 如果设置了 maxmemory 和 maxmemory-policy，Redis 会根据指定策略回收内存，比如淘汰最少使用的键（LRU 算法）或即将过期的键。

- **如果没有合理配置，内存压力可能导致操作系统触发 OOM（Out of Memory）机制，将 Redis 进程终止**。

## 三、常见的缓存淘汰策略有哪些

| 策略名称        | 描述                                                                 |
| --------------- | -------------------------------------------------------------------- |
| noeviction      | 默认策略，当内存不足时，不会淘汰任何数据，新写操作会失败，返回错误。 |
| allkeys-lru     | 从所有键中移除最近最少使用的键（基于 LRU）。                         |
| volatile-lru    | 从设置了过期时间的键中移除最近最少使用的键（基于 LRU）。             |
| allkeys-random  | 从所有键中随机移除一个键。                                           |
| volatile-random | 从设置了过期时间的键中随机移除一个键。                               |
| volatile-ttl    | 从设置了过期时间的键中移除即将过期（TTL 最小）的键。                 |
| allkeys-lfu     | 从所有键中移除最不常使用的键（基于 LFU）。                           |
| volatile-lfu    | 从设置了过期时间的键中移除最不常使用的键（基于 LFU）。               |

## 四、缓存穿透、缓存击穿、缓存雪崩和缓存刷新

**【1】缓存穿透（Cache Penetration）**：

缓存穿透是指查询一个数据，如果这个<span style="color: red;">**数据在缓存中不存在并且数据库中也不存在**</span>，那么该请求会直接访问数据库。这种情况会导致每次请求都去查询数据库，从而绕过了缓存机制，影响系统的性能。

**发生原因**：

- 用户查询的数据在缓存和数据库中都没有，通常是由于缓存的空数据没有设置好（没有缓存失败的记录）或者数据库中并未存在数据。

**应对方案：**

- **缓存空对象**： 对于查询结果为空的数据，可以将空数据（例如，返回空的 JSON 或者一个特殊的标志值）也缓存一段时间，避免重复查询数据库。

- **布隆过滤器（Bloom Filter）**：通过布隆过滤器在查询缓存之前先过滤掉那些根本不存在的数据，避免无效查询直接到数据库。

- **全局查询校验**：使用应用层或 API 层的校验来保证访问的数据必须经过有效性验证。

**【2】缓存击穿（Cache Breakdown）**：

缓存击穿是指<span style="color: red;">**某一时刻，大量的请求同时访问某个缓存失效的数据**</span>（通常是在数据的缓存过期的瞬间），导致大量请求同时访问数据库，进而产生数据库的压力。

**发生原因**：

- 因为缓存过期时间统一，导致缓存过期的瞬间会有多个请求同时访问，造成缓存失效瞬间的流量激增，影响数据库性能。

**应对方案：**

- **设置合理的缓存过期时间**：使用不易过期或者过期时间设置得较为分散，避免同一时刻缓存大量失效。

- **加锁机制（缓存重建时锁）**：当缓存失效时，第一个请求会去数据库查询并更新缓存，其他请求等待缓存更新，避免同一时刻多个请求同时访问数据库。

- **互斥锁（Mutex Lock）或 Redis 分布式锁**：通过加锁机制，确保只有一个请求去数据库查询数据，缓存中的数据可以在请求期间重建。

**【3】缓存雪崩（Cache Avalanche）**:

缓存雪崩是指<span style="color: red;">**在同一时刻大量缓存过期或失效，导致大量请求直接访问数据库**</span>，最终造成数据库的压力过大，无法承载，系统可能出现崩溃。

**发生原因**：

- 缓存的过期时间过于集中，导致缓存同时过期。

- 配置不当的缓存策略或没有分布式缓存的协调，导致大量请求访问后端数据库。

**应对方案**：

- **避免缓存集中失效**：使用缓存的过期时间设置为随机值（例如，加上一些随机的时间范围），使得缓存过期时间不一致。

- **使用备用缓存（热点数据预热）**：对于重要数据，可以通过定时任务或者主动刷新策略提前预加载缓存，以避免数据库被打爆。

- **限流、降级机制**：使用熔断、限流、降级等策略，防止系统在数据库压力过大的时候还继续请求。

::: tip
对于 Redis 挂掉了，请求全部走数据库，也属于缓存雪崩，我们可以有以下思路进行解决：

**事发前**：实现 Redis 的高可用（主从架构+Sentinel 或者 Redis Cluster），尽可能避免 Redis 挂掉这种情况。

**事发中**：万一 Redis 真的挂了，我们可以设置本地缓存（ehcache）+ 限流（hystrix），尽量避免我们的数据库被干掉。

**事发后**：Redis 持久化，重启后自动从磁盘上加载数据，快速恢复缓存数据。
:::

**【4】缓存刷新（Cache Refresh）**：

缓存刷新是指缓存中的数据保持实时性的问题，需要保证缓存和数据库中的数据一致性或定期更新缓存数据。

**原因**：

- 缓存的更新和数据库中的数据不一致，可能会导致读取的缓存数据是过时的。

**应对方案**：

- **主动更新缓存**：在对数据库数据进行写操作时，主动删除缓存或更新缓存中的相关数据，保持一致性。

- **设置合理的缓存过期时间**：定期失效缓存，以促使系统进行数据刷新。

- **双写策略（写缓存与写数据库）**：对于需要更新数据的操作，可以使用 "先更新缓存再更新数据库" 或者 "先更新数据库再更新缓存" 等方式来确保缓存及时刷新。

- **定时刷新**：使用定时任务定期更新缓存数据，避免缓存内容过于陈旧。

## 五、Redis 的常用数据结构有哪些？

**String**

- 最常规的 set/get 操作，Value 可以是 String 也可以是数字。一般做一些复杂的计数功能的缓存。

**Hash**

- 这里 Value 存放的是结构化的对象，比较方便的就是操作其中的某个字段。我在做单点登录的时
  候，就是用这种数据结构存储用户信息，以 CookieId 作为 Key，设置 30 分钟为缓存过期时间，能
  很好的模拟出类似 Session 的效果。

**List**

- 使用 List 的数据结构，可以做简单的消息队列的功能。另外，可以利用 lrange 命令，做基于 Redis
  的分页功能，性能极佳，用户体验好。

**Set**

- 因为 Set 堆放的是一堆不重复值的集合。所以可以做全局去重的功能。我们的系统一般都是集群部
  署，使用 JVM 自带的 Set 比较麻烦。另外，就是利用交集、并集、差集等操作，可以计算共同喜
  好，全部的喜好，自己独有的喜好等功能。

**Sorted Set**

- Sorted Set 多了一个权重参数 Score，集合中的元素能够按 Score 进行排列。可以做排行榜应用，
  取 TOP(N) 操作。Sorted Set 可以用来做延时任务。

## 六、本地缓存与分布式缓存区别

**本地缓存的优势**是没有网络开销，在大并发量时用好本地缓存很重要；

**分布式缓存**比如 Redis 优势是能够无限扩容量和多个系统公用缓存数据，结合这个去在业务中使用缓存是很重要的。

**本地缓存的缺点**是会占用堆内存，影响垃圾回收、影响系统性能;

**分布式缓存**两大开销（网络延迟和对象序列化）会导致其慢于本地缓存，同时也需要搭建分布式缓存系统。

**建议**：

- 进程内缓存适用于较小且频率可见的访问场景；

- 尤其适用于不变对象，对于较大且不可预见的访问，最好采用分布式缓存。

## 七、Redis 的线程模型

todo

## 八、Redis 的并发竞争问题如何解决

todo

## 八、了解 Redis 的事务吗？

todo

## 九、Redis 的选举算法和流程是怎样的

todo

## 十、Redis 的持久化的机制

todo

## 十一、什么是缓存预热？

新的缓存系统没有任何数据，在缓存重建数据的过程中，系统性能和数据负载都不太好，所以最好在系统上线之前就把缓存的热点数据加载到缓存中，这种缓存预加载手段就是缓存预热。

## 十二、什么是缓存热备？

缓存热备既当一个缓存服务器不可用时能实时切换到备用缓存服务器，不影响缓存使用。集群模式下，每个主节点都会有一个或多个从节点备用，一旦主节点挂掉，从节点会被哨兵提升为主节点使用。

## 十三、Redis 集群问题总结

### 1、Redis 集群分类

![img.png](../assets/interview/cluster-diff.png)

### 2、Redis 集群如何搭建？

#### 主从模式方案

![img.png](../assets/interview/master-slave.png)

- 部署实测：todo

#### 哨兵模式方案：

![img.png](../assets/interview/sentinel.png)

- 部署实测：todo

#### 集群模式方案：

![img.png](../assets/interview/redis-cluster.png)

- 部署实测：[三台 Centos7.9 中 Docker 部署 Redis 集群模式](https://blog.csdn.net/weixin_43108539/article/details/145098017)

## 十四、Redis 集群同步数据

todo

## 十五、Reids 的主从复制机制原理

todo

## 十六、知道哪些 Redis 的优化操作

## 十七、怎么使用 Redis 实现消息队列？

## 十八、Redis 的热 Key 问题如何解决?

> 参考代码：[https://gitee.com/jd-platform-opensource/hotkey](https://gitee.com/jd-platform-opensource/hotkey)

## 十九、Redis 的大 Key 问题如何解决?

## 二十、Redis 6.x 为什么要引入多线程?
