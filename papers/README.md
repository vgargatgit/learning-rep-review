# Paper Catalogue

This directory separates the **core narrative** from broader supporting literature.

## Scope

The catalogue includes papers that help answer at least one of these questions:

1. How should raw inputs be encoded?
2. How can useful features be constructed or selected?
3. How do hidden layers learn representations?
4. What properties make a representation useful?
5. How should representation reflect order, locality, symmetry or relational structure?
6. How can representations be learned without direct task labels?
7. How can representation quality be measured?

It is not intended to contain every paper using the word “representation”.

## Core paper status

| # | Paper | Detailed note | Toy calculation | Experiment | Visual plan |
|---:|---|:---:|:---:|:---:|:---:|
| 1 | Learning Representations by Back-Propagating Errors | planned | planned | planned | planned |
| 2 | An Introduction to Variable and Feature Selection | planned | planned | planned | planned |
| 3 | A Few Useful Things to Know About Machine Learning | planned | planned | planned | planned |
| 4 | Representation Learning: A Review and New Perspectives | planned | planned | planned | planned |
| 5 | A Neural Probabilistic Language Model | planned | planned | planned | planned |
| 6 | Efficient Estimation of Word Representations in Vector Space | planned | planned | planned | planned |
| 7 | Entity Embeddings of Categorical Variables | planned | planned | planned | planned |
| 8 | Deep Sets | planned | planned | planned | planned |
| 9 | Geometric Deep Learning | planned | planned | planned | planned |

## Catalogue by conceptual role

### A. Representation is part of the hypothesis space

#### The Perceptron — Rosenblatt, 1958

**Contribution:** Establishes a trainable linear threshold unit and frames learning in terms of adjustable connections.

**Representation lesson:** A linear decision rule can only separate classes that are separable in the supplied feature space.

**Study use:** Contrast a fixed input representation with the later introduction of hidden learned features.

**Link:** https://doi.org/10.1037/h0042519

#### Learning Representations by Back-Propagating Errors — Rumelhart, Hinton & Williams, 1986

**Contribution:** Demonstrates that error gradients can train hidden units to develop task-relevant internal features.

**Representation lesson:** A network can learn a change of coordinates that makes the output task easier.

**Study use:** Main historical and mathematical paper for the project.

**Link:** https://doi.org/10.1038/323533a0

#### A Few Useful Things to Know About Machine Learning — Domingos, 2012

**Contribution:** Synthesises practical principles of machine learning.

**Representation lesson:** Learning requires choosing a representation, evaluation function and optimisation method; no learner searches all possible functions equally.

**Study use:** Accessible framing before the more technical survey.

**Link:** https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf

### B. Feature engineering and selection

#### An Introduction to Variable and Feature Selection — Guyon & Elisseeff, 2003

**Contribution:** Organises the goals, methods and validation issues of feature selection and construction.

**Representation lesson:** Raw variables are not automatically the best model inputs; relevance can be joint rather than individual, and selection must be evaluated without leakage.

**Study use:** Bridge between traditional feature engineering and learned representations.

**Link:** https://www.jmlr.org/papers/v3/guyon03a.html

#### Feature Hashing for Large Scale Multitask Learning — Weinberger et al., 2009

**Contribution:** Uses hashing to map very large sparse feature spaces into a fixed-size representation.

**Representation lesson:** Compactness can be traded against collisions, and a randomised representation can remain useful without storing a vocabulary.

**Study use:** Demonstrate engineering constraints in sparse input representations.

**Link:** https://arxiv.org/abs/0902.2206

### C. Distributed representations

#### A Neural Probabilistic Language Model — Bengio et al., 2003

**Contribution:** Jointly learns word vectors and a neural language model.

**Representation lesson:** Nearby distributed vectors allow observations about one word sequence to generalise to related unseen sequences.

**Study use:** The clearest historical bridge from one-hot word identity to learned semantic/syntactic geometry.

