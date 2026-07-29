# Backpropagation Visual Scene Plan

This document defines the visual narrative for the paper guide **Learning Representations by Back-Propagating Errors**. It is intended to be used by chapter authors, illustrators, SVG designers and reviewers before final artwork is produced.

The companion production document is [Backpropagation Illustration Brief](backpropagation-illustration-brief.md).

## Purpose

The visual sequence should help a reader build one coherent mental model:

> Values move forward to produce a prediction. Derivative-based sensitivity signals move backward to determine how each parameter affected the error. Repeated updates reshape the hidden representation into something useful for the task.

The scenes are not decorative summaries. Each scene must remove a specific conceptual obstacle that commonly prevents readers from understanding backpropagation.

## Learning outcomes

After following the complete scene sequence, a reader should be able to:

1. distinguish the forward pass from the backward pass;
2. explain why an output-layer parameter has a more direct relationship to the error than a hidden-layer parameter;
3. describe backpropagation as efficient credit assignment through the chain rule;
4. explain that the backward signal is a derivative-based sensitivity, not the raw scalar error;
5. identify the activation entering a weight and the downstream sensitivity as the two local ingredients of a weight gradient;
6. trace one complete numerical update through a tiny network;
7. explain how repeated updates change hidden activations and therefore learn a representation;
8. distinguish backpropagation, which computes gradients, from gradient descent, which uses them;
9. connect the paper to feature engineering through the idea of learned intermediate features.

## Narrative arc

The visual story follows nine stages:

1. a layered machine computes a prediction;
2. the prediction is compared with a target;
3. a wrong prediction creates a credit-assignment problem;
4. output-layer sensitivity is computed directly;
5. hidden influence is shown to be indirect;
6. the chain rule decomposes that indirect influence;
7. downstream sensitivities are combined at hidden units;
8. one tiny numerical example makes every quantity concrete;
9. repeated parameter updates change the hidden representation.

This sequence moves from observable behaviour to local mathematics and finally to the representation-learning interpretation of the paper.

## Conceptual scope

The scene plan covers:

- a feed-forward network with one hidden layer;
- differentiable activations;
- squared error for the pedagogical numerical example;
- scalar and small-vector notation;
- reverse accumulation of derivatives;
- gradient-descent updates;
- task-shaped hidden representations;
- XOR as the motivating nonlinear problem.

It does not attempt to teach:

- automatic differentiation implementation internals;
- matrix-calculus conventions in full generality;
- cross-entropy and softmax derivations;
- recurrent backpropagation through time;
- second-order optimisation;
- biological plausibility;
- modern training practices such as normalisation and residual connections.

Those topics may be linked later, but including them inside this visual arc would weaken the central story.

## Recurring cast

Characters are memory aids, not replacements for technical terminology. Every metaphor must be followed by the precise term in prose or a caption.

### Hana the Hidden Unit

Hana represents a hidden activation and, more broadly, the learned internal representation. She should not be depicted as deciding which human concept to learn. Her behaviour changes because incoming weights, bias, activation function and downstream objective change.

### Gerry the Gradient Courier

Gerry carries derivative-based sensitivity signals backward. His parcels should be labelled with terms such as “local sensitivity” or “downstream influence”, never simply “the error”. This prevents the common misconception that the raw loss value is copied backward unchanged.

### Felix Forward

Felix carries activations and intermediate values from left to right. He visually distinguishes the forward computation from the reverse derivative pass.

### Leo Loss

Leo compares prediction and target and computes the scalar objective. He is a measuring instrument or judge, not an angry character assigning moral blame.

### Coach Chain Rule

Coach Chain Rule explains how a long dependency is decomposed into local derivative factors. The character should appear only where the chain rule is introduced; overusing the character would turn the mathematical mechanism into a vague mascot.

## Visual grammar

### Direction

- Forward values travel left to right.
- Backward sensitivities travel right to left.
- Parameter updates are shown as small rotations or nudges on weight controls, not as another data-flow arrow.

