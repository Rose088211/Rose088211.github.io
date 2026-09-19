from html import escape, unescape
from pathlib import Path
import re

import mkdocs_gen_files


LEGACY_WRAPPER = re.compile(
    r"\s*<div\s+class=[\"']legacy-note[\"']\s*>\s*<pre>(.*?)</pre>\s*</div>\s*\Z",
    re.IGNORECASE | re.DOTALL,
)


def _display_content(content: str) -> str:
    wrapped = LEGACY_WRAPPER.fullmatch(content)
    if wrapped:
        content = wrapped.group(1)
    return unescape(content)


def main() -> None:
    docs_dir = Path("docs")
    for source in sorted(docs_dir.rglob("*.txt")):
        if "stylesheets" in source.parts:
            continue
        relative = source.relative_to(docs_dir)
        page = relative.with_suffix(".md")
        content = _display_content(source.read_text(encoding="utf-8"))
        title = source.stem.replace("-", " ").replace("_", " ").strip()
        with mkdocs_gen_files.open(page, "w") as generated:
            generated.write(f"# {title}\n\n")
            generated.write(f'<pre class="plain-text">{escape(content)}</pre>\n')
        mkdocs_gen_files.set_edit_path(page, source)


main()