**Link:** https://www.jmlr.org/papers/v3/bengio03a.html

#### Efficient Estimation of Word Representations in Vector Space — Mikolov et al., 2013

**Contribution:** Introduces efficient CBOW and skip-gram architectures.

**Representation lesson:** The prediction task defines which contextual relationships are compressed into the word vectors.

**Study use:** Build a tiny corpus and calculate a few update steps.

**Link:** https://arxiv.org/abs/1301.3781

#### Distributed Representations of Words and Phrases and their Compositionality — Mikolov et al., 2013

**Contribution:** Introduces negative sampling and phrase representations.

**Representation lesson:** Sampling strategy changes the objective and therefore the learned geometry.

**Link:** https://arxiv.org/abs/1310.4546

#### GloVe — Pennington, Socher & Manning, 2014

**Contribution:** Learns vectors from global word co-occurrence statistics.

**Representation lesson:** Similar representation goals can be approached through predictive or count-based objectives.

**Link:** https://aclanthology.org/D14-1162/

#### Enriching Word Vectors with Subword Information — Bojanowski et al., 2017

**Contribution:** Represents words through character n-gram vectors.

**Representation lesson:** Compositional input structure improves rare-word and morphology handling.

**Link:** https://arxiv.org/abs/1607.04606

### D. Contextual representations

#### Deep Contextualized Word Representations — Peters et al., 2018

**Contribution:** Produces context-dependent word representations from a bidirectional language model.

**Representation lesson:** The same token should not necessarily have the same vector in every context.

**Link:** https://arxiv.org/abs/1802.05365

#### BERT — Devlin et al., 2018

**Contribution:** Pretrains bidirectional transformer representations through masked-token and sentence-level objectives.

**Representation lesson:** Representations can be conditioned on both left and right context and transferred across tasks.

**Link:** https://arxiv.org/abs/1810.04805

### E. Categorical and tabular representations

#### Entity Embeddings of Categorical Variables — Guo & Berkhahn, 2016

**Contribution:** Learns dense vectors for categorical values during supervised training.

**Representation lesson:** Category similarity is task-induced, not assumed by arbitrary IDs.

**Link:** https://arxiv.org/abs/1604.06737

#### TabTransformer — Huang et al., 2020

**Contribution:** Uses self-attention to produce contextual embeddings for categorical fields.

**Representation lesson:** A category's useful representation can depend on other fields in the same row.

**Link:** https://arxiv.org/abs/2012.06678

#### Revisiting Deep Learning Models for Tabular Data — Gorishniy et al., 2021

**Contribution:** Provides strong tabular deep-learning baselines including FT-Transformer.

**Representation lesson:** Numerical and categorical feature tokenisation can place heterogeneous fields into a shared transformer representation.

**Link:** https://arxiv.org/abs/2106.11959

### F. Latent-variable and generative representations

#### Reducing the Dimensionality of Data with Neural Networks — Hinton & Salakhutdinov, 2006

**Contribution:** Demonstrates deep autoencoders for nonlinear dimensionality reduction.

**Representation lesson:** A bottleneck can learn a compact code that preserves reconstruction-relevant information.

**Caution:** Reconstruction relevance is not identical to downstream-task relevance.

**Link:** https://www.science.org/doi/10.1126/science.1127647

#### Auto-Encoding Variational Bayes — Kingma & Welling, 2013

**Contribution:** Introduces a scalable variational latent-variable model using the reparameterisation estimator.

**Representation lesson:** A probabilistic latent representation can be regularised toward a prior and used generatively.

**Link:** https://arxiv.org/abs/1312.6114

#### Generative Adversarial Nets — Goodfellow et al., 2014

**Contribution:** Trains a generator through an adversarial discriminator.

**Representation lesson:** Useful internal features can emerge from distinguishing real from generated data, although the original paper is centred on generation rather than representation evaluation.

**Link:** https://papers.nips.cc/paper/5423-generative-adversarial-nets

