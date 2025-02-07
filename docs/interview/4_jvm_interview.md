# Java总结-JVM
## JVM是如何运行的？

VM（Java Virtual Machine，Java虚拟机）是 Java 程序的运行环境，它负责将 Java 字节码翻译成机器代码并执行。也就是说 Java 代码之所以能够运行，主要是依靠 JVM 来实现的。

JVM 整体的大概执行流程是这样的：

1. 程序在执行之前先要把 Java 代码转换成字节码（class 文件），JVM 首先需要把字节码通过一定的方式**类加载器（ClassLoader）** 把文件加载到内存中**运行时数据区（Runtime Data Area）**；
2. 但字节码文件是 JVM 的一套指令集规范，并不能直接交个底层操作系统去执行，因此需要特定的命令解析器，也就是 JVM 的执行引擎（Execution Engine）会**将字节码翻译成底层系统指令再交由 CPU 去执行**；
3. 在执行的过程中，也需要调用其他语言的接口，如通过**调用本地库接口（Native Interface）** 来实现整个程序的运行，如下图所示：
![img.png](../assets/interview/how_jvm_run.png)

所以，整体来看， JVM 主要通过分为以下 4 个部分，来执行 Java 程序的，它们分别是：
- 类加载器（ClassLoader）
- 运行时数据区（Runtime Data Area）
- 执行引擎（Execution Engine）
- 本地库接口（Native Interface）

## 说说JVM的内存模型？

## 垃圾回收算法
