# Backpropagation Illustration Brief

This document converts the [Backpropagation Visual Scene Plan](backpropagation-scene-plan.md) into a shot-by-shot production specification. It is written for an illustrator, SVG author, layout designer or image-generation workflow.

The brief deliberately separates:

- conceptual cartoon artwork;
- exact diagrams and plots;
- equations rendered by MathJax;
- labels added as editable SVG or HTML text.

Generated images must not be trusted to render equations, symbols or long labels accurately.

## Delivery package

The proposed asset directory is:

```text
assets/backpropagation/
├── characters/
│   ├── hana-hidden-unit.svg
│   ├── gerry-gradient-courier.svg
│   ├── felix-forward.svg
│   ├── leo-loss.svg
│   └── coach-chain-rule.svg
├── scenes/
│   ├── bp-01-prediction-machine.svg
│   ├── bp-02-prediction-target.webp
│   ├── bp-03-credit-assignment.webp
│   ├── bp-04-output-sensitivity.svg
│   ├── bp-05-hidden-influence.svg
│   ├── bp-06-chain-rule-relay.webp
│   ├── bp-07-downstream-signals.svg
│   ├── bp-08-numerical-update.svg
│   └── bp-09-representation-takes-shape.svg
├── optional/
│   ├── bp-a-fading-gradient.webp
│   ├── bp-b-exploding-gradient.webp
│   ├── bp-c-two-feature-workshops.webp
│   └── bp-d-equivalent-hidden-maps.svg
└── scene-manifest.yml
```

Use SVG whenever exact arrows, labels, values or geometry matter. Use WebP for character-heavy artwork with little text. A generated raster illustration may be composed inside an SVG wrapper if editable labels and directional arrows must be added later.

## Global art direction

### Tone

- Friendly and curious, not childish.
- Clear enough for a senior engineer learning the underlying mathematics.
- Cartoon characters serve as memory anchors while terminology remains exact.
- Avoid superhero, magic or mystical imagery. Backpropagation should feel mechanical and understandable.

### Visual style

- Clean editorial cartoon style.
- Rounded shapes and restrained expressions.
- Cream paper-like background matching the site.
- Navy outlines and text.
- Teal forward signals and coral backward sensitivities.
- Sparse texture; avoid noisy shading.
- Moderate depth through soft shadows, not photorealism.
- Consistent three-quarter or front-facing character construction.

### Project colour tokens

Approximate the site palette:

| Role | Suggested colour |
|---|---|
| Ink and outlines | `#17233c` |
| Forward values | `#1f7a76` |
| Backward sensitivities | `#e65d39` |
| Warm highlight | `#f8d9ca` |
| Paper background | `#f7f4ed` |
| Surface card | `#fffdf8` |
| Neutral line | `#d7d0c2` |

These values may be adjusted for contrast, but the semantic mapping must remain consistent.

### Character continuity

#### Hana the Hidden Unit

- Shape language: rounded hexagon or circular processing station.
- Distinguishing feature: small central activation gauge.
- Expression: attentive and thoughtful.
- Role: receives weighted inputs, emits an activation and later receives backward sensitivity.
- Never depict Hana as choosing a named concept by intention.

#### Gerry the Gradient Courier

- Shape language: small courier with coral satchel or parcels.
- Distinguishing feature: arrows on the satchel pointing backward.
- Role: carries derivative sensitivities from later operations to earlier ones.
- Parcels may say “sensitivity” or use a derivative symbol added as editable text.
- Never label Gerry’s parcel simply “error”.

#### Felix Forward

- Shape language: fast messenger carrying teal glowing tokens.
- Distinguishing feature: right-pointing arrow badge.
- Role: moves activations from earlier to later operations.

#### Leo Loss

- Shape language: measuring desk, gauge or referee with two comparison cards.
- Distinguishing feature: balance scale or discrepancy meter.
- Role: turns prediction-target discrepancy into an objective value.

#### Coach Chain Rule

- Shape language: calm coach with relay baton diagram.
- Distinguishing feature: multiplication sign and connected local stages on a clipboard.
- Role: appears only in the chain-rule scene.

### Typography and labels

- Use the site’s sans-serif family for diagram labels.
- Use no more than five words in any in-image label.
- Keep equations outside generated raster art.
- Use editable text elements in SVG.
- Provide a text-free version of every generated illustration when practical.
- Use sentence case rather than all capitals.

