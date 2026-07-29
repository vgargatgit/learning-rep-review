# Mathematical and Visual Rendering Guidelines

This project uses several visual forms, but each form should be chosen according to what the reader needs to understand, copy, search and revisit.

## Non-negotiable heading rule

**Markdown headings must contain plain language only. Never place equations, LaTeX delimiters, mathematical symbols or inline code in a heading.**

The site constructs heading anchors, navigation labels and the table of contents before MathJax finishes typesetting. Mathematical markup inside a heading therefore causes unreliable rendering, unstable links and inconsistent navigation.

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

When an equation names the section, choose a concise conceptual heading and place the exact equation immediately below it. This applies to every heading level, including the page title.

The repository enforces this rule with:

```bash
python3 scripts/lint_markdown_headings.py
```

The GitHub Pages deployment runs the same check.

## Decision rule

| Content | Preferred form | Reason |
|---|---|---|
| Mathematical equation | MathJax/LaTeX | Semantic, searchable, copyable, accessible and responsive |
| Multi-line derivation | Aligned MathJax with explanatory prose between steps | Keeps the mathematical structure precise without turning reasoning into a picture |
| Small numerical calculation | MathJax or a compact table | Makes substitutions and results easy to verify |
| Computation graph or dependency flow | SVG | Spatial relationships and direction are the main idea |
| Architecture diagram | SVG | Layers, branches, repeated blocks and data flow benefit from stable layout |
| Coordinate geometry or decision boundary | SVG or generated plot | The geometry itself carries the explanation |
| Short pseudocode | Code block | Copyability and exact indentation matter |
| Literal data, vectors or token sequences | Light text block or table | These are examples, not equations or programs |
| Large conceptual scene or recurring character | Original illustration | Supports memory and narrative rather than formal notation |

## Equations should not normally be SVGs

Rendering an equation as an SVG makes it visually attractive but loses several important properties:

- the reader cannot easily copy the LaTeX or symbols;
- browser search cannot reliably find variables or phrases;
- screen readers receive less useful structure unless extensive metadata is added;
- equations scale less naturally with surrounding text;
- dark mode and font-size changes become harder;
- every notation correction requires regenerating an asset;
- equations cannot reflow or scroll independently on small screens.

Therefore, equations and derivations should use MathJax. A styled equation container can provide the visual separation previously supplied by a dark code block.

## When SVG is better

Use SVG when **position, grouping, direction or visual correspondence** is part of the concept.

Strong candidates include:

1. a forward computation graph with the reverse gradient path;
2. XOR before and after a learned coordinate transformation;
3. one-hot vectors becoming points in an embedding space;
4. a Deep Sets element encoder, symmetric aggregator and readout;
5. invariance versus equivariance;
6. a graph message-passing neighbourhood;
7. a manifold folded in observation space and unfolded in representation space;
8. the relationship among representation, objective and optimisation;
9. a contrastive-learning positive/negative pair construction;
10. static versus contextual representations of the same word.

SVGs should remain explanatory diagrams, not screenshots of paragraphs or formulas.

## Avoid a page full of dark rectangles

Dark code blocks are reserved for actual code, terminal commands or pseudocode where exact formatting matters.

For other material:

- equations use MathJax cards;
- arrow-heavy conceptual flows use SVG;
- short literal examples use a light text block;
- parameter collections use tables;
- warnings and design lessons use callouts;
- long derivations alternate equations with prose rather than placing the entire derivation in one block.

This creates visual hierarchy and prevents every idea from appearing equally heavy.

## SVG production requirements

Every SVG should:

- use a meaningful file name;
- have a `title` and `desc` element;
- be responsive through a `viewBox`;
- avoid embedding external fonts;
- maintain readable contrast;
- include concise alternative text where embedded;
- keep important labels as text rather than paths;
- avoid tiny labels that fail on mobile;
- use arrows consistently for direction and dashed lines consistently for optional or inferred relationships;
- live near the Markdown source that uses it, for example `papers/core/diagrams/`.

## Mathematical notation requirements

Every mathematical section should:

- define symbols before using them;
- use the same indices throughout the chapter;
- distinguish scalars, vectors and matrices consistently;
- align equal signs in multi-step derivations;
- avoid hiding more than one conceptual step behind a single equality;
- state the loss function and activation assumptions used in toy calculations;
- retain enough precision to reproduce the displayed result;
- separate the general equation from the numerical substitution;
- keep the section heading free of mathematical markup.

## Recommended page rhythm

A strong pedagogical sequence is:

```text
question or failure case
        ↓
conceptual SVG or concrete example
        ↓
general MathJax equation
        ↓
small numerical calculation
        ↓
interpretation in words
        ↓
limitation or counterexample
```

The purpose is not to maximise graphics. It is to switch representation whenever the current representation is no longer the clearest one.

## Applied example: backpropagation guide

The backpropagation guide follows this policy:

- forward equations and the squared loss use MathJax;
- the computation dependency and reverse gradient path use one SVG;
- parameters use a table;
- numerical forward and backward calculations use aligned MathJax;
- local/distributed activation examples remain lightweight literal blocks;
- all headings remain plain language, with equations placed in the body below them.

This should be the template for revising the remaining paper guides.
