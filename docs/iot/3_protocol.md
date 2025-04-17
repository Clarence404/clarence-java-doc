# IoT 传输协议

在物联网（IoT）中，设备之间的通信对带宽、能耗、实时性有较高要求，因此需要使用轻量级、低功耗的通信协议。常见的传输协议包括
MQTT、CoAP、HTTP、AMQP、LoRaWAN 等，其中 MQTT 和 CoAP 是应用最广泛的两种。

---

## 一、MQTT

英文全称：Message Queuing Telemetry Transport

### 1、简介

MQTT 是一种轻量级的**发布/订阅模型**的通信协议，特别适用于低带宽、高延迟或不稳定的网络环境。由 IBM 开发，后成为 OASIS 标准。

### 2、特点

- 基于 TCP 协议传输
- 使用 **发布/订阅（Pub/Sub）** 模型，解耦客户端
- 支持 QoS（服务质量）等级：0（最多一次）、1（至少一次）、2（只有一次）
- 适合资源受限设备（如传感器、边缘设备）
- 保持会话（Keep Alive）机制可提升稳定性

### 3、应用场景

- 智能家居（如小米米家、阿里天猫精灵）
- 远程设备监控
- 智慧农业 / 智慧城市

### 4、开源 Broker

1. **EMQX（推荐）**
    - 高性能、企业级 MQTT Broker
    - 支持 MQTT 3.1.1、5.0，支持集群、桥接、安全认证
    - Web 管理界面 + 插件化架构
    - 官网：[https://www.emqx.io](https://www.emqx.io)

2. **Mosquitto**
    - Eclipse 基金会项目，体积小，适合嵌入式部署
    - 支持 MQTT 3.1 和 3.1.1，简单易用
    - 缺点：功能比较基础，适合轻量使用
    - 官网：[https://mosquitto.org](https://mosquitto.org)

3. **VerneMQ**
    - Erlang 编写，支持分布式和高并发连接
    - 适合大规模部署和弹性扩展
    - 支持 MQTT 5、插件开发、桥接等

4. **HiveMQ**
    - 商业版本功能强大，也提供开源版本
    - 提供可视化管理、MQTT 5 支持好
    - 适合工业和企业级应用

---

## CoAP

英文全称：Constrained Application Protocol

### 1、简介

CoAP 是为 IoT 设计的基于 REST 架构的协议，由 IETF 设计，运行于 UDP 之上。它是 HTTP 的简化版，更适合受限设备和低功耗通信环境。

### 2、特点

- 基于 UDP（更轻量）
- 类似 HTTP 的资源路径模型（GET/POST/PUT/DELETE）
- 支持可选的可靠性（使用 ACK、重传机制）
- 支持多播、Observe（观察）机制
- 消息结构更小，适用于低带宽网络

### 3、应用场景

- 微控制器设备（如 STM32、ESP8266）
- 局域网内的 IoT 网络
- 低功耗广域网（如 NB-IoT）

### 4、开源 CoAP Server

#### 1. **Eclipse Californium（Java）🔥推荐**
- 支持完整 CoAP 协议（RFC 7252、Observe、Block、DTLS 等）
- 丰富的 API 和插件机制
- 可用于搭建独立的 CoAP Server 或作为边缘网关嵌入 Java 应用

📌 示例项目：使用 Californium 搭建一个接收 `/sensors/temperature` 数据的服务端。

项目地址：[https://github.com/eclipse/californium](https://github.com/eclipse/californium)

---

#### 2. **libcoap（C）**
- 轻量级 CoAP 实现，专为嵌入式设备设计
- 支持 UDP、DTLS、TCP 等传输层
- 可运行在裸机/RTOS 上

项目地址：[https://github.com/obgm/libcoap](https://github.com/obgm/libcoap)

适合场景：在 STM32 或 ESP32 这类 MCU 上直接构建 CoAP 服务。

---

#### 3. **aiocoap（Python 3）**
- 基于 `asyncio` 的现代 CoAP 实现
- 适合快速开发和原型验证
- 支持 Observe、Blockwise、DTLS（可选）

项目地址：[https://github.com/chrysn/aiocoap](https://github.com/chrysn/aiocoap)

适合场景：需要快速构建 Python 后台服务处理 IoT 设备数据。

---

#### 4. **node-coap（Node.js）**
- 简洁的 Node.js 实现，支持 GET/PUT/POST/DELETE
- API 设计类似 Express.js

项目地址：[https://github.com/mcollina/node-coap](https://github.com/mcollina/node-coap)

适合场景：Node.js 全栈项目或边缘控制中心。


#### CoAP总结

| 项目 | 语言 | 特点 | 推荐场景 |
|------|------|------|-----------|
| **Californium** | Java | 功能最全，企业级可用 | 云平台/边缘网关 |
| **libcoap** | C | 极致轻量，适合嵌入式 | MCU、RTOS |
| **aiocoap** | Python | 上手快，适合原型开发 | 教学、PoC |
| **node-coap** | JS | 快速开发、IoT 原型 | Node 全栈 |


## 三、MQTT vs CoAP 对比

| 特性   | MQTT        | CoAP           |
|------|-------------|----------------|
| 协议类型 | 发布/订阅       | 请求/响应（类 HTTP）  |
| 传输协议 | TCP         | UDP            |
| 可靠性  | 高，支持 QoS    | 轻量，支持重传但不强制可靠性 |
| 消息大小 | 中           | 小（适合低带宽）       |
| 编程模型 | 异步          | 同步/异步（支持观察）    |
| 支持多播 | 不支持         | 支持             |
| 适用场景 | 需要稳定连接、状态保留 | 网络不稳定、对功耗敏感    |