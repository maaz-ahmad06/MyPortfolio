import { useEffect, useRef, useState } from 'react';
import { Terminal, Cpu } from 'lucide-react';
import { soundManager } from '../utils/audioFx';

const STATUS_LOGS = [
  'INITIALIZING CORE SYSTEM...',
  'LOADING REACT 19 ENGINE...',
  'ESTABLISHING MERN ECOSYSTEM...',
  'COMPILING SHADER PARTICLES...',
  'OPTIMIZING REST APIS...',
  'ACCESS GRANTED - WELCOME'
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const exitStartedRef = useRef(false);
  const exitTimerRef = useRef(null);
  const completeTimerRef = useRef(null);

  const triggerExit = (delayMs = 200) => {
    if (exitStartedRef.current) return;
    exitStartedRef.current = true;

    exitTimerRef.current = setTimeout(() => {
      setIsExiting(true);
      soundManager.playSuccess();
      completeTimerRef.current = setTimeout(() => {
        onComplete();
      }, 500);
    }, delayMs);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 5) + (prev > 65 ? 6 : 4);
        return Math.min(prev + step, 100);
      });
    }, 35);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      triggerExit(200);
    }
  });

  useEffect(() => {
    return () => {
      clearTimeout(exitTimerRef.current);
      clearTimeout(completeTimerRef.current);
    };
  }, []);

  const statusIndex = Math.min(
    Math.floor((progress / 100) * STATUS_LOGS.length),
    STATUS_LOGS.length - 1
  );

  const circleRadius = 54;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#060913',
        backgroundImage: 'radial-gradient(circle at center, rgba(0, 242, 254, 0.12) 0%, rgba(6, 9, 19, 0.98) 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.06)' : 'scale(1)',
        pointerEvents: isExiting ? 'none' : 'all'
      }}
    >
      {/* Background Cyber Grid */}
      <div className="cyber-grid-bg" />

      {/* Center Preloader Container */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          zIndex: 10
        }}
      >
        {/* Glowing SVG Ring & Counter */}
        <div style={{ position: 'relative', width: '150px', height: '150px' }}>
          <svg width="150" height="150" viewBox="0 0 130 130" style={{ transform: 'rotate(-90deg)' }}>
            {/* Background track circle */}
            <circle
              cx="65"
              cy="65"
              r={circleRadius}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="5"
              fill="transparent"
            />
            {/* Animated progress circle */}
            <circle
              cx="65"
              cy="65"
              r={circleRadius}
              stroke="url(#preloaderGradient)"
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              style={{
                transition: 'stroke-dashoffset 0.08s ease-out',
                filter: 'drop-shadow(0 0 10px rgba(0, 242, 254, 0.8))'
              }}
            />
            <defs>
              <linearGradient id="preloaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f2fe" />
                <stop offset="50%" stopColor="#4facfe" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner Counter Text */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                color: '#f8fafc',
                textShadow: '0 0 15px rgba(0, 242, 254, 0.7)'
              }}
            >
              {progress}%
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: '#00f2fe',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}
            >
              LOADING
            </span>
          </div>
        </div>

        {/* Brand & Dev Identity */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(0, 242, 254, 0.08)',
              border: '1px solid rgba(0, 242, 254, 0.25)',
              marginBottom: '10px'
            }}
          >
            <Cpu size={15} color="#00f2fe" className="animate-spin-slow" />
            <span className="font-mono" style={{ fontSize: '0.8rem', color: '#00f2fe', letterSpacing: '0.08em' }}>
              MERN STACK ARCHITECTURE
            </span>
          </div>

          <h2
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '4px'
            }}
          >
            <span className="gradient-text">PORTFOLIO</span> <span style={{ color: '#fff' }}>OS</span>
          </h2>
        </div>

        {/* Terminal Boot Log */}
        <div
          style={{
            background: 'rgba(13, 20, 36, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            padding: '8px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: 'min(360px, 90vw)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
          }}
        >
          <Terminal size={14} color="#00f2fe" />
          <span
            className="font-mono"
            style={{
              fontSize: '0.75rem',
              color: progress === 100 ? '#10b981' : '#94a3b8',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {STATUS_LOGS[statusIndex]}
          </span>
        </div>

        {/* Skip button for immediate entry */}
        <button
          type="button"
          onClick={() => {
            setProgress(100);
            triggerExit(0);
          }}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '9999px',
            color: '#94a3b8',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            padding: '5px 14px',
            cursor: 'pointer',
            transition: 'color 0.2s, border-color 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = '#00f2fe';
            e.currentTarget.style.borderColor = 'rgba(0, 242, 254, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = '#94a3b8';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
          }}
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
}
