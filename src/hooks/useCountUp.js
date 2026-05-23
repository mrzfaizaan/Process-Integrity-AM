import { useState, useEffect, useRef } from 'react';

function useCountUp(target, duration = 1500, suffix = '', startOnView = true) {
  const [display, setDisplay] = useState('0' + suffix);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!startOnView) {
      animate();
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, suffix, startOnView]);

  function animate() {
    const start = performance.now();
    const isInt = Number.isInteger(target);

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (isInt) {
        setDisplay(Math.floor(current) + suffix);
      } else {
        const decimals = target.toString().split('.')[1]?.length || 2;
        setDisplay(current.toFixed(decimals) + suffix);
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplay(target + suffix);
      }
    }

    requestAnimationFrame(update);
  }

  return { display, ref };
}

export default useCountUp;
