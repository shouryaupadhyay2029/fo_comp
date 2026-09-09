# VELOURA — Spatial Thought Network & Slow Social Platform

> **"Social Should Feel More Human."**  
> *A slower, intentional social architecture for ideas, perspectives, and qualitative resonance—built without algorithmic engagement traps or vanity clout metrics.*

---

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15.0-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Audio API](https://img.shields.io/badge/Web_Audio-432Hz_Resonance-ff7700)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Core Philosophy & Ethos](#-core-philosophy--ethos)
- [Key Features](#-key-features)
- [Web Application Architecture](#-web-application-architecture)
- [Acoustic Frequency Engine](#-acoustic-frequency-engine)
- [Pages & User Experience](#-pages--user-experience)
- [Interactive Components](#-interactive-components)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Directory Structure](#-project-directory-structure)
- [Design System & Aesthetics](#-design-system--aesthetics)
- [License & Acknowledgments](#-license--acknowledgments)

---

## 🌌 Overview

**VELOURA** (part of *Frontend Odyssey*) is a luxury editorial, interactive web application designed as an antidote to hyper-stimulating, addictive social media feeds. Rather than pushing endless vertical scrolling powered by black-box algorithms, VELOURA organizes thoughts into **2D spatial constellations**, frequency-tuned **Vibe Realms**, and finite **Discovery Archives**.

Users navigate thoughts organically, resonance is measured through qualitative acoustic frequencies (e.g. 432Hz, 528Hz, 639Hz) rather than public follower counts, and conversations evolve into multi-directional perspective trees.

---

## 📜 Core Philosophy & Ethos

| Pillar | Principle | Implementation |
| :--- | :--- | :--- |
| **01. Agency Over Algorithm** | You navigate spatial thought maps where curiosity determines your path—not a machine learning model engineered for dopamine retention. | Interactive 2D Constellation Canvas & Serendipity Triggers |
| **02. Resonance Over Metrics** | Vanity metrics (likes, follower counts, clout scores) are replaced by qualitative acoustic frequencies measuring depth of perspective. | 432Hz/528Hz Web Audio synth & private Resonance Journals |
| **03. Presence Over Performance** | No continuous content broadcasting required. Quiet spatial sanctuaries facilitate synchronous co-presence. | Ambient Mindful Sanctuary & finite "That's Enough for Now" states |

---

## ✨ Key Features

### 🌌 1. Spatial Thought Constellation Canvas
- **Interactive 2D Node Network**: Thoughts render as astronomical nodes floating in space with dynamic gravitational connections.
- **Thought Nodes**: Filterable by category (*Cosmic Philosophy*, *Generative Arts*, *Mindful Tech*, *Post-AI Futures*).
- **Node Interaction**: Hover to activate harmonic frequency tones; click to expand thought cards or weave new branches.

### 🎵 2. Acoustic Frequency Synthesizer (`synth`)
- Integrated native Web Audio API synthesizer generating clean sine wave frequencies.
- Tuned to Solfeggio and healing scales (**432Hz**, **528Hz**, **639Hz**, **741Hz**, **852Hz**).
- Audio feedback on hover actions, page transitions, and resonance collection.

### 🔍 3. Finite Discovery Archive (`/discover`)
- **Intentional Boundaries**: Curated pool of thoughts designed to give you something worth thinking about—without endless scrolling.
- **Floating Cursor Mask Portal**: Interactive circular lens follows cursor movements over editorial fragments to preview visuals.
- **"I'M CURIOUS" Serendipity**: Generates out-of-orbit thoughts to broaden perspective.
- **Finite Exit State**: Concludes with *"That's enough for now. Return Home →"* to encourage digital well-being.

### 🔄 4. Thought Exchange & Perspective Evolution (`/exchange`)
- **Resonance Tracker**: Persisted local bookmarking of thoughts with soft feedback notes.
- **Offer Perspective (`↗`)**: Contribute nuanced counter-perspectives without hostile comment section dynamics.
- **Expand Thought (`→`)**: Plant evolutionary spin-off thoughts attached to origin nodes.
- **Evolution Flow Diagram**: Visual tree detailing node journey from *Origin → Resonance → Perspective → Evolution*.

### 🧘 5. Mindful Sanctuary & Vibe Realms (`/realms`)
- **Vibe Realms**: Categorized frequency spheres featuring active fragment counts and atmospheric tone signatures.
- **Cross-Border Discovery**: Jump between distinct conceptual realms (*"Cross the Border →"*).
- **Mindful Sanctuary**: Ambient co-presence space for quiet reflection.

### 🎨 6. Rich Motion & Editorial Aesthetics
- **GSAP Hero Entrance**: Staggered typography reveals and smooth easing transitions.
- **Scroll Reveal Engine**: IntersectionObserver system driving 8+ dynamic entry animations (`mask-up`, `track-in`, `skew-up`, `rotate-in`, `blur-reveal`).
- **Smooth Parallax Glide**: 60fps `requestAnimationFrame` image parallax engine.
- **Custom Dot Cursor**: Reactive 6px dot cursor with smooth spring dynamics.
- **Curtain Transitions**: Vertical slat loader on boot and horizontal curtain swipes on route changes.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool / Bundler**: [Vite 8](https://vitejs.dev/)
- **Animation & Motion Engine**: [GSAP 3.15](https://greensock.com/gsap/) + [Lenis Smooth Scroll](https://lenis.darkroom.engineering/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Synthesizer**: Native HTML5 Web Audio API
- **Styling**: Vanilla CSS (Custom Tokens, Glassmorphism, CSS Grid & Flexbox, Fluid Typography with `clamp()`)
- **State Management**: React `useState` & `useEffect` + `localStorage` persistence

---

## 📂 Project Directory Structure

```
fo_comp/
├── public/                     # Static media & editorial asset carousel images
│   └── carousel/               # Editorial showcase imagery
├── src/
│   ├── assets/                 # SVGs and static graphics
│   ├── components/             # Reusable UI & Editorial Components
│   │   ├── BackToTopSeal.jsx       # Rotating seal scroll-to-top trigger
│   │   ├── ConstellationMap.jsx    # Interactive 2D spatial thought graph
│   │   ├── CuriousDiscovery.jsx    # Serendipity thought modal
│   │   ├── CustomCursor.jsx        # Minimalist dot cursor with portal lens
│   │   ├── GradientBackground.jsx  # Dynamic noisy ambient background
│   │   ├── HeroCarousel.jsx        # 2D top-view rotating wheel hero card showcase
│   │   ├── MindfulSanctuary.jsx    # Ambient quiet co-presence module
│   │   ├── Navbar.jsx              # Floating navigation bar with status tags
│   │   ├── OpeningCurtainLoader.jsx# Boot slat curtain loader animation
│   │   ├── PageTransitionCurtain.jsx# Route swipe curtain transition
│   │   ├── ResonanceHistory.jsx    # Personal saved thoughts journal
│   │   ├── SmoothScrollWrapper.jsx # Lenis smooth scrolling integration
│   │   ├── ThoughtExpansionPanel.jsx# Detailed thought reader & perspective drawer
│   │   ├── ThoughtPreview.jsx      # Quick preview popover card
│   │   ├── ThoughtWeaverModal.jsx  # Thought creation & branching modal
│   │   ├── VibeRealms.jsx          # Frequency-tuned realm showcase
│   │   └── YourbanaMenuOverlay.jsx # Fullscreen editorial menu overlay
│   ├── data/
│   │   └── synapseData.js          # Mock thought nodes, categories & realms data
│   ├── pages/
│   │   ├── DiscoverPage.jsx        # Finite Discovery Archive page
│   │   ├── ExchangePage.jsx        # Thought Exchange & Evolution page
│   │   └── RealmsPage.jsx          # Categorized Vibe Realms index page
│   ├── utils/
│   │   └── audio.js                # Web Audio API 432Hz/528Hz frequency synth
│   ├── App.css                     # Component & animation stylesheet
│   ├── App.jsx                     # Core application orchestrator & routing
│   ├── index.css                   # Global CSS design system & typography tokens
│   └── main.jsx                    # Application entry point
├── index.html                      # HTML5 template with Google Fonts integration
├── package.json                    # Project dependencies and npm scripts
├── vercel.json                     # Vercel deployment configuration
└── vite.config.js                  # Vite configuration file
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (version 18+ recommended) and npm installed.

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/frontend_odyssey.git
   cd frontend_odyssey/fo_comp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

### Production Build

To test and build the production bundle:

```bash
# Generate optimized build
npm run build

# Preview production build locally
npm run preview
```

---

## 🎵 Acoustic Frequency Engine

VELOURA includes a custom Web Audio API synthesizer (`src/utils/audio.js`) that produces organic sine-wave tones based on natural tuning frequencies:

| Frequency | Target / Zone | Experience |
| :--- | :--- | :--- |
| **432 Hz** | Deep Reflection & Mindfulness | Calming natural resonance on node interaction |
| **528 Hz** | Transformation & Philosophy | Solfeggio frequency for quiet contemplation |
| **639 Hz** | Generative Arts & Connections | Harmonic tone for creative thought growth |
| **741 Hz** | Post-AI Futures | Higher frequency tone for prospective inquiry |

---

## 🎨 Design System & Aesthetics

- **Typography**: Editorial contrast featuring **Outfit** (Headline Sans) alongside clean Monospace accents.
- **Palette**: Warm obsidian background (`#121110`), Veloura Rose (`#c94a6e` / `#fcb9c7`), and Solfeggio frequency highlight accents (`#38bdf8`, `#c084fc`, `#ff7700`).
- **Texture**: Noise pattern overlay (`GradientBackground.jsx`) providing tactile film grain feel.
- **Transitions**: 600ms bezier curves (`cubic-bezier(0.16, 1, 0.3, 1)`) for liquid motion responsive UX.

---

## 📝 License & Acknowledgments

Distributed under the **MIT License**. See `LICENSE` for details.

Designed with intentionality for **Frontend Odyssey 2026**.

---

<p center>
  <i>"Don't post for clout. Plant a thought for resonance."</i> — <b>VELOURA</b>
</p>
