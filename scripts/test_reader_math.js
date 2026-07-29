'use strict';

const assert = require('node:assert/strict');
const { protectMath } = require('../site/assets/math-protection.js');

const derivative = String.raw`\[
\frac{\partial E}{\partial w_{ji}}
=
\frac{\partial E}{\partial a_j}
\frac{\partial a_j}{\partial w_{ji}}.
\]`;

const source = `The chain rule decomposes the influence:\n\n${derivative}\n\nInline \\(x_i\\).\n\n` +
  '`\\(literal inline-code example\\)`\n\n' +
  '```markdown\n## Gradient \\(literal fenced-code example\\)\n```\n';

const result = protectMath(source);

assert.equal(result.math.length, 2, 'one display and one inline expression should be protected');
assert.equal(result.math[0].display, true);
assert.equal(
  result.math[0].source,
  String.raw`\frac{\partial E}{\partial w_{ji}}
=
\frac{\partial E}{\partial a_j}
\frac{\partial a_j}{\partial w_{ji}}.`,
  'multiline TeX must be preserved byte-for-byte apart from surrounding whitespace'
);
assert.equal(result.math[1].display, false);
assert.equal(result.math[1].source, 'x_i');

assert.match(
  result.markdown,
  /<div class="math-source" data-math-token="0" data-display="true"><\/div>/,
  'display mathematics should become one inert block placeholder'
);
assert.match(
  result.markdown,
  /<span class="math-source" data-math-token="1" data-display="false"><\/span>/,
  'inline mathematics should become one inert inline placeholder'
);
assert.doesNotMatch(result.markdown, /\\frac\{\\partial E\}/, 'TeX must not reach the Markdown parser');
assert.match(result.markdown, /`\\\(literal inline-code example\\\)`/);
assert.match(result.markdown, /## Gradient \\\(literal fenced-code example\\\)/);

const dollarDisplay = protectMath('Before\n\n$$a_b = c_d$$\n\nAfter');
assert.equal(dollarDisplay.math.length, 1);
assert.equal(dollarDisplay.math[0].source, 'a_b = c_d');
assert.doesNotMatch(dollarDisplay.markdown, /\$\$/);

console.log('Reader math-protection regression tests passed.');
