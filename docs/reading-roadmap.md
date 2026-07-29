# Reading Roadmap

This roadmap treats input representation as a continuous story rather than a list of unrelated techniques.

## Phase 0 — Establish the vocabulary

Before reading the papers, keep these terms separate:

- **Object:** the real thing of interest, such as a customer, sentence, molecule or transaction stream.
- **Observation:** a measured fact about the object.
- **Raw variable:** a stored field before task-specific transformation.
- **Feature:** a variable supplied to a model, possibly constructed from multiple observations.
- **Encoding:** a rule that converts an object or value into numerical form.
- **Representation:** the complete information-bearing form used at a stage of computation.
- **Embedding:** usually a learned dense vector representation whose geometry carries useful relationships.
- **Hidden representation:** an intermediate activation produced by a model.
- **Inductive bias:** assumptions that make some functions or explanations easier for the learner to discover.
- **Invariant representation:** unchanged by a specified transformation.
- **Equivariant representation:** changes in a predictable way when the input is transformed.

## Phase 1 — Why representation matters

### 1. A Few Useful Things to Know About Machine Learning

Read first for the high-level decomposition:

```text
learning algorithm = representation + evaluation + optimisation
```

Questions:

- What hypotheses can the chosen representation express?
- Can optimisation find them?
- Does the evaluation function reward the behaviour actually wanted?

### 2. An Introduction to Variable and Feature Selection

Focus on:

- raw variables versus constructed features;
- irrelevant versus redundant variables;
- univariate versus multivariate selection;
- interactions that are invisible when variables are considered independently;
- the danger of performing feature selection outside cross-validation;
- prediction, efficiency and scientific understanding as different goals.

Toy exercises:

1. Predict travel time using distance alone, then add hour of day.
2. Construct `price × quantity` from two weak individual variables.
3. Compare a duplicated feature with a genuinely new interaction.
4. Demonstrate leakage by calculating a feature using future data.

## Phase 2 — Hidden units become feature constructors

### 3. Learning Representations by Back-Propagating Errors

This is the historical centre of the project.

Study sequence:

1. A network with no hidden layer.
2. A task that is not linearly separable.
3. A hidden unit as a parameterised feature detector.
4. Forward propagation.
5. Error attribution using the chain rule.
6. Weight updates.
7. Hidden activations after training.
8. Distributed versus local representations.

Primary visual metaphor: a workshop in which hidden units reshape the input space before the final classifier draws a simple boundary.

## Phase 3 — What makes a representation good?

### 4. Representation Learning: A Review and New Perspectives

Use this paper to build the conceptual framework.

Key ideas:

- smoothness;
- multiple explanatory factors;
- hierarchical organisation;
- semi-supervised learning;
- shared factors across tasks;
- manifolds;
- natural clustering;
- temporal and spatial coherence;
- sparsity;
- distributed representations;
- disentangling factors of variation.

Do not treat these as universally compatible goals. For example, a representation can be excellent for prediction while remaining hard for humans to interpret.

## Phase 4 — Geometry becomes learnable

### 5. A Neural Probabilistic Language Model

Core lesson: learning a vector for every word allows evidence to be shared between nearby words, avoiding the all-or-nothing identity of one-hot vectors.

Trace:

```text
word ID -> embedding lookup -> concatenated context -> hidden layer -> next-word distribution
```

### 6. Efficient Estimation of Word Representations in Vector Space

Compare CBOW and skip-gram:

- CBOW predicts a target word from surrounding context.
- Skip-gram predicts surrounding words from a target word.

Important distinction: a useful embedding geometry is induced by the training objective and data distribution; it is not an intrinsic universal map of meaning.

### 7. Entity Embeddings of Categorical Variables

Transfer the embedding idea from words to categories such as store, city, product or occupation.

Questions:

- When is one-hot encoding sufficient?
- When does cardinality make it expensive?
- What similarity does the supervised task cause the embedding to learn?
- Can the embedding be reused by another model?
- How are unseen categories handled?

## Phase 5 — Representation must respect data structure

### 8. Deep Sets

The central form is:

```text
set representation = rho(sum(phi(element)))
```

The shared element transformation and commutative aggregation make the result permutation-invariant.

Experiments:

