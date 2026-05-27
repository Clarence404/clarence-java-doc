# Linux 发行版

## 一、CentOS / RHEL 系

官网地址：[https://www.centos.org/](https://www.centos.org/)

### 1、常用工具

| 工具或命令            | 说明                      |
|------------------|-------------------------|
| `yum` / `dnf`    | RPM 包管理工具（Deb 系没有）      |
| `/etc/sysconfig` | 配置大多集中于此                |
| `firewalld`      | 默认防火墙，配合 `firewall-cmd` |
| `systemctl`      | 服务管理（所有现代 Linux 都支持）    |
| SELinux          | 安全增强（CentOS 默认开启）       |
| `nmcli`          | 网络管理命令（适用于 RHEL 系）      |

### 2、CentOS 7.9 设置固定 IP

1、设置 ens33 网口的地址

```shell
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

2、设置指定的网关和 IP

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
ONBOOT="yes"

# static ip
BOOTPROTO="static"
IPADDR="192.168.2.3"
PREFIX="24"
GATEWAY="192.168.2.2"
DNS1="192.168.2.2"
```

3、重启网络设置

```shell
systemctl restart network
```

### 3、CentOS 8+ / Stream

> [!warning] 待补充

---

## 二、Ubuntu / Debian 系

官网地址：[Ubuntu](https://www.ubuntu.com/) | [Debian](https://www.debian.org/)

### 1、常用工具

| 工具或命令                     | 说明                  |
|---------------------------|---------------------|
| `apt`, `apt-get`          | Debian 包管理器（替代 yum） |
| `/etc/network/interfaces` | 网络配置文件（传统方式）        |
| `ufw`                     | Ubuntu 自带的简化防火墙     |
| `snap`                    | 新的通用软件包格式           |
| `add-apt-repository`      | 添加软件源               |
| `update-alternatives`     | 多版本管理，如 Java        |

### 2、Ubuntu 设置固定 IP

> [!warning] 待补充

### 3、Debian 与 Ubuntu 的区别

| 对比项      | Debian              | Ubuntu                  |
|----------|---------------------|-------------------------|
| 定位       | 纯社区驱动，追求自由软件        | 基于 Debian，注重用户体验        |
| 发布节奏     | 稳定优先，发布周期较长         | 每 6 个月一个版本，LTS 每 2 年    |
| 专有驱动     | 默认不包含               | 默认包含（如 GPU 驱动）          |
| 适合场景     | 服务器、追求极简稳定           | 开发者桌面、云主机               |
