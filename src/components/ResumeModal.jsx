import { useEffect } from 'react';
import { X, Printer, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo, skillsData, experienceData } from '../data/portfolioData';

/**
 * Interactive ATS-friendly Resume preview modal generated from portfolioData.
 * Supports direct 1-click PDF export via browser print styles and optional hosted PDF download.
 */
export default function ResumeModal({ onClose }) {
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

  const hasExternalResume =
    personalInfo.resumeUrl && personalInfo.resumeUrl !== '#resume';

  return (
    <div
      className="resume-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        className="printable-resume-wrapper"
        style={{
          position: 'relative',
          maxWidth: '820px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#ffffff',
          border: '1px solid rgba(15, 23, 42, 0.12)',
          borderRadius: '22px',
          boxShadow: '0 30px 60px -15px rgba(15, 23, 42, 0.3)',
          padding: '32px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar (hidden when printing) */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            paddingBottom: '18px',
            marginBottom: '24px',
            borderBottom: '1px solid rgba(15, 23, 42, 0.08)'
          }}
        >
          <span
            className="font-mono"
            style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0284c7' }}
          >
            CURRICULUM VITAE // ATS FORMAT
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {hasExternalResume && (
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                download
                className="btn-magnetic btn-glass-glow"
                style={{ padding: '9px 16px', fontSize: '0.85rem' }}
              >
                <ExternalLink size={15} />
                <span>Download PDF</span>
              </a>
            )}
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-magnetic btn-primary-glow"
              style={{ padding: '9px 18px', fontSize: '0.85rem' }}
            >
              <Printer size={15} />
              <span>Save / Print PDF</span>
            </button>
            <button
              type="button"
              aria-label="Close resume preview"
              onClick={onClose}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#f8fafc',
                border: '1px solid rgba(15, 23, 42, 0.14)',
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable ATS Resume Sheet */}
        <div className="printable-resume" style={{ color: '#0f172a' }}>
          {/* Header */}
          <header style={{ marginBottom: '22px' }}>
            <h2
              id="resume-modal-title"
              style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}
            >
              {personalInfo.name}
            </h2>
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0284c7', marginBottom: '12px' }}>
              {personalInfo.tagline}
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                fontSize: '0.85rem',
                color: '#475569'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={14} color="#0284c7" />
                {personalInfo.location}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Mail size={14} color="#0284c7" />
                {personalInfo.email}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Phone size={14} color="#0284c7" />
                {personalInfo.phone}
              </span>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#0f172a', textDecoration: 'none' }}
              >
                <GithubIcon size={14} />
                GitHub
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#0f172a', textDecoration: 'none' }}
              >
                <LinkedinIcon size={14} />
                LinkedIn
              </a>
            </div>
          </header>

          {/* Summary */}
          <section style={{ marginBottom: '20px' }}>
            <h3
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#0284c7',
                borderBottom: '1px solid rgba(15, 23, 42, 0.1)',
                paddingBottom: '4px',
                marginBottom: '8px'
              }}
            >
              Professional Summary
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.65 }}>
              {personalInfo.bio}
            </p>
          </section>

          {/* Technical Skills */}
          <section style={{ marginBottom: '20px' }}>
            <h3
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#0284c7',
                borderBottom: '1px solid rgba(15, 23, 42, 0.1)',
                paddingBottom: '4px',
                marginBottom: '10px'
              }}
            >
              Technical Skills
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', color: '#334155' }}>
              <div>
                <strong>Frontend:</strong> {skillsData.frontend.map((s) => s.name).join(', ')}
              </div>
              <div>
                <strong>Backend & Databases:</strong> {skillsData.backend.map((s) => s.name).join(', ')}
              </div>
              <div>
                <strong>Tools & Workflow:</strong> {skillsData.tools.map((s) => s.name).join(', ')}
              </div>
            </div>
          </section>

          {/* Experience & Education */}
          <section>
            <h3
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#0284c7',
                borderBottom: '1px solid rgba(15, 23, 42, 0.1)',
                paddingBottom: '4px',
                marginBottom: '12px'
              }}
            >
              Experience & Education
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {experienceData.map((item, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginBottom: '2px'
                    }}
                  >
                    <strong style={{ fontSize: '0.96rem', color: '#0f172a' }}>
                      {item.title} — {item.organization}
                    </strong>
                    <span className="font-mono" style={{ fontSize: '0.82rem', color: '#475569' }}>
                      {item.period}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

