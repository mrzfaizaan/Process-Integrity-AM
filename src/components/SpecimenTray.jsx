export default function SpecimenTray({ label, items }) {
  return (
    <div className="space-y-3">
      <div className="font-mono text-[10px] text-steel/40 tracking-[0.15em] uppercase">
        {label}
      </div>
      <div className="grid grid-cols-1 gap-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 bg-grounding/50 px-2.5 py-1.5">
            <span className="font-mono text-[9px] text-safety/50 w-4 text-right">{String(i + 1).padStart(2, '0')}</span>
            <span className="w-1.5 h-1.5 bg-safety flex-shrink-0" />
            <span className="text-[11px] text-steel/70 font-medium leading-tight">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
