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
        const step = Math.floor(Math.random() * 6) + (prev > 60 ? 9 : 6);
        return Math.min(prev + step, 100);
      });
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      triggerExit(120);
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
        backgroundColor: '#f4f7fb',
        backgroundImage: 'radial-gradient(circle at center, rgba(2, 132, 199, 0.1) 0%, rgba(244, 247, 251, 0.98) 70%)',
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
              stroke="rgba(15, 23, 42, 0.08)"
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
                filter: 'drop-shadow(0 2px 6px rgba(2, 132, 199, 0.35))'
              }}
            />
            <defs>
              <linearGradient id="preloaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="50%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#6366f1" />
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
                color: '#0f172a'
              }}
            >
              {progress}%
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: '#0284c7',
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
              background: 'rgba(2, 132, 199, 0.08)',
              border: '1px solid rgba(2, 132, 199, 0.22)',
              marginBottom: '10px'
            }}
          >
            <Cpu size={15} color="#0284c7" className="animate-spin-slow" />
            <span className="font-mono" style={{ fontSize: '0.8rem', color: '#0284c7', letterSpacing: '0.08em' }}>
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
            <span className="gradient-text">PORTFOLIO</span> <span style={{ color: '#0f172a' }}>OS</span>
          </h2>
        </div>

        {/* Terminal Boot Log */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(15, 23, 42, 0.1)',
            borderRadius: '10px',
            padding: '8px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: 'min(360px, 90vw)',
            boxShadow: '0 8px 24px -6px rgba(15, 23, 42, 0.1)'
          }}
        >
          <Terminal size={14} color="#0284c7" />
          <span
            className="font-mono"
            style={{
              fontSize: '0.75rem',
              color: progress === 100 ? '#059669' : '#475569',
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
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(15, 23, 42, 0.14)',
            borderRadius: '9999px',
            color: '#475569',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            padding: '5px 14px',
            cursor: 'pointer',
            transition: 'color 0.2s, border-color 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = '#0284c7';
            e.currentTarget.style.borderColor = 'rgba(2, 132, 199, 0.45)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = '#475569';
            e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.14)';
          }}
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
}
