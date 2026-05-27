# 配置管理

> 参考资料：
> * Spring Boot 外部化配置：[https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config)

## 一、application.yml 配置

- 配置文件加载优先级（命令行 > 环境变量 > 外部文件 > 内部文件）
- YAML 多文档块（`---` 分隔符）
- `@Value` 注入单个属性
- `@ConfigurationProperties` 绑定配置对象

## 二、多环境 Profiles

- `spring.profiles.active` 激活指定环境
- `application-dev.yml` / `application-prod.yml` 分环境配置
- `@Profile` 注解按环境加载 Bean

## 三、加密配置

- Jasypt 加密敏感配置项
- Spring Cloud Config / Vault 密钥管理（详见微服务模块）

> [!warning]
> 待补充
