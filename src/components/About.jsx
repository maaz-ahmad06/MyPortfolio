import { useState } from 'react';
import { User, Terminal as TermIcon, Award, Code, CheckCircle, Download, ExternalLink, Sparkles } from 'lucide-react';
import { personalInfo, terminalCommands } from '../data/portfolioData';
import { soundManager } from '../utils/audioFx';

export default function About() {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: `Welcome to ${personalInfo.name}'s Interactive Terminal!` },
    { type: 'system', text: "Type 'help' or click any quick command chip below." }
  ]);

  const handleCommand = (cmd) => {
    soundManager.playClick();
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    }

    const response = terminalCommands[cleanCmd] || `Command not found: "${cleanCmd}". Type 'help' for available commands.`;

    setTerminalHistory((prev) => [
      ...prev,
      { type: 'user', text: `$ ${cleanCmd}` },
      { type: 'response', text: response }
    ]);
    setTerminalInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(terminalInput);
    }
  };

  return (
    <section id="about" className="section-wrapper">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-badge">
          <User size={14} />
          <span>About My Journey</span>
        </div>
        <h2 className="section-title">
          Crafting Robust Systems & <span className="gradient-text">Immersive Interfaces</span>
        </h2>
        <p className="section-subtitle">
          Bridging the gap between creative frontend aesthetics and robust, scalable backend architecture.
        </p>
      </div>

      {/* Bento Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '24px'
        }}
        className="about-bento-grid"
      >
        {/* Card 1: Main Story (7 columns) */}
        <div
          className="tilt-card"
          style={{
            gridColumn: 'span 7',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div className="spotlight-overlay" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              {/* Profile Image Avatar */}
              <div
                style={{
                  position: 'relative',
                  width: '64px',
                  height: '64px',
                  borderRadius: '18px',
                  padding: '2.5px',
                  background: 'linear-gradient(135deg, #00f2fe, #8b5cf6)',
                  boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)',
                  flexShrink: 0
                }}
              >
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '15px',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 12px',
                    borderRadius: '8px',
                    background: 'rgba(0, 242, 254, 0.1)',
                    color: '#00f2fe',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '4px'
                  }}
                >
                  <Sparkles size={13} />
                  <span>PASSIONATE DEVELOPER</span>
                </div>
                <h3 style={{ fontSize: '1.6rem', color: '#fff', margin: 0 }}>
                  Hello! I'm <span className="gradient-text">{personalInfo.name}</span>
                </h3>
              </div>
            </div>

            <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '20px' }}>
              I am a Full Stack MERN Developer based in <strong>{personalInfo.location}</strong>. My passion lies in engineering end-to-end modern web applications that are not only performant and scalable under the hood, but also visually breathtaking and effortless to use.
            </p>

            <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.98rem', marginBottom: '28px' }}>
              Currently pursuing my <strong>BS in Software Engineering at Islamia College University, Peshawar</strong>, I specialize in engineering state-driven React frontends, robust Node.js/Express REST APIs, and scalable MongoDB database architectures.
            </p>

            {/* Key Pillars */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '14px',
                marginBottom: '28px'
              }}
            >
              {[
                'Full Stack Architecture',
                'Pixel-Perfect UI/UX',
                'Secure JWT Authentication',
                'Clean Code & Optimization'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={16} color="#00f2fe" />
                  <span style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="btn-magnetic btn-primary-glow"
              style={{ padding: '12px 24px', fontSize: '0.9rem' }}
            >
              <span>Work With Me</span>
            </a>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="btn-magnetic btn-glass-glow"
              style={{ padding: '12px 24px', fontSize: '0.9rem' }}
            >
              <span>View GitHub</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Card 2: Interactive Cyber Terminal (5 columns) */}
        <div
          className="tilt-card cyber-terminal"
          style={{
            gridColumn: 'span 5',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '400px'
          }}
        >
          {/* Terminal Top Bar */}
          <div className="terminal-header">
            <div style={{ display: 'flex', gap: '6px' }}>
              <span className="terminal-btn btn-red" />
              <span className="terminal-btn btn-yellow" />
              <span className="terminal-btn btn-green" />
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: 'auto' }}>
              terminal@maaz-dev:~
            </span>
          </div>

          {/* Terminal Output Area */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              maxHeight: '260px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '0.85rem'
            }}
          >
            {terminalHistory.map((item, idx) => (
              <div
                key={idx}
                style={{
                  color:
                    item.type === 'user'
                      ? '#00f2fe'
                      : item.type === 'response'
                      ? '#e2e8f0'
                      : '#94a3b8'
                }}
              >
                {item.text}
              </div>
            ))}
          </div>

          {/* Quick Command Chips */}
          <div
            style={{
              padding: '10px 16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              background: 'rgba(0, 0, 0, 0.3)'
            }}
          >
            {['skills', 'projects', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                onMouseEnter={() => soundManager.playHover()}
                style={{
                  background: 'rgba(0, 242, 254, 0.1)',
                  border: '1px solid rgba(0, 242, 254, 0.25)',
                  color: '#00f2fe',
                  borderRadius: '6px',
                  padding: '3px 10px',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Interactive Input Line */}
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(13, 20, 36, 0.95)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <span style={{ color: '#00f2fe', fontWeight: 700 }}>$</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command (e.g. skills)..."
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                width: '100%'
              }}
            />
          </div>
        </div>

        {/* Card 3: Metrics & Highlights Row (12 columns split into 3 cards) */}
        {[
          {
            number: personalInfo.yearsExperience,
            label: "Years of Experience",
            sub: "In modern full-stack web engineering & responsive design.",
            color: "#00f2fe"
          },
          {
            number: personalInfo.completedProjects,
            label: "Projects Completed",
            sub: "Spanning MERN platforms, API architectures, and frontend apps.",
            color: "#8b5cf6"
          },
          {
            number: "100%",
            label: "Commitment & Precision",
            sub: "Dedicated to writing clean, maintainable, production-ready code.",
            color: "#10b981"
          }
        ].map((stat, i) => (
          <div
            key={i}
            className="tilt-card"
            style={{
              gridColumn: 'span 4',
              padding: '28px',
              textAlign: 'center'
            }}
          >
            <div className="spotlight-overlay" />
            <div
              style={{
                fontSize: '2.8rem',
                fontWeight: 900,
                color: stat.color,
                marginBottom: '6px',
                textShadow: `0 0 20px ${stat.color}40`
              }}
            >
              {stat.number}
            </div>
            <h4 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '8px' }}>
              {stat.label}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 960px) {
          .about-bento-grid > div {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
