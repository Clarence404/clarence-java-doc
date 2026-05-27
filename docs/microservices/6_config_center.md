# 配置中心

> 参考资料：
> * Nacos 配置管理：[https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html](https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html)
> * Apollo：[https://www.apolloconfig.com/](https://www.apolloconfig.com/)

---

## 一、为什么需要配置中心

传统应用将配置写在文件或代码中，变更需要重新打包部署。配置中心解决：
- **动态刷新**：不重启服务即可生效
- **环境隔离**：dev / test / prod 配置分离
- **集中管理**：所有服务配置统一维护、审计

## 二、主流方案对比

| 组件 | 特点 |
|------|------|
| Nacos Config | 与注册中心一体化，轻量简单 |
| Apollo | 配置分组、灰度发布、权限管控完善，适合复杂场景 |
| Spring Cloud Config | Spring 原生，依赖 Git，功能相对基础 |

> [!warning]
> 待补充
