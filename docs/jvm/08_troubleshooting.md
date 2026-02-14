# JVM错误排查

## 常见错误类型

### OutOfMemoryError: Java heap space

**堆内存溢出**

**原因**：
- 对象太多，堆内存不足
- 内存泄漏，对象无法回收
- 大对象分配失败

### OutOfMemoryError: Metaspace

**方法区（元空间）溢出**

**原因**：
- 加载的类太多
- 类加载器泄漏
- 动态代理、反射使用过多

### StackOverflowError

**递归过深**

**原因**：
- 递归调用太深
- 方法调用层次过深
- 线程栈太小

### 类加载失败

**ClassNotFound、NoClassDefFound**

**原因**：
- 类路径配置错误
- 依赖缺失
- 类加载器问题

## 详细排查步骤

### OutOfMemoryError: Java heap space

#### 步骤 1：确认错误类型

```bash
# 查看错误日志
grep "OutOfMemoryError" app.log

# 查看堆内存使用
jstat -gc <pid> 1000
```

#### 步骤 2：分析 GC 日志

```bash
# 查看 Full GC 频率
grep "Full GC" gc.log | tail -20

# 查看 GC 停顿时间
grep "Pause" gc.log | tail -20
```

#### 步骤 3：查看堆内存使用

```bash
# 实时监控堆内存
jstat -gc <pid> 1000

# 输出说明：
# - O：老年代使用率
# - FGC：Full GC 次数
# - FGCT：Full GC 总时间
# - OGCMN/OGCMX：老年代最小/最大容量
# - OGC：老年代当前容量
# - OC：老年代已使用
```

#### 步骤 4：导出堆快照

```bash
# 方式 1：自动导出（OOM 时）
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/

# 方式 2：手动导出
jmap -dump:format=b,file=heap.hprof <pid>

# 方式 3：只导出存活对象
jmap -dump:live,format=b,file=heap.hprof <pid>
```

#### 步骤 5：MAT 分析

1. **打开 heap dump**
   - File → Open Heap Dump
   - 选择 heap.hprof 文件

2. **查看 Leak Suspects Report**
   - 自动分析可能的内存泄漏
   - 查看占用内存最大的对象

3. **查看 Dominator Tree**
   - 按对象占用内存排序
   - 右键对象 → Path to GC Roots
   - 查看对象引用链

4. **查找泄漏源**
   - 检查静态集合（Map、List）
   - 检查监听器未移除
   - 检查线程未关闭
   - 检查缓存未清理

#### 步骤 6：解决方法

```bash
# 增加堆内存
-Xms8g -Xmx8g

# 调整新生代比例
-XX:NewRatio=2

# 优化代码
# - 及时释放对象引用
# - 使用弱引用（WeakReference）
# - 使用对象池
# - 清理缓存
```

### OutOfMemoryError: Metaspace

#### 步骤 1：确认错误类型

```bash
# 查看错误日志
grep "Metaspace" app.log

# 查看元空间使用
jstat -gc <pid> 1000
# 关注：MCMN/MCMX/MC/CCSC/CCSU
```

#### 步骤 2：查看类加载器统计

```bash
# 查看类加载器统计
jmap -clstats <pid>

# 查看加载的类数量
jmap -clstats <pid> | grep "classes"
```

#### 步骤 3：查找类加载器泄漏

```bash
# 查找重复加载的类
jmap -clstats <pid> | grep "com.example"

# 查找类加载器数量
jmap -clstats <pid> | grep "classloader"
```

#### 步骤 4：解决方法

```bash
# 增加元空间大小
-XX:MetaspaceSize=512m -XX:MaxMetaspaceSize=1g

# 跟踪类加载
-XX:+TraceClassLoading -XX:+TraceClassUnloading

# 优化代码
# - 避免重复创建类加载器
# - 及时释放类加载器引用
# - 减少动态代理和反射使用
# - 清理未使用的类
```

### StackOverflowError

#### 步骤 1：确认错误类型

```bash
# 查看错误日志
grep "StackOverflowError" app.log

# 查看线程堆栈
jstack <pid> > thread_dump.txt
```

#### 步骤 2：分析线程堆栈

