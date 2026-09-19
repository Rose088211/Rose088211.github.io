from pathlib import Path
import re


AUTO_START = "<!-- BEGIN AUTO-DOCS -->"
AUTO_END = "<!-- END AUTO-DOCS -->"

CATEGORY_NAMES = {
    "android": "Android",
    "ios": "iOS",
    "frida": "Frida",
    "native-debugging": "Native 调试",
    "environments": "环境与工具",
    "references": "参考资料",
    "ai": "AI",
    "other": "其他",
}

CATEGORY_ORDER = [
    "android",
    "ios",
    "frida",
    "native-debugging",
    "environments",
    "references",
    "ai",
]


def _filename_title(path: Path) -> str:
    """Return a stable display name when a note has no usable heading."""
    title = path.stem.replace("-", " ").replace("_", " ").strip()
    title = re.sub(r"\s+", " ", title).title()
    for source, replacement in {
        "Cli": "CLI",
        "Dexdump": "DEX Dump",
        "Gki": "GKI",
        "Ida": "IDA",
        "Ios": "iOS",
        "Ipa": "IPA",
        "Usb": "USB",
    }.items():
        title = re.sub(rf"\b{source}\b", replacement, title)
    return title or path.name


def _usable_heading(candidate: str) -> bool:
    """Reject code fragments and placeholder headings as map labels."""
    normalized = candidate.strip()
    if not normalized or normalized.casefold() in {"0", "role", "角色", "cli", "usage"}:
        return False
    if len(normalized) > 100 or normalized.count("=") > len(normalized) // 2:
        return False
    if normalized.startswith(("npm install ", "pip install ", "$ ")):
        return False
    return any(char.isalnum() or "\u4e00" <= char <= "\u9fff" for char in normalized)


def _title(path: Path) -> str:
    try:
        for line in path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line.startswith("# "):
                candidate = line[2:].strip()
                if _usable_heading(candidate):
                    return candidate
    except UnicodeDecodeError:
        pass
    return _filename_title(path)


def _documents(docs_dir: Path):
    result = []
    for path in docs_dir.rglob("*"):
        if not path.is_file() or path.suffix.lower() != ".txt":
            continue
        relative = path.relative_to(docs_dir)
        if "stylesheets" in relative.parts:
            continue
        category = relative.parts[0] if len(relative.parts) > 1 else "other"
        result.append((category, relative, _title(path)))
    return sorted(result, key=lambda item: (CATEGORY_ORDER.index(item[0]) if item[0] in CATEGORY_ORDER else 99, item[1].as_posix()))


def _known_paths(text: str, link_prefix: str) -> set[str]:
    known = set()
    for match in re.findall(r"\]\(([^)#]+\.txt)(?:#[^)]*)?\)", text):
        link = match.replace("\\", "/")
        if link_prefix == "docs/" and link.startswith("docs/"):
            link = link[5:]
        known.add(link)
    return known


def _basename_aliases(docs_dir: Path, known: set[str]) -> dict[str, str]:
    """Map stale manual links to a file's new location after it was moved."""
    by_name: dict[str, list[str]] = {}
    for path in docs_dir.rglob("*.txt"):
        relative = path.relative_to(docs_dir).as_posix()
        by_name.setdefault(Path(relative).name, []).append(relative)
    aliases = {}
    for link in known:
        if (docs_dir / link).exists():
            continue
        candidates = by_name.get(Path(link).name, [])
        if len(candidates) == 1:
            aliases[link] = candidates[0]
    return aliases


def _purpose(relative: str, category: str) -> str:
    parts = relative.replace("\\", "/").split("/")
    names = {
        "fundamentals": "基础知识",
        "hooking": "Hook 与注入",
        "root-and-modification": "Root 与设备修改",
        "device-development": "设备开发",
        "security": "安全分析",
        "jailbreak": "越狱工具",
        "injection": "注入与 Hook",
        "repackaging": "重打包",
        "basics": "基础知识",
        "commands": "命令与用法",
        "attach-and-injection": "注入与排障",
        "compatibility": "版本与兼容性",
        "build": "构建与编译",
        "detection-and-debugging": "检测与调试",
        "arm64": "ARM64 指令",
        "gdb": "GDB 调试",
        "ida": "IDA 分析",
        "jdwp": "JDWP 调试",
        "wsl2": "WSL2 环境",
        "ai": "AI 工具",
    }
    for part in parts[:-1]:
        if part in names:
            return names[part]
    return CATEGORY_NAMES.get(category, category.title())


def _link(value: str):
    match = re.search(r"\[([^]]+)\]\(([^)]+)\)", value)
    if not match:
        return None
    return match.group(1).strip(), match.group(2).strip()


def _page_link(location: str, link_prefix: str) -> str:
    normalized = location[5:] if link_prefix == "docs/" and location.startswith("docs/") else location
    return f"{link_prefix}{Path(normalized).with_suffix('.md').as_posix()}"


