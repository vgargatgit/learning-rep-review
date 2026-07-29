# An Introduction to Variable and Feature Selection

## Citation

Isabelle Guyon and André Elisseeff. “An Introduction to Variable and Feature Selection.” *Journal of Machine Learning Research*, 3:1157–1182, 2003.

- Landing page: https://www.jmlr.org/papers/v3/guyon03a.html
- PDF: https://www.jmlr.org/papers/volume3/guyon03a/guyon03a.pdf

## One-sentence contribution

The paper organises feature selection around predictive performance, computational efficiency and understanding of the data-generating process, while explaining why relevance, redundancy and interactions must be evaluated carefully.

## Why it belongs in this project

Representation learning did not eliminate feature engineering. Before a model can learn hidden representations, someone still decides:

- what is measured;
- how examples are defined;
- which time window is visible;
- how categories, missing values and units are encoded;
- what is aggregated;
- whether domain-derived interactions are supplied;
- how selection is validated.

This paper provides the classical side of that story.

## Variables, features and representations

A useful distinction for this project:

- **Variable:** an observed or stored quantity.
- **Feature:** a quantity presented to a learning algorithm, possibly constructed from variables.
- **Representation:** the full collection and organisation of features used to describe an example.

Example:

```text
Raw variables:
- birth date
- transaction timestamp
- transaction amount

Constructed features:
- age at prediction time
- days since last transaction
- average amount over previous 30 days
- amount / customer's previous median amount
```

The constructed features encode assumptions about which relationships matter.

## Three goals of feature selection

### 1. Improve predictive performance

Removing irrelevant or harmful variables can reduce overfitting and improve generalisation.

### 2. Make prediction faster and cheaper

Fewer features can reduce:

- measurement cost;
- storage;
- latency;
- model size;
- operational dependencies.

### 3. Improve understanding

A small set of variables can support scientific interpretation, but predictive selection is not automatically causal discovery.

These goals can conflict. A redundant variable may add little predictive value but provide robustness when another source fails. A highly predictive identifier may be operationally unacceptable or scientifically uninformative.

## Relevance is not purely individual

A variable can be useless alone and essential jointly.

### XOR example

Neither `x1` nor `x2` has a simple monotonic relationship with the XOR target, yet the pair completely determines it.

A univariate ranking can therefore discard both variables.

This motivates a central distinction:

- **filter methods** score features without fitting the final model;
- **wrapper methods** evaluate subsets using a predictive model;
- **embedded methods** perform selection as part of model training.

## Irrelevance and redundancy

### Irrelevant feature

A feature supplies no useful information for the target under the problem and data distribution.

### Redundant feature

A feature's useful information is already provided by other selected features.

Redundancy is conditional on the rest of the representation and the model class.

Example:

```text
height_cm
height_m
```

These are mathematically redundant, but retaining both can still affect optimisation if scaling is inconsistent.

## Feature construction

The paper's discussion supports a broad view of feature construction:

- products and interactions;
- sums and ratios;
- basis transformations;
- Fourier or wavelet features;
- clustering-derived features;
- PCA/SVD components;
- convolutions;
- domain-specific aggregates.

A transformation can make a relationship easier for a restricted model to express.

### Example: ratio feature

Suppose default risk depends more on debt relative to income than on either alone.

```text
debt_to_income = debt / income
```

A linear model given the ratio receives the domain relationship explicitly. A sufficiently flexible model might learn an approximation from raw debt and income, but may require more data and careful optimisation.

## Feature ranking versus subset selection

Ranking individual features does not solve subset selection because:

- two top-ranked features may be redundant;
- a low-ranked feature may complement another feature;
- interactions can make a group valuable even when members are weak alone;
- the best subset depends on the model and evaluation criterion.

## Validation and leakage

Feature selection is itself a learned operation. It must be fit using training data only.

Incorrect procedure:

```text
1. Rank features using the full dataset.
2. Keep the best features.
3. Cross-validate the model.
```

The validation folds have already influenced feature choice.

Correct nested procedure:

```text
For each outer training fold:
    fit feature selection using only that fold
    tune selection/model using inner validation
    evaluate once on untouched outer validation
```

The same rule applies to:

- scaling;
- imputation;
- vocabulary creation;
- target encoding;
- PCA;
- feature generation with fitted parameters.

