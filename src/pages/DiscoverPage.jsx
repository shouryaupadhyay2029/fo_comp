/**
 * @fileoverview Finite Editorial Discovery Magazine Page.
 * @module DiscoverPage
 * @description Displays finite curated thought perspectives with hover spotlight preview, serendipitous discovery trigger, and magazine index layout.
 * @author Frontend Odyssey Team
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { MOCK_NODES, MOCK_CATEGORIES } from '../data/synapseData';
import { synth } from '../utils/audio';

/**
 * Discover Page Component.
 *
 * @component
 * @param {Object} props Component properties.
 * @param {Function} [props.onSelectNode] Callback triggered when selecting a thought to exchange perspective.
 * @param {Array} [props.allNodes=[]] Synapse thought node data array.
 * @returns {JSX.Element} The rendered editorial discover page view.
 */
function DiscoverPage({ onSelectNode, allNodes }) {
  // Pool of curated finite thoughts (5-8 thoughts)
  const [thoughts] = useState(() => {
    const sourceList = (allNodes && allNodes.length > 0) ? allNodes : MOCK_NODES;
    return sourceList.slice(0, 7);
  });

  const [curiousThought, setCuriousThought] = useState(null);
  const [isCuriousActive, setIsCuriousActive] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleCuriousClick = () => {
    synth.playHover();
    const sourceList = (allNodes && allNodes.length > 0) ? allNodes : MOCK_NODES;
    const currentRealm = thoughts[0]?.category || 'mindfulness';
    const differentRealmThoughts = sourceList.filter(t => t.category !== currentRealm);
    const selected = differentRealmThoughts.length > 0
      ? differentRealmThoughts[Math.floor(Math.random() * differentRealmThoughts.length)]
      : sourceList[Math.floor(Math.random() * sourceList.length)];

    setCuriousThought(selected);
    setIsCuriousActive(true);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const getItemImage = (idx) => {
    const images = [
      '/carousel/discover_1.png',
      '/carousel/discover_2.png',
      '/carousel/discover_hero.png',
      '/carousel/hero1.png',
      '/carousel/hero2.png',
      '/carousel/hero3.png',
      '/carousel/hero4.png'
    ];
    return images[idx % images.length];
  };

  const activeThoughtList = isCuriousActive && curiousThought
    ? [curiousThought, ...thoughts.filter(t => t.id !== curiousThought.id).slice(0, 5)]
    : thoughts;

  return (
    <div className="discover-page-container fade-in">
      <div className="discover-content-inner">
        
        {/* OPENING HEADER SPLIT */}
        <header className="discover-header">
          <div className="discover-header-left">
            <div className="discover-meta-tag font-mono" data-scroll-reveal="track-in" data-delay="50ms">
              <span className="page-num">01 / DISCOVER</span>
            </div>

            <h1 className="discover-editorial-title font-sans">
              FIND SOMETHING<br />
              WORTH THINKING ABOUT.
            </h1>

            <p className="discover-description font-mono text-muted" data-scroll-reveal="skew-up" data-delay="250ms">
              "Not everything needs to compete for your attention."
            </p>

            <div className="discover-header-actions-row">
              <div className="discover-finite-indicator font-mono" data-scroll-reveal="scale-up" data-delay="320ms">
                <span className="indicator-dot">●</span>
                <span>06 THOUGHTS / 04 REALMS</span>
              </div>

              <button 
                className="btn-curious font-mono"
                data-scroll-reveal="rotate-in"
                data-delay="380ms"
                onClick={handleCuriousClick}
              >
                I'M CURIOUS →
              </button>
            </div>
          </div>

          {/* RIGHT SIDE CLASSY EDITORIAL IMAGE CARD */}
          <div className="discover-header-right" data-scroll-reveal="slide-left" data-delay="200ms">
            <div className="discover-editorial-card">
              <div className="card-image-wrapper">
                <img 
                  src="/carousel/discover_hero.png" 
                  alt="Veloura Editorial Mindscape Architecture" 
                  className="discover-hero-img" 
                />
                <div className="card-badge font-mono" data-scroll-reveal="slide-right" data-delay="300ms">
                  <span>VELOURA / ARCHIVE</span>
                  <span className="badge-star">✦</span>
                  <span>SPRING '26</span>
                </div>
              </div>
              <div className="card-caption font-mono" data-scroll-reveal="blur-reveal" data-delay="400ms">
                <span className="caption-num">FIG 01.1 —</span>
                <span className="caption-text">ARCHITECTURAL HARMONY & QUALITATIVE RESONANCE</span>
              </div>
            </div>
          </div>
        </header>

        {/* OUTSIDE YOUR ORBIT BANNER WHEN CURIOUS CLICKED */}
        {isCuriousActive && curiousThought && (
          <div className="orbit-notice-box font-mono" data-scroll-reveal="skew-up" data-delay="100ms">
            <span className="orbit-label" data-scroll-reveal="track-in">OUTSIDE YOUR ORBIT</span>
            <p className="orbit-quote" data-scroll-reveal="blur-reveal">"You may not have looked for this."</p>
          </div>
        )}

        {/* DISCOVERY EXPERIENCE: EDITORIAL FRAGMENTS LIST */}
        <div className="discover-fragments-sequence">
          {activeThoughtList.map((thought, index) => {
            const num = String(index + 1).padStart(2, '0');
            const isHovered = hoveredId === thought.id;
            const isDimmed = hoveredId !== null && !isHovered;
            const categoryLabel = MOCK_CATEGORIES.find(c => c.id === thought.category)?.label || thought.category || 'DIGITAL CULTURE';
            const staggerDelay = `${(index % 4) * 80 + 100}ms`;
            const itemImage = getItemImage(index);

            // Dynamic unique animation mode selection per text element
            const metaAnimModes = ['slide-right', 'track-in', 'rotate-in', 'blur-reveal'];
            const titleAnimModes = ['mask-up', 'skew-up', 'slide-left', 'fade-up'];
            const authorAnimModes = ['blur-reveal', 'slide-left', 'track-in', 'skew-up'];
            const actionAnimModes = ['rotate-in', 'scale-up', 'mask-up', 'slide-right'];
            const visualAnimModes = ['scale-up', 'rotate-in', 'blur-reveal', 'skew-up'];

            const metaAnim = metaAnimModes[index % metaAnimModes.length];
            const titleAnim = titleAnimModes[index % titleAnimModes.length];
            const authorAnim = authorAnimModes[index % authorAnimModes.length];
            const actionAnim = actionAnimModes[index % actionAnimModes.length];
            const visualAnim = visualAnimModes[index % visualAnimModes.length];

            return (
              <article
                key={thought.id}
                className={`discover-fragment-item ${isHovered ? 'hovered' : ''} ${isDimmed ? 'dimmed' : ''}`}
                data-scroll-reveal="fade-up"
                data-delay={staggerDelay}
                onMouseEnter={() => {
                  setHoveredId(thought.id);
                  synth.playHover();
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectNode && onSelectNode(thought)}
              >
                <div className="fragment-row-layout">
                  {/* Left Side: Editorial Typography & Meta */}
                  <div className="fragment-text-content">
                    <div className="fragment-top-meta font-mono" data-scroll-reveal={metaAnim} data-delay="50ms">
                      <span className="frag-num">{num}</span>
                      <span className="frag-category">{categoryLabel.toUpperCase()}</span>
                      {(thought.creator === 'YOU' || thought.author === 'YOU') && (
                        <span className="newly-planted-badge">NEWLY PLANTED</span>
                      )}
                    </div>

                    <h2 className="fragment-quote font-sans" data-scroll-reveal={titleAnim} data-delay="120ms">
                      "{thought.title.toUpperCase()}"
                    </h2>

                    <div className="fragment-author font-mono text-muted" data-scroll-reveal={authorAnim} data-delay="180ms">
                      BY {(thought.author || 'MAYA CHEN').toUpperCase()}
                    </div>

                    <div className="fragment-action-arrow font-mono" data-scroll-reveal={actionAnim} data-delay="220ms">
                      <span>EXPLORE</span>
                      <span className="arrow-char">→</span>
                    </div>
                  </div>

                  {/* CENTER / RIGHT INLINE CLASSY MASKED VISUAL */}
                  <div className="fragment-center-inline-visual" data-scroll-reveal={visualAnim} data-delay="150ms">
                    <div className="inline-mask-frame">
                      <img src={itemImage} alt={thought.title} className="inline-visual-img" />
                      <div className="inline-visual-badge font-mono">FIG 01.{index + 1}</div>
                    </div>
                  </div>
                </div>

                {/* FLOATING CURSOR MASK PORTAL FOLLOWING MOUSE */}
                {isHovered && (
                  <div 
                    className="cursor-mask-floating-portal"
                    style={{
                      left: `${cursorPos.x}px`,
                      top: `${cursorPos.y}px`
                    }}
                  >
                    <div className="cursor-portal-inner">
                      <img src={itemImage} alt={thought.title} className="portal-img" />
                      <div className="portal-ring-glow" />
                    </div>
                  </div>
                )}

                <div className="fragment-hairline" />
              </article>
            );
          })}
        </div>

        {/* FINITE EXPERIENCE END STATE */}
        <div className="discover-finite-footer" data-scroll-reveal="fade-up">
          <h3 className="finite-title font-sans" data-scroll-reveal="mask-up" data-delay="100ms">
            THAT'S ENOUGH<br />
            FOR NOW.
          </h3>
          <p className="finite-subquote font-mono text-muted" data-scroll-reveal="blur-reveal" data-delay="200ms">
            "Leave with something worth thinking about."
          </p>
          <a
            href="/"
            className="btn-return-home font-mono"
            data-scroll-reveal="rotate-in"
            data-delay="300ms"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
          >
            RETURN HOME →
          </a>
        </div>

      </div>

      <style>{`
        .discover-page-container {
          width: 100%;
          min-height: 100vh;
          padding: 160px 48px 120px 48px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .discover-page-container::before {
          content: '';
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 120%;
          height: 800px;
          background: radial-gradient(ellipse at center, rgba(244, 185, 195, 0.28) 0%, rgba(250, 215, 222, 0.12) 45%, transparent 75%);
          pointer-events: none;
          z-index: -1;
          filter: blur(40px);
        }

        .discover-content-inner {
          display: flex;
          flex-direction: column;
        }

        .discover-header {
          display: grid;
          grid-template-columns: 1.25fr 0.95fr;
          gap: 48px;
          align-items: center;
          margin-bottom: 72px;
        }

        .discover-header-left {
          display: flex;
          flex-direction: column;
        }

        .discover-header-actions-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 12px;
        }

        .discover-header-right {
          display: flex;
          justify-content: flex-end;
        }

        .discover-editorial-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.45);
          border: 1px solid rgba(201, 74, 110, 0.22);
          border-radius: 8px;
          padding: 14px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 20px 48px rgba(201, 74, 110, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.4s ease;
        }

        .discover-editorial-card:hover {
          transform: translateY(-6px) scale(1.015);
          border-color: rgba(201, 74, 110, 0.45);
          box-shadow: 0 28px 60px rgba(201, 74, 110, 0.2), 0 4px 14px rgba(0, 0, 0, 0.06);
        }

        .card-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          border-radius: 6px;
        }

        .discover-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: contrast(1.05) brightness(0.98);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .discover-editorial-card:hover .discover-hero-img {
          transform: scale(1.06);
        }

        .card-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(18, 17, 16, 0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #fbf0ee;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        }

        .badge-star {
          color: #c94a6e;
          font-size: 0.75rem;
        }

        .card-caption {
          margin-top: 12px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--color-text-dim);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .caption-num {
          color: #c94a6e;
        }

        .discover-meta-tag {
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          color: #c94a6e;
          margin-bottom: 24px;
          font-weight: 700;
        }

        .discover-editorial-title {
          font-size: clamp(2.8rem, 6.5vw, 6.2rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #121110;
          margin-bottom: 24px;
          text-transform: uppercase;
          animation: heroTitleReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes heroTitleReveal {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .discover-description {
          font-size: 1.05rem;
          color: var(--color-text-muted);
          margin-bottom: 28px;
          font-style: italic;
        }

        .discover-finite-indicator {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          color: #121110;
          padding: 6px 16px;
          border: 1px solid rgba(201, 74, 110, 0.25);
          background: rgba(252, 230, 235, 0.4);
          border-radius: 999px;
        }

        .indicator-dot {
          color: #c94a6e;
          font-size: 0.6rem;
        }

        .discover-curious-bar {
          margin-bottom: 0;
        }

        .btn-curious {
          background: rgba(252, 230, 235, 0.5);
          border: 1px solid #c94a6e;
          color: #121110;
          padding: 12px 26px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .btn-curious:hover {
          background: #c94a6e;
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(201, 74, 110, 0.25);
        }

        .orbit-notice-box {
          background: rgba(243, 185, 195, 0.18);
          border-left: 3px solid #c94a6e;
          padding: 18px 24px;
          margin-bottom: 48px;
          border-radius: 0 4px 4px 0;
        }

        .orbit-label {
          font-size: 0.75rem;
          font-weight: 800;
          color: #c94a6e;
          letter-spacing: 0.15em;
          display: block;
          margin-bottom: 4px;
        }

        .orbit-quote {
          font-size: 0.92rem;
          color: #121110;
          font-style: italic;
        }

        .discover-fragments-sequence {
          display: flex;
          flex-direction: column;
          gap: 64px;
          margin-bottom: 120px;
        }

        .discover-fragment-item {
          position: relative;
          padding-bottom: 48px;
          cursor: pointer;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .discover-fragment-item.dimmed {
          opacity: 0.35;
        }

        .discover-fragment-item.hovered {
          opacity: 1;
        }

        .fragment-top-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-text-dim);
          letter-spacing: 0.12em;
          margin-bottom: 16px;
          transition: opacity 0.3s ease;
        }

        .newly-planted-badge {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--accent-orange);
          border: 1px solid var(--accent-orange);
          padding: 2px 8px;
          border-radius: 2px;
        }

        .fragment-quote {
          font-size: clamp(1.8rem, 3.8vw, 3.2rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #121110;
          margin-bottom: 16px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
        }

        .discover-fragment-item.hovered .fragment-quote {
          transform: translateX(4px);
          color: #121110;
        }

        .fragment-author {
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          margin-bottom: 24px;
        }

        .fragment-action-arrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #121110;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .discover-fragment-item.hovered .fragment-action-arrow {
          transform: translateX(6px);
          color: var(--accent-orange);
        }

        .fragment-hairline {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--border-hairline);
          transition: background 0.3s ease;
        }

        .discover-fragment-item.hovered .fragment-hairline {
          background: rgba(18, 17, 16, 0.6);
        }

        .discover-finite-footer {
          border-top: 1px solid var(--border-hairline);
          padding-top: 80px;
          margin-top: 40px;
        }

        .finite-title {
          font-size: clamp(2.2rem, 4.5vw, 4.2rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #121110;
          margin-bottom: 16px;
          text-transform: uppercase;
        }

        .finite-subquote {
          font-size: 0.95rem;
          margin-bottom: 32px;
          font-style: italic;
        }

        .btn-return-home {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: var(--accent-orange);
          text-decoration: none;
          padding: 10px 0;
          border-bottom: 2px solid var(--accent-orange);
          transition: opacity 0.3s ease;
        }

        .btn-return-home:hover {
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .discover-page-container {
            padding: 120px 24px 80px 24px;
          }

          .fragment-row-layout {
            grid-template-columns: 1fr;
          }

          .fragment-center-inline-visual {
            justify-content: flex-start;
            margin-top: 16px;
          }

          .cursor-mask-floating-portal {
            display: none;
          }
        }

        /* FRAGMENT ROW LAYOUT WITH CENTER VISUAL */
        .fragment-row-layout {
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 32px;
          align-items: center;
          position: relative;
        }

        .fragment-text-content {
          display: flex;
          flex-direction: column;
        }

        .fragment-center-inline-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .inline-mask-frame {
          position: relative;
          width: 200px;
          height: 125px;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(201, 74, 110, 0.22);
          box-shadow: 0 12px 32px rgba(201, 74, 110, 0.1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.4s ease;
        }

        .discover-fragment-item:hover .inline-mask-frame {
          transform: scale(1.05);
          border-color: rgba(201, 74, 110, 0.5);
          box-shadow: 0 16px 44px rgba(201, 74, 110, 0.22);
        }

        .inline-visual-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: contrast(1.05) saturate(0.95);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .discover-fragment-item:hover .inline-visual-img {
          transform: scale(1.12);
        }

        .inline-visual-badge {
          position: absolute;
          bottom: 6px;
          right: 8px;
          background: rgba(18, 17, 16, 0.85);
          backdrop-filter: blur(4px);
          color: #fbf0ee;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        /* CURSOR FLOATING MASK PORTAL */
        .cursor-mask-floating-portal {
          position: absolute;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 30;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 12px 36px rgba(18, 17, 16, 0.38), 0 0 0 2px rgba(255, 255, 255, 0.85), 0 0 24px rgba(201, 74, 110, 0.45);
          animation: portalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes portalPop {
          from {
            transform: translate(-50%, -50%) scale(0.6);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        .cursor-portal-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .portal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.3);
          filter: contrast(1.12) brightness(0.92);
        }

        .portal-ring-glow {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at center, transparent 35%, rgba(18, 17, 16, 0.55) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .portal-ring-glow::after {
          content: 'OPEN';
          font-family: monospace;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #6ee7b7;
          text-shadow: 0 0 8px rgba(110, 231, 183, 0.9);
          background: rgba(18, 17, 16, 0.88);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(110, 231, 183, 0.35);
        }
      `}</style>
    </div>
  );
}

DiscoverPage.propTypes = {
  onSelectNode: PropTypes.func,
  allNodes: PropTypes.array
};

export default memo(DiscoverPage);

