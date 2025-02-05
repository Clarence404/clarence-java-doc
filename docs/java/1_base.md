# Java基础

## 一、Hashmap基本原理

HashMap 是一种基于哈希表的数据结构，它实现了 Map 接口，用于存储键值对 (key-value)。其基本原理如下：

### 1. 哈希表（Hash Table）

HashMap 是基于哈希表实现的，哈希表的基本思想是通过将数据的键值对映射到一个数组的索引位置上来提高数据查找的效率。具体流程如下：

- 哈希函数：
 HashMap 使用哈希函数将键（key）映射到数组的索引位置。哈希函数的目的是通过计算一个值，将不同的键映射到哈希表中的位置。

- 数组：
哈希表内部使用一个数组来存储数据。数组中的每个元素存储一个链表（或者在 Java 8 后是 <RouteLink to="/algorithm/0_base#红黑树-balanced-binary-search-tree-bbst">红黑树</RouteLink>），用于处理哈希冲突。

### 2. 哈希冲突
由于哈希函数不可能做到完全唯一的映射，不同的键可能会被映射到相同的索引，这种情况称为哈希冲突。HashMap 通过以下方式解决哈希冲突：

- 链表法（链式哈希）： 在发生冲突的情况下，HashMap 会将冲突的键值对存储到一个链表中（或者 <RouteLink to="/algorithm/0_base#红黑树-balanced-binary-search-tree-bbst">红黑树</RouteLink>）。当多个元素映射到同一个索引位置时，它们会形成一个链表。

-  <RouteLink to="/algorithm/0_base#红黑树-balanced-binary-search-tree-bbst">红黑树</RouteLink>法：在 Java 8 及以后的版本中，如果链表的长度超过一定阈值（默认为 8），HashMap 会将链表转化为 <RouteLink to="/algorithm/0_base#红黑树-balanced-binary-search-tree-bbst">红黑树</RouteLink>，以提高查询效率。

### 3. 扩容机制

当 HashMap 中的元素过多时，哈希表的负载因子（load factor）可能会达到阈值，导致哈希表的存储效率降低。默认情况下，负载因子为 0.75。**当元素个数超过当前容量 * 负载因子时，HashMap 会进行扩容**（通常是原数组大小的 2 倍）。

扩容过程中，所有元素的哈希值会被重新计算，并重新放置到新的数组位置。这是因为**哈希表的大小发生变化，导致原先的索引位置不再适用**。

### 4. 时间复杂度

- 查找、插入、删除操作的时间复杂度：

在理想情况下，哈希表的查找、插入和删除操作的时间复杂度为 O(1)。但是，如果发生哈希冲突，性能会退化到 O(n)（链表长度为 n 时）。使用 <RouteLink to="/algorithm/0_base#红黑树-balanced-binary-search-tree-bbst">红黑树</RouteLink>优化后，最坏情况下时间复杂度为 O(log n)。

- 扩容操作的时间复杂度：

扩容是一个相对耗时的操作，时间复杂度为 O(n)，但扩容操作是按需进行的，不是频繁发生，因此平均而言，HashMap 的操作仍然是 O(1)。

### 5. 关键特点
- 非线程安全：HashMap 不是线程安全的，如果在多线程环境下使用，需要考虑同步问题。 
- 允许 null 键和 null 值：HashMap 允许一个 null 键和多个 null 值。 
- 元素顺序不保证：HashMap 不保证键值对的顺序，因为它是基于哈希函数计算索引的，顺序是无序的。如果需要顺序，可以使用 LinkedHashMap

## 二、TreeMap分析

### 1、源码分析

- TreeMap 的核心特点

