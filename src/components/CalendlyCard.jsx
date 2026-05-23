import GhostButton from './GhostButton';

export default function CalendlyCard({ heading, body, cta, url }) {
  return (
    <div className="bg-surface p-5 bracket-card">
      <h4 className="font-semibold text-steel text-sm mb-2">{heading}</h4>
      <p className="text-steel/50 text-xs mb-3">{body}</p>
      <GhostButton href={url} icon="external" external>
        {cta}
      </GhostButton>
    </div>
  );
}
