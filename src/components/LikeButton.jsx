import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { supabase, getVisitorId } from '../lib/supabase';

export default function LikeButton({ slug, className = '' }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [animating, setAnimating] = useState(false);

  const fetchState = useCallback(async () => {
    const visitorId = await getVisitorId();

    const { data: engagement } = await supabase
      .from('blog_engagement')
      .select('like_count')
      .eq('slug', slug)
      .single();

    const { data: userLike } = await supabase
      .from('blog_likes')
      .select('slug')
      .eq('slug', slug)
      .eq('visitor_id', visitorId)
      .maybeSingle();

    setLikeCount(engagement?.like_count ?? 0);
    setLiked(!!userLike);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  const handleToggle = useCallback(async () => {
    if (animating) return;
    setAnimating(true);

    const visitorId = await getVisitorId();
    const wasLiked = liked;

    if (wasLiked) {
      await supabase
        .from('blog_likes')
        .delete()
        .eq('slug', slug)
        .eq('visitor_id', visitorId);

      await supabase.rpc('decrement_like', { post_slug: slug });
    } else {
      await supabase
        .from('blog_likes')
        .insert({ slug, visitor_id: visitorId });

      await supabase.rpc('increment_like', { post_slug: slug });
    }

    await fetchState();
    setAnimating(false);
  }, [slug, liked, animating, fetchState]);

  return (
    <motion.button
      onClick={handleToggle}
      disabled={loading || animating}
      className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase transition-colors disabled:opacity-50 ${
        liked
          ? 'text-safety'
          : 'text-steel/40 hover:text-safety/70'
      } ${className}`}
      whileTap={{ scale: 0.85 }}
      aria-label={liked ? 'Unlike this post' : 'Like this post'}
    >
      <motion.svg
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ scale: animating ? [1, 1.35, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </motion.svg>
      {likeCount > 0 && <span>{likeCount}</span>}
    </motion.button>
  );
}
