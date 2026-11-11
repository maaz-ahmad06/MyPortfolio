import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, Check, Copy, MessageCircle } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundManager } from '../utils/audioFx';
import TiltCard from './TiltCard';

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

  const timersRef = useRef([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((id) => clearTimeout(id));
    };
  }, []);

  const scheduleTimer = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopy = async (text, type) => {
    soundManager.playClick();
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      scheduleTimer(() => setCopiedType(null), 2500);
    } catch {
      // Clipboard API may be blocked in insecure contexts
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playClick();
    setIsSubmitting(true);

    // Simulate sending message
    scheduleTimer(async () => {
      setIsSubmitting(false);
      setIsSuccess(true);
      soundManager.playSuccess();

      // Dynamically load confetti only on submission
      try {
        const { default: confetti } = await import('canvas-confetti');
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
      scheduleTimer(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  const fieldStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    background: 'rgba(6, 9, 19, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.25s ease'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    color: '#94a3b8',
    marginBottom: '8px',
    fontWeight: 500
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
          <TiltCard
            style={{
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
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
              type="button"
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
          </TiltCard>

          {/* WhatsApp Direct Card */}
          <TiltCard
            style={{
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
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
          </TiltCard>

          {/* Location & Status Card */}
          <TiltCard
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
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
          </TiltCard>
        </div>

        {/* Right Column: Interactive Cyber Glass Contact Form */}
        <TiltCard
          tilt={false}
          style={{
            padding: '36px',
            borderRadius: '24px'
          }}
        >
          {/* Success Banner */}
          {isSuccess && (
            <div
              role="status"
              aria-live="polite"
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
                <label htmlFor="contact-name" style={labelStyle}>
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  style={fieldStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#00f2fe')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                />
              </div>

              <div>
                <label htmlFor="contact-email" style={labelStyle}>
                  Your Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  style={fieldStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#00f2fe')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="contact-subject" style={labelStyle}>
                Subject / Project Type *
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. MERN Web App / Full-time Role / Contract"
                style={fieldStyle}
                onFocus={(e) => (e.target.style.borderColor = '#00f2fe')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" style={labelStyle}>
                Your Message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project scope, timeline, and goals..."
                style={{ ...fieldStyle, resize: 'vertical' }}
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
        </TiltCard>
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
