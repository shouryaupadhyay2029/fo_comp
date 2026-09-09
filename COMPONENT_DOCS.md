# 📚 VELOURA Component Reference Documentation

> **Complete API, Prop Types, & Usage Guide for all VELOURA UI Components**

---

## Table of Contents

1. [Core Layout Components](#core-layout-components)
   - [Navbar](#navbar)
   - [EditorialFooter](#editorialfooter)
   - [SmoothScrollWrapper](#smoothscrollwrapper)
   - [GradientBackground](#gradientbackground)
   - [CustomCursor](#customcursor)
2. [Interactive Feature Components](#interactive-feature-components)
   - [ConstellationMap](#constellationmap)
   - [HeroCarousel](#herocarousel)
   - [HeroSection](#herosection)
   - [PhilosophyManifesto](#philosophymanifesto)
   - [VibeRealms](#viberealms)
   - [MindfulSanctuary](#mindfulsanctuary)
   - [BackToTopSeal](#backtopopseal)
3. [Modals & Overlays](#modals--overlays)
   - [ThoughtExpansionPanel](#thoughtexpansionpanel)
   - [ThoughtWeaverModal](#thoughtweavermodal)
   - [ResonanceHistory](#resonancehistory)
   - [CuriousDiscovery](#curiousdiscovery)
   - [YourbanaMenuOverlay](#yourbanamenuoverlay)
4. [Custom Hooks](#custom-hooks)
   - [useNavigationRoute](#usenavigationroute)
   - [useScrollReveal](#usescrollreveal)
   - [useParallaxGlide](#useparallaxglide)
   - [useScrollDirection](#usescrolldirection)

---

## Core Layout Components

### Navbar

**Path:** `src/components/Navbar.jsx`  
**Description:** Renders the sticky top header bar with edition tag, brand title, online presence count, and menu overlay button.

#### Props
| Prop Name | Type | Required | Default | Description |
|---|---|---|---|---|
| `onOpenMenu` | `PropTypes.func` | No | `undefined` | Callback invoked when clicking hamburger menu trigger. |
| `onNavigateRoute` | `PropTypes.func` | No | `undefined` | Callback invoked when clicking the central VELOURA brand logo. |

---

### EditorialFooter

**Path:** `src/components/EditorialFooter.jsx`  
**Description:** Renders magazine-style multi-column footer with quick navigation links, subscription box, copyright notice, and giant typographic logo banner.

#### Props
| Prop Name | Type | Required | Default | Description |
|---|---|---|---|---|
| `onScrollToSection` | `PropTypes.func` | No | `undefined` | Callback to scroll smoothly to a given section element ID. |
| `onOpenResonance` | `PropTypes.func` | No | `undefined` | Callback to launch the private Resonance History journal modal. |
| `onOpenWeaver` | `PropTypes.func` | No | `undefined` | Callback to open the Thought Weaver creator modal. |

---

### SmoothScrollWrapper

**Path:** `src/components/SmoothScrollWrapper.jsx`  
**Description:** Wraps the app in a Lenis smooth inertial scrolling engine with automatic animation frame cleanup on unmount.

#### Props
| Prop Name | Type | Required | Default | Description |
|---|---|---|---|---|
| `children` | `PropTypes.node` | Yes | - | React children elements to wrap with smooth scrolling. |

---

### GradientBackground

**Path:** `src/components/GradientBackground.jsx`  
**Description:** Renders a fixed background gradient with customizable color stops and an optional HTML5 canvas noise generator (`Noise`).

#### Props
| Prop Name | Type | Required | Default | Description |
|---|---|---|---|---|
| `gradientType` | `PropTypes.string` | No | `'radial-gradient'` | Gradient type (`radial-gradient`, `linear-gradient`, `conic-gradient`). |
| `colors` | `PropTypes.array` | No | Default Palette | Color stops array (`[{ color, stop }]`). |
| `enableNoise` | `PropTypes.bool` | No | `true` | Enables or disables canvas noise grain overlay. |
| `noisePatternRefreshInterval` | `PropTypes.number` | No | `6` | Frame skip interval for updating grain pixels. |

---

### CustomCursor

**Path:** `src/components/CustomCursor.jsx`  
**Description:** High-performance inverting circle cursor using direct DOM manipulation without React state thrashing on mouse movement.

---

## Interactive Feature Components

### ConstellationMap

**Path:** `src/components/ConstellationMap.jsx`  
**Description:** 2D interactive HTML5 canvas spatial constellation map rendering connected thought nodes with float dynamics, category filtering, drag/zoom navigation, and 432Hz acoustic feedback.

#### Props
| Prop Name | Type | Required | Default | Description |
|---|---|---|---|---|
| `nodes` | `PropTypes.array` | Yes | - | Array of thought node objects from Synapse dataset. |
| `onSelectNode` | `PropTypes.func` | No | `undefined` | Callback triggered when a constellation node is clicked. |

---

### HeroCarousel

**Path:** `src/components/HeroCarousel.jsx`  
**Description:** Orbiting 2D circular carousel featuring squircle visual cards with morphing CSS borders, interactive hover focal points, and RAF rotation dampening.

#### Props
| Prop Name | Type | Required | Default | Description |
|---|---|---|---|---|
| `onSelectCard` | `PropTypes.func` | No | `undefined` | Callback triggered when a carousel card is selected. |

---

### HeroSection

**Path:** `src/components/HeroSection.jsx`  
**Description:** Asymmetric editorial hero section integrating stacked typography, GSAP entrance animations, `HeroCarousel`, and bottom infinite ticker marquee.

#### Props
| Prop Name | Type | Required | Default | Description |
|---|---|---|---|---|
| `onEnterMindscape` | `PropTypes.func` | No | `undefined` | Callback to scroll down to spatial constellation section. |
| `onSelectCard` | `PropTypes.func` | No | `undefined` | Callback when a carousel card is selected. |

---

### VibeRealms

**Path:** `src/components/VibeRealms.jsx`  
**Description:** Catalogue of synchronous acoustic realms with real-time presence counts and Solfeggio soundscape integration (432Hz/528Hz ambient drones).

#### Props
| Prop Name | Type | Required | Default | Description |
|---|---|---|---|---|
| `onSelectNode` | `PropTypes.func` | No | `undefined` | Callback when selecting a thought fragment within a realm. |
| `allNodes` | `PropTypes.array` | No | `[]` | Array of thought nodes. |

---

### MindfulSanctuary

**Path:** `src/components/MindfulSanctuary.jsx`  
**Description:** Guided Solfeggio acoustic breathing sanctuary (432Hz inhale / 528Hz hold / 396Hz exhale) with session departure feature.

---

## Custom Hooks Reference

### `useNavigationRoute(dependencyKey)`
- Returns `{ currentPath, isPageTransitioning, setIsPageTransitioning, handleNavigateRoute }`.
- Normalizes URL paths and handles client-side single page transitions.

### `useScrollReveal(dependencyKey)`
- Uses `IntersectionObserver` to trigger CSS reveal classes (`is-revealed`) on elements with `data-scroll-reveal`.

### `useParallaxGlide(dependencyKey)`
- Computes 60fps hardware-accelerated image parallax translations during scrolling.

### `useScrollDirection()`
- Observes vertical scroll direction and sets `data-scroll-dir="up|down"` attribute on `document.body`.
