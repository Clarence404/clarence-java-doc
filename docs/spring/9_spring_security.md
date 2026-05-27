# Spring Security

> 参考资料：
> * 官方文档：[https://docs.spring.io/spring-security/reference/](https://docs.spring.io/spring-security/reference/)
> * Spring Security JWT 实战：[https://www.baeldung.com/spring-security-oauth-jwt](https://www.baeldung.com/spring-security-oauth-jwt)

## 一、核心架构

Spring Security 本质是一条 **Servlet Filter Chain**，所有安全逻辑通过过滤器串联。

```
请求
  → DelegatingFilterProxy          （桥接 Spring 容器与 Servlet 容器）
    → FilterChainProxy
      → SecurityFilterChain        （过滤器链）
          UsernamePasswordAuthenticationFilter  认证
          BasicAuthenticationFilter
          ExceptionTranslationFilter            异常处理
          FilterSecurityInterceptor             授权
  → Controller
```

## 二、认证流程

```
请求携带凭证（用户名+密码 / Token）
  → AuthenticationFilter 提取凭证，封装为 Authentication 对象
  → AuthenticationManager（ProviderManager）
    → DaoAuthenticationProvider
      → UserDetailsService#loadUserByUsername  加载用户信息
      → PasswordEncoder#matches                校验密码
  → 认证成功 → SecurityContextHolder 存储认证信息
  → 认证失败 → AuthenticationFailureHandler
```

## 三、授权流程

```
已认证的请求
  → FilterSecurityInterceptor
    → SecurityMetadataSource  获取当前 URL 需要的权限
    → AccessDecisionManager   投票决策（AffirmativeBased / ConsensusBased / UnanimousBased）
      → RoleVoter / WebExpressionVoter
    → 授权通过 → 继续执行
    → 授权拒绝 → AccessDeniedException
```

## 四、核心组件

| 组件 | 职责 |
|------|------|
| SecurityContextHolder | 存储当前认证信息，默认 ThreadLocal |
| AuthenticationManager | 认证入口，委托给 ProviderManager |
| UserDetailsService | 加载用户信息（需自行实现） |
| PasswordEncoder | 密码加密与校验（推荐 BCryptPasswordEncoder） |
| SecurityFilterChain | 过滤器链配置入口 |

## 五、常用注解

| 注解 | 说明 |
|------|------|
| `@EnableWebSecurity` | 启用 Spring Security |
| `@EnableMethodSecurity` | 启用方法级别权限控制 |
| `@PreAuthorize` | 方法执行前校验权限，支持 SpEL |
| `@PostAuthorize` | 方法执行后校验返回值 |
| `@Secured` | 简单角色校验 |

```java
@PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
public User getUser(Long userId) { ... }
```

## 六、JWT 集成要点

前后端分离场景下，通常用 JWT 替代 Session：

1. 登录成功 → 生成 JWT → 返回给客户端
2. 后续请求 → 客户端携带 `Authorization: Bearer <token>`
3. 自定义 `OncePerRequestFilter` → 解析 JWT → 写入 SecurityContext
4. 不再需要 `UsernamePasswordAuthenticationFilter` 做 Session 管理

> [!warning]
> 待补充

