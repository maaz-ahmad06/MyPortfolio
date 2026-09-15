import { useState } from 'react';
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

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 0-100% Cyber Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Interactive Canvas Physics Particle Constellation */}
      <ParticleBackground />

      {/* Glowing Interactive Custom Cursor */}
      <CustomCursor />

      {/* Floating Glassmorphism Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
