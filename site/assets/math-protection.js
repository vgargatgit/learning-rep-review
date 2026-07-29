((root, factory) => {
  const api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
  root.ReaderMathProtection = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  /**
   * Protect TeX before Markdown parsing.
   *
   * Markdown parsers can reinterpret backslashes, underscores, asterisks,
   * blank lines and dollar delimiters. We replace mathematical expressions
   * with inert HTML placeholders, parse the remaining Markdown, and restore
   * the original TeX as text before asking MathJax to typeset it.
   */
  const protectMath = markdown => {
    const math = [];
    const literalSegments = [];

    const stashLiteral = source => {
      const token = `\uE000LITERAL_${literalSegments.length}\uE001`;
      literalSegments.push({ token, source });
      return token;
    };

    // Code examples may intentionally contain TeX delimiters. Leave them alone.
    let protectedMarkdown = markdown.replace(
      /(^|\n)( {0,3})(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\2\3[^\n]*(?=\n|$)/g,
      match => stashLiteral(match)
    );
    protectedMarkdown = protectedMarkdown.replace(
      /(`+)([^`\n]*?)\1/g,
      match => stashLiteral(match)
    );

    const stashMath = (display, source) => {
      const index = math.length;
      math.push({ display, source: source.trim() });
      if (display) {
        return `\n\n<div class="math-source" data-math-token="${index}" data-display="true"></div>\n\n`;
      }
      return `<span class="math-source" data-math-token="${index}" data-display="false"></span>`;
    };

    protectedMarkdown = protectedMarkdown
      .replace(/\\\[([\s\S]*?)\\\]/g, (_, equation) => stashMath(true, equation))
      .replace(/\$\$([\s\S]*?)\$\$/g, (_, equation) => stashMath(true, equation))
      .replace(/\\\(([\s\S]*?)\\\)/g, (_, equation) => stashMath(false, equation));

    literalSegments.forEach(({ token, source }) => {
      protectedMarkdown = protectedMarkdown.split(token).join(source);
    });

    return { markdown: protectedMarkdown, math };
  };

  return Object.freeze({ protectMath });
});
