import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DocumentHead from '../components/DocumentHead';
import SectionLabel from '../components/SectionLabel';
import CtaButton from '../components/CtaButton';
import { site } from '../data/site';

export default function NotFoundPage() {
  return (
    <motion.main
      className="max-w-xl mx-auto px-4 sm:px-6 py-24 text-center space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <DocumentHead title={`Page Not Found | ${site.name}`} />

      <SectionLabel>404</SectionLabel>
      <h1 className="font-bold text-3xl text-steel">Page not found</h1>
      <p className="text-steel/60 text-sm leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <CtaButton href="/">Back to Home</CtaButton>
      </div>
    </motion.main>
  );
}
