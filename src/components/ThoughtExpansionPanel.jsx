import React, { useState } from 'react';
import { synth } from '../utils/audio';

export default function ThoughtExpansionPanel({ node, allNodes, onClose, onSelectNode, onExpandNode, onToggleResonate, isResonatedInJournal }) {
  const [resonanceCount, setResonanceCount] = useState(node ? node.resonanceCount : 0);
  const [isResonated, setIsResonated] = useState(isResonatedInJournal);
  const [isChallenged, setIsChallenged] = useState(false);
  const [challengeText, setChallengeText] = useState('');
  const [showChallengeInput, setShowChallengeInput] = useState(false);
  const [showHistoryNote, setShowHistoryNote] = useState(false);

  if (!node) return null;

  const handleResonate = () => {
    if (!isResonated) {
      setResonanceCount((prev) => prev + 1);
      setIsResonated(true);
      setShowHistoryNote(true);
      synth.playTone(node.audioFrequency || 432, 0.6);
      if (onToggleResonate) onToggleResonate(node, true);
    } else {
      setResonanceCount((prev) => prev - 1);
      setIsResonated(false);
      setShowHistoryNote(false);
      if (onToggleResonate) onToggleResonate(node, false);
    }
  };

  const handleSubmitChallenge = (e) => {
    e.preventDefault();
    if (!challengeText.trim()) return;
    setIsChallenged(true);
    synth.playTone(396, 0.4);
    setShowChallengeInput(false);
  };

  const connectedNodes = node.connections
    ? node.connections
        .map((conn) => {
          const targetObj = allNodes.find((n) => n.id === conn.targetId);
          return targetObj ? { ...targetObj, relLabel: conn.label } : null;
        })
        .filter(Boolean)
    : [];

  const perspectivesList = node.perspectives || [
    { author: node.creator, text: 'The core premise remains open for collective expansion.' }
  ];

  return (
    <div className="thought-gallery-overlay" onClick={onClose}>
      <div className="thought-gallery-container fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="btn-close-gallery font-mono" onClick={onClose}>
          CLOSE [✕]
        </button>

        {/* Editorial Top Number & Category */}
        <div className="gallery-meta font-mono">
          <span className="editorial-number">THOUGHT / 0{node.id.replace('node-', '')}</span>
          <span className="gallery-category font-mono">#{node.category.toUpperCase()}</span>
        </div>

        {/* Display Title Statement */}
        <h1 className="gallery-title">"{node.title.toUpperCase()}"</h1>

        {/* Creator & Resonance Byline */}
        <div className="gallery-byline font-mono">
          <span className="creator-byline">BY {node.creator.toUpperCase()}</span>
          <span className="byline-sep font-mono">/</span>
          <span className="resonance-byline">{resonanceCount} RESONANCES</span>
        </div>

        <hr className="hairline-divider" />

        {/* The Thought Paragraph */}
        <div className="thought-section-block">
          <span className="editorial-label font-mono">THE THOUGHT /</span>
          <p className="gallery-content">{node.content}</p>
        </div>

        {/* THE AHA MOMENT — Vertical Progression (No Metric Cards) */}
        <div className="vertical-metric-progression font-mono">
          <span className="editorial-label">EVOLUTION PATH /</span>
          <div className="progression-column">
            <div className="metric-step-block">
              <span className="metric-big-num">{resonanceCount}</span>
              <span className="metric-unit-label">RESONANCES</span>
            </div>
            <span className="progression-arrow">↓</span>
            <div className="metric-step-block">
              <span className="metric-big-num">{node.perspectivesCount || perspectivesList.length}</span>
              <span className="metric-unit-label">PERSPECTIVES</span>
            </div>
            <span className="progression-arrow">↓</span>
            <div className="metric-step-block">
              <span className="metric-big-num">{node.evolutionCount || '07'}</span>
              <span className="metric-unit-label">EVOLUTIONS</span>
            </div>
          </div>
          <p className="aha-summary-quote font-mono text-muted">
            "One thought. Seven directions it could have taken."
          </p>
        </div>

        <hr className="hairline-divider" />

        {/* PERSPECTIVES (Sequential Editorial Dialogue) */}
        <div className="perspectives-sequence-section">
          <span className="editorial-label font-mono">PERSPECTIVES /</span>
          <p className="perspectives-intro font-mono text-muted">"How do you see this differently?"</p>

          <div className="perspectives-dialogue">
            {perspectivesList.map((p, idx) => (
              <div key={idx} className="perspective-item">
                <span className="perspective-author font-mono">{p.author.toUpperCase()}</span>
                <p className="perspective-text">"{p.text}"</p>
                {idx < perspectivesList.length - 1 && <span className="perspective-arrow font-mono">↓</span>}
              </div>
            ))}
          </div>
        </div>

        <hr className="hairline-divider" />

        {/* RESONANCE CIRCLES */}
        <div className="resonance-circle-meta font-mono">
          <span className="editorial-label">RESONANCE CIRCLE /</span>
          <p className="circle-alignment-note">
            "{resonanceCount} people resonated → {node.perspectivesCount || 18} continued the conversation → {node.evolutionCount || 7} expanded the idea. We happened to care about the same thing."
          </p>
        </div>

        {/* Interconnected Ideas */}
        {connectedNodes.length > 0 && (
          <div className="gallery-connected-section">
            <span className="editorial-label font-mono">CONCEPTUAL LINKS /</span>
            <div className="connected-links-list">
              {connectedNodes.map((conn) => (
                <div key={conn.id} className="conn-link-item" onClick={() => onSelectNode(conn)}>
                  <span className="conn-title-text">{conn.title.toUpperCase()}</span>
                  <span className="action-link text-arrow">NAVIGATE →</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <hr className="hairline-divider" />

        {/* Typographic Actions */}
        <div className="gallery-actions-bar">
          <button
            className={`action-link ${isResonated ? 'active-link' : ''}`}
            onClick={handleResonate}
          >
            {isResonated ? 'RESONATED ✓' : 'RESONATE +'}
          </button>

          <button
            className={`action-link ${isChallenged ? 'active-link' : ''}`}
            onClick={() => setShowChallengeInput(!showChallengeInput)}
          >
            OFFER PERSPECTIVE ↗
          </button>

          <button className="action-link action-expand-link" onClick={() => onExpandNode(node)}>
            EXPAND THOUGHT →
          </button>
        </div>

        {/* Quiet Resonance History Note */}
        {showHistoryNote && (
          <p className="history-added-note font-mono fade-in">
            Your resonance has joined this thought.
          </p>
        )}

        {/* Challenge / Perspective form */}
        {showChallengeInput && (
          <form onSubmit={handleSubmitChallenge} className="in-place-perspective-form fade-in">
            <div className="form-header-line font-mono">
              <span className="editorial-label">OFFER ANOTHER PERSPECTIVE /</span>
              <p className="form-sub-prompt text-muted font-mono">"What do you see differently?"</p>
            </div>
            <input
              type="text"
              required
              placeholder="Write your perspective..."
              value={challengeText}
              onChange={(e) => setChallengeText(e.target.value)}
              className="borderless-writing-input"
              autoFocus
            />
            <div className="form-actions-row font-mono">
              <button type="submit" className="action-link">
                SUBMIT PERSPECTIVE ↗
              </button>
            </div>
          </form>
        )}

        {isChallenged && (
          <div className="user-submitted-perspective font-mono fade-in">
            <span className="editorial-label">YOUR PERSPECTIVE /</span>
            <p className="perspective-text">"{challengeText}"</p>
            <span className="connected-tag text-muted">CONNECTED TO THOUGHT / {node.id.toUpperCase()}</span>
          </div>
        )}
      </div>

      <style>{`
        .thought-gallery-overlay {
          position: fixed;
          inset: 0;
          z-index: 600;
          background: rgba(6, 8, 14, 0.94);
          backdrop-filter: blur(28px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }

        .thought-gallery-container {
          width: 100%;
          max-width: 820px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .btn-close-gallery {
          position: absolute;
          top: 0;
          right: 0;
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .btn-close-gallery:hover {
          color: #ffffff;
        }

        .gallery-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 0.75rem;
          margin-bottom: 16px;
        }

        .gallery-category {
          color: var(--accent-orange);
          letter-spacing: 0.15em;
        }

        .gallery-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .gallery-byline {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.75rem;
          color: #cbd5e1;
          letter-spacing: 0.12em;
        }

        .byline-sep {
          color: #64748b;
        }

        .thought-section-block {
          margin-bottom: 24px;
        }

        .gallery-content {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #e2e8f0;
          font-weight: 400;
          margin-top: 12px;
        }

        .thought-journey-timeline {
          margin-top: 28px;
          margin-bottom: 24px;
        }

        .timeline-flow {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 14px;
          font-size: 0.78rem;
        }

        .timeline-step {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .step-tag {
          color: var(--accent-orange);
          letter-spacing: 0.15em;
          width: 120px;
          flex-shrink: 0;
        }

        .step-text {
          color: #cbd5e1;
        }

        .timeline-arrow {
          color: #64748b;
          margin-left: 50px;
        }

        .perspectives-sequence-section {
          margin-bottom: 28px;
        }

        .perspectives-intro {
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          margin-top: 6px;
          margin-bottom: 18px;
        }

        .perspectives-dialogue {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .perspective-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .perspective-author {
          font-size: 0.72rem;
          color: var(--accent-cyan);
          letter-spacing: 0.15em;
        }

        .perspective-text {
          font-size: 1.02rem;
          color: #f8fafc;
          font-style: italic;
          line-height: 1.6;
        }

        .perspective-arrow {
          color: #64748b;
          font-size: 0.8rem;
          margin-top: 4px;
        }

        .resonance-circle-meta {
          margin-bottom: 24px;
        }

        .circle-alignment-note {
          font-size: 0.78rem;
          color: #cbd5e1;
          margin-top: 8px;
          letter-spacing: 0.08em;
          line-height: 1.6;
        }

        .gallery-connected-section {
          margin-bottom: 24px;
        }

        .connected-links-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 16px;
        }

        .conn-link-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
        }

        .conn-link-item:hover .conn-title-text {
          color: var(--accent-orange);
        }

        .conn-title-text {
          font-size: 0.95rem;
          color: #ffffff;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .text-arrow {
          font-size: 0.72rem;
        }

        .gallery-actions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .active-link {
          color: var(--accent-orange) !important;
        }

        .active-link::after {
          background: var(--accent-orange) !important;
        }

        .history-added-note {
          font-size: 0.75rem;
          color: var(--accent-orange);
          margin-top: 16px;
          letter-spacing: 0.1em;
        }

        .vertical-metric-progression {
          margin: 28px 0;
        }

        .progression-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 16px;
          margin-bottom: 16px;
        }

        .metric-step-block {
          display: flex;
          align-items: baseline;
          gap: 16px;
        }

        .metric-big-num {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
        }

        .metric-unit-label {
          font-size: 0.8rem;
          color: var(--accent-orange);
          letter-spacing: 0.16em;
          font-weight: 700;
        }

        .progression-arrow {
          color: #64748b;
          font-size: 0.9rem;
          margin-left: 12px;
        }

        .aha-summary-quote {
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          margin-top: 8px;
          font-style: italic;
        }

        .in-place-perspective-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid var(--border-hairline);
        }

        .form-header-line {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .form-sub-prompt {
          font-size: 0.8rem;
          letter-spacing: 0.1em;
        }

        .borderless-writing-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          font-family: var(--font-sans);
          font-size: 1.05rem;
          padding: 10px 0;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .borderless-writing-input:focus {
          border-bottom-color: var(--accent-orange);
        }

        .form-actions-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
        }

        .user-submitted-perspective {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .connected-tag {
          font-size: 0.7rem;
          letter-spacing: 0.14em;
        }
      `}</style>
    </div>
  );
}
