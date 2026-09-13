import { useState } from 'react';
import { 
  Code2, 
  Cpu, 
  Layers, 
  Server, 
  Database, 
  Globe, 
  Sparkles, 
  Terminal, 
  CheckCircle, 
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
          <div className="marquee-content">
            {marqueeSkills.concat(marqueeSkills).map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  background: 'rgba(13, 20, 36, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#e2e8f0',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ color: '#00f2fe' }}>⚡</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
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
                background: isActive ? 'linear-gradient(135deg, #00f2fe, #8b5cf6)' : 'rgba(13, 20, 36, 0.6)',
                color: isActive ? '#060913' : '#94a3b8',
                border: isActive ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                boxShadow: isActive ? '0 0 20px rgba(0, 242, 254, 0.4)' : 'none'
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
        {filteredSkills.map((skill, idx) => (
          <div
            key={idx}
            className="tilt-card"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div className="spotlight-overlay" />

            {/* Top row: Icon & level badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${skill.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 15px ${skill.color}25`
                }}
              >
                {getIcon(skill.icon, skill.color)}
              </div>

              <span
                className="font-mono"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: skill.color
                }}
              >
                {skill.level}%
              </span>
            </div>

            {/* Skill Title & Desc */}
            <div>
              <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '6px' }}>
                {skill.name}
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
                {skill.desc}
              </p>
            </div>

            {/* Level Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${skill.level}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${skill.color}, #00f2fe)`,
                  borderRadius: '9999px',
                  boxShadow: `0 0 8px ${skill.color}`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
