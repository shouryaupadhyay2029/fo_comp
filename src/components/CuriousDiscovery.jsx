import React from 'react';

export default function CuriousDiscovery({ isOpen, onClose, allNodes = [], node: propNode, onSelectNode }) {
  if (!isOpen) return null;

  const node = propNode || (allNodes.length > 0 ? allNodes[Math.floor(Math.random() * allNodes.length)] : null);
  if (!node) return null;

  return (
    <div className="writing-room-overlay active" onClick={onClose}>
      <div className="curious-discovery-container fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="curious-header font-mono">
          <span className="editorial-number">INTELLECTUAL SERENDIPITY</span>
          <button className="btn-close-curious" onClick={onClose}>
            CLOSE [✕]
          </button>
        </div>

        <h1 className="curious-title">OUTSIDE<br />YOUR ORBIT.</h1>
        <p className="curious-subtitle font-mono text-muted">
          "You may not have looked for this. VELOURA doesn't recommend what keeps you here. It introduces what might change your mind."
        </p>

        <hr className="hairline-divider" />

        <div className="curious-node-card">
          <div className="curious-category font-mono text-muted">
            #{node.category.toUpperCase()} / {node.audioFrequency}HZ
          </div>

          <h2 className="curious-node-title">"{node.title.toUpperCase()}"</h2>

          <p className="curious-node-content">"{node.shortSentence || node.content}"</p>

          <div className="curious-byline font-mono">
            <span>BY {node.creator.toUpperCase()}</span>
            <span className="byline-sep">/</span>
            <span>{node.resonanceCount} RESONANCES</span>
          </div>

          <div className="curious-action-box font-mono">
            <button
              className="action-link"
              onClick={() => {
                onClose();
                onSelectNode(node);
              }}
            >
              EXPLORE THIS THOUGHT →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .curious-discovery-container {
          width: 100%;
          max-width: 720px;
          background: rgba(6, 8, 14, 0.94);
          backdrop-filter: blur(28px);
          padding: 40px;
          border: 1px solid var(--border-hairline);
        }

        .curious-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          margin-bottom: 20px;
        }

        .btn-close-curious {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.15em;
        }

        .curious-title {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #ffffff;
          line-height: 0.95;
          margin-bottom: 8px;
        }

        .curious-subtitle {
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          margin-bottom: 24px;
        }

        .curious-node-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .curious-category {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
        }

        .curious-node-title {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.25;
        }

        .curious-node-content {
          font-size: 1.05rem;
          color: #cbd5e1;
          line-height: 1.6;
          font-style: italic;
        }

        .curious-byline {
          display: flex;
          gap: 12px;
          font-size: 0.75rem;
          color: #94a3b8;
          letter-spacing: 0.12em;
        }

        .curious-action-box {
          margin-top: 16px;
        }
      `}</style>
    </div>
  );
}
