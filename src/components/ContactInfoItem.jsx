import InlineIcon from './InlineIcon';

export default function ContactInfoItem({ icon, title, value, sub }) {
  return (
    <div className="flex items-start gap-3">
      <InlineIcon name={icon} className="w-5 h-5 text-safety mt-0.5 flex-shrink-0" />
      <div>
        <h4 className="font-semibold text-steel text-sm">{title}</h4>
        <p className="text-steel/60 text-sm">{value}</p>
        {sub && (
          <p className="font-mono text-[10px] text-steel/30 mt-0.5 tracking-wider uppercase">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
