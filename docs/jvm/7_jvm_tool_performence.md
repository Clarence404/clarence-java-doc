# 性能调优与工具

## 调优目标

减少 Full GC 次数

控制垃圾回收停顿时间

优化堆大小与线程栈大小

## 常用工具

| 工具       | 功能                      |
|----------|-------------------------|
| jps      | 查看所有 Java 进程            |
| jstack   | 打印线程堆栈                  |
| jmap     | 堆内存使用情况、dump            |
| jhat     | 分析堆 dump 文件             |
| jstat    | 实时 GC 状态                |
| VisualVM | 图形化监控 GC、堆、线程           |
| MAT      | Eclipse Memory Analyzer |
| GCViewer | 可视化 GC 日志               |

## 工具使用示例

### jps - 查看 Java 进程

```bash
# 查看所有 Java 进程
jps

# 查看详细信息（包括主类和 JVM 参数）
jps -lvm

# 输出示例：
# 12345 com.example.Main -Xms4g -Xmx4g -XX:+UseG1GC
# 12346 org.apache.catalina.startup.Bootstrap
```

### jstack - 线程堆栈分析

```bash
# 打印线程堆栈
jstack <pid>

# 打印线程堆栈并输出到文件
jstack -l <pid> > thread_dump.txt

# 查找死锁
jstack -l <pid> | grep -A 10 "Found one Java-level deadlock"

# 查找 BLOCKED 线程
jstack <pid> | grep -A 5 "BLOCKED"
```

**线程状态说明**：
- **RUNNABLE**：正在运行或等待 CPU
- **BLOCKED**：等待监视器锁
- **WAITING**：无限期等待（如 Object.wait()）
- **TIMED_WAITING**：限时等待（如 Thread.sleep()）

### jmap - 堆内存分析

```bash
# 查看堆配置和使用情况
jmap -heap <pid>

# 导出堆快照
jmap -dump:format=b,file=heap.hprof <pid>

# 导出堆快照（只导出存活对象）
jmap -dump:live,format=b,file=heap.hprof <pid>

# 查看堆中对象统计
jmap -histo:live <pid>

# 查看类加载器统计
jmap -clstats <pid>
```

**输出示例**：
```
Heap Configuration:
   MinHeapFreeRatio = 40
   MaxHeapFreeRatio = 70
   MaxHeapSize      = 4294967296 (4096.0MB)
   NewSize          = 136314432 (130.0MB)
   MaxNewSize       = 4294967296 (4096.0MB)
   OldSize          = 5452592 (5.19921875MB)
   NewRatio         = 2
   SurvivorRatio    = 8
```

### jstat - 实时监控 GC

```bash
# 查看 GC 统计信息
jstat -gc <pid>

# 每 1 秒输出一次，共 10 次
jstat -gc <pid> 1000 10

# 查看 GC 容量统计
jstat -gccapacity <pid>

# 查看 GC 新生代统计
jstat -gcnew <pid>

# 查看 GC 老年代统计
jstat -gcold <pid>

# 查看编译统计
jstat -compiler <pid>
```

**输出说明**：
- **S0C/S1C**：Survivor 区总容量
- **S0U/S1U**：Survivor 区已使用
- **EC/EU**：Eden 区容量/已使用
- **OC/OU**：老年代容量/已使用
- **YGC/YGCT**：Young GC 次数/总时间
- **FGC/FGCT**：Full GC 次数/总时间

### jhat - 堆 dump 分析

```bash
# 启动 jhat 服务器
jhat heap.hprof

# 默认端口 7000，访问 http://localhost:7000
# 指定端口
jhat -port 8080 heap.hprof

# 查看对象统计
# 访问 http://localhost:7000/histogram/
```

### VisualVM - 图形化监控

```bash
# 启动 VisualVM
jvisualvm

# 或使用 JDK11+ 的 jconsole
jconsole
```

**VisualVM 功能**：
1. **监控**：CPU、内存、线程、GC
2. **线程 Dump**：查看线程状态和堆栈
3. **堆 Dump**：分析内存泄漏
4. **插件**：Visual GC、MBeans 等

**安装 Visual GC 插件**：
1. Tools → Plugins → Available Plugins
2. 搜索 "Visual GC"
3. 安装并重启 VisualVM

