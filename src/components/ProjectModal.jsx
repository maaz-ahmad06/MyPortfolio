import { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import { soundManager } from '../utils/audioFx';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(4, 7, 15, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={() => {
        soundManager.playClick();
        onClose();
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '750px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'rgba(11, 17, 33, 0.98)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(0, 242, 254, 0.2)',
          padding: '32px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          onMouseEnter={() => soundManager.playHover()}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.2)';
            e.currentTarget.style.borderColor = '#ec4899';
            e.currentTarget.style.color = '#ec4899';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.color = '#fff';
          }}
        >
          <X size={20} />
        </button>

        {/* Project Image Banner */}
        <div
          style={{
            position: 'relative',
            height: '240px',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(11, 17, 33, 0.9) 0%, transparent 60%)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(0, 242, 254, 0.2)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(0, 242, 254, 0.5)',
              color: '#00f2fe',
              fontSize: '0.8rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)'
            }}
          >
            <Sparkles size={14} />
            <span>{project.badge}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.8rem',
            color: '#fff',
            marginBottom: '14px',
            lineHeight: 1.2
          }}
        >
          {project.title}
        </h3>

        {/* Long Description */}
        <p
          style={{
            fontSize: '1rem',
            color: '#cbd5e1',
            lineHeight: 1.7,
            marginBottom: '24px'
          }}
        >
          {project.longDesc}
        </p>

        {/* Tech Stack Chips */}
        <div style={{ marginBottom: '24px' }}>
          <h4
            style={{
              fontSize: '0.9rem',
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '10px'
            }}
          >
            Technologies Used
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 242, 254, 0.2)',
                  color: '#00f2fe',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Key Architectural Highlights */}
        {project.highlights && (
          <div style={{ marginBottom: '32px' }}>
            <h4
              style={{
                fontSize: '0.9rem',
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '12px'
              }}
            >
              Key Features & Architectural Highlights
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {project.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => soundManager.playClick()}
            className="btn-magnetic btn-primary-glow"
            style={{ flex: 1, minWidth: '160px' }}
          >
            <ExternalLink size={18} />
            <span>Launch Live Demo</span>
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => soundManager.playClick()}
            className="btn-magnetic btn-glass-glow"
            style={{ flex: 1, minWidth: '160px' }}
          >
            <GithubIcon size={18} />
            <span>Source Code</span>
          </a>
        </div>
      </div>
    </div>
  );
}
