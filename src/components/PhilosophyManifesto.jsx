/**
 * @fileoverview Philosophy & Design Ethos Manifesto Component.
 * @module PhilosophyManifesto
 * @description Renders core tenets (Agency Over Algorithm, Resonance Over Metrics, Presence Over Performance) with interactive Solfeggio sound triggers.
 * @author Frontend Odyssey Team
 */

import React, { memo } from 'react';
import { synth } from '../utils/audio';

/**
 * Philosophy Manifesto Component.
 *
 * @component
 * @returns {JSX.Element} The rendered manifesto section.
 */
function PhilosophyManifesto() {
  return (
    <section id="section-philosophy" className="philosophy-manifesto-section">
      <div className="section-container">
        <div className="section-meta font-mono" data-scroll-reveal="fade-up">
          <span className="editorial-number">02 — THE SOCIAL ARCHITECTURE MANIFESTO</span>
        </div>

        <div className="manifesto-vertical-list">
          {/* 01: AGENCY OVER ALGORITHM */}
          <div className="manifesto-block" data-scroll-reveal="fade-up">
            <span className="manifesto-num font-mono" data-scroll-reveal="slide-right" data-delay="100ms">01</span>

            <div className="manifesto-content">
              <h2 className="display-title manifesto-title" data-scroll-reveal="fade-up" data-delay="150ms">
                AGENCY<br />OVER<br />ALGORITHM
              </h2>
              <p className="editorial-body manifesto-desc" data-scroll-reveal="fade-up" data-delay="250ms">
                "Social interaction should never be dictated by an engagement loop. In VELOURA, you navigate spatial thought maps where your curiosity determines your path—not a hidden machine learning model engineered for dopamine retention."
              </p>
              <p className="manifesto-impl-line font-mono text-muted" data-scroll-reveal="fade-up" data-delay="350ms">
                "Discovery belongs to human intent, not engagement predictions."
              </p>
            </div>

            {/* RIGHT SIDE PURE BORDERLESS VIDEO */}
            <div
              className="manifesto-pure-video-container"
              data-scroll-reveal="fade-up"
              data-delay="250ms"
              onMouseEnter={() => synth.playTone(432, 1.2)}
            >
              <img
                src="/src/assets/hero.png"
                alt="Agency Over Algorithm Minimalist Graphic"
                className="manifesto-clean-video"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <hr className="hairline-divider" data-scroll-reveal="fade-up" data-delay="100ms" />

          {/* 02: RESONANCE OVER METRICS */}
          <div className="manifesto-block" data-scroll-reveal="fade-up">
            <span className="manifesto-num font-mono" data-scroll-reveal="slide-right" data-delay="100ms">02</span>

            <div className="manifesto-content">
              <h2 className="display-title manifesto-title" data-scroll-reveal="fade-up" data-delay="150ms">
                RESONANCE<br />OVER<br />METRICS
              </h2>
              <p className="editorial-body manifesto-desc" data-scroll-reveal="fade-up" data-delay="250ms">
                "Human thought is too nuanced to be reduced to follower counts, public like buttons, or viral clout. We replace vanity metrics with qualitative acoustic frequencies that measure depth of perspective rather than popularity."
              </p>
              <p className="manifesto-impl-line font-mono text-muted" data-scroll-reveal="fade-up" data-delay="350ms">
                "Connection is felt through shared resonance, never quantified by public scores."
              </p>
            </div>

            {/* RIGHT SIDE PURE BORDERLESS VIDEO */}
            <div
              className="manifesto-pure-video-container"
              data-scroll-reveal="fade-up"
              data-delay="250ms"
              onMouseEnter={() => synth.playTone(528, 1.2)}
            >
              <img
                src="/src/assets/hero.png"
                alt="Resonance Over Metrics Minimalist Graphic"
                className="manifesto-clean-video"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <hr className="hairline-divider" data-scroll-reveal="fade-up" data-delay="100ms" />

          {/* 03: PRESENCE OVER PERFORMANCE */}
          <div className="manifesto-block" data-scroll-reveal="fade-up">
            <span className="manifesto-num font-mono" data-scroll-reveal="slide-right" data-delay="100ms">03</span>

            <div className="manifesto-content">
              <h2 className="display-title manifesto-title" data-scroll-reveal="fade-up" data-delay="150ms">
                PRESENCE<br />OVER<br />PERFORMANCE
              </h2>
              <p className="editorial-body manifesto-desc" data-scroll-reveal="fade-up" data-delay="250ms">
                "Social software shouldn't demand continuous content broadcasting or status performance. VELOURA creates quiet spatial sanctuaries for synchronous co-presence—where quiet exploration and reflection are enough."
              </p>
              <p className="manifesto-impl-line font-mono text-muted" data-scroll-reveal="fade-up" data-delay="350ms">
                "A social network where leaving with a peaceful mind is considered a success."
              </p>
            </div>

            {/* RIGHT SIDE PURE BORDERLESS VIDEO */}
            <div
              className="manifesto-pure-video-container"
              data-scroll-reveal="fade-up"
              data-delay="250ms"
              onMouseEnter={() => synth.playTone(639, 1.2)}
            >
              <img
                src="/src/assets/hero.png"
                alt="Presence Over Performance Minimalist Graphic"
                className="manifesto-clean-video"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

PhilosophyManifesto.propTypes = {};

export default memo(PhilosophyManifesto);