### MAT - 内存分析器

**使用步骤**：

1. **导入 heap dump**
   - File → Open Heap Dump
   - 选择 heap.hprof 文件

2. **查看 Leak Suspects Report**
   - 自动分析可能的内存泄漏

3. **查看 Dominator Tree**
   - 按对象占用内存排序
   - 查看对象引用链

4. **查找 GC Roots**
   - 右键对象 → Path to GC Roots
   - 查看对象被谁引用

5. **分析对象引用**
   - 右键对象 → List Objects → with incoming references
   - 查看谁引用了该对象

**常用功能**：
- **Histogram**：按类统计对象数量和大小
- **Dominator Tree**：按对象占用内存排序
- **Thread Overview**：查看线程和对象关系
- **OQL**：使用 SQL 查询对象

### GCViewer - GC 日志可视化

```bash
# 启动 GCViewer
java -jar gcviewer.jar

# 或使用命令行
java -jar gcviewer.jar gc.log gc.png
```

**功能**：
- 可视化 GC 日志
- 查看 GC 停顿时间
- 分析 GC 频率
- 导出图表

## 性能调优流程

### 1. 确定调优目标

- 吞吐量优先：批处理、离线计算
- 延迟优先：在线交易、实时计算
- 内存优先：内存受限环境

### 2. 监控和诊断

```bash
# 启用 GC 日志
-Xlog:gc*:file=/path/to/gc.log:time,uptime,level,tags:filecount=10,filesize=10M

# 监控 GC
jstat -gc <pid> 1000

# 导出堆快照
jmap -dump:format=b,file=heap.hprof <pid>

# 查看线程堆栈
jstack <pid> > thread_dump.txt
```

### 3. 分析问题

- 使用 GCViewer 分析 GC 日志
- 使用 MAT 分析堆快照
- 使用 jstack 分析线程状态

### 4. 调整参数

```bash
# 调整堆大小
-Xms4g -Xmx4g

# 调整 GC 参数
-XX:+UseG1GC -XX:MaxGCPauseMillis=200

# 调整新生代比例
-XX:NewRatio=2 -XX:SurvivorRatio=8
```

### 5. 验证效果

- 监控 GC 频率和停顿时间
- 监控堆内存使用情况
- 监控应用性能指标

## 常见问题排查

### 内存泄漏

**症状**：
- Full GC 频繁
- 老年代使用率持续上升
- 最终 OutOfMemoryError

**排查步骤**：
```bash
# 1. 导出堆快照
jmap -dump:format=b,file=heap.hprof <pid>

# 2. 使用 MAT 分析
# 打开 heap dump
# 查看 Leak Suspects Report
# 找到占用内存最大的对象
# 分析引用链

# 3. 查找泄漏源
# 检查静态集合
# 检查监听器未移除
# 检查线程未关闭
# 检查类加载器泄漏
```

### CPU 高

**症状**：
- CPU 使用率持续高
- 响应慢

**排查步骤**：
```bash
# 1. 查看线程 CPU 使用
top -H -p <pid>

# 2. 查看线程堆栈
jstack <pid> > thread_dump.txt

# 3. 找到高 CPU 线程
# 将线程 ID 转换为十六进制
printf "%x" <tid>

# 4. 在 thread_dump.txt 中查找
grep <hex_tid> thread_dump.txt
```

### 死锁

**症状**：
- 应用无响应
- 线程 BLOCKED

**排查步骤**：
```bash
# 1. 打印线程堆栈
jstack -l <pid> > thread_dump.txt

# 2. 查找死锁
grep -A 20 "Found one Java-level deadlock" thread_dump.txt

# 3. 分析死锁原因
# 查看锁的持有者和等待者
# 修复代码中的锁顺序问题
```

### GC 停顿时间长

**症状**：
- GC 停顿时间长
- 请求超时

**排查步骤**：
```bash
# 1. 查看 GC 日志
grep "Pause" gc.log

# 2. 分析 GC 停顿时间
# 使用 GCViewer 可视化

# 3. 调整参数
# 减小堆大小
# 调整 GC 线程数
# 调整停顿时间目标
```
