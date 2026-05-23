import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import ProcessStepCard from '../components/ProcessStepCard';
import { processSection, steps } from '../data/process';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function Process() {
  return (
    <section id="process">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.div variants={item}>
          <SectionLabel>{processSection.label}</SectionLabel>
          <h2 className="font-bold text-2xl sm:text-3xl text-steel mb-3">
            {processSection.heading}
          </h2>
          <p className="text-steel/60 text-sm leading-relaxed max-w-3xl mb-10">
            {processSection.intro}
          </p>
        </motion.div>

        {/* G-Code raster background wrapper */}
        <div className="relative">
          <div className="absolute inset-0 gcode-bg rounded-sm pointer-events-none" />

          {/* Measurement ruler line */}
          <div className="relative mb-8">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-safety/20" />
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-[1px] bg-safety/30"
                style={{ top: -4, left: `${(i + 0.5) * 25}%` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
              />
            ))}
          </div>

          {/* Step cards with flow connectors */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <motion.div variants={item}>
                  <ProcessStepCard {...s} />
                </motion.div>

                {/* Connector arrows between cards (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-safety/30">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}

                {/* Connector arrows between cards (mobile/tablet — every 2nd card) */}
                {i % 2 === 0 && i < steps.length - 2 && (
                  <div className="lg:hidden flex justify-center my-1 text-safety/20">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M3 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
