import React, { useState } from 'react';
import { VIBE_REALMS } from '../data/synapseData';
import { synth } from '../utils/audio';

export default function VibeRealms({ onSelectNode, allNodes }) {
  const [selectedRealm, setSelectedRealm] = useState(null);

  const handleSelectRealm = (realm) => {
    setSelectedRealm(realm);
    const freqMap = { 'realm-1': 432, 'realm-2': 639, 'realm-3': 528, 'realm-4': 741 };
    synth.startAmbientDrone(freqMap[realm.id] || 432);
  };

  const handleExitRealm = () => {
    setSelectedRealm(null);
    synth.stopAmbientDrone();
  };

  return (
    <section id="section-realms" className="editorial-section">
      <div className="section-container">
        {/* Section Number */}
        <div className="section-meta font-mono">
          <span className="editorial-number">05 — SPATIAL REALMS</span>
        </div>

        <h2 className="display-title">
          SYNCHRONOUS<br />PRESENCE.
        </h2>

        <p className="editorial-body text-muted" style={{ marginTop: '20px', marginBottom: '60px' }}>
          "Enter a field of ideas, not a community."
        </p>

        {/* Art Catalogue Index Rows */}
        <div className="catalogue-index-list">
          {VIBE_REALMS.map((realm, idx) => {
            const realmNum = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={realm.id}
                className="catalogue-row"
                onClick={() => handleSelectRealm(realm)}
              >
                <span className="row-number font-mono">{realmNum}</span>

                <div className="row-main-title font-mono">
                  {realm.name}
                </div>

                <div className="row-presence-badge font-mono">
                  ● {realm.activeCount} PRESENT
                </div>

                <div className="row-arrow-action font-mono">
                  ENTER ENVIRONMENT →
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULL-SCREEN EDITORIAL REALM ENVIRONMENT */}
      {selectedRealm && (
        <div className="realm-fullscreen-overlay fade-in">
          <div className="realm-fullscreen-container">
            {/* Header */}
            <div className="realm-header font-mono">
              <span className="editorial-number">REALM ENVIRONMENT / 0{selectedRealm.id.replace('realm-', '')}</span>
              <button className="btn-close-realm" onClick={handleExitRealm}>
                EXIT REALM [✕]
              </button>
            </div>

            {/* Realm Title */}
            <h1 className="realm-title-huge">{selectedRealm.name}</h1>
            <div className="realm-byline font-mono">
              <span>{selectedRealm.activeCount} ACTIVE THOUGHTS IN THIS REALM</span>
              <span className="byline-sep">/</span>
              <span>{selectedRealm.tone}</span>
            </div>

            <p className="editorial-body realm-desc-quote">"{selectedRealm.description}"</p>

            <hr className="hairline-divider" />

            {/* THOUGHT FRAGMENTS IN ROOM */}
            <div className="realm-fragments-section">
              <span className="editorial-label font-mono">THOUGHT FRAGMENTS IN THIS ROOM /</span>

              <div className="fragments-list">
                {selectedRealm.fragments.map((frag, idx) => (
                  <div
                    key={idx}
                    className="fragment-card"
                    onClick={() => {
                      const matchedNode = allNodes.find((n) => n.title.toLowerCase().includes(frag.title.toLowerCase().substring(0, 15)));
                      if (matchedNode) {
                        handleExitRealm();
                        onSelectNode(matchedNode);
                      }
                    }}
                  >
                    <h3 className="frag-title">"{frag.title}"</h3>
                    <div className="frag-byline font-mono">
                      <span>BY {frag.author.toUpperCase()}</span>
                      <span className="byline-sep">/</span>
                      <span>{frag.resonances} RESONANCES</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="hairline-divider" />

            {/* CURRENTLY RESONATING (Anti-trending section) */}
            <div className="currently-resonating-section">
              <span className="editorial-label font-mono">CURRENTLY RESONATING /</span>
              <p className="resonating-intro font-mono text-muted">
                "Thoughts people are quietly returning to right now."
              </p>

              <div className="resonating-list font-mono">
                {selectedRealm.currentlyResonating.map((item, idx) => (
                  <div key={idx} className="resonating-row">
                    <span className="res-num">0{idx + 1}</span>
                    <span className="res-title">"{item.title}"</span>
                    <span className="res-status">{item.count} RESONANCES ({item.status})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .editorial-section {
          padding: var(--section-padding-y) 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .catalogue-index-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--border-hairline);
        }

        .catalogue-row {
          display: grid;
          grid-template-columns: 60px 1fr 180px 180px;
          align-items: center;
          padding: 32px 0;
          border-bottom: 1px solid var(--border-hairline);
          cursor: pointer;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .catalogue-row:hover {
          transform: translateX(6px);
          background: rgba(255, 255, 255, 0.02);
        }

        .catalogue-row:hover .row-main-title {
          color: #ffffff;
        }

        .catalogue-row:hover .row-arrow-action {
          color: var(--accent-orange);
          transform: translateX(4px);
        }

        .row-number {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 700;
        }

        .row-main-title {
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #cbd5e1;
          transition: color 0.3s ease;
        }

        .row-presence-badge {
          font-size: 0.75rem;
          color: #38bdf8;
          letter-spacing: 0.12em;
        }

        .row-arrow-action {
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #ffffff;
          text-align: right;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        /* Fullscreen Realm Environment */
        .realm-fullscreen-overlay {
          position: fixed;
          inset: 0;
          z-index: 650;
          background: rgba(6, 8, 14, 0.96);
          backdrop-filter: blur(32px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }

        .realm-fullscreen-container {
          width: 100%;
          max-width: 860px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .realm-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          margin-bottom: 24px;
        }

        .btn-close-realm {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          cursor: pointer;
        }

        .btn-close-realm:hover {
          color: #ffffff;
        }

        .realm-title-huge {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 5.5vw, 4.5rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .realm-byline {
          font-size: 0.78rem;
          color: #38bdf8;
          letter-spacing: 0.15em;
          margin-bottom: 24px;
        }

        .realm-desc-quote {
          font-size: 1.15rem;
          color: #cbd5e1;
          font-style: italic;
        }

        .fragments-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 18px;
        }

        .fragment-card {
          padding: 20px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .fragment-card:hover {
          transform: translateX(4px);
        }

        .fragment-card:hover .frag-title {
          color: var(--accent-orange);
        }

        .frag-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 8px;
          transition: color 0.3s ease;
        }

        .frag-byline {
          font-size: 0.72rem;
          color: #94a3b8;
          letter-spacing: 0.12em;
        }

        .resonating-intro {
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          margin-top: 6px;
          margin-bottom: 18px;
        }

        .resonating-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .resonating-row {
          display: grid;
          grid-template-columns: 40px 1fr 240px;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 0.82rem;
        }

        .res-num {
          color: #64748b;
        }

        .res-title {
          color: #ffffff;
          font-weight: 600;
        }

        .res-status {
          color: var(--accent-orange);
          text-align: right;
          letter-spacing: 0.1em;
        }

        @media (max-width: 800px) {
          .catalogue-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .row-arrow-action { text-align: left; }
          .resonating-row { grid-template-columns: 1fr; gap: 6px; }
          .res-status { text-align: left; }
        }
      `}</style>
    </section>
  );
}
