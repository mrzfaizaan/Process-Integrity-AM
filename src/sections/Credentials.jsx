import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import CredentialItem from '../components/CredentialItem';
import { credentialsSection, credentialItems } from '../data/credentials';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Credentials() {
  return (
    <section id="credentials">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div variants={item}>
          <SectionLabel>{credentialsSection.label}</SectionLabel>
          <h2 className="font-bold text-2xl sm:text-3xl text-steel mb-4">
            {credentialsSection.heading}
          </h2>
          <p className="text-steel/60 text-sm leading-relaxed max-w-2xl mb-8">
            {credentialsSection.intro}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          {credentialItems.map((c, i) => (
            <motion.div key={i} variants={item}>
              <CredentialItem {...c} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
