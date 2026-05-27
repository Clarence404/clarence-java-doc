# Web 开发

> 参考资料：
> * Spring MVC 文档：[https://docs.spring.io/spring-framework/docs/current/reference/html/web.html](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html)
> * Bean Validation：[https://beanvalidation.org/](https://beanvalidation.org/)

## 一、Spring MVC 核心

### 1.1 控制器与路由

- `@RestController` vs `@Controller`
- `@RequestMapping` / `@GetMapping` / `@PostMapping`
- `@PathVariable` / `@RequestParam` / `@RequestBody`
- `ResponseEntity` 返回值控制

### 1.2 拦截器与过滤器

| 对比 | Filter | Interceptor |
|------|--------|-------------|
| 规范 | Servlet 规范 | Spring MVC |
| 作用范围 | 所有请求 | DispatcherServlet 之后 |
| 获取 Spring Bean | 不方便 | 方便 |
| 典型场景 | 跨域、日志 | 登录校验、权限 |

### 1.3 统一异常处理

- `@ExceptionHandler` 方法级异常处理
- `@RestControllerAdvice` 全局异常处理
- 统一返回结构封装（`Result<T>`）

---

## 二、参数校验

### 2.1 常用注解

| 注解 | 说明 |
|------|------|
| `@NotNull` | 不能为 null |
| `@NotBlank` | 字符串不能为空 |
| `@Size` | 长度范围 |
| `@Min` / `@Max` | 数值范围 |
| `@Pattern` | 正则匹配 |
| `@Email` | 邮箱格式 |

### 2.2 分组校验 & 自定义校验器

- `@Validated(groups)` 分组校验
- 实现 `ConstraintValidator` 自定义校验注解

---

## 三、CORS 跨域配置

### 3.1 三种配置方式

**方式一：注解（单接口）**
```java
@CrossOrigin(origins = "https://example.com")
@GetMapping("/api/data")
public Result getData() { ... }
```

**方式二：全局配置（推荐）**
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

**方式三：Filter（网关 / 不用 Spring MVC 时）**
- 注册 `CorsFilter` Bean，适合 Spring Security 场景

### 3.2 常见问题

- 携带 Cookie 时 `allowedOrigins` 不能用 `*`，需换成 `allowedOriginPatterns`
- Spring Security 项目需在 Security 过滤链中额外配置 `.cors()`，否则 CORS 配置不生效

> [!warning]
> 待补充
