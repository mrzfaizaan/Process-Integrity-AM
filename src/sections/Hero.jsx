import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionLabel from '../components/SectionLabel';
import CtaButton from '../components/CtaButton';
import GhostButton from '../components/GhostButton';
import GaugeIndicator from '../components/GaugeIndicator';
import SpecimenTray from '../components/SpecimenTray';
import HeroSchematic from '../components/HeroSchematic';
import { hero, heroStats } from '../data/hero';
import { site } from '../data/site';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const child = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  return (
    <section id="hero" ref={sectionRef} className="relative overflow-hidden">
      <Helmet>
        <title>{site.name} | PhD-Led AM Consulting</title>
        <meta name="description" content={site.description} />
      </Helmet>

      <HeroSchematic scrollYProgress={scrollYProgress} />

      <motion.div
        className="max-w-3xl relative z-10"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={child}>
          <SectionLabel>{hero.label}</SectionLabel>
        </motion.div>

        <motion.h1
          variants={child}
          className="font-bold text-3xl sm:text-4xl lg:text-5xl text-steel mb-4 leading-tight"
        >
          {hero.headlineParts.before}
          <span className="text-safety headline-accent">{hero.headlineParts.highlight}</span>
          {hero.headlineParts.after}
        </motion.h1>

        <motion.p
          variants={child}
          className="text-steel/60 text-base sm:text-lg leading-relaxed max-w-2xl mb-8"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div variants={child} className="flex flex-wrap items-center gap-4 mb-10">
          <CtaButton href={hero.primaryCta.href}>{hero.primaryCta.text}</CtaButton>
          <GhostButton href={hero.ghostCta.href} icon="arrow">
            {hero.ghostCta.text}
          </GhostButton>
          <GhostButton href={hero.primerCta.href} icon="arrow">
            {hero.primerCta.text}
          </GhostButton>
        </motion.div>

        <motion.div variants={child} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Pill 1: FPY Donut Gauge */}
          <div className="bg-surface p-6 bracket-card bracket-card-bright flex flex-col items-center text-center">
            <GaugeIndicator type="donut" pct={heroStats[0].pct} value={heroStats[0].value} suffix={heroStats[0].suffix} />
            <div className="font-mono text-[10px] text-steel/50 mt-2 tracking-wider uppercase">
              {heroStats[0].label}
            </div>
            <div className="font-mono text-[9px] text-steel/30 mt-0.5 tracking-wider uppercase">
              {heroStats[0].sublabel}
            </div>
          </div>

          {/* Pill 2: Materials Specimen Tray */}
          <div className="bg-surface p-5 bracket-card bracket-card-bright">
            <SpecimenTray label={heroStats[1].label} items={heroStats[1].items} />
          </div>

          {/* Pill 3: Speed Arc Gauge */}
          <div className="bg-surface p-6 bracket-card bracket-card-bright flex flex-col items-center text-center">
            <GaugeIndicator type="arc" pct={heroStats[2].pct} value={heroStats[2].value} suffix={heroStats[2].suffix} />
            <div className="font-mono text-[10px] text-steel/50 mt-1 tracking-wider uppercase">
              {heroStats[2].label}
            </div>
            <div className="font-mono text-[9px] text-steel/30 mt-0.5 tracking-wider uppercase">
              {heroStats[2].sublabel}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
