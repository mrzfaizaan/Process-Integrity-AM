import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import ContactInfoItem from '../components/ContactInfoItem';
import CalendlyCard from '../components/CalendlyCard';
import ContactForm from '../components/ContactForm';
import { contactSection, contactInfo, calendlyCard } from '../data/contact';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Contact() {
  return (
    <section id="contact">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div variants={item}>
          <SectionLabel>{contactSection.label}</SectionLabel>
          <h2 className="font-bold text-2xl sm:text-3xl text-steel mb-3">
            {contactSection.heading}
          </h2>
          <p className="text-steel/60 text-sm leading-relaxed max-w-2xl mb-8">
            {contactSection.intro}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((c, i) => (
              <motion.div key={i} variants={item}>
                <ContactInfoItem {...c} />
              </motion.div>
            ))}
            <motion.div variants={item}>
              <CalendlyCard {...calendlyCard} />
            </motion.div>
          </div>

          <motion.div className="lg:col-span-3" variants={item}>
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
