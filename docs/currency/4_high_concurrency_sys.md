# 高并发的系统设计？

## 核心要点：高性能、高可用

![img.png](../assets/highConcurrency/hc_sys.png)

## 简化的设计方案

![img_1.png](../assets/highConcurrency/hc_sys_demo.png)


## 1、系统拆分

![img_8.png](../assets/highConcurrency/sys_split.png)

## 2、缓存加速

![img_2.png](../assets/highConcurrency/cache.png)

## 3、MQ异步削峰

![img_3.png](../assets/highConcurrency/mq.png)

## 4、数据分离(分库分表)

![img_4.png](../assets/highConcurrency/db_split.png)

![img_5.png](../assets/highConcurrency/table_split.png)


## 5、读写分离

![img_6.png](../assets/highConcurrency/read_write_split.png)


## 6、服务监控

![img_7.png](../assets/highConcurrency/monitor.png)