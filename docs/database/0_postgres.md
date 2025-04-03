# PostgreSQL

- **官网**：[PostgreSQL 官网](https://www.postgresql.org/)

## 一、基础介绍

- **背景**：PostgreSQL 是一个开源的关系型数据库管理系统（RDBMS），最初由加利福尼亚大学伯克利分校的研究团队在 1986
  年开始开发，最初的名字叫做 Postgres。
- **来源**：PostgreSQL 并非中国的数据库，而是源自美国的开源项目。
- **特点**：
    - 全球范围内广泛使用的开源数据库，具有高可扩展性和强大的事务支持。
    - 支持 SQL 标准，具备丰富的功能，如 JSON 数据类型、地理信息系统（GIS）功能（PostGIS）等。
    - 在全球范围内有广泛的社区支持和开发者贡献。

## 二、安装使用

```shell
services:
  postgres:
    image: postgres:17.4-bookworm
    container_name: postgres
    restart: always
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: 123456
    ports:
      - "5432:5432"
    volumes:
      - ./postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:

```

## 三、核心概念


## 四、常用命令

