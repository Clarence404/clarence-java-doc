# 四、责任链模式

**作用**：将请求沿着处理链传递，多个处理者可对其进行处理。

**应用场景**：

- Spring Security 过滤器（FilterChain）
- Netty 责任链（ChannelPipeline）
- 日志处理（不同级别日志）