# Toy Experiment Catalogue

The experiments are deliberately small. Their purpose is to make representation choices visible, not to chase benchmark accuracy.

## Common rules

Every experiment should:

- use a fixed random seed but also report several-seed variation;
- separate data generation, representation, model and evaluation;
- fit every learned transformation on training data only;
- include a deliberately wrong or weak representation;
- visualise the input and learned space when dimension permits;
- record what information each representation preserves or discards;
- include assertions for claimed invariance/equivariance;
- avoid interpreting a two-dimensional projection as the entire representation;
- save configuration and metrics in machine-readable form.

Suggested stack:

```text
Python
NumPy
pandas
scikit-learn
PyTorch
matplotlib
Jupyter (optional; scripts remain the source of truth)
```

## E01 — Representation changes linear separability

### Question

Can a representation transform a problem from nonlinear to linearly separable?

### Dataset

XOR with optional Gaussian noise.

### Representations

1. raw `[x1, x2]`;
2. engineered `[x1, x2, x1*x2]`;
3. hidden representation learned by a two-layer MLP.

### Models

- logistic regression;
- small MLP.

### Outputs

- decision boundary in raw coordinates;
- hidden activations;
- linear-probe accuracy on frozen hidden features;
- several-seed comparison.

### Expected lesson

A simple decision rule can succeed after an appropriate coordinate transformation.

## E02 — False geometry from category IDs

### Question

What happens when nominal categories are represented as numbers with order?

### Dataset

Synthetic categories with a target that groups non-adjacent IDs.

### Representations

1. integer ID as scalar;
2. one-hot;
3. hashing;
4. learned embedding.

### Models

- linear regression/classification;
- decision tree;
- small MLP.

### Outputs

- accuracy by representation/model;
- learned embedding plot;
- behaviour on category relabelling.

### Expected lesson

An encoding can introduce unsupported order and distance; model class changes how harmful that becomes.

## E03 — Clock geometry

### Question

How should a periodic scalar be represented?

### Dataset

A target smoothly dependent on time of day with a peak around midnight.

### Representations

1. raw hour `0..23`;
2. one-hot hour;
3. sine/cosine cyclical pair;
4. learned Time2Vec-style basis.

### Outputs

- predicted curve around midnight;
- interpolation behaviour;
- parameter count and sample efficiency.

### Expected lesson

A representation should match topology: a clock is circular, not a line segment.

## E04 — Scaling and optimisation

### Question

How does feature scale affect gradient-based learning?

### Dataset

Two equally informative numerical features, one multiplied by a large unit conversion.

### Representations

1. raw mixed scale;
2. standardised;
3. robust-scaled;
4. log-transformed where appropriate.

### Outputs

- loss curves;
- gradient magnitudes;
- learned coefficients;
- sensitivity to learning rate.

### Expected lesson

Equivalent information in different units can produce very different optimisation behaviour.

## E05 — Feature selection leakage

### Question

How optimistic is evaluation when feature selection uses the full dataset?

### Dataset

Random labels with thousands of random candidate features.

### Procedures

1. select top features globally, then cross-validate;
2. perform selection inside each pipeline fold;
3. nested cross-validation for hyperparameter selection.

### Outputs

- estimated versus true test performance;
- optimism as candidate feature count increases.

### Expected lesson

Selection is training and must remain inside the validation boundary.

## E06 — Target encoding leakage

### Question

How can a category encoding include its own label?

### Dataset

High-cardinality categories with rare values.

### Representations

1. naive full-data target mean;
2. training-only target mean;
3. out-of-fold target encoding;
4. smoothed encoding;
5. one-hot and embedding baselines.

### Outputs

- train/validation gap;
- rare-category error;
- future-time leakage variant.

### Expected lesson

A statistically elegant representation can be invalid if its construction crosses prediction-time or validation boundaries.

## E07 — Static word embeddings from a tiny corpus

### Question

How does context prediction create geometry?

### Corpus

Synthetic sentences with controlled synonym, syntax and topic groups.

### Tasks

- CBOW;
- skip-gram;
- negative sampling.

### Outputs

- centre-context pair generator;
- one hand-verified gradient update;
- neighbour evolution during training;
- effect of context-window size;
- input versus output vectors.

### Expected lesson

Similarity is induced by the prediction game and context definition.

## E08 — Polysemy and contextual representation

### Question

Why is one vector per word insufficient?

### Corpus

Sentences using `bank` in river and financial contexts.

### Representations

1. static skip-gram vector;
2. average of context vectors;
3. small contextual sequence encoder.

### Outputs

- static nearest neighbours;
- context-conditioned token vectors;
- clustering by sense.

### Expected lesson

Identity and context are different sources of representation.

## E09 — Entity embeddings are task-dependent

### Question

Does the same categorical field learn different geometry for different targets?

### Dataset

Synthetic cities with latent attributes such as climate, size and region.

### Targets

1. heating demand;
2. language group;
3. logistics cost.

### Outputs

- separate embedding plots;
- neighbourhood comparison;
- transfer between tasks;
- rare and unseen category behaviour.

### Expected lesson

An embedding does not reveal universal similarity; it exposes relationships useful to a particular objective.

## E10 — Sum, mean and max for sets

### Question

What information does each symmetric aggregator preserve?

### Tasks

- predict count;
- predict mean;
- detect whether any element crosses a threshold;
- distinguish `{a}` from `{a,a}`;
- predict a pairwise property.

### Models

Deep Sets with sum, mean and max pooling.

