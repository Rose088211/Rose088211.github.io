<div class="legacy-note">
<pre>{
  &quot;major_changes&quot;: [
    {
      &quot;version_series&quot;: &quot;17.x&quot;,
      &quot;time_range&quot;: &quot;2025年8月至今&quot;,
      &quot;key_changes&quot;: [
        &quot;API重大重构：移除Legacy-style Enumeration APIs，Memory Read/Write API现代化，Module静态API移除&quot;,
        &quot;Android架构重写：17.6版本采用Zymbiote注入机制，重写Zygote Hook&quot;,
        &quot;eBPF集成：17.9.0引入Linux eBPF spawn gater，增强反检测能力&quot;,
        &quot;桥接模块解耦：frida-java-bridge等桥接模块从GumJS中拆分，需手动引入&quot;
      ]
    },
    {
      &quot;version_series&quot;: &quot;16.x&quot;,
      &quot;time_range&quot;: &quot;约2023-2025年&quot;,
      &quot;key_changes&quot;: [
        &quot;异步设备管理：彻底移除frida.get_device_manager()等同步API，需使用frida.enumerate_devices()+await&quot;,
        &quot;frida-tools适配：需使用frida-tools 12.0.0+版本兼容&quot;,
        &quot;iOS模拟器支持改进：16.2.2修复rootless越狱环境模块加载问题&quot;
      ]
    },
    {
      &quot;version_series&quot;: &quot;15.x&quot;,
      &quot;time_range&quot;: &quot;约2022-2024年&quot;,
      &quot;key_changes&quot;: [
        &quot;稳定性提升：修复多个bug，提高兼容性&quot;,
        &quot;版本兼容性：frida-tools 10.5.2-12.0.0对应此版本范围&quot;,
        &quot;编译环境要求：需要特定Node.js和NDK版本&quot;
      ]
    },
    {
      &quot;version_series&quot;: &quot;14.x&quot;,
      &quot;time_range&quot;: &quot;约2021-2023年&quot;,
      &quot;key_changes&quot;: [
        &quot;JavaScript引擎切换：14.0引入QuickJS作为默认引擎（内存占用为V8的1/5），14.3切回V8&quot;,
        &quot;用户接口改进：hook过程更直观易懂&quot;,
        &quot;Android版本适配：Android 9.0+推荐使用14.0+版本&quot;,
        &quot;Stalker增强：14.0开始较好支持arm64架构&quot;
      ]
    },
    {
      &quot;version_series&quot;: &quot;13.x&quot;,
      &quot;time_range&quot;: &quot;约2020-2021年&quot;,
      &quot;key_changes&quot;: [
        &quot;安全性增强：使用新加密机制&quot;
      ]
    },
    {
      &quot;version_series&quot;: &quot;12.x&quot;,
      &quot;time_range&quot;: &quot;约2019-2020年&quot;,
      &quot;key_changes&quot;: [
        &quot;动态代码注入能力提升：引入更强大的注入功能&quot;,
        &quot;Android版本适配：Android 5-6使用12.3.6，Android 7-8使用12.8.0&quot;
      ]
    }
  ],
  &quot;compatibility_recommendations&quot;: {
    &quot;android_version_adaptation&quot;: [
      {
        &quot;android_version&quot;: &quot;5-6&quot;,
        &quot;recommended_frida&quot;: &quot;12.3.6&quot;,
        &quot;python_version&quot;: &quot;3.7&quot;
      },
      {
        &quot;android_version&quot;: &quot;7-8&quot;,
        &quot;recommended_frida&quot;: &quot;12.8.0&quot;,
        &quot;python_version&quot;: &quot;3.8&quot;
      },
      {
        &quot;android_version&quot;: &quot;9.0+&quot;,
        &quot;recommended_frida&quot;: &quot;14.0+&quot;,
        &quot;python_version&quot;: &quot;3.8&quot;
      }
    ],
    &quot;frida_tools_version_correspondence&quot;: [
      {
        &quot;frida_version&quot;: &quot;15.x&quot;,
        &quot;frida_tools_version&quot;: &quot;10.5.2-12.0.0&quot;
      },
      {
        &quot;frida_version&quot;: &quot;16.x&quot;,
        &quot;frida_tools_version&quot;: &quot;12.0.1-12.3.0&quot;
      },
      {
        &quot;frida_version&quot;: &quot;17.x&quot;,
        &quot;frida_tools_version&quot;: &quot;14.0.0+&quot;
      }
    ],
    &quot;major_architectural_changes&quot;: [
      {
        &quot;version&quot;: &quot;17.0.0&quot;,
        &quot;change&quot;: &quot;API现代化重构，需更新脚本语法&quot;
      },
      {
        &quot;version&quot;: &quot;16.0.0&quot;,
        &quot;change&quot;: &quot;设备管理API异步化，需更新Python代码&quot;
      },
      {
        &quot;version&quot;: &quot;14.0.0&quot;,
        &quot;change&quot;: &quot;JavaScript引擎切换，影响性能和内存使用&quot;
      }
    ]
  }
}
</pre>
</div>
