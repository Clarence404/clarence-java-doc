# Spring 事务管理

> 参考资料：
> * Spring 官方文档 - Transaction：[https://docs.spring.io/spring-framework/reference/data-access/transaction.html](https://docs.spring.io/spring-framework/reference/data-access/transaction.html)
> * 事务失效场景：[https://www.baeldung.com/spring-transactional-propagation-isolation](https://www.baeldung.com/spring-transactional-propagation-isolation)

## 一、7 种传播行为

| 传播行为 | 说明 |
|---------|------|
| REQUIRED | 默认。有事务则加入，没有则新建 |
| REQUIRES_NEW | 始终新建事务，挂起当前事务 |
| NESTED | 嵌套事务，内层回滚不影响外层 |
| SUPPORTS | 有事务则加入，没有则以非事务执行 |
| NOT_SUPPORTED | 以非事务执行，挂起当前事务 |
| MANDATORY | 必须在已有事务中执行，否则抛异常 |
| NEVER | 不允许在事务中执行，否则抛异常 |

## 二、4 种隔离级别

| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
|---------|------|----------|------|
| READ_UNCOMMITTED | ✅ | ✅ | ✅ |
| READ_COMMITTED | ❌ | ✅ | ✅ |
| REPEATABLE_READ | ❌ | ❌ | ✅ |
| SERIALIZABLE | ❌ | ❌ | ❌ |

> MySQL 默认 REPEATABLE_READ，通过 MVCC 解决幻读问题。

## 三、@Transactional 使用

```java
@Transactional(
    propagation = Propagation.REQUIRED,
    isolation = Isolation.DEFAULT,
    rollbackFor = Exception.class,   // 默认只回滚 RuntimeException
    timeout = 30
)
public void doSomething() { }
```

## 四、事务失效的常见场景 ⚠️

| 场景 | 原因 |
|------|------|
| 同类内方法调用 | 不走代理，AOP 失效 |
| 方法非 public | Spring AOP 不代理非 public 方法 |
| 异常被 catch 吞掉 | Spring 感知不到异常，不回滚 |
| 抛出 checked 异常 | 默认只回滚 RuntimeException |
| 多线程调用 | 事务绑定线程，子线程不在同一事务 |
| 数据库不支持事务 | 如 MyISAM 引擎 |
| Bean 未被 Spring 管理 | new 出来的对象没有代理 |

> [!warning]
> 待补充
