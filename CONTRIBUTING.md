# Contributing

This repository is a pedagogical review, not a paper mirror or a leaderboard. Contributions should improve conceptual correctness, reproducibility or teaching quality.

## Contribution types

- correct a technical or historical error;
- add a missing primary-source citation;
- improve a toy calculation;
- add a reproducible experiment;
- add a failure case or limitation;
- improve accessibility or diagram descriptions;
- connect a paper to a reusable representation-design pattern;
- add a carefully scoped supporting paper.

## Paper inclusion criteria

A proposed paper should materially help answer at least one question:

1. How are raw inputs encoded?
2. How are features constructed or selected?
3. How are useful hidden representations learned?
4. What invariances, equivariances or structures should be encoded?
5. What objective shapes representation geometry?
6. How are learned representations evaluated?
7. What limitation or negative result corrects an earlier claim?

Prefer original papers, official proceedings, publisher pages and author-hosted versions.

## Required paper-note sections

A core note must include:

- full citation and primary link;
- one-sentence contribution;
- historical context;
- problem statement;
- representation before and after the paper;
- notation;
- objective/algorithm;
- toy calculation;
- assumptions and limitations;
- common misunderstandings;
- modern descendants;
- design patterns;
- review questions;
- experiment plan;
- visual scene plan.

## Accuracy rules

- Do not attribute claims to a paper unless the paper supports them.
- Distinguish the original contribution from later interpretations.
- Label pedagogical simplifications.
- Do not present illustrative embedding values as measured results.
- Distinguish theorem conditions from empirical observations.
- Include negative results that materially qualify the narrative.
- Avoid calling a representation “semantic” without naming the objective and evidence.
- Avoid causal language for predictive feature importance.
- State when a result depends on the dataset, split, metric or probe family.

## Copyright

Do not commit copyrighted paper PDFs unless their licence clearly permits redistribution. Link to publisher, proceedings, preprint or author pages instead. Notes, figures and exercises must be original or appropriately licensed and attributed.

## Experiment requirements

An experiment contribution should contain:

```text
README.md
run.py or equivalent entry point
configuration or command-line arguments
requirements/dependency declaration
tests for central invariance or arithmetic claims
saved small result table or documented reproduction command
```

Also document:

- data-generation or download source;
- split procedure;
- fitted preprocessing boundary;
- random seeds;
- metrics;
- expected failure mode;
- known limitations.

## Style

- Prefer small examples before general notation.
- Define symbols near first use.
- Keep world objects distinct from numerical representations.
- Explain what information is preserved and discarded.
- Use precise terms: invariant, equivariant, static, contextual, sparse, dense, local, distributed.
- Use diagrams to expose relationships, not as decoration.
- Render exact equations and labels with text/SVG/HTML rather than generated-image text.
- Keep every Markdown heading in plain language. Do not put equations, LaTeX delimiters, mathematical symbols or inline code in headings.
- When an equation names a section, use a conceptual heading and place the equation immediately below it as MathJax.

Validate headings before submitting:

```bash
python3 scripts/lint_markdown_headings.py
```

## Pull-request checklist

- [ ] Scope is focused.
- [ ] Primary sources are linked.
- [ ] Claims are supported.
- [ ] Simplifications are labelled.
- [ ] Toy arithmetic has been independently checked.
- [ ] No train/test leakage is introduced.
- [ ] New code has a reproduction command.
- [ ] New invariance/equivariance claims have tests.
- [ ] Markdown headings contain plain language only.
- [ ] `python3 scripts/lint_markdown_headings.py` passes.
- [ ] Copyright and licences are respected.
- [ ] `references.bib` is updated when a paper is added.
