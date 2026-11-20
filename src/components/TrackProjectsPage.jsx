import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  Atom,
  Database,
  Search,
  Sparkles,
  Layers,
  Eye,
  ExternalLink
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/portfolioData';
import { soundManager } from '../utils/audioFx';
import TiltCard from './TiltCard';

const ProjectModal = lazy(() => import('./ProjectModal'));

const TRACK_ICONS = {
  Code2: Code2,
  Atom: Atom,
  Database: Database
};

export default function TrackProjectsPage({ track, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const IconComponent = TRACK_ICONS[track.icon] || Code2;

  // Filter projects by current track and search query
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      if (project.track !== track.id) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitle = project.title.toLowerCase().includes(q);
      const inDesc = project.shortDesc.toLowerCase().includes(q);
      const inBadge = project.badge?.toLowerCase().includes(q);
      const inTech = project.tech.some((t) => t.toLowerCase().includes(q));
      return inTitle || inDesc || inBadge || inTech;
    });
  }, [track.id, searchQuery]);

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [track.id]);

  // Handle keyboard Escape to go back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedProject) {
          setSelectedProject(null);
        } else {
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, onBack]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary, #f4f7fb)',
        color: 'var(--text-primary, #0f172a)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 50
      }}
    >
      {/* Sticky Top Header Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          background: 'rgba(255, 255, 255, 0.92)',
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
          padding: '14px 24px'
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          {/* Back to Portfolio Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="btn-magnetic"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              borderRadius: '12px',
              background: '#ffffff',
              border: '1px solid rgba(15, 23, 42, 0.12)',
              color: '#0f172a',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowLeft size={18} />
            <span>Back to Portfolio</span>
          </button>

          {/* Track Badge in Top Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                background: track.bgSoft,
                color: track.accentColor,
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                border: `1px solid ${track.borderSoft}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <IconComponent size={14} />
              <span>{track.title} &bull; {track.count} Projects</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Track Content Container */}
      <main
        style={{
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          padding: '36px 24px 80px',
          flex: 1
        }}
      >
        {/* Track Hero Banner */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '32px 36px',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)',
            marginBottom: '36px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Top Gradient Accent Strip */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: track.gradient
            }}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px'
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: track.bgSoft,
                  color: track.accentColor,
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  marginBottom: '10px',
                  border: `1px solid ${track.borderSoft}`
                }}
              >
                <Layers size={13} />
                <span>Dedicated Technology Track</span>
              </div>
              <h1
                style={{
                  fontSize: '2.2rem',
                  color: '#0f172a',
                  fontWeight: 800,
                  marginBottom: '6px',
                  letterSpacing: '-0.02em'
                }}
              >
                {track.title}
              </h1>
              <div
                style={{
                  fontSize: '0.95rem',
                  color: track.accentColor,
                  fontWeight: 600,
                  marginBottom: '12px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {track.subtitle}
              </div>
              <p
                style={{
                  fontSize: '0.98rem',
                  color: '#475569',
                  maxWidth: '720px',
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                {track.desc}
              </p>
            </div>

            {/* Real-time Search Box */}
            <div style={{ position: 'relative', minWidth: 'min(100%, 300px)' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8'
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${track.count} projects (e.g. weather, quiz)...`}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  borderRadius: '12px',
                  border: '1px solid rgba(15, 23, 42, 0.12)',
                  background: '#f8fafc',
                  fontSize: '0.9rem',
                  color: '#0f172a',
                  outline: 'none',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = track.accentColor;
                  e.currentTarget.style.background = '#ffffff';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.12)';
                  e.currentTarget.style.background = '#f8fafc';
                }}
              />
            </div>
          </div>
        </div>

        {/* Projects Grid for this Track */}
        {filteredProjects.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '70px 20px',
              background: '#ffffff',
              borderRadius: '24px',
              border: '1px dashed rgba(15, 23, 42, 0.15)'
            }}
          >
            <Sparkles size={40} color={track.accentColor} style={{ marginBottom: '14px' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '8px' }}>
              No projects matched &quot;{searchQuery}&quot;
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '18px' }}>
              Try a different keyword or clear the search to view all {track.count} projects.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              style={{
                padding: '10px 22px',
                background: track.accentColor,
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: '28px'
            }}
          >
            {filteredProjects.map((project) => (
              <TiltCard
                key={project.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: '#ffffff',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)'
                }}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedProject(project);
                }}
              >
                {/* Thumbnail Image */}
                <div
                  style={{
                    position: 'relative',
                    height: '210px',
                    overflow: 'hidden',
                    borderBottom: '1px solid rgba(15, 23, 42, 0.08)'
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, transparent 55%)'
                    }}
                  />

                  {/* Category / Feature Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      background: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(2, 132, 199, 0.25)',
                      color: '#0284c7',
                      fontSize: '0.74rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)'
                    }}
                  >
                    {project.badge}
                  </div>

                  {/* Quick View Button */}
                  <div
                    title="View Details"
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(2, 132, 199, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0284c7',
                      boxShadow: '0 4px 14px rgba(15, 23, 42, 0.16)'
                    }}
                  >
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Content Body */}
                <div
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: '1.25rem',
                        color: '#0f172a',
                        marginBottom: '10px',
                        lineHeight: 1.35,
                        fontWeight: 700
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: '#475569',
                        lineHeight: 1.6,
                        marginBottom: '20px'
                      }}
                    >
                      {project.shortDesc}
                    </p>
                  </div>

                  <div>
                    {/* Tech Chips */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginBottom: '20px'
                      }}
                    >
                      {project.tech.slice(0, 4).map((t, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: 'rgba(2, 132, 199, 0.08)',
                            border: '1px solid rgba(2, 132, 199, 0.18)',
                            color: '#0369a1',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            background: 'rgba(15, 23, 42, 0.05)',
                            color: '#475569',
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Card Bottom Links */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '16px',
                        borderTop: '1px solid rgba(15, 23, 42, 0.08)'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedProject(project);
                        }}
                        onMouseEnter={() => soundManager.playHover()}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#0284c7',
                          fontSize: '0.86rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Eye size={16} />
                        <span>Details</span>
                      </button>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            title="View Code on GitHub"
                            onMouseEnter={() => soundManager.playHover()}
                            onClick={() => soundManager.playClick()}
                            style={{
                              padding: '7px 13px',
                              borderRadius: '8px',
                              background: 'rgba(15, 23, 42, 0.05)',
                              border: '1px solid rgba(15, 23, 42, 0.1)',
                              color: '#334155',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              textDecoration: 'none',
                              transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = '#0f172a';
                              e.currentTarget.style.color = '#ffffff';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.05)';
                              e.currentTarget.style.color = '#334155';
                            }}
                          >
                            <GithubIcon size={14} />
                            <span>Code</span>
                          </a>
                        )}

                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            title="Open Live Website"
                            onMouseEnter={() => soundManager.playHover()}
                            onClick={() => soundManager.playClick()}
                            style={{
                              padding: '7px 14px',
                              borderRadius: '8px',
                              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                              color: '#ffffff',
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              textDecoration: 'none',
                              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)',
                              transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        )}

        {/* Bottom Return Bar */}
        <div
          style={{
            marginTop: '60px',
            textAlign: 'center',
            padding: '36px',
            background: '#ffffff',
            borderRadius: '24px',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            boxShadow: '0 6px 24px rgba(15, 23, 42, 0.04)'
          }}
        >
          <h4 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '8px', fontWeight: 700 }}>
            Done exploring {track.title}?
          </h4>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '22px' }}>
            Return to the main portfolio page to view other stacks, skills, or get in touch.
          </p>
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="btn-magnetic btn-primary-glow"
            style={{
              padding: '12px 30px',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={18} />
            <span>Back to Main Portfolio</span>
          </button>
        </div>
      </main>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}
    </div>
  );
}
