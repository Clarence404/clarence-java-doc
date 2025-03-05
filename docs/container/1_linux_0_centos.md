# Linux-Centos

## 一、Centos-7.9 设置固定IP

1、设置ens33网口的地址
```shell
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

2、设置指定的网关和IP
```shell
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="322d6eca-eb3d-410d-b397-a70256094860"
DEVICE="ens33"
# 这是默认的，务必注释
#BOOTPROTO="dhcp"
BOOTPOTO="static"
#表示 系统启动时自动启用该网络接口
ONBOOT="yes"
# 本机设置的IP
IPADDR=192.168.15.2
# 本机的网关地址
GATEWAY=192.168.15.1
```
3、重启网络设置

```shell
systemctm restart network
```