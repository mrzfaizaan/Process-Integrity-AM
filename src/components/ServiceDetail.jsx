import InlineIcon from './InlineIcon';

export default function ServiceDetail({ id, icon, title, badge, what, value, bullets }) {
  return (
    <section id={id}>
      <div className="bg-surface p-8 sm:p-10 lg:p-12 bracket-card">
        <div className="flex items-center gap-2 mb-3">
          <div className="icon-circle">
            <InlineIcon name={icon} className="w-4 h-4 text-safety" />
          </div>
          <h3 className="font-semibold text-xl text-steel">{title}</h3>
          {badge && (
            <span className="font-mono text-[9px] text-safety/70 tracking-wider uppercase border border-safety/20 px-2 py-0.5 ml-auto">
              {badge}
            </span>
          )}
        </div>
        <p className="text-steel/60 text-sm leading-relaxed mb-3">
          <strong className="text-steel">What it is:</strong> {what}
        </p>
        <p className="text-steel/60 text-sm leading-relaxed mb-4">
          <strong className="text-steel">Value:</strong> {value}
        </p>
        {bullets && bullets.length > 0 && (
          <ul className="space-y-2 text-sm text-steel/50 border-t border-divider pt-4">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <InlineIcon name="check" className="w-4 h-4 text-safety mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                {b.bold && <strong className="text-steel">{b.bold}:</strong>} {b.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
