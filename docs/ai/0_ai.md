# 人工智能

## 一、三大主流开发框架

> 官网入口汇总：
>
> * **Spring AI**：[https://docs.spring.io/spring-ai/](https://docs.spring.io/spring-ai/)
> * **LangChain4j**：[https://github.com/langchain4j/langchain4j](https://github.com/langchain4j/langchain4j)
> * **Jlama**：[https://github.com/tjake/Jlama](https://github.com/tjake/Jlama)

### 1. Spring AI

Spring 官方推出的 AI 集成框架，支持多种 LLM 接入与 Prompt 管理。适用于与 Spring Boot 紧密集成的企业级开发场景。

### 2. LangChain4j

LangChain 的 Java 实现，支持链式调用、工具接入、RAG 模式等，适用于构建复杂的 AI 工作流。

### 3. Jlama

一个轻量级 Java LLM 接入库，关注本地部署与快速集成，适合小型项目或边缘部署场景。

---

## 二、两大关键技能

> 相关资源推荐：
> * **RAG 概念**：[https://www.pinecone.io/learn/retrieval-augmented-generation/](https://www.pinecone.io/learn/retrieval-augmented-generation/)
> * **Fine-tuning 教程（OpenAI）**：[https://platform.openai.com/docs/guides/fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)

### 1. RAG

全称：Retrieval-Augmented Generation

检索增强生成：结合知识库与大模型，先检索、后生成，提升大模型回答的准确性与上下文相关性。

### 2. Fine-tuning（微调）

在基础模型之上，利用领域数据做再训练，使模型更好适配特定业务场景或风格要求。

---

## 三、MCP 协议简介

官网地址：[https://mcp-docs.cn/introduction](https://mcp-docs.cn/introduction)

MCP（Model Connection Protocol）是一个开放协议，用于标准化 LLM 与外部数据、工具集成的接口方式。

你可以将 MCP 想象为 AI 系统中的 **USB-C 接口**，它让各种模型与资源连接变得更简单、更统一。

### 为什么选择 MCP？

* ✅ 提供丰富的预构建集成，降低接入成本
* ✅ 兼容多种 LLM 提供商与模型能力
* ✅ 易于在本地环境中部署，确保数据安全与隐私合规