### Colour roles

Use project colours consistently:

- forward values: teal or blue-green;
- backward sensitivities: orange or coral;
- neutral structure and parameters: navy, cream and grey;
- target or ground truth: green accent used sparingly;
- warnings and misconceptions: muted red, not the same orange used for gradients.

Colour must never be the only cue. Arrow direction, line style and labels must also communicate meaning.

### Line roles

- solid teal arrow: a value used by a later computation;
- solid orange arrow: a derivative sensitivity propagated backward;
- thin neutral line: a network connection or dependency;
- circular dial on a line: a trainable weight;
- dashed line: an explanatory correspondence rather than a computation;
- glow around a node: the current activation value, not importance.

### Terminology

Use these terms consistently:

- input;
- pre-activation;
- activation;
- prediction;
- target;
- loss or error function;
- sensitivity;
- gradient;
- parameter update;
- hidden representation.

Avoid using “blame” as the only label. It may appear once as an intuitive question—“Which parameter contributed to the mistake?”—but the answer must use **credit assignment** and **derivative-based sensitivity**.

### Equations and labels

- Equations remain MathJax in the page, outside generated cartoon artwork.
- Computation graphs and architecture diagrams use SVG with editable text.
- Generated illustrations should contain little or no text.
- Necessary labels should be added later as SVG or HTML overlays.
- No mathematical expression should appear in a Markdown heading.

## Scene overview

| Scene | Working title | Core obstacle removed | Primary visual form |
|---:|---|---|---|
| 1 | The prediction machine | Layers feel abstract and disconnected | Cartoon architecture with SVG arrows |
| 2 | The prediction meets the target | Loss appears from nowhere | Cartoon comparison panel |
| 3 | The credit-assignment puzzle | It is unclear why hidden weights are difficult to train | Factory or control-room cartoon |
| 4 | Direct output sensitivity | All parameters seem equally indirect | Focused output-node diagram |
| 5 | The hidden path of influence | Hidden gradients feel arbitrary | Precise computation-graph SVG |
| 6 | The chain-rule relay | The chain rule feels like symbol manipulation | Cartoon relay plus MathJax |
| 7 | Gathering downstream signals | The hidden delta formula is hard to interpret | SVG with multiple backward paths |
| 8 | One complete numerical update | Backpropagation still feels magical | Five-panel worked-example diagram |
| 9 | A representation takes shape | Backpropagation is mistaken for mere output tuning | Before-and-after representation cartoon |

## Scene 1 — The prediction machine

### Teaching purpose

Establish the forward pass as a sequence of local computations. The reader should see that a layer does not “understand” the whole problem; each unit receives values, combines them and emits another value.

### Placement

Place after the historical context and immediately before or beside the network notation.

### Composition

A wide three-stage machine:

1. two or three input tokens enter from the left;
2. hidden units in the centre receive weighted connections;
3. one output unit produces a prediction card on the right.

Felix Forward travels with a small glowing value token. Weight controls are visible on connections but are not yet adjusted.

### Story beats

1. Inputs enter as measured numbers, not as real-world objects.
2. Each connection scales a value.
3. A hidden unit combines its incoming values and applies an activation.
4. The output unit repeats the same pattern and produces a prediction.

### Technical pairing

Follow the image with the forward equations:

\[
\begin{aligned}
a_j &= \sum_i w_{ji}x_i+b_j, \\
h_j &= f(a_j), \\
z_k &= \sum_j v_{kj}h_j+c_k, \\
\hat{y}_k &= f(z_k).
\end{aligned}
\]

The illustration should label the stages with plain terms: input, hidden representation and prediction. The detailed symbols belong in the equation and nearby prose.

### Required accuracy

- The bias must enter the pre-activation, not appear after the activation.
- The activation must occur after weighted summation.
- The prediction is a computed value, not the target.
- Forward arrows must not be reused for gradients.

### Misconceptions prevented

