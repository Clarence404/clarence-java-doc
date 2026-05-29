# 监控工具

## 一、调优目标

- 减少 Full GC 频率
- 控制 GC 停顿时间
- 排查内存泄漏、CPU 飙升、死锁

---

## 二、常用工具速查

| 工具 | 类型 | 功能 |
|------|------|------|
| `jps` | 命令行 | 查看 Java 进程列表 |
| `jstack` | 命令行 | 线程堆栈 / 死锁检测 |
| `jmap` | 命令行 | 堆内存分析 / Heap Dump |
| `jstat` | 命令行 | 实时 GC 统计 |
| `jinfo` | 命令行 | 查看 / 修改 JVM 参数 |
| `VisualVM` | GUI | 综合监控（CPU / 内存 / 线程 / GC）|
| `MAT` | GUI | Eclipse Memory Analyzer，深度分析 heap dump |
| `GCViewer / GCEasy` | GUI / Web | GC 日志可视化 |
| `Arthas` | 在线诊断 | 方法追踪 / 热更新 → 详见 [engineering/4_diagnosis](../engineering/4_diagnosis) |

---

## 三、jps

```bash
jps          # 列出所有 Java 进程的 PID 和主类名
jps -lvm     # 显示完整主类名 + JVM 参数 + main 参数
```

---

## 四、jstack（线程分析）

```bash
jstack <pid>                          # 打印所有线程堆栈
jstack -l <pid> > thread_dump.txt     # 输出到文件（含锁信息）
jstack -l <pid> | grep -A 20 "deadlock"  # 快速查找死锁
jstack <pid>   | grep "BLOCKED"       # 查找阻塞线程
```

**线程状态：**
| 状态 | 说明 |
|------|------|
| `RUNNABLE` | 正在运行或就绪等待 CPU |
| `BLOCKED` | 等待进入 synchronized 块（持有锁的线程在其他地方）|
| `WAITING` | 无限期等待（`Object.wait()` / `LockSupport.park()`）|
| `TIMED_WAITING` | 有超时等待（`Thread.sleep()` / `Object.wait(long)`）|

---

## 五、jmap（堆内存分析）

```bash
jmap -heap <pid>                             # 堆配置与使用概况
jmap -histo:live <pid> | head -30            # 存活对象统计（按占用内存排序）
jmap -dump:format=b,file=heap.hprof <pid>    # 导出全部对象的 heap dump
jmap -dump:live,format=b,file=heap.hprof <pid>  # 只导出存活对象（推荐，更小）
```

⚠️ JDK 9+ 在容器中使用 `jmap` 需要 `--attach` 权限，推荐改用启动参数自动 dump：
```bash
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/logs/
```

---

## 六、jstat（实时 GC 监控）

```bash
jstat -gc <pid> 1000 10    # 每1秒输出一次，共10次
jstat -gcutil <pid> 1000   # 以百分比显示各区使用率
```

**输出字段说明（-gc）：**
| 字段 | 说明 |
|------|------|
| S0C/S1C | Survivor 0/1 容量 |
| S0U/S1U | Survivor 0/1 已使用 |
| EC/EU | Eden 容量/已使用 |
| OC/OU | 老年代容量/已使用 |
| MC/MU | MetaSpace 容量/已使用 |
| YGC/YGCT | Young GC 次数/总时间 |
| FGC/FGCT | Full GC 次数/总时间 |

---

## 七、MAT（Memory Analyzer Tool）

1. 导入 `heap.hprof`（File → Open Heap Dump）
2. 查看 **Leak Suspects Report**（自动分析可能的内存泄漏）
3. 查看 **Dominator Tree**（按对象占用内存排序，找大对象）
4. 右键对象 → **Path to GC Roots**（查看为什么没被回收）
5. 使用 **OQL** 查询特定类的对象：`SELECT * FROM java.util.HashMap`

---

## 八、VisualVM

```bash
jvisualvm   # JDK 自带（JDK 9+ 需单独下载）
```

插件推荐：**Visual GC**（实时显示各代内存变化曲线）

---

## 九、GC 日志分析

- **GCViewer**：桌面工具，可视化 GC 日志，显示停顿时间分布、吞吐量
- **GCEasy**（[gceasy.io](https://gceasy.io)）：在线分析，上传 gc.log 即可

---

## 十、性能调优流程

```
1. 确定目标（吞吐量 / 延迟 / 内存）
2. 启用 GC 日志（-Xlog:gc*）
3. jstat 实时监控内存变化
4. GCViewer 分析 GC 停顿分布
5. 若有 OOM → jmap dump → MAT 分析泄漏
6. 若有 CPU 高 → jstack 找高CPU线程
7. 调整参数 → 验证效果（复测）
```
