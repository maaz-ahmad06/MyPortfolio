import { lazy, Suspense, useEffect, useState } from 'react';
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
import TrackProjectsPage from './components/TrackProjectsPage';
import AdminModal from './components/AdminModal';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

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

function PortfolioAppContent() {
  const { projectTracks } = usePortfolio();
  const [loading, setLoading] = useState(shouldShowIntro);
  const [showResume, setShowResume] = useState(false);
  const [showAdmin, setShowAdmin] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.hash === '#admin';
  });

  const [activeTrack, setActiveTrack] = useState(() => {
    if (typeof window === 'undefined') return null;
    const hash = window.location.hash;
    if (hash && hash.startsWith('#projects-')) {
      const trackId = hash.replace('#projects-', '');
      return projectTracks.find((t) => t.id === trackId) || null;
    }
    return null;
  });

  const handleIntroComplete = () => {
    try {
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
    } catch {
      // Ignore storage errors in restricted contexts
    }
    setLoading(false);
  };

  const handleOpenTrack = (track) => {
    setActiveTrack(track);
    try {
      window.history.pushState({ trackId: track.id }, '', `#projects-${track.id}`);
    } catch {
      // Ignore
    }
  };

  const handleCloseTrack = () => {
    setActiveTrack(null);
    try {
      if (window.location.hash.startsWith('#projects-')) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch {
      // Ignore
    }
    // Return scroll position back to #projects on main page
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView();
      }
    }, 50);
  };

  // Listen for hash changes & browser back button
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setShowAdmin(true);
      } else if (hash && hash.startsWith('#projects-')) {
        const trackId = hash.replace('#projects-', '');
        const matched = projectTracks.find((t) => t.id === trackId);
        setActiveTrack(matched || null);
      } else {
        setActiveTrack(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [projectTracks]);

  // Keyboard shortcut for Secret Admin: Ctrl + Shift + A (or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setShowAdmin((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* First-visit Preloader */}
      {loading && <Preloader onComplete={handleIntroComplete} />}

      {/* Interactive Canvas Physics Particle Constellation */}
      <ParticleBackground />

      {/* Glowing Interactive Custom Cursor */}
      <CustomCursor />

      {/* When a track is active, render ONLY the dedicated TrackProjectsPage */}
      {activeTrack ? (
        <TrackProjectsPage
          track={activeTrack}
          onBack={handleCloseTrack}
        />
      ) : (
        <>
          {/* Floating Glassmorphism Navbar */}
          <Navbar />

          {/* Main Content Sections */}
          <main>
            <Hero onOpenResume={() => setShowResume(true)} />
            <About onOpenResume={() => setShowResume(true)} />
            <Skills />
            <Projects onOpenTrack={handleOpenTrack} />
            <Services />
            <Experience />
            <Contact />
          </main>

          {/* Footer */}
          <Footer onOpenAdmin={() => setShowAdmin(true)} />
        </>
      )}

      {/* Printable ATS Resume Modal */}
      {showResume && (
        <Suspense fallback={null}>
          <ResumeModal onClose={() => setShowResume(false)} />
        </Suspense>
      )}

      {/* Secret Admin CMS Modal */}
      <AdminModal
        isOpen={showAdmin}
        onClose={() => {
          setShowAdmin(false);
          if (window.location.hash === '#admin') {
            try {
              window.history.replaceState(null, '', window.location.pathname + window.location.search);
            } catch {
              // Ignore
            }
          }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioAppContent />
    </PortfolioProvider>
  );
}
