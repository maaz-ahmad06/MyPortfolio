import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Send } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../utils/audioFx';

const NAV_LINKS = [
  { label: 'Home', href: '#hero', id: 'hero' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Journey', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = NAV_LINKS.map((l) => document.getElementById(l.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (href) => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '1200px',
        zIndex: 9999,
        transition: 'all 0.3s ease'
      }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          borderRadius: '9999px',
          background: isScrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.78)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: isScrolled ? '1px solid rgba(2, 132, 199, 0.25)' : '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: isScrolled
            ? '0 12px 30px -8px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(2, 132, 199, 0.08)'
            : '0 8px 24px -6px rgba(15, 23, 42, 0.07)'
        }}
      >
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          onMouseEnter={() => soundManager.playHover()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#0f172a',
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '-0.02em'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              padding: '2px',
              background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            <img
              src={personalInfo.avatar}
              alt={personalInfo.name}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
          </div>
          <span>
            {personalInfo.firstName} <span className="gradient-text">{personalInfo.lastName}</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '6px'
          }}
          className="desktop-nav-menu"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                onMouseEnter={() => soundManager.playHover()}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  color: isActive ? '#0284c7' : '#475569',
                  background: isActive ? 'rgba(2, 132, 199, 0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(2, 132, 199, 0.25)' : '1px solid transparent',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 2px 10px rgba(2, 132, 199, 0.12)' : 'none'
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Quick Contact CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="btn-magnetic btn-primary-glow"
            style={{
              padding: '8px 18px',
              fontSize: '0.85rem',
              borderRadius: '9999px',
              display: 'inline-flex'
            }}
          >
            <Send size={14} />
            <span>Hire Me</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(15, 23, 42, 0.04)',
              border: '1px solid rgba(15, 23, 42, 0.12)',
              color: '#0f172a',
              cursor: 'pointer'
            }}
            className="mobile-nav-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.97)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            border: '1px solid rgba(2, 132, 199, 0.22)',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 18px 40px -10px rgba(15, 23, 42, 0.16)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            animation: 'float 0.3s ease-out'
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                textDecoration: 'none',
                color: activeSection === link.id ? '#0284c7' : '#334155',
                padding: '12px 16px',
                borderRadius: '12px',
                background: activeSection === link.id ? 'rgba(2, 132, 199, 0.1)' : 'rgba(15, 23, 42, 0.03)',
                fontWeight: 600,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: activeSection === link.id ? '1px solid rgba(2, 132, 199, 0.25)' : '1px solid transparent'
              }}
            >
              <span>{link.label}</span>
              {activeSection === link.id && <Sparkles size={16} color="#0284c7" />}
            </a>
          ))}
        </div>
      )}

      {/* Inline styles for responsive navbar */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav-menu {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
