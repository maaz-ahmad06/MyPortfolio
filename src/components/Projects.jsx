import { lazy, Suspense, useMemo, useState } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Eye,
  ArrowUpRight,
  Code2,
  Atom,
  Database,
  Search,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData, projectTracks } from '../data/portfolioData';
import { soundManager } from '../utils/audioFx';
import TiltCard from './TiltCard';

const ProjectModal = lazy(() => import('./ProjectModal'));

// Map track icon strings to Lucide icon components
const TRACK_ICONS = {
  Code2: Code2,
  Atom: Atom,
  Database: Database
};

export default function Projects() {
  const [activeTrackId, setActiveTrackId] = useState('frontend-html-css-js');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Active track object
  const activeTrack = useMemo(
    () => projectTracks.find((t) => t.id === activeTrackId) || projectTracks[0],
    [activeTrackId]
  );

  // Filter projects by track and search query
  const displayedProjects = useMemo(() => {
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
          Select any of the 3 development tracks below to view specialized real-world applications, interactive tools, and live production deployments.
        </p>
      </div>

      {/* ========================================================= */}
      {/* 3 HERO CATEGORY CARDS (HTML/CSS/JS, React, Full Stack MERN) */}
      {/* ========================================================= */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}
      >
        {projectTracks.map((track) => {
          const isActive = track.id === activeTrackId;
          const IconComponent = TRACK_ICONS[track.icon] || Code2;

          return (
            <TiltCard
              key={track.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTrackId(track.id);
                setSearchQuery('');
              }}
              onMouseEnter={() => soundManager.playHover()}
              style={{
                cursor: 'pointer',
                borderRadius: '20px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: isActive
                  ? `2px solid ${track.accentColor}`
                  : '1px solid rgba(15, 23, 42, 0.08)',
                background: isActive
                  ? `linear-gradient(180deg, #ffffff 0%, ${track.bgSoft} 100%)`
                  : '#ffffff',
                boxShadow: isActive
                  ? `0 16px 36px -10px ${track.borderSoft}, 0 4px 16px rgba(15, 23, 42, 0.06)`
                  : '0 4px 18px rgba(15, 23, 42, 0.04)',
                transform: isActive ? 'translateY(-4px)' : 'none',
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
                  height: isActive ? '4px' : '2px',
                  background: track.gradient,
                  transition: 'height 0.25s'
                }}
              />

              <div>
                {/* Header Row: Icon + Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: track.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      boxShadow: `0 8px 18px ${track.borderSoft}`
                    }}
                  >
                    <IconComponent size={26} />
                  </div>

                  <span
                    style={{
                      padding: '5px 12px',
                      borderRadius: '9999px',
                      background: isActive ? track.accentColor : track.bgSoft,
                      color: isActive ? '#ffffff' : track.accentColor,
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      border: `1px solid ${track.borderSoft}`,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.25s'
                    }}
                  >
                    {isActive && <CheckCircle2 size={13} />}
                    {track.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3
                  style={{
                    fontSize: '1.35rem',
                    color: '#0f172a',
                    fontWeight: 700,
                    marginBottom: '4px',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {track.title}
                </h3>
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: track.accentColor,
                    fontWeight: 600,
                    marginBottom: '12px',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {track.subtitle}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#475569',
                    lineHeight: 1.6,
                    marginBottom: '20px'
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
                    marginBottom: '24px'
                  }}
                >
                  {track.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '3px 9px',
                        borderRadius: '6px',
                        background: 'rgba(15, 23, 42, 0.04)',
                        border: '1px solid rgba(15, 23, 42, 0.08)',
                        color: '#334155',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action Indicator */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(15, 23, 42, 0.08)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: isActive ? track.accentColor : '#64748b'
                }}
              >
                <span>
                  {isActive
                    ? `Viewing All (${track.count}) Projects`
                    : `Click to View ${track.count} Projects`}
                </span>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isActive ? track.accentColor : 'rgba(15, 23, 42, 0.04)',
                    color: isActive ? '#ffffff' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.25s'
                  }}
                >
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* ACTIVE TRACK HEADER & OPTIONAL SEARCH BAR                */}
      {/* ========================================================= */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '20px 24px',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
          marginBottom: '32px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: activeTrack.accentColor,
              boxShadow: `0 0 10px ${activeTrack.accentColor}`
            }}
          />
          <div>
            <h4
              style={{
                fontSize: '1.05rem',
                color: '#0f172a',
                fontWeight: 700,
                margin: 0
              }}
            >
              {activeTrack.title}
              <span
                style={{
                  marginLeft: '10px',
                  fontSize: '0.85rem',
                  color: '#64748b',
                  fontWeight: 500
                }}
              >
                ({displayedProjects.length} of {activeTrack.count} projects)
              </span>
            </h4>
          </div>
        </div>

        {/* Real-time Search Box */}
        <div
          style={{
            position: 'relative',
            minWidth: 'min(100%, 280px)'
          }}
        >
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8'
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Filter ${activeTrack.title}...`}
            style={{
              width: '100%',
              padding: '9px 14px 9px 36px',
              borderRadius: '10px',
              border: '1px solid rgba(15, 23, 42, 0.12)',
              background: '#ffffff',
              fontSize: '0.86rem',
              color: '#0f172a',
              outline: 'none',
              transition: 'border-color 0.2s',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = activeTrack.accentColor)}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.12)')}
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* PROJECTS GRID                                             */}
      {/* ========================================================= */}
      {displayedProjects.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '20px',
            border: '1px dashed rgba(15, 23, 42, 0.15)'
          }}
        >
          <Sparkles size={36} color={activeTrack.accentColor} style={{ marginBottom: '12px' }} />
          <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>
            No projects matched &quot;{searchQuery}&quot;
          </h4>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>
            Try clearing your search query to see all {activeTrack.count} projects in this track.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="btn-magnetic"
            style={{
              padding: '8px 18px',
              background: activeTrack.accentColor,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
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
          {displayedProjects.map((project) => (
            <TiltCard
              key={project.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                borderRadius: '18px',
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                boxShadow: '0 4px 18px rgba(15, 23, 42, 0.05)'
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
                  height: '200px',
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
                    width: '34px',
                    height: '34px',
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
                  <ArrowUpRight size={17} />
                </div>
              </div>

              {/* Content Body */}
              <div
                style={{
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      color: '#0f172a',
                      marginBottom: '8px',
                      lineHeight: 1.35,
                      fontWeight: 700
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#475569',
                      lineHeight: 1.6,
                      marginBottom: '18px'
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
                      marginBottom: '18px'
                    }}
                  >
                    {project.tech.slice(0, 4).map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '3px 9px',
                          borderRadius: '6px',
                          background: 'rgba(2, 132, 199, 0.08)',
                          border: '1px solid rgba(2, 132, 199, 0.18)',
                          color: '#0369a1',
                          fontSize: '0.76rem',
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
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'rgba(15, 23, 42, 0.05)',
                          color: '#475569',
                          fontSize: '0.74rem',
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
                      paddingTop: '14px',
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
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Eye size={15} />
                      <span>Details</span>
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          title="View Source on GitHub"
                          onMouseEnter={() => soundManager.playHover()}
                          onClick={() => soundManager.playClick()}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: 'rgba(15, 23, 42, 0.05)',
                            border: '1px solid rgba(15, 23, 42, 0.1)',
                            color: '#334155',
                            fontSize: '0.8rem',
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
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                            color: '#ffffff',
                            fontSize: '0.8rem',
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

      {/* Project Detail Modal */}
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
