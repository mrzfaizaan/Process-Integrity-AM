import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InlineIcon from './InlineIcon';

export default function CtaButton({ children, href, icon = 'arrow', className = '' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ display: 'inline-flex' }}
    >
      <Link
        to={href}
        className={`inline-flex items-center px-6 py-3 bg-safety text-grounding font-semibold text-sm hover:bg-[#E6B800] transition-colors ${className}`}
      >
        {children}
        {icon && <InlineIcon name={icon} className="ml-2 w-4 h-4 text-grounding" />}
      </Link>
    </motion.div>
  );
}
