import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { aboutSection } from '../data/about';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function AboutMe() {
  return (
    <section id="about">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div variants={item}>
          <SectionLabel>{aboutSection.label}</SectionLabel>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 mt-4">
          {/* Left: Photo + Stats */}
          <motion.div className="lg:col-span-2 space-y-5" variants={item}>
            <div className="bracket-card bracket-card-bright bg-surface p-2 callout-frame">
              <img
                src={aboutSection.photo}
                alt="Dr. Mirza Faizaan"
                className="w-full h-auto object-cover"
                style={{ maxHeight: '400px' }}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {aboutSection.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-surface p-3 text-center bracket-card"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: 0.3 + i * 0.1,
                  }}
                >
                  <div className="font-mono text-sm font-bold text-safety">{stat.value}</div>
                  <div className="font-mono text-[9px] text-steel/40 tracking-wider uppercase mt-0.5">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Narrative */}
          <div className="lg:col-span-3">
            <motion.h2
              variants={item}
              className="font-bold text-2xl sm:text-3xl text-steel mb-1"
            >
              {aboutSection.heading}
            </motion.h2>
            <motion.p variants={item} className="text-steel/50 text-sm mb-6">
              {aboutSection.subtitle}
            </motion.p>

            {aboutSection.paragraphs.map((para, i) => (
              <motion.div
                key={i}
                variants={item}
                className="mb-5 pl-4 relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-safety/20" />
                <p className="text-steel/60 text-sm leading-relaxed">{para}</p>
              </motion.div>
            ))}

            <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
              {Object.entries(aboutSection.links).map(([key, link]) => (
                <a
                  key={key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-safety hover:text-[#E6B800] transition-colors tracking-wider uppercase"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
