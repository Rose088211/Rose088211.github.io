<div class="legacy-note">
<pre>cli命令以及详解:
{
  &quot;frida_cli_commands&quot;: {
    &quot;help&quot;: {
      &quot;description&quot;: &quot;显示所有可用命令的帮助信息&quot;,
      &quot;usage&quot;: &quot;help&quot;,
      &quot;example&quot;: &quot;help&quot;
    },
    &quot;exit&quot;: {
      &quot;description&quot;: &quot;退出Frida CLI并分离注入&quot;,
      &quot;usage&quot;: &quot;exit&quot;,
      &quot;example&quot;: &quot;exit&quot;
    },
    &quot;%resume&quot;: {
      &quot;description&quot;: &quot;恢复被暂停的进程执行&quot;,
      &quot;usage&quot;: &quot;%resume&quot;,
      &quot;example&quot;: &quot;%resume&quot;
    },
    &quot;%load&quot;: {
      &quot;description&quot;: &quot;加载并执行JavaScript脚本文件&quot;,
      &quot;usage&quot;: &quot;%load &lt;脚本文件路径&gt;&quot;,
      &quot;example&quot;: &quot;%load /path/to/script.js&quot;
    },
    &quot;%unload&quot;: {
      &quot;description&quot;: &quot;卸载当前加载的脚本&quot;,
      &quot;usage&quot;: &quot;%unload&quot;,
      &quot;example&quot;: &quot;%unload&quot;
    },
    &quot;%reload&quot;: {
      &quot;description&quot;: &quot;重新加载当前脚本(修改后更新)&quot;,
      &quot;usage&quot;: &quot;%reload&quot;,
      &quot;example&quot;: &quot;%reload&quot;
    },
    &quot;%compiled&quot;: {
      &quot;description&quot;: &quot;切换JavaScript引擎(V8/DUK)&quot;,
      &quot;usage&quot;: &quot;%compiled&quot;,
      &quot;example&quot;: &quot;%compiled&quot;
    },
    &quot;%time&quot;: {
      &quot;description&quot;: &quot;测量下一个命令的执行时间&quot;,
      &quot;usage&quot;: &quot;%time &lt;command&gt;&quot;,
      &quot;example&quot;: &quot;%time Java.perform(...)&quot;
    },
    &quot;Java.perform&quot;: {
      &quot;description&quot;: &quot;在Java虚拟机上下文中执行代码(Android)&quot;,
      &quot;usage&quot;: &quot;Java.perform(function() { ... })&quot;,
      &quot;example&quot;: &quot;Java.perform(function() { console.log(&#39;In Java context&#39;) })&quot;
    },
    &quot;ObjC.classes&quot;: {
      &quot;description&quot;: &quot;访问Objective-C类(iOS/macOS)&quot;,
      &quot;usage&quot;: &quot;ObjC.classes.&lt;ClassName&gt;&quot;,
      &quot;example&quot;: &quot;ObjC.classes.NSString&quot;
    },
    &quot;Module&quot;: {
      &quot;description&quot;: &quot;操作加载的模块(查找导出函数等)&quot;,
      &quot;usage&quot;: &quot;Module.findExportByName(&#39;&lt;module&gt;&#39;, &#39;&lt;function&gt;&#39;)&quot;,
      &quot;example&quot;: &quot;Module.findExportByName(&#39;libc.so&#39;, &#39;strlen&#39;)&quot;
    },
    &quot;Memory&quot;: {
      &quot;description&quot;: &quot;内存操作(读取/写入/分配)&quot;,
      &quot;usage&quot;: &quot;Memory.readByteArray(address, length)&quot;,
      &quot;example&quot;: &quot;Memory.readByteArray(ptr(0x1234), 16)&quot;
    },
    &quot;Interceptor&quot;: {
      &quot;description&quot;: &quot;函数/方法拦截器&quot;,
      &quot;usage&quot;: &quot;Interceptor.attach(target, callbacks)&quot;,
      &quot;example&quot;: &quot;Interceptor.attach(target, { onEnter: ..., onLeave: ... })&quot;
    },
    &quot;console&quot;: {
      &quot;description&quot;: &quot;控制台输出(log/warn/error)&quot;,
      &quot;usage&quot;: &quot;console.log(&#39;message&#39;)&quot;,
      &quot;example&quot;: &quot;console.log(&#39;Hello from Frida&#39;)&quot;
    },
    &quot;Process&quot;: {
      &quot;description&quot;: &quot;当前进程信息&quot;,
      &quot;usage&quot;: &quot;Process.id / Process.arch&quot;,
      &quot;example&quot;: &quot;console.log(&#39;PID:&#39;, Process.id)&quot;
    }
  },
  &quot;usage_note&quot;: &quot;在Frida CLI中,所有命令可以直接输入执行。%开头的命令是CLI内置命令,其他是JavaScript API调用。输入的命令会在当前注入的进程上下文中执行。&quot;
}

frida 参数指令
{
  &quot;spawn模式参数&quot;: {
    &quot;-f TARGET, --file TARGET&quot;: &quot;生成(启动)TARGET(目标包名)[1,3](@ref)&quot;
  },
  &quot;attach模式参数&quot;: {
    &quot;-F, --attach-frontmost&quot;: &quot;附加到最前面的应用程序[3](@ref)&quot;,
    &quot;-n NAME, --attach-name NAME&quot;: &quot;附加到名称匹配NAME的进程[3](@ref)&quot;,
    &quot;-N IDENTIFIER, --attach-identifier IDENTIFIER&quot;: &quot;附加到标识符匹配IDENTIFIER的进程&quot;,
    &quot;-p PID, --attach-pid PID&quot;: &quot;附加到PID指定的进程[3](@ref)&quot;
  },
  &quot;通用模式参数&quot;: {
    &quot;-h, --help&quot;: &quot;展示帮助信息并退出&quot;,
    &quot;-D ID, --device ID&quot;: &quot;连接到给定ID的设备&quot;,
    &quot;-U, --usb&quot;: &quot;连接到USB设备&quot;,
    &quot;-R, --remote&quot;: &quot;连接到远程frida-server&quot;,
    &quot;-H HOST, --host HOST&quot;: &quot;连接到HOST上的远程frida-server&quot;,
    &quot;--certificate CERTIFICATE&quot;: &quot;与HOST使用TLS,需要证书(CERTIFICATE)&quot;,
    &quot;--origin ORIGIN&quot;: &quot;连接到远程服务器,并将“Origin”标头设置为ORIGIN&quot;,
    &quot;--token TOKEN&quot;: &quot;使用token与主机进行身份验证&quot;,
    &quot;--keepalive-interval INTERVAL&quot;: &quot;设置保活间隔(秒),或设置0禁用(默认为-1,根据传输自动选择)&quot;,
    &quot;--p2p&quot;: &quot;与目标建立对等(p2p)连接&quot;,
    &quot;--stun-server ADDRESS&quot;: &quot;设置STUN服务器地址以与--p2p一起使用&quot;,
    &quot;--relay address,username,password,turn-{udp,tcp,tls}&quot;: &quot;添加中继以与--p2p一起使用&quot;,
    &quot;-W PATTERN, --await PATTERN&quot;: &quot;等待生成匹配PATTERN的进程&quot;,
    &quot;--stdio {inherit,pipe}&quot;: &quot;生成进程时的标准输入/输出行为(默认为“inherit”)&quot;,
    &quot;--aux option&quot;: &quot;在生成进程时设置辅助选项,例如“uid=(int)42”(支持的类型:string, bool, int)&quot;,
    &quot;--realm {native,emulated}&quot;: &quot;要附加的领域(原生或模拟)&quot;,
    &quot;--runtime {qjs,v8}&quot;: &quot;脚本使用的运行时&quot;,
    &quot;--debug&quot;: &quot;启用与Node.js兼容的脚本调试器&quot;,
    &quot;--squelch-crash&quot;: &quot;如果启用,则不会将崩溃报告转储到控制台&quot;,
    &quot;-O FILE, --options-file FILE&quot;: &quot;包含其他命令行选项的文本文件&quot;,
    &quot;--version&quot;: &quot;显示程序版本信息并退出&quot;,
    &quot;-l SCRIPT, --load SCRIPT&quot;: &quot;加载SCRIPT脚本文件&quot;,
    &quot;-P PARAMETERS_JSON, --parameters PARAMETERS_JSON&quot;: &quot;以JSON格式提供参数,与Gadget相同&quot;,
    &quot;-C USER_CMODULE, --cmodule USER_CMODULE&quot;: &quot;加载C模块(CMODULE)&quot;,
    &quot;--toolchain {any,internal,external}&quot;: &quot;从源代码编译时使用的CModule工具链&quot;,
    &quot;-c CODESHARE_URI, --codeshare CODESHARE_URI&quot;: &quot;加载代码共享URI(CODESHARE_URI)&quot;,
    &quot;-e CODE, --eval CODE&quot;: &quot;执行CODE代码&quot;,
    &quot;-q&quot;: &quot;安静模式(无提示),在执行完-l和-e指定的脚本后退出&quot;,
    &quot;-t TIMEOUT, --timeout TIMEOUT&quot;: &quot;在安静模式下,终止前等待的秒数&quot;,
    &quot;--pause&quot;: &quot;在生成程序后,让主线程保持暂停状态&quot;,
    &quot;-o LOGFILE, --output LOGFILE&quot;: &quot;输出到日志文件&quot;,
    &quot;--eternalize&quot;: &quot;在退出前将脚本永久化&quot;,
    &quot;--exit-on-error&quot;: &quot;在遇到任何脚本异常后退出,退出码为1&quot;,
    &quot;--kill-on-exit&quot;: &quot;在Frida退出时杀死被生成的程序&quot;,
    &quot;--auto-perform&quot;: &quot;自动使用Java.perform包装输入的代码&quot;,
    &quot;--auto-reload&quot;: &quot;启用对所提供脚本和C模块的自动重新加载(默认开启)&quot;,
    &quot;--no-auto-reload&quot;: &quot;禁用对所提供脚本和C模块的自动重新加载&quot;
  }
}
</pre>
</div>
