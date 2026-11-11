import { useRef } from 'react';

/**
 * Reusable glassmorphic card with cursor-tracking spotlight and optional subtle 3D tilt.
 * Respects `prefers-reduced-motion` and resets transforms cleanly when the pointer leaves.
 */
export default function TiltCard({
  children,
  className = '',
  style = {},
  tilt = true,
  maxTilt = 4,
  onMouseMove,
  onMouseLeave,
  ...rest
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (tilt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((centerY - y) / centerY) * maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      }
    }

    if (onMouseMove) onMouseMove(e);
  };

  const handleMouseLeave = (e) => {
    const card = cardRef.current;
    if (card && tilt) {
      card.style.transform = '';
    }
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`.trim()}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <div className="spotlight-overlay" />
      {children}
    </div>
  );
}
