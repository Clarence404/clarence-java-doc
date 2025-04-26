# Java 并发基础

参考链接：
>[https://gitee.com/Doocs/advanced-java](https://gitee.com/Doocs/advanced-java#%E9%AB%98%E5%B9%B6%E5%8F%91%E6%9E%B6%E6%9E%84)
>[苏三说技术-并发编程](https://mp.weixin.qq.com/s/jUu1k1oKyzt-4wZyDHJp2w)
>[实现异步的9种方式](https://mp.weixin.qq.com/s/eTQwT-zFgHgNVJ_nNAZidw)

## 一、JUC - Atomic

Java 中的 `java.util.concurrent.atomic` 包提供了一组**原子变量类**，主要用于**高并发场景下的无锁编程**，比起使用
`synchronized`，这些类可以提升程序的性能和吞吐量。

### 1、核心思想

CAS（Compare-And-Swap）是实现原子操作的核心思想，其工作原理如下：

- **比较内存中的值与预期值**，如果一致，则将其更新为新的值。
- 它是一种**乐观锁机制**，通过尝试修改共享数据并检查是否发生了冲突来保证线程安全。

### 2、常用分类

#### 2.1. 基本类型原子类

| 类名              | 对应类型    |
|-----------------|---------|
| `AtomicInteger` | int     |
| `AtomicLong`    | long    |
| `AtomicBoolean` | boolean |

**示例：**

```java
private void test() {
    AtomicInteger counter = new AtomicInteger(0);
    counter.incrementAndGet();  // +1
    counter.addAndGet(5);       // +5
}
```

#### 2.2 引用类型原子类

| 类名                           | 说明           |
|------------------------------|--------------|
| `AtomicReference<T>`         | 原子更新引用       |
| `AtomicStampedReference<T>`  | 带版本戳，解决ABA问题 |
| `AtomicMarkableReference<T>` | 带布尔标记        |

**ABA问题解决示例：**

```java
private void test() {
    AtomicStampedReference<Integer> ref = new AtomicStampedReference<>(1, 0);
    int[] stampHolder = new int[1];
    Integer value = ref.get(stampHolder);
    ref.compareAndSet(value, 2, stampHolder[0], stampHolder[0] + 1);
}
```

#### 2.3 数组原子类

| 类名                        | 说明        |
|---------------------------|-----------|
| `AtomicIntegerArray`      | 原子更新整型数组  |
| `AtomicLongArray`         | 原子更新长整型数组 |
| `AtomicReferenceArray<T>` | 原子更新引用数组  |

#### 3. 高级类：`LongAdder` / `LongAccumulator`

为了解决高并发下 `AtomicLong` 的热点问题，引入了分段累加器：

```java
private void test() {
    LongAdder adder = new LongAdder();
    adder.increment(); // 高并发下效率更好
}
```

### 4、优缺点对比

| 特点   | Atomic 原子类 | synchronized |
|------|------------|--------------|
| 是否阻塞 | 否（非阻塞）     | 是            |
| 性能   | 高          | 中            |
| 是否公平 | 否          | 是            |
| 可读性  | 一般         | 高            |

### 5、使用建议

- 在**并发量大**但**冲突概率低**的场景中使用 Atomic 类。

- 如果涉及多个变量的原子性，则需要使用 **`synchronized`** 或 **`Lock`**。

## 二、JUC - LOCK

### synchronized

### ReentrantLock（可重入锁）

### CountDownLatch / CyclicBarrier

### Semaphore（信号量）

### BlockingQueue（生产者-消费者模式）

### ConcurrentHashMap 并发容器

## 三、JUC - Fork/Join

### Fork/Join 工作窃取算法

### 任务拆分与合并

## 四、JUC - CompletableFuture

### 1. CompletableFuture 简介

- 介绍 `CompletableFuture` 的定义和基本用途。
- 与 `Future` 的区别。

### 2. CompletableFuture 常用操作

- 创建 `CompletableFuture` 的方式。
- `thenApply`、`thenAccept`、`thenRun` 等常用方法。
- 异常处理 (`handle`、`exceptionally` 等)。

### 3. 组合异步任务

- `thenCompose` 和 `thenCombine` 的使用。
- `allOf` 和 `anyOf` 的异步任务组合。

### 4. 完成和取消任务

- 使用 `complete` 方法完成任务。
- 使用 `cancel` 方法取消任务。

### 5. 相关坑和陷阱

- 线程池管理。
- 异常处理。
- 阻塞与非阻塞操作。

## 五、JUC - 异步编程

### 1. 异步编程概述

- 异步编程的基本概念。
- 为什么需要异步编程？

### 2. 异步任务的设计与实现

- 使用 `ExecutorService` 和 `Callable` 进行任务调度。
- 如何设计高效的异步任务执行模型。

### 3. 异步编程的模式

- 发布-订阅模式。
- 生产者-消费者模式。
- 任务链模式。

### 4. 异步编程的挑战与最佳实践

- 线程管理与资源消耗。
- 错误处理与回调机制。
- 如何避免死锁、竞争条件等问题。
