# Knowledge Map

这是本仓库的总索引。优先从“目标”列查找，不需要记住文件名。

## Android

| 目标 | 用途 | 文件位置 | 说明 |
| --- | --- | --- | --- |
| Android 逆向总览 | 基础知识 | [android/fundamentals/Android总结.md](android/fundamentals/Android总结.md) | Android 学习总览 |
| AndroidManifest | 基础知识 | [android/fundamentals/AndroidManifest_知识库.md](android/fundamentals/AndroidManifest_知识库.md) | AndroidManifest |
| Android Hook 基础 | Hook 与注入 | [android/hooking/Android_Attach_Hook_完整知识库.md](android/hooking/Android_Attach_Hook_完整知识库.md) | Attach 与 Hook |
| Android 系统调用链 | Hook 与注入 | [android/hooking/Android_hook_系统点位原理分析.md](android/hooking/Android_hook_系统点位原理分析.md) | 系统 Hook 点位原理 |
| Hook 框架 | Hook 与注入 | [android/hooking/hooking_frame知识库.md](android/hooking/hooking_frame知识库.md) | Hooking Frameworks |
| Android 信息泄露 | 安全分析 | [android/security/Android APP信息泄露漏洞的基础知识库.md](android/security/Android APP信息泄露漏洞的基础知识库.md) | APP 信息泄露 |
| Root 与 Jailbreak 方案 | Root 与设备修改 | [android/root-and-modification/android_ios_root方案.md](android/root-and-modification/android_ios_root方案.md) | Android/iOS Root 方案 |
| KernelSU 非 GKI | Root 与设备修改 | [android/root-and-modification/非giki设备刷入kernelsu.md](android/root-and-modification/非giki设备刷入kernelsu.md) | 非 GKI 设备刷入 KernelSU |
| KernelSU GKI 2.0 | Root 与设备修改 | [android/root-and-modification/非giki设备刷入kernelsu-补充.md](android/root-and-modification/非giki设备刷入kernelsu-补充.md) | GKI 2.0 KernelSU 补充 |
| 隐藏 Bootloader 状态 | Root 与设备修改 | [android/root-and-modification/KernelSU_bootloader_hide知识库.md](android/root-and-modification/KernelSU_bootloader_hide知识库.md) | KernelSU Bootloader 隐藏 |
| Shamiko 排障 | Root 与设备修改 | [android/root-and-modification/shamiko-unspport-解决方案.md](android/root-and-modification/shamiko-unspport-解决方案.md) | Shamiko Unsupported 解决方案 |
| 环境隐藏 | Root 与设备修改 | [android/root-and-modification/Android_基础环境隐藏.md](android/root-and-modification/Android_基础环境隐藏.md) | Android 基础环境隐藏 |
| 模拟定位 | Root 与设备修改 | [android/root-and-modification/fakelocation_知识库.md](android/root-and-modification/fakelocation_知识库.md) | Fake Location |
| Fake Accessibility | Root 与设备修改 | [android/root-and-modification/Fake_accessibility知识库.md](android/root-and-modification/Fake_accessibility知识库.md) | Fake Accessibility |
| 应用多开/克隆 | Root 与设备修改 | [android/root-and-modification/fake_Clone_App知识库.md](android/root-and-modification/fake_Clone_App知识库.md) | Fake Clone App |
| Recovery 设备树 | 设备开发 | [android/device-development/为新设备编写Recovery_device_tree.md](android/device-development/为新设备编写Recovery_device_tree.md) | 为新设备编写 Recovery Device Tree |
| USB 强制 MTP | 设备开发 | [android/device-development/ForceMTP-command.md](android/device-development/ForceMTP-command.md) | Force MTP |

## iOS

| 目标 | 用途 | 文件位置 | 说明 |
| --- | --- | --- | --- |
| 越狱方案 | 越狱工具 | [ios/jailbreak/ios_Jailbreak知识库.md](ios/jailbreak/ios_Jailbreak知识库.md) | iOS Jailbreak |
| TrollStore | 越狱工具 | [ios/jailbreak/ios_Trolltools知识库.md](ios/jailbreak/ios_Trolltools知识库.md) | TrollTools / TrollStore |
| 第三方包管理器 | 越狱工具 | [ios/jailbreak/越狱第三方包管理工具_知识库.md](ios/jailbreak/越狱第三方包管理工具_知识库.md) | 越狱包管理工具 |
| iOS Hook 框架 | 注入与 Hook | [ios/injection/ios_hook_frame知识库.md](ios/injection/ios_hook_frame知识库.md) | iOS Hook Frameworks |
| iOS 注入方式 | 注入与 Hook | [ios/injection/ios_injection逆向方式知识库.md](ios/injection/ios_injection逆向方式知识库.md) | iOS Injection Methods |
| iOS 重签名 | 重打包 | [ios/repackaging/ios_repackage知识库.md](ios/repackaging/ios_repackage知识库.md) | iOS 重打包标准流程 |
| iOS 逆向重打包 | 重打包 | [ios/repackaging/ios_repackage逆向破解知识库.md](ios/repackaging/ios_repackage逆向破解知识库.md) | iOS 重打包逆向流程 |
| deb 转 ipa | 重打包 | [ios/repackaging/deb包提取ipa包_知识库.md](ios/repackaging/deb包提取ipa包_知识库.md) | deb 转 ipa |

## Frida

