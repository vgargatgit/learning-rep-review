# Geometric Deep Learning: Grids, Groups, Graphs, Geodesics, and Gauges

## Citation

Michael M. Bronstein, Joan Bruna, Taco Cohen and Petar Veličković. “Geometric Deep Learning: Grids, Groups, Graphs, Geodesics, and Gauges.” 2021.

- Preprint: https://arxiv.org/abs/2104.13478
- Project site: https://geometricdeeplearning.com/

## One-sentence contribution

The work provides a common language for neural architectures built around domain symmetries, invariance, equivariance, locality and multiscale structure across grids, sets, graphs and manifolds.

## Why this completes the core track

Earlier papers ask how to construct features or learn hidden vectors. Geometric deep learning adds a prior question:

```text
What transformations and relationships define the domain?
```

A representation and architecture should not be selected independently of the object being represented.

## The geometric blueprint

A useful design sequence is:

1. Identify the domain.
2. Identify transformations that preserve the object's identity or structure.
3. Decide whether outputs should be invariant or equivariant.
4. Use local operations when local interactions are meaningful.
5. Reuse parameters across equivalent locations or elements.
6. Combine local information into larger-scale structure.

## Symmetry

A symmetry is a transformation under which a relevant aspect of the problem remains unchanged.

Examples:

- translating an object within an image;
- permuting the enumeration of set elements;
- relabelling graph nodes while preserving edges;
- rotating a molecule in 3D space;
- shifting a periodic signal.

The correct symmetry depends on the task.

For traffic-sign orientation classification, rotation may matter. For object identity, some rotations may be nuisance variation.

## Invariance

A function is invariant to transformation `g` when:

```text
f(g x) = f(x)
```

Example: an image classifier should often return the same class after a small translation.

## Equivariance

A function is equivariant when transforming the input produces a corresponding transformation of the output:

```text
f(g x) = g' f(x)
```

Example: translate an image and a segmentation mask should translate with it.

Equivariance preserves structured information that final invariant pooling might discard.

## Why equivariance can improve sample efficiency

Without built-in translation structure, a model may need to learn separate detectors for an object at every location.

With shared convolutional filters:

```text
same detector, many positions
```

The architecture represents the prior that the same local pattern has comparable meaning across locations.

This reduces parameters and constrains the hypothesis space.

## Domains and architectural biases

| Domain | Structure | Typical operation | Desired behaviour |
|---|---|---|---|
| Vector/tabular row | named fields | field transforms/interactions | usually no arbitrary field permutation |
| Sequence | ordered tokens | recurrence/attention/convolution | order-aware; sometimes shift equivariant |
| Grid/image | neighbourhood and translation | convolution | translation equivariance |
| Set | membership without order | shared map + symmetric pooling | permutation invariance/equivariance |
| Graph | nodes and edges | message passing | node-relabelling equivariance |
| 3D point cloud | coordinates without enumeration | point/set/geometric operations | permutation plus geometric behaviour |
| Manifold/mesh | local geometry | intrinsic or gauge-aware convolution | coordinate-system consistency |

## Graph node relabelling

A graph's node IDs are often arbitrary.

Suppose:

```text
node 1 = Alice
node 2 = Bob
```

Renaming them:

```text
node 7 = Alice
node 4 = Bob
```

should not change graph-level predictions if features and edges are relabelled consistently.

A node-level output should relabel correspondingly. This is permutation equivariance over graph nodes.

## Message passing as representation construction

A generic message-passing layer can be described as:

```text
message from j to i = phi(h_i, h_j, edge_ij)
aggregate_i = symmetric_aggregate(messages from neighbours)
h_i_new = psi(h_i, aggregate_i)
```

Key representation choices:

- which neighbours are visible;
- what edge information is included;
- sum, mean, max or attention aggregation;
- number of layers/hops;
- whether direction and edge types matter;
- how graph-level pooling is performed.

## Tiny graph calculation

Graph:

```text
A -- B -- C
```

Initial scalar node features:

```text
h_A = 1
h_B = 2
h_C = 4
```

Use one simple update:

```text
h_i_new = h_i + sum(neighbour features)
```

Then:

```text
h_A_new = 1 + 2 = 3
h_B_new = 2 + 1 + 4 = 7
h_C_new = 4 + 2 = 6
```

The new representation contains local neighbourhood information. Relabelling nodes while preserving structure simply relabels these outputs.

## Locality

Many domains have meaningful local interactions:

- nearby pixels;
- adjacent tokens;
- graph neighbours;
- spatially close atoms.

Locality allows sparse computation and parameter sharing. Stacking layers grows the receptive field.