- sum of a set;
- maximum element;
- count of a particular kind of element;
- comparison with an order-sensitive sequence model;
- failure caused by losing multiplicity when a set is incorrectly deduplicated.

### 9. Geometric Deep Learning

Build a table connecting domain structure to architectural bias:

| Domain | Transformation or relation | Useful bias |
|---|---|---|
| Image grid | translation | locality and translation equivariance |
| Sequence | ordered position | order-aware token interaction |
| Set | permutation | permutation invariance/equivariance |
| Graph | node relabelling and adjacency | permutation-aware message passing |
| 3D object | rotation and translation | geometric equivariance |

The reader should learn to ask: **What symmetries belong to the problem before choosing a network?**

## Phase 6 — Learning without task labels

Read representative papers from autoencoding, contrastive learning and self-distillation.

### Autoencoding path

1. Reducing the Dimensionality of Data with Neural Networks
2. Auto-Encoding Variational Bayes
3. beta-VAE
4. FactorVAE
5. Challenging Common Assumptions in Unsupervised Disentanglement

Questions:

- What information must the bottleneck retain?
- Is reconstruction sufficient for downstream usefulness?
- Does the prior impose desirable geometry?
- Is disentanglement identifiable without inductive bias or supervision?

### Contrastive path

1. Dimensionality Reduction by Learning an Invariant Mapping
2. FaceNet
3. Contrastive Predictive Coding
4. Momentum Contrast
5. SimCLR

Questions:

- Which pairs are declared similar?
- Which pairs are declared different?
- Which augmentations encode invariances?
- Can false negatives damage the representation?
- Why does the projection head sometimes help?

### Non-contrastive path

1. Bootstrap Your Own Latent
2. DINO

Question: how is collapse avoided when explicit negative examples are absent?

## Phase 7 — Context and multimodality

### Contextual language representations

Read ELMo and BERT after static embeddings.

Static representation:

```text
bank -> one vector
```

Contextual representation:

```text
river bank -> vector conditioned on river context
bank loan  -> vector conditioned on finance context
```

### Multimodal alignment

Read CLIP and ImageBind.

Key question: what does it mean for images, text, audio or sensor measurements to occupy a shared space, and which relationships does the alignment objective preserve?

## Phase 8 — Evaluate the representation itself

Read:

- How Transferable Are Features in Deep Neural Networks?
- Understanding Intermediate Layers Using Linear Classifier Probes
- Similarity of Neural Network Representations Revisited

Evaluation methods:

1. **Linear probe:** freeze the representation and train a linear head.
2. **Fine-tuning:** measure how easily the representation adapts.
3. **Transfer:** test on a different dataset or task.
4. **Retrieval:** inspect nearest neighbours.
5. **Clustering:** compare discovered groups with useful categories.
6. **Ablation:** remove dimensions, layers or training signals.
7. **Invariance tests:** transform input and measure representation change.
8. **Information tests:** estimate which attributes are recoverable.
9. **Representation similarity:** compare layers, models or training runs.
10. **Robustness:** test nuisance variation and distribution shift.

## Suggested 12-week schedule

| Week | Theme | Core output |
|---:|---|---|
| 1 | Variables, features and encodings | Encoding failure gallery |
| 2 | Linear separability and XOR | Interactive toy classifier |
| 3 | Backpropagation paper | Full hand calculation |
| 4 | Representation-learning review | Concept map |
| 5 | One-hot to word embeddings | Tiny skip-gram experiment |
| 6 | Entity embeddings | High-cardinality tabular experiment |
| 7 | Sequences, sets and permutation | Deep Sets implementation |
| 8 | Graphs and geometric priors | Domain-to-architecture decision guide |
| 9 | Autoencoders and latent variables | Two-dimensional latent visualisation |
| 10 | Contrastive learning | Augmentation and pair-selection study |
| 11 | Contextual and multimodal spaces | Static/contextual comparison |
| 12 | Probing, transfer and synthesis | Cross-paper design-pattern catalogue |

## Completion criteria for each paper

A paper is considered studied only when the repository contains:

- a one-paragraph problem statement;
- historical context;
- notation table;
- architecture or algorithm diagram;
- toy numerical example;
- explanation of the objective;
- limitations and assumptions;
- modern descendants;
- at least five review questions;
- at least one executable experiment;
- one visual memory hook;
- a comparison with the papers immediately before and after it.
