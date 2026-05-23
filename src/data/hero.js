export const hero = {
  label: 'Process Integrity AM',
  headlineParts: {
    before: 'Your print farm is losing ',
    highlight: '10\u201330% of revenue',
    after: ' to failed prints.',
  },
  subtitle:
    'PhD-led additive manufacturing consulting. We fix broken AM operations \u2014 turning unpredictable, low-yield print farms into high-throughput, first-time-right production lines.',
  primaryCta: { text: 'Schedule Free Diagnostic', href: '/#contact' },
  ghostCta: { text: 'View Services', href: '/services' },
};

export const heroStats = [
  {
    type: 'number',
    value: '92.5',
    suffix: '%',
    label: 'First-Pass Yield',
    sublabel: '0% \u2192 92.5% in 8 weeks',
    pct: 92.5,
  },
  {
    type: 'materials',
    label: 'Materials Qualified',
    items: [
      'Medical-grade PEEK',
      'Biocompatible PCL composite',
      'CF/PLA',
      'CF/ABS',
      'Direct pellet extrusion',
    ],
  },
  {
    type: 'number',
    value: '40',
    suffix: '%',
    label: 'Faster Production',
    sublabel: '<8% failure rate sustained',
    pct: 40,
  },
];
