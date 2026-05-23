import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter basename="/Process-Integrity-AM">
        <ScrollToTop />
        <ScrollProgress />
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
    </HelmetProvider>
  );
}
