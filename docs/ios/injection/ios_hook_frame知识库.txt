<div class="legacy-note">
<pre>[
  {
    &quot;官方标准名称&quot;: &quot;Cydia Substrate&quot;,
    &quot;所属类型&quot;: &quot;越狱开发核心框架&quot;,
    &quot;首发时间&quot;: &quot;2008-08-11&quot;,
    &quot;最后维护时间&quot;: &quot;2021-04-28&quot;,
    &quot;维护状态&quot;: &quot;停止维护&quot;,
    &quot;获取root原理&quot;: &quot;通过注入`launchd`来配置所有派生进程的环境，从而加载MobileLoader，进而加载`/Library/MobileSubstrate/DynamicLibraries/`目录下的第三方动态库。它通过内核补丁来修改内存页权限，以实现`MSHookFunction`对C/C++函数的hook [citation:1][citation:2]。&quot;,
    &quot;开发团队背景&quot;: &quot;由越狱社区最具影响力的开发者Jay Freeman (saurik) 独立开发。最初源于其另一个项目WinterBoard的核心代码，后独立成框架 [citation:2][citation:6]。&quot;,
    &quot;衍生工具&quot;: &quot;Theos（越狱开发工具包，封装了Substrate的API，提供Logos语法，简化开发流程）、各类Cydia越狱插件 [citation:5][citation:6]。&quot;,
    &quot;是否主流工具&quot;: &quot;否，已停止更新，被其继任者Ellekit替代&quot;,
    &quot;下载渠道链接&quot;: &quot;未找到官方直接下载链接，通常集成在Cydia源中&quot;,
    &quot;安装和使用教程链接&quot;: &quot;未找到通用教程链接&quot;
  },
  {
    &quot;官方标准名称&quot;: &quot;ElleKit&quot;,
    &quot;所属类型&quot;: &quot;越狱开发核心框架&quot;,
    &quot;首发时间&quot;: &quot;未知&quot;,
    &quot;最后维护时间&quot;: &quot;未知&quot;,
    &quot;维护状态&quot;: &quot;活跃&quot;,
    &quot;获取root原理&quot;: &quot;作为Cydia Substrate的现代替代品，为越狱开发提供hook功能。它为Rootless越狱设计，利用iOS的运行时和dyld机制进行代码注入和方法替换，以兼容最新的iOS版本和处理器架构（如解决arm64e指针认证码的问题） [citation:2]。&quot;,
    &quot;开发团队背景&quot;: &quot;由越狱社区开发者开发，是Electra、Chimera、Odyssey等现代越狱工具的核心组件。&quot;,
    &quot;衍生工具&quot;: &quot;现代越狱插件&quot;,
    &quot;是否主流工具&quot;: &quot;是，适用于iOS 11至14系统的现代越狱&quot;,
    &quot;下载渠道链接&quot;: &quot;未找到官方直接下载链接，通常集成在现代越狱工具中&quot;,
    &quot;安装和使用教程链接&quot;: &quot;未找到通用教程链接&quot;
  },
  {
    &quot;官方标准名称&quot;: &quot;Frida&quot;,
    &quot;所属类型&quot;: &quot;跨平台动态 Instrumentation 工具&quot;,
    &quot;首发时间&quot;: &quot;未知&quot;,
    &quot;最后维护时间&quot;: &quot;2024 (动态)&quot;,
    &quot;维护状态&quot;: &quot;活跃&quot;,
    &quot;获取root原理&quot;: &quot;在越狱设备上，通过安装Frida服务器，利用其动态注入功能将用于JavaScript交互的“代理”库注入目标进程。在非越狱环境下，则需要通过重签名App并注入Frida的动态库来实现 [citation:3][citation:7]。&quot;,
    &quot;开发团队背景&quot;: &quot;由NowSecure公司的安全研究员Olalekan Elesin创建，是一个开源社区驱动的项目，有大量的安全研究人员和企业贡献者。&quot;,
    &quot;衍生工具&quot;: &quot;Passionfruit (基于Frida的GUI应用安全分析工具)、r2frida (结合Radare2和Frida)、Objection (基于Frida的运行时移动探索工具) [citation:3]。&quot;,
    &quot;是否主流工具&quot;: &quot;是&quot;,
    &quot;下载渠道链接&quot;: &quot;https://frida.re/&quot;,
    &quot;安装和使用教程链接&quot;: &quot;https://frida.re/docs/home/&quot;
  },
  {
    &quot;官方标准名称&quot;: &quot;libhooker&quot;,
    &quot;所属类型&quot;: &quot;越狱开发核心框架&quot;,
    &quot;首发时间&quot;: &quot;2020&quot;,
    &quot;最后维护时间&quot;: &quot;2024 (动态)&quot;,
    &quot;维护状态&quot;: &quot;活跃&quot;,
    &quot;获取root原理&quot;: &quot;由Chimera13越狱工具开发者开发的，针对Rootless和现代iOS版本设计的hook框架，使用速度快且兼容性好的新技术替代传统的MobileSubstrate。通过其自己的注入和管理方式实现代码注入和方法hook。&quot;,
    &quot;开发团队背景&quot;: &quot;由CoolStar领导的Odyssey Team开发。CoolStar是著名的越狱开发者，推出了Electra、Chimera、Odyssey等多个越狱工具。&quot;,
    &quot;衍生工具&quot;: &quot;Chimera、Odyssey和Taurine等越狱工具、越狱插件&quot;,
    &quot;是否主流工具&quot;: &quot;是，适用于iOS 12至14系统的现代越狱&quot;,
    &quot;下载渠道链接&quot;: &quot;未找到官方直接下载链接，通常集成在Odyssey等越狱工具中&quot;,
    &quot;安装和使用教程链接&quot;: &quot;未找到通用教程链接&quot;
  },
  {
    &quot;官方标准名称&quot;: &quot;Aspects&quot;,
    &quot;所属类型&quot;: &quot;面向切面编程 (AOP) 框架&quot;,
    &quot;首发时间&quot;: &quot;未知&quot;,
    &quot;最后维护时间&quot;: &quot;未知&quot;,
    &quot;维护状态&quot;: &quot;未知&quot;,
    &quot;获取root原理&quot;: &quot;不需要获取Root权限。它基于Objective-C运行时，通过动态生成子类并覆盖目标方法，将前置、后置、异常等处理逻辑插入到方法执行过程中。适用于开发者自身应用内部的Hook，用于埋点、日志、AOP编程等 [citation:9]。&quot;,
    &quot;开发团队背景&quot;: &quot;由开源社区开发者维护，是一个用于iOS应用内AOP编程的轻量级框架。&quot;,
    &quot;衍生工具&quot;: &quot;无&quot;,
    &quot;是否主流工具&quot;: &quot;否，属于应用开发层的辅助框架&quot;,
    &quot;下载渠道链接&quot;: &quot;https://github.com/steipete/Aspects&quot;,
    &quot;安装和使用教程链接&quot;: &quot;https://github.com/steipete/Aspects&quot;
  }
]</pre>
</div>