#### beta-VAE — Higgins et al., 2017

**Contribution:** Strengthens the latent-prior regularisation in a VAE to encourage factorised latent structure.

**Representation lesson:** Objective constraints can trade reconstruction fidelity for a more factorised code.

**Link:** https://openreview.net/forum?id=Sy2fzU9gl

#### Disentangling by Factorising — Kim & Mnih, 2018

**Contribution:** Introduces FactorVAE to penalise dependence among latent dimensions while retaining reconstruction quality.

**Link:** https://arxiv.org/abs/1802.05983

#### Challenging Common Assumptions in Unsupervised Disentanglement — Locatello et al., 2019

**Contribution:** Shows that unsupervised disentanglement is not identifiable without inductive biases and that model selection is difficult without supervision.

**Representation lesson:** Desired semantics do not emerge solely because a latent space is low-dimensional or factorised.

**Link:** https://arxiv.org/abs/1811.12359

### G. Invariance, equivariance and structured domains

#### Deep Sets — Zaheer et al., 2017

**Contribution:** Characterises a broad class of permutation-invariant functions through shared element transformations and symmetric aggregation.

**Representation lesson:** Architectural structure can guarantee the correct response to input permutation.

**Link:** https://arxiv.org/abs/1703.06114

#### PointNet — Qi et al., 2017

**Contribution:** Processes unordered point clouds directly using shared point functions and symmetric aggregation.

**Representation lesson:** Point-set order is arbitrary, while geometric coordinates remain meaningful.

**Link:** https://arxiv.org/abs/1612.00593

#### Semi-Supervised Classification with Graph Convolutional Networks — Kipf & Welling, 2016

**Contribution:** Introduces an efficient graph convolutional architecture based on local message aggregation.

**Representation lesson:** A node's representation can be constructed from its features and neighbourhood structure.

**Link:** https://arxiv.org/abs/1609.02907

#### Graph Attention Networks — Veličković et al., 2017

**Contribution:** Learns data-dependent weights for neighbourhood aggregation.

**Representation lesson:** Not all neighbours need contribute equally to the representation.

**Link:** https://arxiv.org/abs/1710.10903

#### Geometric Deep Learning — Bronstein et al., 2021

**Contribution:** Organises deep learning architectures through symmetries and geometric priors.

**Representation lesson:** Domain structure, allowed transformations and architecture should be designed together.

**Link:** https://arxiv.org/abs/2104.13478

### H. Position and time

#### Attention Is All You Need — Vaswani et al., 2017

**Contribution:** Introduces the transformer and explicit positional encodings in a recurrence-free sequence model.

**Representation lesson:** Content vectors alone do not preserve token order; position must be represented or induced separately.

**Link:** https://arxiv.org/abs/1706.03762

#### Time2Vec — Kazemi et al., 2019

**Contribution:** Learns a vector representation of time with linear and periodic components.

**Representation lesson:** Time contains trend and periodic structure that a single raw scalar may not expose well.

**Link:** https://arxiv.org/abs/1907.05321

#### RoFormer — Su et al., 2021

**Contribution:** Encodes position by rotating query and key representations.

**Representation lesson:** Position can be represented through operations that make relative displacement visible in pairwise interactions.

**Link:** https://arxiv.org/abs/2104.09864

#### ALiBi — Press, Smith & Lewis, 2021

**Contribution:** Adds distance-dependent linear biases to attention rather than adding positional vectors to token embeddings.

**Representation lesson:** Position need not be stored in the token vector itself; it can modify the interaction rule.

**Link:** https://arxiv.org/abs/2108.12409

### I. Metric and contrastive learning

#### Dimensionality Reduction by Learning an Invariant Mapping — Hadsell, Chopra & LeCun, 2006

**Contribution:** Uses a contrastive objective to pull similar examples together and push dissimilar examples apart.

**Representation lesson:** Pair construction directly defines the invariances and separations of the learned space.

