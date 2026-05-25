import ReactGA from 'react-ga4';

const MEASUREMENT_ID = 'G-NKFL61NH93';
const CONSENT_KEY = 'calibrated-am-cookie-consent';

export function hasConsent() {
  return localStorage.getItem(CONSENT_KEY) === 'accepted';
}

export function initGA() {
  ReactGA.initialize(MEASUREMENT_ID);
}

export function pageview(path) {
  ReactGA.send({ hitType: 'pageview', page: path });
}
