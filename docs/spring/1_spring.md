# Spring

::: warning Todo
以下只是基础大纲，后续需要持续增加内容
:::

## 一、Spring IOC - 控制反转与依赖注入

### 1、 Spring 容器初始化流程

- **Spring 容器概述**
    - `BeanFactory` vs `ApplicationContext` 区别与应用场景

- **核心初始化方法解析**
    - `refresh()` 全流程解析
        - `prepareRefresh()` —— 容器启动准备
        - `obtainFreshBeanFactory()` —— 创建 BeanFactory
        - `registerBeanPostProcessors()` —— 注册扩展处理器
        - `finishBeanFactoryInitialization()` —— 初始化单例 Bean
        - `finishRefresh()` —— 发布事件

### 2、 Bean 的生命周期解析

- **Spring Bean 的完整生命周期**
    - 实例化前 —— `InstantiationAwareBeanPostProcessor`
    - 初始化阶段 —— `BeanPostProcessor`
    - 初始化后 —— `SmartInitializingSingleton`、`InitializingBean`
    - 销毁阶段 —— `DisposableBean`、`@PreDestroy`

### 3、依赖注入原理

- **注入方式解析**
    - 构造函数注入 vs Setter 注入
    - `@Autowired`、`@Resource`、`@Qualifier` 注解解析
    - `AutowiredAnnotationBeanPostProcessor` 执行流程
    - `@Lazy` 懒加载实现原理

## 二、Spring AOP - 面向切面编程

### 1、动态代理原理

- **JDK 动态代理 vs CGLIB 代理** 区别与源码解析
    - `ProxyFactory`、`AdvisedSupport` 核心类解析
    - **判断代理方式**：`JdkDynamicAopProxy` vs `CglibAopProxy`

### 2、切面注解解析

- `@Aspect`、`@Pointcut`、`@Before`、`@After`、`@Around` 注解执行流程
    - `AnnotationAwareAspectJAutoProxyCreator` 完整解析
    - `AspectJExpressionPointcut` 切入点解析

### 3、拦截链执行流程

- `ReflectiveMethodInvocation.proceed()` 拦截链执行原理
- `Advisor`、`Interceptor`、`Advice` 关键类解读
- `ExposeInvocationInterceptor` 解决嵌套代理问题

## 三、Design - 核心设计模式解析

### 1、 Spring 三级缓存原理

- **为什么需要三级缓存？**
    - 解决循环依赖的问题

- **三级缓存结构解析**
    - 一级缓存：`singletonObjects`（存放完整单例对象）
    - 二级缓存：`earlySingletonObjects`（半成品对象）
    - 三级缓存：`singletonFactories`（工厂对象，用于创建代理）

- **getSingleton()` 执行流程**
    - 创建 Bean -> 提前曝光 -> 代理增强 -> 完成实例化

### 2、数据类型转换工厂设计实现

- **Spring 类型转换机制解析**
    - `ConversionService`、`GenericConversionService` 核心类解析
    - `Converter`、`ConverterFactory`、`GenericConverter` 区别

- **自定义数据转换工厂实现**
    - 手写 `String -> LocalDateTime` 转换器
    - 自定义 `@Component` 转换器注册到容器

## 四、Spring 高级特性解析

### 1、Spring 事件机制

- **Spring 内置事件**
    - `ContextRefreshedEvent`、`ContextClosedEvent`、`RequestHandledEvent`

- **自定义事件与监听器**
    - `ApplicationEvent`、`ApplicationListener`、`EventMulticaster` 核心类解析

### 2、Spring 事务管理

- **事务管理实现原理**
    - `@Transactional` 注解解析
    - `TransactionManager`、`TransactionInterceptor` 执行流程
    - 事务传播机制、事务回滚实现细节

### 3、Spring 扩展点解析

- **BeanFactory 扩展点**
    - `BeanPostProcessor`、`BeanFactoryPostProcessor`、`InstantiationAwareBeanPostProcessor`
    - `FactoryBean`、`SmartInitializingSingleton`

- **自定义 Starter 实现**
    - 自定义 `@EnableXXX` 注解
    - `ImportSelector`、`ImportBeanDefinitionRegistrar` 实现原理



