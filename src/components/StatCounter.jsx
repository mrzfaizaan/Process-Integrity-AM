import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

function useSpringCount(target, duration = 1500, suffix = '') {
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 100, damping: 30 });
  const [display, setDisplay] = useState('0' + suffix);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const unsubscribe = springVal.on('change', (latest) => {
      const isInt = Number.isInteger(target);
      if (isInt) {
        setDisplay(Math.floor(latest) + suffix);
      } else {
        const decimals = target.toString().split('.')[1]?.length || 2;
        setDisplay(latest.toFixed(decimals) + suffix);
      }
    });
    return unsubscribe;
  }, [springVal, target, suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            motionVal.set(target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, motionVal]);

  return { display, ref };
}

const miniIndicators = [
  // 40% speed: speed curve
  <svg key="0" width="32" height="14" viewBox="0 0 32 14" fill="none" className="mx-auto">
    <path d="M2 12 Q8 2, 16 6 T30 2" stroke="#FFCC00" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
  </svg>,
  // 30+ SOPs: document stack
  <svg key="1" width="24" height="16" viewBox="0 0 24 16" fill="none" className="mx-auto">
    <rect x="2" y="2" width="16" height="10" rx="1" stroke="#FFCC00" strokeWidth="1" opacity="0.4" />
    <rect x="4" y="0" width="16" height="10" rx="1" stroke="#FFCC00" strokeWidth="1" opacity="0.6" />
    <rect x="6" y="4" width="16" height="10" rx="1" stroke="#FFCC00" strokeWidth="1" opacity="0.8" />
  </svg>,
  // 20% time: before/after bars
  <svg key="2" width="36" height="14" viewBox="0 0 36 14" fill="none" className="mx-auto">
    <rect x="2" y="6" width="20" height="4" rx="1" fill="#FFCC00" opacity="0.3" />
    <rect x="2" y="2" width="14" height="4" rx="1" fill="#FFCC00" opacity="0.5" />
    <line x1="24" y1="4" x2="30" y2="4" stroke="#FFCC00" strokeWidth="0.5" opacity="0.4" />
  </svg>,
  // 4 operators: people dots
  <svg key="3" width="36" height="14" viewBox="0 0 36 14" fill="none" className="mx-auto">
    {[6, 14, 22, 30].map((cx, j) => (
      <g key={j}>
        <circle cx={cx} cy="4" r="3" stroke="#FFCC00" strokeWidth="1" opacity="0.6" fill="none" />
        <line x1={cx - 2} y1="10" x2={cx + 2} y2="10" stroke="#FFCC00" strokeWidth="1" opacity="0.4" />
      </g>
    ))}
  </svg>,
];

export default function StatCounter({ value, suffix, label1, label2, index = 0 }) {
  const { display, ref } = useSpringCount(value, 1500, suffix);

  return (
    <motion.div
      ref={ref}
      className="bg-surface p-5 text-center bracket-card"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="font-mono text-3xl sm:text-4xl font-bold text-safety mb-2 tabular-nums">
        {display}
      </div>
      <div className="mb-1.5">{miniIndicators[index] || null}</div>
      <p className="font-mono text-[10px] text-steel/40 tracking-wider uppercase leading-relaxed">
        {label1}
        <br />
        {label2}
      </p>
    </motion.div>
  );
}
