# 专项-时间和日期

在现代 Java 开发中，推荐使用 **`java.time`** 包下的时间日期类，这个包是在 **Java 8** 中引入的，作为对旧时间类（如
`java.util.Date`, `java.util.Calendar`）的替代，具有以下优势：

---

## 一、推荐使用的时间类（来自 `java.time` 包）

| 类名                  | 说明                                                       |
|---------------------|----------------------------------------------------------|
| `LocalDate`         | 表示没有时间的日期（如 2025-05-27）                                  |
| `LocalTime`         | 表示没有日期的时间（如 14:30:15）                                    |
| `LocalDateTime`     | 表示日期和时间，不包含时区（如 2025-05-27T14:30:15）                     |
| `ZonedDateTime`     | 包含时区信息的完整时间（如 2025-05-27T14:30:15+08:00\[Asia/Shanghai]） |
| `Instant`           | 表示时间戳（1970 年以来的秒或毫秒）                                     |
| `Duration`          | 表示两个时间之间的时长                                              |
| `Period`            | 表示两个日期之间的间隔（年/月/日）                                       |
| `DateTimeFormatter` | 日期时间格式化工具类                                               |

---

## 二、 与旧类的区别

| 特性     | `java.util.Date/Calendar` | `java.time.*` |
|--------|---------------------------|---------------|
| 是否线程安全 | ❌ 非线程安全                   | ✅ 线程安全        |
| API 设计 | 混乱，不直观                    | 清晰、不可变对象      |
| 是否推荐使用 | ❌ 不推荐                     | ✅ 推荐          |

---

## 三、常见用法示例

```java
// 获取当前日期时间
LocalDateTime now = LocalDateTime.now();

// 获取当前日期
LocalDate date = LocalDate.now();

// 格式化
String formatted = now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

// 字符串解析
LocalDateTime parsed = LocalDateTime.parse("2025-05-27T14:30:15");

// 加减时间
LocalDateTime tomorrow = now.plusDays(1);
```

---

## 四、不推荐使用的旧类

* `java.util.Date`
* `java.util.Calendar`
* `java.sql.Date`
* `SimpleDateFormat`（线程不安全）

除非在和老代码或数据库交互时，不建议再使用这些类。

---

## 五、 `OffsetDateTime` 是什么？

### 1、**OffsetDateTime定义**：

`OffsetDateTime` 表示一个带有“UTC 偏移量”的日期和时间。例如：

```text
2025-05-27T14:30:15+08:00
```

它包含：

* 日期（`LocalDate`）
* 时间（`LocalTime`）
* **偏移量（Offset，例如 +08:00）**

⚠️ 但它**不包含时区（如 Asia/Shanghai）**，这点不同于 `ZonedDateTime`。

---

### 2、常见用途

* **接口或数据库中只关心 UTC 偏移、不需要时区信息时**
* **需要精确记录时间戳但不引入复杂的时区概念**
* **替代传统的 `java.util.Date` / `java.sql.Timestamp`，但希望语义更明确**

---

## 3、与其他时间类对比

| 类名               | 是否包含时区名 | 是否包含偏移量   | 示例                                        |
|------------------|---------|-----------|-------------------------------------------|
| `LocalDateTime`  | ❌       | ❌         | 2025-05-27T14:30:15                       |
| `OffsetDateTime` | ❌       | ✅         | 2025-05-27T14:30:15+08:00                 |
| `ZonedDateTime`  | ✅       | ✅         | 2025-05-27T14:30:15+08:00\[Asia/Shanghai] |
| `Instant`        | ❌       | ❌（总是 UTC） | 2025-05-27T06:30:15Z                      |

---

## 4、示例代码

```java
// 获取当前 OffsetDateTime（默认使用系统默认 Zone）
OffsetDateTime offsetNow = OffsetDateTime.now();

// 指定偏移量创建
OffsetDateTime custom = OffsetDateTime.of(
        2025, 5, 27, 14, 30, 15, 0, ZoneOffset.ofHours(8)
);

// 转换为 Instant（时间戳）
Instant instant = offsetNow.toInstant();

// 格式化
String formatted = offsetNow.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
```

---

## 5、适用建议

* 如果你需要处理 **时间戳（含偏移）但不想处理时区数据库**，`OffsetDateTime` 是非常干净利落的选择。
* 如果你需要考虑时区历史变更（如夏令时），用 `ZonedDateTime`。
* 如果你只处理本地时间逻辑，不涉及偏移或时区，用 `LocalDateTime`。

