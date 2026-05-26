# Spring Security

::: warning Todo
以下只是基础大纲，后续需要持续增加内容
:::

## 第一阶段：整体架构梳理

1. Spring Security 的核心架构
    - Security Filter Chain 整体流程
    - 核心组件调用链路（请求进入 -> 认证 -> 授权 -> 退出）

2. 核心组件概览
    - SecurityFilterChain
    - AuthenticationManager
    - UserDetailsService
    - GrantedAuthority
    - AccessDecisionManager

## 第二阶段：认证流程源码解析

1. 核心流程拆解
    - DelegatingFilterProxy 接管 Spring MVC 的过滤器链
    - SecurityFilterChain 过滤器链初始化
    - UsernamePasswordAuthenticationFilter 表单登录过滤器解析

2. 认证管理核心组件
    - AuthenticationManager 顶层认证接口
    - ProviderManager 组合认证提供者
    - DaoAuthenticationProvider 核心密码认证流程
    - UserDetailsService 用户数据加载流程

3. 认证成功与失败处理
    - AuthenticationSuccessHandler / AuthenticationFailureHandler
    - SecurityContextHolder 上下文存储

## 第三阶段：授权流程源码解析

1. 授权流程拆解
    - FilterSecurityInterceptor 授权流程
    - AccessDecisionManager 三种决策模式
    - SecurityMetadataSource 权限资源加载过程
    - RoleVoter / WebExpressionVoter 投票器解析

2. 注解解析
    - MethodSecurityInterceptor 方法级别权限校验
    - SpEL 表达式解析

## 第四阶段：扩展与自定义

1. 自定义认证流程
    - 自定义 AuthenticationToken
    - 自定义 AuthenticationProvider

2. 自定义授权流程
    - 自定义 AccessDecisionManager
    - 自定义 SecurityMetadataSource

3. 扩展安全功能
    - JWT 无状态登录认证流程
    - OAuth2 授权服务器与资源服务器解析

## 第五阶段：实战项目结合

1. 企业微信 OAuth2 单点登录流程解析
2. 多租户权限管理扩展
3. 前后端分离项目 JWT & 动态权限加载方案

