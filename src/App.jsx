import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { GradientBackground } from './components/GradientBackground';
import SmoothScrollWrapper from './components/SmoothScrollWrapper';
import CustomCursor from './components/CustomCursor';
import OpeningCurtainLoader from './components/OpeningCurtainLoader';
import Navbar from './components/Navbar';
import ConstellationMap from './components/ConstellationMap';
import VibeRealms from './components/VibeRealms';
import MindfulSanctuary from './components/MindfulSanctuary';
import ThoughtExpansionPanel from './components/ThoughtExpansionPanel';
import ThoughtWeaverModal from './components/ThoughtWeaverModal';
import ResonanceHistory from './components/ResonanceHistory';
import CuriousDiscovery from './components/CuriousDiscovery';
import BackToTopSeal from './components/BackToTopSeal';
import HeroCarousel from './components/HeroCarousel';
import YourbanaMenuOverlay from './components/YourbanaMenuOverlay';
import { MOCK_NODES } from './data/synapseData';
import { synth } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState('constellation');
  const [nodes, setNodes] = useState(MOCK_NODES);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isWeaverOpen, setIsWeaverOpen] = useState(false);
  const [weaverParentNode, setWeaverParentNode] = useState(null);
  const [isResonanceOpen, setIsResonanceOpen] = useState(false);
  const [isCuriousOpen, setIsCuriousOpen] = useState(false);
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false);
  const [userResonances, setUserResonances] = useState([MOCK_NODES[0], MOCK_NODES[2]]);

  // Scroll Reveal Observer Engine for lower sections
  useEffect(() => {
    const elements = document.querySelectorAll('[data-scroll-reveal]');

    const checkInitialInView = () => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.92) {
          const delay = el.getAttribute('data-delay');
          if (delay) {
            el.style.transitionDelay = delay;
          }
          el.classList.add('is-revealed');
        }
      });
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay');
          if (delay) {
            entry.target.style.transitionDelay = delay;
          }
          entry.target.classList.add('is-revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.02,
      rootMargin: '120px 0px 0px 0px'
    });

    elements.forEach((el) => observer.observe(el));
    checkInitialInView();

    window.addEventListener('scroll', checkInitialInView, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkInitialInView);
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  // GSAP Hero Entrance Sequence
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

  const handleAddNode = (newNode) => {
    setNodes((prev) => [newNode, ...prev]);
  };

  const handleExpandFromNode = (targetNode) => {
    setWeaverParentNode(targetNode);
    setSelectedNode(null);
    setIsWeaverOpen(true);
  };

  const handleOpenWeaverGeneral = () => {
    setWeaverParentNode(null);
    setIsWeaverOpen(true);
  };

  const handleToggleResonate = (nodeToResonate) => {
    const isCurrentlyResonated = userResonances.some((r) => r.id === nodeToResonate.id);

    setNodes((prevNodes) =>
      prevNodes.map((n) => {
        if (n.id === nodeToResonate.id) {
          const newCount = isCurrentlyResonated ? Math.max(1, n.resonanceCount - 1) : n.resonanceCount + 1;
          return { ...n, resonanceCount: newCount };
        }
        return n;
      })
    );

    setUserResonances((prev) => {
      if (isCurrentlyResonated) {
        return prev.filter((r) => r.id !== nodeToResonate.id);
      } else {
        return [...prev, nodeToResonate];
      }
    });

    if (selectedNode && selectedNode.id === nodeToResonate.id) {
      const newCount = isCurrentlyResonated ? Math.max(1, selectedNode.resonanceCount - 1) : selectedNode.resonanceCount + 1;
      setSelectedNode({
        ...selectedNode,
        resonanceCount: newCount
      });
    }
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterMindscape = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      scrollToSection('section-mindscape');
      return;
    }

    gsap.to(['.asymmetric-title-wrapper', '.hero-supporting-right'], {
      y: -25,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        scrollToSection('section-mindscape');
        gsap.to(['.asymmetric-title-wrapper', '.hero-supporting-right'], {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5
        });
      }
    });
  };

  const featuredNode = nodes.find((n) => n.id === 'node-1') || nodes[0];

  return (
    <SmoothScrollWrapper>
      <div className="app-main-wrapper">
        {/* Opening Vertical Slat Loader (Maximilian Kaspar style swipe) */}
        <OpeningCurtainLoader />

        {/* Dynamic Noisy Background (Subordinated Behind Foreground) */}
        <GradientBackground
          gradientOrigin="bottom-middle"
          noiseIntensity={0.8}
          noisePatternSize={90}
          noisePatternRefreshInterval={2}
          noisePatternAlpha={35}
        />

        {/* Minimal 6px Dot Cursor */}
        <CustomCursor />

        {/* Header Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenWeaver={handleOpenWeaverGeneral}
          onOpenResonance={() => setIsResonanceOpen(true)}
          onNavigateSection={scrollToSection}
          onOpenMenu={() => setIsMenuOverlayOpen(true)}
        />

        <main className="editorial-main-content">
          {/* SECTION 01 — EDITORIAL HERO (TEXT LEFT / 2D ROTATING WHEEL RIGHT) */}
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
                  <button
                    className="action-link hero-enter-link"
                    onClick={handleEnterMindscape}
                  >
                    ENTER THE MINDSCAPE ↓
                  </button>
                  <span className="scroll-indicator font-mono">
                    SCROLL TO EXPLORE <span className="arrow-down">↓</span>
                  </span>
                </div>
              </div>

              {/* Right Column: 2D Top-View Rotating Wheel (Image 2 Exact Match) */}
              <div className="hero-right-column">
                <HeroCarousel onSelectCard={() => scrollToSection('section-mindscape')} />
              </div>
            </div>

            {/* HERO BOTTOM INFINITE MARQUEE TICKER (Ditto-style with floating pill badge) */}
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

                  {/* Set 2 (Duplicate for 100% seamless loop) */}
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

          {/* SECTION 02 — PHILOSOPHY MANIFESTO */}
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

                  {/* RIGHT SIDE PURE BORDERLESS VIDEO (NO CARDS, NO BOXES) */}
                  <div
                    className="manifesto-pure-video-container"
                    data-scroll-reveal="fade-up"
                    data-delay="250ms"
                    onMouseEnter={() => synth.playTone(432, 1.2)}
                  >
                    <img
                      src="/carousel/hero1.png"
                      alt="Agency Over Algorithm Minimalist Video Loop"
                      className="manifesto-clean-video"
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

                  {/* RIGHT SIDE PURE BORDERLESS VIDEO (NO CARDS, NO BOXES) */}
                  <div
                    className="manifesto-pure-video-container"
                    data-scroll-reveal="fade-up"
                    data-delay="250ms"
                    onMouseEnter={() => synth.playTone(528, 1.2)}
                  >
                    <img
                      src="/carousel/hero2.png"
                      alt="Resonance Over Metrics Minimalist Video Loop"
                      className="manifesto-clean-video"
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

                  {/* RIGHT SIDE PURE BORDERLESS VIDEO (NO CARDS, NO BOXES) */}
                  <div
                    className="manifesto-pure-video-container"
                    data-scroll-reveal="fade-up"
                    data-delay="250ms"
                    onMouseEnter={() => synth.playTone(639, 1.2)}
                  >
                    <img
                      src="/carousel/hero3.png"
                      alt="Presence Over Performance Minimalist Video Loop"
                      className="manifesto-clean-video"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 03 — THE MINDSCAPE */}
          <section id="section-mindscape" className="mindscape-section">
            <div className="mindscape-header-box">
              <div className="section-meta font-mono" data-scroll-reveal="fade-up">
                <span className="editorial-number">03 — SPATIAL THOUGHT NETWORK</span>
              </div>
              <div className="mindscape-title-row">
                <h2 className="display-title mindscape-title" data-scroll-reveal="mask-up" data-delay="100ms">
                  NOT AN ENDLESS FEED.<br />A LIVING FIELD OF IDEAS.
                </h2>
                <button
                  className="action-link curious-serendipity-btn font-mono"
                  data-scroll-reveal="scale-up"
                  data-delay="250ms"
                  onClick={() => setIsCuriousOpen(true)}
                >
                  EXPLORE SERENDIPITY ✦
                </button>
              </div>
              <p className="editorial-body text-muted" data-scroll-reveal="fade-up" data-delay="300ms">
                "Step into a 2D spatial constellation where thoughts become connected nodes. Track how perspectives evolve, branch into new dimensions, and resonate across 432Hz audio frequencies."
              </p>
            </div>

            {/* Astronomical Typographic Constellation Canvas */}
            <ConstellationMap nodes={nodes} onSelectNode={(node) => setSelectedNode(node)} />
          </section>

          {/* SECTION 04 — FEATURED THOUGHT SPREAD */}
          {featuredNode && (
            <section id="section-thought" className="featured-magazine-section">
              <div className="section-container">
                <div className="section-meta font-mono" data-scroll-reveal="fade-up">
                  <span className="editorial-number">04 — FEATURED PERSPECTIVE</span>
                </div>

                <h2 className="display-title featured-magazine-title" data-scroll-reveal="mask-up" data-delay="150ms">
                  "WHAT IF SOCIAL MEDIA WAS BUILT TO ENRICH YOUR MIND, NOT STEAL YOUR TIME?"
                </h2>

                <div className="magazine-byline font-mono" data-scroll-reveal="fade-up" data-delay="250ms">
                  <span>{featuredNode.creator.toUpperCase()}</span>
                  <span className="byline-sep">/</span>
                  <span>DIGITAL WELLBEING</span>
                  <span className="byline-sep">/</span>
                  <span>{featuredNode.resonanceCount} QUALITATIVE RESONANCES</span>
                </div>

                <p className="editorial-body magazine-body" data-scroll-reveal="fade-up" data-delay="350ms">
                  "{featuredNode.content}"
                </p>

                <div className="magazine-actions font-mono" data-scroll-reveal="fade-up" data-delay="450ms">
                  <button className="action-link" onClick={() => handleToggleResonate(featuredNode)}>
                    {userResonances.some((r) => r.id === featuredNode.id) ? 'RESONATING IN JOURNAL ✓' : 'RESONATE WITH THOUGHT +'}
                  </button>
                  <button className="action-link" onClick={() => setSelectedNode(featuredNode)}>
                    OFFER PERSPECTIVE ↗
                  </button>
                  <button className="action-link" onClick={() => handleExpandFromNode(featuredNode)}>
                    WEAVE THOUGHT BRANCH →
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* SECTION 05 — VIBE REALMS */}
          <VibeRealms />

          {/* SECTION 06 — MINDFUL SANCTUARY */}
          <MindfulSanctuary />

          {/* SECTION 07 — FINAL EDITORIAL CTA */}
          <section id="section-final-cta" className="final-cta-section">
            <div className="section-container text-center">
              <div className="section-meta font-mono" data-scroll-reveal="fade-up">
                <span className="editorial-number">07 — JOIN THE SLOW SOCIAL REVOLUTION</span>
              </div>

              <h2 className="display-title final-title" data-scroll-reveal="mask-up" data-delay="150ms">
                DON'T POST FOR CLOUT.<br />PLANT A THOUGHT FOR RESONANCE.
              </h2>

              <div className="final-action-box font-mono" data-scroll-reveal="scale-up" data-delay="300ms">
                <button className="action-link final-weave-link" onClick={handleOpenWeaverGeneral}>
                  WEAVE A THOUGHT TO THE MINDSCAPE →
                </button>
              </div>
            </div>
          </section>

          {/* MINIMAL FOOTER */}
          <footer className="minimal-footer font-mono">
            <div className="footer-container">
              <div className="footer-left">
                <span className="footer-title">VELOURA</span>
                <span className="footer-sub">RESONANT MINDSCAPE</span>
                <span className="footer-quote text-muted">"Social, reimagined."</span>
              </div>

              <div className="footer-center font-mono">
                <button onClick={() => scrollToSection('section-mindscape')}>MINDSCAPE</button>
                <button onClick={() => scrollToSection('section-realms')}>REALMS</button>
                <button onClick={() => scrollToSection('section-sanctuary')}>SANCTUARY</button>
                <button onClick={() => setIsResonanceOpen(true)}>RESONANCE</button>
                <button onClick={handleOpenWeaverGeneral}>WEAVE</button>
              </div>

              <div className="footer-right text-muted">
                <span>FRONTEND ODYSSEY / 2026</span>
              </div>
            </div>
          </footer>
        </main>

        {/* Thought Expansion Panel */}
        <ThoughtExpansionPanel
          node={selectedNode}
          allNodes={nodes}
          onClose={() => setSelectedNode(null)}
          onSelectNode={(node) => setSelectedNode(node)}
          onExpandNode={handleExpandFromNode}
          onToggleResonate={handleToggleResonate}
          isResonatedInJournal={selectedNode ? userResonances.some((r) => r.id === selectedNode.id) : false}
        />

        {/* Weave Thought Creator Modal */}
        <ThoughtWeaverModal
          isOpen={isWeaverOpen}
          onClose={() => setIsWeaverOpen(false)}
          onAddNode={handleAddNode}
          existingNodes={nodes}
          parentNode={weaverParentNode}
        />

        {/* Private Resonance History Journal Modal */}
        <ResonanceHistory
          isOpen={isResonanceOpen}
          onClose={() => setIsResonanceOpen(false)}
          userResonances={userResonances}
          onSelectNode={(node) => setSelectedNode(node)}
        />

        {/* Intellectual Serendipity Modal ("I'M CURIOUS") */}
        <CuriousDiscovery
          isOpen={isCuriousOpen}
          onClose={() => setIsCuriousOpen(false)}
          allNodes={nodes}
          onSelectNode={(node) => setSelectedNode(node)}
        />

        {/* YourBana Fullscreen Dropdown Menu Overlay */}
        <YourbanaMenuOverlay
          isOpen={isMenuOverlayOpen}
          onClose={() => setIsMenuOverlayOpen(false)}
          onSelectMenuItem={(sectionId, tabId) => {
            setActiveTab(tabId);
            scrollToSection(sectionId);
          }}
          onOpenWeaver={handleOpenWeaverGeneral}
        />

        {/* Circular Rotating Seal Back To Top Button */}
        <BackToTopSeal />
      </div>

      <style>{`
        .app-main-wrapper {
          min-height: 100vh;
          position: relative;
        }

        .editorial-main-content {
          position: relative;
          z-index: 1;
        }

        /* Side-by-Side Hero Layout */
        .asymmetric-hero-section {
          padding: calc(var(--nav-height) + 40px) 40px 60px 40px;
          max-width: 1440px;
          margin: 0 auto;
          min-height: 88vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Hero Bottom Marquee Ticker (Transparent background) */
        .hero-bottom-marquee-banner {
          position: relative;
          width: 100%;
          margin-top: 64px;
          padding: 20px 0;
          border-top: 1px solid rgba(18, 17, 16, 0.14);
          border-bottom: 1px solid rgba(18, 17, 16, 0.14);
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          overflow: hidden;
          animation: heroFadeSlideUp 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.85s both;
        }

        .hero-marquee-track {
          display: flex;
          width: max-content;
          overflow: hidden;
        }

        .marquee-track-content {
          display: flex;
          align-items: center;
          gap: 36px;
          white-space: nowrap;
          animation: marqueeScroll 32s linear infinite;
        }



        .marquee-track-content span {
          font-family: var(--font-gondens);
          font-size: 1.1rem;
          font-weight: 800;
          color: #121110;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .marquee-star {
          color: #d94e00 !important;
          font-size: 0.9rem !important;
        }

        .marquee-floating-badge {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          background: #ffffff;
          border: 1.5px solid rgba(18, 17, 16, 0.18);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.8);
          border-radius: 9999px;
          padding: 8px 24px;
          font-size: 0.76rem;
          font-weight: 800;
          color: #121110;
          letter-spacing: 0.08em;
          pointer-events: auto;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .marquee-floating-badge:hover {
          transform: translate(-50%, -50%) scale(1.05);
          border-color: #d94e00;
          box-shadow: 0 12px 32px rgba(217, 78, 0, 0.2);
        }

        .badge-dot-live {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.6);
          animation: pulseDot 2s infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        @keyframes marqueeScroll {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .hero-main-split {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 60px;
        }

        .hero-left-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .hero-right-column {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: heroScaleFadeIn 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
        }

        .hero-top-label {
          margin-bottom: 18px;
          animation: heroFadeSlideUp 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
        }

        .asymmetric-title-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          margin-bottom: 28px;
          gap: 0;
          overflow: hidden;
        }

        .hero-display-title {
          font-size: clamp(2.4rem, 5.2vw, 6.8rem) !important;
          line-height: 0.94;
          will-change: transform, opacity;
        }

        .hero-display-title:nth-child(1) {
          animation: heroLineReveal 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
        }

        .hero-display-title:nth-child(2) {
          animation: heroLineReveal 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.38s both;
        }

        .hero-display-title:nth-child(3) {
          animation: heroLineReveal 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.51s both;
        }

        .line-left, .line-right {
          text-align: left !important;
          margin-top: 0 !important;
          margin-left: 0 !important;
        }

        .hero-text-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
          animation: heroFadeSlideUp 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both;
        }

        .hero-action-row {
          display: flex;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
          animation: heroFadeSlideUp 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.78s both;
        }

        @keyframes heroLineReveal {
          from {
            transform: translateY(115%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes heroFadeSlideUp {
          from {
            transform: translateY(32px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes heroScaleFadeIn {
          from {
            transform: scale(0.9) translateY(24px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 1100px) {
          .hero-main-split {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-right-column {
            order: -1;
          }
        }

        .hero-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: flex-end;
          gap: 40px;
          border-top: 1px solid var(--border-hairline);
          padding-top: 40px;
        }

        .hero-enter-link {
          font-size: 1rem;
        }

        .hero-supporting-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: flex-end;
          text-align: right;
        }

        .hero-micro-desc {
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          max-width: 480px;
        }

        .hero-micro-meta {
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          color: var(--accent-orange);
          font-weight: 700;
          text-transform: uppercase;
        }

        .manifesto-impl-line {
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          margin-top: 12px;
          color: var(--accent-orange);
        }

        .scroll-indicator {
          font-size: 0.72rem;
          color: #64748b;
          letter-spacing: 0.18em;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .arrow-down {
          color: var(--accent-orange);
          animation: bounceDown 2s infinite ease-in-out;
        }

        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }

        /* Philosophy Manifesto Layout */
        .philosophy-manifesto-section {
          padding: var(--section-padding-y) 40px;
          max-width: 1440px;
          margin: 0 auto;
          border-top: 1px solid var(--border-hairline);
        }

        .manifesto-vertical-list {
          display: flex;
          flex-direction: column;
          margin-top: 60px;
        }

        .manifesto-block {
          display: grid;
          grid-template-columns: 80px 1.1fr 1fr;
          gap: 48px;
          align-items: center;
          padding: 60px 0;
        }

        .manifesto-num {
          font-size: 1.5rem;
          color: var(--accent-orange);
          font-weight: 700;
        }

        .manifesto-title {
          font-size: clamp(2.5rem, 5.5vw, 4.8rem);
          margin-bottom: 20px;
        }

        .manifesto-desc {
          max-width: 520px;
        }

        /* Pure Borderless Editorial Video Container */
        .manifesto-pure-video-container {
          position: relative;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: transparent;
          box-shadow: none;
          border: none;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .manifesto-pure-video-container:hover {
          transform: translateY(-3px);
        }

        .manifesto-clean-video {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: 12px;
          display: block;
          filter: grayscale(100%) contrast(105%) brightness(0.95);
          transition: filter 0.6s ease, transform 0.6s ease;
        }

        .manifesto-pure-video-container:hover .manifesto-clean-video {
          filter: grayscale(40%) contrast(105%) brightness(1);
          transform: scale(1.02);
        }

        @media (max-width: 1100px) {
          .manifesto-block {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        /* Mindscape Section */
        .mindscape-section {
          padding-top: 120px;
        }

        .mindscape-header-box {
          max-width: 1400px;
          margin: 0 auto 40px auto;
          padding: 0 40px;
        }

        .mindscape-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .mindscape-title {
          font-size: clamp(2.2rem, 5vw, 4rem);
          margin-top: 16px;
          margin-bottom: 12px;
        }

        .curious-serendipity-btn {
          font-size: 0.78rem;
          color: var(--accent-orange);
          letter-spacing: 0.15em;
        }

        /* Featured Magazine Section */
        .featured-magazine-section {
          padding: var(--section-padding-y) 40px;
          max-width: 1400px;
          margin: 0 auto;
          border-top: 1px solid var(--border-hairline);
        }

        .featured-magazine-title {
          font-size: clamp(2.2rem, 5vw, 4rem);
          margin-top: 20px;
          margin-bottom: 16px;
          line-height: 1.05;
        }

        .magazine-byline {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.78rem;
          color: #94a3b8;
          letter-spacing: 0.15em;
          margin-bottom: 28px;
        }

        .byline-sep {
          color: #64748b;
        }

        .magazine-body {
          margin-bottom: 48px;
        }

        .magazine-actions {
          display: flex;
          gap: 36px;
          flex-wrap: wrap;
        }

        /* Final CTA */
        .final-cta-section {
          padding: var(--section-padding-y) 40px;
          border-top: 1px solid var(--border-hairline);
          max-width: 1400px;
          margin: 0 auto;
        }

        .final-title {
          margin-top: 20px;
          margin-bottom: 40px;
        }

        .final-weave-link {
          font-size: 1.1rem;
          color: var(--accent-orange);
        }

        .final-weave-link::after {
          background: var(--accent-orange);
        }

        /* Minimal Footer */
        .minimal-footer {
          padding: 60px 40px;
          border-top: 1px solid var(--border-hairline);
          max-width: 1400px;
          margin: 0 auto;
          font-size: 0.75rem;
        }

        .footer-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-title {
          font-family: var(--font-heading);
          font-weight: 800;
          color: #121110;
          font-size: 0.95rem;
        }

        .footer-sub {
          color: #68635c;
          letter-spacing: 0.12em;
        }

        .footer-quote {
          font-style: italic;
        }

        .footer-center {
          display: flex;
          gap: 24px;
        }

        .footer-center button {
          background: transparent;
          border: none;
          color: #68635c;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .footer-center button:hover {
          color: #121110;
        }

        @media (max-width: 850px) {
          .hero-bottom-grid { grid-template-columns: 1fr; gap: 24px; }
          .hero-supporting-right { align-items: flex-start; text-align: left; }
          .line-right { text-align: left; }
          .manifesto-block { grid-template-columns: 1fr; gap: 16px; }
          .footer-container { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </SmoothScrollWrapper>
  );
}
