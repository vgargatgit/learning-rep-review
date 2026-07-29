# Representation Design Checklist

Use this checklist when designing inputs for a new machine-learning problem or reviewing an existing pipeline.

## 1. Define the prediction unit

What exactly produces one prediction?

Examples:

- one customer at one point in time;
- one transaction;
- one document;
- one image;
- one unordered basket;
- one graph;
- one time window;
- one user-device session.

Ambiguity here commonly creates leakage, duplicated labels and train/test contamination.

## 2. Define the observation time

For every feature, ask:

```text
Was this value knowable at prediction time?
```

Record:

- event time;
- ingestion time;
- feature-computation time;
- prediction time;
- label-maturity time.

Do not use a later correction, settlement, cancellation or aggregate that contains events occurring after prediction time.

## 3. Classify each input

| Input kind | Typical representation questions |
|---|---|
| Continuous scalar | units, scale, skew, clipping, monotonicity |
| Count | zero inflation, heavy tail, log transform, exposure time |
| Ordinal category | whether order is real and spacing is meaningful |
| Nominal category | one-hot, hashing, embedding, unseen values |
| Cyclic variable | sine/cosine or another periodic basis |
| Timestamp | absolute time, age, seasonality, recency, time zone |
| Text | tokenisation, vocabulary, context, sequence length |
| Sequence | order, position, truncation, padding, causal direction |
| Set | permutation invariance, multiplicity, aggregation |
| Image/grid | locality, resolution, translation, colour space |
| Graph | node/edge types, direction, graph-level versus node-level task |
| Missing value | unknown, unavailable, not applicable, censored or zero |

## 4. Check geometry introduced by the encoding

An encoding defines distances and directions, whether intended or not.

Ask:

- Does a larger number mean more of something?
- Are equal numerical gaps semantically comparable?
- Should nearest numerical neighbours be similar?
- Does Euclidean distance make sense?
- Are vectors normalised before cosine similarity?
- Are unrelated categories accidentally ordered?
- Are periodic endpoints incorrectly separated?

### Example: category IDs

```text
Mumbai = 1
Delhi  = 2
Pune   = 3
```

This creates unsupported claims:

- Delhi is between Mumbai and Pune.
- Pune is three times Mumbai.
- Pune is closer to Delhi than to Mumbai.

### Example: time of day

`23` and `0` are adjacent in reality but distant on a line. A two-dimensional cyclical encoding places hours on a circle.

## 5. Identify transformations

List transformations that can occur in the world or data pipeline.

Examples:

- reorder items;
- translate or rotate an image;
- rename graph nodes;
- shift a time series;
- change units;
- paraphrase text;
- crop an image;
- duplicate an event;
- change time zone;
- permute feature columns.

For each transformation choose one behaviour:

- **Invariant:** representation should not change.
- **Equivariant:** representation should change predictably.
- **Sensitive:** representation should change because the transformation matters.

Never request invariance without naming the information that will be discarded.

## 6. Decide whether order matters

Ask separately about:

- chronological order;
- spatial order;
- presentation order;
- arbitrary storage order;
- partial order;
- causal order.

Examples:

- sentence tokens: order usually matters;
- shopping basket: order usually does not;
- transaction history: order and time gaps matter;
- graph neighbours: enumeration order should not matter;
- ranked search results: order is the target structure.

## 7. Preserve multiplicity when needed

A mathematical set removes duplicates, but many practical “sets” are multisets.

```text
{apple, apple, orange}
```

is different from:

```text
{apple, orange}
```

A representation that deduplicates inputs loses purchase quantity, event frequency or repeated evidence.

## 8. Treat missingness as information

Do not automatically map all missing values to zero.

Distinguish:

- not measured;
- not yet available;
- not applicable;
- intentionally withheld;
- failed sensor;
- censored value;
- true zero.

Possible treatments:

- explicit missing indicator;
- learned missing-category embedding;
- model-native missing handling;
- imputation plus indicator;
- separate process model for informative missingness.

Fit imputers only on training data.

## 9. Examine scale and units

Ask:

- Are metres and kilometres mixed?
- Is the distribution heavy-tailed?
- Does the algorithm depend on distance or gradient magnitude?
- Is zero meaningful?
- Can values be negative?
- Is a logarithm valid?
- Should scaling be robust to outliers?

