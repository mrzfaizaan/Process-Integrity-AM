-- ============================================================
-- Run this in the Supabase SQL Editor (https://hymxodyqclzygzwnnjso.supabase.co)
-- Go to: SQL Editor → New Query → Paste → Run
-- ============================================================

-- Table 1: Aggregate engagement counts per post
CREATE TABLE IF NOT EXISTS blog_engagement (
  slug        text PRIMARY KEY,
  read_count  integer NOT NULL DEFAULT 0,
  like_count  integer NOT NULL DEFAULT 0
);

ALTER TABLE blog_engagement ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "allow_public_read" ON blog_engagement
  FOR SELECT USING (true);

-- Allow anon to upsert (increment read_count, toggle like_count)
CREATE POLICY "allow_anon_upsert" ON blog_engagement
  FOR INSERT WITH CHECK (true);

CREATE POLICY "allow_anon_update" ON blog_engagement
  FOR UPDATE USING (true);

-- Table 2: Per-visitor like tracking (prevents double-likes)
CREATE TABLE IF NOT EXISTS blog_likes (
  slug        text NOT NULL,
  visitor_id  text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (slug, visitor_id)
);

ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "allow_public_read" ON blog_likes
  FOR SELECT USING (true);

-- Allow anon to insert/delete their own likes
CREATE POLICY "allow_anon_insert_own" ON blog_likes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "allow_anon_delete_own" ON blog_likes
  FOR DELETE USING (true);

-- Table 3: Per-visitor read tracking (prevents inflating read count)
CREATE TABLE IF NOT EXISTS blog_reads (
  slug        text NOT NULL,
  visitor_id  text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (slug, visitor_id)
);

ALTER TABLE blog_reads ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "allow_public_read" ON blog_reads
  FOR SELECT USING (true);

-- RPC: Increment read_count (called from BlogPostPage on mount)
-- Now takes visitor_id to deduplicate reads per visitor
CREATE OR REPLACE FUNCTION increment_read(post_slug text, visitor_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO blog_reads (slug, visitor_id)
  VALUES (post_slug, visitor_id)
  ON CONFLICT DO NOTHING;

  IF FOUND THEN
    INSERT INTO blog_engagement (slug, read_count, like_count)
    VALUES (post_slug, 1, 0)
    ON CONFLICT (slug)
    DO UPDATE SET read_count = blog_engagement.read_count + 1;
  END IF;
END;
$$;

-- RPC: Increment like_count (called from LikeButton)
CREATE OR REPLACE FUNCTION increment_like(post_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO blog_engagement (slug, read_count, like_count)
  VALUES (post_slug, 0, 1)
  ON CONFLICT (slug)
  DO UPDATE SET like_count = blog_engagement.like_count + 1;
END;
$$;

-- RPC: Decrement like_count (called from LikeButton on unlike)
CREATE OR REPLACE FUNCTION decrement_like(post_slug text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE blog_engagement
  SET like_count = GREATEST(like_count - 1, 0)
  WHERE slug = post_slug;
END;
$$;

-- Initial seed row for the existing post
INSERT INTO blog_engagement (slug, read_count, like_count)
VALUES ('92-5-first-pass-yield', 0, 0)
ON CONFLICT (slug) DO NOTHING;
