import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Eye,
  ArrowUpRight,
  ArrowLeft,
  Code2,
  Atom,
  Database,
  Search,
  Sparkles,
  Layers
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData, projectTracks } from '../data/portfolioData';
import { soundManager } from '../utils/audioFx';
import TiltCard from './TiltCard';

const ProjectModal = lazy(() => import('./ProjectModal'));

// Map track icon strings to Lucide components
const TRACK_ICONS = {
  Code2: Code2,
  Atom: Atom,
  Database: Database
};

export default function Projects() {
  // null = viewing main landing page (only 3 cards displayed)
  // string (e.g. 'frontend-html-css-js') = viewing that track's dedicated full page
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Active track object
  const activeTrack = useMemo(
    () => projectTracks.find((t) => t.id === activeTrackId) || null,
    [activeTrackId]
  );

  // Filter projects when a track is opened
  const trackProjects = useMemo(() => {
    if (!activeTrackId) return [];
    return projectsData.filter((project) => {
      const matchesTrack = project.track === activeTrackId;
      if (!matchesTrack) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const inTitle = project.title.toLowerCase().includes(q);
      const inDesc = project.shortDesc.toLowerCase().includes(q);
      const inBadge = project.badge?.toLowerCase().includes(q);
      const inTech = project.tech.some((t) => t.toLowerCase().includes(q));
      return inTitle || inDesc || inBadge || inTech;
    });
  }, [activeTrackId, searchQuery]);

  // Open dedicated track page
  const handleOpenTrack = (track) => {
    soundManager.playClick();
    setActiveTrackId(track.id);
    setSearchQuery('');
    try {
      window.history.pushState({ trackId: track.id }, '', `#projects-${track.id}`);
    } catch {
      // Ignore history state errors in restricted environments
    }
  };

  // Close dedicated track page and return to portfolio
  const handleCloseTrack = () => {
    soundManager.playClick();
    setActiveTrackId(null);
    setSearchQuery('');
    try {
      if (window.location.hash.startsWith('#projects-')) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch {
      // Ignore
    }
  };

  // Lock body scroll and listen for Escape key / browser back button when dedicated page is open
  useEffect(() => {
    if (!activeTrackId) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !selectedProject) {
        handleCloseTrack();
      }
    };

    const handlePopState = () => {
      setActiveTrackId(null);
      setSearchQuery('');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = 'unset';
    };
  }, [activeTrackId, selectedProject]);

  return (
    <section id="projects" className="section-wrapper">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-badge">
          <FolderGit2 size={14} />
          <span>Curated Portfolio</span>
        </div>
        <h2 className="section-title">
          Explore My <span className="gradient-text">Creations by Stack</span>
        </h2>
        <p className="section-subtitle">
          Click any of the 3 development categories below to open its dedicated collection of real-world applications, live interactive demos, and source code.
        </p>
      </div>

      {/* ========================================================= */}
      {/* MAIN LANDING VIEW: ONLY 3 STACK CARDS (Page Stays Compact) */}
      {/* ========================================================= */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px'
        }}
      >
        {projectTracks.map((track) => {
          const IconComponent = TRACK_ICONS[track.icon] || Code2;

          return (
            <TiltCard
              key={track.id}
              onClick={() => handleOpenTrack(track)}
              onMouseEnter={() => soundManager.playHover()}
              style={{
                cursor: 'pointer',
                borderRadius: '24px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Top Accent Gradient Bar */}
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

              <div>
                {/* Header Row: Icon + Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '22px'
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: track.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      boxShadow: `0 8px 20px ${track.borderSoft}`
                    }}
                  >
                    <IconComponent size={28} />
                  </div>

                  <span
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      background: track.bgSoft,
                      color: track.accentColor,
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      border: `1px solid ${track.borderSoft}`
                    }}
                  >
                    {track.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3
                  style={{
                    fontSize: '1.45rem',
                    color: '#0f172a',
                    fontWeight: 700,
                    marginBottom: '6px',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {track.title}
                </h3>
                <div
                  style={{
                    fontSize: '0.88rem',
                    color: track.accentColor,
                    fontWeight: 600,
                    marginBottom: '14px',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {track.subtitle}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#475569',
                    lineHeight: 1.6,
                    marginBottom: '22px'
                  }}
                >
                  {track.desc}
                </p>

                {/* Tech Pills */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '28px'
                  }}
                >
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(15, 23, 42, 0.04)',
                        border: '1px solid rgba(15, 23, 42, 0.08)',
                        color: '#334155',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button: Opens Dedicated Page */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '18px',
                  borderTop: '1px solid rgba(15, 23, 42, 0.08)'
                }}
              >
                <span
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: track.accentColor,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Explore {track.count} Projects</span>
                </span>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: track.bgSoft,
                    color: track.accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* DEDICATED SEPARATE FULL-PAGE VIEW (Only visible when a card is clicked)   */}
      {/* ========================================================================= */}
      {activeTrack && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeTrack.title} Projects Page`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9990,
            backgroundColor: 'var(--bg-primary, #f4f7fb)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Ambient Background Glows */}
          <div
            style={{
              position: 'fixed',
              top: '5%',
              left: '10%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: activeTrack.borderSoft,
              filter: 'blur(120px)',
              pointerEvents: 'none',
              opacity: 0.6,
              zIndex: 0
            }}
          />

          {/* Sticky Top Navigation Bar with Back Button */}
          <header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 100,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              background: 'rgba(255, 255, 255, 0.88)',
              borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
              padding: '14px 24px',
              boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)'
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
                onClick={handleCloseTrack}
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
                  boxShadow: '0 2px 10px rgba(15, 23, 42, 0.05)',
                  transition: 'all 0.2s ease'
                }}
              >
                <ArrowLeft size={18} />
                <span>Back to Portfolio</span>
              </button>

              {/* Title Badge in Top Nav */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    background: activeTrack.bgSoft,
                    color: activeTrack.accentColor,
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    border: `1px solid ${activeTrack.borderSoft}`
                  }}
                >
                  {activeTrack.title} &bull; {activeTrack.count} Projects
                </span>
              </div>
            </div>
          </header>

          {/* Main Dedicated Page Content */}
          <main
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '1280px',
              width: '100%',
              margin: '0 auto',
              padding: '36px 24px 80px',
              flex: 1
            }}
          >
            {/* Dedicated Page Hero Header */}
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
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: activeTrack.gradient
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '20px'
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
                      background: activeTrack.bgSoft,
                      color: activeTrack.accentColor,
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      marginBottom: '10px',
                      border: `1px solid ${activeTrack.borderSoft}`
                    }}
                  >
                    <Layers size={13} />
                    <span>Dedicated Stack Collection</span>
                  </div>
                  <h1
                    style={{
                      fontSize: '2rem',
                      color: '#0f172a',
                      fontWeight: 800,
                      marginBottom: '8px',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {activeTrack.title}
                  </h1>
                  <p
                    style={{
                      fontSize: '0.98rem',
                      color: '#475569',
                      maxWidth: '720px',
                      lineHeight: 1.6,
                      margin: 0
                    }}
                  >
                    {activeTrack.desc}
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
                    placeholder={`Search within ${activeTrack.count} projects...`}
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
                      e.currentTarget.style.borderColor = activeTrack.accentColor;
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
            {trackProjects.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '70px 20px',
                  background: '#ffffff',
                  borderRadius: '24px',
                  border: '1px dashed rgba(15, 23, 42, 0.15)'
                }}
              >
                <Sparkles size={40} color={activeTrack.accentColor} style={{ marginBottom: '14px' }} />
                <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '8px' }}>
                  No projects matched &quot;{searchQuery}&quot;
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '18px' }}>
                  Try a different search keyword or clear the search box to view all {activeTrack.count} projects.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    padding: '10px 22px',
                    background: activeTrack.accentColor,
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
                {trackProjects.map((project) => (
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

                      {/* Category / Track Badge */}
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

                        {/* Card Bottom Links: Live Demo & GitHub Code */}
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
                padding: '30px',
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid rgba(15, 23, 42, 0.08)'
              }}
            >
              <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>
                Done exploring {activeTrack.title}?
              </h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>
                Return to the main portfolio page to explore other technology stacks, skills, or get in touch.
              </p>
              <button
                onClick={handleCloseTrack}
                onMouseEnter={() => soundManager.playHover()}
                className="btn-magnetic btn-primary-glow"
                style={{
                  padding: '12px 28px',
                  borderRadius: '12px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ArrowLeft size={18} />
                <span>Back to Main Portfolio</span>
              </button>
            </div>
          </main>
        </div>
      )}

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}
    </section>
  );
}
