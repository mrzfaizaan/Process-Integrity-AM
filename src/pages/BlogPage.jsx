import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DocumentHead from '../components/DocumentHead';
import SectionLabel from '../components/SectionLabel';
import InlineIcon from '../components/InlineIcon';
import BlogSearch from '../components/BlogSearch';
import LikeButton from '../components/LikeButton';
import { supabase } from '../lib/supabase';
import { blogs } from '../data/blogs';
import { site } from '../data/site';

const FORMSPREE_ID = 'xwvzqonp';
const PRIMER_URL = '/downloads/additive_manufacturing_primer.pdf';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'likes', label: 'Most liked' },
];

function LeadMagnetCard() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      className="bg-surface p-6 sm:p-8 bracket-card bracket-card-bright"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="icon-circle flex-shrink-0 mt-1">
          <svg className="w-5 h-5 text-safety" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-steel mb-1">Additive Manufacturing Primer</h3>
          <p className="text-steel/50 text-sm leading-relaxed">
            A technical reference for engineering managers and print farm operators. Covers materials, process fundamentals, calibration methodology, and qualification basics.
          </p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="bg-grounding p-4 flex items-center justify-between gap-4">
          <p className="text-sm text-steel/70">Thank you.</p>
          <a
            href={PRIMER_URL}
            className="inline-flex items-center px-4 py-2 bg-safety text-grounding font-semibold text-sm hover:bg-[#E6B800] transition-colors"
          >
            Download the Primer
            <InlineIcon name="arrow" className="ml-1.5 w-4 h-4" />
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="input-field flex-1"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center px-5 py-3 bg-safety text-grounding font-semibold text-sm hover:bg-[#E6B800] transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Get the PDF'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-xs text-red-400 mt-2">
          Something went wrong. Try again or email fmirza.phd@gmail.com directly.
        </p>
      )}
    </motion.div>
  );
}

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [engagement, setEngagement] = useState({});

  useEffect(() => {
    const slugs = blogs.map((p) => p.slug);
    supabase
      .from('blog_engagement')
      .select('slug, read_count, like_count')
      .in('slug', slugs)
      .then(({ data }) => {
        if (data) {
          const map = {};
          data.forEach((row) => {
            map[row.slug] = { read_count: row.read_count, like_count: row.like_count };
          });
          setEngagement(map);
        }
      });
  }, []);

  const filtered = useMemo(() => {
    let result = [...blogs];

    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter((post) => {
        const inTitle = post.title.toLowerCase().includes(query);
        const inExcerpt = post.excerpt.toLowerCase().includes(query);
        const inTags = post.tags.some((tag) => tag.toLowerCase().includes(query));
        return inTitle || inExcerpt || inTags;
      });
    }

    switch (sort) {
      case 'oldest':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'likes':
        result.sort(
          (a, b) =>
            (engagement[b.slug]?.like_count ?? 0) -
            (engagement[a.slug]?.like_count ?? 0)
        );
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    return result;
  }, [search, sort, engagement]);

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const blogListSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: blogs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://mrzfaizaan.github.io/Calibrated-AM/blog/${b.slug}`,
    })),
  }), []);

  return (
    <motion.main
      className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <DocumentHead
        title={`Insights | ${site.name}`}
        description="Technical insights on additive manufacturing operations, process optimization, and materials qualification."
        ogTitle={`Insights | ${site.name}`}
        ogDescription="Technical writing on AM operations. No marketing. No hot takes. Just what the data says and what held up in production."
        ogUrl="https://mrzfaizaan.github.io/Calibrated-AM/blog"
        canonical="https://mrzfaizaan.github.io/Calibrated-AM/blog"
        jsonLd={blogListSchema}
      />

      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Insights</SectionLabel>
          <h1 className="font-bold text-3xl sm:text-4xl text-steel mb-3">
            Writing on <span className="text-safety">AM Operations</span>
          </h1>
          <p className="text-steel/60 text-sm leading-relaxed max-w-2xl">
            Technical observations from the shop floor. No marketing. No hot takes. Just what the data says and what held up in production.
          </p>
        </motion.div>
      </section>

      <LeadMagnetCard />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <BlogSearch value={search} onChange={setSearch} />
        </div>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-field pr-8 py-3 text-sm appearance-none cursor-pointer min-w-[140px] bg-grounding"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-3 h-3 text-steel/40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center py-16"
          >
            <p className="text-steel/40 text-sm">
              No posts match <span className="text-steel/60">"{search}"</span>
            </p>
            <button
              type="button"
              onClick={() => setSearch('')}
              className="mt-3 inline-flex items-center gap-1 text-safety hover:text-[#E6B800] font-mono text-[10px] tracking-wider uppercase transition-colors"
            >
              Clear search
              <InlineIcon name="arrow" className="w-3 h-3" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filtered.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="block bg-surface p-6 sm:p-8 bracket-card group transition-colors hover:border-l-2 hover:border-safety"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h2 className="font-semibold text-lg sm:text-xl text-steel mb-1 group-hover:text-safety transition-colors">
                        {post.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                        <span className="inline-flex items-center gap-1.5 text-steel/40 text-xs">
                          <svg
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          {post.author.name}
                        </span>
                        <span className="font-mono text-[10px] text-steel/40 tracking-wider uppercase">
                          {formatDate(post.date)}
                        </span>
                        {(engagement[post.slug]?.read_count ?? 0) > 0 && (
                          <span className="inline-flex items-center gap-1 text-steel/40 text-xs">
                            <svg
                              className="w-3 h-3"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            {engagement[post.slug].read_count}
                          </span>
                        )}
                      </div>
                    </div>
                    <motion.span
                      className="text-safety/30 font-mono text-xl flex-shrink-0 mt-1 group-hover:text-safety transition-colors"
                    >
                      <InlineIcon name="arrow" className="w-5 h-5" />
                    </motion.span>
                  </div>

                  <p className="text-steel/60 text-sm leading-relaxed mb-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] text-safety/60 tracking-wider uppercase border border-safety/15 px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="flex-1" />
                    <LikeButton slug={post.slug} />
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {filtered.length > 0 && (
        <p className="text-center text-steel/30 font-mono text-[10px] tracking-wider uppercase pt-2">
          {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
        </p>
      )}
    </motion.main>
  );
}
