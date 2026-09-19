<div class="legacy-note">
<pre>iOS逆向注入分析方式
{
  &quot;injection_methods&quot;: [
    {
      &quot;name&quot;: &quot;静态注入 (Static Injection)&quot;,
      &quot;description&quot;: &quot;通过修改应用二进制 Mach-O 文件，插入动态库加载命令，并重签名以实现持久化注入。&quot;,
      &quot;tools&quot;: [&quot;optool&quot;, &quot;insert_dylib&quot;, &quot;yololib&quot;, &quot;codesign&quot;, &quot;iOS App Signer&quot;],
      &quot;steps&quot;: [
        &quot;解压 IPA 包，获取 .app 目录&quot;,
        &quot;将动态库（.dylib 或 .framework）放入 Frameworks 目录&quot;,
        &quot;使用工具修改主二进制，添加对动态库的加载命令&quot;,
        &quot;重新签名整个应用包&quot;,
        &quot;安装到设备（非越狱需有效证书）&quot;
      ],
      &quot;pentest_use&quot;: &quot;用于向目标应用植入后门或监控代码，生成带恶意插件的 IPA 进行测试；可用于持久化控制，但需绕过应用完整性校验。&quot;,
      &quot;advantages&quot;: [&quot;适用于非越狱设备&quot;, &quot;持久有效，一次安装长期生效&quot;],
      &quot;disadvantages&quot;: [&quot;操作复杂&quot;, &quot;可能触发应用自校验&quot;, &quot;需开发者证书重签名&quot;],
      &quot;environment&quot;: &quot;非越狱设备（需开发者账号）或越狱设备（无需签名）&quot;
    },
    {
      &quot;name&quot;: &quot;TrollFools 注入 (基于漏洞免签)&quot;,
      &quot;description&quot;: &quot;利用 TrollStore（基于 CoreTrust 漏洞）的永久签名机制，通过 TrollFools 工具向已安装应用注入动态库，无需重打包和签名。&quot;,
      &quot;tools&quot;: [&quot;TrollFools&quot;, &quot;TrollStore&quot;],
      &quot;steps&quot;: [
        &quot;确保设备已安装 TrollStore&quot;,
        &quot;打开 TrollFools&quot;,
        &quot;选择目标应用和要注入的动态库&quot;,
        &quot;点击注入，TrollFools 自动完成注入&quot;
      ],
      &quot;pentest_use&quot;: &quot;在已部署 TrollStore 的测试设备上，快速向目标应用注入后门插件或监控模块，便于动态分析，且可随时移除。&quot;,
      &quot;advantages&quot;: [&quot;无需重签名&quot;, &quot;无需越狱&quot;, &quot;注入/移除方便&quot;, &quot;不破坏原应用文件&quot;],
      &quot;disadvantages&quot;: [&quot;依赖 TrollStore 安装&quot;, &quot;仅支持 iOS 14.0-16.6.1（特定漏洞版本）&quot;, &quot;部分系统版本可能不支持&quot;],
      &quot;environment&quot;: &quot;支持 TrollStore 的 iOS 版本（非越狱但利用漏洞）&quot;
    },
    {
      &quot;name&quot;: &quot;运行时进程注入 (Runtime Injection)&quot;,
      &quot;description&quot;: &quot;通过调试器或动态插桩工具，在应用运行时将代码注入内存，实现临时 Hook 和分析。&quot;,
      &quot;tools&quot;: [&quot;lldb + debugserver&quot;, &quot;Frida&quot;, &quot;gdb&quot;],
      &quot;steps&quot;: [
        &quot;附加到目标进程（越狱设备直接 frida-ps，非越狱需调试权限或 frida-gadget）&quot;,
        &quot;使用工具加载脚本或动态库（如 Frida 的 Interceptor.attach，或通过 debugserver 调用 dlopen）&quot;,
        &quot;执行 Hook 或监控逻辑&quot;
      ],
      &quot;pentest_use&quot;: &quot;渗透测试中动态分析应用行为、拦截敏感数据、修改函数返回值、绕过认证等；无需永久修改，适合实时测试。&quot;,
      &quot;advantages&quot;: [&quot;无需修改应用文件&quot;, &quot;灵活，可动态调整&quot;, &quot;适合快速验证和漏洞挖掘&quot;],
      &quot;disadvantages&quot;: [&quot;每次运行需手动附加&quot;, &quot;非越狱设备需调试权限或重打包注入 gadget&quot;, &quot;不持久，重启失效&quot;],
      &quot;environment&quot;: &quot;越狱设备（frida-server）或非越狱（需调试/重打包）&quot;
    },
    {
      &quot;name&quot;: &quot;Tweak 框架注入 (Substrate/libhooker)&quot;,
      &quot;description&quot;: &quot;在越狱设备上，利用 Cydia Substrate 或 libhooker 框架，将 Tweak 动态库自动注入到目标进程，实现系统级钩子。&quot;,
      &quot;tools&quot;: [&quot;Theos&quot;, &quot;Cydia Substrate&quot;, &quot;libhooker&quot;, &quot;MobileSubstrate&quot;],
      &quot;steps&quot;: [
        &quot;使用 Theos 创建 Tweak 项目，编写钩子代码&quot;,
        &quot;编译生成 .dylib 和 .plist 配置文件&quot;,
        &quot;将文件放置到 /Library/MobileSubstrate/DynamicLibraries/（或对应路径）&quot;,
        &quot;重启目标进程，框架自动注入&quot;
      ],
      &quot;pentest_use&quot;: &quot;在越狱测试设备上部署持久化监控插件，如记录应用网络请求、拦截加密数据、绕过越狱检测等；适合长期控制和分析。&quot;,
      &quot;advantages&quot;: [&quot;持久化注入&quot;, &quot;无需重签名&quot;, &quot;多进程支持&quot;, &quot;生态成熟，功能强大&quot;],
      &quot;disadvantages&quot;: [&quot;依赖越狱环境&quot;, &quot;安装后全局生效，调试相对不便&quot;, &quot;可能被反越狱检测&quot;],
      &quot;environment&quot;: &quot;越狱设备&quot;
    }
  ]
}</pre>
</div>
