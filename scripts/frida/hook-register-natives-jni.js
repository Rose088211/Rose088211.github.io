//so加固用于拦截 Android 应用中通过 RegisterNatives 动态注册的 JNI 方法，并打印出类名、方法名、签名以及本地函数指针。
//2026-03-26 14:29:28.385854

Java.perform(function() {
    // 1. 查找 RegisterNatives 函数地址
    var registerNativesPtr = null;

    // 方法一：枚举 libart.so 中的导出符号，找到 RegisterNatives（排除 CheckJNI 版本）
    var symbols = Module.enumerateSymbolsSync("libart.so");
    for (var i = 0; i < symbols.length; i++) {
        var sym = symbols[i];
        if (sym.name.indexOf("RegisterNatives") !== -1 && sym.name.indexOf("CheckJNI") === -1) {
            registerNativesPtr = sym.address;
            console.log("[+] Found RegisterNatives at: " + registerNativesPtr);
            break;
        }
    }

    // 如果没找到，尝试直接通过导出名查找（备选）
    if (registerNativesPtr === null) {
        registerNativesPtr = Module.findExportByName("libart.so", "RegisterNatives");
        if (registerNativesPtr === null) {
            console.error("[!] Failed to find RegisterNatives in libart.so");
            return;
        }
        console.log("[+] Found RegisterNatives via export: " + registerNativesPtr);
    }

    // 2. Hook RegisterNatives
    Interceptor.attach(registerNativesPtr, {
        onEnter: function(args) {
            var env = args[0];                 // JNIEnv*
            var jclass = args[1];              // jclass
            var methods = args[2];             // JNINativeMethod* 数组指针
            var methodCount = args[3].toInt32(); // 方法数量

            // 获取类名（尝试通过 Java.cast 转换为 java.lang.Class 对象）
            var className = "unknown";
            try {
                var Class = Java.use("java.lang.Class");
                var cls = Java.cast(jclass, Class);
                className = cls.getName();
            } catch (e) {
                // 如果转换失败，打印 jclass 原始地址
                className = "jclass@" + jclass;
                console.warn("[!] Failed to get class name via Java.cast: " + e);
            }

            console.log("\n[RegisterNatives] Class: " + className);
            console.log("  Number of methods: " + methodCount);

            // 3. 遍历 JNINativeMethod 数组
            var ptrSize = Process.pointerSize;
            for (var i = 0; i < methodCount; i++) {
                var methodPtr = methods.add(i * ptrSize * 3); // 每个结构体占用 3 个指针
                var namePtr = methodPtr.readPointer();
                var sigPtr = methodPtr.add(ptrSize).readPointer();
                var fnPtr = methodPtr.add(ptrSize * 2).readPointer();

                var name = namePtr ? namePtr.readCString() : "null";
                var sig = sigPtr ? sigPtr.readCString() : "null";
                console.log("  Method #" + i + ": " + name + sig + " -> " + fnPtr);
            }
        },
        onLeave: function(retval) {
            // 可选：打印注册结果 (0 表示成功，负数表示失败)
            // console.log("[RegisterNatives] returned: " + retval);
        }
    });
});
