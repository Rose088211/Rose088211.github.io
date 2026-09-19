# Git Commit Convention

Language: [中文](index.md) | **English**

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Commit messages should use the following structure so that history remains clear and changelogs can be generated automatically.

## Commit message structure

```text
<type>(<scope>): <subject>

<summary> (optional)

<body> (optional)

<footer> (optional)
```

- **Header**: required; contains `type`, optional `scope`, and `subject`.
- **Body**: optional; explains the reason, implementation, and impact of the change.
- **Footer**: optional; references Issues or breaking changes.

## Type quick reference

| Type | Meaning | Use it for |
| :--- | :--- | :--- |
| `feat` | Feature | A new user-visible capability |
| `fix` | Bug fix | Correcting a defect |
| `docs` | Documentation | Documentation-only changes |
| `style` | Style | Formatting changes with no logic impact |
| `refactor` | Refactor | Code structure changes with the same behavior |
| `perf` | Performance | Performance improvements |
| `test` | Test | Adding or changing tests |
| `chore` | Chore | Build, dependency, or tooling changes |
| `ci` | Continuous integration | CI configuration changes |
| `build` | Build | Build system or external dependency changes |
| `revert` | Revert | Reverting an earlier commit |

## Copyable template

```text
# =============================================
# <type>(<scope>): <subject>
# =============================================
# Example: fix(android-patcher): correct loadLibrary injection
# =============================================

# -------- Summary (optional) --------
# Summarize the main change in one sentence.

# -------- Details (optional) --------
# Explain what changed, why it changed, and how it was fixed.

# -------- Changed Files (optional) --------
# List the important files involved in the change.

# -------- Footer (optional) --------
# Closes #123
# BREAKING CHANGE: ...
```

## Complete example

```text
fix(android-patcher): observer init error handling and sucompat error overwrite

Summary
Fix ksu_observer_init() silently ignoring watch_one_dir() failure
Fix escape_with_root_profile() error overwritten by execveat result

Details
1. ksu_observer_init returns an error instead of always returning 0.
2. escape_with_root_profile keeps its error separate from the execveat result.

Changed files
kernel/manager/pkg_observer.c
kernel/feature/sucompat.c

Closes #3597
```

## Configure Git

Save the template to `~/.gitcommit_template.txt`, then configure Git:

```bash
git config --global commit.template ~/.gitcommit_template.txt
```

Run `git commit` without `-m` to open the template in your editor.

## Style rules

- Keep the subject concise, lowercase, and without a trailing period; preferably under 50 characters.
- Keep body lines under 72 characters and use the present tense.
- Use `Closes` or `Fixes` followed by the Issue number in the footer.
- Keep commits atomic: one commit should represent one logical change.

## Commit identity and privacy

This repository uses the following noreply identity:

```bash
git config user.name "Rose088211"
git config user.email "88967498+Rose088211@users.noreply.github.com"
```

Do not expose a personal email address or add an AI tool as a co-author. Do not add `Co-Authored-By:` lines for AI tools.
