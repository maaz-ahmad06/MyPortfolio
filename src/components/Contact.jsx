import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, MessageCircle, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../utils/audioFx';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedType, setCopiedType] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopy = (text, type) => {
    soundManager.playClick();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      soundManager.playSuccess();

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f2fe', '#4facfe', '#8b5cf6', '#ec4899', '#10b981']
        });
      } catch {
        // Fallback if canvas confetti fails
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="section-wrapper">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-badge">
          <Send size={14} />
          <span>Get In Touch</span>
        </div>
        <h2 className="section-title">
          Let's Build Something <span className="gradient-text">Exceptional Together</span>
        </h2>
        <p className="section-subtitle">
          Have a project in mind, an open developer role, or simply want to connect? Send a message and I'll reply promptly!
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.2fr',
          gap: '36px',
          alignItems: 'start'
        }}
        className="contact-grid"
      >
        {/* Left Column: Direct Contact Info & Quick Copy Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email Quick Card */}
          <div
            className="tilt-card"
            style={{
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div className="spotlight-overlay" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(0, 242, 254, 0.1)',
                  border: '1px solid rgba(0, 242, 254, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00f2fe'
                }}
              >
                <Mail size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Email Address</span>
                <h4 style={{ fontSize: '1rem', color: '#fff', wordBreak: 'break-all' }}>{personalInfo.email}</h4>
              </div>
            </div>

            <button
              onClick={() => handleCopy(personalInfo.email, 'email')}
              title="Copy Email"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: copiedType === 'email' ? '#10b981' : '#94a3b8',
                borderRadius: '10px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem'
              }}
            >
              {copiedType === 'email' ? <Check size={16} /> : <Copy size={16} />}
              <span>{copiedType === 'email' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* WhatsApp Direct Card */}
          <div
            className="tilt-card"
            style={{
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div className="spotlight-overlay" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981'
                }}
              >
                <MessageCircle size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>WhatsApp Direct</span>
                <h4 style={{ fontSize: '1rem', color: '#fff' }}>{personalInfo.phone}</h4>
              </div>
            </div>

            <a
              href={personalInfo.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#10b981',
                borderRadius: '10px',
                padding: '8px 14px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Chat</span>
            </a>
          </div>

          {/* Location & Status Card */}
          <div
            className="tilt-card"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div className="spotlight-overlay" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={20} color="#ec4899" />
              <span style={{ color: '#cbd5e1', fontSize: '0.95rem', fontWeight: 500 }}>
                {personalInfo.location}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                paddingTop: '10px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <span className="radar-dot" />
              <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>
                {personalInfo.status}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Cyber Glass Contact Form */}
        <div
          className="tilt-card"
          style={{
            padding: '36px',
            borderRadius: '24px'
          }}
        >
          <div className="spotlight-overlay" />

          {/* Success Banner */}
          {isSuccess && (
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#10b981',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animation: 'float 3s ease-in-out infinite'
              }}
            >
              <Check size={20} />
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                Thank you! Your message has been sent successfully. I will get back to you soon!
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Name and Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 500 }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(6, 9, 19, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.25s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#00f2fe')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 500 }}>
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(6, 9, 19, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#fff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.25s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#00f2fe')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 500 }}>
                Subject / Project Type *
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. MERN Web App / Full-time Role / Contract"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(6, 9, 19, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.25s ease'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#00f2fe')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
              />
            </div>

            {/* Message */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 500 }}>
                Your Message *
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project scope, timeline, and goals..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(6, 9, 19, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.25s ease'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#00f2fe')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={() => soundManager.playHover()}
              className="btn-magnetic btn-primary-glow"
              style={{
                width: '100%',
                padding: '14px 28px',
                fontSize: '1rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              <Send size={18} />
              <span>{isSubmitting ? 'Transmitting Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