```bash
# 查找递归调用
grep -A 100 "StackOverflowError" thread_dump.txt

# 查找重复的方法调用
grep "at com.example" thread_dump.txt | head -50
```

#### 步骤 3：解决方法

```bash
# 增加栈大小（临时方案）
-Xss2m

# 优化代码
# - 减少递归深度
# - 改用迭代
# - 优化算法复杂度
# - 检查循环依赖
```

### 类加载失败

#### 步骤 1：确认错误类型

```bash
# 查看错误日志
grep "ClassNotFoundException\|NoClassDefFoundError" app.log

# 查看类路径
jinfo -sysprops <pid> | grep "java.class.path"
```

#### 步骤 2：检查类路径

```bash
# 查看类路径
echo $CLASSPATH

# 查看启动参数
jinfo -flags <pid>
```

#### 步骤 3：检查依赖

```bash
# 查看加载的类
jmap -clstats <pid>

# 查找类加载器
jmap -clstats <pid> | grep "classloader"
```

#### 步骤 4：解决方法

```bash
# 添加类路径
java -cp /path/to/classes:/path/to/lib/* app.jar

# 检查依赖
# - 确认所有依赖都在类路径中
# - 检查依赖版本冲突
# - 使用 Maven/Gradle 管理依赖

# 检查类加载器
# - 确认类加载器层次结构
# - 检查是否打破双亲委派
# - 确认类加载器隔离
```

## 常见问题排查思路

### 1. 查看 JVM 启动参数

```bash
# 查看启动参数
jinfo -flags <pid>

# 查看系统属性
jinfo -sysprops <pid>

# 查看堆、栈、元空间配置
jinfo -flags <pid> | grep -E "Heap|Stack|Metaspace"
```

### 2. 分析 GC 日志

```bash
# 查看 GC 频率
grep "GC" gc.log | wc -l

# 查看 Full GC 频率
grep "Full GC" gc.log | wc -l

# 查看 GC 停顿时间
grep "Pause" gc.log | awk '{print $NF}'

# 使用 GCViewer 可视化
java -jar gcviewer.jar gc.log
```

### 3. 查看内存占用情况

```bash
# 查看堆内存使用
jstat -gc <pid> 1000

# 查看堆配置
jmap -heap <pid>

# 查看对象统计
jmap -histo:live <pid> | head -20
```

### 4. 检查线程状态

```bash
# 查看线程堆栈
jstack <pid> > thread_dump.txt

# 查找死锁
jstack -l <pid> | grep -A 20 "deadlock"

# 查找 BLOCKED 线程
jstack <pid> | grep -A 5 "BLOCKED"

# 查找线程数量
jstack <pid> | grep "java.lang.Thread.State" | wc -l
```

### 5. Dump 内存快照

```bash
# 导出堆快照
jmap -dump:format=b,file=heap.hprof <pid>

# 导出线程快照
jstack <pid> > thread_dump.txt

# 导出类加载器统计
jmap -clstats <pid> > clstats.txt
```

### 6. 检查类加载器泄漏

```bash
# 查看类加载器统计
jmap -clstats <pid>

# 查找重复加载的类
jmap -clstats <pid> | grep "com.example"

# 查看类加载器数量
jmap -clstats <pid> | grep "classloader" | wc -l
```

## 排查流程总结

### 内存问题

1. 确认错误类型（堆溢出、元空间溢出）
2. 查看 GC 日志，分析 GC 频率和停顿时间
3. 使用 jstat 实时监控内存使用
4. 导出堆快照，使用 MAT 分析
5. 查找内存泄漏源
6. 调整 JVM 参数或优化代码

### 线程问题

1. 查看线程堆栈
2. 查找死锁、BLOCKED 线程
3. 分析线程状态和调用栈
4. 修复代码中的锁问题

### 类加载问题

1. 查看类路径配置
2. 检查依赖是否完整
3. 查看类加载器统计
4. 检查类加载器泄漏

### 性能问题

1. 启用 GC 日志
2. 使用 GCViewer 分析
3. 使用 jstat 监控 GC
4. 调整 GC 参数
5. 优化代码和算法