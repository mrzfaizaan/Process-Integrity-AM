import { motion } from 'framer-motion';
import DocumentHead from '../components/DocumentHead';
import SectionLabel from '../components/SectionLabel';
import { privacySection, privacySections } from '../data/privacy';
import { site } from '../data/site';

export default function PrivacyPage() {
  return (
    <motion.main
      className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <DocumentHead
        title={`Privacy Policy | ${site.name}`}
        description="Calibrated AM privacy policy. What data we collect, how we use it, and your rights."
        ogTitle={`Privacy Policy | ${site.name}`}
        ogDescription="Calibrated AM privacy policy. What data we collect, how we use it, and your rights."
        ogUrl="https://calibratedam.com/privacy"
        canonical="https://calibratedam.com/privacy"
      />

      <section>
        <motion.div
          className="bg-surface p-8 sm:p-10 bracket-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>{privacySection.label}</SectionLabel>
          <h1 className="font-bold text-3xl sm:text-4xl text-steel mb-3">
            {privacySection.heading}
          </h1>
          <p className="text-steel/60 leading-relaxed">
            {privacySection.intro}
          </p>
        </motion.div>
      </section>

      <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {privacySections.map((section, i) => (
          <motion.div
            key={i}
            className="bg-surface p-6 sm:p-8 bracket-card"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <h2 className="font-mono text-xs text-safety/60 tracking-[0.15em] uppercase mb-3">
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.body.map((paragraph, j) => (
                <p key={j} className="text-steel/60 text-sm leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="font-mono text-[10px] text-steel/30 tracking-[0.15em] uppercase text-center pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        Last updated: May 2026
      </motion.p>
    </motion.main>
  );
}
