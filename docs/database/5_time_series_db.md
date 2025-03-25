# 时序数据库

## InfluxDB

### 1、背景介绍
目前存在两个InfluxDB的实现，一个是开源的，一个是商业的。开源版本不支持集群模式。

开源版本为 1.x 和 2.x的版本，此处只讨论 1.x版本。

1.x版本和2.x版本区别：

- **架构变化**：1.x 采用单体架构，2.x 整合了多个组件（如Telegraf、Kapacitor），提供一站式解决方案。
- **API 变化**：1.x 使用 InfluxQL 类 SQL 查询语言，2.x 推出了 Flux 查询语言，功能更强大但学习成本更高。
- **用户管理**：1.x 用户管理较为基础，2.x 支持多用户、多组织，安全管理更细致。
- **数据存储**：2.x 引入了 Bucket（桶）的概念，取代了 1.x 的数据库和保留策略概念。


### 2、1.x 安装

个人安装使用docker-compose形式安装，代码如下所示：

```dockerfile
docker-compose.yml

services:
  influxdb:
    # 此处的镜像可能失效，后续随时更新
    image: docker.1ms.run/library/influxdb:1.11.7
    container_name: influxdb
    environment:
      INFLUXDB_ADMIN_USER: root
      INFLUXDB_ADMIN_PASSWORD: 123456
    ports:
      - "8086:8086"
    volumes:
      - ./influxdb_data:/var/lib/influxdb
    restart: always
```

### 3、1.x 使用

基础的语法等同与SQL语法，详情可以参考官方文档。

#### 3.1、命令行方式

```bash
# 进入InfluxDB交互界面
influx

# 创建数据库
CREATE DATABASE mydb

# 查看数据库
SHOW DATABASES

# 使用指定数据库
USE mydb

# 插入数据
INSERT cpu,host=serverA value=0.64

# 查询数据
SELECT * FROM cpu
```

#### 3.2、InfluxDB Studio方式

InfluxDB Studio 是一个开源的图形化管理工具，支持 Windows，可以方便地查询、管理 InfluxDB 数据库。

### 4、1.x 其他特性

#### 4.1、1.x 索引

1.x 版本使用的是 `tsi1`（Time Series Index），适合大规模数据存储，默认不开启，需要手动配置。

开启索引的方法：

```toml
[data]
  index-version = "tsi1"
```

重启服务后生效。

---

### 4、2.x 安装

```dockerfile
services:
  influxdb_v2:
    image: docker.1ms.run/library/influxdb:2.7.10
    container_name: influxdb_v2
    environment:
      INFLUXDB_ADMIN_USER: root
      INFLUXDB_ADMIN_PASSWORD: 123456
    ports:
      - "8087:8086"
    volumes:
      - ./influxdb_data_v2:/var/lib/influxdb
    restart: always
```

### 5、2.x 使用

#### 5.1、初始化配置

访问 `http://localhost:8087`，会进入初始化界面，创建组织、Bucket、Token。

创建完成后，记下 Token 方便后续使用。

示例 Token（仅供参考）：

```
4TnxeZiruEm9pjlI3BIXTH8XYgIwMgr_ghy9Phj_YoXpJSABig_FhEkOVKWTaKPMeHPjAcVWx5UqviEGs1BZxg==
```

#### 5.2、数据写入

2.x 支持多种方式写入数据，最常见的是 `CLI` 和 `API`。

**CLI方式**

```bash
influx write \
  --bucket my-bucket \
  --org my-org \
  --token my-token \
  --precision s \
  "sensor,location=room1 temperature=25.3,humidity=60"
```

**API方式**

```bash
curl -X POST "http://localhost:8087/api/v2/write?org=my-org&bucket=my-bucket&precision=s" \
  --header "Authorization: Token my-token" \
  --data-raw "sensor,location=room1 temperature=25.3,humidity=60"
```

#### 5.3、数据查询

2.x 默认使用 Flux 语言查询数据，示例：

```flux
from(bucket: "my-bucket")
  |> range(start: -1h)
  |> filter(fn: (r) => r._measurement == "sensor")
  |> filter(fn: (r) => r.location == "room1")
```

### 6、总结

| 特性         | InfluxDB 1.x | InfluxDB 2.x |
|--------------|-------------|-------------|
| **查询语言** | InfluxQL    | Flux        |
| **管理方式** | CLI         | Web UI      |
| **权限管理** | 基础权限     | 支持多用户多组织 |
| **索引方式** | tsi1        | 更高效的索引 |
| **数据写入** | HTTP API    | CLI / API   |

**建议**：
- **1.x 版本**适合老项目迁移、轻量级应用
- **2.x 版本**适合新项目，功能更强大，尤其是多组织、多用户支持

