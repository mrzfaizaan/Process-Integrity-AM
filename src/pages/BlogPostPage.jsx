import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionLabel from '../components/SectionLabel';
import InlineIcon from '../components/InlineIcon';
import LikeButton from '../components/LikeButton';
import { supabase } from '../lib/supabase';
import { blogs, author } from '../data/blogs';
import { site } from '../data/site';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogs.find((p) => p.slug === slug);
  const [readCount, setReadCount] = useState(null);

  useEffect(() => {
    if (slug) {
      supabase.rpc('increment_read', { post_slug: slug }).then(({ error }) => {
        if (error) console.warn('increment_read failed:', error);
      });
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      supabase
        .from('blog_engagement')
        .select('read_count')
        .eq('slug', slug)
        .single()
        .then(({ data }) => {
          if (data) setReadCount(data.read_count);
        });
    }
  }, [slug]);

  if (!post) {
    return (
      <motion.main
        className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-2xl font-bold text-steel mb-4">Post not found</h1>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-safety hover:text-[#E6B800] font-semibold text-sm transition-colors"
        >
          <InlineIcon name="arrow" className="w-3.5 h-3.5 rotate-180" />
          Back to Insights
        </Link>
      </motion.main>
    );
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${window.location.origin}/Process-Integrity-AM/assets/1000060728.jpg`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: `${window.location.origin}/Process-Integrity-AM/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${window.location.origin}/Process-Integrity-AM/blog/${post.slug}`,
    },
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.main
      className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>{post.title} | {site.name}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | ${site.name}`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://mrzfaizaan.github.io/Process-Integrity-AM/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author.name} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-steel/50 hover:text-safety font-mono text-[10px] tracking-wider uppercase transition-colors"
      >
        <InlineIcon name="arrow" className="w-3 h-3 rotate-180" />
        All Insights
      </Link>

      <article>
        <motion.header
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Insights</SectionLabel>
          <h1 className="font-bold text-3xl sm:text-4xl text-steel leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-steel/50">
            <span className="inline-flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-safety/15 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 text-safety"
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
              </div>
              <span className="text-sm">{post.author.name}</span>
            </span>
            <span className="font-mono text-[10px] tracking-wider uppercase">
              {formatDate(post.date)}
            </span>
            <LikeButton slug={post.slug} />
            {readCount != null && readCount > 0 && (
              <span className="inline-flex items-center gap-1 text-xs">
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
                {readCount}
              </span>
            )}
          </div>

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
        </motion.header>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <hr className="border-t border-divider mb-8" />
          <div className="prose-custom space-y-5">
            {post.content.map((block, j) => {
              if (block.type === 'h3') {
                return (
                  <h3
                    key={j}
                    className="font-semibold text-steel text-lg pt-4"
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
          <hr className="border-t border-divider mt-10 mb-8" />
        </motion.div>

        <motion.footer
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-grounding px-6 py-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-safety/15 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-safety"
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
            </div>
            <div>
              <p className="text-sm font-semibold text-steel">
                {post.author.name}
              </p>
              <p className="text-xs text-steel/50">{post.author.role}</p>
            </div>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-safety hover:text-[#E6B800] font-semibold text-sm transition-colors"
          >
            More Insights
            <InlineIcon name="arrow" className="w-3.5 h-3.5" />
          </Link>
        </motion.footer>
      </article>
    </motion.main>
  );
}
