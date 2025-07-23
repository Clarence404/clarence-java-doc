# 一、单例模式

**作用**：保证类在 JVM 中只有一个实例，避免重复创建对象，节省资源。

**应用场景**：

- Spring Bean 默认是单例的
- 数据库连接池（HikariCP、Druid）
- Redis、线程池、日志管理（Logback）

> 参考代码：<RouteLink to="/interview/0_java#十二、写出几种单例模式实现">单例模式的几种实现</RouteLink>