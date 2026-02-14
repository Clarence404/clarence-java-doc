# JVM 参数设置

## 堆/栈大小

### 堆内存参数

```bash
-Xms4g          # 初始堆大小 4GB
-Xmx4g          # 最大堆大小 4GB（建议与 -Xms 相同，避免动态扩容）
-XX:NewRatio=2  # 新生代:老年代 = 1:2
-XX:SurvivorRatio=8  # Eden:S0:S1 = 8:1:1
```

### 栈内存参数

```bash
-Xss512k        # 每个线程栈大小 512KB
-XX:ThreadStackSize=512  # 等同于 -Xss
```

### 元空间参数

```bash
-XX:MetaspaceSize=256m           # 元空间初始大小
-XX:MaxMetaspaceSize=512m        # 元空间最大大小
-XX:CompressedClassSpaceSize=1g  # 压缩类空间大小
```

## GC 参数

### GC 选择

```bash
-XX:+UseSerialGC              # 使用 Serial GC
-XX:+UseParallelGC            # 使用 Parallel GC
-XX:+UseG1GC                  # 使用 G1 GC（JDK9+ 默认）
-XX:+UseZGC                   # 使用 ZGC（JDK11+）
-XX:+UseShenandoahGC          # 使用 Shenandoah GC（JDK12+）
-XX:+UseEpsilonGC             # 使用 Epsilon GC（无 GC）
```

### G1 参数

```bash
-XX:+UseG1GC                           # 使用 G1
-XX:MaxGCPauseMillis=200              # 目标停顿时间 200ms
-XX:G1HeapRegionSize=16m               # Region 大小（2MB-32MB）
-XX:InitiatingHeapOccupancyPercent=45  # 触发并发标记的堆占用率
-XX:G1ReservePercent=10                # 保留空间百分比
-XX:G1MixedGCCountTarget=8            # 混合 GC 目标次数
-XX:G1HeapWastePercent=5               # 堆浪费百分比
-XX:G1MixedGCLiveThresholdPercent=85   # 存活率阈值
```

### ZGC 参数

```bash
-XX:+UseZGC                      # 使用 ZGC
-XX:+ZGenerational               # 启用分代（JDK21+）
-XX:ZCollectionInterval=5        # GC 间隔（秒）
-XX:ZAllocationSpikeTolerance=5  # 分配峰值容忍度
-XX:ConcGCThreads=2              # 并发 GC 线程数
```

### Parallel 参数

```bash
-XX:+UseParallelGC                # 使用 Parallel GC
-XX:ParallelGCThreads=8          # GC 线程数（默认：CPU 核数）
-XX:MaxGCPauseMillis=200          # 最大停顿时间
-XX:GCTimeRatio=99                # GC 时间占比（1/(1+99)=1%）
-XX:YoungGenerationSizeIncrement=10  # 年轻代增长比例
```

## 日志参数

### JDK8 GC 日志

```bash
-XX:+PrintGCDetails               # 输出详细 GC 日志
-XX:+PrintGCDateStamps            # 输出 GC 日期时间戳
-XX:+PrintGCTimeStamps            # 输出 GC 时间戳
-Xloggc:/path/to/gc.log           # GC 日志文件路径
-XX:+UseGCLogFileRotation         # 启用日志文件轮转
-XX:NumberOfGCLogFiles=10         # 保留的 GC 日志文件数量
-XX:GCLogFileSize=10M             # 每个 GC 日志文件大小
```

### JDK9+ GC 日志

```bash
-Xlog:gc*:file=/path/to/gc.log:time,uptime,level,tags:filecount=10,filesize=10M
```

### 其他日志参数

```bash
-verbose:gc                       # 简单 GC 日志
-XX:+PrintGCDetails               # 详细 GC 日志
-XX:+PrintHeapAtGC                 # GC 时打印堆信息
-XX:+PrintStringDeduplicationStatistics  # 字符串去重统计
```

## 诊断参数

### 堆转储

```bash
-XX:+HeapDumpOnOutOfMemoryError    # OOM 时自动导出堆转储
-XX:HeapDumpPath=/path/to/heapdump.hprof  # 堆转储文件路径
```

### 错误处理

```bash
-XX:OnError="gdb -p %p"            # JVM 崩溃时执行命令
-XX:OnOutOfMemoryError="kill -9 %p"  # OOM 时执行命令
```

### 其他诊断参数

```bash
-XX:+PrintConcurrentLocks         # 打印并发锁信息
-XX:+PrintSafepointStatistics     # 打印安全点统计
-XX:+PrintCommandLineFlags        # 打印命令行参数
```