| 目标 | 用途 | 文件位置 | 说明 |
| --- | --- | --- | --- |
| Frida CLI | 命令与用法 | [frida/commands/frida_command.md](frida/commands/frida_command.md) | Frida 命令 |
| Agent 示例 | 基础知识 | [frida/basics/frida-agent-example-README.md](frida/basics/frida-agent-example-README.md) | Frida Agent Example |
| Java/Native 回调 | 基础知识 | [frida/basics/frida-syscallback_native_java.md](frida/basics/frida-syscallback_native_java.md) | Frida Java Native Callbacks |
| Android 注入 | 注入与排障 | [frida/attach-and-injection/frida-injection知识库.md](frida/attach-and-injection/frida-injection知识库.md) | Frida Android Injection |
| Attach 排障 | 注入与排障 | [frida/attach-and-injection/frida-attach知识库.md](frida/attach-and-injection/frida-attach知识库.md) | Frida Attach Troubleshooting |
| DEX Dump | 注入与排障 | [frida/attach-and-injection/frida-dexdump知识库.md](frida/attach-and-injection/frida-dexdump知识库.md) | Frida DEX Dump |
| Android 版本兼容 | 版本与兼容性 | [frida/compatibility/frida-安卓版本要求.md](frida/compatibility/frida-安卓版本要求.md) | Frida Android 版本要求 |
| Frida 版本变化 | 版本与兼容性 | [frida/compatibility/Frida_release_change.md](frida/compatibility/Frida_release_change.md) | Frida Release Changes |
| Frida 工具兼容性 | 版本与兼容性 | [frida/compatibility/frida-and-tools-stable兼容性管理.md](frida/compatibility/frida-and-tools-stable兼容性管理.md) | Frida Tools 兼容性 |
| 多版本管理 | 版本与兼容性 | [frida/compatibility/frida-manager多版本管理.md](frida/compatibility/frida-manager多版本管理.md) | Frida Manager |
| Florida 构建 | 构建与编译 | [frida/build/frida-florida-cmake特征修.md](frida/build/frida-florida-cmake特征修.md) | Frida Florida CMake |
| Magic Make 构建 | 构建与编译 | [frida/build/frida-Magic-make魔改知识库.md](frida/build/frida-Magic-make魔改知识库.md) | Frida Magic Make |
| 反 Frida | 检测与调试 | [frida/detection-and-debugging/anti-frida.md](frida/detection-and-debugging/anti-frida.md) | Anti-Frida |
| Frida 检测 | 检测与调试 | [frida/detection-and-debugging/anti-frida-detection.md](frida/detection-and-debugging/anti-frida-detection.md) | Frida Detection Overview |
| 深度反调试 | 检测与调试 | [frida/detection-and-debugging/frida-hook-antidebug-deep.md](frida/detection-and-debugging/frida-hook-antidebug-deep.md) | Deep Anti-Debug |

## Native 调试与分析

| 目标 | 用途 | 文件位置 | 说明 |
| --- | --- | --- | --- |
| ARM64 指令 | ARM64 指令 | [native-debugging/arm64/Arm64_指令集知识库.md](native-debugging/arm64/Arm64_指令集知识库.md) | ARM64 Instruction Set |
| GDB 命令 | GDB 调试 | [native-debugging/gdb/gdb_cli知识库.md](native-debugging/gdb/gdb_cli知识库.md) | GDB CLI |
| GDB 动态调试 | GDB 调试 | [native-debugging/gdb/gdb_动态调试知识库.md](native-debugging/gdb/gdb_动态调试知识库.md) | GDB Dynamic Debugging |
| IDA 静态分析 | IDA 分析 | [native-debugging/ida/IDA静态监控知识库.md](native-debugging/ida/IDA静态监控知识库.md) | IDA Static Analysis |
| RegisterNatives | IDA 分析 | [native-debugging/ida/IDA_Hook_RegisterNatives.md](native-debugging/ida/IDA_Hook_RegisterNatives.md) | IDA Hook RegisterNatives |
| JDWP | JDWP 调试 | [native-debugging/jdwp/JDWP_远程调试知识库.md](native-debugging/jdwp/JDWP_远程调试知识库.md) | JDWP 远程调试 |

## 环境与参考

| 目标 | 用途 | 文件位置 | 说明 |
| --- | --- | --- | --- |
| WSL2 常用操作 | WSL2 环境 | [environments/wsl2/WSL2-Useage.md](environments/wsl2/WSL2-Useage.md) | WSL2 Usage |
| WSL2 USB 转发 | WSL2 环境 | [environments/wsl2/WSL2-USB-forward知识库.md](environments/wsl2/WSL2-USB-forward知识库.md) | WSL2 USB Forward |
| Android 社区与资源 | 参考资料 | [references/Android_communication社区.md](references/Android_communication社区.md) | Android Communities |
| AI 学习教练 | AI 工具 | [ai/AI_Learning_Coach.md](ai/AI_Learning_Coach.md) | AI Learning Coach |
| Prompt 工程 | AI 工具 | [ai/AI_Prompt_Prompt.md](ai/AI_Prompt_Prompt.md) | AI Prompt Engineering |

<!-- BEGIN AUTO-DOCS -->
## 自动发现的文档

> 本区块由 MkDocs 构建时自动生成。将 Markdown 文件放入 `docs/` 后，重新构建或使用 `mkdocs serve` 即可同步。

### 其他

| 目标 | 用途 | 文件位置 | 说明 |
| --- | --- | --- | --- |
| Git Commit Convention | 其他 | [contributing-en.md](contributing-en.md) | 自动发现 |

<!-- END AUTO-DOCS -->
