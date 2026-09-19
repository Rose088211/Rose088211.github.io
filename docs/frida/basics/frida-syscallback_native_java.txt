<div class="legacy-note">
<pre>so加载的起点:Java层调用
    一切始于你的Java或Kotlin代码。当你需要调用Native功能时,
    首先需要使用 System.loadLibrary(&quot;mylib&quot;)或 System.load(&quot;/absolute/path/to/libmylib.so&quot;)来加载对应的SO库。
    loadLibrary与 load的区别:loadLibrary只需指定库名(去掉文件名前缀的 lib和扩展名),
    系统会自动在默认的库路径(如APK内的 jniLibs目录或安装后解压的本地目录)中查找。
    而 load需要提供SO文件的绝对路径,通常用于加载非标准路径(如从assets目录复制出来)的库。

触发ART:
    这个调用会进入Android Runtime (ART),ART会准备JNI环境,并最终通过Linux系统的 dlopen函数将SO库加载到当前进程的内存空间中。

核心环节:Native层的链接与初始化
    SO库被加载到内存后,系统的动态链接器开始工作,其核心流程主要包括:
    查找依赖:解析SO文件,加载其依赖的其他所有SO库,形成一个完整的依赖树。
    重定位:将符号(如函数、变量)的引用地址修正为内存中的实际地址。
    执行初始化代码:这是JNI注册发生的关键阶段。链接器会自动执行SO库中的初始化函数。对于JNI来说,最关键的是 JNI_OnLoad函数。

最终步骤:JNI方法注册
    方法注册是连接Java声明和Native实现的关键一步,主要有两种方式。

    静态注册流程:
    在 Java 类中，使用 native关键字声明方法。
    public class MainActivity extends AppCompatActivity {
    // 声明一个native方法
    public native String stringFromJNI();
    // 加载对应的native库
    static {
        System.loadLibrary(&quot;native-lib&quot;);
    }
    }

    利用 javah(或 Android Studio 的 javac -h命令)
    根据 .class文件生成 C/C++ 头文件。
    这个头文件中的函数名会严格按照 Java_包名_类名_方法名的格式生成
    // 生成的头文件函数示例
    JNIEXPORT jstring JNICALL
    Java_com_example_myapp_MainActivity_stringFromJNI(JNIEnv *, jobject);

    Native 层实现:在 C/C++ 文件中 #include生成的头文件，并按照这个签名实现函数
    #include &lt;jni.h&gt; //java与native世界的基础链接桥梁
    #include &quot;com_example_myapp_MainActivity.h&quot; // 包含生成的头文件，实现静态注册
    extern &quot;C&quot; JNIEXPORT jstring JNICALL
    Java_com_example_myapp_MainActivity_stringFromJNI(JNIEnv *env, jobject thiz) {
        // 实现功能
        return env-&gt;NewStringUTF(&quot;Hello from JNI!&quot;);
    }

     动态注册流程:
     Java 层声明与加载库:这一步与静态注册相同，声明 Native 方法并加载 so 库
     实现 JNI_OnLoad函数:这是一个关键函数。当执行 System.loadLibrary()时，系统会自动调用​ so 库中的 JNI_OnLoad函数
        #include &lt;jni.h&gt;
        #include &lt;string&gt;

        //================================================
        // 第一步：实现具体的 Native 函数
        // 这些函数的签名可以自由命名，无需遵循复杂的静态注册规则。
        //================================================

        // 对应 Java 中的 getStringFromNative() 方法
        jstring native_get_string(JNIEnv *env, jobject /* this */) {
            std::string hello = &quot;Hello from Dynamic JNI!&quot;;
            return env-&gt;NewStringUTF(hello.c_str());
        }

        // 对应 Java 中的 getIntFromNative(int input) 方法
        jint native_get_int(JNIEnv *env, jobject /* this */, jint input) {
            // 简单的逻辑：输入值加 10
            return input + 10;
        }

        //================================================
        // 第二步：建立方法映射表 (JNINativeMethod)
        // 这是连接 Java 方法和 Native 函数的桥梁。
        //================================================
        static const JNINativeMethod native_methods[] = {
            // 格式：{ &quot;Java方法名&quot;, &quot;方法签名&quot;, (void*)指向对应的Native函数指针 }

            // 映射 getStringFromNative：无参，返回 String
            {&quot;getStringFromNative&quot;, &quot;()Ljava/lang/String;&quot;, (void *) native_get_string},

            // 映射 getIntFromNative：一个 int 参数，返回 int
            {&quot;getIntFromNative&quot;,    &quot;(I)I&quot;,                  (void *) native_get_int}
        };

        //================================================
        // 第三步：在 JNI_OnLoad 中完成注册
        // 此函数在 System.loadLibrary() 时自动调用。
        //================================================
        JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void* /* reserved */) {
            JNIEnv* env = nullptr;
            jint result = -1;

            // 1. 获取 JNIEnv 指针
            if (vm-&gt;GetEnv((void**)&amp;env, JNI_VERSION_1_6) != JNI_OK) {
                return result; // 获取失败，返回错误码
            }

            // 2. 通过类全限定名找到要注册的 Java 类
            jclass clazz = env-&gt;FindClass(&quot;com/example/yourpackagename/MainActivity&quot;);
            if (clazz == nullptr) {
                return result; // 找不到类，返回错误码
            }

            // 3. 【核心】调用 RegisterNatives 进行注册
            // 参数：jclass, 映射表数组, 映射表中方法的个数
            if (env-&gt;RegisterNatives(clazz,
                                    native_methods,
                                    sizeof(native_methods) / sizeof(native_methods[0])) &lt; 0) {
                return result; // 注册失败，返回错误码
            }

            // 4. 返回所需的 JNI 版本号，表示成功
            return JNI_VERSION_1_6;
        }


