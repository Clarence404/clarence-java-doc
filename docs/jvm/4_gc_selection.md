# GC 与 JDK 搭配

## JDK 版本推荐

| JDK 版本  | 推荐收集器            | 说明 |
|---------|------------------|------|
| JDK 8   | CMS / G1         | CMS 已废弃，建议使用 G1 |
| JDK 11+ | G1 / ZGC         | G1 稳定，ZGC 低延迟 |
| JDK 17+ | ZGC / Shenandoah | ZGC 成熟，Shenandoah 可选 |
| JDK 21+ | Generational ZGC | 分代 ZGC，平衡延迟和吞吐 |

## 场景推荐

### 高吞吐量场景

**适用场景**：批处理、离线计算、后台任务

**推荐配置**：
```bash
# JDK8
java -XX:+UseParallelGC -XX:MaxGCPauseMillis=200 -jar app.jar

# JDK11+
java -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:G1HeapRegionSize=16m -jar app.jar
```

### 低延迟场景

**适用场景**：在线交易、实时计算、游戏服务器

**推荐配置**：
```bash
# JDK11+
java -XX:+UseZGC -Xms8g -Xmx8g -jar app.jar

# JDK21+
java -XX:+UseZGC -XX:+ZGenerational -Xms8g -Xmx8g -jar app.jar
```

### 大堆内存场景

**适用场景**：内存 > 6GB，需要管理大堆

**推荐配置**：
```bash
# G1 适合 6GB - 32GB
java -XX:+UseG1GC -Xms16g -Xmx16g -XX:MaxGCPauseMillis=200 -jar app.jar

# ZGC 适合 > 32GB
java -XX:+UseZGC -Xms64g -Xmx64g -jar app.jar
```

### 小内存场景

**适用场景**：客户端应用、嵌入式设备

**推荐配置**：
```bash
# Serial GC 适合 < 2GB
java -XX:+UseSerialGC -Xms512m -Xmx512m -jar app.jar
```

## GC 参数调优建议

### G1 调优参数

```bash
# 基础参数
-XX:+UseG1GC                    # 使用 G1
-XX:MaxGCPauseMillis=200        # 目标停顿时间 200ms
-XX:G1HeapRegionSize=16m         # Region 大小（2MB-32MB）

# 性能参数
-XX:InitiatingHeapOccupancyPercent=45  # 触发并发标记的堆占用率
-XX:G1ReservePercent=10          # 保留空间百分比
-XX:G1MixedGCCountTarget=8      # 混合 GC 目标次数

# 大对象处理
-XX:G1HeapWastePercent=5         # 堆浪费百分比
-XX:G1MixedGCLiveThresholdPercent=85  # 存活率阈值
```

### ZGC 调优参数

```bash
# 基础参数
-XX:+UseZGC                      # 使用 ZGC
-XX:+ZGenerational               # 启用分代（JDK21+）

# 性能参数
-XX:ZCollectionInterval=5         # GC 间隔（秒）
-XX:ZAllocationSpikeTolerance=5   # 分配峰值容忍度
-XX:ConcGCThreads=2              # 并发 GC 线程数
```

### Parallel 调优参数

```bash
# 基础参数
-XX:+UseParallelGC               # 使用 Parallel GC
-XX:ParallelGCThreads=8           # GC 线程数（默认：CPU 核数）

# 性能参数
-XX:MaxGCPauseMillis=200         # 最大停顿时间
-XX:GCTimeRatio=99               # GC 时间占比（1/(1+99)=1%）
-XX:YoungGenerationSizeIncrement=10  # 年轻代增长比例
```

## 堆内存设置建议

### 通用规则

```bash
# 初始堆 = 最大堆，避免动态扩容
-Xms4g -Xmx4g

# 年轻代 : 老年代 = 1 : 2
-XX:NewRatio=2

# Eden : S0 : S1 = 8 : 1 : 1
-XX:SurvivorRatio=8

# 晋升年龄
-XX:MaxTenuringThreshold=15
```

### 根据应用类型调整

**CPU 密集型**：
```bash
-Xms2g -Xmx2g -XX:NewRatio=2
```

**IO 密集型**：
```bash
-Xms4g -Xmx4g -XX:NewRatio=1
```

**内存密集型**：
```bash
-Xms8g -Xmx8g -XX:NewRatio=3
```

## GC 日志配置

### JDK8

```bash
-XX:+PrintGCDetails
-XX:+PrintGCDateStamps
-XX:+PrintGCTimeStamps
-Xloggc:/path/to/gc.log
-XX:+UseGCLogFileRotation
-XX:NumberOfGCLogFiles=10
-XX:GCLogFileSize=10M
```

### JDK9+

```bash
-Xlog:gc*:file=/path/to/gc.log:time,uptime,level,tags:filecount=10,filesize=10M
```

## 常见问题解决

### Full GC 频繁

**原因**：
- 老年代空间不足
- 晋升年龄过小
- 大对象直接进入老年代

**解决**：
```bash
# 增加老年代空间
-Xms8g -Xmx8g -XX:NewRatio=3

# 调整晋升年龄
-XX:MaxTenuringThreshold=15

# 增加大对象阈值
-XX:PretenureSizeThreshold=16m
```

### GC 停顿时间长

**原因**：
- 堆内存过大
- 存活对象过多
- GC 线程数不足

**解决**：
```bash
# 减小堆内存
-Xms4g -Xmx4g

# 增加 GC 线程数
-XX:ParallelGCThreads=8
-XX:ConcGCThreads=2

# 调整停顿时间目标
-XX:MaxGCPauseMillis=100
```

### 内存泄漏

**排查步骤**：
1. 启用 GC 日志
2. 导出堆快照
3. 使用 MAT 分析
4. 找到泄漏对象
5. 修复代码

```bash
# 启用堆转储
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/path/to/heapdump.hprof

# 导出堆快照
jmap -dump:format=b,file=heap.hprof <pid>
```

## 性能测试建议

### 测试指标

1. **吞吐量**：单位时间内完成的任务数
2. **延迟**：请求响应时间
3. **GC 频率**：GC 次数和时间
4. **堆使用率**：堆内存占用情况

### 测试工具

- **JMH**：Java 微基准测试
- **Gatling**：负载测试
- **JMeter**：性能测试
- **VisualVM**：监控分析

### 测试流程

1. 确定测试目标和指标
2. 设计测试场景和数据
3. 配置 JVM 参数
4. 执行测试并收集数据
5. 分析结果并优化
6. 验证优化效果
