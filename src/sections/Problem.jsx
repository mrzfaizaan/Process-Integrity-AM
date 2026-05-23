import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import ProblemCard from '../components/ProblemCard';
import PersonaCard from '../components/PersonaCard';
import { problemSection, problems, personas } from '../data/problems';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Problem() {
  return (
    <section id="problem">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div variants={item}>
          <SectionLabel>{problemSection.label}</SectionLabel>
          <h2 className="font-bold text-2xl sm:text-3xl text-steel mb-3">
            {problemSection.heading}
          </h2>
          <p className="text-steel/60 text-sm leading-relaxed max-w-3xl mb-8">
            {problemSection.intro}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {problems.map((p, i) => (
            <motion.div key={i} variants={item}>
              <ProblemCard {...p} />
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="mb-4">
          <span className="font-mono text-[10px] text-steel/40 tracking-[0.15em] uppercase">
            Who This Is For
          </span>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {personas.map((p, i) => (
            <motion.div key={i} variants={item}>
              <PersonaCard {...p} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
