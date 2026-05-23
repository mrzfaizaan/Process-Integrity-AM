import { useState } from 'react';
import { formOptions } from '../data/contact';

const FORMSPREE_ID = 'xgoqzzqo';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus('loading');

    try {
      const res = await fetch('https://formspree.io/f/' + FORMSPREE_ID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, service, message }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-surface p-6 sm:p-8 bracket-card">
        <h3 className="font-semibold text-lg text-steel mb-3">Message Sent</h3>
        <p className="text-steel/60 text-sm leading-relaxed">
          Thank you. I will respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form id="contactForm" onSubmit={handleSubmit} className="bg-surface p-6 sm:p-8 bracket-card">
      <h3 className="font-semibold text-lg text-steel mb-5">SEND MESSAGE</h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block font-mono text-[10px] text-steel/50 tracking-wider uppercase mb-1.5">
            Full Name *
          </label>
          <input type="text" id="name" required className="input-field" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email" className="block font-mono text-[10px] text-steel/50 tracking-wider uppercase mb-1.5">
            Email Address *
          </label>
          <input type="email" id="email" required className="input-field" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="company" className="block font-mono text-[10px] text-steel/50 tracking-wider uppercase mb-1.5">
            Company
          </label>
          <input type="text" id="company" className="input-field" placeholder="Company name" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
        <div>
          <label htmlFor="service" className="block font-mono text-[10px] text-steel/50 tracking-wider uppercase mb-1.5">
            Service of Interest
          </label>
          <select id="service" className="input-field appearance-none" value={service} onChange={(e) => setService(e.target.value)}>
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3.5 bg-safety text-grounding font-semibold text-sm hover:bg-[#E6B800] transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'SENDING...' : 'TRANSMIT MESSAGE'}
      </button>

      {status === 'error' && (
        <p className="text-xs text-red-400 mt-3">
          Something went wrong. Email mirza@amconsulting.in directly.
        </p>
      )}
    </form>
  );
}
