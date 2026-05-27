# Spring AOP 深度

> 参考资料：
> * Spring 官方文档 - AOP：[https://docs.spring.io/spring-framework/reference/core/aop.html](https://docs.spring.io/spring-framework/reference/core/aop.html)
> * JDK 动态代理 vs CGLIB：[https://www.baeldung.com/spring-aop-vs-aspectj](https://www.baeldung.com/spring-aop-vs-aspectj)

## 一、核心概念

| 概念 | 说明 |
|------|------|
| Aspect（切面） | 横切关注点的模块化，包含切点 + 通知 |
| JoinPoint（连接点） | 程序执行过程中的某个点，Spring AOP 中特指方法执行 |
| Pointcut（切点） | 定义在哪些 JoinPoint 上织入，用表达式描述 |
| Advice（通知） | 在切点处执行的动作（前置 / 后置 / 环绕等） |
| Weaving（织入） | 把切面应用到目标对象的过程 |

## 二、通知类型

| 类型 | 注解 | 执行时机 |
|------|------|---------|
| 前置通知 | `@Before` | 方法执行前 |
| 后置通知 | `@After` | 方法执行后（无论是否异常） |
| 返回通知 | `@AfterReturning` | 方法正常返回后 |
| 异常通知 | `@AfterThrowing` | 方法抛出异常后 |
| 环绕通知 | `@Around` | 方法前后，最强大，可控制是否执行 |

## 三、JDK 动态代理 vs CGLIB

| 对比 | JDK 动态代理 | CGLIB |
|------|------------|-------|
| 原理 | 实现目标接口，生成代理类 | 继承目标类，生成子类 |
| 要求 | 目标必须有接口 | 目标类不能是 final |
| 性能 | 调用略慢（反射） | 调用较快（字节码） |
| Spring 默认 | 有接口时使用 | 无接口或强制时使用 |

> Spring Boot 2.x 起默认使用 CGLIB（`spring.aop.proxy-target-class=true`）

## 四、切点表达式

```java
// 匹配 service 包下所有类的所有方法
@Pointcut("execution(* com.example.service.*.*(..))")

// 匹配带有某注解的方法
@Pointcut("@annotation(com.example.annotation.Log)")

// 匹配某个 Bean 的所有方法
@Pointcut("bean(userService)")
```

## 五、AOP 与事务的关系

Spring 事务（`@Transactional`）底层就是 AOP：
- TransactionInterceptor 是一个 MethodInterceptor（环绕通知）
- 目标方法执行前开启事务，执行后提交，异常时回滚

> ⚠️ 同类内方法调用不走代理，`@Transactional` 会失效。

> [!warning]
> 待补充
