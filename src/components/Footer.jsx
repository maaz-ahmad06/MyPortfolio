import { useState, useEffect } from 'react';
import { ArrowUp, Code2, Clock } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../utils/audioFx';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(5, 8, 17, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '60px 24px 30px',
        zIndex: 10
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        {/* Top Row: Brand, Time & Back to Top */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                padding: '2px',
                background: 'linear-gradient(135deg, #00f2fe 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)',
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
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', letterSpacing: '-0.02em' }}>
                {personalInfo.firstName} <span className="gradient-text">{personalInfo.lastName}</span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Full Stack MERN Developer
              </p>
            </div>
          </div>

          {/* Local Time Widget */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.82rem',
              color: '#cbd5e1'
            }}
          >
            <Clock size={15} color="#00f2fe" />
            <span>PKT (GMT+5): </span>
            <span className="font-mono" style={{ color: '#00f2fe', fontWeight: 600 }}>
              {currentTime || 'Loading...'}
            </span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundManager.playHover()}
            title="Back to top"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '9999px',
              background: 'rgba(0, 242, 254, 0.1)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              color: '#00f2fe',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              transition: 'all 0.25s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(0, 242, 254, 0.2)';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 242, 254, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(0, 242, 254, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Bottom Row: Copyright & Socials */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            fontSize: '0.85rem',
            color: '#64748b'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>&copy; {new Date().getFullYear()} {personalInfo.name}. Engineered with React 19 & MERN Stack.</span>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={(e) => (e.target.style.color = '#00f2fe')}
              onMouseOut={(e) => (e.target.style.color = '#94a3b8')}
            >
              GitHub
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={(e) => (e.target.style.color = '#00f2fe')}
              onMouseOut={(e) => (e.target.style.color = '#94a3b8')}
            >
              LinkedIn
            </a>
            <a
              href={personalInfo.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={(e) => (e.target.style.color = '#00f2fe')}
              onMouseOut={(e) => (e.target.style.color = '#94a3b8')}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