### Accessibility

- Every SVG must include `title` and `desc` elements.
- All colour-coded paths must also differ by direction, arrowhead or line style.
- Body labels should remain at least 16 pixels at the intended desktop display size.
- Check contrast against both light and dark page surfaces.
- Avoid placing essential information solely in facial expressions.

## Asset manifest fields

Each asset entry in `scene-manifest.yml` should include:

```yaml
id: bp-01
file: scenes/bp-01-prediction-machine.svg
format: svg
status: planned
chapter_section: Network and notation
learning_objective: Distinguish inputs, hidden activations and prediction during the forward pass.
alt_text: "..."
mobile_strategy: stack
source: original
reviewers:
  mathematical: pending
  visual: pending
```

## Scene 1 production brief

### Asset identity

- ID: `bp-01`
- Working title: The prediction machine
- File: `scenes/bp-01-prediction-machine.svg`
- Preferred form: SVG with small character illustrations embedded or drawn as vectors
- Aspect ratio: approximately 16:9 on desktop
- Mobile behaviour: convert three horizontal stages into a vertical stack

### Learning objective

Show that the forward pass is a sequence of local transformations from input to hidden representation to prediction.

### Shot composition

#### Establishing shot

A three-stage machine spans the frame:

1. input dock on the left;
2. hidden workshop in the middle;
3. prediction window on the right.

Two input tokens enter the first dock. Felix Forward carries teal value tokens along connections with visible weight dials. Hana receives the weighted values, combines them and emits a new token. The final output unit produces a prediction card.

#### Detail inset

A small inset zooms into one hidden unit:

- incoming values;
- weight dials;
- summation bowl;
- bias token;
- activation gate;
- outgoing activation.

The inset uses plain labels only. The full equations appear in the surrounding page.

### Editable labels

- Input
- Weighted sum
- Bias
- Activation
- Hidden representation
- Prediction

### Do not include

- target value;
- loss gauge;
- backward arrows;
- equations inside the artwork;
- brains, magic sparkles or vague “AI” imagery.

### Alt text

A layered neural-network machine carries input values from left to right through weighted connections and a hidden activation before producing a prediction. Forward values are shown with teal arrows.

### Generation-ready art prompt

Create a clean editorial cartoon illustration on a warm cream background showing a three-stage neural-network machine. On the left, two simple numeric input tokens enter. In the centre, a friendly rounded hidden-unit character combines incoming signals using visible adjustable weight dials and an activation gate. On the right, an output station produces a prediction card. A small messenger carries glowing teal value tokens from left to right. Use navy outlines, restrained flat shading, rounded forms and ample whitespace. No mathematical equations, no long text, no photorealism, no futuristic holograms, no backward arrows.

### Post-generation overlay

Add the exact arrows, labels and weight dials in SVG after the character art is approved.

## Scene 2 production brief

### Asset identity

- ID: `bp-02`
- Working title: The prediction meets the target
- File: `scenes/bp-02-prediction-target.webp`
- Preferred form: character-driven raster illustration with HTML or SVG labels
- Aspect ratio: 4:3
- Mobile behaviour: preserve central comparison; stack cards vertically if necessary

### Learning objective

Show that training obtains a scalar objective by comparing prediction with target.

### Shot composition

Leo Loss stands at a comparison desk. The prediction card arrives from the left. The target card is supplied from a separate labelled dataset tray. Leo places them on a discrepancy gauge. A small scalar loss token emerges below the gauge.

The target tray must be visually separate from the network’s inference path.

### Editable labels

- Prediction
- Target
- Loss
- Compare

### Story detail

Leo’s expression should be neutral and analytical. Avoid an angry judge or punishment metaphor. The loss is a measurement used for learning.

### Do not include

- hidden-layer target labels;
- gradient arrows yet;
- statements that the target is visible during inference;
- a green tick or red cross as the only explanation.

### Alt text

A measuring character compares a network prediction with a target from the training data and produces one scalar loss value.

### Generation-ready art prompt

Create a friendly editorial cartoon on a cream paper background. A neutral measurement character stands behind a desk with two cards, one arriving from a neural network and one from a separate training-data tray. The cards are compared on a simple gauge, and a small scalar result token appears below. Use navy outlines, muted teal for the prediction path and a restrained green accent for the target. The mood is analytical rather than punitive. Minimal text, no equations, no red error alarm, no photorealism.

