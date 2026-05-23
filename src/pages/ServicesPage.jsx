import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionLabel from '../components/SectionLabel';
import ServiceDetail from '../components/ServiceDetail';
import CtaButton from '../components/CtaButton';
import { servicesSection, services } from '../data/services';
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
      <Helmet>
        <title>Services | {site.name}</title>
        <meta name="description" content={`${site.name} consulting services. Technical training, print farm audits, process optimization, materials qualification, DFM, and more.`} />
      </Helmet>

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

      {/* Service Detail Cards */}
      <motion.div
        className="space-y-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {services.map((s) => (
          <motion.div key={s.id} variants={item}>
            <ServiceDetail {...s} />
          </motion.div>
        ))}
      </motion.div>

      {/* Global CTA */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <CtaButton href="/#contact">DISCUSS YOUR PROJECT</CtaButton>
      </motion.div>
    </motion.main>
  );
}
