import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import CaseStudy from '../components/CaseStudy';
import StatCounter from '../components/StatCounter';
import { proofSection, caseStudy, supportingStats } from '../data/proof';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const statContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

export default function Proof() {
  return (
    <section id="proof">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div variants={item}>
          <SectionLabel>{proofSection.label}</SectionLabel>
          <h2 className="font-bold text-2xl sm:text-3xl text-steel mb-3">
            {proofSection.heading}
          </h2>
          <p className="text-steel/60 text-sm leading-relaxed max-w-3xl mb-8">
            {proofSection.intro}
          </p>
        </motion.div>

        <motion.div variants={item}>
          <CaseStudy data={caseStudy} />
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          variants={statContainer}
        >
          {supportingStats.map((s, i) => (
            <motion.div key={i} variants={item}>
              <StatCounter
                value={s.value}
                suffix={s.suffix}
                label1={s.label1}
                label2={s.label2}
                index={i}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
