# Java 高级

## 一、泛型（Generics）

详见：<RouteLink to="/interview/0_java#十四、说说你对泛型的理解">Java总结-Java：十四、说说你对泛型的理解</RouteLink>

## 二、Lambda与函数式编程

### 1、Lambda 底层原理与 函数式接口

详见：<RouteLink to="/interview/0_java#十五、说说-lambda-表达式的底层原理">
Java总结-Java：十五、说说lambda表达式的底层原理</RouteLink>

### 2、流式 API（Stream API）与集合框架

Java 8 引入的 **Stream API** 提供了一种 **声明式、函数式风格** 来处理集合数据的方式，使得对集合的操作更加简洁、清晰和易于并行处理。

Stream 支持丰富的链式操作，例如：**`map`、`filter`、`reduce`、`sorted`、`limit`** 等，通过对数据源的流水线处理，简化复杂逻辑的实现。

#### ✅ 流的类型及其分类

详见：<RouteLink to="/interview/0_java#十六、说说java的stream">Java总结-Java：说说Java的stream</RouteLink>

#### ✅ 集合框架与 Stream 的常见结合用法

| 操作   | 示例                                    | 说明                |
|------|---------------------------------------|-------------------|
| 创建流  | `list.stream()`                       | 从集合创建顺序流          |
| 遍历操作 | `stream.forEach(System.out::println)` | 对每个元素执行指定操作       |
| 过滤   | `stream.filter(x -> x > 10)`          | 过滤符合条件的元素         |
| 映射转换 | `stream.map(String::toUpperCase)`     | 元素转换成另一种形式        |
| 收集结果 | `stream.collect(Collectors.toList())` | 将流结果收集成列表、集合或 Map |
| 聚合统计 | `stream.count()`, `stream.max()`      | 聚合数据，如求和、计数、最大值等  |

#### ✅ 示例代码片段

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

List<String> upperNames = names.stream()
        .filter(name -> name.length() > 3)
        .map(String::toUpperCase)
        .collect(Collectors.toList());
```

#### ✅ 小结

- Stream 不存储数据，只是对数据的**操作视图**。
- Stream 操作分为**中间操作（lazy）**与**终结操作（eager）**。
- 利用 Stream 可有效提升集合处理代码的**可读性、可维护性**，同时方便实现**并行化**操作。

这是对你原始内容的**优化版**，增强了结构性、专业性和表达完整度，并补充了关键点说明与建议阅读路线：

## 三、多线程与并发编程

### 1、AQS 原理

AQS（AbstractQueuedSynchronizer）是 JUC 包中多种同步器（如 ReentrantLock、Semaphore、CountDownLatch 等）的基础框架，底层通过一个
FIFO 的等待队列管理线程竞争资源。

- 推荐阅读：[30 张图彻底掌握 AQS - 苏三说技术](https://mp.weixin.qq.com/s/kvmX6-Iz38mG5907itEb2w)

### 2、线程池与 Executor 框架

> 📚  详见：<RouteLink to="/high-concurrency/1_thread_pool.html">ThreadPool</RouteLink>

### 3、`synchronized` 与锁机制

`synchronized` 是 Java 提供的内置同步机制，用于实现对共享资源的互斥访问。其底层依赖 JVM 实现，随着 JDK 的优化已具备较好的性能。

锁的种类：

- **悲观锁/乐观锁**（如 `StampedLock`）
- **可重入锁**（`ReentrantLock`）
- **读写锁**（`ReentrantReadWriteLock`）
- **自旋锁、偏向锁、轻量级锁**（JVM 优化策略）

> 📚 详见：<RouteLink to="/high-concurrency/0_concurrent#二、juc-lock">Java并发：二、JUC Lock</RouteLink>

### 4、`volatile` 与内存可见性

- `volatile` 关键字保证变量在多个线程间的**可见性**，即一个线程修改了变量，其他线程立即可见。
- 同时 `volatile` 禁止指令重排序，保证读写顺序的有序性。
- **不保证原子性**，比如 `volatile int count; count++` 不是线程安全操作。

```java
class VolatileExample {
    private volatile boolean flag = false;

    public void writer() {
        // 其他线程立即看到 flag 变化
        flag = true;
    }

    public void reader() {
        if (flag) {
            System.out.println("Flag is true");
        }
    }
}
```

---

### 5、`final` 与对象安全发布

- `final` 修饰的字段在构造函数执行完成后，其值对其他线程**是可见且不可变的**。
- 避免构造过程中出现**指令重排序**带来的对象未初始化完毕即被引用的问题。
- 是实现线程安全不可变对象的重要保证。

```java
class FinalExample {
    private final int value;

