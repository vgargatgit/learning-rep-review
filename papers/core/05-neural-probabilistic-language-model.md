# A Neural Probabilistic Language Model

## Citation

Yoshua Bengio, Réjean Ducharme, Pascal Vincent and Christian Jauvin. “A Neural Probabilistic Language Model.” *Journal of Machine Learning Research*, 3:1137–1155, 2003.

- Landing page: https://www.jmlr.org/papers/v3/bengio03a.html
- PDF: https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf

## One-sentence contribution

The paper jointly learns a distributed vector for each word and a neural probability model over word sequences, allowing statistical strength to be shared between related contexts.

## Problem: the curse of dimensionality in language

A language model estimates:

```text
P(next word | previous words)
```

An n-gram model treats context largely through exact symbolic matches. The number of possible word sequences grows exponentially with sequence length, so most valid sequences are absent from finite training data.

Example:

```text
The cat is sleeping
The dog is sleeping
```

If `cat` and `dog` are unrelated atomic IDs, evidence from one context does not naturally help the other. A learned distributed representation can place them in related regions and allow parameter sharing.

## Representation before the paper

A word can be represented by a one-hot vector.

Vocabulary:

```text
cat, dog, sleeps, runs
```

One-hot encodings:

```text
cat    = [1, 0, 0, 0]
dog    = [0, 1, 0, 0]
sleeps = [0, 0, 1, 0]
runs   = [0, 0, 0, 1]
```

Properties:

- identity is exact;
- all different words are equally orthogonal;
- dimension grows with vocabulary;
- no similarity is encoded by the vector itself.

## Learned embedding matrix

Let vocabulary size be `V` and embedding dimension be `d`.

```text
C in R^(V × d)
```

The row `C[word_id]` is the word's learned vector.

Equivalent view:

```text
embedding = one_hot(word)^T C
```

In implementation, this is an efficient row lookup rather than dense one-hot multiplication.

## Model structure

For a fixed context of `n-1` words:

```text
word IDs
 -> embedding lookup for each word
 -> concatenate embeddings
 -> hidden transformation
 -> vocabulary-sized scores
 -> softmax probabilities
```

A simplified form:

```text
x = concat(C[w_(t-n+1)], ..., C[w_(t-1)])
h = tanh(Hx + b)
logits = Ux + Wh + c
P(w_t = i | context) = softmax(logits)_i
```

The paper includes a direct linear path from input representation to output and a nonlinear hidden path.

## Why embeddings fight sparsity

Suppose two context vectors are nearby because one contains `cat` and the other contains `dog` in the same position. The same network weights process both. Updating parameters for one context influences predictions for nearby contexts.

This changes generalisation from:

```text
Have I seen this exact sequence?
```

into something closer to:

```text
Have I seen sequences with similar distributed components?
```

The model does not receive a dictionary definition of similarity. Similarity emerges when sharing a representation helps predict words across observed contexts.

## Tiny lookup example

Vocabulary and illustrative embedding table:

| word | e1 | e2 |
|---|---:|---:|
| cat | 0.8 | 0.2 |
| dog | 0.7 | 0.3 |
| car | -0.6 | 0.9 |
| sleeps | 0.1 | -0.7 |

Context:

```text
cat sleeps
```

Concatenated representation:

```text
x = [0.8, 0.2, 0.1, -0.7]
```

Context:

```text
dog sleeps
```

```text
x = [0.7, 0.3, 0.1, -0.7]
```

The contexts are close because the learned `cat` and `dog` vectors are close. This is illustrative; closeness must be learned from the objective.

## Tiny probability calculation

Assume a two-word output vocabulary:

```text
runs, sleeps
```

and hidden representation:

```text
h = [0.6, -0.2]
```

Output weights:

```text
runs:   [0.5, 0.1]
sleeps: [0.2, -0.4]
```

Logits:

