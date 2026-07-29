# Learning Representations: From Feature Engineering to Learned Structure

A pedagogical, paper-driven project for understanding **how machine-learning systems represent their inputs**, why some representations make a problem easy while others make it unnecessarily hard, and how neural networks learn useful internal features.

The project begins with Rumelhart, Hinton and Williams' 1986 paper, **Learning Representations by Back-Propagating Errors**, and then connects it to classical feature engineering, embeddings, invariance, equivariance, latent-variable models, self-supervised learning, representation evaluation, and modern foundation models.

> **Central thesis:** A model never sees the world directly. It sees a representation. The representation determines what information is available, what relationships look close, what distinctions are preserved, and which functions are easy to learn.

## Project goals

By the end of this project, a reader should be able to:

1. Distinguish raw observations, variables, engineered features, encodings, embeddings, hidden representations and predictions.
2. Explain why the same underlying object can have many valid representations.
3. Identify false geometry introduced by an encoding, such as artificial order in integer-encoded categories.
4. Recognise task-relevant invariances and equivariances.
5. Explain how hidden units trained by backpropagation can learn useful features.
6. Compare manual feature engineering with representation learning.
7. Understand sparse, dense, distributed, contextual and compositional representations.
8. Choose suitable representations for vectors, categories, sequences, sets, images, graphs and event streams.
9. Evaluate whether a learned representation transfers, disentangles factors, preserves useful information or leaks the target.
10. Implement small experiments that expose the consequences of representation choices.

## Pedagogical approach

Every core paper is studied using the same sequence:

1. **The problem before the paper** — what could existing methods not do?
2. **The smallest working example** — usually two to four inputs and hand-computable numbers.
3. **The representation bottleneck** — what information or geometry is missing?
4. **The paper's move** — the conceptual change introduced by the authors.
5. **One equation at a time** — symbols are introduced only after the intuition exists.
6. **Forward calculation** — trace a complete toy example.
7. **Learning calculation** — trace gradients or parameter updates when relevant.
8. **Visual memory hook** — cartoon scenes and recurring characters.
9. **What the paper does not solve** — limitations, assumptions and later corrections.
10. **Modern descendants** — how the idea appears in current systems.

The explanations remain simplified, but terminology and equations remain technically correct.

## The representation pipeline

```text
Real-world object or event
        ↓ measurement
Raw observations
        ↓ cleaning and encoding
Model inputs / engineered features
        ↓ parameterised transformation
Hidden representation
        ↓ task head
Prediction, score or generated output
```

A useful representation should make important structure easy for the model to express while avoiding false structure and unnecessary nuisance variation.

## Core reading track

These papers form the main narrative and have full chapter-style study guides.