- “A hidden unit receives the answer directly.”
- “The network jumps from input to prediction in one opaque operation.”
- “The target is part of the forward input during inference.”

### Memory hook

**Values travel forward.**

## Scene 2 — The prediction meets the target

### Teaching purpose

Show where the learning signal originates: the prediction is compared with a target through an explicit objective.

### Placement

Immediately after Scene 1 and before the chain-rule discussion.

### Composition

Leo Loss stands between two cards:

- prediction card from the network;
- target card from the dataset.

A measuring gauge displays the discrepancy. The scene should look like measurement, not punishment.

### Story beats

1. The network produces a prediction without yet knowing whether it is good.
2. Training supplies the target.
3. The loss function converts their difference into one scalar quantity.
4. That scalar provides the objective whose derivatives will be computed.

### Technical pairing

For the chapter’s pedagogical example:

\[
E=\frac{1}{2}\sum_k\left(\hat{y}_k-y_k\right)^2.
\]

The factor of one half may be explained in prose as a derivative convenience rather than a deep modelling principle.

### Required accuracy

- The target enters the loss comparison, not the predictive computation.
- The scene must not imply that a small loss guarantees generalisation.
- The displayed objective must match the later numerical example.

### Misconceptions prevented

- “The error is another neuron in the forward network.”
- “The network is directly told the correct hidden features.”
- “Learning begins before an objective is defined.”

### Memory hook

**The objective measures the mistake.**

## Scene 3 — The credit-assignment puzzle

### Teaching purpose

Motivate backpropagation before presenting formulas. The reader should understand why a wrong output does not immediately tell every internal parameter how to change.

### Placement

Open the central backpropagation section.

### Composition

A small factory or control room with several adjustable stations contributes to one final product. The final product fails inspection. Every station asks how much its local setting affected the result.

The stations correspond visually to:

- an input-to-hidden weight;
- a hidden bias;
- a hidden activation;
- a hidden-to-output weight;
- an output activation.

### Story beats

1. The final result is wrong.
2. Many earlier settings contributed through a chain of computation.
3. Changing every parameter equally would ignore their different influences.
4. We need an efficient procedure for assigning credit according to sensitivity.

### Required wording

Use the intuitive question:

> How much did a small change in this parameter affect the final loss?

Then name the precise answer:

> Its gradient is the local measure of that influence.

### Required accuracy

- Do not depict gradients as moral blame.
- Do not imply that one neuron alone “caused” the prediction.
- Do not imply that exhaustive trial-and-error is the algorithm used.

### Misconceptions prevented

- “All weights receive the same correction.”
- “Backpropagation searches every possible weight change.”
- “Hidden units need labelled target features.”

### Memory hook

**Learning requires credit assignment.**

## Scene 4 — Direct output sensitivity

### Teaching purpose

Establish the base case for reverse accumulation. The output unit is closest to the objective, so its sensitivity can be computed directly from prediction error and activation slope.

### Placement

Immediately before the hidden-unit derivation.

### Composition

A close-up of one output unit connected to Leo Loss. Gerry receives a sensitivity note directly from the loss measurement and carries it to the output pre-activation.

The visual should show two ingredients:

1. discrepancy between prediction and target;
2. local slope of the output activation.

### Technical pairing

\[
\delta_k
=
\frac{\partial E}{\partial z_k}
=
\left(\hat{y}_k-y_k\right)f'(z_k).
\]

### Required accuracy

- The signal is the derivative with respect to the pre-activation.
- The activation derivative must be present unless the output operation is explicitly the identity.
- The raw loss value itself is not shown travelling backward.

### Misconceptions prevented

- “Backpropagation sends the scalar loss backward.”
- “The output gradient is only prediction minus target in every architecture.”
- “Activation derivatives matter only in hidden layers.”

### Memory hook

**At the output, discrepancy meets local slope.**

## Scene 5 — The hidden path of influence

### Teaching purpose

Show why a hidden parameter’s influence is indirect and must be traced through later computations.

### Placement

