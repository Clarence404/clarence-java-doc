# 类加载器机制

## 启动类加载器（Bootstrap）

- 加载 `JAVA_HOME/lib` 里的核心类（如 rt.jar、resources.jar）。
- 由 C++ 实现，是 JVM 自身的一部分。
- 无法通过 Java 代码直接获取（返回 null）。
- 加载路径可通过 -Xbootclasspath 指定。

## 扩展类加载器（ExtClassLoader）

- 加载 `JAVA_HOME/lib/ext` 目录下的类。
- Java 实现，继承自 URLClassLoader。
- JDK9 之后被平台类加载器（PlatformClassLoader）替代。

## 应用类加载器（AppClassLoader）

- 加载 classpath 指定路径下的类。
- 也称为系统类加载器（SystemClassLoader）。
- 加载用户编写的类和第三方库。

## 自定义类加载器

- 可实现类隔离、热加载等高级功能。
- 继承 ClassLoader 类，重写 findClass 方法。
- 常见应用：Tomcat、OSGi、热部署。

```java
public class CustomClassLoader extends ClassLoader {
    private String classPath;

    public CustomClassLoader(String classPath) {
        this.classPath = classPath;
    }

    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        try {
            byte[] classData = loadClassData(name);
            return defineClass(name, classData, 0, classData.length);
        } catch (IOException e) {
            throw new ClassNotFoundException(name);
        }
    }

    private byte[] loadClassData(String name) throws IOException {
        String path = classPath + name.replace('.', '/') + ".class";
        try (InputStream in = new FileInputStream(path);
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            int b;
            while ((b = in.read()) != -1) {
                out.write(b);
            }
            return out.toByteArray();
        }
    }
}
```

## 类加载过程

包括：加载 → 验证 → 准备 → 解析 → 初始化

### 加载（Loading）

- 读取 .class 文件生成 Class 对象。
- 获取类的二进制字节流（文件、网络、动态生成）。
- 将字节流转换为方法区的运行时数据结构。
- 在堆中生成 Class 对象作为访问入口。

### 验证（Verification）

- 检查字节码合法性，确保加载的类符合 JVM 规范。
- 文件格式验证：魔数、版本号、常量池类型等。
- 字节码验证：数据类型、操作数栈、局部变量表等。
- 符号引用验证：类、字段、方法的引用是否可访问。
- 可通过 -Xverify:none 关闭验证（不推荐）。

### 准备（Preparation）

- 为静态变量分配内存并初始化默认值。
- 只设置默认值（0、null、false），不设置初始值。
- 特例：static final 常量在准备阶段直接设置为指定值。

```java
// 准备阶段：value = 0
public static int value = 123;

// 准备阶段：CONSTANT = 123
public static final int CONSTANT = 123;
```

### 解析（Resolution）

- 将符号引用转换为直接引用。
- 符号引用：用字符串描述引用的目标（如 com.example.User）。
- 直接引用：指向目标的指针、相对偏移量或句柄。
- 包括：类或接口解析、字段解析、方法解析、接口方法解析。
- 可通过 -XX:+ClassUnloadingWithConcurrentMark 延迟解析。

### 初始化（Initialization）

- 执行类构造器 `<clinit>` 方法。
- `<clinit>` 由编译器自动收集所有类变量的赋值动作和静态语句块。
- 父类的 `<clinit>` 先于子类执行。
- 接口的 `<clinit>` 不需要先执行父接口的 `<clinit>`。
- 初始化触发条件：
  1. new、getstatic、putstatic、invokestatic 指令
  2. 反射调用
  3. 初始化子类时先初始化父类
  4. JVM 启动时的主类
  5. JDK7 的动态语言支持

## 类加载器层次结构

```
Bootstrap ClassLoader (启动类加载器)
    ↑
Extension ClassLoader (扩展类加载器)
    ↑
Application ClassLoader (应用类加载器)
    ↑
Custom ClassLoader (自定义类加载器)
```

## 类加载器特性

1. **双亲委派**：先委托父类加载器加载。
2. **可见性**：子类加载器可以看到父类加载器加载的类。
3. **唯一性**：同一个类只加载一次（由同一个类加载器加载）。
4. **隔离性**：不同类加载器加载的类互不可见。
