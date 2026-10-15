<div class="legacy-note">
<pre>//author: Rose088211
//time: 2026-08-27 18:08:13.773055

# A64 指令集笔记

> 改写自《Armv8/armv9 架构入门指南》第 6 章「A64 指令集」，补充了每条指令的英文全称和字面含义。


---

## 0. 为什么有人要写/读汇编？
应用层大多不用汇编，但四种场景离不开它：

1. **高度优化的代码**（编译器开发、极致性能调优）
2. **操作系统底层**（开机启动代码、设备驱动）
3. **使用 C 语言表达不了的低级功能**
4. **调试**：单步调试 C 程序时，屏幕上显示的就是汇编——所以"看懂汇编"是调试硬功夫

本笔记的目标就是第 4 条：读懂编译器生成的代码。

---

## 1. 看懂指令"构词法"

A64 的助记符几乎全是英文缩写，掌握三条规律，生词也能猜出七八分：

#
### 1.2 S / U 前缀

- `S` 开头 = **Signed**（有符号）
- `U` 开头 = **Unsigned**（无符号）

例：

`SDIV` vs `UDIV`、`SMULL` vs `UMULL`、`SXTB` vs `UXTB`。

### 1.3 S 后缀 = 设标志

- `ADD` 只是加；

- `ADDS` 加完还把结果特征写进标志位。

- `SUBS`、`ANDS`。

例：


ldrb  w0, [x1]     ; 读 1 字节，高位补 0（零扩展 → 类似 U）


ldrsb w0, [x1]     ; 读 1 字节，高位补符号位（符号扩展 → 类似 S）

### 1.4 拆词示范

- 生词 `LDRSB`


- 拆开 → `LDR`（Load，加载）+ `S`（Signed，有符号）+ `B`（Byte，字节）→ “加载一个字节并按符号扩展”。
- 生词`BLR`
- `BLR`是 Branch with Link to Register（带链接的寄存器间接跳转）	
Register，目标地址在寄存器里


## 2. 寄存器名字的含义 

| 名字 | 全称 | 含义 |
|---|---|---|
| X0~X30 | eXtended | 31 个 64 位通用寄存器 |
| W0~W30 | Word | 同一批寄存器的低 32 位视图（写 W 自动清高 32 位） |
| XZR / WZR | Zero | 恒零寄存器：读永远是 0，写入等于丢弃 |
| SP | Stack Pointer | 栈指针 |
| X30 = LR | Link Register | 链接寄存器，存函数的返回地址 |
| X29 = FP | Frame Pointer | 帧指针 |
| PC | Program Counter | 程序计数器（A64 里不能当普通寄存器读写） |
| NZCV | Negative/Zero/Carry/oVerflow | 四个条件标志位（见 §5） |

---

## 3. 数据处理指令 
### 3.0 总语法模板

```
指令 目标Rd, 源Rn, 第二操作数        // 目标永远在最前！
```

- 第二操作数可以是：另一个寄存器、移位过的寄存器、`#` 立即数。


- 同一个助记符有多种编码（如 `ADD W0,W1,W2` 与 `ADD X0,X1,#42`），汇编器根据寄存器名自动选择，人只记一个词。

### 3.1 运算指令

| 助记符 | 英文全称 | 中文 | 作用 |
|---|---|---|---|
| `ADD` | Add | 加 | `Rd = Rn + 操作数2` |
| `SUB` | Subtract | 减 | `Rd = Rn − 操作数2` |
| `ADC` | Add with Carry | 带进位加 | `Rd = Rn + 操作数2 + C标志` |
| `SBC` | Subtract with Carry | 带借位减 | `Rd = Rn − 操作数2 − 借位`（借位即 C 的反面） |
| `NEG` | Negate | 取负 | `Rd = 0 − Rm`，就是 SUB 的马甲 |



### 3.2 逻辑运算指令`

| 助记符 | 英文全称 | 中文 | 作用 |
|---|---|---|---|
| `AND` | bitwise AND | 按位与 | 两边都是 1 才得 1 |
| `ORR` | bitwise OR | 按位或 | 有 1 就得 1。注意：是 ORR，不是 OR！ |
| `EOR` | Exclusive OR | 异或 | 不同得 1。注意：ARM 叫 EOR，不叫 XOR！ |
| `BIC` | Bit Clear | 位清除 | `Rd = Rn AND (~操作数2)`：把指定位清零 |
| `ORN` | OR NOT | 或反 | 先把第二个数取反再 OR |
| `EON` | Exclusive OR NOT | 异或反 | 先取反再异或 |
| `MOV` | Move | 传送 | 复制值 |
| `MVN` | Move Not | 取反传送 | `Rd = ~Rm`，按位取反后再搬 |


