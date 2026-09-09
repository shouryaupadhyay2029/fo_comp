import React, { useState } from 'react';
import gsap from 'gsap';
import { GradientBackground } from './components/GradientBackground';
import SmoothScrollWrapper from './components/SmoothScrollWrapper';
import CustomCursor from './components/CustomCursor';
import OpeningCurtainLoader from './components/OpeningCurtainLoader';
import PageTransitionCurtain from './components/PageTransitionCurtain';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PhilosophyManifesto from './components/PhilosophyManifesto';
import ConstellationMap from './components/ConstellationMap';
import VibeRealms from './components/VibeRealms';
import MindfulSanctuary from './components/MindfulSanctuary';
import EditorialFooter from './components/EditorialFooter';
import ThoughtExpansionPanel from './components/ThoughtExpansionPanel';
import ThoughtWeaverModal from './components/ThoughtWeaverModal';
import ResonanceHistory from './components/ResonanceHistory';
import CuriousDiscovery from './components/CuriousDiscovery';
import BackToTopSeal from './components/BackToTopSeal';
import YourbanaMenuOverlay from './components/YourbanaMenuOverlay';
import DiscoverPage from './pages/DiscoverPage';
import ExchangePage from './pages/ExchangePage';
import RealmsPage from './pages/RealmsPage';
import { MOCK_NODES } from './data/synapseData';
import { useScrollDirection } from './hooks/useScrollDirection';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useParallaxGlide } from './hooks/useParallaxGlide';
import { useNavigationRoute } from './hooks/useNavigationRoute';
import './styles/AppStyles.css';

export default function App() {
  // Custom Architecture Hooks
  const { currentPath, isPageTransitioning, setIsPageTransitioning, handleNavigateRoute } = useNavigationRoute();
  useScrollDirection();
  useScrollReveal(currentPath);
  useParallaxGlide(currentPath);

  // Application State
  const [exchangeThought, setExchangeThought] = useState(null);
  const [activeTab, setActiveTab] = useState('constellation');
  const [nodes, setNodes] = useState(MOCK_NODES);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isWeaverOpen, setIsWeaverOpen] = useState(false);
  const [weaverParentNode, setWeaverParentNode] = useState(null);
  const [isResonanceOpen, setIsResonanceOpen] = useState(false);
  const [isCuriousOpen, setIsCuriousOpen] = useState(false);
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false);
  const [userResonances, setUserResonances] = useState([MOCK_NODES[0], MOCK_NODES[2]]);

  // State Handlers
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
        {/* Opening Vertical Slat Loader */}
        <OpeningCurtainLoader />

        {/* Page Transition Horizontal Slat Curtain */}
        <PageTransitionCurtain
          isTransitioning={isPageTransitioning}
          onComplete={() => setIsPageTransitioning(false)}
        />

        {/* Dynamic Noisy Background */}
        <GradientBackground
          gradientOrigin="bottom-middle"
          noiseIntensity={0.85}
          noisePatternSize={90}
          noisePatternRefreshInterval={2}
          noisePatternAlpha={32}
        />

        {/* Minimal Dot Cursor */}
        <CustomCursor />

        {/* Header Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenWeaver={handleOpenWeaverGeneral}
          onOpenResonance={() => setIsResonanceOpen(true)}
          onNavigateSection={scrollToSection}
          onOpenMenu={() => setIsMenuOverlayOpen(true)}
          onNavigateRoute={handleNavigateRoute}
        />

        <main className="editorial-main-content">
          {currentPath === '/discover' ? (
            <DiscoverPage
              allNodes={nodes}
              onSelectNode={(thought) => {
                setExchangeThought(thought);
                handleNavigateRoute('/exchange');
              }}
            />
          ) : currentPath === '/exchange' ? (
            <ExchangePage
              initialThought={exchangeThought}
              allNodes={nodes}
              onSelectNode={(node) => setSelectedNode(node)}
            />
          ) : currentPath === '/realms' ? (
            <RealmsPage
              onNavigateExchange={(thought) => {
                setExchangeThought(thought);
                handleNavigateRoute('/exchange');
              }}
            />
          ) : (
            <>
              {/* SECTION 01 — EDITORIAL HERO */}
              <HeroSection
                onEnterMindscape={handleEnterMindscape}
                onSelectCard={() => scrollToSection('section-mindscape')}
              />

              {/* SECTION 02 — PHILOSOPHY MANIFESTO */}
              <PhilosophyManifesto />

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
            </>
          )}

          {/* OUTWAY-INSPIRED EDITORIAL FOOTER */}
          <EditorialFooter
            onScrollToSection={scrollToSection}
            onOpenResonance={() => setIsResonanceOpen(true)}
            onOpenWeaver={handleOpenWeaverGeneral}
          />
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

        {/* Intellectual Serendipity Modal */}
        <CuriousDiscovery
          isOpen={isCuriousOpen}
          onClose={() => setIsCuriousOpen(false)}
          allNodes={nodes}
          onSelectNode={(node) => setSelectedNode(node)}
        />

        {/* Menu Overlay */}
        <YourbanaMenuOverlay
          isOpen={isMenuOverlayOpen}
          onClose={() => setIsMenuOverlayOpen(false)}
          onSelectMenuItem={(sectionId, tabId) => {
            if (currentPath !== '/') {
              handleNavigateRoute('/');
              setTimeout(() => {
                setActiveTab(tabId);
                scrollToSection(sectionId);
              }, 400);
            } else {
              setActiveTab(tabId);
              scrollToSection(sectionId);
            }
          }}
          onOpenWeaver={handleOpenWeaverGeneral}
          onNavigateRoute={handleNavigateRoute}
        />

        {/* Circular Rotating Seal Back To Top Button */}
        <BackToTopSeal />
      </div>
    </SmoothScrollWrapper>
  );
}