This is the signature diagram of the chapter and belongs beside the first hidden-weight chain-rule equation.

### Composition

Use a precise SVG computation graph rather than a fully cartoon-generated image. The graph should show:

- hidden weight;
- hidden pre-activation;
- hidden activation;
- output pre-activation;
- prediction;
- loss.

Teal arrows move forward. Orange arrows trace the reverse derivative path. Each reverse edge has a short local-derivative label.

### Story beats

1. A hidden weight changes a hidden pre-activation.
2. That changes the hidden activation.
3. The changed activation alters downstream pre-activations.
4. Those alter predictions.
5. Predictions alter the loss.
6. The chain rule multiplies the local sensitivities along this dependency path.

### Technical pairing

\[
\frac{\partial E}{\partial w_{ji}}
=
\frac{\partial E}{\partial a_j}
\frac{\partial a_j}{\partial w_{ji}}.
\]

Because

\[
\frac{\partial a_j}{\partial w_{ji}}=x_i,
\]

we obtain

\[
\frac{\partial E}{\partial w_{ji}}=\delta_jx_i.
\]

### Required accuracy

- The graph must distinguish values from derivatives.
- Reverse arrows represent derivative accumulation, not a second forward computation.
- A branch to multiple output units must be addressed in Scene 7 rather than silently omitted from the general explanation.

### Misconceptions prevented

- “The hidden weight is directly compared with the target.”
- “The chain rule is an arbitrary formula added after the fact.”
- “Backward arrows transport activations in reverse.”

### Memory hook

**Follow the dependency path backward.**

## Scene 6 — The chain-rule relay

### Teaching purpose

Turn the chain rule from abstract symbolic multiplication into a local-composition principle while preserving mathematical correctness.

### Placement

After the computation graph and before the hidden-delta formula.

### Composition

A relay race with three or four short stages. Each runner represents a local derivative. Coach Chain Rule explains that no runner needs to understand the complete route; each supplies one local conversion factor.

A parallel inset should map the metaphor back to the computation graph:

- change in weight;
- change in pre-activation;
- change in later activation;
- change in loss.

### Story beats

1. A tiny parameter change begins at one end.
2. Each local operation converts an incoming change into an outgoing change.
3. Multiplying these local rates gives the total influence.
4. Reverse accumulation reuses intermediate values from the forward pass.

### Required accuracy

- The relay metaphor must show multiplication or composition, not addition along a single path.
- When several downstream paths merge, their contributions are summed; introduce that explicitly in Scene 7.
- The local derivative depends on the forward-pass value at that operation.

### Misconceptions prevented

- “Every layer receives the same gradient.”
- “The chain rule requires a global formula known by every unit.”
- “Backpropagation is unrelated to ordinary calculus.”

### Memory hook

**Global influence is built from local sensitivities.**

## Scene 7 — Gathering downstream signals

### Teaching purpose

Explain the hidden-unit sensitivity when one hidden unit influences multiple outputs.

### Placement

Beside the hidden-delta equation.

### Composition

Hana connects to several output units. Orange sensitivity parcels return along every outgoing connection. Each parcel is scaled by its connection weight before reaching Hana. Hana combines the returned contributions and then applies her local activation slope.

The final combined signal leaves Hana toward her incoming weights.

### Technical pairing

\[
\delta_j
=
f'(a_j)\sum_k v_{kj}\delta_k.
\]

The scene should visually separate:

1. summing contributions from downstream paths;
2. multiplying by the local activation derivative.

### Required accuracy

- Contributions from distinct downstream paths are added.
- Each downstream sensitivity is weighted by the corresponding outgoing weight.
- The local activation derivative is applied once at the hidden pre-activation.
- A negative outgoing weight can reverse a contribution’s sign; do not label every parcel as “increase”.

### Misconceptions prevented

- “A hidden unit listens only to the largest output error.”
- “Outgoing weights matter only during the forward pass.”
- “The hidden delta is the sum of raw prediction errors.”

