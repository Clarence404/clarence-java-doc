# Lombok vs MapStruct

在 Java 开发中，**Lombok** 和 **MapStruct** 都是用于简化代码编写、提升开发效率的工具，但它们解决的问题不完全相同。
本节将对两者进行对比分析，并结合实际开发场景提供建议。

---

## 一、Lombok

- **官网地址**：[https://projectlombok.org/](https://projectlombok.org/)
- **GitHub 地址**：[https://github.com/projectlombok/lombok](https://github.com/projectlombok/lombok)

### 1. 简介

Lombok 是一个通过注解的方式自动生成 Java 类中常见的样板代码（如 getter/setter、构造方法、equals/hashCode、toString 等）的库。

### 2. 常用注解

- `@Getter` / `@Setter`：自动生成 getter/setter 方法
- `@ToString`：自动生成 `toString` 方法
- `@EqualsAndHashCode`：自动生成 `equals` 和 `hashCode`
- `@Data`：包含 `@Getter`、`@Setter`、`@ToString`、`@EqualsAndHashCode` 和 `@RequiredArgsConstructor`
- `@Builder`：支持构建者模式
- `@Slf4j`：自动注入日志对象 `log`

### 3. 优点

- 极大减少样板代码，提高开发效率
- 支持多种日志注解
- 与 IDE 集成良好（需安装插件）

### 4. 缺点

- 编译期注解，生成代码不可见，对调试不友好
- 可能增加项目的隐式复杂度，影响代码可读性
- 某些场景可能与框架（如 MapStruct）存在兼容性问题

---

## 二、MapStruct

- **官网地址**：[https://mapstruct.org/](https://mapstruct.org/)
- **GitHub 地址**：[https://github.com/mapstruct/mapstruct](https://github.com/mapstruct/mapstruct)
- **MapStruct Examples**:[https://github.com/mapstruct/mapstruct-examples](https://github.com/mapstruct/mapstruct-examples)

### 1. 简介

MapStruct 是一个用于 Java Bean 之间类型安全、高性能转换的注解处理器，能自动生成映射代码，主要用于 DTO 与实体对象之间的转换。

### 2. 核心功能

- 自动将字段名相同的属性映射
- 支持自定义字段映射
- 支持集合映射、嵌套映射
- 支持类型转换、表达式映射、默认值

### 3. 优点

- 编译期生成映射代码，性能极高（比反射类库如 Dozer 更好）
- 强类型检查，避免运行时错误
- 可读性强，代码可控性高

### 4. 缺点

- 学习成本相对 Lombok 稍高
- 对不规则字段名需手动配置映射
- 某些复杂逻辑场景需配合使用辅助类

---

## 三、对比总结

| 特性          | Lombok                   | MapStruct             |
|-------------|--------------------------|-----------------------|
| 目标          | 消除样板代码                   | 对象之间的转换（DTO ⇄ Entity） |
| 使用方式        | 注解方式生成 getter/setter 等方法 | 注解方式生成类型转换代码          |
| 性能          | 编译期处理，性能优异               | 编译期处理，性能优异            |
| 代码可读性       | 部分逻辑不可见，需 IDE 支持         | 映射逻辑清晰可见              |
| 学习成本        | 低                        | 中                     |
| 常见用途        | 简化 POJO、日志注入等            | DTO 转换、层之间对象隔离        |
| 是否支持类型转换    | 否                        | 是                     |
| 是否依赖 IDE 插件 | 是（建议安装插件）                | 否                     |

---

## 四、使用建议

- **Lombok 适用场景**：用于简化数据对象类（POJO/VO/DO）开发，提高代码整洁性。
- **MapStruct 适用场景**：在三层架构中用于 **DTO ⇄ Entity** 的数据转换，确保模型隔离、提升可维护性。
- **联合使用建议**：可以在实体类中使用 Lombok 简化代码，同时使用 MapStruct 完成不同层对象的映射。但要注意字段访问方式（建议使用
  `@Accessors(chain = true)` 配合 MapStruct 或保持字段可访问性一致）。
