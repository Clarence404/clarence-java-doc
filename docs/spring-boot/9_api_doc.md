# 接口文档

> 参考资料：
> * SpringDoc OpenAPI：[https://springdoc.org/](https://springdoc.org/)
> * Swagger UI：[https://swagger.io/tools/swagger-ui/](https://swagger.io/tools/swagger-ui/)
> * Knife4j：[https://doc.xiaominfo.com/](https://doc.xiaominfo.com/)

## 一、主流方案对比

| 方案 | 说明 | 推荐程度 |
|------|------|---------|
| SpringDoc + Swagger UI | Spring Boot 3.x 官方推荐 | ⭐⭐⭐ |
| Knife4j | SpringDoc 增强版，UI 更友好 | ⭐⭐⭐ |
| Springfox（已停更） | 老项目常见，不推荐新项目使用 | ⭐ |

## 二、SpringDoc 集成

> 依赖：`springdoc-openapi-starter-webmvc-ui`

### 2.1 常用注解

| 注解 | 作用 |
|------|------|
| `@Tag` | 接口分组描述（替代 `@Api`） |
| `@Operation` | 接口说明（替代 `@ApiOperation`） |
| `@Parameter` | 参数说明（替代 `@ApiParam`） |
| `@Schema` | 模型字段说明（替代 `@ApiModelProperty`） |

### 2.2 配置

- 访问路径：`/swagger-ui.html` 或 `/swagger-ui/index.html`
- 生产环境关闭：`springdoc.api-docs.enabled=false`
- 接口分组：`GroupedOpenApi`

## 三、Knife4j 集成

> 依赖：`knife4j-openapi3-jakarta-spring-boot-starter`

- 访问路径：`/doc.html`
- 支持离线文档导出（Markdown / Word）
- 支持接口调试、Mock 数据

> [!warning]
> 待补充
