import { motion } from 'framer-motion';

export default function StatCard({ value, label, bg = 'surface', animate = false }) {
  return (
    <motion.div
      className={`bg-${bg} p-5 text-center`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="font-mono text-3xl sm:text-4xl font-bold text-safety mb-2 tabular-nums">
        {animate ? <span data-target={value} data-suffix="">{value}</span> : value}
      </div>
      <p className="font-mono text-[10px] text-steel/40 tracking-wider uppercase leading-relaxed">
        {label}
      </p>
    </motion.div>
  );
}
