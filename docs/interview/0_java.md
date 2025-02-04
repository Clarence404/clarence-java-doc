# Java总结-Java

## 一、JAVA中的几种基本数据类型
Java语言中一共提供了8种原始的数据类型（byte，short，int，long，float，double，char，boolean），这些数据类型不是对象，
而是Java语言中不同于类的特殊类型，这些基本类型的数据变量在声明之后就会立刻在栈上被分配内存空间。

除了这8种基本的数据类型外， 其他类型都是引用类型（例如类、接口、数组等），引用类型类似于C++中的引用或指针的概念，它以特殊的方式指向对象实体，
此类变量在声明时不会被分配内存空间，只是存储了一个内存地址而已。

| 数据类型    | 字节长度	 | 范围	                | 默认值        | 	包装类       |
|---------|-------|--------------------|------------|------------|
| int     | 	4	   | (-2^31~2^31-1)     | 	0         | 	Integer   |
| short   | 	2	   | [-32768,32767]	    | 0          | 	Short     |            |
| byte    | 	1    | 	[-128,127]        | 	0         | 	Byte      |
| long    | 8	    | (-2^63~2^63-1)     | 	0L或0l     | 	Long      |
| double  | 	8    | 64位IEEE754双精度范围    | 0.0        | 	Double    |
| float   | 	4    | 	32位IEEE754单精度范围   | 	0.0F或0.0f | 	Float     |
| char    | 	2    | 	Unicode [0,65535] | 	u0000     | 	Character |
| boolean | 	1    | 	true和false        | 	flase     | 	Boolean   |

## 二、String 类能被继承吗

不可以，因为 String类有 final修饰符，而 final修饰的类是不能被继承的，实现细节也不允许改变。

## 三、讲讲类的实例化顺序

当 Java 虚拟机（JVM）遇到一个类的引用时，它会按照 “**加载 -> 连接 -> 初始化**” 这三个步骤来加载类：

### 1、加载（Loading）

- 通过类加载器（ClassLoader）找到 .class 文件，并加载进内存。
- 生成 java.lang.Class 对象（即类的元数据）。

### 2、连接（Linking） 

连接又包括以下 3 个子阶段：

- 验证（Verify）：确保类的字节码符合 JVM 规范（如格式检查、安全检查）。
- 准备（Prepare）：为静态变量分配内存，并初始化默认值（不会执行赋值语句）。
- 解析（Resolve）：解析符号引用，将其替换为直接引用。

### 3、初始化（Initialization）

- 执行类的 静态变量 和 静态代码块，按它们在代码中的顺序执行。

- 只有在类真正被使用时才会触发初始化，例如：
    - 创建类的实例时 new 类()
    - 调用类的静态方法或访问静态变量
    - 反射调用 Class.forName("类名")
    - 作为父类时，子类初始化会触发父类的初始化

::: important 执行顺序
父类静态变量、父类静态代码块、子类静态变量、子类静态代码块、父类非静态变量（父类实例成员变量）、父类构造函数、子类非静态变量（子类实例成员变量）、子类构造函数。
:::
```java
class Parent {
    static String staticVar = initStaticVar(); // 1. 静态变量

    static {
        System.out.println("1. 父类的静态代码块");
    }

    String instanceVar = initInstanceVar(); // 3. 实例变量

    {
        System.out.println("3. 父类的实例代码块");
    }

    Parent() {
        System.out.println("4. 父类的构造方法");
    }

    static String initStaticVar() {
        System.out.println("0. 父类的静态变量初始化");
        return "staticVar";
    }

    String initInstanceVar() {
        System.out.println("2. 父类的实例变量初始化");
        return "instanceVar";
    }
}

class Child extends Parent {
    static {
        System.out.println("5. 子类的静态代码块");
    }

    {
        System.out.println("7. 子类的实例代码块");
    }

    Child() {
        System.out.println("8. 子类的构造方法");
    }
}

public class ClassLoadOrder {
    public static void main(String[] args) {
        new Child(); // 创建子类对象
    }
}

```
## 四、说说 Synchronized 和 ReentrantLock

详情见: <RouteLink to="/java/2_advanced.md">Java高级特性-Java锁</RouteLink>

## 五、ConcurrentHashMap 为何放弃了分段锁？

详情见: <RouteLink to="/java/1_base.md#_2、currenthashmap为何放弃分段锁">Java基础-HashMap和CurrentHashMap</RouteLink>

## 六、抽象类和接口的区别

### 1、定义和用法
 | 特性	    | 抽象类（Abstract Class）                             | 	接口（Interface）                               |
 |--------|-------------------------------------------------|----------------------------------------------|
 | 关键字	   | abstract class                                  | 	interface                                   |
 | 方法	    | 既可以有抽象方法（无方法体），也可以有普通方法（有方法体）                   | 	只能有抽象方法（Java 8 之后可以有 default 方法和 static 方法） |
 | 变量	    | 可以定义变量（实例变量、常量），可以有 private/protected/public 修饰 | 	只能定义 public static final 常量                 |
 | 继承关系	  | 只能继承 一个 抽象类（单继承）	                               | 可以实现 多个 接口（多继承）                              |
 | 构造方法	  | 可以有构造方法	                                        | 不能有构造方法                                      |
 | 访问修饰符	 | 可以有 public、protected、private 方法	                | 方法默认 public abstract，不能 private 或 protected  |
 | 适用场景	  | 适用于 父类和子类之间有 is-a 关系，代码复用性较强	                   | 适用于 不同类之间有相同的行为，更注重规范                        |

### 2、什么时候用抽象类或接口？
| 适用场景  | 	选择抽象类	                | 选择接口                    |
|-------|------------------------|-------------------------|
| 代码复用  | 	适用于有共享代码的情况（比如提供默认实现） | 	不能提供成员变量和普通方法，所以代码复用性低 |
| 继承限制	 | 适用于需要强制单继承的情况          | 	适用于希望支持多继承的情况          |
| 规范化	  | 适用于相似类型（有 is-a 关系）的类	  | 适用于不同类的通用行为，has a 关系    |
| 复杂度   | 	适用于复杂的类层次结构           | 	适用于简单的、行为驱动的设计         |

## 七、继承和聚合的区别在哪

## 说说Java的IO类

## IO模型的理解

详情见: <RouteLink to="/netty/1_io_model">Netty</RouteLink>

## 、反射的原理

## 写出三种单例模式实现

## 类加载器加载机制

## 泛型的作用和应用

## Java8的Stream

### 1、普通Stream
### 2、并行Stream

## sort() 底层使用的是什么算法

## 常见算法的复杂度是多少

更多详情，请查看算法篇

## Servlet 的生命周期
