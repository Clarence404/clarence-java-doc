# Docker

## 一、Docker国内镜像无法 pull 的问题

::: tip
本次发现问题是2025年2月16日开始，本地测试在使用 Vm-ware 的 Centos 7.9 系统，设置 daemon.json，仍然无法拉取镜像的问题
:::

### 1、阿里云服务器设置 daemon.json 正常

> 原因：暂时不清楚原因，等确认后再写出

### 2、Vm-ware 的 Centos 7.9 失败方案

#### 2.1、目前可用网址汇总

[https://1ms.run](https://1ms.run)

[https://xuanyuan.me/](https://xuanyuan.me/)

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

#### 2.2、魔法下载后，手动上传（最笨方案）

这是本人一开始的思路，最终发现docker hub 并不支持此方案，除非使用 Docker Registry 进行交互来获得镜像层的内容并手动下载，但这种方法复杂且不常用

#### 2.3、基于基线环境重新导入

#### 2.3、魔法代理方式直接下载

问题一：解决Vmware中Centos的网络代理


问题二：解决Centos中Docker的网络代理