Common transformations:

- standardisation;
- min-max scaling;
- robust scaling;
- log or `log1p`;
- quantile transformation;
- clipping/winsorisation;
- domain-specific normalisation by exposure or population.

All fitted transformations belong inside the training pipeline and cross-validation loop.

## 10. Search for interactions

A variable can be weak alone but useful jointly.

Examples:

- price × quantity;
- amount relative to customer's normal amount;
- speed = distance / time;
- debt-to-income ratio;
- hour × day-of-week;
- treatment effect conditional on subgroup.

Compare three strategies:

1. manually construct the interaction;
2. use a model capable of learning interactions;
3. combine both when domain knowledge and data support it.

## 11. Separate identity from similarity

One-hot vectors represent distinct identity cleanly but do not encode similarity. Embeddings introduce similarity learned from a task.

Ask:

- Which objective determines closeness?
- Is similarity task-specific?
- Is the embedding stable across retraining?
- How are rare and unseen values handled?
- Does the geometry encode undesirable bias?
- Is an embedding dimension justified by data volume?

## 12. Decide the aggregation level

Aggregates improve compactness but discard information.

A transaction history represented only by average amount loses:

- variance;
- recency;
- burstiness;
- sequence;
- maximum amount;
- repeated merchants;
- trend;
- seasonality.

Record the discarded information for every aggregate.

## 13. Prevent target leakage

Common leakage sources:

- a feature created after the outcome;
- global normalisation before the train/test split;
- target encoding calculated using the current row's label;
- duplicate entities across train and test;
- future events inside a historical window;
- features derived from post-resolution status;
- hyperparameter decisions made repeatedly against the test set;
- feature selection performed before cross-validation.

Use time-aware, group-aware or entity-aware splitting where appropriate.

## 14. Detect shortcut features

A model may exploit an easy correlate instead of the intended concept.

Examples:

- hospital identifier instead of pathology;
- image background instead of object shape;
- document template instead of meaning;
- seller ID instead of product quality;
- timestamp artefact instead of behaviour.

Tests:

- counterfactual edits;
- subgroup evaluation;
- environment shifts;
- feature ablation;
- saliency or attribution used cautiously;
- leave-one-source-out testing.

## 15. Match representation capacity to data

A high-capacity learned representation may be inappropriate when:

- the dataset is very small;
- categories are mostly unique;
- labels are noisy;
- deployment must be interpretable;
- training and production vocabularies differ sharply;
- the representation cannot be updated safely.

A manually engineered feature can encode strong knowledge with fewer samples. Learned representations can discover interactions and reuse statistical strength when data and objectives are adequate.

## 16. Plan evaluation before training

Evaluate more than final task accuracy.

### Predictive utility

- frozen linear probe;
- fine-tuning;
- transfer to related tasks;
- few-shot performance.

### Geometry

- nearest neighbours;
- retrieval quality;
- clustering;
- interpolation;
- anisotropy and norm distribution.

### Information and accessibility

- probes with controlled capacity;
- attribute prediction;
- mutual-information estimates used cautiously;
- intervention or causal tests where possible.

### Robustness

- nuisance transformations;
- distribution shift;
- missing and unseen categories;
- adversarial or worst-group tests.

### Efficiency

- representation size;
- lookup/storage cost;
- training and inference latency;
- update frequency;
- cold-start behaviour.

## 17. Document the representation contract

For every production feature or learned embedding, record:

- semantic definition;
- source fields;
- event-time boundary;
- units;
- missing-value semantics;
- fitting data window;
- transformation parameters;
- valid range;
- vocabulary/version;
- unseen-value behaviour;
- owner;
- refresh cadence;
- privacy classification;
- known limitations;
- tests and monitoring.

## Compact review card

Before approving a representation, answer:

```text
Object:
Prediction time:
Raw observations:
Encoding:
Shape and dtype:
Geometry introduced:
Invariances:
Equivariances:
Information discarded:
Missing-value meaning:
Unseen-value policy:
Leakage controls:
Shortcut risks:
Evaluation method:
Versioning and monitoring:
```
