export const blogs = [
  {
    slug: '92-5-first-pass-yield',
    title: 'How a 15-Printer Facility Went from 0% to 92.5% First-Pass Yield',
    date: '2026-05-23',
    tags: ['Yield Improvement', 'Print Farm Operations', 'Calibration', 'Case Study'],
    excerpt:
      'Most AM shops treat calibration as optional maintenance. Here is what changed when a facility made it foundational.',
    content: [
      {
        type: 'p',
        text: 'A print farm I worked with ran 15 printers. Every print failed the first time. Not some. Every single one.',
      },
      {
        type: 'p',
        text: 'The facility produced functional prototypes and end-use parts. Experienced operators. Modern equipment. But the workflow was a repair loop: print, fail, diagnose, reprint. The lead operator spent six hours a day troubleshooting. Combined material scrap, operator overtime, and rework costs ran to several lakhs monthly. Deadlines slipped because failures were discovered late.',
      },
      { type: 'h3', text: 'What sustained the failure' },
      {
        type: 'p',
        text: 'Three things kept this state in place.',
      },
      {
        type: 'p',
        text: 'First, production pressure. Deadlines governed everything. If a print looked acceptable, it shipped. Calibration was treated as overhead: something you did when you had time, which was never. The machines degraded slowly, and the failures crept in gradually enough that no single event triggered alarm.',
      },
      {
        type: 'p',
        text: 'Second, knowledge was tribal. Operators knew certain printers were "moody" and certain materials "difficult." They developed workarounds: raft layers on everything, slower speeds on Tuesdays, filament swaps for no articulable reason. These heuristics accumulated over years. Some worked. Most masked deeper problems. None were written down.',
      },
      {
        type: 'p',
        text: 'Third, calibration carried a status problem. The engineering team treated it as technician-level work. The operators, lacking formal training, made ad-hoc adjustments with no unifying method. No one measured first-layer consistency across the fleet. No one logged extrusion multiplier drift over time. The baseline did not exist because no one thought to establish one.',
      },
      { type: 'h3', text: 'Measuring before fixing' },
      {
        type: 'p',
        text: 'I started by measuring.',
      },
      {
        type: 'p',
        text: 'Over three days I logged 40 consecutive prints across the fleet. The failures clustered into three categories. Bed adhesion problems caused roughly six in ten failures. Extrusion inconsistencies, worn nozzles, and clogged gears accounted for another quarter. Slicing errors made up the rest. I also found four printers with measurable axis misalignment and two with extruders far enough out of calibration that they over-extruded by more than 15%.',
      },
      {
        type: 'p',
        text: 'The operators knew something was wrong. They did not know what. They had never seen the data laid out.',
      },
      { type: 'h3', text: 'The intervention' },
      {
        type: 'p',
        text: 'Week one: calibration. I wrote a first-layer protocol that took under ten minutes per printer. Step by step: tram the bed, set nozzle height with a feeler gauge, run a single-layer test patch, measure with calipers, adjust, repeat once. I added an extrusion multiplier calibration using a hollow cube test print. I tuned input shaping on the firmware, which required no additional hardware. I established a maintenance schedule: weekly nozzle cleaning, monthly belt tension checks, quarterly lubrication.',
      },
      {
        type: 'p',
        text: 'Week two: training and documentation. I trained four operators on the calibration protocols. I made them run the procedures themselves, correct their own mistakes, and calibrate printers I had deliberately thrown out of adjustment. I wrote concise SOPs. I mounted quick-reference cards at each printer station. I documented common failure modes with photographs and corrective steps.',
      },
      {
        type: 'p',
        text: 'Week three: parameter optimization. I built material-specific slicing profiles for PLA, PET-G, ABS, and TPU. I reduced average print time by 20% through optimized speeds, accelerations, and infill patterns. I added geometry-based slicing rules for tall parts, overhangs, and parts with large footprints.',
      },
      { type: 'h3', text: 'What changed' },
      {
        type: 'p',
        text: 'The facility went from zero first-pass prints to 92.5% within four weeks. Failures dropped from over 40 per month to fewer than three. The lead operator\u2019s troubleshooting time fell from six hours daily to under one. Material waste contracted by roughly 90%. The changes held: the facility sustained above 90% yield for the following eight weeks.',
      },
      {
        type: 'p',
        text: 'What made the difference was not sophisticated technology. Input shaping and extrusion calibration are well-documented techniques. The literature on first-layer optimization is extensive. The problem was never a lack of available solutions.',
      },
      {
        type: 'p',
        text: 'The problem was that calibration had been classified as optional. It was not absence of knowledge. It was absence of priority.',
      },
      {
        type: 'p',
        text: 'A facility does not drift from 0% to 92.5% because someone discovers a novel technique. It drifts because someone finally measures the baseline, writes down the procedure, trains the operators, and insists that calibration is not overhead. It is the operation.',
      },
    ],
  },
];
