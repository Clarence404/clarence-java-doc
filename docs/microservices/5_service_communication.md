# 服务间通信

> 参考资料：
> * gRPC 官方文档：[https://grpc.io/docs/](https://grpc.io/docs/)
> * OpenFeign：[https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/](https://docs.spring.io/spring-cloud-openfeign/docs/current/reference/html/)

---

## 一、同步通信：HTTP / RPC

### 1.1 REST HTTP 协议

**REST** 请求在微服务中是最为常用的一种通讯方式，它依赖于 **HTTP/HTTPS** 协议。**RESTful** 的特点是：

- 每一个 URI 代表 1 种资源
- 客户端使用 **GET、POST、PUT、DELETE** 等操作方式对服务端资源进行操作
- 客户端与服务端之间的交互在请求之间是无状态的

**举例说明**：服务提供方：

```java
@RestController
@RequestMapping("/communication")
public class RestControllerDemo {
    @GetMapping("/hello")
    public String s() {
        return "hello";
    }
}
```

服务调用方（RestTemplate）：

```java
@RestController
@RequestMapping("/demo")
public class RestDemo {
    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/hello2")
    public String s2() {
        String forObject = restTemplate.getForObject("http://localhost:9013/communication/hello", String.class);
        return forObject;
    }
}
```

### 1.2 RPC TCP 协议

**RPC（Remote Procedure Call）** 远程过程调用，让调用方像调用本地方法一样调用远程服务。工作流程：

1. 客户端调用语句，传送参数
2. 本地系统将请求通过网络发送给远程主机
3. 服务端接收并执行对应方法
4. 将结果原路返回给调用方

### 1.3 HTTP vs RPC 对比

| 对比项 | RPC | HTTP（REST） |
|--------|-----|-------------|
| 通信方式 | TCP / UDP / HTTP/2 | 仅 HTTP/HTTPS |
| 数据格式 | Protobuf 等二进制，性能高 | JSON / XML，可读性好 |
| 性能 | 高效，低延迟 | HTTP 头部开销较大 |
| 适用场景 | 微服务内部通信 | 对外 API、跨平台调用 |
| 代表框架 | gRPC、Dubbo、Thrift | Spring MVC、OpenFeign |

**结论：**
- 微服务**内部通信**优先考虑 RPC（如 gRPC）
- 对外提供**开放 API** 使用 HTTP REST

---

## 二、OpenFeign 声明式调用

> OpenFeign 是 Spring Cloud 提供的声明式 HTTP 客户端，简化微服务间的 REST 调用。

> [!warning]
> 待补充

---

## 三、gRPC

> Google 出品，基于 HTTP/2 + Protocol Buffers，跨语言、高性能。

> [!warning]
> 待补充

---

## 四、异步通信：消息中间件

常见消息中间件：Kafka、RocketMQ、RabbitMQ。适用于：
- 服务解耦
- 流量削峰
- 事件驱动架构

> 详见：[消息队列](../messaging/0_mq.md)
