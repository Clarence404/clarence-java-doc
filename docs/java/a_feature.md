# Java 8+ 特性

本文重点介绍 Java 8 以后各版本核心新特性，适合想系统梳理版本演进的开发者。

## 一、Java 8 升 Java 11 重要特性必读

Java 11 是 LTS 版本，许多项目从 Java 8 直接升级，需重点掌握：

### 1、模块系统（Java 9 引入）

Java 9 引入模块化系统 Jigsaw，利用 `module-info.java` 管理依赖与封装。

示例模块定义：

```java
module com.example.myapp {
    requires java.sql;
    exports com.example.myapp.api;
}
```

使用模块时，若代码使用反射访问 JDK 内部类，可能需要启动参数：

```shell
--add-exports java.base/sun.nio.ch=ALL-UNNAMED
--add-opens java.base/java.lang=ALL-UNNAMED
```

### 2、新 HTTP 客户端 API（Java 11）

Java 11 正式标准化新的 `HttpClient`，替代旧的 `HttpURLConnection`。

示例代码：

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

public class HttpClientExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://example.com"))
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
        System.out.println("状态码: " + response.statusCode());
        System.out.println("响应体: " + response.body());
    }
}
```

### 3、局部变量类型推断（Java 10）

使用 `var` 简化局部变量声明：

```java
import java.util.ArrayList;

public class VarExample {
    public void test() {
        var list = new ArrayList<String>();
        list.add("Java 10 var");
        for (var item : list) {
            System.out.println(item);
        }
    }

    public static void main(String[] args) {
        new VarExample().test();
    }
}
```

### 4、String 新增实用方法（Java 11）

示例展示 `isBlank()`, `strip()`, `lines()`, `repeat()`：

```java
public class StringApiExample {
    public void test() {
        String str = "  Hello World  \nJava 11  ";

        System.out.println("isBlank: " + str.isBlank());
        System.out.println("strip: >" + str.strip() + "<");

        System.out.println("lines:");
        str.lines().forEach(System.out::println);

        System.out.println("repeat:");
        System.out.println("ha".repeat(3));
    }

    public static void main(String[] args) {
        new StringApiExample().test();
    }
}
```

### 5、文件读写简化（Java 11）

```java
import java.nio.file.Files;
import java.nio.file.Path;

public class FileExample {
    public void test() throws Exception {
        Path path = Path.of("example.txt");
        Files.writeString(path, "Hello, Java 11!");
        String content = Files.readString(path);
        System.out.println(content);
    }

    public static void main(String[] args) throws Exception {
        new FileExample().test();
    }
}
```

### 6、Lambda 参数中使用 var（Java 11）

```java
import java.util.List;

public class LambdaVarExample {
    public void test() {
        List<String> list = List.of("a", "b", "c");
        list.forEach((var s) -> System.out.println(s.toUpperCase()));
    }

    public static void main(String[] args) {
        new LambdaVarExample().test();
    }
}
```

### 7、生产环境性能监控工具集成

Java 11 集成了 Flight Recorder 和 Mission Control，方便性能监控。

## 二、Java 11 升 Java 17 重要特性必读

Java 17 是又一个 LTS 版本，包含许多语法糖和新 API。

### 1、文本块（Java 15）

```java
public class TextBlockExample {
    public void test() {
        String json = """
                {
                  "name": "Java",
                  "version": 17
                }
                """;
        System.out.println(json);
    }

    public static void main(String[] args) {
        new TextBlockExample().test();
    }
}
```

### 2、模式匹配（instanceof）（Java 16）

```java
public class PatternMatchingExample {
    public void test(Object obj) {
        if (obj instanceof String s) {
            System.out.println(s.toLowerCase());
        } else {
            System.out.println("Not a string");
        }
    }

    public static void main(String[] args) {
        new PatternMatchingExample().test("Hello");
        new PatternMatchingExample().test(123);
    }
}
```

### 3、Sealed 类（Java 17）

```java
public sealed class Shape permits Circle, Square {
}

final class Circle extends Shape {
}

final class Square extends Shape {
}

public class SealedExample {
    public static void main(String[] args) {
        Shape shape1 = new Circle();
        Shape shape2 = new Square();
        System.out.println(shape1.getClass().getSimpleName());
        System.out.println(shape2.getClass().getSimpleName());
    }
}
```

### 4、Switch 表达式（Java 14）

```java
public class SwitchExpressionExample {
    public void test() {
        int day = 5;
        int result = switch (day) {
            case 1, 7 -> 6;
            case 2 -> 7;
            default -> {
                System.out.println("Invalid day");
                yield -1;
            }
        };
        System.out.println(result);
    }

    public static void main(String[] args) {
        new SwitchExpressionExample().test();
    }
}
```

### 5、记录类（Record，Java 14）

```java
public record Person(String name, int age) {
}

public class RecordExample {
    public static void main(String[] args) {
        Person p = new Person("Alice", 30);
        System.out.println(p.name());
        System.out.println(p.age());
    }
}
```

### 6、Java 17 新增与改进

#### 外部函数与内存 API (Incubator)

```java
// 伪代码示例，实际使用需引入相关模块支持
/*
MemorySegment segment = MemorySegment.allocateNative(100);
MemoryAccess.setIntAtOffset(segment, 0, 42);
int value = MemoryAccess.getIntAtOffset(segment, 0);
System.out.println("Value: " + value);
segment.close();
*/
```

#### 垃圾回收改进

G1 和 ZGC 垃圾回收器更稳定，延迟更低。

## 三、Java 21（最新 LTS）核心亮点

### 1、虚拟线程（Virtual Threads）

```java
public class VirtualThreadExample {
    public static void main(String[] args) {
        Thread.startVirtualThread(() -> {
            System.out.println("虚拟线程运行: " + Thread.currentThread());
        });
    }
}
```

### 2、结构化并发

伪代码：

```java
/*
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Future<String> f1 = scope.fork(() -> task1());
    Future<String> f2 = scope.fork(() -> task2());
    scope.join();
    scope.throwIfFailed();
    System.out.println(f1.resultNow());
    System.out.println(f2.resultNow());
}
*/
```

### 3、模式匹配 for switch

```java
public class SwitchPatternExample {
    static String formatter(Object obj) {
        return switch (obj) {
            case Integer i -> String.format("int %d", i);
            case String s -> String.format("String %s", s);
            default -> obj.toString();
        };
    }

    public static void main(String[] args) {
        System.out.println(formatter(100));
        System.out.println(formatter("Java 21"));
    }
}
```