| Order | Paper | Why it matters |
|---:|---|---|
| 1 | [Learning Representations by Back-Propagating Errors](https://doi.org/10.1038/323533a0) — Rumelhart, Hinton & Williams, 1986 | Hidden units can learn features rather than relying entirely on hand-designed inputs. |
| 2 | [An Introduction to Variable and Feature Selection](https://www.jmlr.org/papers/v3/guyon03a.html) — Guyon & Elisseeff, 2003 | Connects raw variables, feature construction, feature selection, redundancy and validation. |
| 3 | [A Few Useful Things to Know About Machine Learning](https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf) — Domingos, 2012 | Frames learning as representation, evaluation and optimisation. |
| 4 | [Representation Learning: A Review and New Perspectives](https://arxiv.org/abs/1206.5538) — Bengio, Courville & Vincent, 2013 | Provides the central vocabulary: distributed representations, factors of variation, manifolds and useful priors. |
| 5 | [A Neural Probabilistic Language Model](https://www.jmlr.org/papers/v3/bengio03a.html) — Bengio et al., 2003 | Shows how learned word vectors fight the curse of dimensionality through shared statistical strength. |
| 6 | [Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/abs/1301.3781) — Mikolov et al., 2013 | Makes dense word embeddings concrete and computationally practical. |
| 7 | [Entity Embeddings of Categorical Variables](https://arxiv.org/abs/1604.06737) — Guo & Berkhahn, 2016 | Extends learned embeddings to high-cardinality tabular categories. |
| 8 | [Deep Sets](https://arxiv.org/abs/1703.06114) — Zaheer et al., 2017 | Demonstrates how representation and architecture must respect permutation invariance. |
| 9 | [Geometric Deep Learning](https://arxiv.org/abs/2104.13478) — Bronstein et al., 2021 | Unifies grids, sets, graphs and manifolds through symmetry, invariance and equivariance. |

## Expanded paper map

The following catalogue broadens the project without replacing the core track.

### Foundations and feature construction

- [The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain](https://doi.org/10.1037/h0042519) — Rosenblatt, 1958.
- [Learning Representations by Back-Propagating Errors](https://doi.org/10.1038/323533a0) — Rumelhart, Hinton & Williams, 1986.
- [Gradient-Based Learning Applied to Document Recognition](http://yann.lecun.com/exdb/publis/pdf/lecun-01a.pdf) — LeCun et al., 1998.
- [An Introduction to Variable and Feature Selection](https://www.jmlr.org/papers/v3/guyon03a.html) — Guyon & Elisseeff, 2003.
- [Feature Hashing for Large Scale Multitask Learning](https://arxiv.org/abs/0902.2206) — Weinberger et al., 2009.
- [A Few Useful Things to Know About Machine Learning](https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf) — Domingos, 2012.
- [Representation Learning: A Review and New Perspectives](https://arxiv.org/abs/1206.5538) — Bengio, Courville & Vincent, 2013.

### Dimensionality reduction and latent variables

- [Latent Semantic Analysis](https://doi.org/10.1002/(SICI)1097-4571(199009)41:6%3C391::AID-ASI1%3E3.0.CO;2-9) — Deerwester et al., 1990.
- [Reducing the Dimensionality of Data with Neural Networks](https://www.science.org/doi/10.1126/science.1127647) — Hinton & Salakhutdinov, 2006.
- [Auto-Encoding Variational Bayes](https://arxiv.org/abs/1312.6114) — Kingma & Welling, 2013.
- [Generative Adversarial Nets](https://papers.nips.cc/paper/5423-generative-adversarial-nets) — Goodfellow et al., 2014.
- [beta-VAE: Learning Basic Visual Concepts with a Constrained Variational Framework](https://openreview.net/forum?id=Sy2fzU9gl) — Higgins et al., 2017.
- [Disentangling by Factorising](https://arxiv.org/abs/1802.05983) — Kim & Mnih, 2018.
- [Challenging Common Assumptions in the Unsupervised Learning of Disentangled Representations](https://arxiv.org/abs/1811.12359) — Locatello et al., 2019.

### Distributed and contextual language representations

- [A Neural Probabilistic Language Model](https://www.jmlr.org/papers/v3/bengio03a.html) — Bengio et al., 2003.
- [A Unified Architecture for Natural Language Processing](https://dl.acm.org/doi/10.1145/1390156.1390177) — Collobert & Weston, 2008.
- [Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/abs/1301.3781) — Mikolov et al., 2013.
- [Distributed Representations of Words and Phrases and their Compositionality](https://arxiv.org/abs/1310.4546) — Mikolov et al., 2013.
- [GloVe: Global Vectors for Word Representation](https://aclanthology.org/D14-1162/) — Pennington, Socher & Manning, 2014.
- [Enriching Word Vectors with Subword Information](https://arxiv.org/abs/1607.04606) — Bojanowski et al., 2017.
- [Deep Contextualized Word Representations](https://arxiv.org/abs/1802.05365) — Peters et al., 2018.
- [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/abs/1810.04805) — Devlin et al., 2018.

### Position, time and sequence structure

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — Vaswani et al., 2017.
- [Time2Vec: Learning a Vector Representation of Time](https://arxiv.org/abs/1907.05321) — Kazemi et al., 2019.
- [RoFormer: Enhanced Transformer with Rotary Position Embedding](https://arxiv.org/abs/2104.09864) — Su et al., 2021.
- [Train Short, Test Long: Attention with Linear Biases Enables Input Length Extrapolation](https://arxiv.org/abs/2108.12409) — Press, Smith & Lewis, 2021.

### Categories and tabular inputs

- [Entity Embeddings of Categorical Variables](https://arxiv.org/abs/1604.06737) — Guo & Berkhahn, 2016.
- [TabTransformer: Tabular Data Modeling Using Contextual Embeddings](https://arxiv.org/abs/2012.06678) — Huang et al., 2020.
- [Revisiting Deep Learning Models for Tabular Data](https://arxiv.org/abs/2106.11959) — Gorishniy et al., 2021.

### Images and spatial representations

- [ImageNet Classification with Deep Convolutional Neural Networks](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks) — Krizhevsky, Sutskever & Hinton, 2012.
- [Visualizing and Understanding Convolutional Networks](https://arxiv.org/abs/1311.2901) — Zeiler & Fergus, 2013.
- [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385) — He et al., 2015.

### Sets, points, graphs and geometric structure

- [Deep Sets](https://arxiv.org/abs/1703.06114) — Zaheer et al., 2017.
- [PointNet: Deep Learning on Point Sets for 3D Classification and Segmentation](https://arxiv.org/abs/1612.00593) — Qi et al., 2017.
- [Semi-Supervised Classification with Graph Convolutional Networks](https://arxiv.org/abs/1609.02907) — Kipf & Welling, 2016.
- [Graph Attention Networks](https://arxiv.org/abs/1710.10903) — Veličković et al., 2017.
- [Geometric Deep Learning](https://arxiv.org/abs/2104.13478) — Bronstein et al., 2021.

### Metric, contrastive and self-supervised representations

- [Dimensionality Reduction by Learning an Invariant Mapping](http://yann.lecun.com/exdb/publis/pdf/hadsell-chopra-lecun-06.pdf) — Hadsell, Chopra & LeCun, 2006.
- [FaceNet: A Unified Embedding for Face Recognition and Clustering](https://arxiv.org/abs/1503.03832) — Schroff, Kalenichenko & Philbin, 2015.
- [Representation Learning with Contrastive Predictive Coding](https://arxiv.org/abs/1807.03748) — van den Oord, Li & Vinyals, 2018.
- [Momentum Contrast for Unsupervised Visual Representation Learning](https://arxiv.org/abs/1911.05722) — He et al., 2019.
- [A Simple Framework for Contrastive Learning of Visual Representations](https://arxiv.org/abs/2002.05709) — Chen et al., 2020.
- [Bootstrap Your Own Latent](https://arxiv.org/abs/2006.07733) — Grill et al., 2020.
- [Emerging Properties in Self-Supervised Vision Transformers](https://arxiv.org/abs/2104.14294) — Caron et al., 2021.

### Multimodal representations

- [Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020) — Radford et al., 2021.
- [ImageBind: One Embedding Space To Bind Them All](https://arxiv.org/abs/2305.05665) — Girdhar et al., 2023.

### Representation analysis and transfer

- [How Transferable Are Features in Deep Neural Networks?](https://arxiv.org/abs/1411.1792) — Yosinski et al., 2014.
- [Understanding Intermediate Layers Using Linear Classifier Probes](https://arxiv.org/abs/1610.01644) — Alain & Bengio, 2016.
- [Similarity of Neural Network Representations Revisited](https://arxiv.org/abs/1905.00414) — Kornblith et al., 2019.

## Repository structure

```text
learning-rep-review/
├── README.md
├── PROJECT_STATUS.md
├── CONTRIBUTING.md
├── references.bib
├── docs/
│   ├── reading-roadmap.md
│   ├── pedagogical-framework.md
│   ├── representation-checklist.md
│   └── design-patterns.md
├── papers/
│   ├── README.md
│   └── core/
│       ├── 01-backpropagation.md
│       ├── 02-variable-and-feature-selection.md
│       ├── 03-useful-things-to-know.md
│       ├── 04-representation-learning-review.md
│       ├── 05-neural-probabilistic-language-model.md
│       ├── 06-word2vec.md
│       ├── 07-entity-embeddings.md
│       ├── 08-deep-sets.md
│       └── 09-geometric-deep-learning.md
└── experiments/
    └── README.md
```

## Recurring visual examples

The project repeatedly returns to a small number of examples so that concepts accumulate instead of being reintroduced from scratch.

### The three mapmakers

A road map, rail map and population-density map represent the same city differently. Each suppresses some facts and exposes others. There is no universally best map; usefulness depends on the task.

### The deceptive category numbers

```text
Apple  -> 1
Banana -> 2
Orange -> 3
```

The encoding accidentally claims that banana lies halfway between apple and orange and that orange is three times apple. One-hot encoding removes this false ordering; learned embeddings can then introduce task-supported geometry.

### The clock that breaks at midnight

The numbers 23 and 0 are far apart on a line but adjacent on a clock. A cyclical representation fixes the geometry:

```text
sin(2πh/24), cos(2πh/24)
```

### XOR and the feature workshop

XOR is not linearly separable in its original two coordinates. A feature transformation or hidden layer can make the classes separable. This connects manual feature construction directly to learned hidden representations.

### Basket versus sentence

`{milk, eggs, bread}` and `{bread, milk, eggs}` are the same basket, but “dog bites man” and “man bites dog” are not the same sentence. Representation must preserve the distinctions that matter and ignore those that do not.

## Representation design checklist

For every input, ask:

1. What is the underlying object: scalar, category, vector, sequence, set, image, graph or event stream?
2. Which distinctions carry task-relevant information?
3. Which transformations should leave the answer unchanged?
4. Which transformations should change the representation predictably?
5. What relationships should appear nearby in the representation space?
6. Does the encoding create false order, distance or continuity?
7. Does aggregation discard recency, variance, multiplicity or rare events?
8. Is scale meaningful, arbitrary or unit-dependent?
9. Are missing values represented explicitly rather than confused with zero?
10. Could any feature use future or target-derived information?
11. Should domain knowledge construct the feature, or can the model learn it reliably from the available data?
12. How will representation quality be evaluated independently of final task accuracy?

## Status

- [x] Repository initialised
- [x] Core and expanded paper catalogue defined
- [x] Detailed guide for each core paper
- [x] Toy numerical examples and experiment specifications
- [x] Cartoon scene specifications inside each core guide
- [x] Cross-paper design-pattern index
- [x] Complete bibliography for the current catalogue
- [ ] Executable notebooks and scripts
- [ ] Final generated illustrations
- [ ] Chapter-quality HTML rendering

See `PROJECT_STATUS.md` for the implementation queue.

## Copyright and access

This repository stores original notes, explanations, exercises and diagram specifications. It links to papers hosted by publishers, proceedings, authors and preprint archives; it does not redistribute copyrighted paper PDFs.
