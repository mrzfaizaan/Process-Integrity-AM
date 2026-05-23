import { motion } from 'framer-motion';
import InlineIcon from './InlineIcon';

export default function PersonaCard({ icon, title, body }) {
  return (
    <motion.div
      className="bg-surface p-6 accent-top-rule"
      whileHover={{
        y: -2,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      <div className="icon-circle mb-4">
        <InlineIcon name={icon} className="w-5 h-5 text-safety" />
      </div>
      <h3 className="font-semibold text-steel mb-2">{title}</h3>
      <p className="text-steel/50 text-sm leading-relaxed">{body}</p>
    </motion.div>
  );
}
