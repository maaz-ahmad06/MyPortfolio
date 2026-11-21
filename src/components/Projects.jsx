import {
  ArrowUpRight,
  Code2,
  Atom,
  Database,
  Terminal,
  Cpu,
  Layers,
  Globe,
  Laptop,
  Server,
  Zap,
  Sparkles,
  Smartphone,
  Box,
  Bot,
  FileCode,
  FolderGit2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { soundManager } from '../utils/audioFx';
import TiltCard from './TiltCard';

const TRACK_ICONS = {
  Code2,
  Atom,
  Database,
  Terminal,
  Cpu,
  Layers,
  Globe,
  Laptop,
  Server,
  Zap,
  Sparkles,
  Smartphone,
  Box,
  Bot,
  FileCode,
  FolderGit2
};

export default function Projects({ onOpenTrack }) {
  const { projectTracks } = usePortfolio();
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
          Click any of the {projectTracks.length} technology stack categories below to open its dedicated collection of real-world applications, live interactive demos, and source code.
        </p>
      </div>

      {/* 3 Stack Showcase Cards (Main Landing Page) */}
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
              onClick={() => {
                soundManager.playClick();
                if (onOpenTrack) onOpenTrack(track);
              }}
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
    </section>
  );
}