实际Hook框架的实现方式(运行时进程注入、代码修改、内存篡改)
Frida的Native Hook示例
    // Hook静态注册的JNI函数
    Interceptor.attach(Module.findExportByName(&quot;libnative.so&quot;, 
        &quot;Java_com_example_MainActivity_stringFromJNI&quot;), {
        onEnter: function(args) {
            console.log(&quot;JNI函数被调用&quot;);
        },
        onLeave: function(retval) {
            console.log(&quot;函数返回: &quot; + retval);
        }
    });

    // Hook动态注册的函数（通过拦截RegisterNatives）
    var registerNatives = Module.findExportByName(null, &quot;RegisterNatives&quot;);
    Interceptor.attach(registerNatives, {
        onEnter: function(args) {
            var methods = args[2]; // JNINativeMethod* 数组
            // 修改数组中的函数指针
        }
    });

Xposed Native Hook
    // 在Xposed Native层模块中
    void hook_jni_methods(JNIEnv* env) {
        // 查找类
        jclass targetClass = env-&gt;FindClass(&quot;com/example/MainActivity&quot;);
        
        // Hook静态注册的方法
        void* origMethod = (void*)env-&gt;GetStaticMethodID(
            targetClass, &quot;nativeMethod&quot;, &quot;()V&quot;);
        
        // 使用inline hook替换
        mmap_hook_function(origMethod, my_nativeMethod);
    }


Frida的java Hook示例
    Java.perform(() =&gt; {
        var MyClass = Java.use(&quot;com.isprint.yessafe.callbackdemo.ui.MainActivity&quot;);
        // 注意：这里使用的是 .overload()，因为目标方法没有参数
        MyClass.testFrida.overload().implementation = function() {
            console.log(&quot;[+] testFrida() hooked successfully. Returning new value.&quot;);
            // 直接返回新的字符串，不再调用原始方法
            return &quot;i-sprint hook!!!&quot;;
        };
    });
</pre>
</div>