### Outputs

- accuracy per task;
- cardinality extrapolation;
- duplicate sensitivity;
- pooled-vector visualisation.

### Expected lesson

All symmetric aggregators are order-invariant, but they are not information-equivalent.

## E11 — Invariance test harness

### Question

Does a model actually satisfy the claimed invariance?

### Transformations

- set permutation;
- image translation;
- graph node relabelling;
- unit conversion;
- sequence reversal as a negative control.

### Method

For transformation `g`, calculate:

```text
invariance_error = distance(f(g(x)), f(x))
```

For equivariance:

```text
equivariance_error = distance(f(g(x)), g'(f(x)))
```

### Expected lesson

Invariance/equivariance should be testable properties, not descriptive slogans.

## E12 — Set versus graph

### Question

What predictive information disappears when edges are removed?

### Dataset

Graphs with identical node-feature multisets but different connectivity and labels determined by topology.

### Models

- Deep Sets over nodes;
- graph message-passing network;
- graph model with shuffled/dropped edges.

### Outputs

- accuracy;
- examples indistinguishable to the set model;
- node-relabel tests.

### Expected lesson

Choosing a set representation for relational data destroys topology.

## E13 — Autoencoder representation versus downstream task

### Question

Does good reconstruction imply good task representation?

### Dataset

Images or vectors containing a high-variance nuisance factor and low-variance class signal.

### Models

- PCA;
- autoencoder with several bottlenecks;
- supervised encoder.

### Outputs

- reconstruction error;
- frozen linear-probe accuracy;
- latent plots;
- sensitivity to bottleneck dimension.

### Expected lesson

The objective determines what information the bottleneck prioritises.

## E14 — Contrastive augmentation defines invariance

### Question

How do positive-pair augmentations shape the learned representation?

### Dataset

Simple shapes where colour and orientation can either be relevant or nuisance.

### Conditions

- colour jitter in positive pairs;
- rotation in positive pairs;
- crop in positive pairs;
- no augmentation control.

### Outputs

- probes for colour, shape and orientation;
- nearest neighbours;
- performance when an augmentation removes target-relevant information.

### Expected lesson

A positive-pair rule is a declaration of which differences the model should ignore.

## E15 — Collapse in representation learning

### Question

Why is a constant representation a trivial solution for some self-supervised objectives?

### Conditions

- direct agreement objective with identical networks;
- stop-gradient asymmetry;
- predictor head;
- contrastive negatives;
- variance/covariance regularisation.

### Outputs

- feature variance;
- covariance spectrum;
- linear-probe performance;
- training loss.

### Expected lesson

A low self-supervised loss can coexist with a useless collapsed representation unless the system excludes trivial solutions.

## E16 — Linear probes and their limits

### Question

What does probe success actually show?

### Dataset

A representation containing a target attribute through an easily accessible direction and another through a nonlinear code.

### Probes

- linear;
- shallow nonlinear;
- high-capacity probe;
- random-label control.

### Outputs

- probe accuracy versus capacity;
- sample-size sensitivity;
- selectivity control;
- causal intervention on the representation.

### Expected lesson

Probes measure accessibility under a probe family; they do not automatically prove causal use.

## E17 — Transfer across tasks and layers

### Question

Which layers contain reusable features?

### Procedure

1. train an encoder on source task A;
2. freeze each layer in turn;
3. train a small target-task head;
4. compare with fine-tuning;
5. repeat for related and unrelated tasks.

### Outputs

- transfer accuracy by layer;
- source/target similarity analysis;
- CKA comparison;
- negative-transfer cases.

### Expected lesson

Early, middle and late representations differ in generality and task specificity.

## E18 — Shortcut learning

### Question

Will the representation encode an easy spurious feature instead of the intended concept?

### Dataset

Shape classification where background colour is highly correlated with class during training and reversed during test.

### Outputs

- in-distribution accuracy;
- shifted accuracy;
- colour and shape probes;
- counterfactual background edits;
- representation neighbours.

### Expected lesson

The model learns predictive regularities supplied by the environment, not the researcher's intended explanation.

## E19 — Representation similarity across random seeds

### Question

Can two models solve the same task with different neuron coordinates?

### Procedure

- train several identical networks with different seeds;
- compare neuron-to-neuron correlation;
- compare subspaces with CKA;
- compare linear-probe performance;
- permute or rotate one representation as a controlled test.

### Expected lesson

Individual neuron identities are not stable, while representational subspaces or relational structure can remain similar.

## E20 — Missing is not zero

### Question

What happens when absence, unknown and true zero are conflated?

### Dataset

A numerical measurement where missingness is informative and zero is valid.

### Representations

1. fill missing with zero;
2. impute plus missing indicator;
3. separate missing-category embedding;
4. model-native missing handling.

### Outputs

- subgroup performance;
- calibration;
- behaviour under changed missingness rates.

### Expected lesson

Missingness semantics are part of the input representation.

## Suggested directory layout

```text
experiments/
├── README.md
├── common/
│   ├── data.py
│   ├── metrics.py
│   ├── plotting.py
│   └── reproducibility.py
├── e01_xor/
│   ├── README.md
│   ├── run.py
│   └── test_invariants.py
└── ...
```

## Minimum result report

Each experiment README should include:

```text
Question
Hypothesis
Dataset-generation process
Representations compared
Models compared
Train/validation/test split
Metrics
Expected failure mode
Results table
Plots
Interpretation
Limitations
Reproduction command
```
