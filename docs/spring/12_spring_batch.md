# Spring Batch

> 参考资料：
> * Spring Batch 官方文档：[https://docs.spring.io/spring-batch/reference/](https://docs.spring.io/spring-batch/reference/)
> * Spring Batch 入门：[https://www.baeldung.com/introduction-to-spring-batch](https://www.baeldung.com/introduction-to-spring-batch)

## 一、核心模型

```
Job（作业）
  └── Step（步骤，可多个）
        └── Chunk（分块处理）
              ├── ItemReader    读取数据
              ├── ItemProcessor 处理/转换数据
              └── ItemWriter    写入数据
```

**Chunk 模式**：每次读取 N 条数据，处理后批量写入，兼顾内存和性能。

## 二、适用场景

- 数据迁移（旧系统 → 新系统）
- 报表生成（定时汇总大量数据）
- 对账（批量核对交易记录）
- ETL（数据抽取 / 转换 / 加载）

## 三、与定时任务的关系

Spring Batch 专注**批量处理逻辑**，本身不负责调度。通常配合：
- `@Scheduled` 简单定时触发
- Quartz / XXL-Job 做复杂调度

> [!warning]
> 待补充
