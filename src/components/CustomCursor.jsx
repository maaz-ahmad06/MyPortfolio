import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, .tilt-card, [role="button"]';

/**
 * Glowing custom cursor rendered on fine-pointer (non-touch) devices.
 * Uses direct DOM ref transforms in a single RAF loop and document event delegation
 * to avoid per-frame React re-renders and listener leaks.
 */
export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const trailingPosRef = useRef({ x: -100, y: -100 });
  const visibleRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    const handlePointerChange = (e) => setIsTouch(e.matches);
    mediaQuery.addEventListener('change', handlePointerChange);

    if (isTouch) {
      return () => mediaQuery.removeEventListener('change', handlePointerChange);
    }

    const onMouseMove = (e) => {
      if (!visibleRef.current) {
        trailingPosRef.current = { x: e.clientX, y: e.clientY };
        visibleRef.current = true;
        setIsVisible(true);
      }
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => setIsHovered(true);
    const onMouseUp = () => setIsHovered(false);

    const onMouseLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      visibleRef.current = true;
      setIsVisible(true);
    };

    const onMouseOver = (e) => {
      if (e.target instanceof Element && e.target.closest(INTERACTIVE_SELECTOR)) {
        setIsHovered(true);
      }
    };

    const onMouseOut = (e) => {
      if (!(e.target instanceof Element)) return;
      const currentInteractive = e.target.closest(INTERACTIVE_SELECTOR);
      if (!currentInteractive) return;
      const nextInteractive =
        e.relatedTarget instanceof Element ? e.relatedTarget.closest(INTERACTIVE_SELECTOR) : null;
      if (nextInteractive !== currentInteractive) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    let animationFrameId;
    const renderCursor = () => {
      const target = mousePosRef.current;
      const trail = trailingPosRef.current;

      trail.x += (target.x - trail.x) * 0.18;
      trail.y += (target.y - trail.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(renderCursor);
    };

    animationFrameId = requestAnimationFrame(renderCursor);

    return () => {
      mediaQuery.removeEventListener('change', handlePointerChange);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Inner precise dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '8px' : '6px',
          height: isHovered ? '8px' : '6px',
          backgroundColor: '#0284c7',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          boxShadow: '0 0 8px rgba(2, 132, 199, 0.45)',
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.15s ease'
        }}
      />
      {/* Outer trailing glow ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '48px' : '32px',
          height: isHovered ? '48px' : '32px',
          borderRadius: '50%',
          border: isHovered ? '1.5px solid rgba(2, 132, 199, 0.75)' : '1.5px solid rgba(99, 102, 241, 0.4)',
          background: isHovered ? 'rgba(2, 132, 199, 0.08)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovered ? '0 0 16px rgba(2, 132, 199, 0.18)' : 'none',
          transition:
            'width 0.25s cubic-bezier(0.1, 1, 0.1, 1), height 0.25s cubic-bezier(0.1, 1, 0.1, 1), border 0.25s ease, background 0.25s ease, opacity 0.15s ease'
        }}
      />
    </>
  );
}
