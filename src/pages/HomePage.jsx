import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Hero from '../sections/Hero';
import AboutMe from '../sections/AboutMe';
import Proof from '../sections/Proof';
import Problem from '../sections/Problem';
import ServicesOverview from '../sections/ServicesOverview';
import Process from '../sections/Process';
import Credentials from '../sections/Credentials';
import Contact from '../sections/Contact';
import SectionDivider from '../components/SectionDivider';
import { site } from '../data/site';

export default function HomePage() {
  return (
    <motion.main
      className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 space-y-20 lg:space-y-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>{site.name} | PhD-Led AM Consulting</title>
        <meta name="description" content={site.description} />
      </Helmet>

      <Hero />
      <SectionDivider />
      <AboutMe />
      <SectionDivider />
      <Proof />
      <SectionDivider />
      <Problem />
      <SectionDivider />
      <ServicesOverview />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <Credentials />
      <SectionDivider />
      <Contact />
    </motion.main>
  );
}
