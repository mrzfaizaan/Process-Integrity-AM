import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import ServiceCard from '../components/ServiceCard';
import GhostButton from '../components/GhostButton';
import { servicesSection, primaryServices } from '../data/services';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function ServicesOverview() {
  const topServices = primaryServices.slice(0, 4);

  return (
    <section id="services">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div variants={item}>
          <SectionLabel>{servicesSection.label}</SectionLabel>
          <h2 className="font-bold text-2xl sm:text-3xl text-steel mb-3">
            {servicesSection.heading}
          </h2>
          <p className="text-steel/60 text-sm leading-relaxed max-w-3xl mb-8">
            {servicesSection.intro}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 mb-8">
          {topServices.map((s) => (
            <motion.div key={s.id} variants={item}>
              <ServiceCard {...s} />
            </motion.div>
          ))}
        </div>

        <motion.div variants={item}>
          <GhostButton href="/services" icon="arrow">
            View Full Service Catalog
          </GhostButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
