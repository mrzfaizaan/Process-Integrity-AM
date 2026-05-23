import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionLabel from '../components/SectionLabel';
import { blogs } from '../data/blogs';
import { site } from '../data/site';

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
