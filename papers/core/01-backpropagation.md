# Learning Representations by Back-Propagating Errors

## Citation

David E. Rumelhart, Geoffrey E. Hinton and Ronald J. Williams. “Learning representations by back-propagating errors.” *Nature* 323, 533–536, 1986.

- Publisher: https://doi.org/10.1038/323533a0
- Published: 9 October 1986

## One-sentence contribution

A multilayer network can learn useful internal features by propagating output error backward through differentiable layers and adjusting each weight according to its contribution to that error.

## Why this paper belongs in a representation project

The paper is often introduced as “the backpropagation paper”, but its title emphasises the deeper point: **hidden units learn representations**. The output layer does not have to solve the task directly in the original input coordinates. Earlier layers can reshape the input into a space where the desired output is easier to compute.

## Historical context

A single-layer perceptron can learn a linear decision boundary. It cannot solve tasks requiring a nonlinear boundary in the supplied feature space, such as XOR. A human could manually construct a new feature, but the paper demonstrates a general procedure for training intermediate units to discover useful features from error signals.

The paper did not invent every mathematical ingredient of reverse-mode differentiation, and related ideas existed earlier. Its historical importance comes from clearly demonstrating practical learning of internal representations in multilayer connectionist networks and making the idea influential.

## The problem before the paper

Suppose a network receives `x1` and `x2` and must compute XOR.

| x1 | x2 | target |
|---:|---:|---:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

No single straight line separates the positive points from the negative points in the original two-dimensional space.

A feature engineer could construct features such as:

```text
OR(x1, x2)
AND(x1, x2)
```

and combine them to form XOR. The learning question is whether hidden units can discover analogous intermediate distinctions automatically.

## Network and notation

For one hidden layer:

```text
input x -> hidden pre-activation a -> hidden activation h
        -> output pre-activation z -> prediction y_hat
```

Let:

- `x_i` be input unit `i`;
- `w_ji` be the weight from input `i` to hidden unit `j`;
- `b_j` be hidden bias;
- `h_j` be hidden activation;
- `v_kj` be the weight from hidden unit `j` to output unit `k`;
- `c_k` be output bias;
- `y_hat_k` be predicted output;
- `y_k` be target;
- `E` be the error function.

Forward pass:

```text
a_j = sum_i(w_ji x_i) + b_j
h_j = f(a_j)

z_k = sum_j(v_kj h_j) + c_k
y_hat_k = f(z_k)
```

For the squared-error form used pedagogically:

```text
E = 1/2 sum_k (y_hat_k - y_k)^2
```

## The central chain-rule idea

A hidden weight does not connect directly to the target. Its effect is indirect:

```text
hidden weight -> hidden pre-activation -> hidden activation
              -> output pre-activation -> prediction -> error
```

The chain rule decomposes the influence:

```text
∂E/∂w_ji = ∂E/∂a_j × ∂a_j/∂w_ji
```

Because:

```text
∂a_j/∂w_ji = x_i
```

we get:

```text
∂E/∂w_ji = delta_j x_i
```

where the hidden error signal is:

```text
delta_j = f'(a_j) sum_k(v_kj delta_k)
```

and the output error signal is:

```text
delta_k = (y_hat_k - y_k) f'(z_k)
```

The update under gradient descent is:

```text
weight <- weight - learning_rate × gradient
```

## Small numerical example

Use one input, one hidden unit and one output unit so every operation is visible.

Parameters:

```text
x = 1
target y = 1
hidden weight w = 0.5
hidden bias b = 0
output weight v = 0.5
output bias c = 0
activation f(t) = sigmoid(t)
learning rate = 0.1
```

### Forward pass

Hidden pre-activation:

```text
a = wx + b = 0.5 × 1 + 0 = 0.5
```

Hidden activation:

```text
h = sigmoid(0.5) ≈ 0.622459
```

Output pre-activation:

```text
z = vh + c = 0.5 × 0.622459 = 0.311230
```

Prediction:

```text
y_hat = sigmoid(0.311230) ≈ 0.577185
```

Squared error:

```text
E = 1/2(0.577185 - 1)^2 ≈ 0.089386
```

### Output gradient

For sigmoid, `f'(z) = y_hat(1-y_hat)`.

```text
delta_output
= (y_hat - y) y_hat(1-y_hat)
≈ (-0.422815)(0.577185)(0.422815)
≈ -0.103158
```

Output-weight gradient:

```text
∂E/∂v = delta_output × h
≈ -0.103158 × 0.622459
≈ -0.064214
```

### Hidden gradient

```text
delta_hidden
= h(1-h) × v × delta_output
≈ 0.622459 × 0.377541 × 0.5 × (-0.103158)
≈ -0.012120
```

Hidden-weight gradient:

```text
∂E/∂w = delta_hidden × x
≈ -0.012120
```

