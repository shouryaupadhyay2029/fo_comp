import React from 'react';

export default function Navbar({ onOpenMenu, onNavigateRoute }) {
  return (
    <header className="navbar-themed-container" role="banner">
      <nav className="nav-content-grid" aria-label="Main Navigation">
        {/* Left Side: Editorial Issue Tag */}
        <div className="nav-left-group">
          <div className="nav-issue-badge font-mono">
            <span className="issue-label">EDITION 001</span>
            <span className="issue-sep">/</span>
            <span className="issue-season text-muted">SPRING 2026</span>
          </div>
        </div>

        {/* Center Brand Name */}
        <div 
          className="nav-brand-center"
          role="button"
          tabIndex={0}
          aria-label="Navigate to Home"
          onClick={() => {
            if (onNavigateRoute) {
              onNavigateRoute('/');
            } else {
              window.history.pushState(null, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              if (onNavigateRoute) onNavigateRoute('/');
            }
          }}
        >
          <span className="brand-title-clean">VELOURA</span>
        </div>

        {/* Right Navigation: Live Presence Counter + Hamburger Menu Trigger */}
        <div className="nav-pill-group-right">
          <div className="nav-presence-pill font-mono">
            <span className="presence-dot-live"></span>
            <span className="presence-text">1,420 ONLINE</span>
          </div>

          <button
            className="nav-pill-btn menu-trigger-pill"
            onClick={onOpenMenu}
            aria-label="Open menu navigation overlay"
          >
            <svg className="hamburger-lines-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="2" y="5" width="20" height="2.5" rx="1" />
              <rect x="2" y="11" width="20" height="2.5" rx="1" />
              <rect x="2" y="17" width="20" height="2.5" rx="1" />
            </svg>
          </button>
        </div>
      </nav>

      <style>{`
        .navbar-themed-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 500;
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border: none;
          padding: 20px 0;
          pointer-events: none;
          animation: navbarFadeSlideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
        }

        @keyframes navbarFadeSlideDown {
          from {
            transform: translateY(-25px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .nav-content-grid {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          pointer-events: auto;
        }

        .nav-left-group {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .nav-issue-badge {
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #121110;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid rgba(18, 17, 16, 0.16);
          background: rgba(246, 242, 236, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          white-space: nowrap;
          transition: border-color 0.3s ease, background 0.3s ease;
        }

        .nav-issue-badge:hover {
          border-color: #d94e00;
          background: rgba(246, 242, 236, 0.9);
        }

        .issue-sep {
          color: #d94e00;
          font-weight: 800;
        }

        .nav-pill-group-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
        }

        .nav-presence-pill {
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #121110;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          border-radius: 9999px;
          border: 1px solid rgba(18, 17, 16, 0.16);
          background: rgba(246, 242, 236, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          white-space: nowrap;
          transition: border-color 0.3s ease, background 0.3s ease;
        }

        .nav-presence-pill:hover {
          border-color: #22c55e;
          background: rgba(246, 242, 236, 0.9);
        }

        .presence-dot-live {
          width: 7px;
          height: 7px;
          background: #22c55e;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
          animation: dotPulse 2s ease-in-out infinite;
        }

        .nav-pill-btn {
          background: #f7b233;
          border: none;
          border-radius: 9999px;
          color: #120b05;
          font-family: var(--font-gondens);
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 9px 24px;
          cursor: pointer;
          transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
          white-space: nowrap;
        }

        .nav-pill-btn:hover {
          background: #ffc857;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
        }

        .hamburger-lines-svg {
          width: 18px;
          height: 18px;
        }

        .menu-trigger-pill {
          padding: 9px 16px !important;
        }

        .nav-brand-center {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          background: transparent;
          padding: 0;
          border: none;
        }

        .brand-title-clean {
          font-family: var(--font-gondens);
          font-size: 1.75rem;
          font-weight: 800;
          color: #121110;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .nav-brand-center:hover .brand-title-clean {
          opacity: 0.75;
          transform: scale(1.02);
        }

        @media (max-width: 1050px) {
          .nav-pill-btn {
            padding: 7px 16px;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 820px) {
          .nav-issue-badge { display: none; }
          .nav-presence-pill { display: none; }
        }
      `}</style>
    </header>
  );
}