### Memory hook

**Gather downstream influence, then apply local slope.**

## Scene 8 — One complete numerical update

### Teaching purpose

Prove that the algorithm is ordinary, reproducible arithmetic. This is the confidence-building scene.

### Placement

Inside the small numerical example section.

### Composition

Use a five-panel horizontal sequence on desktop and vertically stacked cards on mobile.

#### Panel A — Starting state

Show the one-input, one-hidden-unit, one-output-unit network and the parameter table:

- input value one;
- target value one;
- hidden weight one half;
- output weight one half;
- zero biases;
- sigmoid activation;
- learning rate one tenth.

#### Panel B — Forward to the hidden activation

Show the weighted input, hidden pre-activation and sigmoid output.

#### Panel C — Forward to prediction and loss

Show output pre-activation, prediction and squared error.

#### Panel D — Backward sensitivities

Show output sensitivity first, followed by the hidden sensitivity. Orange arrows should reverse the exact path used by the forward values.

#### Panel E — Parameter update

Show each weight dial moving by a small amount and display old and new values in a compact table.

### Required accuracy

Use the same rounded numerical values as the chapter text. Do not recompute with different rounding in the illustration. The exact equations remain MathJax below or beside the panels; the illustration should show only short labels and values.

### Misconceptions prevented

- “Backpropagation is a heuristic without exact arithmetic.”
- “The hidden gradient is guessed.”
- “The update replaces a weight with the gradient.”
- “The learning rate is part of gradient computation rather than the update rule.”

### Memory hook

**Forward values, backward sensitivities, small update.**

## Scene 9 — A representation takes shape

### Teaching purpose

Return to the paper’s title. Backpropagation matters because it allows hidden layers to learn task-useful representations, not merely because it changes output weights.

### Placement

Open the representation-interpretation section or serve as the chapter’s concluding scene.

### Composition

A before-and-after two-part scene based on XOR.

#### Before learning

The four XOR examples appear in the original input space. A straight fence cannot separate the two classes.

#### After learning

Hana’s workshop transforms each example into hidden coordinates. In the hidden-representation space, a simple output boundary separates the examples.

A smaller inset shows multiple hidden units jointly representing an example, preventing the impression that one human-readable concept must belong to one neuron.

### Story beats

1. The raw coordinates make the task difficult for a linear output rule.
2. Training changes hidden weights.
3. Hidden activations become new coordinates.
4. The output task becomes easier in those coordinates.
5. The learned representation may be distributed and need not match human-named concepts.

### Technical pairing

\[
h=f(Wx+b).
\]

Explain that the objective shapes this transformation indirectly through gradients.

### Required accuracy

- Do not claim that every trained network finds the same hidden coordinates.
- Do not depict a hidden unit as permanently assigned to a clean concept.
- Do not imply that backpropagation guarantees an optimal representation.
- The output separator should be simple only after the transformation, not magically curved in the original space.

### Misconceptions prevented

- “Backpropagation only tunes the final layer.”
- “A useful feature must have a human-assigned name.”
- “Hidden representations are unique.”
- “The input representation no longer matters once hidden layers exist.”

### Memory hook

**Learning changes the map, not only the final answer.**

## Optional bridge scenes

These scenes are useful for the wider curriculum but should remain optional inserts so the central paper narrative stays focused.

### The fading message

Show the backward sensitivity shrinking as it repeatedly passes through derivatives smaller than one. This introduces vanishing gradients and provides a bridge to initialisation, activation choice, normalisation and residual connections.

### The exploding message

Show repeated factors larger than one making the sensitivity unstable. Pair it with the idea of clipping or architectural control, without turning this chapter into a modern optimisation survey.

### Two feature workshops

Place a human feature engineer beside Hana’s learned-feature workshop. Both create transformations, but one is designed from domain knowledge and the other is adjusted through task loss. This connects the paper to the feature-selection guide.

### Same predictions, different hidden maps