### 3.3 比较指令 （不存结果，只留标志）

| 助记符 | 英文全称 | 中文 | 本质 |
|---|---|---|---|
| `CMP` | Compare | 比较 | 偷偷做减法 `Rn−操作数2`，**扔掉结果只设标志** |
| `CMN` | Compare Negative | 负数比较（加法比较） | 偷偷做加法 `Rn+操作数2` 再设标志 |
| `TST` | Test | 测试 | 偷偷做 AND，用来测"某几位是否全 0" |

- cmp 计算减法但扔掉答案，只在 CPU 里留下 N/Z/C/V 四个痕迹，供后面的 `b.cond` 查看。

### 3.4 偏移指令 
| 助记符 | 英文全称 | 中文 | 直观理解 |
|---|---|---|---|
| `LSL` | Logical Shift Left | 逻辑左移 | ×2ⁿ，右边补 0 |
| `LSR` | Logical Shift Right | 逻辑右移 | ÷2ⁿ，左边补 0（不看符号） |
| `ASR` | Arithmetic Shift Right | 算术右移 | ÷2ⁿ，左边补符号位（负数除法用这个！） |
| `ROR` | Rotate Right | 循环右移 | 右边转出去的位绕回左边，像旋转门 |




### 3.5 乘法和除法 
| 助记符 | 英文全称 | 中文 | 作用 |
|---|---|---|---|
| `MUL` | Multiply | 乘 | `Rd = Rn × Rm`（高位丢弃） |
| `MADD` | Multiply-Add | 乘加 | `Rd = Rn × Rm + Ra`，一条完成乘加 |
| `MSUB` | Multiply-Subtract | 乘减 | `Rd = Ra − Rn × Rm` |
| `MNEG` | Multiply-Negate | 乘负 | `Rd = −(Rn × Rm)` |
| `SMULL` | Signed Multiply Long | 有符号长乘 | **32×32 → 完整64位结果**（Long=变宽！） |
| `UMULL` | Unsigned Multiply Long | 无符号长乘 | 同上，无符号 |
| `UDIV` | Unsigned Divide | 无符号除 | 商向零截断 |
| `SDIV` | Signed Divide | 有符号除 | 同上，区分符号 |


### 3.6 扩展指令（窄数据变大）

| 助记符 | 英文全称 | 从哪扩到哪 | 空位补什么 |
|---|---|---|---|
| `SXTB` | Sign eXtend Byte | 8位 → 32/64位 | 补**符号位** |
| `SXTH` | Sign eXtend Halfword | 16位 → 32/64位 | 补符号 |
| `SXTW` | Sign eXtend Word | 32位 → 64位 | 补符号 |
| `UXTB` | Unsigned eXtend Byte | 8位 → 32/64位 | 补 **0** |
| `UXTH` | Unsigned eXtend Halfword | 16位 → 32/64位 | 补 0 |


### 3.7 位域与花式位操作
| 助记符 | 英文全称 | 作用 |
|---|---|---|
| `BFI` | Bit Field Insert | 把一段位插入到目标寄存器的指定位置 |
| `UBFX`/`SBFX` | (Un)signed Bit Field eXtract | 抠出指定的一段位（有/无符号解释） |
| `CLZ` | Count Leading Zeros | 数前导零：最高位1前面有几个0 |
| `RBIT` | Reverse BITs | 全部位倒序排列 |
| `REV` | Reverse byte order | 整个寄存器字节序反转（大小端转换神器） |
| `REV16`/`REV32` | — | 每 16/32 位一组分别反转字节序 |

这些在驱动、协议解析、加密代码里常见，读到时按全称理解即可。

### 3.8 条件数据处理指令 

| 助记符 | 英文全称 | 作用 |
|---|---|---|
| `CSEL` | Conditional SELect | cond 成立选第一个源，否则选第二个源 |
| `CSINC` | Cond. Select INCrement | 成立取 A，否则取 **B+1** |
| `CSINV` | Cond. Select INVert | 成立取 A，否则取 **~B** |
| `CSNEG` | Cond. Select NEGate | 成立取 A，否则取 **−B** |
| `CSET` | Conditional SET | 成立置 1，否则置 0（布尔化） |
| `CSETM` | Conditional SET Mask | 成立置 −1，否则置 0（全1掩码） |

C 代码：

```c
if (i == 0) 
r = r + 2;
else        
r = r - 1;
```

编译器可能生成：

```armasm
CMP  W0, #0           // 比较 i 和 0，设标志
SUB  W2, W1, #1       // 先算好 r-1 放 W2
ADD  W1, W1, #2       // 再算好 r+2 放 W1
CSEL W1, W1, W2, EQ   // i==0 成立选 W1(r+2)，否则选 W2(r-1)
```

