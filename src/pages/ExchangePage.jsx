/**
 * @fileoverview Deep Perspective Exchange Page Component.
 * @module ExchangePage
 * @description Renders qualitative thought perspectives, audio frequency resonance triggers, and perspective weaving form with LocalStorage persistence.
 * @author Frontend Odyssey Team
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { MOCK_NODES } from '../data/synapseData';
import { synth } from '../utils/audio';

/**
 * Exchange Page Component.
 *
 * @component
 * @param {Object} props Component properties.
 * @param {Object} [props.initialThought] Active featured thought node object.
 * @param {Array} [props.allNodes=[]] All available thought nodes.
 * @returns {JSX.Element} The rendered exchange perspective view.
 */
function ExchangePage({ initialThought, allNodes }) {
  // Featured Thought State
  const featured = initialThought || (allNodes && allNodes.length > 0 ? allNodes[0] : MOCK_NODES[0]);
  const storageKey = `aetheria_resonate_${featured.id}`;

  // Social State with LocalStorage Persistence
  const [hasResonated, setHasResonated] = useState(() => {
    return localStorage.getItem(storageKey) === 'true';
  });
  const [resonanceCount, setResonanceCount] = useState(() => {
    const base = 142;
    return localStorage.getItem(storageKey) === 'true' ? base + 1 : base;
  });

  // Interaction Panels
  const [activeMode, setActiveMode] = useState(null); // null | 'perspective' | 'expand'
  const [perspectiveInput, setPerspectiveInput] = useState('');
  const [expandInput, setExpandInput] = useState('');

  // Persisted Session Data
  const [perspectives, setPerspectives] = useState(() => {
    const saved = localStorage.getItem(`aetheria_persp_${featured.id}`);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore parsing errors */ }
    }
    return [
      { text: "Attention isn't necessarily the enemy. Unconscious attention is.", author: "ALEX" },
      { text: "Maybe the problem isn't the feed. It's that the feed never ends.", author: "MAYA" },
      { text: "Perhaps social spaces need intentional stopping points.", author: "ELENA" }
    ];
  });

  const [evolutions, setEvolutions] = useState(() => {
    const saved = localStorage.getItem(`aetheria_evol_${featured.id}`);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore parsing errors */ }
    }
    return [{ title: "SILENT PROTOCOLS", author: "LEO VAUGHN" }];
  });

  // Handlers
  const handleResonate = () => {
    if (!hasResonated) {
      setResonanceCount(prev => prev + 1);
      setHasResonated(true);
      localStorage.setItem(storageKey, 'true');
      synth.playHover();
    }
  };

  const handleConnectPerspective = (e) => {
    e.preventDefault();
    if (!perspectiveInput.trim()) return;
    const newPersp = { text: perspectiveInput.trim(), author: "YOU" };
    const updated = [newPersp, ...perspectives];
    setPerspectives(updated);
    localStorage.setItem(`aetheria_persp_${featured.id}`, JSON.stringify(updated));
    setPerspectiveInput('');
    setActiveMode(null);
    synth.playHover();
  };

  const handlePlantThought = (e) => {
    e.preventDefault();
    if (!expandInput.trim()) return;
    const newEvol = { title: expandInput.trim().toUpperCase(), author: "YOU" };
    const updated = [newEvol, ...evolutions];
    setEvolutions(updated);
    localStorage.setItem(`aetheria_evol_${featured.id}`, JSON.stringify(updated));
    setExpandInput('');
    setActiveMode(null);
    synth.playHover();
  };

  return (
    <div className="exchange-page-container fade-in">
      <div className="exchange-content-inner">

        {/* OPENING HEADER */}
        <header className="exchange-header">
          <div className="exchange-meta-tag font-mono">
            <span className="page-num">02 / EXCHANGE</span>
          </div>

          <h1 className="exchange-editorial-title font-sans">
            A THOUGHT<br />
            IS ONLY<br />
            THE BEGINNING.
          </h1>

          <p className="exchange-description font-mono text-muted">
            "Give an idea another direction."
          </p>
        </header>

        {/* FEATURED THOUGHT CARD */}
        <section className="featured-thought-block">
          <div className="featured-meta font-mono">
            <span>FEATURED THOUGHT</span>
            <span>/</span>
            <span>BY {(featured.author || 'MAYA CHEN').toUpperCase()}</span>
          </div>

          <h2 className="featured-thought-title font-sans">
            "{featured.title.toUpperCase()}"
          </h2>

          {/* EDITORIAL METRICS LIST (No cards) */}
          <div className="editorial-metrics-column font-mono">
            <div className="metric-row">
              <span className="metric-count">{resonanceCount}</span>
              <span className="metric-label">RESONANCES</span>
            </div>
            <div className="metric-row">
              <span className="metric-count">{perspectives.length + 15}</span>
              <span className="metric-label">PERSPECTIVES</span>
            </div>
            <div className="metric-row">
              <span className="metric-count">{evolutions.length + 6}</span>
              <span className="metric-label">EVOLUTIONS</span>
            </div>
          </div>

          {/* THREE PRIMARY SOCIAL ACTIONS */}
          <div className="social-actions-bar font-mono">
            <button
              className={`action-btn ${hasResonated ? 'active' : ''}`}
              onClick={handleResonate}
            >
              {hasResonated ? 'RESONATED ✓' : 'RESONATE +'}
            </button>

            <button
              className={`action-btn ${activeMode === 'perspective' ? 'active' : ''}`}
              onClick={() => setActiveMode(activeMode === 'perspective' ? null : 'perspective')}
            >
              OFFER PERSPECTIVE ↗
            </button>

            <button
              className={`action-btn ${activeMode === 'expand' ? 'active' : ''}`}
              onClick={() => setActiveMode(activeMode === 'expand' ? null : 'expand')}
            >
              EXPAND THOUGHT →
            </button>
          </div>

          {/* RESONATE SUBTLE FEEDBACK */}
          {hasResonated && (
            <div className="resonate-feedback-note font-mono fade-in">
              "Your resonance has joined this thought."
            </div>
          )}
        </section>

        {/* OFFER PERSPECTIVE EDITORIAL WRITING SPACE */}
        {activeMode === 'perspective' && (
          <section className="perspective-writing-space fade-in">
            <h3 className="space-title font-sans">OFFER A PERSPECTIVE</h3>
            <p className="space-subtext font-mono text-muted">
              "Disagreement doesn't end the conversation. It gives the thought another direction."
            </p>

            <form onSubmit={handleConnectPerspective} className="perspective-form">
              <textarea
                className="perspective-input font-mono"
                placeholder="What do you see differently?"
                rows={4}
                value={perspectiveInput}
                onChange={(e) => setPerspectiveInput(e.target.value)}
                required
              />
              <button type="submit" className="btn-submit-action font-mono">
                CONNECT PERSPECTIVE →
              </button>
            </form>
          </section>
        )}

        {/* EXPAND THOUGHT WRITING SPACE */}
        {activeMode === 'expand' && (
          <section className="perspective-writing-space fade-in">
            <h3 className="space-title font-sans">GROW THIS THOUGHT</h3>
            <p className="space-subtext font-mono text-muted">
              "What does this idea make you think about?"
            </p>

            <form onSubmit={handlePlantThought} className="perspective-form">
              <textarea
                className="perspective-input font-mono"
                placeholder="Write an evolutionary spin-off thought..."
                rows={3}
                value={expandInput}
                onChange={(e) => setExpandInput(e.target.value)}
                required
              />
              <button type="submit" className="btn-submit-action font-mono">
                PLANT THOUGHT →
              </button>
            </form>
          </section>
        )}

        {/* EDITORIAL PERSPECTIVE SEQUENCE */}
        <section className="perspectives-sequence-section">
          <div className="sequence-label font-mono">
            <span>PERSPECTIVES /</span>
          </div>

          <div className="editorial-perspectives-list">
            {perspectives.map((item, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const textStr = typeof item === 'string' ? item : item.text;
              const authorStr = typeof item === 'string' ? (idx === 0 ? 'ALEX' : idx === 1 ? 'MAYA' : 'ELENA') : (item.author || 'YOU');

              return (
                <div key={idx} className="editorial-perspective-row">
                  <span className="persp-num font-mono">{num}</span>
                  <p className="persp-quote font-sans">"{textStr}"</p>
                  <div className="persp-author-bar font-mono">
                    <span className="author-name">— {authorStr}</span>
                    <span className="persp-arrow">↓</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* THOUGHT EVOLUTION VISUAL SEQUENCE */}
        <section className="evolution-flow-section">
          <h3 className="evolution-title font-sans">
            ONE THOUGHT.<br />
            MANY DIRECTIONS.
          </h3>

          <div className="evolution-diagram-sequence font-mono">
            <div className="flow-step">
              <span className="step-tag">ORIGIN</span>
              <span className="step-name">"{featured.title.toUpperCase()}"</span>
            </div>
            <span className="flow-arrow">↓</span>
            <div className="flow-step">
              <span className="step-tag">RESONANCE</span>
              <span className="step-name">{resonanceCount} SILENT THINKERS</span>
            </div>
            <span className="flow-arrow">↓</span>
            <div className="flow-step">
              <span className="step-tag">PERSPECTIVE</span>
              <span className="step-name">{perspectives.length} DIRECTIONS OFFERED</span>
            </div>
            <span className="flow-arrow">↓</span>
            <div className="flow-step">
              <span className="step-tag">EVOLUTION</span>
              <span className="step-name">{evolutions.length} SPIN-OFF THOUGHTS</span>
            </div>
          </div>

          <div className="discover-another-bar font-mono" style={{ marginTop: '48px' }}>
            <button
              className="btn-discover-another"
              onClick={() => {
                synth.playHover();
                window.history.pushState(null, '', '/discover');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
            >
              DISCOVER ANOTHER →
            </button>
          </div>
        </section>

      </div>

      <style>{`
        .exchange-page-container {
          width: 100%;
          min-height: 100vh;
          padding: 160px 48px 120px 48px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .exchange-content-inner {
          display: flex;
          flex-direction: column;
        }

        .exchange-header {
          margin-bottom: 60px;
        }

        .exchange-meta-tag {
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          color: var(--accent-orange);
          margin-bottom: 24px;
          font-weight: 700;
        }

        .exchange-editorial-title {
          font-size: clamp(2.8rem, 6.5vw, 6.2rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #121110;
          margin-bottom: 24px;
          text-transform: uppercase;
        }

        .exchange-description {
          font-size: 1.05rem;
          color: var(--color-text-muted);
          font-style: italic;
        }

        .featured-thought-block {
          border-top: 1px solid var(--border-hairline);
          border-bottom: 1px solid var(--border-hairline);
          padding: 48px 0;
          margin-bottom: 64px;
        }

        .featured-meta {
          display: flex;
          gap: 12px;
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          color: var(--accent-orange);
          font-weight: 700;
          margin-bottom: 24px;
        }

        .featured-thought-title {
          font-size: clamp(2rem, 4.5vw, 3.8rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #121110;
          margin-bottom: 40px;
        }

        .editorial-metrics-column {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 48px;
        }

        .metric-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .metric-count {
          font-size: 1.1rem;
          font-weight: 800;
          color: #121110;
          min-width: 40px;
        }

        .metric-label {
          font-size: 0.8rem;
          letter-spacing: 0.14em;
          color: var(--color-text-dim);
        }

        .social-actions-bar {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .action-btn {
          background: transparent;
          border: 1px solid #121110;
          color: #121110;
          padding: 12px 24px;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn:hover, .action-btn.active {
          background: #121110;
          color: #ffffff;
        }

        .resonate-feedback-note {
          margin-top: 20px;
          font-size: 0.82rem;
          color: var(--accent-orange);
          font-style: italic;
        }

        .perspective-writing-space {
          background: rgba(26, 25, 23, 0.03);
          border: 1px solid var(--border-hairline);
          padding: 36px;
          margin-bottom: 64px;
        }

        .space-title {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #121110;
          margin-bottom: 8px;
        }

        .space-subtext {
          font-size: 0.85rem;
          margin-bottom: 24px;
          font-style: italic;
        }

        .perspective-input {
          width: 100%;
          background: #ffffff;
          border: 1px solid var(--border-hairline);
          padding: 16px;
          font-size: 0.9rem;
          color: #121110;
          margin-bottom: 20px;
          resize: vertical;
        }

        .perspective-input:focus {
          outline: none;
          border-color: var(--accent-orange);
        }

        .btn-submit-action {
          background: var(--accent-orange);
          border: none;
          color: #ffffff;
          padding: 12px 28px;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .btn-submit-action:hover {
          opacity: 0.85;
        }

        .perspectives-sequence-section {
          margin-bottom: 96px;
        }

        .sequence-label {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--accent-orange);
          margin-bottom: 32px;
        }

        .editorial-perspectives-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .editorial-perspective-row {
          border-bottom: 1px solid var(--border-hairline);
          padding-bottom: 32px;
        }

        .persp-num {
          font-size: 0.85rem;
          color: var(--accent-orange);
          font-weight: 700;
          display: block;
          margin-bottom: 8px;
        }

        .persp-quote {
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 1.25;
          color: #121110;
          margin-bottom: 12px;
        }

        .persp-footer {
          font-size: 0.75rem;
          letter-spacing: 0.12em;
        }

        .evolution-flow-section {
          border-top: 1px solid var(--border-hairline);
          padding-top: 64px;
        }

        .evolution-title {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #121110;
          margin-bottom: 48px;
        }

        .evolution-diagram-sequence {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 500px;
        }

        .flow-step {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 14px 20px;
          border: 1px solid var(--border-hairline);
        }

        .step-tag {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--accent-orange);
          min-width: 100px;
        }

        .step-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #121110;
        }

        .flow-arrow {
          font-size: 1rem;
          color: var(--color-text-dim);
          padding-left: 24px;
        }

        .btn-discover-another {
          background: transparent;
          border: 1px solid #121110;
          color: #121110;
          padding: 12px 24px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-discover-another:hover {
          background: #121110;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .exchange-page-container {
            padding: 120px 24px 80px 24px;
          }
        }
      `}</style>
    </div>
  );
}

ExchangePage.propTypes = {
  initialThought: PropTypes.object,
  allNodes: PropTypes.array
};

export default memo(ExchangePage);

