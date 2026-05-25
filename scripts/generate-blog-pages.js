import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');

// Inline site styles matching the Calibrated AM design system
const STYLES = `
  *, ::before, ::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-smooth; -webkit-text-size-adjust: 100%; }
  body {
    font-family: Inter, system-ui, -apple-system, sans-serif;
    background: #333333;
    color: #E0E0E0;
    line-height: 1.625;
    -webkit-font-smoothing: antialiased;
  }
  a { color: #FFCC00; text-decoration: none; }
  a:hover { text-decoration: underline; }
  header { background: #1A1F2E; border-bottom: 1px solid #4A4A4A; }
  header .nav-inner {
    max-width: 720px; margin: 0 auto; padding: 14px 24px;
    display: flex; align-items: center; justify-content: space-between;
  }
  header .brand { font-weight: 700; font-size: 18px; color: #E0E0E0; }
  header .brand span { color: #FFCC00; }
  header nav a { color: #E0E0E0; font-size: 13px; margin-left: 20px; font-weight: 500; }
  header nav a:hover { color: #FFCC00; text-decoration: none; }
  main { max-width: 720px; margin: 0 auto; padding: 40px 24px 60px; }
  .label { font-family: 'Roboto Mono', monospace; font-size: 9px; letter-spacing: 0.12em;
    color: #FFCC00; text-transform: uppercase; margin-bottom: 12px; }
  h1 { font-size: 28px; font-weight: 700; line-height: 1.25; color: #E0E0E0; margin-bottom: 20px; }
  h2, h3 { font-size: 18px; font-weight: 600; color: #E0E0E0; margin-top: 32px; margin-bottom: 12px; }
  .meta { font-size: 13px; color: #999; margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center; }
  .meta .author { display: flex; align-items: center; gap: 8px; }
  .meta .author .avatar {
    width: 24px; height: 24px; border-radius: 50%; background: rgba(255,204,0,0.15);
    display: flex; align-items: center; justify-content: center; font-size: 10px; color: #FFCC00;
  }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 32px; }
  .tag { font-family: 'Roboto Mono', monospace; font-size: 8px; letter-spacing: 0.1em;
    color: rgba(255,204,0,0.6); border: 1px solid rgba(255,204,0,0.15);
    padding: 2px 8px; text-transform: uppercase; }
  hr { border: none; border-top: 1px solid #4A4A4A; margin: 24px 0; }
  hr.top-rule { margin-bottom: 32px; }
  hr.bottom-rule { margin-top: 32px; }
  .content p { font-size: 15px; color: rgba(224,224,224,0.65); margin-bottom: 16px; line-height: 1.7; }
  .content p:last-child { margin-bottom: 0; }
  .content img { max-width: 100%; height: auto; margin: 24px 0; display: block; border-radius: 4px; }
  .author-box {
    display: flex; align-items: center; gap: 14px; background: #1A1F2E;
    padding: 20px 24px; margin-top: 32px;
  }
  .author-box .avatar-lg {
    width: 36px; height: 36px; border-radius: 50%; background: rgba(255,204,0,0.15);
    display: flex; align-items: center; justify-content: center; font-size: 14px; color: #FFCC00; flex-shrink: 0;
  }
  .author-box .name { font-size: 14px; font-weight: 600; color: #E0E0E0; }
  .author-box .role { font-size: 12px; color: rgba(224,224,224,0.5); }
  .back-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 24px;
    font-size: 13px; font-weight: 500; color: #FFCC00; }
  .back-link:hover { color: #E6B800; text-decoration: none; }
  footer {
    max-width: 720px; margin: 0 auto; padding: 20px 24px 40px;
    text-align: center; font-size: 11px; color: rgba(224,224,224,0.3);
  }
  footer a { color: rgba(224,224,224,0.4); }
  @media (max-width: 640px) {
    header .nav-inner { padding: 12px 16px; }
    main { padding: 32px 16px 48px; }
    h1 { font-size: 22px; }
    header nav a { margin-left: 12px; font-size: 12px; }
  }
`;

function htmlEscape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderContent(blocks) {
  return blocks.map((block) => {
    if (block.type === 'h3') {
      return `<h3>${htmlEscape(block.text)}</h3>`;
    }
    if (block.type === 'svg') {
      const src = block.text.startsWith('/') ? block.text : `data:image/svg+xml;charset=utf-8,${encodeURIComponent(block.text)}`;
      const alt = htmlEscape(block.alt || '');
      return `<img src="${htmlEscape(src)}" alt="${alt}">`;
    }
    return `<p>${htmlEscape(block.text)}</p>`;
  }).join('\n');
}

