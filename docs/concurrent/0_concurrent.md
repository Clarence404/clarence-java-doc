# Java 并发

参考链接：

[https://gitee.com/Doocs/advanced-java](https://gitee.com/Doocs/advanced-java#%E9%AB%98%E5%B9%B6%E5%8F%91%E6%9E%B6%E6%9E%84)

[苏三说技术-并发编程](https://mp.weixin.qq.com/s/jUu1k1oKyzt-4wZyDHJp2w)

[实现异步的9种方式](https://mp.weixin.qq.com/s/eTQwT-zFgHgNVJ_nNAZidw)

## 一、JUC - Atomic

Java 中的 `java.util.concurrent.atomic` 包提供了一组**原子变量类**，主要用于**高并发场景下的无锁编程**，比起使用
`synchronized`，这些类可以提升程序的性能和吞吐量。

### 1、核心思想：CAS（Compare-And-Swap）

CAS 是实现原子操作的核心：

- **比较内存值是否为预期值**，如果是则修改为新值。
- 是一种乐观锁机制。

### 2、常用的原子类分类

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

---

### 4、优缺点对比

| 特点   | Atomic 原子类 | synchronized |
|------|------------|--------------|
| 是否阻塞 | 否（非阻塞）     | 是            |
| 性能   | 高          | 中            |
| 是否公平 | 否          | 是            |
| 可读性  | 一般         | 高            |

---

### 5、使用建议

- 在**并发量大**但**冲突概率低**的场景中使用 Atomic 类。
- 如果涉及多个变量的原子性，则需要使用 `synchronized` 或 `Lock`。

## JUC - LOCK

### ReentrantLock（可重入锁）

### CountDownLatch / CyclicBarrier

### Semaphore（信号量）

### BlockingQueue（生产者-消费者模式）

### ConcurrentHashMap 并发容器

## JUC - Fork/Join

### Fork/Join 工作窃取算法

### 任务拆分与合并

## JUC - CompletableFuture 与异步编程

[CompletableFuture使用的6个坑](https://mp.weixin.qq.com/s/_Qre84czFDNNQVQArbY2UA)

### Future vs CompletableFuture

### 异步任务组合
