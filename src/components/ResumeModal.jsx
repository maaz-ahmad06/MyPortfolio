import { useEffect, useState } from 'react';
import { X, Printer, Mail, Phone, MapPin, ExternalLink, Download, FileText, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo as defaultPersonalInfo, skillsData as defaultSkills, experienceData } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Interactive ATS-friendly Resume & Uploaded PDF/PNG preview modal.
 * Supports direct view & 1-click download of uploaded CV (PDF/PNG) or export of ATS format.
 */
export default function ResumeModal({ onClose }) {
  const { profile, skills, cvData } = usePortfolio();
  const currentProfile = profile || defaultPersonalInfo;
  const currentSkills = skills || defaultSkills;

  const [viewMode, setViewMode] = useState(() => (cvData?.hasCustomCv && cvData.dataUrl ? 'uploaded' : 'ats'));

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

  const hasCustom = Boolean(cvData?.hasCustomCv && cvData.dataUrl);

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
          maxWidth: hasCustom && viewMode === 'uploaded' ? '920px' : '820px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: '#ffffff',
          border: '1px solid rgba(15, 23, 42, 0.12)',
          borderRadius: '22px',
          boxShadow: '0 30px 60px -15px rgba(15, 23, 42, 0.3)',
          padding: '28px 32px'
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
            paddingBottom: '16px',
            marginBottom: '20px',
            borderBottom: '1px solid rgba(15, 23, 42, 0.08)'
          }}
        >
          {/* Format Switcher / Title */}
          {hasCustom ? (
            <div
              style={{
                display: 'inline-flex',
                background: '#f1f5f9',
                padding: '3px',
                borderRadius: '10px',
                gap: '4px'
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode('uploaded')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: viewMode === 'uploaded' ? '#ffffff' : 'transparent',
                  color: viewMode === 'uploaded' ? '#0284c7' : '#64748b',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: viewMode === 'uploaded' ? '0 2px 6px rgba(15, 23, 42, 0.08)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <FileText size={14} />
                <span>Uploaded CV ({cvData.fileType?.toUpperCase() || 'FILE'})</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('ats')}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: viewMode === 'ats' ? '#ffffff' : 'transparent',
                  color: viewMode === 'ats' ? '#0284c7' : '#64748b',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: viewMode === 'ats' ? '0 2px 6px rgba(15, 23, 42, 0.08)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <Sparkles size={14} />
                <span>ATS Text Format</span>
              </button>
            </div>
          ) : (
            <span
              className="font-mono"
              style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0284c7' }}
            >
              CURRICULUM VITAE // ATS FORMAT
            </span>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {hasCustom && (
              <a
                href={cvData.dataUrl}
                download={cvData.fileName || 'Maaz_Ahmad_CV'}
                className="btn-magnetic btn-primary-glow"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '10px',
                  textDecoration: 'none'
                }}
              >
                <Download size={15} />
                <span>Download CV</span>
              </a>
            )}

            {hasCustom && (
              <a
                href={cvData.dataUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-magnetic btn-glass-glow"
                style={{
                  padding: '8px 14px',
                  fontSize: '0.85rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '10px',
                  textDecoration: 'none'
                }}
              >
                <ExternalLink size={15} />
                <span>Full Tab</span>
              </a>
            )}

            {viewMode === 'ats' && (
              <button
                type="button"
                onClick={() => window.print()}
                className="btn-magnetic btn-glass-glow"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                <Printer size={15} />
                <span>Print / Save PDF</span>
              </button>
            )}

            <button
              type="button"
              aria-label="Close resume preview"
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
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
              <X size={17} />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: UPLOADED DOCUMENT (PDF or IMAGE)                  */}
        {/* ======================================================== */}
        {hasCustom && viewMode === 'uploaded' ? (
          <div>
            {cvData.fileType === 'pdf' ? (
              <div
                style={{
                  width: '100%',
                  height: '74vh',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: '#f8fafc',
                  border: '1px solid rgba(15, 23, 42, 0.1)'
                }}
              >
                <iframe
                  src={cvData.dataUrl}
                  title={cvData.fileName || 'Curriculum Vitae PDF'}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            ) : cvData.fileType === 'image' ? (
              <div
                style={{
                  textAlign: 'center',
                  background: '#f8fafc',
                  borderRadius: '14px',
                  padding: '16px',
                  overflowY: 'auto',
                  maxHeight: '74vh',
                  border: '1px solid rgba(15, 23, 42, 0.1)'
                }}
              >
                <img
                  src={cvData.dataUrl}
                  alt={cvData.fileName || 'Curriculum Vitae Preview'}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    boxShadow: '0 8px 30px rgba(15, 23, 42, 0.12)'
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  background: '#f8fafc',
                  borderRadius: '14px',
                  border: '1px dashed rgba(15, 23, 42, 0.15)'
                }}
              >
                <FileText size={42} color="#0284c7" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '8px' }}>
                  {cvData.fileName || 'Hosted Curriculum Vitae'}
                </h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '18px' }}>
                  Your CV is hosted externally. Click below to view or download directly.
                </p>
                <a
                  href={cvData.dataUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-magnetic btn-primary-glow"
                  style={{
                    padding: '10px 24px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none'
                  }}
                >
                  <ExternalLink size={16} />
                  <span>Open CV in New Window</span>
                </a>
              </div>
            )}
          </div>
        ) : (
          /* ======================================================== */
          /* VIEW 2: PRINTABLE ATS RESUME SHEET                       */
          /* ======================================================== */
          <div className="printable-resume" style={{ color: '#0f172a' }}>
            {/* Header */}
            <header style={{ marginBottom: '22px' }}>
              <h2
                id="resume-modal-title"
                style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}
              >
                {currentProfile.name}
              </h2>
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0284c7', marginBottom: '12px' }}>
                {currentProfile.tagline}
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
                  {currentProfile.location}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Mail size={14} color="#0284c7" />
                  {currentProfile.email}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Phone size={14} color="#0284c7" />
                  {currentProfile.phone}
                </span>
                {currentProfile.socials?.github && (
                  <a
                    href={currentProfile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#0f172a', textDecoration: 'none' }}
                  >
                    <GithubIcon size={14} />
                    GitHub
                  </a>
                )}
                {currentProfile.socials?.linkedin && (
                  <a
                    href={currentProfile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#0f172a', textDecoration: 'none' }}
                  >
                    <LinkedinIcon size={14} />
                    LinkedIn
                  </a>
                )}
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
                {currentProfile.bio}
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
                {currentSkills.frontend && (
                  <div>
                    <strong>Frontend:</strong> {currentSkills.frontend.map((s) => s.name).join(', ')}
                  </div>
                )}
                {currentSkills.backend && (
                  <div>
                    <strong>Backend & Databases:</strong> {currentSkills.backend.map((s) => s.name).join(', ')}
                  </div>
                )}
                {currentSkills.tools && (
                  <div>
                    <strong>Tools & Workflow:</strong> {currentSkills.tools.map((s) => s.name).join(', ')}
                  </div>
                )}
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
        )}
      </div>
    </div>
  );
}