套路总结：**两个分支都先算出来，最后一条 CSEL 挑答案**——全程无跳转，流水线不被打断。看到"算了两个结果 + csel 收尾"，源代码多半是个 if-else。

---

## 4. 内存访问指令 

┌─────────────────────────────────────┐
│  代码区 (.text)                     │  ← 最底下（低地址）
│  "说明书"：程序怎么跑，全写在这里     │
├─────────────────────────────────────┤
│  数据区 (.data / .bss)              │
│  "储物柜"：全局变量、静态变量放这里   │
├─────────────────────────────────────┤
│  堆 (Heap)                          │  ← 从下往上长 🔼
│  "自助仓库"：你随时申请(malloc)随时还 │
├─────────────────────────────────────┤
│  （中间空着，堆和栈相对生长）         │
├─────────────────────────────────────┤
│  栈 (Stack)                         │  ← 从上往下长 🔽
│  "叠盘子"：函数调用就叠一层，返回就抽 │
├─────────────────────────────────────┤
│  内核区 (Kernel)                    │  ← 最顶上（高地址）
│  "机房"：操作系统住的地方，你进不去   │
└─────────────────────────────────────┘

- 核心原则：ARM 是加载/存储架构（load/store architecture）——所有运算只能在寄存器之间进行。**
-  改内存里的数必须三步：`ldr` 搬进来 → 寄存器里算 → `str` 搬回去。

- 方括号 `[ ]` = 解引用（以里面的值为地址去碰内存）[x8] -> x8 里存的是一个内存地址，去那个地址读数据。

### 4.1 加载家族全称表 

- `LDR` = **LoaD Register**（加载到寄存器）

- `STR` = **STore Register**（从寄存器存出）

（中间字母 =占位大小，有无 S = 符号扩展与否）：

| 助记符 | 英文全称 | 读多大 | 高位填什么 |
|---|---|---|---|
| `LDRB` | Load Register Byte | 1 字节 | 补 0 |
| `LDRSB` | Load Register Signed Byte | 1 字节 | 补**符号** |
| `LDRH` | Load Register Halfword | 2 字节 | 补 0 |
| `LDRSH` | Load Register Signed Halfword | 2 字节 | 补符号 |
| `LDRSW` | Load Register Signed Word | 4 字节 | 补符号（装入 X） |
| `STRB` | Store Register Byte | 存最低 1 字节 | — |
| `STRH` | Store Register Halfword | 存最低 2 字节 | — |


### 4.2 三种寻址模式
**① 偏移模式（Offset）**：基址+偏移算地址，**基址本身不变**。

```armasm
LDR W3, [X0]               // 地址=X0            → a[0]
LDR X2, [X0, #8]           // 地址=X0+8
LDR X4, [X0, X3, LSL #3]   // 地址=X0+X3*8       → arr[i]
STR W3, [X0, W2, SXTW, #2] // 偏移可以是符号扩展过的32位下标（int数组公式）
```


**② 索引模式（Indexing）**：访存的同时**顺路更新基址寄存器**，两个方向：

```armasm
LDR X0, [X1, #8]!    // 前索引 Pre-index：先把 X1+=8，再用新地址取数（! = 回写）
LDR X0, [X1], #8     // 后索引 Post-index：先用旧地址取数，然后 X1+=8
```





**③ PC 相对寻址
### 4.3 （LDR/STR）成对搬运 LDP / STP
| 助记符 | 英文全称 | 作用 |
|---|---|---|
| `LDP` | Load Pair | 一次读两格相邻内存进两个寄存器 |
| `STP` | Store Pair | 一次把两个寄存器写进相邻两格内存 |




### 4.4 其余访存指令 

| 助记符 | 英文全称 | 一句话 |
|---|---|---|
| `PRFM` | PReFetch Memory | 提示缓存："这地址马上要用，先搬进来" |
| `LDNP`/`STNP` | Load/Store Pair Non-temporal | 成对读写+"不值得缓存"提示（流式大块数据） |
| `LDTR`/`STTR` | Load/Store unprivileged | 内核态假装用户态权限去访存 |
| `LDAR`/`STLR` | Load-Acquire / Store-Release | 带"获取/释放"语义的单边屏障 |
| `DMB` | Data Memory Barrier | 数据内存屏障：之前的访存全部全局可见后才准继续 |
| `DSB` | Data Synchronization Barrier | 更强：连缓存/TLB维护也要等完 |
| `ISB` | Instruction Synchronization Barrier | 清空流水线重新取指 |
| `LDXR`/`STXR` | Load/Store eXclusive Register | 独占访问对：没人抢则写入成功——自旋锁的积木 |
| `CLREX` | CLear EXclusive | 取消独占标记 |


