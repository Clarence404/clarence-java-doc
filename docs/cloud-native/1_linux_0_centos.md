# Linux-Centos

官网地址：[https://www.centos.org/](https://www.centos.org/)

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
# Note: Comments are required here.
#BOOTPROTO="dhcp"
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
ONBOOT="yes"

# static ip
BOOTPROTO="static"
IPADDR="192.168.2.3"
PREFIX="24"
GATEWAY="192.168.2.2"
# if require net,use it
DNS1="192.168.2.2"

```
3、重启网络设置

```shell
systemctl restart network
```

## 一、Centos-8+ Stream