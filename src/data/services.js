export const servicesSection = {
  label: 'Engagement Modules',
  heading: 'Engagements built around outcomes',
  intro:
    'Each engagement targets a specific, high-impact problem \u2014 backed by PhD-level methodology and proven commercial results. Every engagement is scoped and quoted independently.',
};

export const primaryServices = [
  {
    id: 'audit',
    icon: 'grid',
    badge: 'Onsite \u00b7 2\u20133 Weeks',
    title: 'Print Farm Operations Audit',
    body: 'On-site diagnostic of your AM production floor. Identify bottlenecks, implement calibration protocols, train operators, and deliver a yield-optimization roadmap.',
    what: 'A 2\u20133 week onsite engagement where we diagnose and fix your AM production floor. We walk in, identify bottlenecks, implement calibration protocols, train personnel, and deliver a first-pass yield optimization roadmap.',
    value: 'In our experience, print farms lose substantial revenue to failed prints, rework, and slow throughput. We audit your operation, implement proven standardized protocols, and train your team.',
    bullets: [
      { bold: 'Expected ROI', text: 'Combined throughput improvement within 90 days (calibration + slicing optimization + SOPs)' },
      { bold: 'Deliverables', text: 'Calibration protocol checklist, operator training materials, 30/60/90-day improvement targets, PM schedule, written SOP' },
      { bold: 'Timeline', text: '2\u20133 weeks onsite + 2 weeks remote follow-up' },
    ],
  },
  {
    id: 'qualification',
    icon: 'edit',
    badge: 'Structured \u00b7 Multi-Month',
    title: 'Materials Qualification Program',
    body: 'Structured testing and validation for new materials \u2014 composites, biomedical, high-performance polymers \u2014 with regulatory-ready documentation.',
    what: 'A structured testing & process validation service for customers who need to qualify a new material (composite, biomedical, high-performance polymer) for their application.',
    value: 'De-risk material adoption with regulatory-ready documentation, proven print parameters, and durability data that meets ASTM/ISO standards.',
    bullets: [
      { bold: 'Edge', text: '120+ tensile specimens tested (PCL composite project). PhD research credibility + durability data expertise.' },
      { bold: 'Deliverables', text: 'Fully characterized material profile, print parameter sets, mechanical property dataset, validation report, SOP for production use.' },
    ],
  },
  {
    id: 'research',
    icon: 'checkCircle',
    badge: 'Remote \u00b7 Advisory',
    title: 'Research & Technical Advisory',
    body: 'Technical direction for research programs. Experimental design methodology, characterization guidance, feasibility assessments, and technical review for AM research projects.',
    what: 'Supervision-based technical advisory for research programs in additive manufacturing. We provide experimental design methodology, characterization guidance, and feasibility assessments \u2014 you execute the work with our direction.',
    value: 'Your research program needs PhD-level AM expertise but hiring a full-time researcher isn\u2019t feasible. We provide the methodological rigor and technical direction \u2014 you build in-house capability over time.',
    bullets: [
      { bold: 'Format', text: 'Remote advisory, scoped per engagement. Regular check-ins with technical review and direction.' },
      { bold: 'Scope', text: 'Experimental design (DOE, ANOVA, Taguchi), testing protocol development (ASTM standards), characterization methodology, feasibility assessment for new materials/processes.' },
      { bold: 'Edge', text: 'PhD-level experimental methodology. 500+ specimens tested under DOE arrays. Multi-modal characterization expertise (micro-CT, SEM, FTIR, XRD, DSC).' },
    ],
  },
  {
    id: 'training',
    icon: 'users',
    badge: 'Workshop \u00b7 2\u20135 Days',
    title: 'Technical Training Programs',
    body: 'Cohort-based workshops for 8\u201315 participants. Shop-floor calibration, SOP implementation, and leadership for AM operations teams. Delivered at your facility.',
    what: 'A 2\u20135 day cohort-based workshop for 8\u201315 participants. Covers shop-floor calibration, SOP implementation, slicing fundamentals, and AM operations leadership. Delivered onsite at your facility with hands-on printer training.',
    value: 'Your team lacks systematic AM knowledge. Operators rely on trial and error. We deliver structured training that builds autonomous capability \u2014 not dependency on external experts.',
    bullets: [
      { bold: 'Format', text: '2\u20135 day workshops, 8\u201315 participants per cohort' },
      { bold: 'Topics', text: 'Printer calibration, failure diagnosis, slicing optimization, SOP implementation, leadership for AM operations' },
      { bold: 'Edge', text: 'Trained 4 operators from zero AM experience to 92.5% first-pass yield. Delivered workshops at academic and industry institutions.' },
    ],
  },
];

