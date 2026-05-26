# 双亲委派模型

## 加载机制

类加载器先将加载请求委托给父类加载器，直到顶层 Bootstrap 加载器。

### 工作流程

```
1. 应用类加载器收到类加载请求
2. 检查是否已加载，未加载则委托给父类加载器（扩展类加载器）
3. 扩展类加载器检查是否已加载，未加载则委托给父类加载器（启动类加载器）
4. 启动类加载器尝试加载，能加载则返回，不能则通知子类加载器
5. 扩展类加载器尝试加载，能加载则返回，不能则通知子类加载器
6. 应用类加载器尝试加载，能加载则返回，不能则抛出 ClassNotFoundException
```

### 类加载器层次结构

```
Bootstrap ClassLoader (启动类加载器)
    ↑ 委托
Extension ClassLoader (扩展类加载器)
    ↑ 委托
Application ClassLoader (应用类加载器)
    ↑ 委托
Custom ClassLoader (自定义类加载器)
```

### 双亲委派实现

```java
protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
    // 1. 检查是否已加载
    synchronized (getClassLoadingLock(name)) {
        Class<?> c = findLoadedClass(name);
        if (c == null) {
            try {
                // 2. 委托给父类加载器
                if (parent != null) {
                    c = parent.loadClass(name, false);
                } else {
                    c = findBootstrapClassOrNull(name);
                }
            } catch (ClassNotFoundException e) {
                // 父类加载器无法加载，捕获异常
            }
            
            if (c == null) {
                // 3. 父类加载器无法加载，自己尝试加载
                c = findClass(name);
            }
        }
        if (resolve) {
            resolveClass(c);
        }
        return c;
    }
}
```

## 优点

1. **避免类重复加载**：同一个类只加载一次，节省内存。
2. **提高安全性**：核心类由启动类加载器加载，防止被替换。
3. **保证 Java 核心类库安全**：防止用户自定义的类替换系统类（如 java.lang.String）。

```java
// 用户自定义的 String 类不会被加载
package java.lang;

public class String {
    // 不会被加载，因为启动类加载器已经加载了 java.lang.String
}
```

## 打破机制的场景

### 1. SPI（Service Provider Interface）

JDBC、JNDI、JAXP 等使用 SPI 机制，需要打破双亲委派。

```java
// JDBC 驱动加载示例
// 使用线程上下文类加载器加载实现类
ServiceLoader<Driver> drivers = ServiceLoader.load(Driver.class);
```

**原理**：
- 接口由启动类加载器加载（如 java.sql.Driver）
- 实现类由第三方提供（如 com.mysql.cj.jdbc.Driver）
- 需要使用线程上下文类加载器（Thread.currentThread().getContextClassLoader()）加载实现类

### 2. 应用容器如 Tomcat

Tomcat 需要隔离不同 Web 应用的类。

```java
// Tomcat 自定义类加载器
public class WebappClassLoader extends URLClassLoader {
    @Override
    public Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
        // 1. 先检查是否已加载
        Class<?> clazz = findLoadedClass(name);
        
        if (clazz == null) {
            // 2. 尝试自己加载（打破双亲委派）
            try {
                clazz = findClass(name);
            } catch (ClassNotFoundException e) {
                // 3. 自己无法加载，委托给父类加载器
                clazz = super.loadClass(name, resolve);
            }
        }
        
        return clazz;
    }
}
```

**Tomcat 类加载器层次**：
```
Bootstrap ClassLoader
    ↑
System ClassLoader
    ↑
Common ClassLoader (共享类)
    ↑
WebappClassLoader1 (应用1)
    ↑
WebappClassLoader2 (应用2)
```

### 3. 模块化框架如 OSGi

OSGi 实现模块化，每个模块有独立的类加载器。

```java
// OSGi BundleClassLoader
public class BundleClassLoader extends ClassLoader {
    private Bundle bundle;
    
    @Override
    protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
        // 1. 检查是否已加载
        Class<?> clazz = findLoadedClass(name);
        
        if (clazz == null) {
            // 2. 检查是否在 bundle 的 classpath 中
            try {
                clazz = findClass(name);
            } catch (ClassNotFoundException e) {
                // 3. 委托给其他 bundle 或父类加载器
                clazz = bundle.loadClass(name);
            }
        }
        
        return clazz;
    }
}
```

### 4. 热部署

实现类的热加载，不重启 JVM。

```java
public class HotSwapClassLoader extends ClassLoader {
    private String classpath;
    
    public HotSwapClassLoader(String classpath) {
        this.classpath = classpath;
    }
    
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        byte[] classData = loadClassData(name);
        return defineClass(name, classData, 0, classData.length);
    }
    
    public void reload(String className) throws Exception {
        Class<?> clazz = loadClass(className);
        Object instance = clazz.newInstance();
        // 使用新创建的实例
    }
}
```

## 如何打破双亲委派

重写 `loadClass` 方法，不调用父类加载器。

```java
public class CustomClassLoader extends ClassLoader {
    @Override
    public Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
        // 1. 检查是否已加载
        Class<?> clazz = findLoadedClass(name);
        
        if (clazz == null) {
            // 2. 自己尝试加载（不委托给父类）
            try {
                clazz = findClass(name);
            } catch (ClassNotFoundException e) {
                // 3. 自己无法加载，再委托给父类
                clazz = super.loadClass(name, resolve);
            }
        }
        
        return clazz;
    }
}
```

## 注意事项

1. **谨慎打破**：打破双亲委派可能导致类冲突和安全问题。
2. **理解场景**：只在必要时打破（如 SPI、容器隔离、热部署）。
3. **测试充分**：确保类加载逻辑正确，避免 ClassNotFoundException。
4. **性能考虑**：自定义类加载器可能影响性能。
