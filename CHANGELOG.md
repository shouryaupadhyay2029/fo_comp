# Changelog

All notable changes to the **VELOURA** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-09-09

### Added
- **ThoughtContext React Context Provider**: Global state management architecture eliminating prop-drilling.
- **PropTypes Definitions**: Explicit prop validation across all 20+ React components for strict type safety.
- **Dedicated Component Stylesheets**: Extracted raw JSX `<style>` blocks into modular CSS files in `src/styles/components/`.
- **PWA Web App Manifest (`manifest.json`)**: Full progressive web application manifest configuration.
- **React Error Boundary (`ErrorBoundary.jsx`)**: Graceful UI error catching and fallback screen.
- **OpenGraph & SEO Metadata**: Preconnect links, social media preview tags, and accessibility parameters in `index.html`.
- **Touch Gesture Support**: Touchscreen drag and pan interaction on 2D Constellation canvas.

### Changed
- **Vite Build Config**: Added production manual chunk splitting for vendor libraries (`react`, `gsap`, `lenis`).
- **Path Aliases**: Integrated `@/*` path mapping in `jsconfig.json` and `vite.config.js`.

### Fixed
- Resolved React 19 rules of hooks linter warnings in `ThoughtWeaverModal.jsx`.
- Resolved render-time callback ref mutations in `PageTransitionCurtain.jsx`.

## [1.1.0] - 2026-09-01

### Added
- Interactive 2D Constellation Canvas mapping thoughts with harmonic audio frequencies.
- Solfeggio Web Audio API synthesizer (`432Hz`, `528Hz`, `639Hz`, `741Hz`).
- Finite Discovery Archive (`/discover`) and Thought Exchange Evolution (`/exchange`).

## [1.0.0] - 2026-08-30

### Added
- Initial project release for Frontend Odyssey 2026.