function wordCount(blocks) {
  return blocks.reduce((n, b) => n + (b.text || '').split(/\s+/).filter(Boolean).length, 0);
}

function readingTime(wc) {
  return Math.max(1, Math.round(wc / 200));
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function jsonLd(post, wc) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calibratedam.com/' },
          { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://calibratedam.com/blog' },
          { '@type': 'ListItem', position: 3, name: post.title },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: 'https://calibratedam.com/assets/1000060728.jpg',
        datePublished: post.date,
        dateModified: post.date,
        author: {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Calibrated AM',
          logo: { '@type': 'ImageObject', url: 'https://calibratedam.com/favicon.svg' },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://calibratedam.com/blog/${post.slug}`,
        },
        wordCount: wc,
      },
    ],
  };
  return JSON.stringify(ld);
}

function generatePage(post) {
  const wc = wordCount(post.content);
  const rt = readingTime(wc);
  const dateFormatted = formatDate(post.date);
  const contentHtml = renderContent(post.content);
  const schema = jsonLd(post, wc);
  const tagsHtml = post.tags.map(t => `<span class="tag">${htmlEscape(t)}</span>`).join('');
  const ogUrl = `https://calibratedam.com/blog/${post.slug}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${htmlEscape(post.title)} | Calibrated AM</title>
  <meta name="description" content="${htmlEscape(post.excerpt)}">
  <meta name="keywords" content="${htmlEscape(post.tags.join(', '))}">
  <link rel="canonical" href="${ogUrl}">
  <meta property="og:title" content="${htmlEscape(post.title)} | Calibrated AM">
  <meta property="og:description" content="${htmlEscape(post.excerpt)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${ogUrl}">
  <meta property="og:image" content="https://calibratedam.com/assets/1000060728.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${htmlEscape(post.title)} | Calibrated AM">
  <meta name="twitter:description" content="${htmlEscape(post.excerpt)}">
  <meta name="twitter:image" content="https://calibratedam.com/assets/1000060728.jpg">
  <meta property="article:published_time" content="${post.date}">
  <meta property="article:author" content="${htmlEscape(post.author.name)}">
  ${post.tags.map(t => `<meta property="article:tag" content="${htmlEscape(t)}">`).join('\n  ')}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Roboto+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <style>${STYLES}</style>
  <script type="application/ld+json">${schema}</script>
</head>
<body>
  <header>
    <div class="nav-inner">
      <a href="/" class="brand">Calibrated<span>AM</span></a>
      <nav>
        <a href="/blog">Blog</a>
        <a href="/services">Services</a>
        <a href="/#about">About</a>
        <a href="/#contact">Contact</a>
      </nav>
    </div>
  </header>

  <main>
    <p class="label">Insights</p>
    <h1>${htmlEscape(post.title)}</h1>

    <div class="meta">
      <span class="author">
        <span class="avatar">MF</span>
        ${htmlEscape(post.author.name)}
      </span>
      <span>${dateFormatted}</span>
      <span>~${rt} min read</span>
    </div>

    <div class="tags">${tagsHtml}</div>

    <hr class="top-rule">

    <div class="content">
      ${contentHtml}
    </div>

    <hr class="bottom-rule">

    <div class="author-box">
      <span class="avatar-lg">MF</span>
      <div>
        <p class="name">${htmlEscape(post.author.name)}</p>
        <p class="role">${htmlEscape(post.author.role)}</p>
      </div>
    </div>

    <a href="/blog" class="back-link">&larr; All Insights</a>
  </main>

  <footer>
    <p>Calibrated AM &mdash; Rigorous operations consulting. Measured outcomes.</p>
  </footer>
</body>
</html>`;
}

async function main() {
  // Dynamic import of the blog data from source
  const dataPath = resolve(ROOT, 'src', 'data', 'blogs.js');
  const dataUrl = new URL(`file://${dataPath}`).href;
  const { blogs } = await import(dataUrl);

  console.log(`Generating static pages for ${blogs.length} blog post(s)...`);

  for (const post of blogs) {
    const html = generatePage(post);
    const outDir = resolve(DIST, 'blog', post.slug);
    mkdirSync(outDir, { recursive: true });
    const outFile = resolve(outDir, 'index.html');
    writeFileSync(outFile, html, 'utf-8');
    console.log(`  ✓ blog/${post.slug}/index.html`);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error('Error generating blog pages:', err);
  process.exit(1);
});
