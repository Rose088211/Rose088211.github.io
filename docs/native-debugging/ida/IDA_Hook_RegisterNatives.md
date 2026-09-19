<div class="legacy-note">
<pre>//so文件export表中的jni静态注册函数，Java_com_example_test_nativeFunc，先测试是否调用了
var addr = Module.findExportByName(&quot;libtest.so&quot;, &quot;Java_com_example_test_nativeFunc&quot;);
if (addr) {
    Interceptor.attach(addr, {
        onEnter: function(args) {
            console.log(&quot;Hook triggered!&quot;);
        }
    });
}


//排除同名注册函数Hook RegisterNatives 观察
//如果 RegisterNatives 注册了和导出符号同名的函数，且 fnPtr 不等于导出符号的地址，那么实际调用的是 fnPtr，而不是导出符号。你需要Hook那个 fnPtr。
var RegisterNatives = Module.findExportByName(&quot;libart.so&quot;, &quot;RegisterNatives&quot;);
Interceptor.attach(RegisterNatives, {
    onEnter: function(args) {
        var env = args[0];
        var clazz = args[1];
        var methods = args[2];
        var count = args[3].toInt32();
        console.log(&quot;RegisterNatives called, class:&quot;, clazz);
        // 打印注册的方法名和地址
        for (var i = 0; i &lt; count; i++) {
            var method = methods.add(i * Process.pointerSize * 3);
            var name = method.readPointer().readCString();
            var sig = method.add(Process.pointerSize).readPointer().readCString();
            var fnPtr = method.add(Process.pointerSize * 2).readPointer();
            console.log(name, sig, fnPtr);
        }
    }
});


//找到实际函数地址后，直接用 Interceptor.replace 替换它即可。
var realAddr = ptr(&quot;0x12345678&quot;); // 从 RegisterNatives 打印得到的地址
Interceptor.replace(realAddr, new NativeCallback(function(env, thiz) {
    console.log(&quot;Bypass&quot;);
    return 0; // 根据返回类型填默认值
}, &#39;void&#39;, [&#39;pointer&#39;, &#39;pointer&#39;]));

</pre>
</div>
