<div class="legacy-note">
<pre>root管理器：magisk AlphaMask KitsuneMask kernelsu Apatch kingroot
注入框架：太极 无极 lsposed edxposed lspatch Shizuku riru rirulsposed npatch  opatch

以上每个对象属性包括（官方标准名称、所属类型、首发时间、最后维护时间、维护状态、获取root原理、开发团队背景、衍生工具、是否主流工具、下载渠道链接、安装和使用教程链接、）以json格式输出



{
  &quot;root_managers&quot;: [
    {
      &quot;官方标准名称&quot;: &quot;Magisk&quot;,
      &quot;所属类型&quot;: &quot;Root管理器&quot;,
      &quot;首发时间&quot;: &quot;2016年&quot;,
      &quot;最后维护时间&quot;: &quot;2025-12-01 (v30.6)&quot;,
      &quot;维护状态&quot;: &quot;活跃维护&quot;,
      &quot;获取root原理&quot;: &quot;Systemless Root技术，不修改/system分区，通过boot镜像修补实现无损Root&quot;,
      &quot;开发团队背景&quot;: &quot;由台湾开发者@topjohnwu创建，开源社区维护&quot;,
      &quot;衍生工具&quot;: [&quot;Magisk Delta&quot;, &quot;Kitsune Mask&quot;, &quot;Alpha Magisk&quot;, &quot;Shamiko&quot;],
      &quot;是否主流工具&quot;: true,
      &quot;下载渠道链接&quot;: &quot;https://github.com/topjohnwu/Magisk/releases&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://github.com/topjohnwu/Magisk/wiki/Installing&quot;
    },
    {
      &quot;官方标准名称&quot;: &quot;Magisk Alpha&quot;,
      &quot;所属类型&quot;: &quot;Root管理器 (Magisk分支)&quot;,
      &quot;首发时间&quot;: &quot;2022年&quot;,
      &quot;最后维护时间&quot;: &quot;2025年中&quot;,
      &quot;维护状态&quot;: &quot;社区维护&quot;,
      &quot;获取root原理&quot;: &quot;基于Magisk的Systemless Root技术，增强隐藏能力&quot;,
      &quot;开发团队背景&quot;: &quot;社区开发者维护的Magisk分支&quot;,
      &quot;衍生工具&quot;: [],
      &quot;是否主流工具&quot;: false,
      &quot;下载渠道链接&quot;: &quot;https://github.com/CoderTyn/Magisk-Alpha/releases&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://github.com/CoderTyn/Magisk-Alpha/wiki&quot;
    },
    {
      &quot;官方标准名称&quot;: &quot;Kitsune Mask&quot;,
      &quot;所属类型&quot;: &quot;Root管理器 (Magisk分支)&quot;,
      &quot;首发时间&quot;: &quot;2022年 (原Magisk Delta)&quot;,
      &quot;最后维护时间&quot;: &quot;2025年&quot;,
      &quot;维护状态&quot;: &quot;活跃维护&quot;,
      &quot;获取root原理&quot;: &quot;继承Magisk的Systemless Root，重新添加Magisk Hide功能&quot;,
      &quot;开发团队背景&quot;: &quot;社区开发者维护，原Magisk Delta团队&quot;,
      &quot;衍生工具&quot;: [],
      &quot;是否主流工具&quot;: false,
      &quot;下载渠道链接&quot;: &quot;https://github.com/1q23lyc45/KitsuneMagisk/releases&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://github.com/1q23lyc45/KitsuneMagisk/wiki&quot;
    },
    {
      &quot;官方标准名称&quot;: &quot;KernelSU&quot;,
      &quot;所属类型&quot;: &quot;Root管理器 (内核级)&quot;,
      &quot;首发时间&quot;: &quot;2021年&quot;,
      &quot;最后维护时间&quot;: &quot;2025年&quot;,
      &quot;维护状态&quot;: &quot;活跃维护&quot;,
      &quot;获取root原理&quot;: &quot;内核级Root方案，直接在内核空间授予root权限&quot;,
      &quot;开发团队背景&quot;: &quot;由开发者tiann创建，开源社区维护&quot;,
      &quot;衍生工具&quot;: [&quot;KernelSU-Next&quot;],
      &quot;是否主流工具&quot;: true,
      &quot;下载渠道链接&quot;: &quot;https://github.com/tiann/KernelSU/releases&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://kernelsu.org/guide/installation.html&quot;
    },
    {
      &quot;官方标准名称&quot;: &quot;APatch&quot;,
      &quot;所属类型&quot;: &quot;Root管理器 (内核级)&quot;,
      &quot;首发时间&quot;: &quot;2023年&quot;,
      &quot;最后维护时间&quot;: &quot;2025年&quot;,
      &quot;维护状态&quot;: &quot;活跃维护&quot;,
      &quot;获取root原理&quot;: &quot;结合Magisk安装方式和KernelSU内核级能力，通过修补boot镜像实现&quot;,
      &quot;开发团队背景&quot;: &quot;由开发者bmax121创建，开源项目&quot;,
      &quot;衍生工具&quot;: [],
      &quot;是否主流工具&quot;: false,
      &quot;下载渠道链接&quot;: &quot;https://github.com/bmax121/APatch/releases&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://github.com/bmax121/APatch/wiki/installation&quot;
    },
    {
      &quot;官方标准名称&quot;: &quot;KingRoot&quot;,
      &quot;所属类型&quot;: &quot;Root管理器 (一键Root工具)&quot;,
      &quot;首发时间&quot;: &quot;2013年&quot;,
      &quot;最后维护时间&quot;: &quot;2019-03 (v5.4.0)&quot;,
      &quot;维护状态&quot;: &quot;已停止维护&quot;,
      &quot;获取root原理&quot;: &quot;利用Android系统漏洞实现一键Root&quot;,
      &quot;开发团队背景&quot;: &quot;由中国KingRoot Studio公司开发&quot;,
      &quot;衍生工具&quot;: [],
      &quot;是否主流工具&quot;: false,
      &quot;下载渠道链接&quot;: &quot;无官方维护渠道&quot;,
      &quot;安装和使用教程链接&quot;: &quot;无官方维护教程&quot;
    }
  ],
  &quot;injection_frameworks&quot;: [
    {
      &quot;官方标准名称&quot;: &quot;太极&#183;阴&quot;,
      &quot;所属类型&quot;: &quot;注入框架 (免Root Xposed)&quot;,
      &quot;首发时间&quot;: &quot;2019年&quot;,
      &quot;最后维护时间&quot;: &quot;2025年 (v14.0.6)&quot;,
      &quot;维护状态&quot;: &quot;活跃维护&quot;,
      &quot;获取root原理&quot;: &quot;通过虚拟环境和双开机制创建隔离空间，无需Root即可运行Xposed模块&quot;,
      &quot;开发团队背景&quot;: &quot;中国开发者团队维护&quot;,
      &quot;衍生工具&quot;: [&quot;太极&#183;阳 (Root版本)&quot;],
      &quot;是否主流工具&quot;: true,
      &quot;下载渠道链接&quot;: &quot;https://github.com/hongye612430/TaiChi-Guide&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://github.com/hongye612430/TaiChi-Guide/wiki&quot;
    },{
      &quot;官方标准名称&quot;: &quot;太极阳&quot;,
      &quot;所属类型&quot;: &quot;注入框架&quot;,
      &quot;首发时间&quot;: &quot;2019年&quot;,
      &quot;最后维护时间&quot;: &quot;2025年&quot;,
      &quot;维护状态&quot;: &quot;活跃维护&quot;,
      &quot;获取root原理&quot;: &quot;基于Magisk模块，通过Riru或Zygisk实现Xposed框架&quot;,
      &quot;开发团队背景&quot;: &quot;开发者甚林维护，中国开发者社区&quot;,
      &quot;衍生工具&quot;: [&quot;太极工具箱&quot;],
      &quot;是否主流工具&quot;: true,
      &quot;下载渠道链接&quot;: &quot;https://github.com/weishu/TaiChi/releases&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://t.cn/A6fXvXhE&quot;
    },
    {
      &quot;官方标准名称&quot;: &quot;无极&quot;,
      &quot;所属类型&quot;: &quot;注入框架&quot;,
      &quot;首发时间&quot;: &quot;2023年&quot;,
      &quot;最后维护时间&quot;: &quot;2025年&quot;,
      &quot;维护状态&quot;: &quot;活跃维护&quot;,
      &quot;获取root原理&quot;: &quot;通过虚拟机技术实现免root的模块注入&quot;,
      &quot;开发团队背景&quot;: &quot;中国开发者团队维护&quot;,
      &quot;衍生工具&quot;: [],
      &quot;是否主流工具&quot;: false,
      &quot;下载渠道链接&quot;: &quot;https://github.com/546669696/WuJi/releases&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://github.com/546669696/WuJi/wiki&quot;
    },
    {
      &quot;官方标准名称&quot;: &quot;LSPosed&quot;,
      &quot;所属类型&quot;: &quot;注入框架 (Xposed框架)&quot;,
      &quot;首发时间&quot;: &quot;2020年&quot;,
      &quot;最后维护时间&quot;: &quot;2025年&quot;,
      &quot;维护状态&quot;: &quot;活跃维护&quot;,
      &quot;获取root原理&quot;: &quot;基于ART Hooking技术，通过Riru/Zygisk模块实现Xposed API&quot;,
      &quot;开发团队背景&quot;: &quot;LSPosed开发团队，开源社区维护&quot;,
      &quot;衍生工具&quot;: [&quot;LSPatch&quot;, &quot;CorePatch&quot;, &quot;Shamiko&quot;],
      &quot;是否主流工具&quot;: true,
      &quot;下载渠道链接&quot;: &quot;https://github.com/LSPosed/LSPosed/releases&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://github.com/LSPosed/LSPosed/wiki&quot;
    },
    {
      &quot;官方标准名称&quot;: &quot;EdXposed&quot;,
      &quot;所属类型&quot;: &quot;注入框架 (Xposed框架)&quot;,
      &quot;首发时间&quot;: &quot;2018年&quot;,
      &quot;最后维护时间&quot;: &quot;2023年&quot;,
      &quot;维护状态&quot;: &quot;维护缓慢&quot;,
      &quot;获取root原理&quot;: &quot;Xposed框架实现，支持Android 8.0-12&quot;,
      &quot;开发团队背景&quot;: &quot;ElderDrivers团队开发&quot;,
      &quot;衍生工具&quot;: [],
      &quot;是否主流工具&quot;: false,
      &quot;下载渠道链接&quot;: &quot;https://github.com/ElderDrivers/EdXposed/releases&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://github.com/ElderDrivers/EdXposed/wiki&quot;
    },
    {
      &quot;官方标准名称&quot;: &quot;LSPatch&quot;,
      &quot;所属类型&quot;: &quot;注入框架 (免Root Xposed)&quot;,
      &quot;首发时间&quot;: &quot;2022年&quot;,
      &quot;最后维护时间&quot;: &quot;2023年&quot;,
      &quot;维护状态&quot;: &quot;维护缓慢&quot;,
      &quot;获取root原理&quot;: &quot;无Root实现LSPosed框架，通过DEX和SO注入目标APK&quot;,
      &quot;开发团队背景&quot;: &quot;LSPosed社区开发&quot;,
      &quot;衍生工具&quot;: [&quot;NPatch&quot;],
      &quot;是否主流工具&quot;: false,
      &quot;下载渠道链接&quot;: &quot;https://github.com/LSPosed/LSPatch/releases&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://github.com/LSPosed/LSPatch/wiki&quot;
    },
    {
      &quot;官方标准名称&quot;: &quot;Shizuku&quot;,
      &quot;所属类型&quot;: &quot;注入框架 (系统API访问)&quot;,
      &quot;首发时间&quot;: &quot;2019年&quot;,
      &quot;最后维护时间&quot;: &quot;2025-05-25 (v13.6.0)&quot;,
      &quot;维护状态&quot;: &quot;活跃维护&quot;,
      &quot;获取root原理&quot;: &quot;通过ADB或Root权限提供系统API访问，无需完整Root权限&quot;,
      &quot;开发团队背景&quot;: &quot;由RikkaApps开发者团队维护&quot;,
      &quot;衍生工具&quot;: [&quot;Sui服务&quot;],
      &quot;是否主流工具&quot;: true,
      &quot;下载渠道链接&quot;: &quot;https://github.com/RikkaApps/Shizuku/releases&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://shizuku.rikka.app/docs/&quot;
    },
    {
      &quot;官方标准名称&quot;: &quot;Riru&quot;,
      &quot;所属类型&quot;: &quot;注入框架 (Hooking模块)&quot;,
      &quot;首发时间&quot;: &quot;2018年&quot;,
      &quot;最后维护时间&quot;: &quot;2025年&quot;,
      &quot;维护状态&quot;: &quot;活跃维护&quot;,
      &quot;获取root原理&quot;: &quot;为Magisk提供ART Hooking框架，支持YAHFA和LSPlant&quot;,
      &quot;开发团队背景&quot;: &quot;由Rikka开发者创建，开源项目&quot;,
      &quot;衍生工具&quot;: [&quot;Riru-LSposed&quot;, &quot;Riru-Sui&quot;],
      &quot;是否主流工具&quot;: true,
      &quot;下载渠道链接&quot;: &quot;https://github.com/RikkaApps/Riru/releases&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://github.com/RikkaApps/Riru/wiki&quot;
    },
    {
      &quot;官方标准名称&quot;: &quot;Riru-LSposed&quot;,
      &quot;所属类型&quot;: &quot;注入框架 (组合方案)&quot;,
      &quot;首发时间&quot;: &quot;2020年&quot;,
      &quot;最后维护时间&quot;: &quot;2025年&quot;,
      &quot;维护状态&quot;: &quot;活跃维护&quot;,
      &quot;获取root原理&quot;: &quot;Riru模块 + LSPosed框架组合，提供完整Xposed环境&quot;,
      &quot;开发团队背景&quot;: &quot;LSPosed开发团队维护&quot;,
      &quot;衍生工具&quot;: [],
      &quot;是否主流工具&quot;: true,
      &quot;下载渠道链接&quot;: &quot;https://github.com/LSPosed/LSPosed/releases&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://github.com/LSPosed/LSPosed/wiki/Installation&quot;
    },
    {
      &quot;官方标准名称&quot;: &quot;NPatch&quot;,
      &quot;所属类型&quot;: &quot;注入框架 (免Root Xposed)&quot;,
      &quot;首发时间&quot;: &quot;2023年&quot;,
      &quot;最后维护时间&quot;: &quot;2025年&quot;,
      &quot;维护状态&quot;: &quot;活跃维护&quot;,
      &quot;获取root原理&quot;: &quot;基于LSPosed的免Root Xposed框架，复刻LSPatch功能&quot;,
      &quot;开发团队背景&quot;: &quot;由7723mod/HSSkyBoy团队维护&quot;,
      &quot;衍生工具&quot;: [],
      &quot;是否主流工具&quot;: false,
      &quot;下载渠道链接&quot;: &quot;https://github.com/7723mod/NPatch/releases&quot;,
      &quot;安装和使用教程链接&quot;: &quot;https://github.com/7723mod/NPatch/wiki&quot;
    },
    {
      &quot;官方标准名称&quot;: &quot;OPatch&quot;,
      &quot;所属类型&quot;: &quot;注入框架 (修补工具)&quot;,
      &quot;首发时间&quot;: &quot;2024年&quot;,
      &quot;最后维护时间&quot;: &quot;2025年&quot;,
      &quot;维护状态&quot;: &quot;社区维护&quot;,
      &quot;获取root原理&quot;: &quot;系统镜像修补工具，辅助Root和框架安装&quot;,
      &quot;开发团队背景&quot;: &quot;开源社区维护&quot;,
      &quot;衍生工具&quot;: [],
      &quot;是否主流工具&quot;: false,
      &quot;下载渠道链接&quot;: &quot;需查询具体社区资源&quot;,
      &quot;安装和使用教程链接&quot;: &quot;需查询具体社区文档&quot;
    }
  ]
}</pre>
</div>
