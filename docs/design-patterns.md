# Representation Design Patterns

This document extracts reusable patterns that recur across the paper catalogue.

## 1. Change coordinates to simplify the task

### Situation

The target boundary or relationship is complicated in the raw input space.

### Move

Construct or learn a transformation:

```text
z = h(x)
```

such that a simpler model can operate on `z`.

### Examples

- XOR interaction features;
- hidden units trained by backpropagation;
- polynomial features;
- kernels;
- autoencoder latent coordinates;
- Fourier features for periodic structure.

### Warning

A more separable training representation can still encode leakage or shortcuts.

## 2. Preserve identity without inventing order

### Situation

The input is a nominal category.

### Move

Use one-hot, hashing or a categorical embedding rather than treating IDs as magnitudes.

### Examples

- word IDs;
- city, product or merchant IDs;
- graph node types.

### Warning

Learned geometry is objective-specific, and rare/unseen values need explicit handling.

## 3. Share statistical strength through distributed coordinates

### Situation

Many symbols or examples are related, but exact-match representations isolate them.

### Move

Represent each item through a combination of reusable features.

### Examples

- neural word embeddings;
- entity embeddings;
- hidden-layer features;
- multimodal shared spaces.

### Warning

The shared factors can encode bias and may not align with human concepts.

## 4. Make context part of the representation

### Situation

The meaning or utility of an item depends on surrounding items or fields.

### Move

Replace a static representation with a context-conditioned one.

### Examples

- ELMo/BERT token vectors;
- TabTransformer categorical embeddings;
- graph node states after message passing;
- contextual product or user representations.

### Warning

Context can leak future information or make caching/versioning more difficult.

## 5. Encode topology, not merely values

### Situation

The domain has a natural geometry such as a cycle, grid, graph or manifold.

### Move

Choose a representation whose neighbourhood and transformations match the domain.

### Examples

- sine/cosine for time of day;
- convolution for image grids;
- graph neural networks for relations;
- rotary or relative position mechanisms for sequences.

### Warning

The assumed topology may be wrong for a particular task.

## 6. Build invariance deliberately

### Situation

A transformation changes presentation but should not change the answer.

### Move

Use invariant architecture, aggregation, canonicalisation or training pairs.

### Examples

- symmetric pooling over sets;
- global pooling for image classification;
- contrastive augmentations;
- graph-level readouts invariant to node relabelling.

### Warning

Invariance discards information. Confirm the transformation is truly label-preserving.

## 7. Use equivariance before invariance

### Situation

Intermediate or element-wise outputs should transform with the input.

### Move

Maintain an equivariant representation and pool only when a final invariant output is needed.

### Examples

- convolutional feature maps;
- segmentation masks;
- node-wise graph representations;
- 3D geometric features.

### Warning

Premature invariant pooling destroys location or correspondence.

## 8. Aggregate variable-size collections symmetrically

### Situation

Inputs contain an unordered, variable number of elements.

### Move

Apply a shared element encoder and symmetric aggregation.

```text
rho(sum(phi(x)))
```

### Choices

- sum preserves multiplicity and count signal;
- mean normalises cardinality;
- max detects strongest presence;
- attention pooling learns data-dependent weighting.

### Warning

Pooling choices discard different information; pairwise relations may require interactions before pooling.

## 9. Separate content from position

### Situation

The same content can occur at different positions, and order matters.

### Move

Represent content and position through separate but interacting mechanisms.

### Examples

- sinusoidal position encoding;
- learned position embeddings;
- relative position biases;
- rotary position embedding;
- ALiBi.

### Warning

Position can enter through the vector, the interaction rule or both; do not assume all methods are interchangeable.

## 10. Define similarity through the learning objective

### Situation

A useful representation should place related examples close together.

### Move

Construct prediction, pair, triplet or alignment objectives that reward desired relationships.

### Examples

- skip-gram context prediction;
- contrastive loss;
- triplet loss;
- CLIP image-text alignment;
- supervised metric learning.

