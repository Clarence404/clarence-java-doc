# 服务注册与发现

> 参考资料：
> * Nacos 官方文档：[https://nacos.io/zh-cn/docs/what-is-nacos.html](https://nacos.io/zh-cn/docs/what-is-nacos.html)
> * Consul 文档：[https://developer.hashicorp.com/consul/docs](https://developer.hashicorp.com/consul/docs)
> * Eureka：[https://github.com/Netflix/eureka](https://github.com/Netflix/eureka)

---

## 一、为什么需要服务注册与发现

微服务架构中，服务实例的 IP 和端口动态变化，不能再用硬编码地址调用。服务注册与发现解决了服务的**自动上下线**和**地址动态感知**问题。

## 二、核心概念

| 概念 | 说明 |
|------|------|
| 注册中心 | 统一存储服务地址信息的中央仓库 |
| 服务注册 | 服务启动时向注册中心上报自己的地址 |
| 服务发现 | 调用方从注册中心查询目标服务地址 |
| 健康检查 | 注册中心定期探测服务存活状态，自动剔除故障实例 |

## 三、主流方案对比

| 组件 | 厂商 | 特点 |
|------|------|------|
| Nacos | 阿里 | 注册 + 配置二合一，国内主流 |
| Eureka | Netflix | AP 模型，Spring Cloud 原生集成 |
| Consul | HashiCorp | 支持多数据中心，CP 模型 |
| etcd | CoreOS | Kubernetes 内置，强一致性 |

> [!warning]
> 待补充
