<div class="legacy-note">
<pre>author:Rose088211
time: 2026-09-15 23:18:36.651086

# ========================================
WSL2 常用操作知识库
适用环境:Windows 10/11 + WSL2
说明:&lt;Name&gt; 代表发行版名称,&lt;用户名&gt; 代表 Windows 用户名。

一、安装发行版
1. 查看可安装的发行版列表
 wsl --list --online
2. 安装指定发行版
 wsl --install &lt;Name&gt;

二、PowerShell 启动 WSL
1. 查看已安装的发行版及运行状态
 wsl -l -v
2. 启动指定发行版
 wsl -d &lt;Name&gt;
3. 设置默认发行版
 wsl --set-default &lt;Name&gt;

三、Terminal 启动 WSL
1. 新建 &lt;Name&gt; 终端即可
2. 进入特定目录,右键新建终端,输入 wsl

四、退出 WSL
 logout

五、使用 WSL 内的 Docker 安装其他 Linux 发行版
思路:在发行版 1(如 Ubuntu)中用 Docker 导出其他发行版的根文件系统 tar,再用 wsl --import 导入为新的发行版。
1. 发行版 1 先安装 Docker
2. 拉取镜像并运行(以 CentOS 7 为例)
 docker pull centos:7
 docker run -it --rm centos:7 bash
3. 发行版 1 再打开一个窗口,导出正在运行的容器
 docker export &lt;容器id&gt; -o centos7.tar
 mv centos7.tar /mnt/c/Users/&lt;用户名&gt;/Desktop
4. 打开 Terminal(Windows 侧),导入为新发行版
 wsl --import &lt;Name&gt; &lt;安装路径&gt; centos7.tar

六、Windows 与 WSL 互相访问
1. Windows 使用 WSL 的 md5sum 工具查询哈希值
 wsl md5sum &quot;/mnt/d/WSL/vc_redist.x64 .exe&quot;
 wsl -d &lt;Name&gt; md5sum &quot;/mnt/d/WSL/vc_redist.x64 .exe&quot;
2. WSL 中用资源管理器打开指定目录
 cd /etc
 explorer.exe .
 地址栏格式:\\wsl.localhost\&lt;Name&gt;\etc 或 \\wsl$\&lt;Name&gt;
3. WSL 中访问 Windows 盘
 cd /mnt/c
4. WSL 中打开 VS Code
 code .

七、WSL 开机自启动脚本
1. 自启动通过 /etc/wsl.conf 的 [boot] 段配置
 cat /etc/wsl.conf

八、备份 WSL 系统
 wsl --export &lt;Name&gt; &lt;Name&gt;.tar

========================================
</pre>
</div>
