/**
 * @fileoverview Architectural Hero Section Component for Frontend Odyssey.
 * @module HeroSection
 * @description Features asymmetric typography layout, GSAP entrance timeline, interactive orbiting 2D wheel carousel, and infinite ticker marquee.
 * @author Frontend Odyssey Team
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import HeroCarousel from './HeroCarousel';

/**
 * Editorial Hero Section Component.
 *
 * @component
 * @param {Object} props Component properties.
 * @param {Function} [props.onEnterMindscape] Function callback to scroll down to spatial constellation section.
 * @param {Function} [props.onSelectCard] Function callback when a carousel card is clicked.
 * @returns {JSX.Element} The rendered hero section layout.
 */
function HeroSection({ onEnterMindscape, onSelectCard }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.hero-top-label',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    )
      .fromTo(
        '.asymmetric-title-wrapper .hero-display-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.18 },
        '-=0.4'
      )
      .fromTo(
        '.hero-supporting-right',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        '.hero-interaction-left',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      );
  }, []);

  return (
    <section id="section-hero" className="asymmetric-hero-section">
      <div className="hero-main-split">
        {/* Left Column: Tightly Stacked Headline & Description */}
        <div className="hero-left-column">
          <div className="hero-top-label font-mono">
            <span className="editorial-number">VELOURA / 001</span>
          </div>

          <div className="asymmetric-title-wrapper">
            <h1 className="hero-display-title line-left">SOCIAL</h1>
            <h1 className="hero-display-title line-left">SHOULD FEEL</h1>
            <h1 className="hero-display-title line-left">MORE HUMAN.</h1>
          </div>

          <div className="hero-text-block">
            <p className="editorial-body">
              A slower social space for ideas, perspectives and meaningful connection.
            </p>
            <p className="hero-micro-desc font-mono text-muted">
              "VELOURA is a social space where thoughts evolve through resonance, perspective and connection."
            </p>
          </div>

          <div className="hero-action-row font-mono">
            <button className="action-link hero-enter-link" onClick={onEnterMindscape}>
              ENTER THE MINDSCAPE ↓
            </button>
            <span className="scroll-indicator font-mono">
              SCROLL TO EXPLORE <span className="arrow-down">↓</span>
            </span>
          </div>
        </div>

        {/* Right Column: 2D Top-View Rotating Wheel */}
        <div className="hero-right-column">
          <HeroCarousel onSelectCard={onSelectCard} />
        </div>
      </div>

      {/* HERO BOTTOM INFINITE MARQUEE TICKER */}
      <div className="hero-bottom-marquee-banner">
        <div className="marquee-floating-badge font-mono">
          <span className="badge-dot-live"></span>
          <span>14,200+ THOUGHTS WEAVED IN RESONANCE</span>
        </div>

        <div className="hero-marquee-track">
          <div className="marquee-track-content">
            {/* Set 1 */}
            <span>SPATIAL THOUGHT MAPPING</span>
            <span className="marquee-star">✦</span>
            <span>AGENCY OVER ALGORITHM</span>
            <span className="marquee-star">✦</span>
            <span>QUALITATIVE RESONANCE</span>
            <span className="marquee-star">✦</span>
            <span>432HZ FREQUENCY REALMS</span>
            <span className="marquee-star">✦</span>
            <span>SYNCHRONOUS CO-PRESENCE</span>
            <span className="marquee-star">✦</span>
            <span>SLOW SOCIAL EVOLUTION</span>
            <span className="marquee-star">✦</span>
            <span>ORGANIC PERSPECTIVE WEAVING</span>
            <span className="marquee-star">✦</span>
            <span>MINDFUL SANCTUARY</span>
            <span className="marquee-star">✦</span>
            <span>ZERO ALGORITHMIC BIAS</span>
            <span className="marquee-star">✦</span>

            {/* Set 2 */}
            <span>SPATIAL THOUGHT MAPPING</span>
            <span className="marquee-star">✦</span>
            <span>AGENCY OVER ALGORITHM</span>
            <span className="marquee-star">✦</span>
            <span>QUALITATIVE RESONANCE</span>
            <span className="marquee-star">✦</span>
            <span>432HZ FREQUENCY REALMS</span>
            <span className="marquee-star">✦</span>
            <span>SYNCHRONOUS CO-PRESENCE</span>
            <span className="marquee-star">✦</span>
            <span>SLOW SOCIAL EVOLUTION</span>
            <span className="marquee-star">✦</span>
            <span>ORGANIC PERSPECTIVE WEAVING</span>
            <span className="marquee-star">✦</span>
            <span>MINDFUL SANCTUARY</span>
            <span className="marquee-star">✦</span>
            <span>ZERO ALGORITHMIC BIAS</span>
            <span className="marquee-star">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  onEnterMindscape: PropTypes.func,
  onSelectCard: PropTypes.func
};

export default memo(HeroSection);
