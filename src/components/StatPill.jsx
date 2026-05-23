export default function StatPill({ type, value, suffix, label, sublabel, pct, items }) {
  if (type === 'number') {
    return (
      <div className="bg-surface p-5 bracket-card bracket-card-bright text-center sm:text-left">
        <div className="font-mono text-3xl sm:text-4xl font-bold text-safety tabular-nums">
          {value}{suffix}
        </div>
        <div className="font-mono text-[10px] sm:text-xs text-steel/50 mt-1 tracking-wider uppercase">
          {label}
        </div>
        <div className="font-mono text-[9px] text-steel/30 mt-0.5 tracking-wider uppercase">
          {sublabel}
        </div>
        <div className="w-full h-1 bg-base mt-3">
          <div className="h-full bg-safety" style={{ width: `${pct}%` }} />
        </div>
      </div>
    );
  }

  if (type === 'materials') {
    return (
      <div className="bg-surface p-5 bracket-card bracket-card-bright">
        <div className="font-mono text-[10px] text-steel/40 tracking-[0.15em] uppercase mb-3">
          {label}
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-grounding px-2.5 py-1 text-[11px] text-steel/80 font-medium"
            >
              <span className="w-1.5 h-1.5 bg-safety flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
