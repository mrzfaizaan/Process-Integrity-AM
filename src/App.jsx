import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { initGA, pageview, hasConsent } from './lib/analytics';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CookieBanner from './components/CookieBanner';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    pageview(location.pathname);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    if (hasConsent()) {
      initGA();
    }
  }, []);

  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <ScrollProgress />
      <CookieBanner />
      <div className="relative z-0">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 blueprint-minor opacity-40" />
          <div className="absolute inset-0 blueprint-major opacity-30" />
          <div className="absolute inset-0 surface-grain opacity-[0.04]" />
        </div>
        <Nav />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
