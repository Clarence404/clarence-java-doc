# 主流大语言模型

> 参考资料：
> * LMSYS Chatbot Arena（模型能力榜单）：[https://chat.lmsys.org/](https://chat.lmsys.org/)
> * Open LLM Leaderboard：[https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)

---

## 一、闭源商业模型

| 模型系列 | 厂商 | 代表模型 | 上下文窗口 | 特点 |
|---------|------|---------|-----------|------|
| GPT 系列 | OpenAI | GPT-4o / o3 | 128K | 综合能力强，生态最成熟 |
| Claude 系列 | Anthropic | Claude 3.7 Sonnet | 200K | 长上下文，代码与分析见长 |
| Gemini 系列 | Google | Gemini 2.5 Pro | 1M | 多模态，与 Google 生态集成 |

### 1.1 GPT 系列（OpenAI）

> 官网：[https://platform.openai.com/docs/models](https://platform.openai.com/docs/models)

> [!warning]
> 待补充

### 1.2 Claude 系列（Anthropic）

> 官网：[https://docs.anthropic.com/en/docs/about-claude/models/](https://docs.anthropic.com/en/docs/about-claude/models/)

> [!warning]
> 待补充

### 1.3 Gemini 系列（Google）

> 官网：[https://ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models)

> [!warning]
> 待补充

---

## 二、开源模型

| 模型系列 | 机构 | 代表模型 | 特点 |
|---------|------|---------|------|
| Llama 系列 | Meta | Llama 3.3 70B | 开源生态最广，社区活跃 |
| DeepSeek 系列 | 深度求索 | DeepSeek-V3 / R1 | 国产，性价比极高，推理能力强 |
| Qwen 系列 | 阿里 | Qwen2.5 72B | 中文能力突出，多语言支持好 |
| Mistral 系列 | Mistral AI | Mistral Large | 欧洲出品，轻量高效 |

### 2.1 Llama 系列（Meta）

> 官网：[https://llama.meta.com/](https://llama.meta.com/)

> [!warning]
> 待补充

### 2.2 DeepSeek 系列

> 官网：[https://www.deepseek.com/](https://www.deepseek.com/)
> API 文档：[https://api-docs.deepseek.com/](https://api-docs.deepseek.com/)

> [!warning]
> 待补充

### 2.3 Qwen 系列（阿里）

> 官网：[https://qwenlm.github.io/](https://qwenlm.github.io/)
> Hugging Face：[https://huggingface.co/Qwen](https://huggingface.co/Qwen)

> [!warning]
> 待补充

---

## 三、模型选型参考

### 3.1 按使用场景选型

| 场景 | 推荐模型 | 理由 |
|------|---------|------|
| 企业 API 集成 | GPT-4o / Claude 3.7 | 稳定、文档完善、SDK 成熟 |
| 成本敏感型项目 | DeepSeek-V3 / Qwen2.5 | 价格极低，效果不差 |
| 本地私有化部署 | Llama 3 / DeepSeek / Qwen | 开源可商用，支持 Ollama 运行 |
| 长文档处理 | Claude 3.7（200K） / Gemini 2.5（1M） | 超长上下文窗口 |
| 中文场景 | Qwen2.5 / DeepSeek | 中文训练数据充分 |

### 3.2 本地部署推荐参数

| 显存 / 内存 | 推荐模型大小 | 示例 |
|------------|------------|------|
| 8GB 显存 | 7B 量化版 | Qwen2.5-7B-Q4 |
| 16GB 显存 | 13B / 14B | Llama3-13B |
| 24GB 显存 | 32B 量化版 | DeepSeek-R1-32B-Q4 |
| 纯 CPU / 内存 | 3B ~ 7B 量化 | 速度较慢，适合测试 |
