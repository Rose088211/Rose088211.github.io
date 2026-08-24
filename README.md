```markdown
# Git Commit 提交规范（基于 Conventional Commits）

本项目采用约定式提交（Conventional Commits）规范，所有提交信息必须遵循以下格式，以确保历史清晰、便于自动化生成 Changelog 和版本管理。

---

## 提交信息结构

```text
<type>(<scope>): <subject>

<summary>（可选，短摘要）

<详细描述>（可选，可包含多段）

<footer>（可选，关闭 Issue 或标记破坏性变更）
```

- **Header（第一行）**：必填，包括 `type`、`scope`（可省略）和 `subject`。
- **Body（正文）**：可选，用于详细说明修改的原因、方式和影响。
- **Footer（页脚）**：可选，用于关联 Issue 或标记不兼容变更。

---

## Type 类型速查

| Type | 含义 | 使用场景 |
| :--- | :--- | :--- |
| `feat` | 新功能 | 新增用户可见功能 |
| `fix` | 修复 Bug | 修复缺陷 |
| `docs` | 文档 | 仅文档变更 |
| `style` | 格式 | 空格、分号等，不影响逻辑 |
| `refactor` | 重构 | 代码结构优化，不改变功能 |
| `perf` | 性能 | 性能优化 |
| `test` | 测试 | 增删改测试 |
| `chore` | 杂务 | 构建、依赖、工具等 |
| `ci` | 持续集成 | CI 配置变更 |
| `build` | 构建 | 构建系统或外部依赖变更 |
| `revert` | 回滚 | 撤销之前的提交 |

---

## 模板（可直接复制使用）

```text
# =============================================
# <type>(<scope>): <subject>
# =============================================
# 示例: fix(android-patcher): correct loadLibrary injection
# =============================================

# -------- Summary（摘要，可选） --------
# 用一句话概括本次修改的主要内容。

# -------- Details（详细描述，可选） --------
# 分点或分段说明具体修改了哪些问题、如何解决。

# -------- Changed Files（变更文件列表，可选） --------
# 列出涉及的关键文件，便于审阅。

# -------- Footer（页脚，可选） --------
# 关闭 Issue: Closes #123
# 破坏性变更: BREAKING CHANGE: ...
```

---

## 完整示例（基于你提供的实际提交）

以下是一个符合规范的完整提交信息，包含了 **Summary**、**Details** 和 **Changed files**，可作为日常提交的参考模板。

```text
fix(android-patcher): observer init error handling and sucompat error overwrite

Summary
Fix ksu_observer_init() silently ignoring watch_one_dir() failure
Fix escape_with_root_profile() error overwritten by execveat result

Details
1. ksu_observer_init returns error instead of always 0
   ksu_observer_init() called watch_one_dir() and stored the return value in ret,
   but unconditionally returned 0 regardless of the result. Callers in init.c and
   boot_event.c had no way to detect the failure. Also fixes fsnotify_group leak
   on the error path.

2. escape_with_root_profile error overwritten by execveat result
   In ksu_handle_execve_sucompat(), the return value of escape_with_root_profile()
   was stored in ret, which was immediately overwritten by the execveat result.
   A scoped local variable now keeps the profile error separate, ensuring sulog
   captures the correct status.

Changed files
kernel/manager/pkg_observer.c
kernel/feature/sucompat.c

Closes #3597
```

> **说明**：
> - `fix` 表示修复 Bug，`scope` 为 `android-patcher`（可换成你项目的实际模块）。
> - 第一行为 `type(scope): subject`，简洁明了。
> - `Summary` 作为短摘要，`Details` 详细分点说明，`Changed files` 列出关键文件。
> - `Closes #3597` 放在 footer，自动关联 Issue。

---

## 配置 Git 使用该模板（可选）

1. 将上面的“模板”部分（包含占位符）保存为 `~/.gitcommit_template.txt`。
2. 设置 Git 全局使用该模板：
   ```bash
   git config --global commit.template ~/.gitcommit_template.txt
   ```
3. 之后执行 `git commit`（不加 `-m`）时，编辑器会加载模板，你只需按提示填写。

---

## 注意事项

- **Subject** 首字母小写，结尾不加句号，尽量不超过 50 字符。
- **Body** 每行不超过 72 字符，使用一般现在时（如 `fix`, `add`, `change`）。
- **Footer** 中关闭 Issue 请使用 `Closes` 或 `Fixes`，后跟编号。
- 保持每次提交的原子性——一个提交只做一件事。

---

## 提交身份与隐私配置（本项目已执行）

除提交信息格式外，本项目对**提交身份**有以下硬性要求：

### 本地 Git 身份

本仓库的 git 身份固定为 noreply 地址（仓库级配置，不影响机器上的其他仓库）：

```bash
git config user.name "Rose088211"
git config user.email "88967498+Rose088211@users.noreply.github.com"
```

所有提交的 **Author 和 Committer 都必须是上述身份**，禁止使用真实姓名、公司邮箱或 git 按主机名自动推断的身份。

### GitHub 隐私保险

GitHub 账号已开启以下两项设置（Settings → Emails），作为最后一道防线：

| 设置 | 作用 |
| :--- | :--- |
| Keep my email addresses private | 网页端操作产生的提交一律使用 noreply 邮箱，隐藏真实邮箱 |
| Block command line pushes that expose my email | 推送的提交若含账号绑定的真实邮箱，直接拒收 |

> 第二项需先勾选第一项后才会出现。

### 贡献者署名

- 按「原子性」规范拆分出的每个提交，其作者/提交者均为 `Rose088211 <88967498+Rose088211@users.noreply.github.com>`。
- **不得将 Claude Code 或其他 AI 工具列为贡献者**：提交信息末尾不要附加 `Co-Authored-By:` 之类的 AI 署名尾注。

---

*本规范参考 [Conventional Commits](https://www.conventionalcommits.org/)，并结合实际项目示例定制。*
