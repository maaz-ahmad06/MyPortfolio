import { useEffect, useState } from 'react';
import { Terminal, Sparkles, Cpu, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/audioFx';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const statusLogs = [
    "INITIALIZING CORE SYSTEM...",
    "LOADING REACT 19 ENGINE...",
    "ESTABLISHING MERN ECOSYSTEM...",
    "COMPILING SHADER PARTICLES...",
    "OPTIMIZING REST APIS...",
    "ACCESS GRANTED - WELCOME"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            soundManager.playSuccess();
            setTimeout(() => {
              onComplete();
            }, 650);
          }, 350);
          return 100;
        }
        // Accelerate near the end
        const step = Math.floor(Math.random() * 4) + (prev > 70 ? 4 : 2);
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const logIndex = Math.min(
      Math.floor((progress / 100) * statusLogs.length),
      statusLogs.length - 1
    );
    setStatusIndex(logIndex);
  }, [progress]);

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
        transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.08)' : 'scale(1)',
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
            minWidth: '280px',
            maxWidth: '360px',
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
            {statusLogs[statusIndex]}
          </span>
        </div>
      </div>
    </div>
  );
}
