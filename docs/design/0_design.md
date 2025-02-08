# 23种设计模式

## 设计模式简介

## 一、单例模式

**作用**：保证类在 JVM 中只有一个实例，避免重复创建对象，节省资源。

**应用场景**：
- Spring Bean 默认是单例的
- 数据库连接池（HikariCP、Druid）
- Redis、线程池、日志管理（Logback）

> 参考代码：<RouteLink to="/interview/0_java#十二、写出三种单例模式实现">单例模式的几种实现</RouteLink>

## 二、工厂模式

**作用**：通过工厂创建对象，解耦实例化过程，便于扩展。

**应用场景**：
- Spring BeanFactory / ApplicationContext（Spring IOC 容器）
- JDBC DriverManager.getConnection()
- 日志框架（Logback/SLF4J）

## 三、策略模式

**作用**：定义一组算法，让它们可以相互替换，提高代码灵活性。

**应用场景**：
- Spring Security 认证策略
- 支付方式选择（支付宝/微信支付）
- 日志格式化策略（JSON/XML）


## 四、责任链模式

**作用**：将请求沿着处理链传递，多个处理者可对其进行处理。

**应用场景**：
- Spring Security 过滤器（FilterChain）
- Netty 责任链（ChannelPipeline）
- 日志处理（不同级别日志）

## 未完待续
