# 缓存一致性

参考文章：
- [https://mp.weixin.qq.com/s/idAReeR2Fqe6O6_ayq6AkA?scene=1](https://mp.weixin.qq.com/s/idAReeR2Fqe6O6_ayq6AkA?scene=1)
- [https://cloud.tencent.com/developer/article/1932934](https://cloud.tencent.com/developer/article/1932934)

## 一、经典场景对比

```mermaid
flowchart TD
    %% 第一行：Cache Aside 居中
    subgraph CA["Cache Aside（旁路缓存）"]
        direction TB
        CA1[应用读取数据] --> CA2{缓存命中?}
        CA2 -- 是 --> CA3[返回缓存数据]
        CA2 -- 否 --> CA4[查询数据库]
        CA4 --> CA5[写入缓存]
        CA5 --> CA6[返回数据]
        CA7[应用更新数据] --> CA8[更新数据库]
        CA8 --> CA9[删除缓存]
    end

    %% 第二行：Read/Write Through（读写穿透）
    subgraph RW["Read/Write Through（读写穿透）"]
        direction TB
        RW1[应用读取数据] --> RW2{缓存命中?}
        RW2 -- 是 --> RW3[返回缓存数据]
        RW2 -- 否 --> RW4[缓存从数据库加载并写回]
        RW4 --> RW5[返回数据]
        RW6[应用更新数据] --> RW7[更新缓存]
        RW7 --> RW8[缓存自动写数据库（同步）]
    end

    %% 第二行：Write Behind（写回缓存）
    subgraph WB["Write Behind（写回缓存）"]
        direction TB
        WB1[应用读取数据] --> WB2{缓存命中?}
        WB2 -- 是 --> WB3[返回缓存数据]
        WB2 -- 否 --> WB4[缓存从数据库加载并写回]
        WB4 --> WB5[返回数据]
        WB6[应用更新数据] --> WB7[更新缓存]
        WB7 --> WB8[异步批量写入数据库]
    end

    %% 布局关系
    CA --> RW
    CA --> WB

```

## 二、各方案优缺点对比

### 1、三种方案核心区别

#### 读操作时：

- Cache Aside 方式，是应用自己实现缓存回写
- Read/Write Through 与 Write Behind 模式，是缓存组件实现回写（如：Spring Cache、guava、Caffeine等）

#### 写操作时：

- Cache Aside 方式，是先更新数据库，再删除缓存
- Read/Write Through 与 Write Behind 模式，是先更新缓存，再更新数据库：
  - Read/Write Through 是缓存自动写入数据库（单条写）
  - Write Behind 是缓存自动写入数据库（批量写）

### 2、todo other difference
