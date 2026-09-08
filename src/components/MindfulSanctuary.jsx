import React, { useState, useEffect } from 'react';
import { synth } from '../utils/audio';

export default function MindfulSanctuary() {
  const [breathPhase, setBreathPhase] = useState('INHALE');
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  useEffect(() => {
    if (!isBreathingActive) return;

    const phases = [
      { name: 'INHALE', duration: 4000, tone: 432 },
      { name: 'HOLD', duration: 7000, tone: 528 },
      { name: 'EXHALE', duration: 8000, tone: 396 }
    ];

    let currentIdx = 0;

    const runBreathingCycle = () => {
      const p = phases[currentIdx];
      setBreathPhase(p.name);
      synth.playTone(p.tone, p.duration / 1000);
      currentIdx = (currentIdx + 1) % phases.length;
    };

    runBreathingCycle();
    const interval = setInterval(runBreathingCycle, 6000);

    return () => clearInterval(interval);
  }, [isBreathingActive]);

  const handleLeave = () => {
    setIsSessionComplete(true);
    setIsBreathingActive(false);
  };

  return (
    <section id="section-sanctuary" className="editorial-section sanctuary-quiet-section">
      <div className="section-container text-center">
        {isSessionComplete ? (
          <div className="departure-complete-box fade-in">
            <div className="section-meta font-mono">
              <span className="editorial-number">06 — FULFILLED DEPARTURE</span>
            </div>
            <h2 className="display-title quiet-title">
              SESSION<br />COMPLETE.
            </h2>
            <p className="editorial-body text-muted center-body">
              You've explored enough for now. The mindscape will keep evolving in your absence. Return when you feel like listening.
            </p>
            <div className="departure-actions font-mono">
              <button
                className="action-link"
                onClick={() => {
                  setIsSessionComplete(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                RETURN TO TOP ↑
              </button>
              <button
                className="action-link"
                onClick={() => setIsSessionComplete(false)}
              >
                RE-ENTER MINDSCAPE →
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Section Number */}
            <div className="section-meta font-mono" data-scroll-reveal="fade-up">
              <span className="editorial-number">06 — DIGITAL SANCTUARY & FULFILLED DEPARTURE</span>
            </div>

            {/* Large Statement */}
            <h2 className="display-title quiet-title" data-scroll-reveal="mask-up" data-delay="150ms">
              SOCIAL MEDIA THAT<br />CELEBRATES YOUR LEAVING.
            </h2>

            <p className="editorial-body text-muted center-body" data-scroll-reveal="fade-up" data-delay="300ms">
              Traditional social platforms measure victory by how many hours they trap your attention in endless doom-scrolling loops. VELOURA considers leaving with a quiet, calm, and inspired mind the ultimate mark of human-centered software design.
            </p>

            {/* Minimal Action Link */}
            <div className="breathing-trigger-container font-mono" data-scroll-reveal="scale-up" data-delay="400ms">
              <button
                className={`action-link ${isBreathingActive ? 'active-link' : ''}`}
                onClick={() => setIsBreathingActive(!isBreathingActive)}
              >
                {isBreathingActive ? `${breathPhase} (432HZ ACTIVE) [PAUSE]` : 'ENTER SANCTUARY →'}
              </button>

              <button className="action-link leave-mindscape-btn" onClick={handleLeave}>
                LEAVE THE MINDSCAPE →
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        .sanctuary-quiet-section {
          padding: 180px 40px;
          border-top: 1px solid var(--border-hairline);
        }

        .text-center {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .quiet-title {
          font-size: clamp(3.5rem, 8vw, 7rem);
          margin-top: 16px;
          margin-bottom: 24px;
        }

        .center-body {
          margin: 0 auto 48px auto;
        }

        .breathing-trigger-container {
          margin-top: 16px;
          display: flex;
          align-items: center;
          gap: 36px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .leave-mindscape-btn {
          color: #94a3b8;
        }

        .leave-mindscape-btn:hover {
          color: #ffffff;
        }

        .departure-actions {
          display: flex;
          align-items: center;
          gap: 32px;
          justify-content: center;
          margin-top: 24px;
        }
      `}</style>
    </section>
  );
}