def _parse_manual(text: str, link_prefix: str):
    entries = []
    section = "其他"
    for line in text.splitlines():
        heading = re.match(r"^##\s+(.+?)\s*$", line)
        if heading:
            section = heading.group(1)
            continue
        if not line.startswith("|") and not line.lstrip().startswith("- ["):
            continue
        if line.startswith("|"):
            cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
            if len(cells) < 2 or cells[0] in {"目标", "脚本", "资源", "---"}:
                continue
            link_cell = cells[2] if len(cells) >= 4 else cells[1]
            parsed = _link(link_cell)
            if not parsed:
                continue
            target = cells[0]
            description = cells[3] if len(cells) >= 4 else parsed[0]
        else:
            parsed = _link(line)
            if not parsed:
                continue
            target = parsed[0]
            description = parsed[0]
        display, location = parsed
        normalized = location[5:] if link_prefix == "docs/" and location.startswith("docs/") else location
        category = normalized.split("/", 1)[0] if "/" in normalized else "other"
        purpose = _purpose(normalized, category)
        entries.append({
            "section": section,
            "target": target,
            "purpose": purpose,
            "location": location,
            "description": description or display,
        })
    return entries


def _render_manual(text: str, link_prefix: str) -> str:
    first_section = re.search(r"^##\s+", text, re.MULTILINE)
    preamble = text[:first_section.start()].rstrip() if first_section else text.rstrip()
    entries = _parse_manual(text, link_prefix)
    grouped = {}
    for entry in entries:
        grouped.setdefault(entry["section"], []).append(entry)
    lines = [preamble]
    for section, section_entries in grouped.items():
        lines.extend(["", f"## {section}", "", "| 目标 | 用途 | 文件位置 | 说明 |", "| --- | --- | --- | --- |"])
        for entry in section_entries:
            lines.append(
                f"| {entry['target']} | {entry['purpose']} | [{entry['location']}]({_page_link(entry['location'], link_prefix)}) | {entry['description']} |"
            )
    return "\n".join(lines).rstrip() + "\n"


def _section(docs_dir: Path, link_prefix: str = "", known_paths: set[str] | None = None) -> str:
    known_paths = known_paths or set()
    grouped = {}
    for category, relative, title in _documents(docs_dir):
        if relative.as_posix() in known_paths:
            continue
        grouped.setdefault(category, []).append((relative, title))

    if not grouped:
        return ""

    lines = [
        AUTO_START,
        "## 自动发现的文档",
        "",
        "> 本区块由 MkDocs 构建时自动生成。将 TXT 文件放入 `docs/` 后，重新构建或使用 `mkdocs serve` 即可同步。",
        "",
    ]
    categories = [*CATEGORY_ORDER, *sorted(set(grouped) - set(CATEGORY_ORDER))]
    for category in categories:
        if category not in grouped:
            continue
        lines.extend([f"### {CATEGORY_NAMES.get(category, category.title())}", "", "| 目标 | 用途 | 文件位置 | 说明 |", "| --- | --- | --- | --- |"])
        for relative, title in grouped[category]:
            link = f"{link_prefix}{relative.with_suffix('.md').as_posix()}"
            purpose = _purpose(relative.as_posix(), category)
            lines.append(f"| {title} | {purpose} | [{link}]({link}) | 自动发现 |")
        lines.append("")
    lines.append(AUTO_END)
    return "\n".join(lines).rstrip() + "\n"


def _replace(path: Path, generated: str) -> None:
    original = path.read_text(encoding="utf-8") if path.exists() else ""
    if AUTO_START in original and AUTO_END in original:
        before = original.split(AUTO_START, 1)[0].rstrip()
        after = original.split(AUTO_END, 1)[1].lstrip()
        if generated:
            updated = f"{before}\n\n{generated}"
            if after:
                updated += f"\n{after}"
        else:
            updated = before
            if after:
                updated += f"\n\n{after}"
    else:
        updated = original.rstrip() + "\n\n" + generated
    if updated != original:
        path.write_text(updated, encoding="utf-8", newline="\n")


def _sync_map(path: Path, docs_dir: Path, link_prefix: str) -> None:
    original = path.read_text(encoding="utf-8") if path.exists() else ""
    base = original.split(AUTO_START, 1)[0] if AUTO_START in original else original
    known_paths = _known_paths(base, link_prefix)
    aliases = _basename_aliases(docs_dir, known_paths)
    if aliases:
        for stale, current in aliases.items():
            stale_link = f"{link_prefix}{stale}" if link_prefix else stale
            current_link = f"{link_prefix}{current}" if link_prefix else current
            base = base.replace(f"({stale_link})", f"({current_link})")
            base = base.replace(f"[{stale_link}]", f"[{current_link}]")
        known_paths = _known_paths(base, link_prefix)
    manual = _render_manual(base, link_prefix)
    generated = _section(docs_dir, link_prefix, known_paths)
    if generated:
        manual += "\n" + generated
    if manual != original:
        path.write_text(manual, encoding="utf-8", newline="\n")


def on_pre_build(config):
    docs_dir = Path(config.docs_dir).resolve()
    _sync_map(docs_dir / "maps.md", docs_dir, "")
    root_maps = docs_dir.parent / "MAPS.md"
    if root_maps.exists():
        _sync_map(root_maps, docs_dir, "docs/")
