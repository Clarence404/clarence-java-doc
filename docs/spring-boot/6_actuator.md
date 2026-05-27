# Actuator 监控

> 参考资料：
> * Spring Boot Actuator：[https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html)

## 一、核心端点

> 依赖：`spring-boot-starter-actuator`

| 端点 | 说明 |
|------|------|
| `/actuator/health` | 健康检查 |
| `/actuator/info` | 应用信息 |
| `/actuator/metrics` | 运行指标（内存 / CPU / 线程） |
| `/actuator/env` | 环境变量 |
| `/actuator/beans` | 查看所有 Bean |
| `/actuator/loggers` | 动态调整日志级别 |

## 二、自定义端点

- `@Endpoint` 声明自定义端点
- `@ReadOperation` / `@WriteOperation` 支持 GET / POST
- `@Selector` 动态路径参数
- 实战：`systemStats` 端点输出 CPU / 内存 / 磁盘使用率

## 三、自定义健康检查

- 实现 `HealthIndicator` 接口
- 扩展 `Health` 状态详情
- 实战：`MySQLHealthIndicator` 检查数据库连通性

## 四、Prometheus + Grafana 集成

- 引入 `micrometer-registry-prometheus`
- 暴露 `/actuator/prometheus` 端点
- 配置 Prometheus 抓取规则
- Grafana Dashboard 可视化

> [!warning]
> 待补充
