# DB migration 工具

> 参考博客：[https://www.cnblogs.com/cndarren/p/12435787.html](https://www.cnblogs.com/cndarren/p/12435787.html)

## 写在前面

最近由于项目变更比较大，需要经常修改表结构，然后对应的测试，开发，生产环境数据库均要修改，有时候一不小心就忘记修改某个环境下的数据库了，
等出问题才发现表结构没有更新，如果项目还没上线，还可以把表删除了重新创建，但是如果项目已经上线了，就不能这样简单粗暴了，我们需要通过
SQL 脚本 在已有数据表的基础上进行升级。鉴于这种情况，于是决定寻找数据库版本控制工具。

在Java这部分，对数据库版本控制的主要有两个工具：

- Flyway
- Liquibase

两个工具各有千秋，但是核心功能都是数据库的版本管理，这里主要来看 Flyway。就像我们使用 Git 来管理代码版本一样，Flyway
可以用来管理数据库版本。

Flyway官网地址：[https://flywaydb.org](https://flywaydb.org)

## Flyway

todo


