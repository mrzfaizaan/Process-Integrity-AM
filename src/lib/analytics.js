import ReactGA from 'react-ga4';

const MEASUREMENT_ID = 'G-NKFL61NH93';

export function initGA() {
  ReactGA.initialize(MEASUREMENT_ID);
}

export function pageview(path) {
  ReactGA.send({ hitType: 'pageview', page: path });
}
