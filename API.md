# 🔌 VELOURA API & Data Schema Reference

> **Data Specs, Synapse Node Schemas, Solfeggio Audio Frequencies, & State Contracts**

---

## 📄 Synapse Data Engine Schemas

### `ThoughtNode` Object Schema
Every spatial node rendered on the 2D constellation canvas conforms to the following strict specification:

```typescript
interface ThoughtNode {
  id: string;                // Unique node identifier (e.g. 'node-1')
  title: string;             // Primary thought headline
  creator: string;           // Author / contributor name
  avatar: string;            // Avatar image URL
  category: string;          // Category sphere key ('philosophy' | 'creativity' | 'mindfulness' | 'future')
  resonanceCount: number;    // Qualitative resonance counter
  perspectivesCount: number; // Count of user perspectives offered
  evolutionCount: number;    // Count of branched thought evolutions
  shortSentence: string;     // Thesis sentence summary
  content: string;           // Extended editorial essay text
  tags: string[];            // Related topic tags array
  x: number;                 // Spatial X coordinate on 2D constellation canvas plane
  y: number;                 // Spatial Y coordinate on 2D constellation canvas plane
  radius: number;            // Rendered canvas node circle radius in pixels
  color: string;             // Hex color code token
  audioFrequency: number;    // Solfeggio frequency tone in Hertz (e.g. 432, 528, 639)
  perspectives: Array<{
    author: string;
    text: string;
  }>;
  connections: Array<{
    targetId: string;
    type: 'conceptual' | 'resonance' | 'creative';
    label: string;
  }>;
}
```

---

## 🎵 Solfeggio Audio Frequency Matrix

VELOURA replaces standard audio notifications with sacred harmonic Solfeggio frequencies generated via the Web Audio API (`src/utils/audio.js`):

| Frequency (Hz) | Solfeggio Realm | Cognitive Purpose | Trigger Condition |
|---|---|---|---|
| **396 Hz** | Liberation | Exhale breath phase | `MindfulSanctuary` breathing cycle |
| **432 Hz** | Deep Harmony | Organic thought resonance | Constellation node select, Inhale phase |
| **528 Hz** | Transformation | Perspective weaving | Manifesto section hover, Hold breath phase |
| **639 Hz** | Social Connection | Synchronous co-presence | Vibe Realm environment active drone |
| **741 Hz** | Intuitive Clarity | Serendipity discovery | Intellectual serendipity modal launch |

---

## 💾 LocalStorage Persistence Protocol

VELOURA state is persisted in client browser storage without requiring third-party telemetry:

| Key Format | Type | Description |
|---|---|---|
| `aetheria_resonate_{id}` | `boolean` | Stores user resonance status for node `id`. |
| `aetheria_persp_{id}` | `JSON string` | Persists user-offered perspectives for node `id`. |
| `aetheria_evol_{id}` | `JSON string` | Persists branched thought evolutions for node `id`. |

---

## 🛠️ Web Audio API Engine (`SoundSynthesizer`)

### Methods

#### `synth.playTone(freq?: number, duration?: number): void`
Plays a discrete sine wave acoustic tone with smooth linear attack envelope and exponential decay.

#### `synth.playHover(freq?: number): void`
Short acoustic tick feedback (0.18s duration).

#### `synth.startAmbientDrone(freq?: number): void`
Starts a continuous triangle wave ambient Solfeggio soundscape drone with 1.5s fade-in.

#### `synth.stopAmbientDrone(): void`
Stops the active ambient drone with 0.5s exponential fade-out.
