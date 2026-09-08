import React from 'react';

export default function ThoughtPreview({ node, position }) {
  if (!node || !position) return null;

  return (
    <div
      className="thought-preview-editorial fade-in"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      <div className="preview-hairline-line" />
      
      <div className="preview-editorial-content">
        <div className="preview-header font-mono">
          <span className="editorial-number">01 — THOUGHT</span>
          <span className="preview-category">#{node.category.toUpperCase()}</span>
        </div>

        <h4 className="preview-title">{node.title.toUpperCase()}</h4>

        <p className="preview-sentence">"{node.shortSentence || node.summary}"</p>

        <div className="preview-byline font-mono">
          <span className="byline-name">{node.creator.toUpperCase()}</span>
          <span className="byline-sep">/</span>
          <span className="byline-res">{node.resonanceCount} RESONANCES</span>
        </div>

        <div className="preview-explore-hint font-mono">
          <span>EXPLORE THOUGHT →</span>
        </div>
      </div>

      <style>{`
        .thought-preview-editorial {
          position: absolute;
          z-index: 100;
          width: 300px;
          display: flex;
          gap: 12px;
          pointer-events: none;
          transform: translate(-50%, -115%);
        }

        .preview-hairline-line {
          width: 2px;
          background: var(--accent-orange);
          flex-shrink: 0;
        }

        .preview-editorial-content {
          background: rgba(6, 8, 14, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border-hairline);
          padding: 16px;
        }

        .preview-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.68rem;
          margin-bottom: 6px;
        }

        .preview-category {
          color: #94a3b8;
        }

        .preview-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .preview-sentence {
          font-size: 0.82rem;
          color: #cbd5e1;
          line-height: 1.45;
          margin-bottom: 10px;
        }

        .preview-byline {
          font-size: 0.68rem;
          color: #94a3b8;
          display: flex;
          gap: 6px;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }

        .byline-sep {
          color: #64748b;
        }

        .preview-explore-hint {
          font-size: 0.72rem;
          color: var(--accent-orange);
          letter-spacing: 0.14em;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
