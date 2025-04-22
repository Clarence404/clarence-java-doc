# Guava Cache

## 一、Guava 简介

> **Guava 是 Google 出的一整套 Java 核心类库。**

里面包含了很多模块，比如：

| 模块          | 作用                         |
|:------------|:---------------------------|
| Collections | 集合扩展工具（如 Multimap、BiMap 等） |
| Caching     | 本地缓存（也就是 Guava Cache）      |
| Concurrency | 并发工具（如 ListenableFuture）   |
| Hashing     | 高效哈希算法支持（比如 BloomFilter）   |
| Strings     | 字符串处理工具类                   |
| Ranges      | 范围类型（比如区间 Range）           |
| Primitives  | 基本类型工具类（int/long等包装工具）     |
| EventBus    | 简单的事件总线框架                  |
| Math        | 数学运算辅助                     |
| IO          | IO流封装（Files、ByteStreams等）  |

简单说，**Guava = Java开发的瑞士军刀**。

## 二、Guava Cache

官方Wiki：[https://github.com/google/guava/wiki/CachesExplained](https://github.com/google/guava/wiki/CachesExplained)