Show two networks that produce the same outputs while using rotated or permuted hidden coordinates. This prepares the reader for basis dependence and representation-comparison methods.

## Chapter integration plan

Recommended placement in the existing paper guide:

| Guide section | Visual asset |
|---|---|
| Historical context and problem | Scene 9 before-learning half or a compact XOR failure inset |
| Network and notation | Scene 1 |
| Loss introduction | Scene 2 |
| Central chain-rule idea | Scenes 3, 5 and 6 |
| Output and hidden sensitivities | Scenes 4 and 7 |
| Small numerical example | Scene 8 |
| Representation interpretation | Scene 9 complete |
| Limitations | Optional fading-message scene |

Do not place all nine scenes together in one gallery. They should appear near the conceptual obstacle they solve.

## Asset strategy

### Cartoon assets

Use character-driven illustrations for:

- prediction and target comparison;
- credit assignment;
- chain-rule relay;
- final representation transformation;
- optional feature-engineering comparison.

### SVG assets

Use hand-authored SVG for:

- network structure and direction labels;
- computation graph;
- hidden-unit downstream aggregation;
- XOR coordinate plots;
- numerical update panels where exact values must remain editable.

### MathJax assets

Keep all general equations and derivations in MathJax. Never rasterise them into generated images.

### Tables and callouts

Use HTML or Markdown tables for parameter lists and old-versus-new values. Use styled callouts for misconception warnings.

## Production order

Produce assets in this order:

1. Scene 5 computation graph, because it establishes the visual language for forward and backward paths.
2. Scene 7 hidden-signal aggregation, because it extends the same grammar.
3. Scene 8 numerical update, because it validates notation and rounding.
4. Scene 1 prediction machine, using the established architecture style.
5. Scene 9 representation transformation and XOR plots.
6. Scenes 2, 3, 4 and 6 as character-driven explanatory illustrations.
7. Optional bridge scenes only after the core chapter is reviewed.

This order reduces the risk that attractive cartoons are produced before the technical diagram language is stable.

## Review checklist

A scene is ready for integration only when all applicable checks pass.

### Concept checks

- [ ] The scene teaches one primary idea.
- [ ] The caption names the precise technical concept.
- [ ] Forward values and backward sensitivities are visually distinct.
- [ ] Raw error is not shown as the object propagated backward.
- [ ] Backpropagation and gradient descent are not conflated.
- [ ] The hidden representation is shown as task-shaped and potentially distributed.

### Mathematical checks

- [ ] Symbol names agree with the paper guide.
- [ ] Biases and activation functions appear in the correct order.
- [ ] Branching paths sum their gradient contributions.
- [ ] Weight gradients use the sending activation and receiving sensitivity.
- [ ] Numerical values match the independently checked calculation.
- [ ] Equations remain outside headings and generated artwork.

### Visual checks

- [ ] Colour is not the only carrier of meaning.
- [ ] Important arrows remain legible on mobile.
- [ ] Labels are editable text, not vector outlines.
- [ ] No generated image contains unreliable mathematical text.
- [ ] Every SVG has a title, description and responsive view box.
- [ ] Every embedded image has useful alternative text.
- [ ] The scene still makes sense in greyscale.

### Narrative checks

- [ ] The scene connects naturally to the preceding prose.
- [ ] A later scene does not require knowledge not yet introduced.
- [ ] Metaphors are translated back into technical language.
- [ ] Characters remain visually and conceptually consistent.
- [ ] The final scene returns to representation learning, not only optimisation.

## Definition of done

The backpropagation visual sequence is complete when:

1. all nine core scenes have approved briefs;
2. the three precision-critical SVGs have been reviewed against the equations;
3. the numerical scene has an automated arithmetic test;
4. mobile and dark-mode previews have been checked;
5. captions and alternative text are final;
6. each asset is integrated at the relevant point in the paper guide;
7. no scene introduces a contradiction with the prose or notation;
8. the reader can explain the complete forward, backward and update cycle using the scenes alone.