export const relatedServices = [
  {
    id: 'optimization',
    icon: 'info',
    badge: 'Remote-Friendly',
    title: 'Process Optimization Consulting',
    body: 'Deep technical tuning of slicing parameters, material settings, and print strategies. Cut failures and reduce print times with rigorous methodology.',
    what: 'Deep technical consulting for specific challenges: slicing optimization, material qualification, troubleshooting print failures, speed/quality trade-offs, parameter development for new materials.',
    value: 'Reduce print failures by 30\u201350%, cut print times by 15\u201325%, and gain repeatable parameters for new materials \u2014 no guesswork, rigorous DOE if needed.',
    bullets: [
      { bold: 'Edge', text: 'CAD-to-slicer parameter translation with 20% print time reduction case study (PLA). Input shaping expertise uncommon in industry.' },
      { bold: 'Delivery', text: 'Can be performed remotely using your files + periodic Zoom sessions.' },
    ],
  },
  {
    id: 'dfm',
    icon: 'cube',
    badge: 'Remote \u00b7 Per Product',
    title: 'Design for Manufacturability (DFM)',
    body: 'CAD review, printability assessment, and optimization for speed, cost, and quality. Deliver manufacturing-ready design plus slicing parameters.',
    what: 'We review your CAD model, assess printability, optimize for speed/cost/quality, and deliver a manufacturing-ready design + slicing parameters.',
    value: 'Your design is beautiful but may print slow and fail. We optimize it for additive manufacturing \u2014 faster print times, better quality, lower material cost.',
    bullets: [
      { bold: 'Expected outcome', text: '15\u201330% time/cost savings vs. default slicing.' },
      { bold: 'Edge', text: 'We think like a product engineer (DFM) + slicing expert simultaneously. Deliver both CAD changes + slicing parameters.' },
    ],
  },
  {
    id: 'equipment',
    icon: 'monitor',
    badge: 'Retainer',
    title: 'Equipment Procurement Advisory',
    body: 'Help you select the right AM equipment for your application. Technical assessment, specification matching, and vendor evaluation.',
    what: 'Technical advisory for AM equipment selection. We assess your application requirements, evaluate vendor options, and recommend the right printer for your specific materials and production needs.',
    value: 'Buying the wrong printer costs lakhs in underutilized equipment. We bring hands-on experience with 15+ printer types across FDM, pellet extrusion, and high-temperature systems.',
    bullets: [
      { bold: 'Edge', text: 'Managed 15+ printer fleet across build volumes from 200mm\u00b3 to 600mm\u00b3. Hands-on with FDM, pellet extrusion, and PEEK-capable systems.' },
      { bold: 'Engagement', text: 'Retainer model (3-month). Scoped per engagement.' },
    ],
  },
  {
    id: 'quality',
    icon: 'document',
    badge: 'Custom \u00b7 Per Engagement',
    title: 'Quality Systems & SOP Development',
    body: 'Design and document your AM quality system \u2014 process controls, calibration, testing protocols, documentation, audit trails.',
    what: 'Design and document a complete AM quality system: process controls, calibration procedures, testing protocols, documentation standards, and audit trails. Built on ISO-style governance principles.',
    value: 'Without documented quality systems, your AM operation cannot scale. Every new operator reintroduces variability. We build the governance infrastructure that makes your operation repeatable.',
    bullets: [
      { bold: 'Edge', text: '30+ SOPs authored across 6 functions in a 30+ member organization. Reduced inter-departmental friction and HR escalations.' },
      { bold: 'Deliverables', text: 'Process control documentation, calibration protocols, testing SOPs, audit framework, training materials.' },
    ],
  },
];
