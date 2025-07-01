# Orm Frameworks

## 一、Mybatis

### 1、Mybatis的缓存机制

### 2、Mybatis分页原理

### 3、Mybatis工作原理

### 4、Mapper 接口的实现原理

### 5、MyBatis 执行器

### 6、MyBatis 实现自定义的 TypeHandler

在实际开发中，我们常常需要将数据库中的某些类型与 Java 对象之间进行复杂转换，例如：

* JSON 转 List 或 Map；
* 数据库存储枚举的 code 值，而 Java 中使用枚举类型；
* 特殊格式的字符串映射为 Java Bean 等。

MyBatis 提供了 `TypeHandler` 接口来支持自定义类型转换。

#### 核心接口

```java
public interface TypeHandler<T> {
    void setParameter(PreparedStatement ps, int i, T parameter, JdbcType jdbcType) throws SQLException;

    T getResult(ResultSet rs, String columnName) throws SQLException;

    T getResult(ResultSet rs, int columnIndex) throws SQLException;

    T getResult(CallableStatement cs, int columnIndex) throws SQLException;
}
```

#### 示例：JSON -> List 的转换

```java

@MappedTypes(List.class)
@MappedJdbcTypes(JdbcType.VARCHAR)
public class JacksonListTypeHandler<T> implements TypeHandler<List<T>> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    private final Class<T> elementType;

    public JacksonListTypeHandler(Class<T> elementType) {
        this.elementType = elementType;
    }

    @Override
    public void setParameter(PreparedStatement ps, int i, List<T> parameter, JdbcType jdbcType) throws SQLException {
        ps.setString(i, objectMapper.writeValueAsString(parameter));
    }

    @Override
    public List<T> getResult(ResultSet rs, String columnName) throws SQLException {
        String json = rs.getString(columnName);
        return parseJson(json);
    }

    @Override
    public List<T> getResult(ResultSet rs, int columnIndex) throws SQLException {
        String json = rs.getString(columnIndex);
        return parseJson(json);
    }

    @Override
    public List<T> getResult(CallableStatement cs, int columnIndex) throws SQLException {
        String json = cs.getString(columnIndex);
        return parseJson(json);
    }

    private List<T> parseJson(String json) throws SQLException {
        try {
            JavaType javaType = objectMapper.getTypeFactory().constructCollectionType(List.class, elementType);
            return objectMapper.readValue(json, javaType);
        } catch (Exception e) {
            throw new SQLException("Failed to convert JSON to List<" + elementType.getSimpleName() + ">", e);
        }
    }
}
```

#### 注册方式

1. **XML 配置注册**

```xml

<typeHandlers>
    <typeHandler handler="com.example.handler.JacksonListTypeHandler"/>
</typeHandlers>
```

2. **注解注册**

```java
@TableField(typeHandler = JacksonListTypeHandler.class)
private List<JAVA-OBJECT>failureReason;
```

#### 进阶源码

Mybatis-plus的处理方案：[https://baomidou.com/guides/type-handler/](https://baomidou.com/guides/type-handler/)
---

### 7、MyBatis 拦截器和过滤器

MyBatis 拦截器是一种插件机制，可以在四大对象的方法执行前后进行拦截，常用于实现通用逻辑（如 SQL 日志、加密解密、多租户等）。

#### 四大拦截目标对象

* Executor（执行器）：增删改查执行逻辑；
* ParameterHandler：参数处理逻辑；
* ResultSetHandler：结果集处理；
* StatementHandler：SQL 预处理逻辑。

#### 自定义拦截器示例：打印执行 SQL 和耗时

```java

@Intercepts({
        @Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class}),
        @Signature(type = Executor.class, method = "query", args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class})
})
public class SqlLogInterceptor implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return invocation.proceed();
        } finally {
            MappedStatement ms = (MappedStatement) invocation.getArgs()[0];
            Object param = invocation.getArgs()[1];
            String sqlId = ms.getId();
            BoundSql boundSql = ms.getBoundSql(param);
            String sql = boundSql.getSql().replaceAll("\\s+", " ");
            long cost = System.currentTimeMillis() - start;
            System.out.println("SQL ID: " + sqlId + ", Time: " + cost + "ms");
            System.out.println("SQL: " + sql);
        }
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this); // 包装目标对象
    }

    @Override
    public void setProperties(Properties properties) {
        // 可配置属性
    }
}
```

#### 注册方式

```xml

<plugins>
    <plugin interceptor="com.example.interceptor.SqlLogInterceptor"/>
</plugins>
```

或 Spring Boot 中配置：

```yaml
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  plugins:
    - com.example.interceptor.SqlLogInterceptor
```

## 二、Mybatis-plus

详细配置见：[Mybatis-官网](https://baomidou.com/)，此处不做赘述；

## 三、Hibernate

详细配置见：[Hibernate-官网](https://hibernate.org/)，此处不做赘述；
