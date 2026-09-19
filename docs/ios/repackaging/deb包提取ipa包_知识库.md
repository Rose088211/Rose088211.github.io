<div class="legacy-note">
<pre>{
  &quot;task&quot;: &quot;将 .deb 包转换为 .ipa&quot;,
  &quot;summary&quot;: &quot;该过程通过提取应用包并重新打包为 iOS 所需的格式，将 Debian 软件包（.deb）转换为 iOS 应用包（.ipa）。&quot;,
  &quot;steps&quot;: [
    {
      &quot;step&quot;: 1,
      &quot;action&quot;: &quot;下载目标发行版对应架构的 .deb 包&quot;,
      &quot;details&quot;: &quot;获取适用于目标架构（如 arm64）的 .deb 文件。确保该软件包包含 iOS 应用，通常来自越狱源。&quot;,
      &quot;command_example&quot;: &quot;wget http://example.com/package.deb&quot;
    },
    {
      &quot;step&quot;: 2,
      &quot;action&quot;: &quot;解压 .deb 包&quot;,
      &quot;details&quot;: &quot;.deb 文件是一种 ar 归档。使用 ar x 提取 control 和 data 归档，然后解压 data tarball（通常是 data.tar.xz 或 data.tar.gz）以访问文件。&quot;,
      &quot;command_example&quot;: &quot;ar x package.deb &amp;&amp; tar -xf data.tar.xz&quot;
    },
    {
      &quot;step&quot;: 3,
      &quot;action&quot;: &quot;找到 .app 包&quot;,
      &quot;details&quot;: &quot;浏览解压后的文件，找到扩展名为 .app 的文件夹。通常位于 ./Applications/、./var/mobile/Applications/ 或类似路径下。 .app 文件夹包含 iOS 应用程序。&quot;,
      &quot;command_example&quot;: &quot;find . -name &#39;*.app&#39; -type d&quot;
    },
    {
      &quot;step&quot;: 4,
      &quot;action&quot;: &quot;创建 Payload 文件夹&quot;,
      &quot;details&quot;: &quot;创建一个名为 &#39;Payload&#39; 的文件夹，并将 .app 包移动或复制到其中。最终结构应为 Payload/YourApp.app/。&quot;,
      &quot;command_example&quot;: &quot;mkdir Payload &amp;&amp; cp -r path/to/YourApp.app Payload/&quot;
    },
    {
      &quot;step&quot;: 5,
      &quot;action&quot;: &quot;将 Payload 文件夹压缩为 ZIP&quot;,
      &quot;details&quot;: &quot;创建 Payload 文件夹的 ZIP 归档。使用标准 zip 压缩，不要使用额外压缩级别以确保兼容性。&quot;,
      &quot;command_example&quot;: &quot;zip -r Payload.zip Payload&quot;
    },
    {
      &quot;step&quot;: 6,
      &quot;action&quot;: &quot;将 ZIP 重命名为 .ipa&quot;,
      &quot;details&quot;: &quot;将文件扩展名从 .zip 改为 .ipa。生成的 .ipa 文件现在可以通过侧载工具或越狱方法安装到 iOS 设备上。&quot;,
      &quot;command_example&quot;: &quot;mv Payload.zip YourApp.ipa&quot;
    }
  ],
  &quot;notes&quot;: [
    &quot;.ipa 文件本质上是一个包含 Payload 文件夹（内含 .app 包）的 ZIP 归档。&quot;,
    &quot;对于未越狱设备的安装，.app 包必须使用有效的配置文件进行正确签名（或重新签名）。&quot;,
    &quot;确保架构（如 arm64）与目标 iOS 设备的 CPU 匹配。&quot;,
    &quot;此方法常用于将越狱应用从 Cydia 源转换为可侧载的 .ipa 文件。&quot;
  ]
}</pre>
</div>
