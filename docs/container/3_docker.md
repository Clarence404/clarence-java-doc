# Docker

## 一、Docker国内镜像无法 pull 的问题

::: tip
2024年6月开始，国内的常用 daemon.json 地址失效
:::

### 1、阿里云服务器设置 daemon.json 正常

> 原因：暂时不清楚原因，等确认后再写出

### 2、Vm-ware 的 Centos 7.9 失败方案

#### 2.1、目前可用网址汇总

[https://1ms.run](https://1ms.run)

[https://xuanyuan.me/](https://xuanyuan.me/)

- 方法1：直接按顺序执行一下即可

```shell
sudo tee /etc/docker/daemon.json <<EOF
{
    "registry-mirrors": [
        "https://docker.1ms.run",
        "https://docker.xuanyuan.me"
    ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```


- 方法2：使用如下编辑daemon.json的方式

```shell
vi /etc/docker/daemon.json
#粘贴进去保存即可
{
  "registry-mirrors": [
        "https://docker.1ms.run",
        "https://docker.xuanyuan.me"
    ]
}
sudo systemctl daemon-reload
sudo systemctl restart docker
```

#### 2.2、魔法下载后，手动上传（最笨方案）
::: warning
这是本人开始的思路，最终发现docker hub 并不支持此方案，除非使用 **Docker Registry** 进行交互来获得镜像层的内容并手动下载，但这种方法复杂且不常用
:::

#### 2.3、基于基线环境重新导入

#### 2.3、魔法代理方式直接下载

- VMware 中的Docker使用魔法方式

::: tip 必要前提条件
Vmware使用NAT模式，保证主机和虚拟机在一个局域网下
:::

Clash的配置如下：

![img.png](../assets/container/clash_config.png)

::: tip 建议
设置完成后，建议清空 daemon.json 内容，当然也可以保留（会使得Docker去所有的daemon地址搜索，降低速度）
:::

- Hyper-V 中的Docker使用魔法方式

未完待续
