#!/usr/bin/env python3
"""Reject Markdown headings that contain mathematical markup or inline code.

MathJax runs after Markdown has created headings, anchors and navigation labels.
Keeping headings as plain language avoids broken rendering and unstable anchors.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED_DIRS = {".git", "_site", "node_modules", ".venv", "venv"}
HEADING_RE = re.compile(r"^ {0,3}(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$")
FENCE_RE = re.compile(r"^ {0,3}(`{3,}|~{3,})")
LATEX_COMMAND_RE = re.compile(
    r"\\(?:begin|end|frac|sum|prod|int|partial|nabla|sqrt|left|right|"
    r"theta|alpha|beta|gamma|delta|sigma|eta|mu|lambda|hat|bar|vec|"
    r"mathbf|mathbb|mathrm)\b"
)
UNICODE_MATH = set("∂∑∏∫√≈≠≤≥±×÷∇∞⊙⊕∈∉⊂⊆∪∩")


def markdown_files() -> list[Path]:
    files: list[Path] = []
    for path in ROOT.rglob("*.md"):
        if any(part in EXCLUDED_DIRS for part in path.parts):
            continue
        files.append(path)
    return sorted(files)


def heading_has_math(text: str) -> bool:
    if "`" in text:
        return True
    if "$" in text or "\\(" in text or "\\)" in text or "\\[" in text or "\\]" in text:
        return True
    if LATEX_COMMAND_RE.search(text):
        return True
    return any(symbol in text for symbol in UNICODE_MATH)


def violations(path: Path) -> list[tuple[int, str]]:
    found: list[tuple[int, str]] = []
    in_fence = False
    fence_char = ""
    fence_length = 0

    for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
        fence_match = FENCE_RE.match(line)
        if fence_match:
            token = fence_match.group(1)
            if not in_fence:
                in_fence = True
                fence_char = token[0]
                fence_length = len(token)
            elif token[0] == fence_char and len(token) >= fence_length:
                in_fence = False
            continue

        if in_fence:
            continue

        heading_match = HEADING_RE.match(line)
        if not heading_match:
            continue

        heading = heading_match.group(2).strip()
        if heading_has_math(heading):
            found.append((line_number, heading))

    return found


def main() -> int:
    all_violations: list[tuple[Path, int, str]] = []
    for path in markdown_files():
        for line_number, heading in violations(path):
            all_violations.append((path.relative_to(ROOT), line_number, heading))

    if not all_violations:
        print("Markdown heading check passed: headings contain plain language only.")
        return 0

    print("Markdown heading check failed.", file=sys.stderr)
    print(
        "Move equations, LaTeX and inline code out of headings and place them immediately below the heading.",
        file=sys.stderr,
    )
    for path, line_number, heading in all_violations:
        print(f"  {path}:{line_number}: {heading}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
