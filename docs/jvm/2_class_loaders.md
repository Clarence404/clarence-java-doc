# 类加载器机制

## 启动类加载器（Bootstrap）

- 加载 `JAVA_HOME/lib` 里的核心类。

## 扩展类加载器（ExtClassLoader）

- 加载 `JAVA_HOME/lib/ext` 目录下的类。

## 应用类加载器（AppClassLoader）

- 加载 classpath 指定路径下的类。

## 自定义类加载器

- 可实现类隔离、热加载等高级功能。

## 类加载过程

包括：加载 → 验证 → 准备 → 解析 → 初始化

加载：读取 .class 文件生成 Class 对象。

验证：检查字节码合法性。

准备：为静态变量分配内存并初始化默认值。

解析：将符号引用转换为直接引用。

初始化：执行类构造器 `<clinit>` 方法。
