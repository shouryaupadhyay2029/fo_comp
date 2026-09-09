// Web Audio API Ambient Synthesizer for VELOURA / SYNAPSE

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.osc = null;
    this.gainNode = null;
    this.activeTone = null;
  }

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
    } catch (e) {
      // Graceful fallback when user gesture is required by browser autoplay policies
    }
  }

  playHover(freq = 432) {
    this.playTone(freq, 0.18);
  }

  playClick(freq = 528) {
    this.playTone(freq, 0.35);
  }

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
      gainNode.connect(this.ctx.destination);

      this.osc.start();
      this.activeTone = freq;
    } catch (e) {
      console.warn('Audio playback waiting for user interaction gesture.');
    }
  }

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
      } catch (e) {
        this.osc = null;
      }
    }
  }
}

export const synth = new SoundSynthesizer();
