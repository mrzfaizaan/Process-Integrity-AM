import InlineIcon from './InlineIcon';

export default function CredentialItem({ title, subtext }) {
  return (
    <div className="flex items-start gap-3">
      <div className="icon-circle mt-0.5">
        <InlineIcon name="check" className="w-3.5 h-3.5 text-safety" strokeWidth={3} />
      </div>
      <div>
        <h4 className="font-semibold text-steel text-sm">{title}</h4>
        <p className="text-steel/40 text-xs mt-0.5">{subtext}</p>
      </div>
    </div>
  );
}
