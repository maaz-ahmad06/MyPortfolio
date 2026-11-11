import { useState, useEffect } from 'react';
import { ArrowRight, FileText, MessageCircle, Sparkles, Server, Atom, ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../utils/audioFx';

export default function Hero({ onOpenResume }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Typewriter effect
  useEffect(() => {
    const roles = personalInfo.roles;
    const currentFullRole = roles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullRole.substring(0, displayText.length + 1));
        setTypingSpeed(80);

        if (displayText.length === currentFullRole.length) {
          setTypingSpeed(2200); // Pause on complete word
          setIsDeleting(true);
        }
      } else {
        setDisplayText(currentFullRole.substring(0, displayText.length - 1));
        setTypingSpeed(45);

        if (displayText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(400);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, typingSpeed]);

  const handleCtaClick = (targetId) => {
    soundManager.playClick();
    const elem = document.querySelector(targetId);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '85px 24px 30px',
        overflow: 'hidden'
      }}
    >
      {/* Ambient background glow orbs */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          animation: 'pulseGlow 8s ease-in-out infinite'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          animation: 'pulseGlow 10s ease-in-out infinite'
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.9fr',
          gap: '50px',
          alignItems: 'center',
          zIndex: 10
        }}
        className="hero-grid"
      >
        {/* Left Column: Text & CTAs */}
        <div>
          {/* Availability Status Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(5, 150, 105, 0.08)',
              border: '1px solid rgba(5, 150, 105, 0.25)',
              marginBottom: '24px',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.1)'
            }}
          >
            <span className="radar-dot" />
            <span className="font-mono" style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 600 }}>
              {personalInfo.status}
            </span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
              lineHeight: 1.1,
              fontWeight: 800,
              marginBottom: '16px',
              color: 'var(--text-primary)'
            }}
          >
            Hi, I'm{' '}
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>

          {/* Dynamic Typewriter Role */}
          <div
            style={{
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px'
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: 'clamp(1.2rem, 2.8vw, 1.85rem)',
                fontWeight: 700,
                color: '#0284c7'
              }}
            >
              {displayText}
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '1.1em',
                  backgroundColor: '#2563eb',
                  marginLeft: '4px',
                  animation: 'pulseGlow 1s infinite'
                }}
              />
            </span>
          </div>

          {/* Bio Description */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              marginBottom: '36px',
              maxWidth: '580px'
            }}
          >
            {personalInfo.bio}
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '40px'
            }}
          >
            <button
              onClick={() => handleCtaClick('#projects')}
              onMouseEnter={() => soundManager.playHover()}
              className="btn-magnetic btn-primary-glow"
            >
              <span>Explore My Projects</span>
              <ArrowRight size={18} />
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleCtaClick('#contact');
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="btn-magnetic btn-glass-glow"
            >
              <MessageCircle size={18} />
              <span>Let's Talk</span>
            </a>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                if (onOpenResume) onOpenResume();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="btn-magnetic btn-glass-glow"
            >
              <FileText size={18} />
              <span>View / Save CV</span>
            </button>
          </div>

          {/* Social Quick Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>FIND ME ON:</span>
            {[
              { icon: <GithubIcon size={18} />, href: personalInfo.socials.github, label: 'GitHub' },
              { icon: <LinkedinIcon size={18} />, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
              { icon: <MessageCircle size={18} />, href: personalInfo.socials.whatsapp, label: 'WhatsApp' }
            ].map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={s.label}
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(15, 23, 42, 0.12)',
                  color: '#475569',
                  textDecoration: 'none',
                  boxShadow: '0 4px 10px rgba(15, 23, 42, 0.05)',
                  transition: 'all 0.25s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#0284c7';
                  e.currentTarget.style.borderColor = 'rgba(2, 132, 199, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 18px rgba(2, 132, 199, 0.18)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#475569';
                  e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.12)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(15, 23, 42, 0.05)';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Cyber Portrait Showcase */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div className="portrait-3d-wrapper">
            <div className="portrait-holo-card">
              {/* Profile Picture & Live HUD */}
              <div className="portrait-face portrait-front">
                {/* Actual Profile Picture */}
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="portrait-image"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
                  }}
                />

                {/* Laser Scanline Effect */}
                <div className="laser-scanline" />

                {/* Cyber HUD Corner Brackets */}
                <div className="hud-corner hud-tl" />
                <div className="hud-corner hud-tr" />
                <div className="hud-corner hud-bl" />
                <div className="hud-corner hud-br" />

                {/* Dark Gradient Overlay for bottom text clarity */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.25) 35%, transparent 65%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Top Developer HUD Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(2, 132, 199, 0.28)',
                    boxShadow: '0 6px 16px rgba(15, 23, 42, 0.14)'
                  }}
                >
                  <span className="radar-dot" />
                  <span className="font-mono" style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 700 }}>
                    SYSTEM ACTIVE
                  </span>
                </div>

                {/* Bottom Identity & Code Pill */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.4rem', color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
                      {personalInfo.name}
                    </h3>
                    <Sparkles size={16} color="#38bdf8" />
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: '0.82rem',
                      color: '#38bdf8',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Full Stack MERN Developer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Orbiting Tech Badges around the Portrait */}
          {/* Badge 1: React 19 (Top Right) */}
          <div
            className="animate-float"
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-12px',
              padding: '8px 14px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(2, 132, 199, 0.28)',
              boxShadow: '0 12px 28px -6px rgba(15, 23, 42, 0.14)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              zIndex: 20
            }}
          >
            <Atom size={18} color="#0284c7" className="animate-spin-slow" />
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>React 19</div>
              <div style={{ fontSize: '0.68rem', color: '#0284c7', fontFamily: 'var(--font-mono)' }}>Frontend Core</div>
            </div>
          </div>

          {/* Badge 2: Node.js & Express (Bottom Left) */}
          <div
            className="animate-float"
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '-15px',
              padding: '8px 14px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(99, 102, 241, 0.28)',
              boxShadow: '0 12px 28px -6px rgba(15, 23, 42, 0.14)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animationDelay: '1.8s',
              zIndex: 20
            }}
          >
            <Server size={18} color="#059669" />
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Node & Express</div>
              <div style={{ fontSize: '0.68rem', color: '#059669', fontFamily: 'var(--font-mono)' }}>REST APIs</div>
            </div>
          </div>

          {/* Badge 3: Projects Counter (Bottom Right) */}
          <div
            className="animate-float"
            style={{
              position: 'absolute',
              bottom: '-10px',
              right: '-8px',
              padding: '10px 16px',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(219, 39, 119, 0.28)',
              boxShadow: '0 12px 28px -6px rgba(15, 23, 42, 0.14)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animationDelay: '3s',
              zIndex: 20
            }}
          >
            <span style={{ fontSize: '1.4rem', fontWeight: 800 }} className="gradient-text-alt">
              {personalInfo.completedProjects}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 600, lineHeight: 1.2 }}>
              MERN<br />Projects
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Scroll Cue */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          color: '#64748b',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          opacity: 0.85
        }}
      >
        <span style={{ color: '#0284c7', fontWeight: 600 }}>Scroll To Explore</span>
        <ChevronDown size={16} className="animate-bounce" color="#0284c7" />
      </div>

      {/* Responsive Style */}
      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
            text-align: center;
          }
          .hero-grid > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
