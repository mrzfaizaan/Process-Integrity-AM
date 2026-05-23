import { motion } from 'framer-motion';

export default function ProcessStepCard({ num, title, body }) {
  return (
    <motion.div
      className="bg-surface p-6 accent-top-rule relative"
      whileHover={{
        y: -2,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      <div className="font-mono text-4xl font-black text-safety/15 absolute top-4 right-4 select-none leading-none">
        {num}
      </div>
      <div className="font-mono text-2xl font-bold text-safety mb-4 relative z-10">{num}</div>
      <h3 className="font-semibold text-steel mb-2 relative z-10">{title}</h3>
      <p className="text-steel/50 text-sm leading-relaxed relative z-10">{body}</p>
    </motion.div>
  );
}
