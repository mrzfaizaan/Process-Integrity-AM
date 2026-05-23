import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InlineIcon from './InlineIcon';

export default function GhostButton({ children, href, icon, external = false }) {
  const cls = 'inline-flex items-center px-6 py-3 ghost-btn font-semibold text-sm';

  const inner = (
    <>
      {children}
      {icon && <InlineIcon name={icon} className="ml-2 w-4 h-4 text-current" />}
    </>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ display: 'inline-flex' }}
    >
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      ) : (
        <Link to={href} className={cls}>
          {inner}
        </Link>
      )}
    </motion.div>
  );
}