## 性能参数

### JIT 编译

```bash
-XX:+UseTieredCompilation         # 启用分层编译（默认开启）
-XX:CompileThreshold=10000         # 编译阈值
-XX:ReservedCodeCacheSize=256m     # 代码缓存大小
-XX:+PrintCompilation              # 打印编译信息
```

### 优化参数

```bash
-XX:+UseTLAB                       # 启用 TLAB（默认开启）
-XX:+UseStringDeduplication        # 启用字符串去重（G1）
-XX:+UseCompressedOops             # 压缩普通对象指针（64位）
-XX:+UseCompressedClassPointers    # 压缩类指针
-XX:+UseBiasedLocking              # 启用偏向锁
-XX:+UseFastAccessorMethods        # 优化访问器方法
```

### 内存分配

```bash
-XX:PretenureSizeThreshold=16m     # 大对象直接进入老年代的阈值
-XX:MaxTenuringThreshold=15        # 对象晋升年龄
-XX:TargetSurvivorRatio=50         # Survivor 区目标使用率
```

## 其他参数

### 字符串去重

```bash
-XX:+UseStringDeduplication        # 启用字符串去重（G1）
-XX:StringDeduplicationAgeThreshold=3  # 字符串去重年龄阈值
```

### 类加载

```bash
-XX:+TraceClassLoading             # 跟踪类加载
-XX:+TraceClassUnloading           # 跟踪类卸载
-XX:+PrintClassHistogram           # 打印类直方图
```

### 线程

```bash
-XX:ParallelGCThreads=8            # GC 线程数
-XX:ConcGCThreads=2                # 并发 GC 线程数
-XX:CICompilerCount=2              # JIT 编译线程数
```

## 实战配置示例

### 通用配置（JDK11+）

```bash
java -Xms4g -Xmx4g \
     -XX:+UseG1GC \
     -XX:MaxGCPauseMillis=200 \
     -XX:G1HeapRegionSize=16m \
     -XX:InitiatingHeapOccupancyPercent=45 \
     -Xlog:gc*:file=/path/to/gc.log:time,uptime,level,tags:filecount=10,filesize=10M \
     -XX:+HeapDumpOnOutOfMemoryError \
     -XX:HeapDumpPath=/path/to/heapdump.hprof \
     -jar app.jar
```

### 低延迟配置（JDK21+）

```bash
java -Xms8g -Xmx8g \
     -XX:+UseZGC \
     -XX:+ZGenerational \
     -XX:ZCollectionInterval=5 \
     -XX:ConcGCThreads=2 \
     -Xlog:gc*:file=/path/to/gc.log:time,uptime,level,tags:filecount=10,filesize=10M \
     -XX:+HeapDumpOnOutOfMemoryError \
     -XX:HeapDumpPath=/path/to/heapdump.hprof \
     -jar app.jar
```

### 高吞吐配置（JDK8）

```bash
java -Xms4g -Xmx4g \
     -XX:+UseParallelGC \
     -XX:MaxGCPauseMillis=200 \
     -XX:GCTimeRatio=99 \
     -XX:+PrintGCDetails \
     -XX:+PrintGCDateStamps \
     -XX:+PrintGCTimeStamps \
     -Xloggc:/path/to/gc.log \
     -XX:+UseGCLogFileRotation \
     -XX:NumberOfGCLogFiles=10 \
     -XX:GCLogFileSize=10M \
     -XX:+HeapDumpOnOutOfMemoryError \
     -XX:HeapDumpPath=/path/to/heapdump.hprof \
     -jar app.jar
```

### 小内存配置

```bash
java -Xms512m -Xmx512m \
     -XX:+UseSerialGC \
     -Xss256k \
     -XX:MetaspaceSize=64m \
     -XX:MaxMetaspaceSize=128m \
     -XX:+PrintGCDetails \
     -XX:+PrintGCDateStamps \
     -Xloggc:/path/to/gc.log \
     -jar app.jar
```

## 参数调优建议

1. **初始堆 = 最大堆**：避免动态扩容带来的性能损耗。
2. **选择合适的 GC**：根据场景选择 G1、ZGC 或 Parallel。
3. **设置合理的停顿时间**：G1 的 MaxGCPauseMillis 不要设置过小。
4. **启用 GC 日志**：便于问题排查和性能分析。
5. **启用堆转储**：OOM 时自动导出堆快照。
6. **监控和调优**：根据实际运行情况调整参数。
