import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InlineIcon from './InlineIcon';

export default function ServiceCard({ id, icon, title, body, badge }) {
  return (
    <motion.div
      className="bg-surface p-6 sm:p-8 bracket-card"
      whileHover={{
        y: -2,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="icon-circle">
          <InlineIcon name={icon} className="w-5 h-5 text-safety" />
        </div>
        {badge && (
          <span className="font-mono text-[9px] text-safety/70 tracking-wider uppercase border border-safety/20 px-2 py-0.5">
            {badge}
          </span>
        )}
      </div>
      <h3 className="font-semibold text-lg text-steel mb-2">{title}</h3>
      <p className="text-steel/50 text-sm leading-relaxed mb-4">{body}</p>
      <Link
        to={`/services#${id}`}
        className="inline-flex items-center text-sm font-semibold text-safety hover:text-[#E6B800] transition-colors"
      >
        Learn more
        <InlineIcon name="arrow" className="ml-1.5 w-4 h-4" />
      </Link>
    </motion.div>
  );
}