But locality can be the wrong assumption when long-range interaction is immediate or when the chosen graph omits important edges.

## Multiscale structure

Hierarchies combine local patterns into larger structures:

```text
pixels -> edges -> parts -> objects
atoms -> motifs -> functional groups -> molecule
words -> phrases -> clauses -> document
```

Pooling, coarsening and hierarchical message passing create representations at several scales.

## Coordinate dependence and gauges

On grids, every local neighbourhood shares a global orientation. On curved surfaces or manifolds, local coordinate frames can differ. A geometric architecture must ensure that computations remain consistent when local frames change.

For this introductory project, the main lesson is:

```text
coordinates are a description, not necessarily the object itself
```

A model should not accidentally depend on arbitrary coordinate choices.

## Toy comparison: set versus graph

Objects:

```text
three cities: A, B, C
```

Set representation preserves which cities exist.

Graph representation additionally preserves roads:

```text
A connected to B
B connected to C
A not directly connected to C
```

A set model cannot infer that topology unless it is included in element features. The data domain determines what must be represented.

## Visual scene plan

### Scene 1 — Same object, transformed

A shape moves, rotates and is relabelled. Ivy and Eddie decide whether output should remain fixed or transform.

### Scene 2 — The travelling filter

One convolutional detector scans many image locations using shared parameters.

### Scene 3 — Graph name-tag swap

Nodes exchange arbitrary ID badges while connections stay the same; predictions remain structurally consistent.

### Scene 4 — Local messages become a neighbourhood representation

Each node gathers labelled parcels from neighbours and updates its state.

### Scene 5 — Coordinate-frame trap

Two observers describe the same direction using different local axes, motivating gauge-aware consistency.

## Common misunderstandings

### “Invariant is always better”

Invariance discards transformation information. Segmentation and pose estimation often need equivariance.

### “Data augmentation guarantees invariance”

It encourages behaviour on sampled transformations but does not structurally guarantee it everywhere.

### “A graph neural network understands any graph property”

Expressiveness depends on message-passing design, features, depth and known limitations.

### “Node IDs are features”

Arbitrary IDs can cause memorisation and violate relabelling symmetry unless identity is genuinely relevant and handled deliberately.

### “Convolution is only an image operation”

The broader principle is a local, shared, symmetry-aware operation; its form depends on the domain.

## Limitations and cautions

- The survey is broad and mathematically demanding.
- Exact symmetry assumptions can be violated by real sensors or tasks.
- Too much invariance can remove label-relevant information.
- Graph construction itself can encode errors or bias.
- Message passing can oversmooth, oversquash or fail to distinguish some graph structures.
- Global interactions may require attention, shortcuts or hierarchical mechanisms.
- Approximate equivariance may be more practical than exact equivariance in some applications.

## Relationship to core papers

- **Backpropagation:** trains parameters inside a structured architecture.
- **Representation-learning review:** provides priors; geometric deep learning formalises symmetry-related priors.
- **Deep Sets:** a key example of permutation symmetry.
- **Entity embeddings:** learns geometry for categories, but without domain symmetry guarantees.
- **Attention:** offers flexible interactions; positional and relational encoding determine domain structure.

## Design patterns extracted

1. **Identify symmetry before choosing architecture.**
2. **Use equivariance while structured information is needed.**
3. **Pool to invariance only when transformation information can be discarded.**
4. **Share parameters across equivalent locations or elements.**
5. **Represent relations explicitly when membership alone is insufficient.**
6. **Build multiscale representations from local operations.**
7. **Avoid dependence on arbitrary labels or coordinate frames.**

## Review questions

1. What is a symmetry of a learning problem?
2. What is the difference between invariance and equivariance?
3. Why is image segmentation usually equivariant rather than invariant to translation?
4. How does convolution share statistical strength?
5. Why should a graph model be equivariant to node relabelling?
6. What information is lost when a graph is represented as a set of nodes?
7. How does message passing construct a node representation?
8. What determines a graph layer's receptive field?
9. Why can too much invariance hurt?
10. What does locality assume?
11. Why are coordinates not always intrinsic to the object?
12. How would you choose between a sequence, set and graph representation for the same records?

## Experiments

1. Translate an image and compare an MLP with a convolutional model.
2. Test permutation invariance of a set model.
3. Relabel graph nodes and verify equivariant outputs.
4. Compare graph prediction with and without edges.
5. Train with augmentation and test transformations outside the augmentation sample.
6. Build an orientation-sensitive task and show harm from rotation invariance.
7. Stack graph layers and visualise receptive-field growth and oversmoothing.
8. Compare local message passing with a global-attention layer.
