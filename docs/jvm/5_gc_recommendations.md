# 推荐 GC 与 JDK 搭配

| JDK 版本  | 推荐收集器            |
|---------|------------------|
| JDK 8   | CMS / G1         |
| JDK 11+ | G1 / ZGC         |
| JDK 17+ | ZGC / Shenandoah |
| JDK 21+ | Generational ZGC |

> 建议根据服务类型（如高吞吐 vs 低延迟）选择。
