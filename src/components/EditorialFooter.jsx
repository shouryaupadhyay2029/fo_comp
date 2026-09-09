/**
 * @fileoverview Magazine Editorial Footer Component.
 * @module EditorialFooter
 * @description Renders multi-column navigation links, brand mission statement, interactive triggers, and giant typographic logo footer banner.
 * @author Frontend Odyssey Team
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * Editorial Footer Component.
 *
 * @component
 * @param {Object} props Component properties.
 * @param {Function} [props.onScrollToSection] Callback to navigate smoothly to a specific section ID.
 * @param {Function} [props.onOpenResonance] Callback to open private resonance journal modal.
 * @param {Function} [props.onOpenWeaver] Callback to open thought weaver creation modal.
 * @returns {JSX.Element} The rendered editorial footer layout.
 */
function EditorialFooter({
  onScrollToSection,
  onOpenResonance,
  onOpenWeaver
}) {
  return (
    <footer className="outway-editorial-footer" role="contentinfo">
      {/* Top Grid Area */}
      <div className="outway-footer-top">
        {/* Left Headline */}
        <div className="outway-footer-brand-tag">
          <h2 className="outway-stay-headline">Stay in the know</h2>
          <p className="outway-subtext">Subscribe to quiet resonance & quarterly thought essays.</p>
        </div>

        {/* Links Columns */}
        <div className="outway-footer-columns font-mono">
          <div className="outway-col">
            <span className="outway-col-title">NAVIGATION</span>
            <button onClick={() => onScrollToSection && onScrollToSection('section-philosophy')}>01 MANIFESTO</button>
            <button onClick={() => onScrollToSection && onScrollToSection('section-mindscape')}>02 MINDSCAPE</button>
            <button onClick={() => onScrollToSection && onScrollToSection('section-thought')}>03 FEATURED</button>
            <button onClick={() => onScrollToSection && onScrollToSection('section-realms')}>04 REALMS</button>
            <button onClick={() => onScrollToSection && onScrollToSection('section-sanctuary')}>05 SANCTUARY</button>
          </div>

          <div className="outway-col">
            <span className="outway-col-title">EXPLORE</span>
            <button onClick={onOpenResonance}>RESONANCE JOURNAL</button>
            <button onClick={onOpenWeaver}>WEAVE THOUGHT</button>
            <a href="#section-realms" onClick={(e) => { e.preventDefault(); if (onScrollToSection) onScrollToSection('section-realms'); }}>CO-PRESENCE</a>
            <a href="#section-philosophy" onClick={(e) => { e.preventDefault(); if (onScrollToSection) onScrollToSection('section-philosophy'); }}>DESIGN ETHOS</a>
          </div>

          <div className="outway-col">
            <span className="outway-col-title">COMMUNITY</span>
            <a href="https://github.com" target="_blank" rel="noreferrer">GITHUB REPO</a>
            <a href="#section-sanctuary" onClick={(e) => { e.preventDefault(); if (onScrollToSection) onScrollToSection('section-sanctuary'); }}>SANCTUARY</a>
            <a href="#section-philosophy" onClick={(e) => { e.preventDefault(); if (onScrollToSection) onScrollToSection('section-philosophy'); }}>ETHOS</a>
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>BACK TO TOP ↑</a>
          </div>
        </div>
      </div>

      {/* Bottom Meta Row */}
      <div className="outway-footer-meta font-mono">
        <span className="outway-lang-picker">🌐 EN ▾</span>
        <span className="outway-copyright">©2026 VELOURA. FRONTEND ODYSSEY. ALL RIGHTS RESERVED.</span>
      </div>

      {/* Giant Brand Banner Text at the Bottom */}
      <div className="outway-giant-brand-banner">
        VELOURA
      </div>
    </footer>
  );
}

EditorialFooter.propTypes = {
  onScrollToSection: PropTypes.func,
  onOpenResonance: PropTypes.func,
  onOpenWeaver: PropTypes.func
};

export default memo(EditorialFooter);
