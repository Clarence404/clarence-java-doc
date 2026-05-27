# Spring WebFlux

> 参考资料：
> * 官方文档：[https://docs.spring.io/spring-framework/reference/web/webflux.html](https://docs.spring.io/spring-framework/reference/web/webflux.html)
> * Project Reactor：[https://projectreactor.io/docs/core/release/reference/](https://projectreactor.io/docs/core/release/reference/)

## 一、响应式编程基础

**响应式编程**：基于异步数据流的编程范式，通过非阻塞的方式处理数据，适合高并发、I/O 密集型场景。

核心思想：**数据流 + 变化传播**，订阅者订阅数据流，数据到来时自动触发回调。

## 二、Mono 与 Flux

| 类型 | 说明 | 类比 |
|------|------|------|
| `Mono<T>` | 0 或 1 个元素的异步序列 | 单个结果，类似 `CompletableFuture<T>` |
| `Flux<T>` | 0 到 N 个元素的异步序列 | 集合结果，类似 `Stream<T>` 但异步 |

```java
// Mono 示例
Mono<User> user = userRepository.findById(1L);

// Flux 示例
Flux<User> users = userRepository.findAll();

// 链式操作
Flux.range(1, 10)
    .filter(i -> i % 2 == 0)
    .map(i -> i * 10)
    .subscribe(System.out::println);
```

## 三、Spring MVC vs Spring WebFlux

| 对比 | Spring MVC | Spring WebFlux |
|------|-----------|----------------|
| 线程模型 | 每请求一线程（阻塞） | 少量线程处理大量请求（非阻塞） |
| 编程模型 | 命令式 | 声明式 / 函数式 |
| 底层容器 | Tomcat / Jetty | Netty / Undertow |
| 学习曲线 | 低 | 高 |
| 适用场景 | 常规业务系统 | 高并发 I/O 密集、网关、流处理 |

## 四、两种编程模型

**注解模型**（和 Spring MVC 写法接近）：
```java
@RestController
public class UserController {
    @GetMapping("/user/{id}")
    public Mono<User> getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}
```

**函数式路由模型**：
```java
@Bean
public RouterFunction<ServerResponse> routes(UserHandler handler) {
    return RouterFunctions.route()
        .GET("/user/{id}", handler::getUser)
        .POST("/user", handler::createUser)
        .build();
}
```

## 五、适用场景

- ✅ API 网关（大量并发转发）
- ✅ 实时数据推送（SSE / WebSocket）
- ✅ 微服务间大量异步调用
- ❌ 传统 CRUD 业务系统（引入复杂度，收益低）
- ❌ 团队对响应式编程不熟悉时

> [!warning]
> 待补充



