import { lazy, Suspense, useState } from 'react';
import Preloader from './components/Preloader';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

const ResumeModal = lazy(() => import('./components/ResumeModal'));

const INTRO_STORAGE_KEY = 'portfolio_intro_seen';

function shouldShowIntro() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) !== '1';
  } catch {
    return false;
  }
}

export default function App() {
  const [loading, setLoading] = useState(shouldShowIntro);
  const [showResume, setShowResume] = useState(false);

  const handleIntroComplete = () => {
    try {
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
    } catch {
      // Ignore storage errors in restricted contexts
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* First-visit Preloader */}
      {loading && <Preloader onComplete={handleIntroComplete} />}

      {/* Interactive Canvas Physics Particle Constellation */}
      <ParticleBackground />

      {/* Glowing Interactive Custom Cursor */}
      <CustomCursor />

      {/* Floating Glassmorphism Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenResume={() => setShowResume(true)} />
        <About onOpenResume={() => setShowResume(true)} />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Printable ATS Resume Modal */}
      {showResume && (
        <Suspense fallback={null}>
          <ResumeModal onClose={() => setShowResume(false)} />
        </Suspense>
      )}
    </div>
  );
}
