<div class="legacy-note">
<pre>//author: Rose0888211
//time: 2026-04-29 16:07:46.607287

Android Hook 完整体系
小白经常混淆：注入和Hook的关系
注入：让代码跑进目标进程的“运输方法”。
Hook：代码跑进去之后如何“拦截函数”的技术。

一、按目标层级分类

Android 运行时层级
    --&gt; Java 层 (ART/Dalvik)
    --&gt; Native 层 (C/C++ 动态库)
    --&gt; 内核层 (syscall / 内核函数)

1. Java 层 Hook
    --&gt; 技术手段
        --&gt; 动态代理 (Proxy + InvocationHandler)  --&gt; 仅接口代理，局限大
        --&gt; 反射 (Reflection)  --&gt; 修改 field/method 可访问性，基础但不稳定
        --&gt; ArtMethod 替换  --&gt; 修改 entry_point_from_quick_compiled_code
        --&gt; VTable 替换  --&gt; 修改 Java 类的虚函数表，需偏移
    --&gt; 典型框架
        --&gt; 动态调试式  --&gt; Frida (Java.perform)  --&gt; 依赖 ptrace 注入 + ArtMethod 替换
        --&gt; 持久框架式  --&gt; Xposed / LSPosed / EdXposed
            --&gt; 注入载体  --&gt; Riru (旧) || Zygisk (新)
    --&gt; 注入方式  --&gt; 见下文“注入与激活分类”

2. Native 层 Hook (用户态)
    --&gt; 函数劫持方式
        --&gt; GOT/PLT Hook  --&gt; 修改 ELF 的导入表条目（Android 10+ 使用Linker hook， ASLR 机制下随机化针对动态链接库的外部函数调用）
        --&gt; Inline Hook
            --&gt; 任意函数指令级修改  --&gt; 写入跳转指令 (如 ldr/br, jmp)
            --&gt; Trap 断点式 (属于 Inline 分支)  --&gt; 写入 int3/brk，触发 SIGTRAP，信号处理中接管执行
        --&gt; 基于 ptrace 的指令操纵  --&gt; 附加进程，单步执行，改寄存器/内存 (常用于调试器)
        --&gt; 信号劫持 (Signal-based Hook)  --&gt; 注册 sigaction，利用 SIGSEGV/SIGTRAP 懒加载 hook
        --&gt; LD_PRELOAD  --&gt; 替换动态库导出函数 (仅限导入符号)
    --&gt; 典型框架/工具
        --&gt; Frida (Interceptor / Stalker)  --&gt; 混合 GOT/PLT + Inline
        --&gt; Dobby / HookZz  --&gt; 纯 native hook 库
        --&gt; 手工调试器  --&gt; gdb / lldb + ptrace
    --&gt; 注入方式  --&gt; 见下文

3. 内核层 Hook
    --&gt; 技术手段
        --&gt; 内核模块 (LKM)  --&gt; 修改 sys_call_table / kprobe / ftrace
        --&gt; eBPF  --&gt; 挂载 kprobe / tracepoint，无需重启内核
        --&gt; Seccomp  --&gt; 过滤/拦截系统调用 (不是替换实现，但可阻止或记录)
    --&gt; 典型框架/工具
        --&gt; Android eBPF (例如 /sys/fs/bpf)  --&gt; 系统自带流量监控等
        --&gt; 定制 Kernel Module  --&gt; 需 root 或编译到内核
    --&gt; 注入方式  --&gt; 内核模块插入 (insmod) 或 集成进 boot.img

二、注入与激活机制（独立于层级，可与任何层配合）

注入方式分类
    --&gt; Zygote 注入  --&gt; 修改 Zygote 进程，在 fork app 时加载 so
        --&gt; 经典实现  --&gt; Xposed (替换 app_process) + Riru/Zygisk
        --&gt; 也可用于 native hook 提前驻留
    --&gt; ptrace 注入  --&gt; attach 目标进程，写 shellcode，远程调用 dlopen
        --&gt; 典型工具  --&gt; Frida (早期依赖)、定制 injector
    --&gt; /proc/pid/mem 直接写入  --&gt; 打开 mem 文件写内存 (需 root 或同用户)
    --&gt; 动态链接器劫持
        --&gt; LD_PRELOAD 环境变量  --&gt; 仅对调用 dlopen 的进程生效
        --&gt; 替换 linker (如修改 /system/bin/linker64)  --&gt; 持久但风险高
    --&gt; ROM 集成 / 内核模块自动加载  --&gt; 预置 so 到系统镜像，或通过 init.rc 加载 ko
</pre>
</div>
