import { useState } from 'react';
import {
  Code2,
  Cpu,
  Layers,
  Server,
  Database,
  Terminal,
  ShieldCheck,
  Layout,
  Send,
  Rocket,
  GitBranch,
  Network,
  Zap,
  Atom,
  Palette
} from 'lucide-react';
import { FigmaIcon } from './Icons';
import { skillsData, marqueeSkills } from '../data/portfolioData';
import { soundManager } from '../utils/audioFx';
import TiltCard from './TiltCard';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  // Icon mapping helper
  const getIcon = (iconName, color) => {
    const props = { size: 24, color };
    switch (iconName) {
      case 'Atom': return <Atom {...props} />;
      case 'Code2': return <Code2 {...props} />;
      case 'Layout': return <Layout {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Server': return <Server {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Database': return <Database {...props} />;
      case 'Network': return <Network {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'GitBranch': return <GitBranch {...props} />;
      case 'Send': return <Send {...props} />;
      case 'Rocket': return <Rocket {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      case 'Figma': return <FigmaIcon {...props} />;
      default: return <Code2 {...props} />;
    }
  };

  const allSkills = [
    ...skillsData.frontend.map(s => ({ ...s, category: 'frontend' })),
    ...skillsData.backend.map(s => ({ ...s, category: 'backend' })),
    ...skillsData.tools.map(s => ({ ...s, category: 'tools' }))
  ];

  const filteredSkills = activeTab === 'all' 
    ? allSkills 
    : allSkills.filter(s => s.category === activeTab);

  const tabs = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'tools', label: 'Tools & DevOps' }
  ];

  return (
    <section id="skills" className="section-wrapper">
      {/* Infinite Marquee Strip */}
      <div style={{ marginBottom: '60px' }}>
        <div className="marquee-container">
          {[0, 1].map((track) => (
            <div key={track} className="marquee-content" aria-hidden={track === 1}>
              {marqueeSkills.map((item, idx) => (
                <div
                  key={`${track}-${idx}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 20px',
                    borderRadius: '9999px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(15, 23, 42, 0.09)',
                    color: '#1e293b',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span style={{ color: '#0284c7' }}>⚡</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Section Header */}
      <div className="section-header">
        <div className="section-badge">
          <Cpu size={14} />
          <span>Technical Arsenal</span>
        </div>
        <h2 className="section-title">
          My <span className="gradient-text">Skills & Technologies</span>
        </h2>
        <p className="section-subtitle">
          Proficiency in modern web technologies across the entire MERN stack development lifecycle.
        </p>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '40px'
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab.id);
              }}
              onMouseEnter={() => soundManager.playHover()}
              style={{
                padding: '10px 22px',
                borderRadius: '9999px',
                background: isActive ? 'linear-gradient(135deg, #0284c7, #4f46e5)' : 'rgba(255, 255, 255, 0.85)',
                color: isActive ? '#ffffff' : '#475569',
                border: isActive ? 'none' : '1px solid rgba(15, 23, 42, 0.1)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isActive ? '0 6px 18px rgba(37, 99, 235, 0.28)' : '0 2px 8px rgba(15, 23, 42, 0.04)'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}
      >
        {filteredSkills.map((skill) => {
          const segmentCount =
            skill.tier === 'Core Stack' ? 3 : skill.tier === 'Production Ready' ? 2 : 1;

          return (
            <TiltCard
              key={skill.name}
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {/* Top row: Icon & proficiency tier badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: `${skill.color}12`,
                    border: `1px solid ${skill.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {getIcon(skill.icon, skill.color)}
                </div>

                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: skill.color,
                    background: `${skill.color}12`,
                    border: `1px solid ${skill.color}30`,
                    padding: '4px 10px',
                    borderRadius: '9999px'
                  }}
                >
                  {skill.tier}
                </span>
              </div>

              {/* Skill Title & Desc */}
              <div>
                <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '6px' }}>
                  {skill.name}
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                  {skill.desc}
                </p>
              </div>

              {/* 3-Segment Depth Indicator */}
              <div
                aria-label={`${skill.name}: ${skill.tier}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '6px',
                  marginTop: 'auto'
                }}
              >
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    style={{
                      height: '6px',
                      borderRadius: '9999px',
                      background:
                        step <= segmentCount
                          ? `linear-gradient(90deg, ${skill.color}, #0284c7)`
                          : 'rgba(15, 23, 42, 0.08)'
                    }}
                  />
                ))}
              </div>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
