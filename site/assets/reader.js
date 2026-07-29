(() => {
  const allowedDocs = new Set([
    'papers/core/01-backpropagation.md',
    'papers/core/02-variable-and-feature-selection.md',
    'papers/core/03-useful-things-to-know.md',
    'papers/core/04-representation-learning-review.md',
    'papers/core/05-neural-probabilistic-language-model.md',
    'papers/core/06-word2vec.md',
    'papers/core/07-entity-embeddings.md',
    'papers/core/08-deep-sets.md',
    'papers/core/09-geometric-deep-learning.md',
    'papers/README.md',
    'experiments/README.md',
    'docs/design-patterns.md',
    'docs/reading-roadmap.md',
    'docs/pedagogical-framework.md',
    'docs/representation-checklist.md',
    'README.md',
    'PROJECT_STATUS.md'
  ]);

  const params = new URLSearchParams(window.location.search);
  const requested = params.get('doc') || 'papers/core/01-backpropagation.md';
  const doc = allowedDocs.has(requested) ? requested : 'papers/core/01-backpropagation.md';
  const content = document.getElementById('reader-content');
  const toc = document.getElementById('reader-toc');
  const search = document.getElementById('reader-search');
  let originalHtml = '';

  document.querySelectorAll('[data-doc]').forEach(link => {
    if (link.dataset.doc === doc) link.classList.add('active');
  });

  const slugify = (text, used) => {
    const base = text.toLowerCase().trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') || 'section';
    let slug = base;
    let count = 2;
    while (used.has(slug)) slug = `${base}-${count++}`;
    used.add(slug);
    return slug;
  };

  const rewriteRelativeLinks = () => {
    content.querySelectorAll('a[href]').forEach(anchor => {
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || /^(https?:|mailto:)/i.test(href)) return;
      const normalised = href.replace(/^\.\//, '');
      if (allowedDocs.has(normalised)) {
        anchor.href = `reader.html?doc=${encodeURIComponent(normalised)}`;
      }
    });
  };

  const buildToc = () => {
    toc.innerHTML = '';
    const used = new Set();
    const headings = [...content.querySelectorAll('h2, h3')];
    headings.forEach(heading => {
      heading.id = slugify(heading.textContent, used);
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.dataset.level = heading.tagName === 'H3' ? '3' : '2';
      toc.appendChild(link);
    });
  };

  const typesetMath = () => {
    if (window.MathJax?.typesetPromise) {
      window.MathJax.typesetClear?.([content]);
      window.MathJax.typesetPromise([content]).catch(console.error);
    }
  };

  const highlight = query => {
    content.innerHTML = originalHtml;
    buildToc();
    rewriteRelativeLinks();
    const term = query.trim();
    if (!term) {
      typesetMath();
      return;
    }

    const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safe})`, 'gi');
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'PRE', 'CODE', 'MARK'].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.toLowerCase().includes(term.toLowerCase())
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const wrapper = document.createElement('span');
      wrapper.innerHTML = node.nodeValue.replace(regex, '<mark class="search-hit">$1</mark>');
      node.replaceWith(...wrapper.childNodes);
    });
    typesetMath();
    content.querySelector('mark')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const render = async () => {
    try {
      const response = await fetch(`content/${doc}`, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const markdown = await response.text();
      if (!window.marked) throw new Error('Markdown renderer did not load');

      content.innerHTML = window.marked.parse(markdown, { gfm: true, breaks: false });
      const title = content.querySelector('h1')?.textContent || 'Learning Representations';
      document.title = `${title} · Learning Representations`;
      buildToc();
      rewriteRelativeLinks();
      originalHtml = content.innerHTML;
      typesetMath();
    } catch (error) {
      console.error(error);
      content.innerHTML = `
        <h1>Guide unavailable</h1>
        <p>The requested document could not be loaded. Return to the <a href="./">project overview</a> or open the source repository.</p>
      `;
      originalHtml = content.innerHTML;
    }
  };

  let timer;
  search?.addEventListener('input', event => {
    clearTimeout(timer);
    timer = setTimeout(() => highlight(event.target.value), 180);
  });

  render();
})();
