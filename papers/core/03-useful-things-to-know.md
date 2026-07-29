# A Few Useful Things to Know About Machine Learning

## Citation

Pedro Domingos. “A Few Useful Things to Know About Machine Learning.” *Communications of the ACM*, 55(10):78–87, 2012.

- Author PDF: https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf
- DOI: https://doi.org/10.1145/2347736.2347755

## One-sentence contribution

The paper presents practical principles for thinking clearly about generalisation, overfitting, feature engineering, data quality, model assumptions and the interaction between representation, evaluation and optimisation.

## Why it belongs in this project

The most useful framing for this repository is:

```text
learning = representation + evaluation + optimisation
```

- **Representation** defines which candidate functions the learner can express conveniently.
- **Evaluation** defines what counts as a good candidate.
- **Optimisation** defines how the learner searches for it.

Many failures blamed on “the algorithm” are actually mismatches among these three components.

## Representation as a language for hypotheses

A representation is not merely the data format. It includes the language used to express possible models.

Examples:

- a linear model represents weighted sums of supplied features;
- a decision tree represents nested axis-aligned conditions;
- a convolutional network represents compositions with local weight sharing;
- a Deep Sets model represents permutation-invariant functions;
- a transformer represents token interactions through attention and position mechanisms.

The same real-world relationship can be simple in one hypothesis language and complicated in another.

## Toy example: choosing coordinates

Suppose the target is:

```text
y = 1 when x1 × x2 > 0
```

In the raw `(x1, x2)` plane, the positive region occupies two diagonally opposite quadrants. A single linear boundary cannot represent it.

Construct:

```text
z = x1 × x2
```

Now the rule becomes:

```text
y = 1 when z > 0
```

The prediction rule is simple after the representation exposes the relevant interaction.

## Generalisation rather than memorisation

A model's objective is not to reproduce training labels at any cost. It must perform well on new examples from the intended deployment distribution.

Representation affects generalisation because it determines which examples share parameters or appear similar.

- One-hot identity allows little similarity-based sharing by itself.
- Embeddings permit related categories to influence nearby parameters.
- Convolution shares a detector across locations.
- Graph message passing shares a neighbourhood-combination rule across nodes.

The inductive bias says which kinds of regularity the learner should prefer.

## The importance of feature engineering

Even powerful learners benefit from representations that make relevant structure accessible.

Feature engineering can:

- inject domain knowledge;
- reduce sample complexity;
- expose invariance;
- make interactions explicit;
- improve optimisation;
- reduce noise;
- align measurement with the task.

However, every engineered feature can also introduce:

- leakage;
- arbitrary thresholds;
- brittle assumptions;
- unit dependence;
- information loss;
- maintenance burden.

## More data versus better representation

More data helps only when it contains relevant signal and resembles the intended deployment setting.

A useful thought experiment:

- Dataset A has one million examples with a leaked post-outcome feature.
- Dataset B has ten thousand examples with a valid pre-outcome representation.

The larger dataset can produce more confident failure in production.

Similarly, repeating near-duplicate examples does not create the same information as increasing coverage of important variation.

## Overfitting has many forms

Overfitting is not limited to a large neural network fitting noise.

It can occur through:

- feature selection performed on the full dataset;
- repeated tuning against the test set;
- hand-adjusting preprocessing after inspecting test errors;
- choosing among many representations using one validation set;
- identifiers that memorise entities;
- high-cardinality categories with too little support;
- data duplicates across splits.

The complete development process, not only parameter fitting, must be validated.

## Intuition can fail in high dimensions

In high-dimensional spaces:

- distances can concentrate;
- sparse observations leave most combinations unseen;
- nearest neighbours may be unintuitive;
- a large representation can enable memorisation;
- visual inspection of two-dimensional projections can be misleading.

Representation dimension should therefore be treated as a modelling decision, not as a guarantee of expressiveness without cost.

## Objective mismatch

A model learns what the evaluation criterion rewards.

Examples:

- optimising click-through may favour sensational content rather than long-term satisfaction;
- reconstructing every pixel may prioritise texture rather than class identity;
- random image crops can teach crop invariance even when location matters;
- next-token prediction can encode many linguistic regularities without directly optimising factuality.

When interpreting a representation, always trace the claimed property back to a training signal.

## Visual scene plan

### Scene 1 — Three control panels

Rhea chooses the representation language, Eva chooses the score, and Omar searches the space. A mistake in any panel changes the result.

### Scene 2 — Easy road on the wrong map

The optimisation vehicle drives efficiently but the representation map does not contain the destination.

### Scene 3 — The giant leaked dataset

Leo Leakage delivers a mountain of examples containing a future outcome flag; validation looks excellent and deployment fails.

### Scene 4 — Coordinate transformation

A tangled boundary becomes a simple threshold after a useful feature is constructed.

## Common misunderstandings

### “A more powerful learner makes representation irrelevant”

A flexible learner can approximate more functions, but data requirements, optimisation, inductive bias and missing information remain decisive.

### “Training accuracy measures learning quality”

It measures fit on observed examples, not generalisation.

### “The best validation result proves the representation is meaningful”

It may exploit shortcuts, leakage or dataset-specific regularities.

### “More dimensions always preserve more useful information”

They can preserve noise, increase variance and make similarity less reliable.

## Relationship to the other core papers

- **Guyon & Elisseeff:** operational treatment of feature construction and selection.
- **Rumelhart, Hinton & Williams:** optimisation learns hidden features within a differentiable representation family.
- **Bengio, Courville & Vincent:** develops priors and desired properties for learned representations.
- **Deep Sets and Geometric Deep Learning:** show how domain symmetry constrains the representation family.

## Design patterns extracted

1. **Debug representation, objective and optimisation separately.**
2. **Prefer a hypothesis language aligned with domain structure.**
3. **Treat the whole development loop as a source of overfitting.**
4. **Use more data only after checking validity and coverage.**
5. **Trace every learned property to an objective and data signal.**

## Review questions

1. What does it mean to call a representation a hypothesis language?
2. Why can optimisation not recover a function excluded by the representation?
3. How can representation choice reduce sample complexity?
4. Give three examples of overfitting outside model parameter training.
5. Why might reconstruction produce the wrong features for classification?
6. What is an inductive bias in a convolutional network?
7. Why does high dimensionality complicate distance-based interpretation?
8. What is the difference between more examples and broader coverage?
9. How can an evaluation metric shape undesirable internal representations?
10. Diagnose whether a poor result is primarily representational, evaluative or optimisation-related.

## Experiments

1. Solve a nonlinear task with raw versus interaction features.
2. Compare an MLP and a linear model at different sample sizes.
3. Inject an identifier feature and observe memorisation.
4. Tune repeatedly against a fixed test set and plot optimism.
5. Compare random train/test splitting with entity-group splitting.
6. Test nearest-neighbour behaviour as irrelevant dimensions are added.
