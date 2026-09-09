/**
 * @fileoverview Web Audio API Acoustic Solfeggio Frequency Synthesizer.
 * @module audio
 * @description Provides Web Audio API synthesizers for 432Hz/528Hz Solfeggio acoustic tones, hover ticks, click feedback, and continuous ambient drones.
 * @author Frontend Odyssey Team
 */

/**
 * Web Audio API Acoustic Synthesizer Class.
 *
 * @class SoundSynthesizer
 */
class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.osc = null;
    this.gainNode = null;
    this.activeTone = null;
  }

  /**
   * Initializes or resumes the browser AudioContext instance safely upon user gesture.
   */
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  /**
   * Plays a discrete harmonic sine wave acoustic tone with smooth linear attack and exponential decay envelope.
   *
   * @param {number} [freq=432] Frequency pitch in Hertz (e.g. 432, 528, 639).
   * @param {number} [duration=1.2] Tone duration in seconds.
   */
  playTone(freq = 432, duration = 1.2) {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Smooth attack and decay envelope
      gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Graceful fallback when user gesture is required by browser autoplay policies
    }
  }

  /**
   * Plays a short acoustic hover tick tone.
   *
   * @param {number} [freq=432] Frequency pitch in Hertz.
   */
  playHover(freq = 432) {
    this.playTone(freq, 0.18);
  }

  /**
   * Plays an acoustic click feedback tone.
   *
   * @param {number} [freq=528] Frequency pitch in Hertz.
   */
  playClick(freq = 528) {
    this.playTone(freq, 0.35);
  }

  /**
   * Starts a continuous ambient background Solfeggio soundscape drone.
   *
   * @param {number} [freq=528] Target drone frequency pitch in Hertz.
   */
  startAmbientDrone(freq = 528) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.osc) this.stopAmbientDrone();

      this.osc = this.ctx.createOscillator();
      this.gainNode = this.ctx.createGain();

      this.osc.type = 'triangle';
      this.osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 1.5);

      this.osc.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.osc.start();
      this.activeTone = freq;
    } catch {
      // Graceful fallback when user gesture is required by browser autoplay policies
    }
  }

  /**
   * Stops the continuous ambient drone with smooth exponential volume fadeout.
   */
  stopAmbientDrone() {
    if (this.osc && this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          if (this.osc) {
            this.osc.stop();
            this.osc.disconnect();
            this.osc = null;
          }
        }, 500);
      } catch {
        this.osc = null;
      }
    }
  }
}

/**
 * Singleton instance of SoundSynthesizer exported for global audio triggers.
 */
export const synth = new SoundSynthesizer();
