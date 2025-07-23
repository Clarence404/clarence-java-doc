# JVM 参数设置

## 堆/栈大小
- `-Xms`：初始堆大小
- `-Xmx`：最大堆大小
- `-Xss`：每个线程栈大小

## GC 参数
- `-XX:+UseG1GC`：使用 G1 垃圾收集器
- `-XX:+UseZGC`：使用 ZGC

## 日志参数
- `-XX:+PrintGCDetails`：输出详细 GC 日志
- `-Xlog:gc*`（JDK9+）

## 诊断参数
- `-XX:+HeapDumpOnOutOfMemoryError`
