# Entity Embeddings of Categorical Variables

## Citation

Cheng Guo and Felix Berkhahn. “Entity Embeddings of Categorical Variables.” 2016.

- Preprint: https://arxiv.org/abs/1604.06737

## One-sentence contribution

The paper learns compact Euclidean vectors for categorical values during supervised neural-network training and shows that these vectors can reveal task-relevant relationships and be reused as features by other models.

## Problem: representing nominal categories

A nominal category has identity but no inherent numerical order.

Examples:

- city;
- occupation;
- product ID;
- merchant;
- store;
- device model.

### Integer encoding

```text
Mumbai = 1
Delhi  = 2
Pune   = 3
```

This introduces artificial order and distance.

### One-hot encoding

```text
Mumbai = [1, 0, 0]
Delhi  = [0, 1, 0]
Pune   = [0, 0, 1]
```

This preserves distinct identity without imposing order, but:

- dimension grows with cardinality;
- all categories are equally orthogonal;
- sparse categories share little statistical strength;
- interactions can be expensive for simple models.

## Embedding representation

For a categorical field with `K` values and embedding dimension `d`, learn:

```text
E in R^(K × d)
```

Category ID `i` retrieves row:

```text
e_i = E[i]
```

The embedding parameters are updated by the final supervised loss.

Example:

| city | e1 | e2 |
|---|---:|---:|
| Mumbai | 0.8 | 0.1 |
| Delhi | 0.7 | 0.2 |
| Pune | 0.6 | -0.1 |

These coordinates are illustrative. Their meaning comes from the task, not from the city names alone.

## Supervised geometry

Suppose the target is daily store sales. City embeddings may organise values according to patterns relevant to sales:

- climate;
- holidays;
- population;
- customer behaviour;
- logistics;
- store distribution.

If the target changes to language preference, the same cities may require a different geometry.

Therefore:

```text
category similarity is conditional on the objective and data
```

## Tiny supervised example

Categories:

```text
A, B, C
```

One-dimensional embeddings:

```text
e_A = 0.2
e_B = 0.3
e_C = -0.5
```

Simple prediction:

```text
y_hat = w e_category + b
```

Let:

```text
w = 2
b = 0.1
```

Predictions:

```text
A -> 2(0.2)+0.1 = 0.5
B -> 2(0.3)+0.1 = 0.7
C -> 2(-0.5)+0.1 = -0.9
```

If A and B repeatedly require similar predictions, their embedding gradients tend to move them into positions that the downstream network treats similarly. With nonlinear layers and other features, the geometry can encode richer interactions.

## Embeddings as learned feature engineering

After training a neural network, the embedding vectors can be exported and used by:

- linear models;
- tree models;
- clustering;
- visualisation;
- nearest-neighbour retrieval.

This creates a bridge:

```text
neural representation learning -> reusable engineered features
```

However, reuse is valid only when the new task benefits from the relationships learned for the old task.

## High cardinality and sample support

Embeddings are attractive for high-cardinality fields, but each row needs sufficient evidence.

Problems:

- categories occurring once can be memorised;
- rare categories receive noisy gradients;
- new categories have no learned row;
- large tables still consume memory;
- temporal churn can invalidate the vocabulary.

Mitigations:

- unknown bucket;
- rare-category grouping;
- hashing;
- regularisation;
- metadata-based category encoders;
- shared or compositional embeddings;
- frequency-aware dimensions;
- cold-start features.

## Multiple categorical fields

Each field normally has its own embedding table:

```text
city embedding
occupation embedding
product embedding
```

The vectors are concatenated with numerical features and passed to later layers.

A coordinate in the city table is not automatically comparable with the same coordinate in the occupation table. They are separate learned spaces until the model combines them.

## Embedding dimension

There is no universal formula for choosing `d`.

Trade-offs:

- too small: under-represents useful distinctions;
- too large: memorisation, instability and wasted memory;
- more categories do not automatically justify proportionally more dimensions;
- effective dimension depends on data volume, task complexity and regularisation.

Dimension should be treated as a validated hyperparameter and examined for category support.

## Unseen and changed categories

Production systems need an explicit contract:

- unknown category row;
- vocabulary version;
- normalisation/canonicalisation;
- case and spelling policy;
- category retirement;
- embedding refresh cadence;
- backward compatibility;
- online versus offline updates.

For mutable IDs such as merchants or products, category lifecycle is part of representation design.

## Leakage risks

Embedding training can leak information when:

- representations are pretrained using labels from validation/test periods;
- category IDs encode post-outcome status;
- an entity appears across train and test in a way that permits memorisation;
- exported embeddings are computed using future outcomes;
- random splitting ignores time or entity grouping.

An embedding is a fitted feature transformer and belongs inside the training boundary.

## Visual scene plan

### Scene 1 — The numbered-category trap

A model mistakes category IDs for magnitudes.

### Scene 2 — One-hot apartment block

Every category lives in an isolated apartment with no shared hallway.

### Scene 3 — The learned city map

Categories move into a task-shaped space as prediction errors arrive.

### Scene 4 — New resident problem

An unseen category arrives without a home, motivating the unknown bucket and metadata.

### Scene 5 — Two judges, two maps

A sales judge and a language judge organise the same cities differently.

## Common misunderstandings

### “Embedding coordinates have fixed semantic meanings”

Coordinates can rotate, permute or mix while preserving downstream behaviour.

### “Nearby categories are universally similar”

They are similar with respect to the training data and objective.

### “Embeddings always save memory”

They reduce dimension relative to very large dense one-hot processing, but large category tables can still dominate model size.

### “Rare categories benefit automatically”

A row with little data may simply memorise noise.

### “Exported embeddings improve every model”

Transfer depends on task alignment and leakage-safe training.

## Relationship to other papers

- **Neural probabilistic language model / word2vec:** categories become dense learned vectors.
- **Feature selection:** embeddings are learned feature construction.
- **TabTransformer:** category representations become contextual, depending on other fields.
- **Geometric deep learning:** useful geometry is induced by task structure and architecture.

## Design patterns extracted

1. **Represent identity separately from arbitrary numeric order.**
2. **Learn similarity from a task rather than inventing it.**
3. **Use dense representations to share statistical strength.**
4. **Version fitted category representations like model parameters.**
5. **Design explicit cold-start and unseen-category behaviour.**

## Review questions

1. What false assumptions does integer encoding introduce?
2. What does one-hot encoding preserve?
3. How does an embedding table receive gradients?
4. Why is category similarity task-dependent?
5. What happens to a category never seen during training?
6. Why can rare categories overfit?
7. Why are coordinates not individually identifiable?
8. When can an exported embedding be reused safely?
9. How should category vocabularies be versioned?
10. Why must embeddings be fitted inside the training boundary?
11. How would entity-group splitting change evaluation?
12. What alternatives exist for rapidly changing categories?

## Experiments

1. Compare integer, one-hot and embedding representations on synthetic nominal data.
2. Vary category cardinality and sample support.
3. Train embeddings for two different targets and compare neighbourhoods.
4. Export embeddings to a tree-based model.
5. Introduce unseen categories at test time.
6. Compare unknown bucket, hashing and metadata-based encoding.
7. Visualise how rare category rows move during training.
8. Demonstrate leakage from embeddings trained on future labels.
