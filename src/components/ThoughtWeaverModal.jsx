import React, { useState } from 'react';
import { synth } from '../utils/audio';
import { MOCK_CATEGORIES } from '../data/synapseData';

export default function ThoughtWeaverModal({ isOpen, onClose, onAddNode, existingNodes, parentNode = null }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('mindfulness');
  const [mood, setMood] = useState('REFLECTIVE');
  const [selectedParentId, setSelectedParentId] = useState(parentNode ? parentNode.id : '');

  if (!isOpen) return null;

  const [originMode, setOriginMode] = useState('OPEN_FIELD');
  const [isPlanted, setIsPlanted] = useState(false);

  if (!isOpen) return null;

  const moodsList = ['CURIOUS', 'REFLECTIVE', 'PROVOCATIVE', 'PLAYFUL', 'HOPEFUL'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const catObj = MOCK_CATEGORIES.find((c) => c.id === category) || MOCK_CATEGORIES[0];

    let posX = 450 + (Math.random() - 0.5) * 350;
    let posY = 350 + (Math.random() - 0.5) * 250;

    if (selectedParentId && originMode !== 'OPEN_FIELD') {
      const parentObj = existingNodes.find((n) => n.id === selectedParentId);
      if (parentObj) {
        posX = parentObj.x + (Math.random() - 0.5) * 160;
        posY = parentObj.y + (Math.random() - 0.5) * 160;
      }
    }

    const connLabel = originMode === 'CHALLENGE' ? 'Challenging Counterpoint' : 'Sprouted From';

    const newNode = {
      id: `node-${Date.now()}`,
      title: title.trim(),
      creator: 'YOU',
      author: 'YOU',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      category: category,
      resonanceCount: 1,
      shortSentence: title.trim(),
      content: content.trim(),
      tags: ['thought', mood.toLowerCase(), originMode.toLowerCase()],
      x: Math.max(100, Math.min(900, posX)),
      y: Math.max(100, Math.min(700, posY)),
      radius: 38,
      color: catObj.color || '#38bdf8',
      audioFrequency: 528,
      connections: (selectedParentId && originMode !== 'OPEN_FIELD')
        ? [{ targetId: selectedParentId, type: originMode.toLowerCase(), label: connLabel }]
        : []
    };

    onAddNode(newNode);
    synth.playTone(528, 0.8);
    setIsPlanted(true);
  };

  const handleCloseModal = () => {
    setIsPlanted(false);
    setTitle('');
    setContent('');
    setOriginMode('OPEN_FIELD');
    onClose();
  };

  if (isPlanted) {
    return (
      <div className="writing-room-overlay active" onClick={handleCloseModal}>
        <div className="writing-room-container fade-in text-center-planted" onClick={(e) => e.stopPropagation()}>
          <span className="editorial-number font-mono">PLANTED / 001</span>
          <h1 className="planted-heading display-title">THOUGHT PLANTED.</h1>
          <p className="editorial-body text-muted planted-desc">
            "Your idea now has a connection of its own."
          </p>
          <div className="planted-action font-mono">
            <button className="action-link action-plant-btn" onClick={handleCloseModal}>
              EXPLORE IN MINDSCAPE →
            </button>
          </div>
        </div>
        <style>{`
          .text-center-planted {
            text-align: center;
            padding: 60px 20px;
          }
          .planted-heading {
            font-size: clamp(3rem, 6vw, 5rem);
            margin: 20px 0 16px 0;
            color: #ffffff;
          }
          .planted-desc {
            max-width: 460px;
            margin: 0 auto 40px auto;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="writing-room-overlay active" onClick={handleCloseModal}>
      <div className="writing-room-container fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="room-header font-mono">
          <span className="editorial-number">07 — WRITING ROOM</span>
          <button className="btn-close-room" onClick={handleCloseModal}>
            CLOSE [✕]
          </button>
        </div>

        {/* Large Typography */}
        <h1 className="room-title">
          WEAVE<br />A THOUGHT.
        </h1>
        <p className="room-subtitle font-mono text-muted">"Don't post. Plant a thought. Start something that can become something else."</p>

        <form onSubmit={handleSubmit} className="room-form">
          {/* Origin Selection Question */}
          <div className="origin-choice-container">
            <span className="editorial-label font-mono">WHERE SHOULD THIS THOUGHT BEGIN? /</span>
            <div className="origin-choices font-mono">
              <button
                type="button"
                className={`origin-btn ${originMode === 'OPEN_FIELD' ? 'active' : ''}`}
                onClick={() => setOriginMode('OPEN_FIELD')}
              >
                OPEN FIELD
              </button>
              <button
                type="button"
                className={`origin-btn ${originMode === 'RESPOND' ? 'active' : ''}`}
                onClick={() => setOriginMode('RESPOND')}
              >
                RESPOND TO A THOUGHT
              </button>
              <button
                type="button"
                className={`origin-btn ${originMode === 'CHALLENGE' ? 'active' : ''}`}
                onClick={() => setOriginMode('CHALLENGE')}
              >
                CHALLENGE AN IDEA
              </button>
            </div>
          </div>

          <div className="room-field">
            <input
              type="text"
              required
              placeholder="Thought Title or Core Premise..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="room-input-title"
              autoFocus
            />
          </div>

          <div className="room-field">
            <textarea
              required
              rows={4}
              placeholder="What is worth thinking about?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="room-textarea"
            />
          </div>

          <hr className="hairline-divider" />

          {/* Mood & Connection Selectors */}
          <div className="room-selectors">
            <div className="selector-group">
              <span className="editorial-label font-mono">MOOD /</span>
              <div className="mood-text-list font-mono">
                {moodsList.map((m) => (
                  <button
                    type="button"
                    key={m}
                    className={`mood-text-btn ${mood === m ? 'active' : ''}`}
                    onClick={() => setMood(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Parent Connection Link */}
            {originMode !== 'OPEN_FIELD' && existingNodes.length > 0 && (
              <div className="selector-group">
                <span className="editorial-label font-mono">TARGET THOUGHT /</span>
                <select
                  value={selectedParentId}
                  onChange={(e) => setSelectedParentId(e.target.value)}
                  className="room-select-minimal font-mono"
                >
                  <option value="">-- SELECT NODE --</option>
                  {existingNodes.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.title.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Footer Submit */}
          <div className="room-footer">
            <button type="button" className="action-link" onClick={handleCloseModal}>
              CANCEL
            </button>
            <button type="submit" className="action-link action-plant-btn">
              PLANT THOUGHT →
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .writing-room-overlay {
          position: fixed;
          inset: 0;
          z-index: 700;
          background: rgba(6, 8, 14, 0.94);
          backdrop-filter: blur(32px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }

        .writing-room-container {
          width: 100%;
          max-width: 760px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .room-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          margin-bottom: 24px;
        }

        .btn-close-room {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.15em;
        }

        .btn-close-room:hover {
          color: #ffffff;
        }

        .room-title {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .room-subtitle {
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          margin-bottom: 36px;
        }

        .room-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .origin-choice-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 8px;
        }

        .origin-choices {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .origin-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-hairline);
          color: #94a3b8;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          padding: 8px 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .origin-btn:hover, .origin-btn.active {
          color: #ffffff;
          border-color: var(--accent-orange);
          background: rgba(232, 117, 74, 0.08);
        }

        .room-input-title {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 700;
          padding: 10px 0;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .room-input-title:focus {
          border-bottom-color: var(--accent-orange);
        }

        .room-textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          color: #e2e8f0;
          font-family: var(--font-sans);
          font-size: 1.05rem;
          line-height: 1.7;
          padding: 10px 0;
          outline: none;
          resize: vertical;
          transition: border-color 0.3s ease;
        }

        .room-textarea:focus {
          border-bottom-color: var(--accent-orange);
        }

        .room-selectors {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .selector-group {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .mood-text-list {
          display: flex;
          gap: 16px;
        }

        .mood-text-btn {
          background: transparent;
          border: none;
          color: #64748b;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition: color 0.3s ease;
          padding: 2px 0;
        }

        .mood-text-btn:hover, .mood-text-btn.active {
          color: #ffffff;
        }

        .mood-text-btn.active {
          color: var(--accent-orange);
          border-bottom: 1px solid var(--accent-orange);
        }

        .room-select-minimal {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          padding: 4px 0;
          outline: none;
        }

        .room-select-minimal option {
          background: #090a0f;
          color: #ffffff;
        }

        .room-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 32px;
          margin-top: 24px;
        }

        .action-plant-btn {
          color: var(--accent-orange);
        }

        .action-plant-btn::after {
          background: var(--accent-orange);
        }
      `}</style>
    </div>
  );
}