## Toy example: univariate ranking failure

Dataset:

| x1 | x2 | target XOR |
|---:|---:|---:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

For both `x1` and `x2`, the target is `1` half the time when the feature is `0` and half the time when it is `1`. Each feature looks individually uninformative.

Construct:

```text
x3 = x1 XOR x2
```

Then `x3` equals the target exactly.

Lesson: feature usefulness can live in interactions.

## Toy example: leakage through target encoding

Category data:

| row | category | target |
|---:|---|---:|
| 1 | A | 1 |
| 2 | A | 0 |
| 3 | B | 1 |

Naive category target mean computed using all rows:

```text
A -> 0.5
B -> 1.0
```

Row 3's input directly includes its own target because category B has only one example. Proper target encoding requires out-of-fold or leave-one-out construction with smoothing and careful handling of time.

## Relationship to learned representations

Manual feature engineering and representation learning differ in who chooses the transformation, not in whether a transformation exists.

```text
manual:
h(x) chosen by human -> model g(h(x))

learned:
h_theta(x) trained from data -> model g_phi(h_theta(x))
```

Hybrid systems are common:

```text
raw events
-> domain-valid windows and aggregates
-> embeddings / neural encoder
-> prediction head
```

Domain knowledge often determines example construction and leakage-safe boundaries even when later features are learned end to end.

## Visual scene plan

### Scene 1 — The crowded toolbox

Felix carries hundreds of tools, many duplicated or irrelevant, and cannot move quickly.

### Scene 2 — The individually useless twins

`x1` and `x2` are rejected one at a time, then solve XOR when allowed to work together.

### Scene 3 — Leo Leakage enters through the back door

A future outcome is disguised as a convenient feature and produces unrealistically perfect validation.

### Scene 4 — The nested validation rooms

Feature selection is performed inside each training room; the test room remains locked.

### Scene 5 — Human workshop and hidden-unit workshop

Felix manually builds a ratio while Hana learns a transformation. Both create representations, but from different sources of knowledge.

## Common misunderstandings

### “More features always help flexible models”

Irrelevant, noisy, unstable or leaked inputs can hurt generalisation, cost and reliability.

### “A feature with low marginal correlation is useless”

It may be valuable through interactions.

### “Feature importance identifies causes”

Predictive importance is model- and distribution-dependent and does not establish causality.

### “Deep learning means no preprocessing”

Data definition, splitting, normalisation, tokenisation, missingness and structural assumptions remain representation decisions.

### “Selection can be done once before cross-validation”

That leaks validation information into the training pipeline.

## Limitations and modern caveats

- The paper predates many modern deep representation methods.
- Feature-selection stability under dataset shift remains difficult.
- High-dimensional embeddings complicate the notion of selecting individual human-readable features.
- Redundancy can be beneficial for robustness and fault tolerance.
- Privacy, fairness and operational cost must be considered alongside accuracy.

## Design patterns extracted

1. **Construct interactions when the task depends on relationships.**
2. **Select the representation inside the validation loop.**
3. **Distinguish irrelevant from redundant.**
4. **Optimise for the actual goal: accuracy, cost or understanding.**
5. **Use domain knowledge to define leakage-safe observation boundaries.**

## Review questions

1. What is the difference between a raw variable and a constructed feature?
2. Why can univariate ranking fail on XOR?
3. How can two individually useful features be jointly redundant?
4. Why must feature selection occur inside cross-validation?
5. When might a redundant feature still be operationally useful?
6. How does a feature filter differ from a wrapper and an embedded method?
7. Why is predictive importance not causal importance?
8. Which parts of feature engineering remain necessary in end-to-end deep learning?
9. What information is discarded by a 30-day average?
10. How would you construct a time-safe feature for “days since last purchase”?

## Experiments

1. Compare univariate selection with interaction-aware models on XOR.
2. Demonstrate optimistic validation when selection is performed globally.
3. Compare raw skewed counts with `log1p` transformation.
4. Compare integer, one-hot and target encoding for categories.
5. Add duplicate features and inspect coefficients or feature importance.
6. Construct time-window features with and without leakage.
7. Compare a manually engineered ratio with an MLP trained on the raw pair at several dataset sizes.
