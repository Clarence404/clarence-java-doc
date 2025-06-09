# Spring Boot

::: warning Todo
以下只是基础大纲，后续需要持续增加内容
:::

## 一、Spring Boot 启动流程

### 1、`SpringApplication.run()` 启动流程解析

- **启动入口** `SpringApplication.run()` 详解
    - 创建 `SpringApplication` 对象
    - 判断应用类型（`REACTIVE`、`SERVLET`）
    - 加载 `ApplicationContext`
    - **启动监听器** 发布 `ApplicationStartingEvent`
    - **加载 `ApplicationContext` 环境**（`Environment`）
    - **执行初始化器** `ApplicationContextInitializer`
    - **执行 `Bean` 定义加载**
    - **执行 `CommandLineRunner`、`ApplicationRunner`**

### 2、`SpringFactoriesLoader` 自动装配机制

- **`META-INF/spring.factories` 文件加载原理**
    - `SpringFactoriesLoader.loadFactoryNames()` 源码分析
    - **加载自动配置类**：`@EnableAutoConfiguration` 生效流程
    - **常见自动配置类源码解析**（`DataSourceAutoConfiguration`、`RedisAutoConfiguration`）

### 3、核心注解解析

- **`@SpringBootApplication`**
    - `@Configuration` — 支持 `@Bean` 声明
    - `@ComponentScan` — 扫描当前包路径及子包
    - `@EnableAutoConfiguration` — 开启自动配置

- **`@EnableAutoConfiguration`** 原理剖析
    - `AutoConfigurationImportSelector`
    - `@Conditional` 系列注解条件匹配

## 二、 Spring Boot 自动配置

### 1、条件注解原理

- **核心条件注解解析**
    - `@ConditionalOnClass` —— 判断 Class 是否存在
    - `@ConditionalOnMissingBean` —— 判断 Bean 是否已存在
    - `@ConditionalOnProperty` —— 判断配置文件中的属性值
    - `@ConditionalOnWebApplication` —— 判断是否 Web 环境

### 2、 自定义 Starter 模块实现

- **创建 Starter 项目基本结构**
    - `spring-boot-starter-xxx`（提供依赖）
    - `spring-boot-autoconfigure-xxx`（提供自动配置）

- **实现核心自动配置类**
    - 创建 `XXXAutoConfiguration` 配置类
    - 配置 `spring.factories` 注册

- **实战案例**：手写一个 `RedisCacheStarter` 自动配置 Starter

### 3、 自定义配置绑定

- **`@ConfigurationProperties`** 属性绑定原理
    - 支持对象层级绑定
    - 支持松散绑定、List、Map、嵌套对象
    - **绑定校验**（`@Validated`）

- **自定义属性绑定与注入**
    - 编写 `MyProperties`
    - `Binder` 手动绑定复杂属性

## 三、Spring Boot Actuator 监控

### 1、Actuator 核心功能介绍

- **启动 Actuator**
    - 引入 `spring-boot-starter-actuator`
    - 开启默认监控端点

- **默认提供的端点解析**
    - `health` — 健康检查
    - `info` — 应用信息
    - `metrics` — 运行指标（内存、CPU、线程）
    - `env` — 环境变量
    - `beans` — 查看 Bean 列表

### 2、自定义监控端点

- **创建自定义端点**
    - `@Endpoint` 自定义端点
    - `@ReadOperation`、`@WriteOperation` 支持 GET / POST
    - `@Selector` 动态路径参数

- **实战案例**：创建 `systemStats` 自定义监控端点
    - 输出 CPU、内存、磁盘使用率

### 3、 健康检查扩展

- **自定义健康检查状态**
    - 实现 `HealthIndicator`
    - 扩展 `Health` 状态详情

- **实战案例**：创建 `MySQLHealthIndicator` 检查数据库状态

### 4、 Prometheus 监控集成

- **暴露 Prometheus 端点**
    - `management.endpoints.web.exposure.include=prometheus`
    - 配置 Prometheus 拉取指标
    - Grafana 可视化展示

## 四、Spring Boot Web 特性解析

### 1、内嵌 Web 容器

- **Tomcat、Jetty、Undertow** 原理解析
    - 嵌入式 WebServer 启动流程
    - `ServletWebServerFactory` 自定义容器

### 2、Restful API 开发

- **`@RestController` vs `@Controller` 区别**
    - **参数绑定**：`@RequestParam`、`@PathVariable`、`@RequestBody`
    - **返回值解析**：`ResponseBodyAdvice`、`HandlerMethodArgumentResolver`

### 3、Spring Boot 异常处理

- **`@ExceptionHandler` 自定义异常处理**
    - 统一异常返回封装
    - `ErrorController` 自定义错误页面

