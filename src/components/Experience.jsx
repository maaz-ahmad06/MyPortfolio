import { Briefcase, Calendar, MapPin, Sparkles, GraduationCap, CheckCircle } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="section-wrapper">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-badge">
          <GraduationCap size={14} />
          <span>Timeline & Milestones</span>
        </div>
        <h2 className="section-title">
          My Experience & <span className="gradient-text">Education Journey</span>
        </h2>
        <p className="section-subtitle">
          My continuous path of learning, building real-world software, and engineering modern web solutions.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div
        style={{
          position: 'relative',
          maxWidth: '850px',
          margin: '0 auto',
          paddingLeft: '30px'
        }}
      >
        {/* Central glowing timeline line */}
        <div
          style={{
            position: 'absolute',
            left: '7px',
            top: '10px',
            bottom: '10px',
            width: '2px',
            background: 'linear-gradient(180deg, #00f2fe 0%, #8b5cf6 50%, #ec4899 100%)',
            boxShadow: '0 0 10px rgba(0, 242, 254, 0.5)'
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {experienceData.map((item, idx) => (
            <div
              key={idx}
              className="tilt-card"
              style={{
                position: 'relative',
                padding: '28px',
                marginLeft: '15px'
              }}
            >
              <div className="spotlight-overlay" />

              {/* Glowing Node Dot on Timeline */}
              <div
                style={{
                  position: 'absolute',
                  left: '-45px',
                  top: '28px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#00f2fe',
                  border: '3px solid #060913',
                  boxShadow: '0 0 12px #00f2fe'
                }}
              />

              {/* Top Meta Info */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginBottom: '12px'
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(0, 242, 254, 0.1)',
                    border: '1px solid rgba(0, 242, 254, 0.3)',
                    color: '#00f2fe',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600
                  }}
                >
                  <Calendar size={13} />
                  <span>{item.period}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#94a3b8',
                    fontSize: '0.85rem'
                  }}
                >
                  <MapPin size={14} color="#ec4899" />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* Title & Organization */}
              <h3 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '6px' }}>
                {item.title}
              </h3>
              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#8b5cf6',
                  marginBottom: '14px'
                }}
              >
                {item.organization}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#cbd5e1',
                  lineHeight: 1.7,
                  marginBottom: '20px'
                }}
              >
                {item.desc}
              </p>

              {/* Tag Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
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
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
