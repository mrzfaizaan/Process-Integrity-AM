import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initGA } from '../lib/analytics';

const STORAGE_KEY = 'calibrated-am-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === null) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    initGA();
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 bg-grounding border-t border-safety/20"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-steel/60 text-xs leading-relaxed flex-1 min-w-0">
              This site uses cookies for analytics. By continuing, you consent to our use of cookies.{' '}
              <a href="/privacy" className="text-safety/80 hover:text-safety underline underline-offset-2 transition-colors">
                Privacy Policy
              </a>
            </p>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleDecline}
                className="font-mono text-[10px] text-steel/40 hover:text-steel tracking-wider uppercase transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="font-mono text-[10px] font-semibold bg-safety text-grounding px-4 py-1.5 tracking-wider uppercase hover:bg-safety/90 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
