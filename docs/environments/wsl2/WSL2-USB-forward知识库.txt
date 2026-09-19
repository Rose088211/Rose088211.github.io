<div class="legacy-note">
<pre>author:Rose088211
time: 2026-09-15 09:24:08.359102

# ========================================
WSL2 连接 ADB 设备完整步骤
适用环境:Windows 10 + WSL2 Ubuntu 22.04
示例设备:OPPO SM8350-MTP,BUSID 为 4-4

一、前提条件

1. Windows 10 版本 19045(使用默认 NAT 网络模式即可)
2. WSL2 已安装 Ubuntu 22.04
3. 手机开启开发者选项和 USB 调试
4. 数据线连接电脑

二、Windows 端:安装 usbipd-win
usbipd 是 USB/IP 协议的服务端守护进程,它允许将本地物理 USB 设备通过网络共享给其他机器(包括虚拟机)使用。
以管理员身份打开 PowerShell,执行:
winget install --interactive --exact dorssel.usbipd-win

如果 winget 不可用,去 GitHub 下载 .msi 安装:
[https://github.com/dorssel/usbipd-win/releases](https://github.com/dorssel/usbipd-win/releases)

安装后关闭并重新打开管理员 PowerShell。

三、手机端准备

1. 设置 -&amp;gt; 关于手机 -&amp;gt; 连续点击版本号开启开发者选项
2. 开发者选项 -&amp;gt; 开启 USB 调试
3. 用数据线连接电脑,USB 模式选 文件传输 / MTP
4. 如果弹出“允许 USB 调试”,勾选“始终允许”并确认

四、WSL 端:准备接收环境(必须在 attach 之前完成)
打开 WSL 终端,依次执行:

1. 安装内核工具和硬件数据库
 sudo apt update
 sudo apt install -y linux-tools-virtual hwdata
2. 创建 usbip 命令软链接
 sudo update-alternatives --install /usr/local/bin/usbip usbip $(ls /usr/lib/linux-tools/*/usbip | tail -n1) 20
3. 验证 usbip 是否可用
 usbip version
4. 加载 vhci 内核模块(接收 USB/IP 设备所必需)
 sudo modprobe vhci-hcd

  可用以下命令确认模块已加载:
   lsmod | grep vhci

五、Windows 端:绑定设备(仅首次需要)
在管理员 PowerShell 中执行:

1. 查看设备 BUSID
 usbipd list

  找到你的手机,例如:
   4-4    22d9:2769  SM8350-MTP _SN:143A3CB2   Not shared

   记下 BUSID,本文以 4-4 为例。
2. 关闭 Windows 端可能占用设备的 adb
 adb kill-server
 (如果没有 adb 可忽略)
3. 强制绑定设备
 usbipd bind --force --busid 4-4

  成功后状态变为 Shared (forced)。

六、Windows 端:附加设备到 WSL
重要:确保 WSL 正在运行,并且已经执行过 sudo modprobe vhci-hcd。
如果之前执行过 wsl --shutdown,重开 WSL 后需要重新加载模块:
sudo modprobe vhci-hcd

然后在管理员 PowerShell 中执行:
usbipd attach --wsl --busid 4-4

成功后 usbipd list 中状态变为 Attached。

注意:每次拔插 USB 或重启 WSL 后,都需要重新执行:
usbipd attach --wsl --busid 4-4
bind 一般只需一次。

七、WSL 端:验证并连接 ADB
回到 WSL 终端:

1. 查看 USB 设备
 lsusb

  应看到类似:
   Bus 001 Device 002: ID 22d9:2769 OPPO Electronics Corp. SM8350-MTP
2. 启动 ADB
 adb kill-server
 adb start-server
 adb devices -l

  首次会显示 unauthorized,此时解锁手机,
   在弹窗中勾选“始终允许”并点击“允许”。

   再次执行:
   adb devices -l
   显示 device 即成功。
3. 验证连接
 adb shell getprop ro.product.model
 adb shell getprop ro.build.version.release

八、日常使用流程(拔插 USB 或重启 WSL 后)

1. 打开 WSL 终端,加载模块:
 sudo modprobe vhci-hcd
2. Windows 管理员 PowerShell 中附加设备:
 usbipd attach --wsl --busid 4-4
3. WSL 终端中检查设备:
 adb devices -l

  如果手机提示授权,点允许即可。

========================================</pre>
</div>
