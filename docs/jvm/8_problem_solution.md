常见错误类型

OutOfMemoryError: Java heap space：堆内存溢出

OutOfMemoryError: Metaspace：方法区（元空间）溢出

StackOverflowError：递归过深

类加载失败、ClassNotFound、NoClassDefFound

排查思路

查看 JVM 启动参数是否合理（堆、栈、Metaspace）

分析 GC 日志，识别 Full GC 是否频繁

使用 jmap -heap、jstat -gc 等查看内存占用情况

Dump 内存快照（heap dump）+ MAT 分析

检查是否存在 classloader 泄漏或静态集合缓存未清理