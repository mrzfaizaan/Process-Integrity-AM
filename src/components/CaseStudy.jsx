export default function CaseStudy({ data }) {
  return (
    <div className="bg-surface p-8 sm:p-10 mb-8 bracket-card">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-3 h-3 bg-safety flex-shrink-0" />
        <span className="font-mono text-[10px] text-steel/40 tracking-[0.15em] uppercase">
          {data.label}
        </span>
      </div>
      <h3 className="font-semibold text-xl sm:text-2xl text-steel mb-4">{data.title}</h3>
      <p className="text-steel/60 text-sm leading-relaxed mb-6 max-w-3xl">{data.body}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {data.stats.map((s, i) => (
          <div key={i} className="bg-base p-4 bracket-card">
            <div className="font-mono text-2xl font-bold text-safety">{s.value}</div>
            <div className="font-mono text-[10px] text-steel/40 tracking-wider uppercase mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
