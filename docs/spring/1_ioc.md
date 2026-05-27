# Spring IoC 容器深度

> 参考资料：
> * Spring 官方文档 - Core：[https://docs.spring.io/spring-framework/reference/core/beans.html](https://docs.spring.io/spring-framework/reference/core/beans.html)
> * 三级缓存解循环依赖：[https://www.cnblogs.com/askforhelp/p/13673819.html](https://www.cnblogs.com/askforhelp/p/13673819.html)

## 一、IoC 与 DI

**IoC（控制反转）**：对象的创建和依赖关系不再由代码控制，交给 Spring 容器管理。

**DI（依赖注入）**：IoC 的具体实现方式，容器在创建对象时主动注入依赖。

| 注入方式 | 写法 | 推荐度 |
|---------|------|--------|
| 构造器注入 | `@RequiredArgsConstructor` | ✅ 推荐，不可变、便于测试 |
| Setter 注入 | `@Autowired` on setter | 可选依赖时使用 |
| 字段注入 | `@Autowired` on field | ❌ 不推荐，难以测试 |

## 二、Bean 作用域

| Scope | 说明 |
|-------|------|
| singleton | 默认，容器中唯一实例 |
| prototype | 每次获取创建新实例 |
| request | 每次 HTTP 请求一个实例 |
| session | 每个 HttpSession 一个实例 |

## 三、Bean 生命周期

```
实例化
  → 属性填充（依赖注入）
  → Aware 接口回调（BeanNameAware / ApplicationContextAware ...）
  → BeanPostProcessor#postProcessBeforeInitialization
  → 初始化（@PostConstruct → InitializingBean#afterPropertiesSet → init-method）
  → BeanPostProcessor#postProcessAfterInitialization  ← AOP 代理在此生成
  → 使用
  → 销毁（@PreDestroy → DisposableBean#destroy → destroy-method）
```

## 四、核心扩展点

| 扩展点 | 触发时机 | 典型用途 |
|--------|---------|---------|
| BeanDefinitionRegistryPostProcessor | Bean 定义注册后 | 动态注册 BeanDefinition（MyBatis Mapper 扫描） |
| BeanFactoryPostProcessor | Bean 实例化前 | 修改 BeanDefinition（PropertySourcesPlaceholderConfigurer） |
| BeanPostProcessor | 初始化前后 | 生成 AOP 代理、注入自定义逻辑 |
| Aware 接口系列 | 属性填充后 | 获取 BeanFactory / ApplicationContext 等容器对象 |

## 五、三级缓存解循环依赖

Spring 用三级缓存解决**单例 Bean 的 setter 循环依赖**：

| 缓存 | 数据结构 | 存放内容 |
|------|---------|---------|
| 一级 singletonObjects | ConcurrentHashMap | 完整的成品 Bean |
| 二级 earlySingletonObjects | HashMap | 早期暴露的 Bean（未完成属性填充） |
| 三级 singletonFactories | HashMap | ObjectFactory，用于生成早期引用（支持 AOP） |

**流程**：A 依赖 B，B 依赖 A → A 实例化后先放入三级缓存 → 注入 B 时 B 从三级缓存拿到 A 的早期引用 → B 完成初始化 → A 完成注入。

> ⚠️ 构造器循环依赖、prototype 循环依赖均无法解决。

> [!warning]
> 待补充