```text
logit_runs   = 0.5(0.6) + 0.1(-0.2) = 0.28
logit_sleeps = 0.2(0.6) - 0.4(-0.2) = 0.20
```

Softmax:

```text
P(runs)   = exp(0.28) / (exp(0.28)+exp(0.20)) ≈ 0.520
P(sleeps) ≈ 0.480
```

If the target is `sleeps`, backpropagation changes both output parameters and the embeddings of words in the context. Thus the input representation is trained by a prediction error.

## Distributed representation versus symbolic identity

An embedding vector does not replace symbolic identity in every sense. The row lookup still begins from a discrete word ID. The dense vector supplies a learned continuous representation used by downstream computation.

Important distinctions:

- the ID says which vocabulary entry is present;
- the embedding maps that entry to trainable coordinates;
- the objective determines useful geometry;
- contextual models later make the representation depend on surrounding words.

## Static-representation limitation

This model assigns one embedding row per vocabulary word.

```text
bank in “river bank”
bank in “bank loan”
```

Both begin with the same static vector, although the network's later hidden state can incorporate context. ELMo and BERT later make the token representation itself deeply context-dependent.

## Computational challenge

A full softmax computes a score for every vocabulary item. With large vocabularies this is expensive. Later work introduced:

- hierarchical softmax;
- noise-contrastive estimation;
- negative sampling;
- sampled softmax;
- adaptive softmax;
- subword vocabularies.

These methods alter computational cost and can also affect learned geometry.

## Visual scene plan

### Scene 1 — The exact-match librarian

A librarian refuses to use a sentence about dogs to answer a question about cats because the symbols differ.

### Scene 2 — The embedding neighbourhood

Words move from isolated lockers into a map where task-related words can become neighbours.

### Scene 3 — Shared statistical strength

One training sentence sends learning credit to nearby contexts through shared coordinates and weights.

### Scene 4 — Polysemy problem

The single `bank` character is pulled toward both a river and a finance office, motivating contextual representations.

## Common misunderstandings

### “One-hot encoding is wrong”

It is a correct identity representation and is often the input mechanism for an embedding lookup. Its limitation is that it does not itself encode similarity and is inefficient as a dense vector for large vocabularies.

### “Embedding distance equals semantic similarity”

Distance reflects relationships rewarded by the training objective and present in the corpus.

### “The model discovers dictionary meanings”

It learns predictive regularities, which can mix syntax, semantics, frequency, genre and bias.

### “A word embedding is context-aware”

The learned table is static; later hidden activations depend on context.

## Limitations

- fixed context window;
- large softmax cost;
- static word embeddings;
- vocabulary and out-of-vocabulary problems;
- corpus biases are encoded;
- similarity is objective-dependent;
- nearest-neighbour interpretation can be distorted by frequency and anisotropy.

## Design patterns extracted

1. **Replace isolated symbols with distributed coordinates.**
2. **Learn the input representation jointly with a predictive task.**
3. **Share statistical strength between nearby representations.**
4. **Use lookup tables to make discrete identity trainable.**
5. **Recognise when static identity must become contextual.**

## Review questions

1. Why does the number of possible word sequences create a dimensionality problem?
2. What information does a one-hot vector preserve and omit?
3. How is embedding lookup equivalent to multiplying by a one-hot vector?
4. Why do nearby word vectors support generalisation?
5. What training signal updates the embedding table?
6. Why is similarity task- and corpus-dependent?
7. What is the difference between a static embedding and a contextual hidden state?
8. Why is full softmax expensive?
9. How could corpus bias appear in nearest neighbours?
10. How does this paper connect backpropagation to input-representation learning?

## Experiments

1. Train a tiny neural language model on a synthetic corpus.
2. Inspect word-vector neighbours over training epochs.
3. Replace learned embeddings with fixed random vectors and compare.
4. Compare one-hot linear modelling with a low-dimensional embedding model.
5. Create a polysemous word corpus and inspect the compromise static vector.
6. Add subword composition for unseen words.
