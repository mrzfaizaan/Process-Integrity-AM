import { motion } from 'framer-motion';

export default function GaugeIndicator({ type = 'donut', pct, value, suffix }) {
  if (type === 'donut') {
    const r = 28;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (pct / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width="72" height="72" viewBox="0 0 72 72" className="transform -rotate-90">
          <circle cx="36" cy="36" r={r} fill="none" stroke="#333333" strokeWidth="3" />
          <motion.circle
            cx="36" cy="36" r={r} fill="none" stroke="#FFCC00" strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-base font-bold text-safety tabular-nums">
            {value}{suffix}
          </span>
        </div>
      </div>
    );
  }

  if (type === 'arc') {
    const r = 30;
    const circumference = Math.PI * r;
    const offset = circumference - (pct / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width="72" height="44" viewBox="0 0 72 44">
          <path d="M8,40 A30,30 0 0,1 64,40" fill="none" stroke="#333333" strokeWidth="3" />
          <motion.path
            d="M8,40 A30,30 0 0,1 64,40"
            fill="none" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        <div className="absolute -bottom-1 left-0 right-0 flex justify-center">
          <span className="font-mono text-sm font-bold text-safety tabular-nums">
            {value}{suffix}
          </span>
        </div>
      </div>
    );
  }

  return null;
}