**Link:** http://yann.lecun.com/exdb/publis/pdf/hadsell-chopra-lecun-06.pdf

#### FaceNet — Schroff, Kalenichenko & Philbin, 2015

**Contribution:** Learns face embeddings using triplets of anchor, positive and negative examples.

**Representation lesson:** Relative distance constraints can produce a space useful for verification, recognition and clustering.

**Link:** https://arxiv.org/abs/1503.03832

#### Contrastive Predictive Coding — van den Oord, Li & Vinyals, 2018

**Contribution:** Learns representations by predicting future latent observations with a contrastive objective.

**Representation lesson:** Predictive structure over time can supervise representation learning without manual labels.

**Link:** https://arxiv.org/abs/1807.03748

#### Momentum Contrast — He et al., 2019

**Contribution:** Maintains a momentum-updated encoder and queue of negative examples.

**Representation lesson:** The dictionary and sampling mechanism are major parts of a contrastive representation system.

**Link:** https://arxiv.org/abs/1911.05722

#### SimCLR — Chen et al., 2020

**Contribution:** Shows that augmentation composition, projection heads and large batches strongly affect contrastive visual representations.

**Representation lesson:** Augmentations specify which transformations should be ignored.

**Link:** https://arxiv.org/abs/2002.05709

#### BYOL — Grill et al., 2020

**Contribution:** Learns from two augmented views without explicit negative examples through online and target networks.

**Representation lesson:** Architectural and optimisation asymmetry can prevent trivial collapse.

**Link:** https://arxiv.org/abs/2006.07733

#### DINO — Caron et al., 2021

**Contribution:** Uses self-distillation in vision transformers and reveals emergent semantic structure.

**Link:** https://arxiv.org/abs/2104.14294

### J. Multimodal representation

#### CLIP — Radford et al., 2021

**Contribution:** Aligns image and text representations using large-scale contrastive training.

**Representation lesson:** A shared space is created by paired supervision and the retrieval objective, not by assuming that modalities naturally share coordinates.

**Link:** https://arxiv.org/abs/2103.00020

#### ImageBind — Girdhar et al., 2023

**Contribution:** Aligns multiple modalities through image-paired data.

**Representation lesson:** One modality can act as a binding hub for several representation spaces.

**Link:** https://arxiv.org/abs/2305.05665

### K. Representation analysis

#### How Transferable Are Features in Deep Neural Networks? — Yosinski et al., 2014

**Contribution:** Studies how features transfer across tasks and layers.

**Representation lesson:** Early features tend to be more general, while later features become task-specific; co-adaptation can also reduce transferability.

**Link:** https://arxiv.org/abs/1411.1792

#### Understanding Intermediate Layers Using Linear Classifier Probes — Alain & Bengio, 2016

**Contribution:** Uses auxiliary linear classifiers to inspect information accessible at intermediate layers.

**Representation lesson:** Layer-wise linear separability can be measured without retraining the base model.

**Caution:** Probe success does not prove causal use by the original model.

**Link:** https://arxiv.org/abs/1610.01644

#### Similarity of Neural Network Representations Revisited — Kornblith et al., 2019

**Contribution:** Introduces centred kernel alignment as a robust method for comparing representations.

**Representation lesson:** Comparing learned spaces requires invariance to irrelevant changes of basis and scale.

**Link:** https://arxiv.org/abs/1905.00414

## Cross-paper questions

Use these questions after every group of papers:

1. What object is represented?
2. What information is deliberately preserved?
3. What information is deliberately discarded?
4. What geometry is introduced?
5. What symmetry is encoded?
6. What training signal shapes the representation?
7. What prevents a trivial solution?
8. Is the representation local, distributed, sparse, dense, static or contextual?
9. How is it evaluated?
10. Which claims are empirical, theoretical or interpretive?
11. What changes under distribution shift?
12. Which later paper corrects or qualifies the conclusion?
