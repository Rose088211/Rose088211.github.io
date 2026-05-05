//author: Rose0882
//time: 2026-05-05 15:18:21.252487

### How to compile & load

```sh
$ git clone https://github.com/oleavr/frida-agent-example.git
$ cd frida-agent-example/

# npm install --save-dev @types/frida-gum@<版本号>
# npm view @types/frida-gum versions 快速查看可用依赖
# @types/frida-gum 版本	对应的 Frida 工具版本（示例）
# 18.x.x	Frida 16.x (如 18.8.1 对应 16.7.1)
# 19.x.x	Frida 17.x (API变更较大)
# 16.x.x	Frida 12.x / 早期版本

$ npm install --save-dev @types/frida-gum@16.4.2

# 按 Ctrl+Shift+P → 输入 TypeScript: Restart TS server → 回车

$ frida -U -f com.example.android -l _agent.js
```

### Development workflow

To continuously recompile on change, keep this running in a terminal:

```sh
$ npm run watch
```

And use an editor like Visual Studio Code for code completion and instant
type-checking feedback.


#配置tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022","DOM"],          // 不再需要 DOM
    "module": "Node16",
    "strict": true,
    "noEmit": true,
    "types": ["frida-gum"]      // 添加这一行
  },
  "include": ["agent/**/*.ts"]
}

#配置agent/index.ts，正确导入Java提示
import Java from "frida-java-bridge";
import { log } from "./logger.js";

Enjoy !!!
