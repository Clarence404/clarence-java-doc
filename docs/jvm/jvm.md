# JVM相关

## JVM内存结构
- 程序计数器
- Java虚拟机栈
- 本地方法栈
- 堆（年轻代 Eden/Survivor、老年代）
- 方法区（MetaSpace）

## 类加载器
- 启动类加载器（Bootstrap ClassLoader）
- 扩展类加载器（ExtClassLoader）
- 应用类加载器（AppClassLoader）
- 自定义类加载器

## 双亲委派模型
- 工作机制：向上委托，向下加载
- 打破模型：如 SPI、Tomcat、OSGi

## 垃圾收集器（GC）

> [垃圾收集器对比 - 技术自由圈](https://mp.weixin.qq.com/s/aW5SamaBXdS3ZOYC_GR2qQ)

### 1. Serial 收集器（单线程）
### 2. ParNew（多线程）
### 3. CMS（Concurrent Mark Sweep）🌙（已被淘汰）
### 4. G1（Garbage First）🌟JDK9 默认
### 5. ZGC（低延迟GC）🌈 JDK11 起支持
### 6. Shenandoah（红帽主推）⚡ JDK12 起支持
### 7. Generational ZGC（分代 ZGC）🔥 **JDK21 新增**
### 8. Epsilon（实验性的“空 GC”）🧪 用于性能测试

> ✅ 推荐版本搭配：
> - JDK8：CMS / G1
> - JDK11+：G1 / ZGC
> - JDK17+：ZGC / Shenandoah
> - JDK21：Generational ZGC

## JVM参数（-Xms/-Xmx/-XX:+UseG1GC 等）
- 堆/栈设置
- GC 选择与调优参数
- 日志与诊断参数（如 `-XX:+PrintGCDetails`）

---
