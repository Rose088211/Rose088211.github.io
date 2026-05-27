//referer：52pojie
//time: 2025-9-10 15:26

// frida -U -f 目标包名 -l allow_screenshot.js --no-pause
// frida -U -f "com.snapwork.IDBI" -l allow_screenshot.js -t 6e3
setTimeout(allow_screenshot, 6e3);
// setImmediate(allow_screenshot);
 
// 允许截屏 新增背景黑屏方案
function allow_screenshot() {
    Java.perform(function () {
        const FLAG_SECURE = 0x2000;
        const FLAG_DIM_BEHIND = 0x100;
        const FLAGS_TO_REMOVE = FLAG_SECURE | FLAG_DIM_BEHIND;
         
        var Window = Java.use('android.view.Window');
         
        // 优化addFlags处理
        Window.addFlags.implementation = function (flags) {
            console.log(`[*] 调用addFlags，原始flags: 0x${flags.toString(16)}`);
            console.log(`[*] 调用addFlags，原始flags: ${flags.toString(10)}`);
             
            const newFlags = flags & ~FLAGS_TO_REMOVE;
            if (newFlags !== flags) {
                console.log(`[BS] 已移除目标标志，新flags: 0x${newFlags.toString(16)}`);
                return this.addFlags(newFlags);
            }
             
            return this.addFlags(flags);
        };
         
        // 优化setFlags处理
        Window.setFlags.implementation = function (flags, mask) {
            console.log(`[*] 调用setFlags，原始flags: 0x${flags.toString(16)}, mask: 0x${mask.toString(16)}`);
            console.log(`[*] 调用setFlags，原始flags: ${flags.toString(10)}, mask: ${mask.toString(10)}`);
             
            // 计算新的flags和mask
            const newFlags = flags & ~FLAGS_TO_REMOVE;
            const newMask = mask & ~FLAGS_TO_REMOVE;
             
            if (newFlags !== flags || newMask !== mask) {
                console.warn(`[BS] 已移除目标标志，新flags: 0x${newFlags.toString(16)}, 新mask: 0x${newMask.toString(16)}`);
                return this.setFlags(newFlags, newMask);
            }
             
            return this.setFlags(flags, mask);
        };
    });   
}