## 5. 流控指令 

| 助记符 | 英文全称 | 作用 | 备注 |
|---|---|---|---|
| `B` | Branch | 无条件跳转 | 射程 ±128MB |
| `B.cond` | Branch on Condition | 条件成立才跳 | 射程 ±1MB |
| `BL` | Branch with Link | 跳过去并把返回地址存入 X30(LR) | 函数调用的"去" |
| `BR Xn` | Branch to Register | 跳到寄存器里的地址 | 绝对跳转（switch表/虚函数） |
| `BLR Xn` | Branch with Link to Register | BR + 返回地址入 X30 | 调函数指针 |
| `RET` | RETurn (from subroutine) | 返回，默认跳回 X30 | 可写 `RET Xn` |
| `CBZ` | Compare & Branch if Zero | 为 0 则跳 | 不碰标志位 |
| `CBNZ` | Compare & Branch if Non-Zero | 非 0 则跳 | 不碰标志位 |
| `TBZ` | Test Bit & Branch if Zero | 第 bit 位为 0 则跳 | 不碰标志位 |
| `TBNZ` | Test Bit & Branch if Non-Zero | 第 bit 位为 1 则跳 | 不碰标志位 |

要点：


| 含义 | 有符号 | 全称 | 无符号 | 全称 |
|---|---|---|---|---|
| 相等 | `EQ` | EQual | `EQ` | — |
| 不等 | `NE` | Not Equal | `NE` | — |
| < | `LT` | Less Than | `LO` | LOwer |
| ≤ | `LE` | Less or Equal | `LS` | Lower or Same |
| > | `GT` | Greater Than | `HI` | HIgher |
| ≥ | `GE` | Greater or Equal | `HS` | Higher or Same（又写作 CS） |
| 负/非负 | `MI`/`PL` | MInus / PLus | — | — |

---

## 6. 系统控制和其他指令 
### 异常处理（用户程序 → 内核的门铃）

| 助记符 | 英文全称 | 作用 |
|---|---|---|
| `SVC` | Supervisor Call | 用户程序主动陷入内核（**系统调用就是它**） |
| `HVC` | Hypervisor Call | 内核 → 虚拟机监控器(EL2) |
| `SMC` | Secure Monitor Call | 进入安全监控器(EL3)，TrustZone 世界 |
| `ERET` | Exception RETurn | 异常返回：恢复状态并跳回 ELR_ELn 存的地址 |

层级链：**应用 --SVC--> 内核(EL1) --HVC--> 虚拟化管理(EL2) --SMC--> 安全固件(EL3)**。Linux 上 `printf` 最终落在一条 `svc` 上。

### 读写系统寄存器

| 助记符 | 含义 | 方向 |
|---|---|---|
| `MRS` | Move System register → 普通寄存器 | 读系统状态 |
| `MSR` | Move 普通寄存器 → System register | 配置系统状态 |

```armasm
MRS X4, ELR_EL1        // 读异常返回地址寄存器
MSR SPSR_EL1, X0       // 写保存的程序状态寄存器
```

普通 mov 够不着系统寄存器，必须走这一对。

### 调试与提示指令

| 助记符 | 英文全称 | 作用 |
|---|---|---|
| `BRK` | BReaKpoint | 断点指令（调试器下断点就是把原指令换成它） |
| `HLT` | HaLT | 停机等外部调试硬件 |
| `NOP` | No OPeration | 空转一格，用于占位/对齐 |
| `WFI` | Wait For Interrupt | 睡眠等中断（OS 空闲省电就靠它） |
| `WFE` | Wait For Event | 等事件 |
| `SEV`/`SEVL` | Send Event (Local) | 发事件叫醒别人 |
| `YIELD` | — | 提示调度器：本线程可让位 |

### NEON / 浮点 / 加密

- **NEON**：SIMD 向量指令——一条指令同时算一排数据（如 8 个 16 位加法并行），图像音频矩阵提速神器；A64 新增双精度支持。
- **浮点**：A64 浮点比较**直接设置 NZCV**（不用搬运）；`FCSEL` 等有浮点条件版；整数↔浮点转换可直接作用于整数寄存器。
- **加密扩展**：硬件级 `AES` 加解密与 SHA1/SHA256 哈希指令，TLS 握手快有它一份功。

见到 `v0.8h`（NEON 寄存器）、`fadd`（float add）、`aesenc` 知道是谁家的即可。


---

*来源：armv8-doc.readthedocs.io《Armv8/armv9 架构入门指南》重新编排并补充全称注解。*