## Scene 3 production brief

### Asset identity

- ID: `bp-03`
- Working title: The credit-assignment puzzle
- File: `scenes/bp-03-credit-assignment.webp`
- Preferred form: wide cartoon scene
- Aspect ratio: 16:9
- Mobile behaviour: crop to the central three stations with remaining stations shown below as small cards

### Learning objective

Motivate why a final loss does not immediately specify how each internal parameter should change.

### Shot composition

A compact production line contains several adjustable stations. The final product reaches Leo’s inspection desk and does not match the target specification. Workers at earlier stations look at their local dials and ask how much each setting influenced the mismatch.

The visual should show dependency without assigning one culprit.

### Editable callout

> How much did a small change here affect the final loss?

This callout should be overlaid in HTML or SVG, not generated into the image.

### Key visual cues

- several adjustable dials;
- one final measured discrepancy;
- a continuous dependency path through the stations;
- no parameter highlighted as uniquely responsible;
- a faint question mark above each local station.

### Do not include

- police, courtroom or moral blame imagery;
- all weights receiving identical arrows;
- exhaustive trial of every possible setting;
- hidden units receiving the correct answer directly.

### Alt text

Several adjustable processing stations contribute to a final prediction. When the result differs from the target, each station needs a measure of how its local setting influenced the final loss.

### Generation-ready art prompt

Create a wide educational cartoon of a small processing line with several adjustable stations contributing to one final output. At the end, a neutral measuring desk compares the output with a target and finds a discrepancy. Earlier stations look at their own dials and wonder how much they contributed. The scene should communicate shared causal influence rather than guilt. Warm cream background, navy outlines, restrained teal process path, rounded editorial style, minimal text, no equations, no courtroom, no police, no dramatic alarm.

## Scene 4 production brief

### Asset identity

- ID: `bp-04`
- Working title: Direct output sensitivity
- File: `scenes/bp-04-output-sensitivity.svg`
- Preferred form: SVG
- Aspect ratio: 3:2
- Mobile behaviour: vertical layout

### Learning objective

Show the output sensitivity as the combination of prediction discrepancy and local activation slope.

### Shot composition

A focused diagram contains:

- output pre-activation node;
- activation gate;
- prediction node;
- target card;
- loss node.

A coral reverse arrow begins at the loss and travels to the output pre-activation. Two small labelled contributors feed the sensitivity card:

- discrepancy;
- local slope.

Gerry may appear beside the arrow, but the diagram must remain mathematically precise without the character.

### Editable labels

- Prediction discrepancy
- Local slope
- Output sensitivity
- Forward value
- Backward sensitivity

### Technical annotation

Place the equation in MathJax outside the SVG. The SVG may show the symbol for output sensitivity as an editable short label if required.

### Do not include

- the raw scalar loss travelling backward;
- a hidden node;
- an update arrow on the parameter;
- the claim that prediction minus target is always the complete output gradient.

### Alt text

A focused computation diagram shows a prediction compared with its target. The discrepancy and the output activation’s local slope combine to form the backward sensitivity at the output pre-activation.

## Scene 5 production brief

### Asset identity

- ID: `bp-05`
- Working title: The hidden path of influence
- File: `scenes/bp-05-hidden-influence.svg`
- Preferred form: exact SVG computation graph
- Aspect ratio: 16:7
- Mobile behaviour: horizontally scrollable diagram with an optional simplified stacked version

### Learning objective

Show that a hidden weight affects the loss through a chain of later computations and that backward sensitivity follows the same dependency graph in reverse.

### Shot composition

Arrange six nodes in a clear horizontal chain:

1. hidden weight;
2. hidden pre-activation;
3. hidden activation;
4. output pre-activation;
5. prediction;
6. loss.

Add the relevant input activation as a smaller node feeding the hidden pre-activation.

Use:

- teal top path for forward values;
- coral bottom path for backward sensitivities;
- neutral connectors for structural dependency;
- local derivative labels on the reverse path.

### Layering

#### Base layer

Nodes and neutral dependencies.

#### Forward layer

Teal arrows with concise value labels.

#### Backward layer

Coral arrows pointing right to left. Each arrow has an editable local-sensitivity label.

#### Explanatory layer

A bracket underneath groups the complete influence path from hidden weight to loss.

### Do not include

