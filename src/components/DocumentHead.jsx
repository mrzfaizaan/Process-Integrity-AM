import { useEffect, useId } from 'react';

export default function DocumentHead({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = 'https://mrzfaizaan.github.io/Calibrated-AM/assets/1000060728.jpg',
  ogType = 'website',
  ogUrl,
  twitterCard = 'summary_large_image',
  canonical,
  jsonLd,
  keywords,
  meta = [],
}) {
  const uid = useId();

  useEffect(() => {
    const head = document.head;
    const sel = `[data-head-id="${uid}"]`;

    const removeOwn = () =>
      head.querySelectorAll(sel).forEach((el) => el.remove());

    removeOwn();

    const el = (tag) => {
      const node = document.createElement(tag);
      node.setAttribute('data-head-id', uid);
      return node;
    };

    const set = (node) => head.appendChild(node);

    // Title
    if (title) {
      let t = head.querySelector('title');
      if (!t) {
        t = el('title');
        set(t);
      }
      t.textContent = title;
    }

    // Metas
    if (description) {
      const m = el('meta');
      m.setAttribute('name', 'description');
      m.setAttribute('content', description);
      set(m);
    }
    if (ogTitle) {
      const m = el('meta');
      m.setAttribute('property', 'og:title');
      m.setAttribute('content', ogTitle);
      set(m);
    }
    if (ogDescription) {
      const m = el('meta');
      m.setAttribute('property', 'og:description');
      m.setAttribute('content', ogDescription);
      set(m);
    }
    if (ogImage) {
      const m = el('meta');
      m.setAttribute('property', 'og:image');
      m.setAttribute('content', ogImage);
      set(m);
    }
    if (ogType) {
      const m = el('meta');
      m.setAttribute('property', 'og:type');
      m.setAttribute('content', ogType);
      set(m);
    }
    if (ogUrl) {
      const m = el('meta');
      m.setAttribute('property', 'og:url');
      m.setAttribute('content', ogUrl);
      set(m);
    }
    if (twitterCard) {
      const m = el('meta');
      m.setAttribute('name', 'twitter:card');
      m.setAttribute('content', twitterCard);
      set(m);
    }
    if (keywords) {
      const m = el('meta');
      m.setAttribute('name', 'keywords');
      m.setAttribute('content', typeof keywords === 'string' ? keywords : keywords.join(', '));
      set(m);
    }

    // Custom meta array
    meta.forEach(({ name, property, content }) => {
      if (!content) return;
      const m = el('meta');
      if (property) m.setAttribute('property', property);
      if (name) m.setAttribute('name', name);
      m.setAttribute('content', content);
      set(m);
    });

    // Canonical
    if (canonical) {
      const l = el('link');
      l.setAttribute('rel', 'canonical');
      l.setAttribute('href', canonical);
      set(l);
    }

    // JSON-LD
    if (jsonLd) {
      const s = el('script');
      s.setAttribute('type', 'application/ld+json');
      s.textContent = typeof jsonLd === 'string' ? jsonLd : JSON.stringify(jsonLd);
      set(s);
    }

    return removeOwn;
  }, [
    uid, title, description, ogTitle, ogDescription, ogImage,
    ogType, ogUrl, twitterCard, canonical, keywords,
    JSON.stringify(jsonLd), JSON.stringify(meta),
  ]);

  return null;
}
