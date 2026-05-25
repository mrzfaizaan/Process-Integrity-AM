export const privacySection = {
  label: 'Legal',
  heading: 'Privacy Policy',
  intro:
    'This policy explains what data Calibrated AM collects, how it is used, and your rights regarding that data.',
};

export const privacySections = [
  {
    title: 'Data We Collect',
    body: [
      'Contact Form: When you submit a message through our contact form, we collect your name, email address, company name (optional), service interest (optional), and message content. This data is processed by Formspree and forwarded to us via email.',
      'Lead Magnet: When you request our AM Primer download, we collect your email address through Formspree. No other data is collected through this form.',
      'Blog Engagement: Our blog records anonymous read counts and like interactions. A randomly generated visitor identifier (UUID) is stored in your browser\u2019s localStorage. This identifier is transmitted to Supabase when you read or like a blog post. It is not linked to your name, email, or any personally identifiable information.',
      'Analytics: We use Google Analytics 4 to understand how visitors interact with the site. GA4 collects page views, session duration, and interaction events. It sets first-party cookies in your browser for this purpose. No personally identifiable information is collected by our analytics configuration.',
      'Scheduling: Diagnostic calls are booked through Cal.com, an external scheduling service. When you book a call, Cal.com collects your name, email, and any details you provide. Cal.com\u2019s privacy policy governs that data.',
    ],
  },
  {
    title: 'How We Use Your Data',
    body: [
      'Contact form submissions are used solely to respond to your inquiry and are not added to any marketing list without your consent.',
      'Lead magnet email addresses are used only to deliver the requested resource. We do not send unsolicited marketing emails.',
      'Blog engagement data (reads, likes) helps us understand which content is useful. The anonymous visitor identifier prevents duplicate counts.',
      'Analytics data informs site improvements. We do not use GA4 for ad targeting or audience remarketing.',
      'We do not sell, rent, or share your data with third parties for their marketing purposes.',
    ],
  },
  {
    title: 'Third-Party Services',
    body: [
      'Formspree \u2014 Contact form and lead magnet processing (Privacy Policy: formspree.io/legal/privacy-policy).',
      'Supabase \u2014 Blog engagement tracking database, hosted on supabase.co (Privacy Policy: supabase.com/privacy).',
      'Google Analytics 4 \u2014 Anonymous site analytics (Privacy Policy: policies.google.com/privacy).',
      'Cal.com \u2014 Appointment scheduling (Privacy Policy: cal.com/privacy).',
      'Each service processes data according to its own privacy policy. We transmit only the minimum data necessary for each service to function.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'Google Analytics sets cookies (_ga, _ga_*) for session tracking and visitor differentiation. These are first-party cookies with a maximum duration of 2 years.',
      'Our blog engagement system uses localStorage (not cookies) to store a random visitor identifier. This is required for like deduplication and read counting. It contains no personal data.',
      'You can disable cookies through your browser settings. Declining cookies on our consent banner prevents Google Analytics from loading entirely.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'You may request a copy of any personal data we hold about you by emailing mirza@calibratedam.com.',
      'You may request deletion of your contact form submissions from our records.',
      'You may withdraw analytics consent at any time by clearing your browser\u2019s localStorage entry for calibrated-am-cookie-consent, which will re-display the consent banner on your next visit.',
      'For data held by third-party services (Formspree, Supabase, Google, Cal.com), we will direct you to the relevant service\u2019s data access and deletion procedures.',
    ],
  },
];
