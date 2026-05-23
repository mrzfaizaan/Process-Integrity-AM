import { motion } from 'framer-motion';

export default function SectionDivider() {
  return (
    <motion.div
      className="section-divider-line hash-marks max-w-6xl mx-auto px-4 sm:px-6"
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { duration: 0.5 },
      }}
      viewport={{ once: true }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{
          opacity: 1,
          scale: [0, 1.2, 1],
          transition: {
            type: 'spring',
            stiffness: 400,
            damping: 15,
          },
        }}
        viewport={{ once: true }}
      >
        <div className="w-[8px] h-[8px] bg-safety rotate-45" />
      </motion.div>
    </motion.div>
  );
}
