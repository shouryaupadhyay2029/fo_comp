import React, { useState } from 'react';
import { MOCK_NODES } from '../data/synapseData';
import { synth } from '../utils/audio';

const REALMS_DATA = [
  {
    id: 'digital-culture',
    num: '01',
    name: 'DIGITAL CULTURE',
    desc: 'How technology changes the way we live together.',
    activeCount: 47,
    themeAtmosphere: 'rgba(2, 132, 199, 0.05)',
    longDesc: 'Questions about how technology shapes the way we relate to one another.',
    thoughts: [
      { id: 'dc-1', title: 'CAN DIGITAL SPACES CREATE REAL INTIMACY?', resonances: 23, author: 'MAYA CHEN' },
      { id: 'dc-2', title: 'DOES THE INTERNET NEED TO BE FAST?', resonances: 17, author: 'ALEX RIVERA' },
      { id: 'dc-3', title: 'WHAT HAPPENS WHEN TECHNOLOGY BECOMES INVISIBLE?', resonances: 14, author: 'ARJUN MEHTA' }
    ]
  },
  {
    id: 'futures',
    num: '02',
    name: 'FUTURES',
    desc: 'Ideas about what comes next.',
    activeCount: 38,
    themeAtmosphere: 'rgba(124, 58, 237, 0.05)',
    longDesc: 'Speculations and systemic models on post-digital human existence.',
    thoughts: [
      { id: 'f-1', title: 'POST-METROPOLITAN DIGITAL NOMADS', resonances: 29, author: 'ELENA ROSTOVA' },
      { id: 'f-2', title: 'WHEN AI BECOMES CULTURALLY INVISIBLE', resonances: 21, author: 'KAI TANAKA' }
    ]
  },
  {
    id: 'generative-art',
    num: '03',
    name: 'GENERATIVE ART',
    desc: 'Where machines become collaborators.',
    activeCount: 52,
    themeAtmosphere: 'rgba(217, 78, 0, 0.06)',
    longDesc: 'Exploring dynamic systems, algorithmic aesthetic resonance, and synthetic empathy.',
    thoughts: [
      { id: 'ga-1', title: 'GENERATIVE SYMBIOSIS & ARTISTIC AUTONOMY', resonances: 34, author: 'SORA SATO' },
      { id: 'ga-2', title: 'SYNTHETIC EMPATHY & RELATIONAL DEPTH', resonances: 27, author: 'MAYA CHEN' }
    ]
  },
  {
    id: 'philosophy',
    num: '04',
    name: 'PHILOSOPHY',
    desc: "Questions that don't need immediate answers.",
    activeCount: 61,
    themeAtmosphere: 'rgba(26, 25, 23, 0.04)',
    longDesc: 'Quiet inquiry into memory, silence, and presence.',
    thoughts: [
      { id: 'ph-1', title: 'CAN SILENCE BECOME A FORM OF COMMUNICATION?', resonances: 41, author: 'DAVID VANE' },
      { id: 'ph-2', title: 'THE DEATH OF INFINITE SCROLL', resonances: 38, author: 'ALEX RIVERA' }
    ]
  },
  {
    id: 'human-attention',
    num: '05',
    name: 'HUMAN ATTENTION',
    desc: 'Exploring presence in an always-on world.',
    activeCount: 44,
    themeAtmosphere: 'rgba(5, 150, 105, 0.05)',
    longDesc: 'Restoring depth and mindfulness in fragmented cognitive spaces.',
    thoughts: [
      { id: 'ha-1', title: 'DESIGNING FOR SLOWER INTERNET', resonances: 26, author: 'LINDA ZHANG' },
      { id: 'ha-2', title: 'ACOUSTIC PRESENCE & SOUNDSCAPES', resonances: 19, author: 'MARCUS VANCE' }
    ]
  },
  {
    id: 'creative-practice',
    num: '06',
    name: 'CREATIVE PRACTICE',
    desc: 'Ideas born through making.',
    activeCount: 31,
    themeAtmosphere: 'rgba(217, 119, 6, 0.05)',
    longDesc: 'Rituals, tools, and craftsmanship of modern quiet creation.',
    thoughts: [
      { id: 'cp-1', title: 'CRAFTING TACTILE DIGITAL OBJECTS', resonances: 18, author: 'NINA PATEL' },
      { id: 'cp-2', title: 'INTENTIONAL SLOW CODE', resonances: 15, author: 'TAYLOR REED' }
    ]
  }
];

