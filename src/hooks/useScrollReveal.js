import { useRef, useEffect, useCallback } from 'react';

function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -40px 0px', once = true } = {}) {
  const ref = useRef(null);
  const hasRevealed = useRef(false);

  const handleIntersect = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (once) {
            hasRevealed.current = true;
            observer.unobserve(entry.target);
          }
          entry.target.setAttribute('data-visible', 'true');
        } else if (!once) {
          entry.target.removeAttribute('data-visible');
        }
      });
    },
    [once]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [handleIntersect, threshold, rootMargin]);

  const motionProps = {
    ref,
    initial: { opacity: 0, y: 30 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    viewport: { once: true, margin: rootMargin },
  };

  return { ref, motionProps };
}

export default useScrollReveal;
