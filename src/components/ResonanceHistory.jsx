import React from 'react';

export default function ResonanceHistory({ isOpen, onClose, userResonances, onSelectNode }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="resonance-journal-container fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="journal-header font-mono">
          <span className="editorial-number">YOUR RESONANCE</span>
          <button className="btn-close-journal" onClick={onClose}>
            CLOSE [✕]
          </button>
        </div>

        <h1 className="journal-title">
          INTELLECTUAL<br />JOURNAL.
        </h1>
        <p className="journal-subtitle font-mono text-muted">
          "An archive of ideas that stayed with you."
        </p>

        <hr className="hairline-divider" />

        {userResonances.length === 0 ? (
          <div className="journal-empty font-mono">
            <p>"You have not resonated with any thoughts yet. Explore the Mindscape to anchor ideas in your journal."</p>
          </div>
        ) : (
          <div className="journal-list font-mono">
            {userResonances.map((node, idx) => {
              const numStr = String(idx + 1).padStart(2, '0');
              return (
                <div key={node.id} className="journal-row" onClick={() => { onClose(); onSelectNode(node); }}>
                  <span className="journal-num">{numStr}</span>
                  <div className="journal-node-info">
                    <h4 className="journal-node-title">"{node.title.toUpperCase()}"</h4>
                    <span className="journal-node-creator text-muted">BY {node.creator.toUpperCase()}</span>
                  </div>
                  <span className="action-link journal-nav-arrow">OPEN →</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .resonance-journal-container {
          width: 100%;
          max-width: 760px;
          max-height: 90vh;
          overflow-y: auto;
          background: rgba(6, 8, 14, 0.94);
          backdrop-filter: blur(28px);
          padding: 40px;
          border: 1px solid var(--border-hairline);
        }

        .journal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          margin-bottom: 24px;
        }

        .btn-close-journal {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.15em;
        }

        .btn-close-journal:hover {
          color: #ffffff;
        }

        .journal-title {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .journal-subtitle {
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          margin-bottom: 32px;
        }

        .journal-empty {
          padding: 40px 0;
          color: #94a3b8;
          font-style: italic;
          font-size: 0.95rem;
          text-align: center;
        }

        .journal-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--border-hairline);
        }

        .journal-row {
          display: grid;
          grid-template-columns: 50px 1fr 100px;
          align-items: center;
          padding: 24px 0;
          border-bottom: 1px solid var(--border-hairline);
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .journal-row:hover {
          transform: translateX(4px);
        }

        .journal-row:hover .journal-node-title {
          color: var(--accent-orange);
        }

        .journal-num {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 700;
        }

        .journal-node-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .journal-node-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
          transition: color 0.3s ease;
        }

        .journal-node-creator {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
        }

        .journal-nav-arrow {
          font-size: 0.75rem;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
