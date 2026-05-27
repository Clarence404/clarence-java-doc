# 自定义 Starter

> 参考资料：
> * Spring Boot Starter 开发指南：[https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.developing-auto-configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.developing-auto-configuration)

## 一、Starter 项目结构

```
my-spring-boot-starter/
├── my-spring-boot-autoconfigure/   自动配置模块
│   └── src/main/resources/
│       └── META-INF/spring.factories
└── my-spring-boot-starter/         依赖聚合模块（只有 pom.xml）
```

## 二、实现步骤

1. 创建 `XxxProperties` 配置属性类（`@ConfigurationProperties`）
2. 创建核心功能 Bean
3. 创建 `XxxAutoConfiguration`（`@Configuration` + `@ConditionalOnXxx`）
4. 在 `spring.factories` 中注册自动配置类
5. 打包发布（本地 Maven / 私有仓库）

## 三、条件控制最佳实践

- `@ConditionalOnMissingBean`：允许用户覆盖默认 Bean
- `@ConditionalOnProperty`：通过配置项开关功能
- `@AutoConfigureAfter` / `@AutoConfigureBefore`：控制加载顺序

## 四、实战案例

- 手写 `RedisCacheStarter`：封装 RedisTemplate 默认配置

> [!warning]
> 待补充
