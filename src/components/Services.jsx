import { Code, Layout, Server, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { servicesData } from '../data/portfolioData';
import { soundManager } from '../utils/audioFx';
import TiltCard from './TiltCard';

export default function Services() {
  const getIcon = (iconName, color) => {
    const props = { size: 28, color };
    switch (iconName) {
      case 'Code': return <Code {...props} />;
      case 'Layout': return <Layout {...props} />;
      case 'Server': return <Server {...props} />;
      case 'Zap': return <Zap {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <section id="services" className="section-wrapper">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-badge">
          <Sparkles size={14} />
          <span>Specialized Services</span>
        </div>
        <h2 className="section-title">
          What I Bring to <span className="gradient-text">Your Team & Projects</span>
        </h2>
        <p className="section-subtitle">
          Comprehensive full-stack engineering tailored for scalable growth, high performance, and unmatched user satisfaction.
        </p>
      </div>

      {/* Services Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}
      >
        {servicesData.map((service, idx) => (
          <TiltCard
            key={idx}
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div>
              {/* Icon Container */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: `${service.color}12`,
                  border: `1px solid ${service.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}
              >
                {getIcon(service.icon, service.color)}
              </div>

              {/* Service Title */}
              <h3 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '12px' }}>
                {service.title}
              </h3>

              {/* Service Description */}
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.7 }}>
                {service.desc}
              </p>
            </div>

            {/* Quick Contact CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                soundManager.playClick();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => soundManager.playHover()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: service.color,
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                marginTop: '12px'
              }}
            >
              <span>Discuss this requirement</span>
              <ArrowRight size={16} />
            </a>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
