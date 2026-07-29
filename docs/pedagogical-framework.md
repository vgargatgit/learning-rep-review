# Pedagogical Framework

This project explains representation learning with the accessibility of a visual textbook while retaining the terminology, equations and caveats expected in a serious technical treatment.

## Design principles

### 1. Show the representational problem before the algorithm

Do not begin with a network diagram or loss function. Begin with an input whose current representation makes the task awkward.

Examples:

- category IDs introduce meaningless numerical distance;
- hour 23 and hour 0 appear far apart on a number line;
- a bag of items is treated as an ordered sequence;
- the same word receives one static vector in incompatible contexts;
- raw coordinates force a model to relearn rotational relationships;
- a linear classifier cannot solve XOR in the original coordinates.

### 2. Separate the world from the tensor

Every chapter should explicitly display:

```text
world -> measurement -> encoding -> tensor -> model -> internal state -> output
```

This avoids language such as “the model sees a customer” when it actually sees a finite collection of numbers produced by a measurement and encoding process.

### 3. Reuse characters and visual grammar

Suggested recurring characters:

- **Rhea the Representer** — chooses encodings and coordinate systems.
- **Felix the Feature Engineer** — constructs explicit features using domain knowledge.
- **Hana the Hidden Unit** — learns a parameterised feature.
- **Gerry the Gradient Courier** — carries error information backward.
- **Ivy Invariance** — removes distinctions that should not affect the answer.
- **Eddie Equivariance** — transforms predictably when the input transforms.
- **Leo Leakage** — secretly smuggles future or target information into features.
- **Nora Noise** — introduces nuisance variation.
- **Pravin the Probe** — tests what information a representation contains.

Characters are memory aids, not substitutes for precise terms.

### 4. Use three levels of explanation

Every major idea should appear in three forms.

#### Intuitive

A plain-language explanation and visual metaphor.

#### Operational

A concrete account of what numbers are computed.

#### Formal

The relevant mathematical property, objective or theorem.

Example for sets:

- Intuitive: shuffling the items should not change the basket.
- Operational: apply the same function to every item, add the results, and transform the sum.
- Formal: for any permutation `pi`, `f(x1, ..., xn) = f(x_pi(1), ..., x_pi(n))`.

### 5. Keep toy arithmetic genuinely computable

A toy example should fit on one page and use small values.

Good:

```text
x = [1, 0]
w = [0.2, -0.3]
b = 0.1
z = w.x + b = 0.3
```

Poor:

- a 768-dimensional embedding;
- a full transformer block;
- unexplained random numbers;
- arithmetic skipped with “the computer calculates this”.

### 6. Never hide the training objective

Embedding geometry is shaped by:

- the data;
- the objective;
- sampling strategy;
- architecture;
- regularisation;
- augmentation;
- optimisation.

Avoid statements such as “the embedding learns semantic similarity” without specifying what behaviour in the training objective rewards that similarity.

### 7. Distinguish information from accessibility

A representation may contain information that a simple downstream model cannot easily extract. Conversely, a linear probe can reveal accessible information but cannot prove that the model uses it causally.

Use the following distinctions:

- information present;
- information linearly accessible;
- information used by the model;
- information useful for transfer;
- information understandable to humans.

### 8. Treat invariance as a design decision with a cost

Making a representation invariant deliberately discards information.

Examples:

- rotation invariance helps classify an object regardless of orientation but hurts tasks where orientation is the label;
- permutation invariance is correct for a set but wrong for a sentence;
- colour invariance can help shape recognition but hurt traffic-light recognition.

Every invariance discussion should include a counterexample showing when it is undesirable.

### 9. Include failure cases and negative results

A technically mature presentation must cover:

- target leakage;
- shortcut learning;
- representation collapse;
- spurious correlations;
- out-of-vocabulary and unseen categories;
- non-identifiability of disentanglement;
- false negatives in contrastive learning;
- loss of multiplicity or order;
- sensitivity to scaling and units;
- embeddings that encode social bias;
- evaluation metrics that reward the wrong geometry.

### 10. Connect every paper to a reusable design pattern

Example design patterns:

- **Change coordinates to simplify the boundary.**
- **Share statistical strength through distributed representations.**
- **Encode known symmetry instead of relearning it from data.**
- **Use a bottleneck to force compression, but define what must be retained.**
- **Choose positive pairs to define invariance.**
- **Separate content from position.**
- **Represent missingness explicitly.**
- **Freeze and probe before claiming transfer.**

## Standard paper-note template

Each core paper note should use this structure.

```markdown
# Paper title

## Citation and links
## One-sentence contribution
## Historical context
## Problem being solved
## Representation before the paper
## Representation introduced by the paper
## Notation
## Architecture or algorithm
## Objective function
## Toy forward calculation
## Toy learning calculation
## What the hidden representation means
## Visual scene plan
## Main experimental evidence
## Assumptions
## Limitations
## Common misunderstandings
## Modern descendants
## Design patterns extracted
## Review questions
## Exercises
## Implementation plan
## References
```

## Equation introduction rule

For every equation:

1. state the question it answers;
2. identify the objects involved;
3. define each symbol;
4. calculate a toy instance;
5. explain what changes when each term increases or decreases;
6. connect the equation to the paper's larger argument.

## Visual scene specification

Each illustration request should specify:

- learning objective;
- characters;
- objects;
- panel sequence;
- labels that must be exact;
- equations that must be typeset separately from generated artwork;
- visual analogy;
- prohibited misleading details;
- accessibility text;
- relationship to previous scenes.

Equations and precise labels should generally be rendered in HTML/SVG rather than baked into generated images.

## Review-question ladder

Each paper should include questions at increasing depth.

### Recall

What is a distributed representation?

### Explain

Why can one-hot vectors not express similarity by themselves?

### Calculate

Given an embedding table and two token IDs, retrieve and combine their vectors.

### Diagnose

Why does integer encoding create a false geometry for nominal categories?

### Design

How would you represent a transaction history when order, recency and repeated events all matter?

### Critique

Does a high-performing linear probe prove that the original model uses the probed attribute?

### Transfer

Where else does the paper's representation pattern appear?

## Chapter completion checklist

- [ ] Learning objective is explicit.
- [ ] Real-world object and numerical input are separated.
- [ ] Baseline representation is shown.
- [ ] Failure of the baseline is demonstrated.
- [ ] New representation is motivated before being named.
- [ ] Symbols are defined locally.
- [ ] At least one complete numerical example is included.
- [ ] Architecture and objective are separated.
- [ ] Invariance/equivariance assumptions are identified.
- [ ] Information discarded by the representation is stated.
- [ ] Failure cases are included.
- [ ] Claims are tied to the paper's actual evidence.
- [ ] Modern usage is distinguished from the original paper.
- [ ] At least one executable experiment exists.
- [ ] At least one visual memory hook exists.
