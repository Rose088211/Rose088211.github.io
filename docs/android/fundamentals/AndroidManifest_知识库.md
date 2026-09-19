<div class="legacy-note">
<pre>特征：
&lt;application&gt;标签的android:name属性通常是以下几种情况:
第一类默认设置：
&lt;application
    android:icon=&quot;@mipmap/ic_launcher&quot;
    android:label=&quot;@string/app_name&quot;
    ...&gt;

第二类开发者自定义：
&lt;application
    android:name=&quot;.MyApplication&quot;                    # 相对路径
    #android:name=&quot;com.example.app.MyApplication&quot;    # 全限定名
    android:icon=&quot;@mipmap/ic_launcher&quot;
    android:label=&quot;@string/app_name&quot;
    ...&gt;

第三类第三方库Application类:
&lt;application
    android:name=&quot;androidx.multidex.MultiDexApplication&quot;    # MultiDex支持
    android:name=&quot;com.facebook.drawee.backends.pipeline.FrescoApplication&quot;  # Fresco
    android:name=&quot;io.flutter.app.FlutterApplication&quot;        # Flutter
    android:name=&quot;com.google.android.gms.ads.MobileAdsInitProvider&quot;  # Admob
&gt;


检查lib目录:
unzip -l your_app.apk | grep &quot;.so&quot;



</pre>
</div>
