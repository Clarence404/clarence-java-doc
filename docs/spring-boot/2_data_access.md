# 数据访问

> 参考资料：
> * Spring Data JPA：[https://docs.spring.io/spring-data/jpa/docs/current/reference/html/](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
> * MyBatis-Plus：[https://baomidou.com/](https://baomidou.com/)
> * Spring 事务管理：[https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html](https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html)

## 一、ORM 框架选型

| 框架 | 风格 | 适用场景 |
|------|------|---------|
| Spring Data JPA | 声明式，自动生成 SQL | 标准 CRUD，快速开发 |
| MyBatis | 手写 SQL，灵活可控 | 复杂查询，性能敏感 |
| MyBatis-Plus | MyBatis 增强，内置 CRUD | 兼顾灵活与效率（国内主流） |

---

## 二、Spring Data JPA

> 依赖：`spring-boot-starter-data-jpa`

### 2.1 Repository 层次

```
Repository
└── CrudRepository          基础 CRUD
    └── PagingAndSortingRepository  分页排序
        └── JpaRepository   JPA 专属（推荐使用）
```

### 2.2 方法命名规则

- `findByUsername` → `WHERE username = ?`
- `findByAgeGreaterThan` → `WHERE age > ?`
- `findByNameAndStatus` → `WHERE name = ? AND status = ?`

### 2.3 自定义查询

- `@Query` 注解写 JPQL / 原生 SQL
- `@Modifying` + `@Transactional` 执行更新 / 删除

---

## 三、MyBatis / MyBatis-Plus

> 依赖：`mybatis-spring-boot-starter` / `mybatis-plus-spring-boot3-starter`

### 3.1 MyBatis 核心配置

- Mapper XML 与注解两种写法
- `#{}`（预编译）vs `${}`（字符串拼接，注意 SQL 注入）
- `resultMap` 处理复杂映射

### 3.2 MyBatis-Plus 常用功能

- `BaseMapper<T>` 内置 CRUD，零 XML
- `LambdaQueryWrapper` 类型安全的条件构造
- 自动填充：`@TableField(fill = INSERT)` 插入时自动填充创建时间
- 逻辑删除：`@TableLogic`
- 乐观锁：`@Version`

---

## 四、事务管理

### 4.1 @Transactional 核心属性

| 属性 | 说明 |
|------|------|
| `propagation` | 传播行为（默认 `REQUIRED`） |
| `isolation` | 隔离级别（默认数据库默认值） |
| `rollbackFor` | 指定回滚异常类型（建议写 `Exception.class`） |
| `readOnly` | 只读事务，查询性能优化 |

### 4.2 事务失效常见场景

- 方法非 `public`
- 同类内部调用（绕过代理）
- 异常被 `try-catch` 吞掉
- `rollbackFor` 未覆盖实际抛出的异常类型

---

## 五、多数据源

- `@Primary` 标注主数据源
- `@DS("slave")` 切换数据源（MyBatis-Plus dynamic-datasource）
- 多数据源事务注意事项：需引入分布式事务或手动管理

---

## 六、分页

- JPA：`Pageable` + `Page<T>`
- MyBatis-Plus：`Page<T>` + `IPage<T>`，内置分页插件

> [!warning]
> 待补充
