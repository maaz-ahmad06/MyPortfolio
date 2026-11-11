import { useEffect, useRef, useState } from 'react';
import { User, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';
import { personalInfo, terminalCommands } from '../data/portfolioData';
import { soundManager } from '../utils/audioFx';
import TiltCard from './TiltCard';

export default function About() {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: `Welcome to ${personalInfo.name}'s Interactive Terminal!` },
    { type: 'system', text: "Type 'help' or click any quick command chip below." }
  ]);
  const terminalBodyRef = useRef(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory]);

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
        <TiltCard
          style={{
            gridColumn: 'span 7',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
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
                  background: 'linear-gradient(135deg, #0284c7, #6366f1)',
                  boxShadow: '0 6px 18px rgba(2, 132, 199, 0.25)',
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
                    background: 'rgba(2, 132, 199, 0.09)',
                    color: '#0284c7',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '4px'
                  }}
                >
                  <Sparkles size={13} />
                  <span>PASSIONATE DEVELOPER</span>
                </div>
                <h3 style={{ fontSize: '1.6rem', color: '#0f172a', margin: 0 }}>
                  Hello! I'm <span className="gradient-text">{personalInfo.name}</span>
                </h3>
              </div>
            </div>

            <p style={{ color: '#334155', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '20px' }}>
              I am a Full Stack MERN Developer based in <strong>{personalInfo.location}</strong>. My passion lies in engineering end-to-end modern web applications that are not only performant and scalable under the hood, but also visually breathtaking and effortless to use.
            </p>

            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.98rem', marginBottom: '28px' }}>
              A <strong>Software Engineering Graduate from Islamia College University, Peshawar</strong>, I specialize in engineering state-driven React frontends, robust Node.js/Express REST APIs, and scalable MongoDB database architectures.
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
                  <CheckCircle size={16} color="#0284c7" />
                  <span style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                soundManager.playClick();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
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
        </TiltCard>

        {/* Card 2: Interactive Cyber Terminal (5 columns) */}
        <TiltCard
          tilt={false}
          className="cyber-terminal"
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
            ref={terminalBodyRef}
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
                      ? '#38bdf8'
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
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              background: 'rgba(30, 41, 59, 0.55)'
            }}
          >
            {['about', 'skills', 'projects', 'socials', 'contact', 'clear'].map((cmd) => (
              <button
                type="button"
                key={cmd}
                onClick={() => handleCommand(cmd)}
                onMouseEnter={() => soundManager.playHover()}
                style={{
                  background: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.28)',
                  color: '#38bdf8',
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
              background: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <span style={{ color: '#38bdf8', fontWeight: 700 }}>$</span>
            <input
              type="text"
              aria-label="Terminal command input"
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
        </TiltCard>

        {/* Card 3: Metrics & Highlights Row (12 columns split into 3 cards) */}
        {[
          {
            number: personalInfo.yearsExperience,
            label: "Years of Experience",
            sub: "In modern full-stack web engineering & responsive design.",
            color: "#0284c7"
          },
          {
            number: personalInfo.completedProjects,
            label: "Projects Completed",
            sub: "Spanning MERN platforms, API architectures, and frontend apps.",
            color: "#6366f1"
          },
          {
            number: "100%",
            label: "Commitment & Precision",
            sub: "Dedicated to writing clean, maintainable, production-ready code.",
            color: "#059669"
          }
        ].map((stat, i) => (
          <TiltCard
            key={i}
            style={{
              gridColumn: 'span 4',
              padding: '28px',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                fontSize: '2.8rem',
                fontWeight: 900,
                color: stat.color,
                marginBottom: '6px'
              }}
            >
              {stat.number}
            </div>
            <h4 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '8px' }}>
              {stat.label}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>
              {stat.sub}
            </p>
          </TiltCard>
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
