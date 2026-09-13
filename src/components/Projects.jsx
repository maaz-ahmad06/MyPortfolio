import { useState } from 'react';
import { FolderGit2, ExternalLink, Sparkles, Eye, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/portfolioData';
import { soundManager } from '../utils/audioFx';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Full Stack MERN', 'Frontend & UI', 'APIs & Tools'];

  const filteredProjects =
    filter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="projects" className="section-wrapper">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-badge">
          <FolderGit2 size={14} />
          <span>Featured Works</span>
        </div>
        <h2 className="section-title">
          Explore My <span className="gradient-text">Recent Creations</span>
        </h2>
        <p className="section-subtitle">
          Real-world full-stack web applications, scalable REST APIs, and high-performance interactive user interfaces.
        </p>
      </div>

      {/* Filter Categories */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '48px'
        }}
      >
        {categories.map((cat) => {
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick();
                setFilter(cat);
              }}
              onMouseEnter={() => soundManager.playHover()}
              style={{
                padding: '10px 22px',
                borderRadius: '9999px',
                background: isActive
                  ? 'linear-gradient(135deg, #00f2fe, #8b5cf6)'
                  : 'rgba(13, 20, 36, 0.7)',
                color: isActive ? '#060913' : '#94a3b8',
                border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isActive ? '0 0 20px rgba(0, 242, 254, 0.4)' : 'none'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '30px'
        }}
      >
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="tilt-card"
            onMouseMove={handleCardMouseMove}
            style={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onClick={() => {
              soundManager.playClick();
              setSelectedProject(project);
            }}
          >
            <div className="spotlight-overlay" />

            {/* Thumbnail Image */}
            <div
              style={{
                position: 'relative',
                height: '210px',
                overflow: 'hidden',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <img
                src={project.image}
                alt={project.title}
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
                  background: 'linear-gradient(to top, rgba(13, 20, 36, 0.95) 0%, transparent 60%)'
                }}
              />

              {/* Category Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: 'rgba(6, 9, 19, 0.8)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(0, 242, 254, 0.4)',
                  color: '#00f2fe',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600
                }}
              >
                {project.badge}
              </div>

              {/* Quick View Button */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  right: '14px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(0, 242, 254, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0, 242, 254, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00f2fe',
                  boxShadow: '0 0 15px rgba(0, 242, 254, 0.3)'
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
                    color: '#fff',
                    marginBottom: '10px',
                    lineHeight: 1.3
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#94a3b8',
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
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#38bdf8',
                        fontSize: '0.78rem',
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
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: '#94a3b8',
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
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)'
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
                      color: '#00f2fe',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Eye size={16} />
                    <span>View Case Study</span>
                  </button>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      title="GitHub Repository"
                      onMouseEnter={() => soundManager.playHover()}
                      onClick={() => soundManager.playClick()}
                      style={{
                        color: '#94a3b8',
                        transition: 'color 0.2s',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseOut={(e) => (e.currentTarget.style.color = '#94a3b8')}
                    >
                      <GithubIcon size={18} />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      title="Live Demo"
                      onMouseEnter={() => soundManager.playHover()}
                      onClick={() => soundManager.playClick()}
                      style={{
                        color: '#00f2fe',
                        transition: 'color 0.2s',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