- equations converted to paths;
- animated particles in the static version;
- gradients moving left to right;
- target entering the hidden node;
- raw error copied backward.

### Alt text

A computation graph traces how a hidden weight affects the hidden pre-activation, hidden activation, output pre-activation, prediction and final loss. Teal arrows show values moving forward, while coral arrows show derivative sensitivities moving backward through the same dependencies.

### SVG requirements

- meaningful node group IDs;
- title and description elements;
- editable text labels;
- arrow markers defined once and reused;
- no embedded font files;
- CSS classes for forward, backward and neutral paths;
- a view box supporting responsive scaling.

## Scene 6 production brief

### Asset identity

- ID: `bp-06`
- Working title: The chain-rule relay
- File: `scenes/bp-06-chain-rule-relay.webp`
- Preferred form: cartoon plus small SVG overlay
- Aspect ratio: 16:9
- Mobile behaviour: convert race stages into vertically stacked checkpoints

### Learning objective

Explain that total influence is composed from local rates of change.

### Shot composition

A relay course contains several short stages. At each checkpoint, one runner receives an incoming “small change” baton and passes on a scaled change. Coach Chain Rule stands beside a compact diagram mapping checkpoints to operations in the network.

The race should not imply speed or competition as the main idea. The relay is about composition and handoff.

### Editable labels

- Local sensitivity
- Multiply along a path
- Sum across paths
- Total influence

The “sum across paths” note may be shown as a preview leading to Scene 7.

### Do not include

- every runner holding an identical value;
- addition along a single sequential path;
- a single character who somehow knows the whole derivative;
- large equations inside the artwork.

### Alt text

A relay metaphor shows several local derivative stages passing a small change from one operation to the next. Multiplying the local sensitivities gives the total influence along the dependency path.

### Generation-ready art prompt

Create an educational editorial cartoon of a relay course with four short connected checkpoints. At each checkpoint, a runner receives a small change baton and passes a scaled baton to the next stage. A calm coach points to a simple network dependency map. The visual should communicate composition of local sensitivities, not athletic competition. Warm cream background, navy outlines, coral accents for the backward direction, ample whitespace, no equations, no long labels, no photorealism.

## Scene 7 production brief

### Asset identity

- ID: `bp-07`
- Working title: Gathering downstream signals
- File: `scenes/bp-07-downstream-signals.svg`
- Preferred form: SVG with optional Hana character inset
- Aspect ratio: 4:3
- Mobile behaviour: vertical fan-in

### Learning objective

Explain that a hidden unit combines sensitivity contributions from every downstream path, weighted by the outgoing connections, and then applies its local activation derivative.

### Shot composition

Hana sits on the left. Three output units appear on the right. Teal forward connections fan out from Hana. Coral sensitivity arrows return from each output along the same connections.

Before reaching Hana, each returning arrow passes through a visible outgoing-weight multiplier. The three contributions enter a summation node. The sum then passes through a local-slope gate at Hana.

### Editable labels

- Downstream sensitivity
- Outgoing weight
- Sum contributions
- Local slope
- Hidden sensitivity

### Directional sequence

1. right-side outputs produce downstream sensitivities;
2. each contribution travels left and is scaled by its outgoing weight;
3. contributions are summed;
4. the sum is multiplied by Hana’s local slope;
5. the hidden sensitivity is sent further backward.

### Do not include

- maximum pooling of gradient contributions;
- averaging unless explicitly explained;
- all signs shown as positive;
- the local derivative applied separately to every outgoing branch;
- raw prediction errors instead of downstream sensitivities.

### Alt text

Three downstream output sensitivities travel backward through their outgoing weights to one hidden unit. Their weighted contributions are summed and then multiplied by the hidden activation’s local slope to form the hidden sensitivity.

## Scene 8 production brief

### Asset identity

- ID: `bp-08`
- Working title: One complete numerical update
- File: `scenes/bp-08-numerical-update.svg`
- Preferred form: precise SVG with HTML or MathJax equations outside the asset
- Desktop aspect ratio: approximately 21:9
- Mobile behaviour: five vertically stacked cards

### Learning objective

Make one forward pass, backward pass and weight update fully concrete.

### Global numerical contract

Use exactly the values from the paper guide:

| Quantity | Value |
|---|---:|
| Input | 1 |
| Target | 1 |
| Hidden weight | 0.5 |
| Hidden bias | 0 |
| Output weight | 0.5 |
| Output bias | 0 |
| Activation | sigmoid |
| Learning rate | 0.1 |

Rounded results must match the checked chapter calculation.

### Panel A — Starting state

Show the tiny network and parameter table. No calculations yet.

Visible short labels:

- Start
- Input
- Target
- Hidden weight
- Output weight

### Panel B — Hidden computation

Show input passing through the hidden weight and sigmoid gate. Display only the short numeric results for pre-activation and hidden activation.

### Panel C — Prediction and loss

Show hidden activation passing through the output weight and sigmoid gate. Then show prediction compared with target and the resulting loss.

### Panel D — Backward sensitivities

Show output sensitivity first. Then show the hidden sensitivity travelling through the output weight and hidden local slope.

### Panel E — Update

Show two weight dials with old and new values. Include a small note:

> subtract learning rate times gradient

Keep the full update equation in MathJax outside the illustration.

### State colours

- forward computed values: teal;
- backward sensitivities: coral;
- unchanged constants: navy;
- updated values: green accent;
- old values: muted grey.

### Do not include

- more decimal places than the prose;
- a gradient shown as the new weight;
- learning rate applied during sensitivity computation;
- different rounding from the chapter;
- equations baked into raster art.

### Alt text

Five panels trace a tiny one-input neural network through its starting parameters, hidden activation, prediction and loss, backward output and hidden sensitivities, and the resulting small updates to both weights.

### Review requirement

The numbers in this SVG must be generated from or checked against the automated arithmetic test rather than copied manually without verification.

## Scene 9 production brief

### Asset identity

- ID: `bp-09`
- Working title: A representation takes shape
- File: `scenes/bp-09-representation-takes-shape.svg`
- Preferred form: SVG coordinate plots with a light cartoon workshop bridge
- Aspect ratio: 16:9
- Mobile behaviour: stack before and after plots vertically

### Learning objective

Return to the paper’s central contribution: hidden layers learn a task-shaped representation in which a simple output rule can succeed.

### Shot composition

The scene has three zones.

#### Zone A — Original input map

Show four XOR examples at the corners of a square. Same-class examples occupy opposite corners. A character tries and fails to place one straight dividing line.

#### Zone B — Hidden workshop

Hana transforms each input into a new pair of hidden activations. Use a conveyor or map-making metaphor, but preserve the idea that the transformation is learned through repeated parameter updates.

#### Zone C — Hidden-representation map

Show the transformed examples arranged so that one simple straight boundary separates the classes.

A small inset below Zone C shows several hidden-unit activations forming a distributed code for one example.

### Editable labels

- Input space
- Learned transformation
- Hidden space
- Simple output boundary
- Distributed activation pattern

### Required caveat callout

Add a small prose callout outside the SVG:

> The exact hidden coordinates are not unique. Different training runs can learn different internal bases with similar predictions.

### Do not include

- a curved separator in the input plot pretending to be a single linear output unit;
- one hidden neuron labelled as “XOR neuron”;
- a guarantee of convergence or optimality;
- identical hidden coordinates across every trained network;
- a transformation drawn as magic.

### Alt text

The XOR examples cannot be separated by one straight line in the original input space. A learned hidden transformation moves them into new coordinates where a simple straight output boundary succeeds, illustrating representation learning.

## Optional asset briefs

## Optional scene A — The fading message

### Purpose

Introduce vanishing gradients as repeated multiplication by small local derivatives.

### Composition

Gerry begins with a clearly visible coral sensitivity parcel. At each backward checkpoint the parcel becomes smaller and fainter. A side plot shows a sigmoid’s flat region without placing equations inside the art.

### Technical warning

Do not claim gradients always vanish. State that repeated Jacobian factors can shrink, grow or become poorly conditioned depending on values and architecture.

### Suggested file

`optional/bp-a-fading-gradient.webp`

## Optional scene B — The exploding message

### Purpose

Show the complementary instability when repeated factors amplify sensitivity.

### Composition

Gerry’s parcel becomes too large to carry as it passes backward through amplifying checkpoints. Keep the tone explanatory rather than comic disaster.

### Suggested file

`optional/bp-b-exploding-gradient.webp`

## Optional scene C — Two feature workshops

### Purpose

Connect manual feature engineering with learned representation construction.

### Composition

