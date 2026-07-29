# Deep Sets

## Citation

Manzil Zaheer, Satwik Kottur, Siamak Ravanbakhsh, Barnabás Póczos, Ruslan Salakhutdinov and Alexander Smola. “Deep Sets.” 2017.

- Preprint: https://arxiv.org/abs/1703.06114
- NeurIPS proceedings: https://papers.nips.cc/paper/6931-deep-sets

## One-sentence contribution

The paper develops neural architectures for functions on sets by using shared element transformations and permutation-invariant aggregation.

## The representation problem

A set has no meaningful enumeration order.

```text
{milk, bread, eggs}
```

and:

```text
{eggs, milk, bread}
```

represent the same set.

A sequence model receives positions and can assign different outputs to these enumerations unless invariance is learned from data. A set architecture can guarantee the correct behaviour by construction.

## Invariance and equivariance

### Permutation-invariant function

A set-level output should not change when elements are reordered.

```text
f(x1, x2, ..., xn)
= f(x_pi(1), x_pi(2), ..., x_pi(n))
```

for every permutation `pi`.

Examples:

- sum of elements;
- maximum;
- number of fraudulent transactions in a batch;
- classification of a point cloud;
- property of a molecule represented as an unordered atom collection, when relation information is handled appropriately.

### Permutation-equivariant function

An element-level output should reorder in the same way as the input.

```text
f(pi X) = pi f(X)
```

Example: assigning one label to every input item.

## Canonical architecture

A broad class of invariant set functions can be represented or approximated in the form:

```text
f(X) = rho(sum over x in X of phi(x))
```

Components:

- `phi`: shared transformation applied independently to each element;
- `sum`: symmetric aggregation independent of order;
- `rho`: final transformation from aggregate to output.

The sum creates a fixed-size representation from a variable-size input.

## Why sharing matters

The same `phi` is applied to every element. If a different function were tied to each position, the architecture would reintroduce dependence on arbitrary enumeration.

```text
x1 -> phi
x2 -> phi
x3 -> phi
```

not:

```text
x1 -> phi1
x2 -> phi2
x3 -> phi3
```

unless positions themselves carry genuine meaning.

## Tiny calculation

Set:

```text
X = {1, 3, 2}
```

Choose illustrative functions:

```text
phi(x) = [x, x^2]
rho([s1, s2]) = s1 + 0.1 s2
```

Element representations:

```text
phi(1) = [1, 1]
phi(3) = [3, 9]
phi(2) = [2, 4]
```

Sum:

```text
[1,1] + [3,9] + [2,4] = [6,14]
```

Output:

```text
rho([6,14]) = 6 + 0.1(14) = 7.4
```

Reordering the input changes neither the sum nor the output.

## Learning the maximum with a sum architecture

At first, `max(X)` does not look like a sum. A sufficiently expressive `phi` can encode information that allows `rho` to approximate the maximum.

For intuition, a soft maximum can be written using exponentials:

```text
softmax_value(X) = sum_i x_i exp(alpha x_i) / sum_i exp(alpha x_i)
```

As `alpha` grows, large elements dominate. This is not the exact Deep Sets construction, but it shows how nonlinear element features plus aggregation can recover non-additive set properties.

## Sum, mean and max aggregation

### Sum

Preserves information about multiplicity and set size more naturally.

```text
{a, a, b}
```

produces twice the contribution of `a`.

### Mean

Normalises for cardinality but can lose count information.

```text
{a}
```

and:

```text
{a, a}
```

have the same mean element representation.

### Max

Captures whether a strong feature is present but can discard frequency and weaker evidence.

Aggregation choice is an information-design decision.

## Set versus multiset

Many practical collections are multisets:

- basket quantities;
- repeated transactions;
- repeated sensor events;
- duplicate votes;
- point clouds with sampling density.

Deduplicating them changes the object being represented.

Deep Sets-style sums naturally preserve multiplicity, whereas preprocessing with a unique operation may not.

## Variable cardinality

