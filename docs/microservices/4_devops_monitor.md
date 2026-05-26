# 运维与监控

## 一、容器化与编排（Docker、Kubernetes）

容器技术和编排系统是现代运维体系的基石。Docker 作为轻量级容器化工具，提供了封装和隔离应用的能力；而 Kubernetes
则负责管理这些容器的部署、伸缩和高可用。

详见：

- <RouterLink to="/cloud-native/3_docker.html">Docker 基础与实践</RouterLink> ：介绍容器原理、Dockerfile 编写、镜像构建、容器管理等内容。
- <RouterLink to="/cloud-native/4_kubernetes.html">Kubernetes 核心组件与部署</RouterLink>：涵盖
  Pod、Deployment、Service、Ingress 等关键概念，并介绍
  Helm、Namespace、RBAC 等进阶内容。

# 日志管理、监控与告警及自动化部署工具汇总

## 二、日志管理（ELK、Loki、Fluentd）

### 1、ELK Stack（Elasticsearch + Logstash + Kibana）

一个经典的日志收集、存储、搜索和可视化平台。Elasticsearch 用于高效存储和全文索引日志数据，Logstash
负责日志采集和处理，Kibana用于日志的可视化分析。适合企业级复杂日志查询和分析场景。

- 官网：[https://www.elastic.co/elastic-stack](https://www.elastic.co/elastic-stack)

### 2、Loki

由 Grafana Labs 开发的轻量级日志聚合系统，设计理念类似于 Prometheus，主要通过标签索引日志，降低存储成本。非常适合 Kubernetes
等云原生环境，与 Grafana 集成紧密，支持快速查看和过滤日志。

- 官网：[https://grafana.com/oss/loki/](https://grafana.com/oss/loki/)

### 3、Fluentd

一款开源的日志收集和转发工具，具有丰富的插件生态，支持将日志从不同来源采集后转发至 Elasticsearch、Loki、Kafka
等多个后端。灵活且稳定，是日志流水线的重要组件。

- 官网：[https://www.fluentd.org/](https://www.fluentd.org/)

## 三、监控与告警（Prometheus、Grafana、SkyWalking、Zipkin）

### 1、Prometheus

开源的时序数据库与监控系统，支持多维度数据模型和灵活的查询语言 PromQL，擅长采集指标数据，特别适合云原生环境。支持服务发现、自动拉取数据，
并内置告警管理组件 Alertmanager。

- 官网：[https://prometheus.io/](https://prometheus.io/)

### 2、Grafana

强大的开源数据可视化平台，支持多种数据源（Prometheus、InfluxDB、Elasticsearch等），可定制丰富的监控面板和图表，方便运维人员实时监控系统状态。

- 官网：[https://grafana.com/](https://grafana.com/)

### 3、SkyWalking

分布式应用性能监控和链路追踪系统，支持多语言，能够对复杂微服务调用链进行深入分析和可视化，帮助快速定位性能瓶颈和故障。

- 官网：[https://skywalking.apache.org/](https://skywalking.apache.org/)

### 4、Zipkin

轻量级分布式追踪系统，能够采集和展示微服务调用链的时序数据，帮助开发者理解请求路径和延迟情况，便于追踪跨服务问题。

- 官网：[https://zipkin.io/](https://zipkin.io/)

## 四、自动化部署（CI/CD：Jenkins、GitLab CI/CD、ArgoCD）

### 1、Jenkins

经典的开源自动化服务器，支持构建、测试、部署全过程自动化。插件丰富，能够集成多种工具和平台，广泛应用于传统及云原生环境的持续集成与持续交付。

- 官网：[https://www.jenkins.io/](https://www.jenkins.io/)

### 2、GitLab CI/CD

GitLab 内置的 CI/CD 功能，深度集成代码托管，支持流水线定义、自动测试和自动部署，简化 DevOps 流程，提升开发效率。

- 官网：[https://docs.gitlab.com/ee/ci/](https://docs.gitlab.com/ee/ci/)

### 3、ArgoCD

Kubernetes 原生的持续交付工具，实现 GitOps 模式，通过声明式配置管理 Kubernetes 应用状态，确保集群与 Git
仓库配置同步，实现高效稳定的自动化部署。

- 官网：[https://argo-cd.readthedocs.io/](https://argo-cd.readthedocs.io/)