On the left, a human engineer constructs a ratio or interaction from raw variables using domain knowledge. On the right, Hana’s hidden workshop adjusts a transformation through downstream loss. A shared banner says “both change the representation”, while separate labels say “designed” and “learned”.

### Suggested file

`optional/bp-c-two-feature-workshops.webp`

## Optional scene D — Equivalent hidden maps

### Purpose

Show that hidden representations can rotate, permute or otherwise change basis while preserving output behaviour.

### Composition

Two hidden coordinate plots look different but lead to the same output labels. A reversible rotation arrow connects the plots.

### Suggested file

`optional/bp-d-equivalent-hidden-maps.svg`

## Integration captions

Use concise captions that translate the visual metaphor back into technical language.

| Scene | Recommended caption |
|---:|---|
| 1 | A forward pass is a sequence of local weighted transformations that produces a prediction. |
| 2 | The loss function compares prediction with target and defines the objective whose derivatives will be computed. |
| 3 | Credit assignment asks how a small change in each parameter would affect the final loss. |
| 4 | At the output, prediction discrepancy is combined with the activation’s local slope. |
| 5 | A hidden parameter influences loss through a chain of later computations; derivatives follow that dependency graph backward. |
| 6 | The chain rule composes local sensitivities into a total influence along a path. |
| 7 | A hidden unit sums weighted sensitivity contributions from all downstream paths and applies its own local slope. |
| 8 | One training step consists of forward values, backward sensitivities and a small parameter update. |
| 9 | Repeated updates reshape hidden activations into a task-useful representation. |

## Image-generation constraints

For character-heavy scenes generated with an image model:

- generate one scene at a time;
- request no text or only placeholder signs;
- preserve empty areas for later labels;
- maintain the same character reference sheet across scenes;
- keep hands and props simple;
- avoid dense node-and-edge diagrams in raster generation;
- use consistent camera height and outline weight;
- do not ask the model to draw equations;
- do not ask the model to draw exact coordinate plots;
- export at a resolution sufficient for a clean WebP crop;
- retain the original generation metadata privately in the production workflow, not necessarily in the public repository.

For precision diagrams:

- author directly as SVG;
- store labels as text;
- use semantic group IDs;
- keep equations in MathJax outside the asset;
- verify mobile readability;
- use deterministic data for plots;
- include source code if the SVG is generated programmatically.

## Naming and versioning

Use stable semantic filenames rather than version numbers in public references. During production, version through Git commits rather than filenames such as `final-v7`.

Recommended IDs:

| ID | Asset |
|---|---|
| `bp-01` | Prediction machine |
| `bp-02` | Prediction and target |
| `bp-03` | Credit assignment |
| `bp-04` | Output sensitivity |
| `bp-05` | Hidden influence graph |
| `bp-06` | Chain-rule relay |
| `bp-07` | Downstream-signal aggregation |
| `bp-08` | Numerical update |
| `bp-09` | Representation transformation |

## Production review workflow

### First review — Concept thumbnail

Check only:

- composition;
- direction;
- one primary idea;
- consistency with the narrative sequence.

Do not spend time polishing colours before this review passes.

### Second review — Technical overlay

Add:

- exact arrows;
- labels;
- node roles;
- numerical values;
- captions and alternative text.

A mathematical reviewer verifies every dependency and value.

### Third review — Site integration

Check:

- desktop layout;
- mobile stacking or scrolling;
- dark mode;
- text size;
- relationship to nearby MathJax;
- page-load size;
- accessibility metadata.

### Final review — Teaching test

Ask a reader unfamiliar with the derivation to explain:

1. what travels forward;
2. what travels backward;
3. why the hidden signal combines downstream paths;
4. how a weight gradient is formed;
5. how the hidden representation changes through learning.

Any scene that cannot support the intended explanation should be revised even if it is visually attractive.

## Completion checklist

- [ ] Character reference sheet approved.
- [ ] Forward and backward colour grammar approved.
- [ ] All nine core thumbnails approved.
- [ ] Precision SVGs reviewed mathematically.
- [ ] Numerical values checked automatically.
- [ ] Captions approved.
- [ ] Alternative text approved.
- [ ] Mobile behaviour implemented.
- [ ] Dark-mode contrast checked.
- [ ] Assets linked from the paper guide.
- [ ] Source files retained for future correction.
- [ ] No equations or long labels baked into generated raster artwork.
