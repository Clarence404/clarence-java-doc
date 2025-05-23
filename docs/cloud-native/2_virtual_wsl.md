# VM-WSL

## 一、WSL 简介

WSL（Windows Subsystem for Linux）是微软推出的一种兼容层，允许用户在 **Windows 上原生运行 Linux** 命令行工具和程序，无需安装虚拟机或双系统。

### 特点：

* 无需重启即可运行 Linux
* 支持 Bash、SSH、Git、apt/yum 等常见工具
* 与 Windows 文件系统集成，便于双向访问

## 二、WSL 2（推荐使用）

WSL 2 是 WSL 的第二代架构，**相比 WSL 1 拥有更高的兼容性和性能**，核心特性是使用 Hyper-V 虚拟化真正运行一个完整的 Linux
内核。

### 优点：

* ✅ 启动速度快，资源占用低
* ✅ 文件系统性能大幅提升
* ✅ 完整的系统调用支持，兼容更多 Linux 应用（如 Docker）
* ✅ 支持使用真实的 Linux 内核模块

### 注意事项：

* WSL 2 需要 **启用 Hyper-V 和虚拟机平台**
* 网络访问为 NAT 模式，Linux 访问 Windows 没问题，但 Windows 访问 WSL2 需要特殊设置或端口转发

## 三、与 Docker 的关系

在 Windows 上，**Docker Desktop 默认就是基于 WSL 2 来运行的**。

### 工作原理：

* 安装 Docker Desktop 后，它会自动创建一个名为 `docker-desktop` 的 WSL 2 发行版；
* 所有容器运行在这个 WSL 2 环境中；
* 宿主机和容器之间通过虚拟网络桥接通信；
* `docker` 命令可以在 Windows 命令行（CMD/PowerShell/WSL）中直接使用，无需手动配置。

### 优势：

| 传统虚拟机方式      | Docker + WSL 2     |
|--------------|--------------------|
| 资源占用高        | 启动快，性能高            |
| 网络、共享盘配置繁琐   | 与 Windows 文件系统无缝集成 |
| 需要手动安装 Linux | 使用官方内核，兼容性强        |

## 四、常用命令

```bash
# 安装 WSL（Windows Terminal 执行）
wsl --install

# 查看可用的 Linux 发行版
wsl --list --online

# 安装 Ubuntu
wsl --install -d Ubuntu

# 查看已安装发行版
wsl --list --verbose

# 设置默认发行版为 Ubuntu
wsl --set-default Ubuntu

# 升级指定发行版为 WSL 2
wsl --set-version Ubuntu 2

# 打开指定发行版
wsl -d Ubuntu

# 关闭 WSL
wsl --shudown
```

## 五、实用技巧

* Windows 路径 `/mnt/c/...` 可在 WSL 中访问
* 在 WSL 内执行 Windows 命令，例如：`explorer.exe .`
* VSCode 支持 Remote - WSL 插件，直接编辑 Linux 文件
* 可将 Docker + WSL 用作高效本地开发环境（尤其适合前后端全栈/Node.js/Golang 项目）

### 1、固定IP

todo

## 六、推荐配置场景

| 场景                        | 推荐做法                   |
|---------------------------|------------------------|
| 本地 Linux 命令行开发            | WSL 2  + Linux         |
| Windows 上使用 Docker        | Docker Desktop + WSL 2 |
| 前后端开发（Node/Python/Golang） | WSL 2 + VSCode Remote  |
| 保持轻量、兼容性强                 | WSL 2 替代传统虚拟机          |
