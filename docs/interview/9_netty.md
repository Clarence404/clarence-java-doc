# 开发总结-Netty 与网络

> 精华提炼，细节详见 [netty/](../netty/1_io_model)、[protocols/](../protocols/0_protocols_base)

## IO 模型对比

| 模型 | 特点 |
|------|------|
| BIO（阻塞 IO） | 一连接一线程，高并发时线程资源耗尽 |
| NIO（非阻塞 IO） | Selector 多路复用，一线程处理多连接 |
| AIO（异步 IO） | 内核完成 IO 后回调，Windows IOCP 成熟，Linux 支持一般 |

## Reactor 模型

- **单 Reactor 单线程**：Acceptor + Handler 在同一线程
- **单 Reactor 多线程**：Handler 交给线程池，Acceptor 单线程
- **主从 Reactor**（Netty 默认）：BossGroup 处理连接，WorkerGroup 处理 IO

## Netty 核心组件

- `Channel`：网络连接抽象
- `EventLoop`：单线程事件循环，处理 IO + 任务队列
- `ChannelPipeline`：处理器链，入站（Inbound）/ 出站（Outbound）
- `ByteBuf`：池化内存管理，零拷贝支持（CompositeByteBuf / FileRegion）

## 粘包与拆包

- 原因：TCP 是流协议，无消息边界
- 解决：固定长度 / 分隔符 / 长度字段（`LengthFieldBasedFrameDecoder`）

## 常见 TCP 问题

- **TIME_WAIT 大量**：服务端主动关闭连接，开启 `SO_REUSEADDR`、调整 `tcp_tw_reuse`
- **CLOSE_WAIT 大量**：应用层未及时调用 close，检查代码资源释放
- **三次握手 / 四次挥手**：建连为何 3 次（防止历史连接）、断连为何 4 次（半关闭状态）

## HTTP 演进

| 版本 | 关键特性 |
|------|----------|
| HTTP/1.1 | 持久连接、管道化（有队头阻塞） |
| HTTP/2 | 多路复用、头部压缩（HPACK）、服务器推送 |
| HTTP/3 | 基于 QUIC（UDP），消除 TCP 队头阻塞 |
