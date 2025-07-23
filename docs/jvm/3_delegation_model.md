# 双亲委派模型

## 加载机制
- 类加载器先将加载请求委托给父类加载器，直到顶层 Bootstrap 加载器。

## 优点
- 避免类重复加载，提高安全性。

## 打破机制的场景
- SPI（Service Provider Interface）
- 应用容器如 Tomcat
- 模块化框架如 OSGi
