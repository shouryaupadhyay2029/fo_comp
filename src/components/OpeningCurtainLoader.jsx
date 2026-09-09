/**
 * @fileoverview Opening Vertical Slat Loader Component.
 * @module OpeningCurtainLoader
 * @description Provides a initial page transition animation with vertical slat wipes and splash branding.
 * @author Frontend Odyssey Team
 */

import React, { useState, useEffect, memo } from 'react';

/**
 * Opening Curtain Loader Component.
 *
 * @component
 * @returns {JSX.Element|null} Splash overlay element or null once animation completes.
 */
function OpeningCurtainLoader() {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Unmount after curtain animation completes to free DOM resources
    const timer = setTimeout(() => {
      setIsDone(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isDone) return null;

  return (
    <div className="opening-curtain-container" aria-hidden="true">
      {/* Center Brand Splash Text */}
      <div className="curtain-brand-splash font-mono">
        <span className="splash-title">VELOURA</span>
        <span className="splash-sub">• EDITION 001 •</span>
      </div>

      {/* 5 Vertical Slat Columns (Opening swipe effect) */}
      <div className="curtain-slats-grid">
        <div className="curtain-slat slat-1"></div>
        <div className="curtain-slat slat-2"></div>
        <div className="curtain-slat slat-3"></div>
        <div className="curtain-slat slat-4"></div>
        <div className="curtain-slat slat-5"></div>
      </div>

      <style>{`
        .opening-curtain-container {
          position: fixed;
          inset: 0;
          z-index: 99999;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .curtain-brand-splash {
          position: absolute;
          z-index: 100001;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: splashFadeOut 0.4s ease 0.45s forwards;
        }

        .splash-title {
          font-family: var(--font-gondens);
          font-size: 2.2rem;
          font-weight: 800;
          color: #f6f2ec;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .splash-sub {
          font-size: 0.72rem;
          color: #d94e00;
          letter-spacing: 0.15em;
        }

        .curtain-slats-grid {
          position: absolute;
          inset: 0;
          width: 100vw;
          height: 100vh;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          z-index: 100000;
        }

        .curtain-slat {
          background: #121110;
          width: 100%;
          height: 100%;
          transform-origin: top;
          will-change: transform;
          animation: slatWipeUp 0.75s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }

        .slat-1 { animation-delay: 0.5s; }
        .slat-2 { animation-delay: 0.58s; }
        .slat-3 { animation-delay: 0.66s; }
        .slat-4 { animation-delay: 0.74s; }
        .slat-5 { animation-delay: 0.82s; }

        @keyframes splashFadeOut {
          to {
            opacity: 0;
            transform: translateY(-12px);
          }
        }

        @keyframes slatWipeUp {
          0% {
            transform: scaleY(1);
          }
          100% {
            transform: scaleY(0);
          }
        }
      `}</style>
    </div>
  );
}

OpeningCurtainLoader.propTypes = {};

export default memo(OpeningCurtainLoader);