### Update

```text
v_new = 0.5 - 0.1(-0.064214) ≈ 0.506421
w_new = 0.5 - 0.1(-0.012120) ≈ 0.501212
```

Both weights increase slightly, moving the prediction toward the target `1`.

## Representation interpretation

The hidden activation:

```text
h = f(Wx + b)
```

is a learned representation of `x`. Training does not directly tell a hidden unit what concept to encode. The output loss rewards internal transformations that collectively help solve the task.

Important consequences:

1. A hidden unit need not correspond to a human-named concept.
2. A concept can be distributed across many units.
3. One unit can participate in several concepts.
4. The representation is shaped by the task and data.
5. Different random initialisations can learn different internal coordinate systems with similar output behaviour.

## Local versus distributed representation

### Local representation

One unit represents one concept:

```text
unit 7 = “is a triangle”
```

### Distributed representation

A concept is represented by a pattern across units:

```text
triangle -> [0.9, 0.2, 0.7, 0.1]
square   -> [0.8, 0.6, 0.1, 0.2]
```

With `n` binary-like units, many patterns can be represented. Distributed codes allow shared factors and combinatorial reuse, but they are harder to interpret unit by unit.

## Visual scene plan

### Scene 1 — The impossible fence

A classifier tries to divide four XOR houses using one straight fence and fails.

### Scene 2 — The hidden-unit workshop

Hana the Hidden Unit receives the coordinates and stamps each example with newly learned properties.

### Scene 3 — The gradient courier

Gerry carries a message backward from the mistaken output. At every connection, the message is multiplied by local sensitivity.

### Scene 4 — New map, easy boundary

The four inputs are shown again in hidden-representation space, where a simple output boundary succeeds.

### Scene 5 — Team representation

Several hidden units jointly encode a pattern; no single unit owns the whole concept.

## Main claims to verify while reading

- Hidden units develop features useful for the task.
- The gradient for a hidden unit is computable by recursively combining downstream error signals.
- Shared hidden representations can capture regularities in the training data.
- The method applies to differentiable networks with multiple layers.

## Common misunderstandings

### “Backpropagation is gradient descent”

Backpropagation efficiently computes gradients. Gradient descent is one method that uses those gradients to update parameters.

### “The error itself is sent backward”

What propagates backward is a derivative-based sensitivity signal, not the raw scalar error copied unchanged.

### “Each hidden neuron learns a clean human feature”

Hidden features can be distributed, entangled and basis-dependent.

### “Backpropagation guarantees the best representation”

It finds parameters according to an objective and optimiser; results depend on data, architecture, initialisation and optimisation dynamics.

### “The input representation no longer matters”

Backpropagation can learn transformations, but poor scaling, missing information, leakage, incorrect invariance or inappropriate structure can still make learning unreliable or impossible.

## Limitations and assumptions

- Differentiable operations or suitable surrogate gradients are needed.
- Credit signals can shrink, grow or become poorly conditioned across many layers.
- Optimisation is non-convex.
- The learned representation is only as good as the objective and data signal.
- The paper predates modern practices such as ReLU, normalisation, residual connections, large-scale accelerators and automatic differentiation libraries.
- Hidden representations may capture shortcuts or biases rather than intended concepts.

## Modern descendants

- automatic differentiation systems;
- convolutional representation learning;
- recurrent and transformer networks;
- residual networks;
- self-supervised pretraining;
- end-to-end multimodal systems;
- differentiable programming more generally.

## Design patterns extracted

1. **Learn the feature transformation jointly with the task.**
2. **Use local derivatives to assign global credit.**
3. **Change coordinates before applying a simple decision rule.**
4. **Reuse intermediate factors across outputs.**
5. **Treat the objective as the teacher of the representation.**

## Review questions

1. Why can a single-layer perceptron not solve XOR in the original coordinates?
2. What is the difference between the forward activation and the backward error signal of a hidden unit?
3. Why does the hidden delta contain downstream weights?
4. Why does the weight gradient include the sending unit's activation?
5. How does a hidden layer act as a learned feature constructor?
6. What does it mean for a representation to be distributed?
7. Why can two networks with identical predictions have different hidden units?
8. Which parts of backpropagation are specific to neural networks, and which are general chain-rule differentiation?
9. What input-design problems cannot be repaired by simply adding more hidden layers?
10. How would target leakage alter the representation learned by backpropagation?

## Experiments

1. Train logistic regression on XOR and show failure.
2. Add one manually constructed interaction feature and show success.
3. Train a two-layer neural network and plot hidden activations.
4. Compare different random seeds and align/compare their hidden spaces.
5. Freeze the hidden layer and train a linear probe.
6. Corrupt one input feature with scale imbalance and observe optimisation.
7. Add a shortcut feature and see whether the hidden representation uses it.
