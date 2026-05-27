# Spring MVC

> 参考资料：
> * Spring 官方文档 - MVC：[https://docs.spring.io/spring-framework/reference/web/webmvc.html](https://docs.spring.io/spring-framework/reference/web/webmvc.html)
> * DispatcherServlet 源码分析：[https://www.baeldung.com/spring-dispatcherservlet](https://www.baeldung.com/spring-dispatcherservlet)

## 一、DispatcherServlet 请求处理流程

```
请求 → DispatcherServlet
  → HandlerMapping  查找对应 Handler（Controller 方法）
  → HandlerAdapter  执行 Handler
    → 参数解析（HandlerMethodArgumentResolver）
    → 调用 Controller 方法
    → 返回值处理（HandlerMethodReturnValueHandler）
  → ViewResolver     解析视图（REST 接口直接写响应体）
  → 响应
```

## 二、核心组件

| 组件 | 作用 |
|------|------|
| HandlerMapping | 请求 URL → Handler 的映射关系 |
| HandlerAdapter | 适配不同类型的 Handler 执行 |
| HandlerMethodArgumentResolver | 解析方法参数（@RequestParam / @RequestBody 等） |
| HttpMessageConverter | 请求体 / 响应体的序列化与反序列化 |
| ViewResolver | 视图名 → View 对象（前后端分离基本不用） |
| HandlerExceptionResolver | 统一异常处理 |

## 三、拦截器

```java
public class LoginInterceptor implements HandlerInterceptor {
    // 执行 Handler 前，返回 false 则中断
    public boolean preHandle(HttpServletRequest request, ...) { }
    // 执行 Handler 后（正常返回）
    public void postHandle(HttpServletRequest request, ...) { }
    // 视图渲染完成后（无论是否异常）
    public void afterCompletion(HttpServletRequest request, ...) { }
}
```

拦截器 vs 过滤器：
- **过滤器（Filter）**：Servlet 规范，在 DispatcherServlet 之前生效
- **拦截器（Interceptor）**：Spring MVC，能获取 Handler 信息，更细粒度

## 四、常用注解

| 注解 | 说明 |
|------|------|
| `@RequestMapping` | 映射请求路径，可细化为 @GetMapping / @PostMapping |
| `@RequestParam` | 获取查询参数 |
| `@PathVariable` | 获取路径变量 |
| `@RequestBody` | 获取请求体（JSON → 对象） |
| `@ResponseBody` | 返回值直接写入响应体 |
| `@RestController` | = @Controller + @ResponseBody |
| `@ExceptionHandler` | 方法级别异常处理 |
| `@ControllerAdvice` | 全局异常处理 / 全局数据绑定 |

> [!warning]
> 待补充
