# 常见的场景问题

## 一、分布式系统主键如何处理？

### 1、节点生成 or 主键服务？

### 2、主键类型的选择？

## 二、针对于过期的订单，如何处理？

[处理过期订单，Redis不推荐，那如何做呢？](https://mp.weixin.qq.com/s/aHtIW4vmrl-0rUcPI3T7ZQ)

### 1、消息队列
### 2、Redisson DelayedQueue
### 3、Redis 过期监听
### 4、RabbitMQ 死信队列
### 5、时间轮

## 三、如何实现自动登录功能？

[https://docs.pingcode.com/baike/2210471](https://docs.pingcode.com/baike/2210471)

## 四、对外的Api安全问题如何保证？

Todo 按照自己的理解实现：

[Spring Cloud微服务，如何保证对外接口的安全？](https://mp.weixin.qq.com/s/kZZMQcAQh4XLF8sgsxT__g)

## 五、基于阻塞队列实现生产者和消费者模型

> 参考地址：[https://blog.csdn.net/m0_73381672/article/details/133690633](https://blog.csdn.net/m0_73381672/article/details/133690633)

核心方法代码：

[MyBlockingQueue](https://gitee.com/hello0709/clarence-java/raw/master/basic/src/main/java/com/dora/basic/juc/blockqueue/MyBlockingQueue.java)

测试运行代码：

[MyBlockingQueue.Test](https://gitee.com/hello0709/clarence-java/raw/master/basic/src/main/java/com/dora/basic/juc/blockqueue/Test.java)

## 六、如何设计一个高并发系统？

解答：<RouteLink to="/currency/4_high_concurrency_sys">高并发-如何设计一个高并发系统？</RouteLink>

## 七、分布式场景下是否适用 synchronized 加锁机制？

解答：[分布式场景下是否适用 synchronized 加锁机制？](https://mp.weixin.qq.com/s/IGS_8pIc2wSKN88eMEJmSg)

## 八、100 亿分库分表 如何设计？

解答：[携程面试：100 亿分库分表 如何设计？](https://mp.weixin.qq.com/s/xQtKtaLG8xRMbK-8b3Rzuw)
