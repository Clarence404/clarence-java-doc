# Spring Boot

> 参考资料：
> * 官方文档：[https://docs.spring.io/spring-boot/docs/current/reference/html/](https://docs.spring.io/spring-boot/docs/current/reference/html/)
> * GitHub：[https://github.com/spring-projects/spring-boot](https://github.com/spring-projects/spring-boot)

## 一、Spring Boot 启动流程

### 1.1 `SpringApplication.run()` 启动流程

- 创建 `SpringApplication` 对象
- 判断应用类型（`REACTIVE` / `SERVLET`）
- 加载 `ApplicationContext`
- 启动监听器，发布 `ApplicationStartingEvent`
- 加载环境变量（`Environment`）
- 执行初始化器 `ApplicationContextInitializer`
- 执行 Bean 定义加载
- 执行 `CommandLineRunner`、`ApplicationRunner`

### 1.2 `SpringFactoriesLoader` 自动装配机制

- `META-INF/spring.factories` 文件加载原理
- `SpringFactoriesLoader.loadFactoryNames()` 源码分析
- `@EnableAutoConfiguration` 生效流程
- 常见自动配置类解析（`DataSourceAutoConfiguration`、`RedisAutoConfiguration`）

### 1.3 核心注解

| 注解 | 作用 |
|------|------|
| `@SpringBootApplication` | 组合注解，包含下面三个 |
| `@Configuration` | 支持 `@Bean` 声明 |
| `@ComponentScan` | 扫描当前包路径及子包 |
| `@EnableAutoConfiguration` | 开启自动配置 |

---

## 二、自动配置原理

### 2.1 条件注解

| 注解 | 触发条件 |
|------|---------|
| `@ConditionalOnClass` | 指定 Class 存在于 classpath |
| `@ConditionalOnMissingBean` | 容器中不存在指定 Bean |
| `@ConditionalOnProperty` | 配置文件中属性满足条件 |
| `@ConditionalOnWebApplication` | 当前是 Web 环境 |

### 2.2 `@ConfigurationProperties` 属性绑定

- 支持对象层级绑定、松散绑定
- 支持 List / Map / 嵌套对象
- 结合 `@Validated` 做绑定校验
- `Binder` 手动绑定复杂属性

> [!warning]
> 待补充
