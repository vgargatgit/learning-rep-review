# Efficient Estimation of Word Representations in Vector Space

## Citation

Tomas Mikolov, Kai Chen, Greg Corrado and Jeffrey Dean. “Efficient Estimation of Word Representations in Vector Space.” 2013.

- Preprint: https://arxiv.org/abs/1301.3781
- Follow-up on negative sampling and phrases: https://arxiv.org/abs/1310.4546

## One-sentence contribution

The paper introduces computationally efficient CBOW and skip-gram architectures that learn word vectors from local context prediction at very large scale.

## Why this paper matters

The 2003 neural probabilistic language model jointly learned embeddings and a relatively expensive language model. Word2vec simplifies the prediction architecture so far more text can be processed, making learned word vectors broadly practical.

The pedagogical lesson is not merely that “words become vectors”. It is:

```text
Choose a prediction game whose success requires the representation to capture the relationships you care about.
```

## Two training games

### Continuous Bag of Words (CBOW)

Use surrounding words to predict the centre word.

```text
The cat ___ on the mat
context: the, cat, on, the, mat
predict: sat
```

A simplified CBOW representation averages or sums context embeddings before prediction. The word order inside the selected context is not represented by the basic bag-of-words architecture.

### Skip-gram

Use the centre word to predict surrounding words.

```text
centre: sat
predict: cat, on, mat, ...
```

The training examples are centre-context pairs extracted from a sliding window.

## Tiny skip-gram dataset

Sentence:

```text
cats chase mice
```

Window radius `1` creates pairs:

```text
(cats, chase)
(chase, cats)
(chase, mice)
(mice, chase)
```

The model is rewarded when the centre vector makes observed context words likely.

## Simplified full-softmax calculation

Vocabulary:

```text
cats, chase, mice
```

Input embedding for `chase`:

```text
v_chase = [0.5, -0.2]
```

Output vectors:

```text
u_cats  = [0.4, 0.1]
u_chase = [-0.3, 0.2]
u_mice  = [0.2, -0.5]
```

Scores by dot product:

```text
score(cats)  = 0.5(0.4) + (-0.2)(0.1)  = 0.18
score(chase) = 0.5(-0.3) + (-0.2)(0.2) = -0.19
score(mice)  = 0.5(0.2) + (-0.2)(-0.5) = 0.20
```

Softmax converts these into probabilities. For training pair `(chase, mice)`, gradient descent raises the relative score of `mice` and lowers competing scores.

Repeated across a corpus, words occurring in similar contexts receive similar update patterns.

## Input and output embeddings

Skip-gram typically has two vector tables:

- input or centre-word vectors `v_w`;
- output or context-word vectors `u_w`.

They play different roles in the objective. A final application may use input vectors, output vectors or a combination.

This is important because “the embedding of a word” is not uniquely defined by the training architecture.

## Negative sampling

The follow-up paper replaces a full vocabulary softmax with binary classification between:

- observed centre-context pairs;
- sampled noise pairs.

For positive pair `(w, c)` and negative contexts `n_i`, a common objective is:

```text
log sigmoid(u_c · v_w)
+ sum_i log sigmoid(-u_(n_i) · v_w)
```

Interpretation:

- increase the dot product for an observed pair;
- decrease the dot product for sampled unobserved pairs.

### Tiny negative-sampling calculation

Assume:

```text
positive score = u_mice · v_chase = 0.20
negative score = u_tree · v_chase = -0.30
```

Positive probability:

```text
sigmoid(0.20) ≈ 0.550
```

Correctly classifying the negative pair uses:

```text
sigmoid(-(-0.30)) = sigmoid(0.30) ≈ 0.574
```

Both probabilities are only moderately correct, so gradients will push the positive score upward and the negative score downward.

## Why analogies can appear

Vector offsets can encode regular relationships when many words participate in similar patterns.

Classic form:

```text
king - man + woman ≈ queen
```

This should not be treated as a universal law of semantics. Analogy behaviour depends on:

- corpus statistics;
- objective;
- frequency;
- preprocessing;
- vector normalisation;
- analogy benchmark design;
- social and historical bias.

The important idea is that a distributed space can linearise some recurring relations.

## Window size changes the representation

Small windows often emphasise syntactic or local substitutability. Larger windows can emphasise broader topical association.

Therefore the context definition is part of the representation design.

## Subsampling frequent words

Very frequent words produce many low-information training pairs. Subsampling can reduce their dominance and training cost.

This changes the effective training distribution and therefore the learned geometry.

## Visual scene plan

### Scene 1 — Two prediction games

CBOW characters surround a masked centre; skip-gram sends messages outward from the centre.

### Scene 2 — Positive and negative magnets

Observed pairs are pulled together while sampled noise pairs are pushed apart.

### Scene 3 — Two passports per word

Each word has a centre-role vector and context-role vector.

### Scene 4 — The context-window dial

Turning the window dial changes neighbours from grammatical substitutes to topical associates.

### Scene 5 — Analogy parallelogram with warning sign

A vector relation works in one region but is labelled as an empirical pattern, not literal symbolic reasoning.

## Common misunderstandings

### “CBOW is an ordinary bag-of-words document model”

It uses a bag-like aggregation of local context to predict a target word.

### “Negative samples are known false facts”

They are sampled noise pairs used by the optimisation objective and can occasionally be plausible or observed elsewhere.

### “Words close in the space are synonyms”

They may be synonyms, syntactic substitutes, topical associates or frequent co-occurrences.

### “Vector arithmetic proves the model understands concepts”

It demonstrates regular geometry for some relations, not general conceptual reasoning.

### “There is one vector table”

The training model distinguishes input and output embeddings.

## Limitations

- one static vector per token;
- limited handling of polysemy;
- local context definition;
- word-level vocabulary and unseen tokens in the basic model;
- corpus and social biases;
- geometry sensitive to hyperparameters;
- no direct representation of sentence meaning;
- basic CBOW discards context order.

## Design patterns extracted

1. **Turn representation learning into a predictive game.**
2. **Define similarity through shared context.**
3. **Use sampling to make large output spaces tractable.**
4. **Recognise that the context window defines the semantics learned.**
5. **Separate role-specific representations during training.**

## Review questions

1. What does CBOW predict?
2. What does skip-gram predict?
3. How are skip-gram training pairs generated?
4. Why are there input and output embeddings?
5. Why is full softmax expensive?
6. What does negative sampling optimise?
7. How does context-window size affect similarity?
8. Why can words in similar contexts become nearby?
9. Why should analogy arithmetic be interpreted cautiously?
10. How do subsampling and noise distribution shape the representation?
11. What information does basic CBOW discard?
12. Why did word2vec scale better than earlier neural language models?

## Experiments

1. Generate skip-gram pairs from a five-sentence corpus.
2. Perform one manual negative-sampling update.
3. Train with different window sizes and compare neighbours.
4. Compare full softmax and negative sampling on a tiny vocabulary.
5. Inspect input versus output embeddings.
6. Add a polysemous token and visualise its compromised static position.
7. Measure how frequency changes vector norm and neighbours.
8. Compare word-level vectors with subword fastText-style composition.
