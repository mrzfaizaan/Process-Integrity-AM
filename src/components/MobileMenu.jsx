import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks, ctaLink } from '../data/nav';

const menuVariants = {
  hidden: { opacity: 0, height: 0, overflow: 'hidden' },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.2, when: 'beforeChildren', staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.15, when: 'afterChildren' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -12 },
};

export default function MobileMenu({ open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e, href) => {
    onClose();
    const isHashLink = href.startsWith('/#');
    if (isHashLink && location.pathname === '/') {
      e.preventDefault();
      navigate(href, { replace: true });
      const id = href.slice(2);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (isHashLink) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="md:hidden bg-grounding border-t border-divider px-4 py-4 space-y-3 overflow-hidden"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={itemVariants}>
              <Link
                to={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="block text-sm font-medium text-steel/60 hover:text-steel transition-colors"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <motion.div variants={itemVariants}>
            <Link
              to={ctaLink.href}
              onClick={(e) => handleClick(e, ctaLink.href)}
              className="block text-sm font-medium text-safety transition-colors"
            >
              {ctaLink.label}
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
