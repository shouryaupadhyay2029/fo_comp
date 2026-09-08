import React, { useState, useEffect } from 'react';

export default function BackToTopSeal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`back-to-top-seal-container ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
      <div className="seal-badge-inner">
        {/* Rotating Circular Text Ring */}
        <svg className="seal-text-svg" viewBox="0 0 120 120">
          <path
            id="sealTextPath"
            d="M 60, 60 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            fill="none"
          />
          <text fill="#f7b233" fontSize="9" fontWeight="800" letterSpacing="0.16em">
            <textPath href="#sealTextPath" startOffset="0%">
              • BACK TO TOP • BACK TO TOP •
            </textPath>
          </text>
        </svg>

        {/* Center Upward Arrow Icon */}
        <div className="seal-center-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="#f7b233" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </div>
      </div>

      <style>{`
        .back-to-top-seal-container {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 900;
          width: 82px;
          height: 82px;
          cursor: pointer;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px) scale(0.85);
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      visibility 0.4s ease;
          user-select: none;
        }

        .back-to-top-seal-container.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0) scale(1);
        }

        .seal-badge-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(18, 11, 5, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1.5px solid rgba(247, 178, 51, 0.4);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .back-to-top-seal-container:hover .seal-badge-inner {
          transform: scale(1.08);
          border-color: #f7b233;
          box-shadow: 0 12px 32px rgba(247, 178, 51, 0.25), 0 4px 16px rgba(0, 0, 0, 0.4);
        }

        .seal-text-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          animation: spinSeal 14s linear infinite;
          font-family: var(--font-gondens);
          text-transform: uppercase;
        }

        .seal-center-arrow {
          width: 22px;
          height: 22px;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .back-to-top-seal-container:hover .seal-center-arrow {
          transform: translateY(-3px);
        }

        @keyframes spinSeal {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .back-to-top-seal-container {
            bottom: 20px;
            right: 20px;
            width: 70px;
            height: 70px;
          }
          .seal-center-arrow {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </div>
  );
}
