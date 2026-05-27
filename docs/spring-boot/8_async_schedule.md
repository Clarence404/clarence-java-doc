# 异步任务与定时任务

> 参考资料：
> * Spring 异步支持：[https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#scheduling](https://docs.spring.io/spring-framework/docs/current/reference/html/integration.html#scheduling)

## 一、异步任务 @Async

### 1.1 基本使用

- 启动类加 `@EnableAsync`
- 方法上加 `@Async` 即可异步执行
- 返回值：`void` / `Future<T>` / `CompletableFuture<T>`

### 1.2 线程池配置

- 默认使用 `SimpleAsyncTaskExecutor`（不推荐生产使用）
- 自定义 `ThreadPoolTaskExecutor` Bean
- 核心参数：核心线程数 / 最大线程数 / 队列容量 / 拒绝策略

### 1.3 异常处理

- 异步方法的异常不会传播到调用方
- 实现 `AsyncUncaughtExceptionHandler` 统一捕获

---

## 二、定时任务 @Scheduled

### 2.1 基本使用

- 启动类加 `@EnableScheduling`
- 方法上加 `@Scheduled` 配置触发规则

### 2.2 触发方式

| 属性 | 说明 | 示例 |
|------|------|------|
| `fixedRate` | 固定频率（毫秒） | 每 5 秒执行一次 |
| `fixedDelay` | 上次结束后延迟 | 结束后 5 秒再执行 |
| `cron` | Cron 表达式 | `0 0 2 * * ?` 每天 2 点 |

### 2.3 Cron 表达式

```
秒 分 时 日 月 周
0  0  2  *  *  ?   每天凌晨 2 点
0  */5 * *  *  ?   每 5 分钟
0  0  0  1  *  ?   每月 1 号
```

---

## 三、分布式定时任务

> Spring `@Scheduled` 在多实例部署时会重复执行，需引入分布式调度框架

| 框架 | 说明 |
|------|------|
| XXL-Job | 国内主流，可视化界面，易上手 |
| Elastic-Job | 当当出品，功能强大 |
| Quartz | 老牌框架，集群支持 |

> 详见：[分布式任务调度](/distributed/6_job_scheduler)

> [!warning]
> 待补充
