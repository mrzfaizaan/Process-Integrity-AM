import { formOptions } from '../data/contact';

export default function ContactForm() {
  return (
    <form id="contactForm" className="bg-surface p-6 sm:p-8 bracket-card">
      <h3 className="font-semibold text-lg text-steel mb-5">SEND MESSAGE</h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block font-mono text-[10px] text-steel/50 tracking-wider uppercase mb-1.5">
            Full Name *
          </label>
          <input type="text" id="name" required className="input-field" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="block font-mono text-[10px] text-steel/50 tracking-wider uppercase mb-1.5">
            Email Address *
          </label>
          <input type="email" id="email" required className="input-field" placeholder="you@company.com" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="company" className="block font-mono text-[10px] text-steel/50 tracking-wider uppercase mb-1.5">
            Company
          </label>
          <input type="text" id="company" className="input-field" placeholder="Company name" />
        </div>
        <div>
          <label htmlFor="service" className="block font-mono text-[10px] text-steel/50 tracking-wider uppercase mb-1.5">
            Service of Interest
          </label>
          <select id="service" className="input-field appearance-none">
            {formOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-grounding">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="message" className="block font-mono text-[10px] text-steel/50 tracking-wider uppercase mb-1.5">
          What challenge are you facing? *
        </label>
        <textarea
          id="message"
          required
          rows={4}
          className="input-field resize-y"
          placeholder="e.g., Our print farm yield is below 60%, we need to qualify a new composite material..."
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3.5 bg-safety text-grounding font-semibold text-sm hover:bg-[#E6B800] transition-colors"
      >
        TRANSMIT MESSAGE
      </button>
    </form>
  );
}
