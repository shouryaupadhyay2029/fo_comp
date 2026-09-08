import React, { useState, useEffect } from 'react';

const MENU_ITEMS = [
  { index: '01', title: 'DISCOVER', route: '/discover' },
  { index: '02', title: 'EXCHANGE', route: '/exchange' },
  { index: '03', title: 'REALMS', route: '/realms' },
  { index: '—', title: 'WEAVE A THOUGHT →', action: 'weaver' }
];

export default function YourbanaMenuOverlay({ isOpen, onClose, onSelectMenuItem, onOpenWeaver, onNavigateRoute }) {
  const [timeString, setTimeString] = useState('');
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Live real-time clock indicator (YourBana style)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeString(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  const handleItemClick = (item, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
    if (item.action === 'weaver') {
      if (onOpenWeaver) onOpenWeaver();
    } else if (item.route) {
      if (onNavigateRoute) {
        onNavigateRoute(item.route);
      } else {
        window.history.pushState(null, '', item.route);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  };

  return (
    <div className={`yourbana-menu-overlay ${isOpen && !isClosing ? 'is-active' : ''} ${isClosing ? 'is-closing' : ''}`}>
      <div className="yourbana-menu-backdrop" onClick={onClose} />

      <div className="yourbana-menu-curtain">
        {/* Top Header Row with Close Box */}
        <div className="yourbana-menu-header">
          <div className="yourbana-brand-logo font-heading">VELOURA</div>
          
          <button className="yourbana-close-box" onClick={onClose} aria-label="Close menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Center Main Numbered Menu List */}
        <div className="yourbana-menu-body">
          <ul className="yourbana-nav-list">
            {MENU_ITEMS.map((item, idx) => {
              const currentCleanPath = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
              const itemCleanRoute = item.route ? item.route.toLowerCase().replace(/\/$/, '') || '/' : '';
              const isActive = itemCleanRoute && currentCleanPath === itemCleanRoute;

              return (
                <li
                  key={item.index}
                  className={`yourbana-nav-item ${item.action === 'weaver' ? 'nav-item-weaver' : ''} ${isActive ? 'is-active-route' : ''}`}
                  style={{ '--item-delay': `${idx * 0.07 + 0.15}s` }}
                  onClick={(e) => handleItemClick(item, e)}
                >
                  <div className="nav-item-mask">
                    <span className="nav-item-index font-heading">{item.index}</span>
                    <span className="nav-item-title font-heading">{item.title}</span>
                    {isActive && <span className="nav-active-tag font-mono">ACTIVE</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="yourbana-menu-footer font-mono">
          <div className="footer-left-langs">
            <span className="lang-active">EN</span>
            <span className="lang-sep">/</span>
            <span className="lang-sub">432HZ</span>
          </div>

          <div className="footer-center-socials">
            <button
              className="menu-footer-btn"
              onClick={() => {
                onClose();
                if (onNavigateRoute) onNavigateRoute('/');
                if (onSelectMenuItem) onSelectMenuItem('section-philosophy');
              }}
            >
              MANIFESTO
            </button>
            <button
              className="menu-footer-btn"
              onClick={() => {
                onClose();
                if (onNavigateRoute) onNavigateRoute('/');
                if (onSelectMenuItem) onSelectMenuItem('section-mindscape');
              }}
            >
              SYNAPSE
            </button>
            <button
              className="menu-footer-btn"
              onClick={() => {
                onClose();
                if (onNavigateRoute) onNavigateRoute('/realms');
              }}
            >
              REALMS
            </button>
          </div>

          <div className="footer-right-clock">
            <svg className="clock-globe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="clock-city">NEW YORK</span>
            <span className="clock-digits">{timeString}</span>
          </div>
        </div>
      </div>

      <style>{`
        .yourbana-menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
          pointer-events: auto;
        }

        .yourbana-menu-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          opacity: 0;
          animation: overlayFadeIn 0.35s ease forwards;
        }

        .is-closing .yourbana-menu-backdrop {
          animation: overlayFadeOut 0.45s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }

        .yourbana-menu-curtain {
          position: relative;
          width: 100vw;
          height: 100vh;
          background: #e85217; /* Signature vibrant orange/terracotta backdrop from YourBana */
          color: #0d0905;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px 48px;
          clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
          animation: curtainUnfold 0.52s cubic-bezier(0.77, 0, 0.175, 1) forwards;
          box-shadow: -20px 0 60px rgba(0, 0, 0, 0.4);
          overflow-y: auto;
        }

        .is-closing .yourbana-menu-curtain {
          animation: curtainFold 0.48s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }

        .is-closing .nav-item-mask {
          animation: itemSlideDown 0.35s cubic-bezier(0.77, 0, 0.175, 1) forwards !important;
        }

        .is-closing .yourbana-close-box {
          transform: rotate(-90deg) scale(0.85);
          opacity: 0;
          transition: transform 0.35s ease, opacity 0.35s ease;
        }

        @keyframes overlayFadeIn {
          to { opacity: 1; }
        }

        @keyframes overlayFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes curtainUnfold {
          to {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }

        @keyframes curtainFold {
          from {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
          to {
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
          }
        }

        @keyframes itemSlideDown {
          from {
            transform: translateY(0%);
            opacity: 1;
          }
          to {
            transform: translateY(110%);
            opacity: 0;
          }
        }

        /* Header Row */
        .yourbana-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 20px;
        }

        .yourbana-brand-logo {
          font-family: var(--font-astera);
          font-size: 1.8rem;
          font-weight: 800;
          color: #0d0905;
          letter-spacing: 0.1em;
        }

        .yourbana-close-box {
          width: 52px;
          height: 52px;
          border: 2px solid #0d0905;
          background: transparent;
          color: #0d0905;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.25s ease, transform 0.25s ease;
        }

        .yourbana-close-box:hover {
          background: #0d0905;
          color: #e85217;
          transform: rotate(90deg);
        }

        .yourbana-close-box svg {
          width: 26px;
          height: 26px;
        }

        /* Center Body Numbered List */
        .yourbana-menu-body {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 40px 0;
        }

        .yourbana-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
        }

        .yourbana-nav-item {
          cursor: pointer;
          overflow: hidden;
        }

        .nav-item-mask {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          transform: translateY(110%);
          animation: itemSlideUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) var(--item-delay) forwards;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s ease;
        }

        .yourbana-nav-item:hover .nav-item-mask {
          transform: translateX(20px);
          color: #ffffff;
        }

        .nav-item-index {
          font-family: var(--font-astera);
          font-size: clamp(1.8rem, 4vw, 3.5rem);
          font-weight: 800;
          color: #0d0905;
          line-height: 0.95;
          transition: color 0.25s ease;
        }

        .yourbana-nav-item.nav-item-weaver {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(13, 9, 5, 0.2);
        }

        .nav-active-tag {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #0d0905;
          align-self: center;
          padding: 2px 8px;
          border-bottom: 2px solid #0d0905;
        }

        .nav-item-title {
          font-family: var(--font-astera);
          font-size: clamp(2.4rem, 6vw, 5.2rem);
          font-weight: 800;
          text-transform: uppercase;
          line-height: 0.95;
          letter-spacing: 0.04em;
          color: #0d0905;
          transition: color 0.25s ease;
        }

        .yourbana-nav-item:hover .nav-item-title {
          color: #ffffff;
        }

        @keyframes itemSlideUp {
          to {
            transform: translateY(0);
          }
        }

        /* Footer Metadata */
        .yourbana-menu-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1.5px solid rgba(13, 9, 5, 0.3);
          padding-top: 24px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #0d0905;
        }

        .footer-left-langs {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .lang-active {
          font-weight: 800;
          text-decoration: underline;
        }

        .lang-sep { opacity: 0.5; }

        .footer-center-socials {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .footer-center-socials a,
        .menu-footer-btn {
          background: transparent;
          border: none;
          padding: 0;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          letter-spacing: inherit;
          color: #0d0905;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .footer-center-socials a:hover,
        .menu-footer-btn:hover {
          opacity: 0.65;
        }

        .footer-right-clock {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .clock-globe-icon {
          width: 18px;
          height: 18px;
          animation: spinGlobe 12s linear infinite;
        }

        @keyframes spinGlobe {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .clock-digits {
          font-weight: 800;
        }

        @media (max-width: 850px) {
          .yourbana-menu-curtain {
            padding: 24px;
          }
          .footer-center-socials {
            display: none;
          }
          .nav-item-mask {
            gap: 14px;
          }
        }
      `}</style>
    </div>
  );
}