| 特性              | 	说明                                                 |
|-----------------|-----------------------------------------------------|
| 底层实现            | 	 <RouteLink to="/algorithm/0_base#红黑树-balanced-binary-search-tree-bbst">红黑树</RouteLink>（Red-Black Tree），是一种自平衡二叉搜索树（BST）               |
| 排序方式            | 	默认按 key 的 自然顺序（Comparable） 排序，也可以传入 自定义 Comparator |
| 时间复杂度           | 	O(log n)（增、删、查）                                    |
| 是否允许 null key   | 	❌ 不允许 null key（会抛 NullPointerException）            |
| 是否允许 null value | 	✅ 允许 null value                                    |
| 是否线程安全          | 	❌ 非线程安全（需要 Collections.synchronizedMap() 保护）       |

- 类关联图如下所示：

![image.png](../assets/java/TreeMap.png)

::: important 使用途径
适用于需要 "**自动排序**" 和 "**范围查询**" 的场景。
:::


1、适用场景：数据存储时要求按照 key 进行排序，方便后续查询和展示
```java
TreeMap<Integer, String> productMap = new TreeMap<>();
productMap.put(102, "iPhone");
productMap.put(101, "Samsung");
productMap.put(103, "Huawei");

// 遍历时 key 是按顺序排序的（101, 102, 103）
for (Map.Entry<Integer, String> entry : productMap.entrySet()) {
    System.out.println(entry.getKey() + " -> " + entry.getValue());
}
```
2、需要 "范围查询" 或 "区间搜索"
```java
TreeMap<Long, String> transactionMap = new TreeMap<>();
transactionMap.put(1707052800000L, "订单 A");  // 2024-02-05 00:00:00
transactionMap.put(1707139200000L, "订单 B");  // 2024-02-06 00:00:00
transactionMap.put(1707225600000L, "订单 C");  // 2024-02-07 00:00:00

// 获取 2 月 5 日到 2 月 6 日之间的交易
Map<Long, String> result = transactionMap.subMap(1707052800000L, 1707139200000L);
System.out.println(result);
```

### 2、相关类对比

| 对比项              | TreeMap                      | HashMap                          | LinkedHashMap                 | ConcurrentSkipListMap         |
|----------------------|-----------------------------|----------------------------------|--------------------------------|-------------------------------|
| **底层数据结构**     |  <RouteLink to="/algorithm/0_base#红黑树-balanced-binary-search-tree-bbst">红黑树</RouteLink>（Red-Black Tree）    | 哈希表（数组 + 链表/ <RouteLink to="/algorithm/0_base#红黑树-balanced-binary-search-tree-bbst">红黑树</RouteLink>）      | 哈希表 + 双向链表             | 跳表（Skip List）            |
| **key 是否有序**    | ✅ 有序（按 key 排序）       | ❌ 无序                          | ✅ 按插入顺序排序             | ✅ 有序（按 key 排序）        |
| **时间复杂度**      | O(log n)                    | O(1) 平均，O(n) 最坏              | O(1) 平均，O(n) 最坏          | O(log n)                     |
| **是否允许 null key** | ❌ 不允许                     | ✅ 允许                          | ✅ 允许                        | ❌ 不允许                      |
| **是否允许 null value** | ✅ 允许                      | ✅ 允许                          | ✅ 允许                        | ✅ 允许                        |
| **线程安全**        | ❌ 非线程安全                 | ❌ 非线程安全                     | ❌ 非线程安全                  | ✅ 线程安全                    |
| **适用场景**        | 需要排序、范围查询、导航结构  | 快速查找、无序存储、大量数据       | 需要按插入顺序遍历的场景       | 并发环境下的有序映射          |
| **主要应用**        | 排名、日志存储、区间查找      | 缓存、映射查找、对象存储          | LRU 缓存、访问顺序存储        | 线程安全的排序映射结构        |



## 三、HashMap和HashTable的区别

## 四、HashMap和ConcurrentHashMap的区别

### 1、两者区别

### 2、CurrentHashMap为何放弃分段锁？

## 五、ThreadLocal

### 1、原理及其应用

### 2、Transmittable ThreadLocal
