import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionLabel from '../components/SectionLabel';
import InlineIcon from '../components/InlineIcon';
import { blogs } from '../data/blogs';
import { site } from '../data/site';

const FORMSPREE_ID = 'xwvzqonp';
const PRIMER_URL = '/downloads/additive_manufacturing_primer.pdf';

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
  const [expanded, setExpanded] = useState(null);

  return (
    <motion.main
      className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Insights | {site.name}</title>
        <meta name="description" content="Technical insights on additive manufacturing operations, process optimization, and materials qualification." />
        <meta property="og:title" content={'Insights | ' + site.name} />
        <meta property="og:description" content="Technical writing on AM operations. No marketing. No hot takes. Just what the data says and what held up in production." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mrzfaizaan.github.io/Process-Integrity-AM/blog" />
      </Helmet>

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

      <div className="space-y-6">
        {blogs.map((post, i) => {
          const isOpen = expanded === i;

          return (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            >
              <div
                className={`bg-surface p-6 sm:p-8 bracket-card cursor-pointer transition-colors ${
                  isOpen ? 'border-l-2 border-safety' : ''
                }`}
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h2 className="font-semibold text-lg sm:text-xl text-steel mb-1">
                      {post.title}
                    </h2>
                    <span className="font-mono text-[10px] text-steel/40 tracking-wider uppercase">
                      {post.date}
                    </span>
                  </div>
                  <motion.span
                    className="text-safety/50 font-mono text-xl flex-shrink-0 mt-1"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                </div>

                <p className="text-steel/60 text-sm leading-relaxed mb-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] text-safety/60 tracking-wider uppercase border border-safety/15 px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="bg-grounding px-6 sm:px-8 py-6 sm:py-8 border-b border-x border-divider"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="prose-custom space-y-4">
                      {post.content.map((block, j) => {
                        if (block.type === 'h3') {
                          return (
                            <h3
                              key={j}
                              className="font-semibold text-steel text-base pt-2"
                            >
                              {block.text}
                            </h3>
                          );
                        }
                        return (
                          <p
                            key={j}
                            className="text-steel/60 text-sm leading-relaxed"
                          >
                            {block.text}
                          </p>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </motion.main>
  );
}
