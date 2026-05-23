import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSchematic({ scrollYProgress }) {
  const y = useTransform(scrollYProgress || { get: () => 0 }, [0, 1], [0, -100]);

  return (
    <motion.div
      className="absolute right-0 top-16 lg:top-6 w-80 sm:w-[28rem] h-80 sm:h-[28rem] pointer-events-none select-none"
      style={{ y, opacity: 0.035 }}
    >
      <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Isometric build plate */}
        <g stroke="#E0E0E0" strokeWidth="0.5">
          <polygon points="250,60 450,180 250,300 50,180" fill="none" />
          <polygon points="250,60 450,180 450,300 250,180" fill="none" />
          <polygon points="250,300 450,300 450,420 250,420" fill="none" />
        </g>

        {/* Toolpath raster lines on top face */}
        <g stroke="#FFCC00" strokeWidth="0.4" opacity="0.6">
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1={80 + i * 24} y1={190 + i * 14} x2={430 - i * 24} y2={190 + i * 14} />
          ))}
        </g>

        {/* Measurement callouts */}
        <g stroke="#E0E0E0" strokeWidth="0.4">
          {/* Horizontal dimension line */}
          <line x1="30" y1="360" x2="470" y2="360" />
          <line x1="30" y1="350" x2="30" y2="370" />
          <line x1="470" y1="350" x2="470" y2="370" />
          {/* Arrowheads */}
          <polyline points="30,360 42,354" />
          <polyline points="30,360 42,366" />
          <polyline points="470,360 458,354" />
          <polyline points="470,360 458,366" />

          {/* Vertical dimension */}
          <line x1="480" y1="170" x2="480" y2="310" />
          <line x1="472" y1="170" x2="488" y2="170" />
          <line x1="472" y1="310" x2="488" y2="310" />
          <polyline points="480,170 474,182" />
          <polyline points="480,170 486,182" />
        </g>

        {/* Calibration target circles */}
        <g stroke="#FFCC00" strokeWidth="0.3" opacity="0.5">
          <circle cx="420" cy="100" r="18" />
          <circle cx="420" cy="100" r="12" />
          <circle cx="420" cy="100" r="6" />
          <line x1="420" y1="80" x2="420" y2="120" />
          <line x1="400" y1="100" x2="440" y2="100" />
        </g>

        {/* Coordinate arrows */}
        <g stroke="#E0E0E0" strokeWidth="0.5" opacity="0.4">
          <line x1="450" y1="180" x2="490" y2="150" markerEnd="url(#arrow)" />
          <line x1="250" y1="60" x2="250" y2="20" markerEnd="url(#arrowUp)" />
        </g>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10" fill="#E0E0E0" />
          </marker>
          <marker id="arrowUp" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10" fill="#E0E0E0" />
          </marker>
        </defs>
      </svg>
    </motion.div>
  );
}
