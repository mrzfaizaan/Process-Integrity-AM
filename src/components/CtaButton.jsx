import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InlineIcon from './InlineIcon';

export default function CtaButton({ children, href, icon = 'arrow', className = '' }) {
  const cls = `inline-flex items-center px-6 py-3 bg-safety text-grounding font-semibold text-sm hover:bg-[#E6B800] transition-colors ${className}`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ display: 'inline-flex' }}
    >
      {href.startsWith('http') ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
          {icon && <InlineIcon name={icon} className="ml-2 w-4 h-4 text-grounding" />}
        </a>
      ) : (
        <Link to={href} className={cls}>
          {children}
          {icon && <InlineIcon name={icon} className="ml-2 w-4 h-4 text-grounding" />}
        </Link>
      )}
    </motion.div>
  );
}
