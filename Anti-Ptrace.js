/**
 * 全面反 ptrace 调试检测的 Frida 脚本
 * 适用于 Linux / Android 环境
 * 绕过以下检测方式：
 * 1. ptrace(PTRACE_TRACEME) 调用
 * 2. 通过 fopen/fgets 或 open/read 读取 /proc/self/status 中的 TracerPid
 * 3. 其他潜在的直接读取方式
 */

// ==================== 全局状态 ====================
// 存储 /proc/self/status 对应的 FILE* 指针 (fopen)
var statusFilePtrs = [];
// 存储 /proc/self/status 对应的文件描述符 (open/openat)
var statusFds = new Set();

// ==================== 1. Hook ptrace ====================
var ptracePtr = Module.findExportByName(null, "ptrace");
if (ptracePtr) {
    Interceptor.attach(ptracePtr, {
        onEnter: function (args) {
            this.request = args[0].toInt32();
        },
        onLeave: function (retval) {
            // PTRACE_TRACEME = 0
            if (this.request === 0) {
                console.log("[*] ptrace(PTRACE_TRACEME) called -> overriding return value to 0");
                retval.replace(0);
            }
        }
    });
    console.log("[+] ptrace hooked");
} else {
    console.warn("[!] ptrace not found");
}

// ==================== 2. Hook open/openat 记录 /proc/self/status 的 fd ====================
function hookOpen() {
    var openPtr = Module.findExportByName(null, "open");
    if (openPtr) {
        Interceptor.attach(openPtr, {
            onEnter: function (args) {
                this.path = Memory.readCString(args[0]);
                this.flags = args[1].toInt32();
            },
            onLeave: function (retval) {
                var fd = retval.toInt32();
                if (fd >= 0 && this.path === "/proc/self/status") {
                    statusFds.add(fd);
                    console.log("[+] open: /proc/self/status opened, fd = " + fd);
                }
            }
        });
        console.log("[+] open hooked");
    } else {
        console.warn("[!] open not found");
    }

    var openatPtr = Module.findExportByName(null, "openat");
    if (openatPtr) {
        Interceptor.attach(openatPtr, {
            onEnter: function (args) {
                this.dirfd = args[0].toInt32();
                this.path = Memory.readCString(args[1]);
                this.flags = args[2].toInt32();
            },
            onLeave: function (retval) {
                var fd = retval.toInt32();
                if (fd >= 0 && this.path === "/proc/self/status") {
                    statusFds.add(fd);
                    console.log("[+] openat: /proc/self/status opened, fd = " + fd);
                }
            }
        });
        console.log("[+] openat hooked");
    } else {
        console.warn("[!] openat not found");
    }
}
hookOpen();

// ==================== 3. Hook read 修改缓冲区中的 TracerPid ====================
var readPtr = Module.findExportByName(null, "read");
if (readPtr) {
    Interceptor.attach(readPtr, {
        onEnter: function (args) {
            this.fd = args[0].toInt32();
            this.buf = args[1];
            this.count = args[2].toInt32();
        },
        onLeave: function (retval) {
            var bytesRead = retval.toInt32();
            if (bytesRead <= 0) return;

            // 仅当 fd 是 /proc/self/status 时才处理
            if (statusFds.has(this.fd)) {
                // 读取缓冲区内容
                var data = Memory.readByteArray(this.buf, bytesRead);
                var str = bytesToUtf8String(data);
                if (str.indexOf("TracerPid:") !== -1) {
                    // 替换 TracerPid 后的数字为 0
                    var modifiedStr = str.replace(/TracerPid:\s*\d+/g, "TracerPid:\t0");
                    Memory.writeUtf8String(this.buf, modifiedStr);
                    console.log("[*] read: modified TracerPid in buffer (fd=" + this.fd + ")");
                }
            }
        }
    });
    console.log("[+] read hooked");
} else {
    console.warn("[!] read not found");
}

// ==================== 4. Hook fopen 记录 /proc/self/status 的 FILE* ====================
var fopenPtr = Module.findExportByName("libc.so", "fopen");
if (fopenPtr) {
    Interceptor.attach(fopenPtr, {
        onEnter: function (args) {
            this.path = Memory.readCString(args[0]);
            this.mode = Memory.readCString(args[1]);
        },
        onLeave: function (retval) {
            if (this.path === "/proc/self/status") {
                statusFilePtrs.push(retval);
                console.log("[+] fopen: /proc/self/status opened, FILE* = " + retval);
            }
        }
    });
    console.log("[+] fopen hooked");
} else {
    console.warn("[!] fopen not found");
}

// ==================== 5. Hook fgets 修改 TracerPid 行 ====================
var fgetsPtr = Module.findExportByName("libc.so", "fgets");
if (fgetsPtr) {
    Interceptor.attach(fgetsPtr, {
        onEnter: function (args) {
            this.buf = args[0];
            this.size = args[1].toInt32();
            this.stream = args[2];
        },
        onLeave: function (retval) {
            if (retval !== 0 && statusFilePtrs.indexOf(this.stream) !== -1) {
                var line = Memory.readCString(this.buf);
                if (line && line.indexOf("TracerPid:") !== -1) {
                    var modifiedLine = line.replace(/TracerPid:\s*\d+/, "TracerPid:\t0");
                    Memory.writeUtf8String(this.buf, modifiedLine);
                    console.log("[*] fgets: modified TracerPid line: " + modifiedLine.trim());
                }
            }
        }
    });
    console.log("[+] fgets hooked");
} else {
    console.warn("[!] fgets not found");
}

// 辅助函数：将字节数组转换为 UTF-8 字符串（用于 read 缓冲区）
function bytesToUtf8String(byteArray) {
    var str = "";
    for (var i = 0; i < byteArray.length; i++) {
        if (byteArray[i] === 0) break; // 遇到空字符停止
        str += String.fromCharCode(byteArray[i]);
    }
    return str;
}
