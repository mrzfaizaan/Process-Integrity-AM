import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { footerLinks, footerContact, copyright } from '../data/footer';

export default function Footer() {
  return (
    <footer className="bg-grounding border-t border-divider">
      <div className="h-[2px] bg-safety/20" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <span className="font-bold text-lg tracking-tight text-steel">
              Calibrated<span className="text-safety">AM</span>
            </span>
            <p className="text-steel/40 text-xs leading-relaxed mt-2 max-w-xs">
              {site.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-steel/40 tracking-[0.15em] uppercase mb-3">
              Quick Links
            </h4>
            <div className="space-y-1.5">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-steel/50 text-sm hover:text-steel transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-steel/40 tracking-[0.15em] uppercase mb-3">
              Contact
            </h4>
            <div className="space-y-1.5">
              {footerContact.map((line, i) => (
                <p key={i} className="text-steel/50 text-sm">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-divider">
          <p className="font-mono text-[10px] text-steel/30 tracking-[0.15em] uppercase text-center">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
