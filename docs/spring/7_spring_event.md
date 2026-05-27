# Spring 事件机制

> 参考资料：
> * Spring 官方文档 - Events：[https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html#context-functionality-events](https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html#context-functionality-events)
> * Spring Events 实战：[https://www.baeldung.com/spring-events](https://www.baeldung.com/spring-events)

## 一、核心概念

Spring 事件机制基于**观察者模式**，用于模块间解耦：发布方不需要知道谁在监听，监听方不需要感知发布方。

核心角色：
- **ApplicationEvent**：事件对象
- **ApplicationEventPublisher**：发布器（ApplicationContext 实现了此接口）
- **ApplicationListener / @EventListener**：监听器

## 二、使用方式

```java
// 1. 定义事件
public class OrderCreatedEvent extends ApplicationEvent {
    private final Long orderId;
    public OrderCreatedEvent(Object source, Long orderId) {
        super(source);
        this.orderId = orderId;
    }
}

// 2. 发布事件
@Service
public class OrderService {
    @Autowired
    private ApplicationEventPublisher publisher;

    public void createOrder() {
        // 业务逻辑...
        publisher.publishEvent(new OrderCreatedEvent(this, orderId));
    }
}

// 3. 监听事件
@Component
public class EmailListener {
    @EventListener
    public void onOrderCreated(OrderCreatedEvent event) {
        // 发送邮件通知
    }
}
```

## 三、同步 vs 异步

默认**同步**：事件处理在发布线程中执行，处理完才继续。

开启异步：

```java
@EventListener
@Async  // 需要 @EnableAsync
public void onOrderCreated(OrderCreatedEvent event) { ... }
```

## 四、事务事件

`@TransactionalEventListener` 可以绑定事务阶段，避免事务未提交就执行监听逻辑：

```java
@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
public void onOrderCreated(OrderCreatedEvent event) {
    // 事务提交后才执行，避免数据库数据还未落盘就发消息
}
```

> [!warning]
> 待补充
