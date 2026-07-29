# Project Memory and Authoring Rules

This file records persistent rules for humans and coding agents working on this repository. Treat these as project constraints, not optional style suggestions.

## Mathematical headings

**Never place equations, LaTeX, variable notation or inline code inside Markdown headings.**

Markdown headings are used to generate anchors, navigation labels and the reader table of contents before MathJax finishes typesetting. Mathematical markup in a heading therefore produces unreliable rendering, unstable anchors and poor navigation.

Use a plain-language heading, followed by the equation in the body.

Bad:

```markdown
## Gradient \(\partial E / \partial w\)
```

Good:

```markdown
## Weight gradient

\[
\frac{\partial E}{\partial w}
\]
```

This rule applies to all heading levels, including the page title.

## Mathematical and visual content

- Use MathJax/LaTeX for equations and derivations.
- Use SVG for computation graphs, architecture, geometry and relationships where position or direction carries meaning.
- Reserve dark code blocks for actual code, terminal commands and indentation-sensitive pseudocode.
- Use tables for parameter collections and compact numerical inputs.
- Keep Markdown files as the canonical educational source; the site should render them rather than duplicate their content.

## Validation

Run:

```bash
python3 scripts/lint_markdown_headings.py
```

The GitHub Pages workflow runs the same check and must fail when a heading contains mathematical markup or inline code.