export default function RealmsPage({ onNavigateExchange }) {
  const [selectedRealm, setSelectedRealm] = useState(null);
  const [hoveredRealmId, setHoveredRealmId] = useState(null);
  const [crossBorderThought, setCrossBorderThought] = useState(null);

  const handleRealmClick = (realm) => {
    synth.playHover();
    setSelectedRealm(realm);
  };

  const handleThoughtClick = (thought) => {
    synth.playHover();
    const mappedThought = {
      id: thought.id,
      title: thought.title,
      author: thought.author || 'CONTRIBUTOR',
      category: selectedRealm ? selectedRealm.name : 'REALMS'
    };
    if (onNavigateExchange) {
      onNavigateExchange(mappedThought);
    }
  };

  const handleCrossBorder = () => {
    synth.playHover();
    // Pick a thought from a different realm
    const currentId = selectedRealm ? selectedRealm.id : '';
    const otherRealms = REALMS_DATA.filter(r => r.id !== currentId);
    const randomRealm = otherRealms[Math.floor(Math.random() * otherRealms.length)];
    const randomThought = randomRealm.thoughts[Math.floor(Math.random() * randomRealm.thoughts.length)];

    setCrossBorderThought({ thought: randomThought, realm: randomRealm });
  };

  return (
    <div className="realms-page-container fade-in">
      <div className="realms-content-inner">

        {/* OPENING HEADER */}
        <header className="realms-header">
          <div className="realms-meta-tag font-mono">
            <span className="page-num">03 / REALMS</span>
          </div>

          <h1 className="realms-editorial-title font-sans">
            ENTER A WORLD<br />
            OF SHARED CURIOSITY.
          </h1>

          <p className="realms-description font-mono text-muted">
            "Some questions become more interesting when explored together."
          </p>
        </header>

        {/* CROSS-REALM DISCOVERY ACTION */}
        <div className="realms-cross-bar font-mono">
          <button className="btn-cross-border" onClick={handleCrossBorder}>
            CROSS THE BORDER →
          </button>
        </div>

        {/* CROSS BORDER DISCOVERY NOTIFICATION */}
        {crossBorderThought && (
          <div className="orbit-notice-box font-mono fade-in">
            <span className="orbit-label">FROM ANOTHER REALM / {crossBorderThought.realm.name}</span>
            <p className="orbit-quote">"You don't usually explore this."</p>
            <div 
              className="cross-thought-card"
              onClick={() => handleThoughtClick(crossBorderThought.thought)}
            >
              <h4 className="cross-title font-sans">"{crossBorderThought.thought.title}"</h4>
              <span className="cross-link">ENTER THOUGHT EXCHANGE →</span>
            </div>
          </div>
        )}

        {/* REALM INDEX LISTING OR INSIDE REALM VIEW */}
        {!selectedRealm ? (
          <section className="realms-index-section">
            <div className="index-label font-mono">
              <span>REALMS INDEX /</span>
            </div>

            <div className="realms-editorial-list">
              {REALMS_DATA.map((realm) => {
                const isHovered = hoveredRealmId === realm.id;

                return (
                  <div
                    key={realm.id}
                    className={`realm-index-row ${isHovered ? 'hovered' : ''}`}
                    style={isHovered ? { background: realm.themeAtmosphere } : {}}
                    onMouseEnter={() => {
                      setHoveredRealmId(realm.id);
                      synth.playHover();
                    }}
                    onMouseLeave={() => setHoveredRealmId(null)}
                    onClick={() => handleRealmClick(realm)}
                  >
                    <span className="realm-num font-mono">{realm.num}</span>

                    <div className="realm-info-block">
                      <h2 className="realm-name font-sans">{realm.name}</h2>
                      <p className="realm-desc font-mono text-muted">{realm.desc}</p>
                    </div>

                    <div className="realm-arrow-action font-mono">
                      <span>{realm.activeCount} THOUGHTS</span>
                      <span className="arrow">→</span>
                    </div>

                    <div className="realm-hairline" />
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          /* INSIDE REALM DETAIL VIEW */
          <section className="realm-inside-view fade-in">
            <button className="btn-back-realms font-mono" onClick={() => setSelectedRealm(null)}>
              ← BACK TO REALMS INDEX
            </button>

            <div className="realm-inside-header">
              <span className="inside-tag font-mono">{selectedRealm.num} / {selectedRealm.name}</span>
              <h1 className="inside-title font-sans">{selectedRealm.name}</h1>
              <div className="inside-count font-mono">{selectedRealm.activeCount} ACTIVE THOUGHTS</div>
              <p className="inside-desc font-mono text-muted">"{selectedRealm.longDesc}"</p>
            </div>

            {/* REALM THOUGHT FRAGMENTS */}
            <div className="realm-thoughts-list">
              <span className="list-label font-mono">THOUGHT FRAGMENTS IN THIS REALM /</span>

              {selectedRealm.thoughts.map((item) => (
                <div
                  key={item.id}
                  className="realm-thought-item"
                  onClick={() => handleThoughtClick(item)}
                >
                  <h2 className="item-title font-sans">"{item.title}"</h2>
                  <div className="item-meta font-mono text-muted">
                    <span>{item.resonances} RESONANCES</span>
                    <span>/</span>
                    <span>BY {item.author.toUpperCase()}</span>
                    <span className="enter-link">ENTER EXCHANGE →</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CURRENTLY RESONATING SECTION */}
            <div className="realm-resonating-section">
              <span className="resonating-label font-mono">
                03 THOUGHTS CURRENTLY RESONATING /
              </span>

              <div className="resonating-list font-mono">
                {selectedRealm.thoughts.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="resonating-row" onClick={() => handleThoughtClick(item)}>
                    <span className="res-num">0{idx + 1}</span>
                    <span className="res-title font-sans">"{item.title}"</span>
                    <span className="res-arrow">→</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>

      <style>{`
        .realms-page-container {
          width: 100%;
          min-height: 100vh;
          padding: 160px 48px 120px 48px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .realms-content-inner {
          display: flex;
          flex-direction: column;
        }

        .realms-header {
          margin-bottom: 60px;
        }

        .realms-meta-tag {
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          color: var(--accent-orange);
          margin-bottom: 24px;
          font-weight: 700;
        }

        .realms-editorial-title {
          font-size: clamp(2.8rem, 6.5vw, 6.2rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #121110;
          margin-bottom: 24px;
          text-transform: uppercase;
        }

        .realms-description {
          font-size: 1.05rem;
          color: var(--color-text-muted);
          font-style: italic;
        }

        .realms-cross-bar {
          margin-bottom: 48px;
        }

        .btn-cross-border {
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

        .btn-cross-border:hover {
          background: #121110;
          color: #ffffff;
        }

        .orbit-notice-box {
          background: rgba(217, 78, 0, 0.08);
          border-left: 3px solid var(--accent-orange);
          padding: 24px;
          margin-bottom: 48px;
        }

        .orbit-label {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--accent-orange);
          letter-spacing: 0.15em;
          display: block;
          margin-bottom: 4px;
        }

        .orbit-quote {
          font-size: 0.92rem;
          color: #121110;
          font-style: italic;
          margin-bottom: 16px;
        }

        .cross-thought-card {
          padding: 16px;
          background: #ffffff;
          border: 1px solid var(--border-hairline);
          cursor: pointer;
        }

        .cross-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #121110;
          margin-bottom: 8px;
        }

        .cross-link {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--accent-orange);
          letter-spacing: 0.12em;
        }

        .index-label {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--accent-orange);
          margin-bottom: 32px;
        }

        .realms-editorial-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--border-hairline);
        }

        .realm-index-row {
          position: relative;
          display: grid;
          grid-template-columns: 60px 1fr 180px;
          align-items: center;
          padding: 36px 16px;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .realm-index-row.hovered {
          background: rgba(217, 78, 0, 0.04);
          transform: translateX(8px);
        }

        .realm-num {
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--accent-orange);
        }

        .realm-name {
          font-size: clamp(1.6rem, 3.2vw, 2.5rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #121110;
          margin-bottom: 6px;
        }

        .realm-desc {
          font-size: 0.88rem;
        }

        .realm-arrow-action {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #121110;
        }

        .realm-index-row.hovered .realm-arrow-action {
          color: var(--accent-orange);
        }

        .realm-hairline {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--border-hairline);
        }

        .btn-back-realms {
          background: transparent;
          border: none;
          color: var(--accent-orange);
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          cursor: pointer;
          margin-bottom: 40px;
        }

        .realm-inside-header {
          border-bottom: 1px solid var(--border-hairline);
          padding-bottom: 40px;
          margin-bottom: 48px;
        }

        .inside-tag {
          font-size: 0.8rem;
          color: var(--accent-orange);
          font-weight: 800;
          letter-spacing: 0.14em;
          display: block;
          margin-bottom: 12px;
        }

        .inside-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: #121110;
          margin-bottom: 16px;
        }

        .inside-count {
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: var(--color-text-dim);
          margin-bottom: 16px;
        }

        .inside-desc {
          font-size: 1.05rem;
          font-style: italic;
        }

        .realm-thoughts-list {
          margin-bottom: 80px;
        }

        .list-label {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--accent-orange);
          letter-spacing: 0.15em;
          display: block;
          margin-bottom: 32px;
        }

        .realm-thought-item {
          border-bottom: 1px solid var(--border-hairline);
          padding: 28px 0;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .realm-thought-item:hover {
          transform: translateX(8px);
        }

        .item-title {
          font-size: clamp(1.6rem, 3vw, 2.5rem);
          font-weight: 800;
          line-height: 1.1;
          color: #121110;
          margin-bottom: 12px;
        }

        .realm-thought-item:hover .item-title {
          color: var(--accent-orange);
        }

        .item-meta {
          display: flex;
          gap: 16px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .enter-link {
          color: var(--accent-orange);
          margin-left: auto;
        }

        .realm-resonating-section {
          border-top: 1px solid var(--border-hairline);
          padding-top: 48px;
        }

        .resonating-label {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--accent-orange);
          letter-spacing: 0.14em;
          display: block;
          margin-bottom: 24px;
        }

        .resonating-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .resonating-row {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 16px 20px;
          border: 1px solid var(--border-hairline);
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .resonating-row:hover {
          background: rgba(217, 78, 0, 0.04);
        }

        .res-num {
          font-size: 0.85rem;
          color: var(--accent-orange);
          font-weight: 800;
        }

        .res-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #121110;
        }

        .res-arrow {
          margin-left: auto;
          color: var(--accent-orange);
          font-weight: 800;
        }

        @media (max-width: 768px) {
          .realms-page-container {
            padding: 120px 24px 80px 24px;
          }
          .realm-index-row {
            grid-template-columns: 40px 1fr;
            gap: 12px;
          }
          .realm-arrow-action {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
