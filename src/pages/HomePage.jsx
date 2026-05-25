import { useMemo } from 'react';
import { motion } from 'framer-motion';
import DocumentHead from '../components/DocumentHead';
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
  const pageTitle = `${site.name} | PhD-Led AM Consulting`;
  const baseUrl = 'https://mrzfaizaan.github.io/Calibrated-AM';

  const orgSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: site.name,
        url: baseUrl,
        description: site.description,
        logo: `${baseUrl}/favicon.svg`,
        sameAs: [
          'https://linkedin.com/in/mirzafaizaan',
        ],
      },
      {
        '@type': 'WebSite',
        name: site.name,
        url: baseUrl,
      },
    ],
  }), []);

  return (
    <motion.main
      className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 space-y-20 lg:space-y-28"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <DocumentHead
        title={pageTitle}
        description={site.description}
        ogTitle={pageTitle}
        ogDescription={site.description}
        ogUrl={`${baseUrl}/`}
        canonical={`${baseUrl}/`}
        jsonLd={orgSchema}
      />

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
