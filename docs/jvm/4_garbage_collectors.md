# 垃圾收集器对比

## Serial
- 单线程，适用于小内存客户端。

## ParNew
- 多线程版 Serial，适用于配合 CMS 使用。

## CMS（已淘汰）
- 并发标记清除，低停顿，内存碎片问题严重。

## G1（JDK9 默认）
- 区域化管理，预估停顿时间。

## ZGC（JDK11+）
- 子代收集，低延迟，支持大堆内存。

## Shenandoah（JDK12+）
- 红帽贡献，低停顿并发压缩。

## Generational ZGC（JDK21）
- 支持分代，结合低延迟与吞吐量。

## Epsilon
- 不做任何垃圾收集，用于测试。

## GC 的触发条件、STW（Stop The World）说明、GC 的分代策略对比