The architecture accepts different numbers of elements because aggregation produces a fixed-size vector. But generalisation to much larger or smaller sets depends on:

- aggregator scaling;
- training cardinality distribution;
- whether count matters;
- normalisation;
- saturation in `rho`;
- statistical properties of elements.

## Interactions between elements

The simple architecture transforms each element independently before global aggregation. Some tasks depend on pairwise or higher-order relations:

- minimum distance between points;
- duplicate detection;
- graph connectivity;
- matching pairs.

A sufficiently expressive sum representation can approximate many invariant functions under suitable conditions, but learning may be inefficient. Later architectures such as Set Transformer explicitly model element interactions with attention.

## Sets versus graphs

A set represents elements without relationships beyond shared membership. A graph includes edges or relational structure.

Treating a graph as a bag of nodes discards:

- connectivity;
- direction;
- edge type;
- path structure;
- neighbourhood.

Choose a set model only when those relations are absent, irrelevant or encoded in each element representation.

## Visual scene plan

### Scene 1 — The shuffled shopping basket

A cashier produces different bills after items are reordered; Ivy Invariance corrects the system.

### Scene 2 — Shared inspection booth

Every item passes through the same `phi` booth before contributions enter a commutative collection bin.

### Scene 3 — Three aggregators

Sum counts repeated votes, mean ignores crowd size, and max listens only to the loudest speaker.

### Scene 4 — Set or graph?

A bag of cities loses roads drawn between them, showing why graph relationships cannot be discarded.

### Scene 5 — Element labels

When inputs shuffle, per-item outputs shuffle correspondingly, illustrating equivariance.

## Common misunderstandings

### “Set means duplicates do not matter in applications”

Many datasets called sets are mathematically multisets; multiplicity can be essential.

### “Any pooling operation is equally expressive”

Sum, mean and max preserve different information and have different theoretical and practical behaviour.

### “Permutation invariance means ignoring all structure”

It ignores enumeration order. Element features and explicitly represented relations can still carry rich structure.

### “A sequence model cannot learn set functions”

It can, but without structural constraints it may need more data and may remain order-sensitive out of distribution.

### “Deep Sets is suitable for every variable-length input”

Sequences, trees and graphs have additional structure that set aggregation can destroy.

## Limitations

- simple independent element encoding can make interactions hard to learn;
- global pooling may create an information bottleneck;
- generalisation across cardinalities is not automatic;
- continuous and finite-set assumptions matter in theoretical statements;
- sum magnitude can depend strongly on set size;
- relation structure must be supplied separately.

## Modern descendants

- PointNet;
- Set Transformer;
- attention pooling;
- graph neural-network readouts;
- multiple-instance learning;
- permutation-equivariant architectures;
- invariant/equivariant geometric networks.

## Design patterns extracted

1. **Encode known invariance structurally.**
2. **Share element transformations when positions are arbitrary.**
3. **Use symmetric aggregation to remove enumeration order.**
4. **Choose pooling according to information that must survive.**
5. **Do not collapse graphs into sets when relationships matter.**
6. **Distinguish invariant global outputs from equivariant element outputs.**

## Review questions

1. What is permutation invariance?
2. What is permutation equivariance?
3. Why does shared `phi` matter?
4. Why is sum independent of input order?
5. What information does mean pooling lose?
6. What information does max pooling lose?
7. Why is a transaction collection usually a multiset?
8. When is a set model inappropriate for graph data?
9. How can variable cardinality affect representation scale?
10. Why might pairwise interactions motivate attention?
11. Can a sequence model represent a set function?
12. How would you test invariance in code?

## Experiments

1. Implement `rho(sum(phi(x)))` for scalar sets.
2. Shuffle inputs and assert identical outputs.
3. Compare sum, mean and max on repeated elements.
4. Train on sets of size 5–10 and test on size 50.
5. Compare Deep Sets with an order-sensitive MLP over padded positions.
6. Create a task based on pairwise distance and compare with Set Transformer.
7. Remove graph edges and demonstrate lost predictive information.
8. Build an equivariant per-element labelling model and test output permutation.