### Warning

Positive/negative construction defines the geometry and can create false invariance or false negatives.

## 11. Prevent trivial collapse

### Situation

An agreement objective can be minimised by mapping all inputs to the same vector.

### Move

Introduce a mechanism that makes constant representations invalid or unstable.

### Examples

- negative examples;
- stop-gradient and asymmetric predictor;
- teacher/target networks;
- variance and covariance constraints;
- reconstruction or information-preserving objectives.

### Warning

Low training loss alone does not prove representation utility.

## 12. Use a bottleneck, but state what it should retain

### Situation

The representation should compress or abstract the input.

### Move

Restrict dimension, capacity, noise or information flow.

### Examples

- PCA;
- autoencoders;
- VAEs;
- information bottleneck-inspired objectives;
- quantisation.

### Warning

A reconstruction bottleneck preserves reconstruction-relevant information, not necessarily target-relevant information.

## 13. Represent missingness explicitly

### Situation

A value can be unknown, unavailable, not applicable or genuinely zero.

### Move

Preserve missingness as a separate state or indicator.

### Examples

- imputation plus missing flag;
- learned missing-category row;
- model-native missing branches.

### Warning

Missingness patterns may change after deployment and can themselves leak workflow state.

## 14. Fit representation transformations inside the validation boundary

### Situation

The representation uses statistics learned from data.

### Move

Fit it on each training fold only.

### Examples

- scaling;
- PCA;
- target encoding;
- vocabulary building;
- feature selection;
- learned embeddings;
- imputation.

### Warning

A deterministic-looking transformation can still leak when its parameters use validation or future data.

## 15. Preserve time causality

### Situation

Examples and features are built from event streams.

### Move

Define an observation cutoff and ensure every feature is knowable before that cutoff.

### Examples

- rolling aggregates using past-only windows;
- time-aware target encoding;
- causal sequence masks;
- label maturity delays.

### Warning

Random splits can hide future leakage and entity persistence.

## 16. Probe before claiming what a representation knows

### Situation

A hidden representation is said to contain a concept.

### Move

Use controlled probes, retrieval, interventions and transfer tests.

### Distinctions

- present in information;
- linearly accessible;
- accessible to a high-capacity probe;
- used by the original model;
- causally necessary;
- transferable.

### Warning

Probe accuracy does not by itself show causal use.

## 17. Compare spaces up to irrelevant coordinate changes

### Situation

Two models learn different neuron orderings or rotations.

### Move

Use representation-level similarity measures rather than direct neuron equality.

### Examples

- canonical correlation methods;
- CKA;
- subspace angles;
- retrieval agreement;
- aligned probes.

### Warning

A similarity metric has its own invariances and can hide task-relevant differences.

## 18. Test representation under intervention

### Situation

A model may exploit a shortcut.

### Move

Change one factor while holding others fixed.

### Examples

- recolour the background;
- shuffle set order;
- relabel graph nodes;
- alter time zone;
- remove an identifier;
- swap demographic or contextual cues where ethically and technically valid.

### Warning

Interventions must preserve realism and avoid creating out-of-distribution artefacts that confound interpretation.

## 19. Version representation contracts

### Situation

Production encodings evolve.

### Move

Version vocabularies, transformation parameters, dimensions, missing-value policy and model compatibility.

### Examples

- embedding table version;
- tokenizer version;
- category normalisation rules;
- feature-store definition;
- graph schema;
- image preprocessing pipeline.

### Warning

A model and representation version are inseparable deployment artefacts.

## 20. Prefer the simplest representation that preserves required structure

### Situation

Several encodings can solve the task.

### Move

Choose based on evidence, data size, cost, robustness and maintenance—not novelty.

### Examples

- one-hot may beat embeddings for small stable vocabularies;
- a ratio may beat an MLP with limited data;
- a set sum may be sufficient without attention;
- tree models may handle tabular categories better under some constraints.

### Warning

“Simpler” must include operational complexity and hidden preprocessing, not only model parameter count.
