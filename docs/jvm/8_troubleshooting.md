# JVM 故障排查

## 一、故障排查总流程

```
1. 确认错误类型（OOM / SOE / CPU高 / 死锁 / 类加载失败）
2. 查看 GC 日志（频率 / 停顿时间 / 趋势）
3. 使用 jstat 实时监控内存
4. 导出现场（heap dump / thread dump）
5. 离线分析（MAT / jstack）
6. 定位根因，修复代码或调整参数
7. 验证修复效果
```

---

## 二、OutOfMemoryError: Java heap space

**可能原因：**
- 内存泄漏（对象被意外持有无法回收）
- 流量突增 / 大对象分配
- 堆内存设置过小

**排查步骤：**

```bash
# 1. 确认 OOM 日志
grep "OutOfMemoryError" app.log

# 2. 实时监控老年代趋势（OU 持续升高不降 = 泄漏）
jstat -gcutil <pid> 1000

# 3. 导出 heap dump（OOM 时自动或手动）
jmap -dump:live,format=b,file=heap.hprof <pid>
# 或启动参数：-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/logs/

# 4. MAT 分析
# - Leak Suspects Report 自动识别泄漏
# - Dominator Tree 按内存占用排序
# - Path to GC Roots 查找引用链（为什么没被回收）
```

**常见泄漏场景：**
- 静态集合（`static Map/List`）无限增长
- 监听器/回调注册后未移除
- ThreadLocal 使用后未 `remove()`（线程池复用线程时尤其危险）
- 缓存未设置过期策略
- 类加载器泄漏（动态 CGLIB 代理、频繁重新部署）

---

## 三、OutOfMemoryError: Metaspace

**可能原因：**
- 动态生成大量类（CGLIB、反射）
- 类加载器未释放（Web 应用反复重部署）
- `MaxMetaspaceSize` 设置过小

**排查步骤：**

```bash
# 1. 查看元空间使用
jstat -gc <pid> 1000    # 关注 MC（MetaSpace 容量）/ MU（已使用）

# 2. 查看类加载统计
jmap -clstats <pid>

# 3. 跟踪类加载/卸载
-XX:+TraceClassLoading -XX:+TraceClassUnloading
```

---

## 四、StackOverflowError

**可能原因：**
- 递归调用深度过大（无终止条件 or 终止条件错误）
- 方法调用链过深
- `-Xss` 设置过小

**排查步骤：**

```bash
# 1. 查看堆栈（SOE 时应用通常还活着）
jstack <pid> > thread_dump.txt

# 2. 搜索重复的方法调用
grep -A 200 "StackOverflowError" thread_dump.txt

# 临时缓解：增大栈大小（不推荐作为最终方案）
-Xss2m
```

---

## 五、CPU 使用率高

**可能原因：**
- 死循环 / 死锁导致线程空转
- Full GC 频繁，GC 线程占用 CPU
- 正常高并发处理

**排查步骤：**

```bash
# 1. 找到高 CPU 的 Java 进程
top

# 2. 找到高 CPU 的线程（-H = 线程模式）
top -H -p <pid>

# 3. 将线程 TID 转为十六进制
printf "%x\n" <tid>   # 例：12345 → 3039

# 4. 在 thread dump 中搜索
jstack <pid> > thread_dump.txt
grep "3039" thread_dump.txt -A 30

# 5. 若是 GC 线程导致 CPU 高 → 查 GC 日志，定位 Full GC 原因
grep "Full GC" gc.log | tail -20
```

---

## 六、死锁

**症状：** 应用无响应，线程大量 BLOCKED。

```bash
# jstack 自动检测死锁
jstack -l <pid> | grep -A 30 "Found one Java-level deadlock"
```

**输出示例：**
```
Found one Java-level deadlock:
=============================
"Thread-1":
  waiting to lock monitor 0x00007f... (object 0x..., a java.lang.Object),
  which is held by "Thread-0"
"Thread-0":
  waiting to lock monitor 0x00007f... (object 0x..., a java.lang.Object),
  which is held by "Thread-1"
```

**预防：** 固定加锁顺序、使用 `tryLock` 超时、减少锁的粒度。

---

## 七、类加载失败

| 异常 | 原因 |
|------|------|
| `ClassNotFoundException` | classpath 中找不到该类（依赖缺失）|
| `NoClassDefFoundError` | 类加载过程中初始化失败（静态代码块异常等）|
| `LinkageError` | 同一个类被不同类加载器加载，类型不兼容 |

```bash
# 查看当前 classpath
jinfo -sysprops <pid> | grep "java.class.path"

# 追踪类加载过程
-XX:+TraceClassLoading    # 打印每个被加载的类
```

---

## 八、常见问题速查表

| 现象 | 首先看 | 工具 |
|------|--------|------|
| OOM: heap space | 老年代使用趋势 + heap dump | `jstat` + MAT |
| OOM: Metaspace | 类加载数量 | `jmap -clstats` |
| Full GC 频繁 | GC 日志频率和触发原因 | `jstat`, GCViewer |
| CPU 高 | 高CPU线程堆栈 | `top -H` + `jstack` |
| 死锁 | jstack 死锁检测 | `jstack -l` |
| 响应慢 | 线程状态 / GC 停顿 | `jstack` + GC日志 |
| 内存泄漏 | heap dump + 引用链 | MAT |
