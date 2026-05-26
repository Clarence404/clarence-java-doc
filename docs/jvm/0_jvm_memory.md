# JVM 内存结构

## 程序计数器

- 每个线程私有，记录当前线程执行的字节码行号。
- 唯一不会发生 OutOfMemoryError 的区域。
- 执行 Native 方法时，计数器值为空（Undefined）。

## Java 虚拟机栈

- 管理 Java 方法调用所需的栈帧。
- 每个线程私有。
- 栈帧包含：局部变量表、操作数栈、动态链接、方法出口。
- 异常：StackOverflowError（栈深度过大）、OutOfMemoryError（无法扩展栈）。

## 本地方法栈

- 为 JVM 调用 Native 方法服务。
- 与 Java 虚拟机栈类似，但服务于 Native 方法。
- HotSpot VM 将两者合二为一。

## 堆

- 所有线程共享，存放对象实例。
- 分代管理：年轻代（Eden、Survivor）和老年代。
- 异常：OutOfMemoryError: Java heap space。
- 可通过 -Xms 和 -Xmx 调整大小。

## 方法区（MetaSpace）

- 存储类的结构信息、常量、静态变量等。
- JDK8 之后使用元空间（MetaSpace）替代永久代。
- 元空间使用本地内存，默认无上限。
- 异常：OutOfMemoryError: Metaspace。

## 直接内存（Direct Memory）

- 堆外内存，通过 Unsafe.allocateMemory() 或 ByteBuffer.allocateDirect() 分配。
- 不受 JVM 堆内存限制，但受本机物理内存限制。
- 常用于 NIO 操作，避免在 Java 堆和 Native 堆之间复制数据。
- 可通过 -XX:MaxDirectMemorySize 限制大小。

## 逃逸分析

- 对象作用域分析，判断对象是否会逃逸出方法。
- 逃逸：对象被方法外部引用（返回值、赋值给静态变量、赋值给其他线程等）。
- 不逃逸：对象只在方法内部使用。

### 逃逸分析优化

1. **栈上分配**：未逃逸对象分配在栈上，随栈帧销毁自动回收。
2. **标量替换**：将对象拆解为基本类型，不创建对象。
3. **同步锁消除**：未逃逸对象无需同步，消除锁。

```java
public void escapeAnalysis() {
    // 未逃逸对象，可能被优化为栈上分配或标量替换
    Point p = new Point(1, 2);
    System.out.println(p.x + p.y);
}

public Point escape() {
    // 逃逸对象，必须在堆上分配
    return new Point(1, 2);
}
```

## TLAB（Thread Local Allocation Buffer）

- 线程私有的分配缓冲区，减少多线程分配时的竞争。
- 默认大小为 Eden 区的 1%。
- 参数：-XX:TLABWasteTargetPercent（默认 1）。
- 分配流程：优先在 TLAB 分配，不足时在 Eden 区分配。

### TLAB 优势

- 减少多线程竞争，提升分配性能。
- 避免频繁的 CAS 操作。
- 大多数对象在 TLAB 中分配，只有大对象才在共享区域分配。

## JVM 内存分配策略

1. **对象优先在 Eden 区分配**：新对象优先在年轻代 Eden 区分配。
2. **大对象直接进入老年代**：超过 -XX:PretenureSizeThreshold 的对象直接进入老年代。
3. **长期存活对象进入老年代**：经历 15 次 Minor GC 后进入老年代（-XX:MaxTenuringThreshold）。
4. **动态年龄判断**：Survivor 区相同年龄对象大小总和 > Survivor 区一半，年龄 >= 该年龄的对象进入老年代。
5. **空间分配担保**：Minor GC 前检查老年代最大可用连续空间是否大于新生代所有对象总和。