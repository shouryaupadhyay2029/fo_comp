import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [hoverText, setHoverText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const posRef = useRef({ targetX: -100, targetY: -100, currentX: -100, currentY: -100 });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const interactiveEl = e.target.closest('button, a, .action-link, .wheel-squircle-card, .nav-brand-center, .yourbana-nav-item, .marquee-floating-badge, .constellation-node, .realm-card, .sanctuary-card');

      if (interactiveEl) {
        if (!isHoveredRef.current) {
          isHoveredRef.current = true;
          setIsHovered(true);
        }
        if (interactiveEl.classList.contains('wheel-squircle-card')) {
          setHoverText('VIEW');
        } else if (interactiveEl.classList.contains('yourbana-nav-item')) {
          setHoverText('OPEN');
        } else if (interactiveEl.classList.contains('constellation-node')) {
          setHoverText('FOCUS');
        } else if (interactiveEl.classList.contains('action-link')) {
          setHoverText('EXPLORE');
        } else {
          setHoverText('');
        }
      } else {
        if (isHoveredRef.current) {
          isHoveredRef.current = false;
          setIsHovered(false);
          setHoverText('');
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let animId;
    const renderLoop = () => {
      const { targetX, targetY, currentX, currentY } = posRef.current;
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Only calculate lerp if moving
      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        posRef.current.currentX += dx * 0.22;
        posRef.current.currentY += dy * 0.22;

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${posRef.current.currentX}px, ${posRef.current.currentY}px, 0) translate(-50%, -50%) scale(${isHoveredRef.current ? 2.2 : 1})`;
        }
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(${isHoveredRef.current ? 0 : 1})`;
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };
    animId = requestAnimationFrame(renderLoop);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Instant Pointer Dot */}
      <div ref={dotRef} className="masking-cursor-dot" />

      {/* Main Masking Blend-Mode Inverting Circle Cursor */}
      <div ref={cursorRef} className={`masking-cursor-circle ${isHovered ? 'is-hovered' : ''}`}>
        {hoverText && <span className="cursor-mask-text font-mono">{hoverText}</span>}
      </div>

      <style>{`
        body.custom-cursor-active,
        body.custom-cursor-active button,
        body.custom-cursor-active a,
        body.custom-cursor-active input {
          cursor: none !important;
        }

        .masking-cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 5px;
          height: 5px;
          background: #d94e00;
          border-radius: 50%;
          z-index: 10000;
          pointer-events: none;
          will-change: transform;
        }

        .masking-cursor-circle {
          position: fixed;
          top: 0;
          left: 0;
          width: 34px;
          height: 34px;
          background-color: #ffffff;
          mix-blend-mode: difference;
          border-radius: 50%;
          z-index: 9999;
          pointer-events: none;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cursor-mask-text {
          font-size: 0.28rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          color: #000000;
          text-transform: uppercase;
          user-select: none;
          pointer-events: none;
        }

        @media (hover: none) {
          .masking-cursor-dot,
          .masking-cursor-circle {
            display: none !important;
          }
          body.custom-cursor-active,
          body.custom-cursor-active button,
          body.custom-cursor-active a {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
