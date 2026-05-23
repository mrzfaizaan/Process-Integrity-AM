export default function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-3 h-3 bg-safety flex-shrink-0" />
      <span className="font-mono text-[10px] text-steel/40 tracking-[0.15em] uppercase">
        {children}
      </span>
    </div>
  );
}
