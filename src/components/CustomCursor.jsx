/**
 * @fileoverview High-Performance Custom Cursor Component for Frontend Odyssey.
 * @module CustomCursor
 * @description Renders a hardware-accelerated, zero-state-thrash custom cursor using direct DOM manipulation and requestAnimationFrame.
 * @author Frontend Odyssey Team
 */

import React, { useEffect, useRef, memo } from 'react';

/**
 * CustomCursor Component
 * Uses zero React state updates on mouse move to guarantee 60-120fps UI responsiveness.
 *
 * @component
 * @returns {JSX.Element|null} The interactive custom cursor element or null on touch devices.
 */
function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const textRef = useRef(null);

  const posRef = useRef({
    targetX: -100,
    targetY: -100,
    currentX: -100,
    currentY: -100,
    isVisible: false,
    isHovered: false,
    hoverText: ''
  });

  useEffect(() => {
    // Detect touch capability to preserve mobile native behavior
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isTouch) {
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;

      if (!posRef.current.isVisible) {
        posRef.current.isVisible = true;
        if (cursorRef.current) cursorRef.current.style.opacity = '1';
        if (dotRef.current) dotRef.current.style.opacity = '1';
      }

      const interactiveEl = e.target.closest('button, a, .action-link, .wheel-squircle-card, .nav-brand-center, .yourbana-nav-item, .marquee-floating-badge, .constellation-node, .realm-card, .sanctuary-card');

      if (interactiveEl) {
        posRef.current.isHovered = true;
        let newText = '';
        if (interactiveEl.classList.contains('wheel-squircle-card')) {
          newText = 'VIEW';
        } else if (interactiveEl.classList.contains('yourbana-nav-item')) {
          newText = 'OPEN';
        } else if (interactiveEl.classList.contains('constellation-node')) {
          newText = 'FOCUS';
        } else if (interactiveEl.classList.contains('action-link')) {
          newText = 'EXPLORE';
        }

        if (posRef.current.hoverText !== newText) {
          posRef.current.hoverText = newText;
          if (textRef.current) textRef.current.textContent = newText;
        }
      } else {
        if (posRef.current.isHovered) {
          posRef.current.isHovered = false;
          posRef.current.hoverText = '';
          if (textRef.current) textRef.current.textContent = '';
        }
      }
    };

    const handleMouseLeave = () => {
      posRef.current.isVisible = false;
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    let animId;
    const renderLoop = () => {
      const { targetX, targetY, currentX, currentY, isHovered, isVisible } = posRef.current;

      if (isVisible) {
        const dx = targetX - currentX;
        const dy = targetY - currentY;

        posRef.current.currentX += dx * 0.22;
        posRef.current.currentY += dy * 0.22;

        const curX = posRef.current.currentX;
        const curY = posRef.current.currentY;
        const scale = isHovered ? 2.2 : 1;
        const dotScale = isHovered ? 0 : 1;

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%) scale(${scale})`;
        }
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
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

  return (
    <>
      <div ref={dotRef} className="masking-cursor-dot" style={{ opacity: 0 }} />
      <div ref={cursorRef} className="masking-cursor-circle" style={{ opacity: 0 }}>
        <span ref={textRef} className="cursor-mask-text font-mono" />
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
          will-change: transform, opacity;
          transform: translateZ(0);
          transition: opacity 0.2s ease;
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
          will-change: transform, opacity;
          transform: translateZ(0);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease;
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

        @media (hover: none), (pointer: coarse) {
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

CustomCursor.propTypes = {};

export default memo(CustomCursor);
