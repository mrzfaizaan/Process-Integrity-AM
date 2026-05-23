import { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import InlineIcon from './InlineIcon';
import MobileMenu from './MobileMenu';
import CtaButton from './CtaButton';
import { navLinks, ctaLink } from '../data/nav';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.85, 1]);

  const handleNavClick = useCallback(
    (e, href) => {
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
    },
    [location.pathname, navigate]
  );

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-divider"
      style={{ backgroundColor: useTransform(bgOpacity, (v) => `rgba(26,31,46,${v})`) }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-bold text-lg tracking-tight text-steel hover:text-safety transition-colors"
        >
          Process Integrity<span className="text-safety">AM</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isHash = link.href.startsWith('/#');
            const isActive = isHash
              ? location.hash === link.href.slice(1)
              : location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-safety' : 'text-steel/60 hover:text-steel'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <CtaButton href={ctaLink.href}>{ctaLink.label}</CtaButton>
        </nav>

        <button
          className="md:hidden flex text-steel p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <InlineIcon name="hamburger" className="w-6 h-6" />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </motion.header>
  );
}
