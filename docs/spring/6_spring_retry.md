# Spring Retry

> 参考资料：
> * GitHub：[https://github.com/spring-projects/spring-retry](https://github.com/spring-projects/spring-retry)
> * Spring Retry 实战：[https://www.baeldung.com/spring-retry](https://www.baeldung.com/spring-retry)

## 一、快速使用

```java
// 启动类加 @EnableRetry
@EnableRetry
@SpringBootApplication
public class App { }

// 方法上加 @Retryable
@Retryable(
    retryFor = RemoteCallException.class,
    maxAttempts = 3,                         // 最多重试 3 次
    backoff = @Backoff(delay = 1000, multiplier = 2)  // 退避策略：1s, 2s, 4s
)
public String callRemoteService() { ... }

// 所有重试耗尽后的兜底方法
@Recover
public String recover(RemoteCallException e) {
    return "fallback result";
}
```

## 二、退避策略

| 参数 | 说明 |
|------|------|
| delay | 首次重试等待时间（ms） |
| multiplier | 每次重试等待时间的倍数（指数退避） |
| maxDelay | 最大等待时间上限（ms） |
| random | 是否在等待时间上加随机抖动 |

## 三、适用场景

- 远程 HTTP 接口调用（网络抖动）
- 数据库乐观锁失败重试
- 消息队列消费失败重试
- 外部服务偶发超时

> ⚠️ 不适合用于业务逻辑错误（如参数校验失败），重试无意义。

> [!warning]
> 待补充
