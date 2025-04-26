# RabbitMQ

官网链接：[RabbitMQ官方文档](https://www.rabbitmq.com/docs)

## 一、 安装RabbitMQ

### 1、Docker单机安装

```dockerfile
services:
  rabbitmq:
    image: docker.1ms.run/library/rabbitmq:3.13.7-management
    container_name: rabbitmq
    environment:
      RABBITMQ_DEFAULT_USER: root
      RABBITMQ_DEFAULT_PASS: 123456
    ports:
      - "5672:5672"
      - "15672:15672"
    volumes:
      - ./rabbitmq_data:/var/lib/rabbitmq
    restart: always
```