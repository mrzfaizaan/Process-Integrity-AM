import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import DocumentHead from '../components/DocumentHead';
import SectionLabel from '../components/SectionLabel';
import ServiceDetail from '../components/ServiceDetail';
import CtaButton from '../components/CtaButton';
import { servicesSection, primaryServices, relatedServices } from '../data/services';
import { site } from '../data/site';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function ServicesPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 200);
      }
    }
  }, [location.hash]);

  return (
    <motion.main
      className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16 lg:space-y-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <DocumentHead
        title={`Services | ${site.name}`}
        description={`${site.name} consulting services. Technical training, print farm audits, process optimization, materials qualification, DFM, and more.`}
        ogTitle={`Services | ${site.name}`}
        ogDescription="Technical training, print farm audits, process optimization, materials qualification. PhD-led AM consulting."
        ogUrl="https://mrzfaizaan.github.io/Calibrated-AM/services"
      />

      {/* Page Header */}
      <section>
        <motion.div
          className="bg-surface p-8 sm:p-10 bracket-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel>Service Catalog</SectionLabel>
          <h1 className="font-bold text-3xl sm:text-4xl text-steel mb-3">
            Services That Deliver <span className="text-safety">Measurable Outcomes</span>
          </h1>
          <p className="text-steel/60 leading-relaxed max-w-3xl">
            {servicesSection.intro}
          </p>
        </motion.div>
      </section>

      {/* Primary Services */}
      <motion.div
        className="space-y-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {primaryServices.map((s) => (
          <motion.div key={s.id} variants={item}>
            <ServiceDetail {...s} />
          </motion.div>
        ))}
      </motion.div>

      {/* Related Capabilities */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>Related Capabilities</SectionLabel>
          <h2 className="font-bold text-2xl sm:text-3xl text-steel mb-2">
            Additional <span className="text-safety">Expertise</span>
          </h2>
          <p className="text-steel/50 text-sm leading-relaxed mb-8 max-w-2xl">
            Complementary capabilities available as standalone engagements or integrated into larger programs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedServices.map((s) => (
              <motion.div
                key={s.id}
                className="bg-surface p-5 bracket-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[10px] text-safety/60 tracking-wider uppercase">{s.badge}</span>
                </div>
                <h3 className="font-semibold text-steel text-sm mb-1">{s.title}</h3>
                <p className="text-steel/50 text-xs leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Global CTA */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <CtaButton href="https://cal.com/mirza.calibrate-am">BOOK A DIAGNOSTIC CALL</CtaButton>
      </motion.div>
    </motion.main>
  );
}