    public FinalExample(int value) {
        this.value = value;
    }

    public int getValue() {
        // 其他线程能看到构造完成后的最终值
        return value;
    }
}
```

---

### 5、`CompletableFuture`

```java
import java.util.concurrent.CompletableFuture;

public class CompletableFutureDemo {
    public static void main(String[] args) {
        CompletableFuture.supplyAsync(() -> {
            return "Hello";
        }).thenApply(s -> s + " World")
          .thenAccept(System.out::println)
          .exceptionally(ex -> {
              System.out.println("Error: " + ex.getMessage());
              return null;
          });
    }
}
```

- 上例演示异步获取字符串，链式调用转换并消费结果，支持异常处理。

---

### 6、`FutureTask` 示例

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

public class FutureTaskDemo {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        Callable<String> callable = () -> {
            Thread.sleep(1000);
            return "Task Result";
        };

        FutureTask<String> futureTask = new FutureTask<>(callable);
        new Thread(futureTask).start();

        System.out.println("Waiting for result...");
        String result = futureTask.get();  // 阻塞等待结果
        System.out.println("Result: " + result);
    }
}
```

---

### 7、JDK 21 虚拟线程示例

```java
public class VirtualThreadDemo {
    public static void main(String[] args) {
        Thread vt = Thread.startVirtualThread(() -> {
            System.out.println("Hello from virtual thread: " + Thread.currentThread());
        });
        try {
            vt.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

- 虚拟线程更轻量，适合大量并发 IO 任务。

---

### 8、并发调优与问题排查示例

- **死锁**示例（要避免的典型代码）：

```java
public class DeadlockDemo {

  private final Object lock1 = new Object();
  private final Object lock2 = new Object();

  public void createDeadlock() {
    Thread t1 = new Thread(() -> {
      synchronized (lock1) {
        try { Thread.sleep(100); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        synchronized (lock2) {
          System.out.println("Thread 1 acquired both locks");
        }
      }
    });

    Thread t2 = new Thread(() -> {
      synchronized (lock2) {
        try { Thread.sleep(100); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
        synchronized (lock1) {
          System.out.println("Thread 2 acquired both locks");
        }
      }
    });

    t1.start();
    t2.start();
  }

  public static void main(String[] args) {
    new DeadlockDemo().createDeadlock();
  }
}

```

- **工具使用建议**：

    - **JVisualVM**：可视化线程和堆信息监控
    - **Java Flight Recorder (JFR)**：轻量级性能监控分析
    - **Arthas**：在线诊断，查看线程栈、锁信息

当然，以下是对你“反射机制”与“注解与元编程”两个章节的补充，涵盖概念、使用方式、示例与常见应用，结构清晰、实用性强：

---

## 四、反射机制（Reflection）

- 详见： <RouteLink to="/interview/0_java.html#十、反射的基本原理">反射的基本原理</RouteLink>

## 五、注解与元编程

### 1、注解的定义与使用

注解是 Java 5 引入的一种元数据机制，用于修饰类、方法、字段等，常用于配置和标记。

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface MyAnnotation {
    String value() default "default";
}
```

使用：

```java
@MyAnnotation("example")
public void doSomething() { }
```

### 2、自定义注解与反射结合

结合反射获取注解信息，实现动态行为：

```java
private void test() {
  Method method = MyClass.class.getMethod("doSomething");
  if (method.isAnnotationPresent(MyAnnotation.class)) {
    MyAnnotation annotation = method.getAnnotation(MyAnnotation.class);
    System.out.println("注解值: " + annotation.value());
  }
}
```

### 3、注解处理器（Annotation Processor）

用于在编译期处理注解，生成代码或校验逻辑，广泛应用于 **Lombok、Dagger、AutoValue** 等库。

* 基于 `javax.annotation.processing.AbstractProcessor`
* 通过 `@SupportedAnnotationTypes`、`@SupportedSourceVersion` 指定处理器信息

```java
@SupportedAnnotationTypes("com.example.MyAnnotation")
@SupportedSourceVersion(SourceVersion.RELEASE_17)
public class MyAnnotationProcessor extends AbstractProcessor {
    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        for (Element element : roundEnv.getElementsAnnotatedWith(MyAnnotation.class)) {
            processingEnv.getMessager().printMessage(Diagnostic.Kind.NOTE, "处理了: " + element);
        }
        return true;
    }
}
```

**使用工具**：JavaPoet 可用于生成类、方法、字段等源码结构。
