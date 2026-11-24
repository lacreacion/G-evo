/**
 * Web Audio API Engine para Sweet House Candy Store
 * Síntesis armónica en tiempo real de chimes y pops de dulces sin archivos externos
 */

class CandySoundEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  constructor() {
    // Inicialización perezosa para respetar la política de autoplay del navegador
  }

  private initContext() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  /**
   * Arpegio dulce ascendente de 4 notas al agregar al carrito (C5 -> E5 -> G5 -> C6)
   */
  public playAddToCartSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [
        { freq: 523.25, time: 0.00, dur: 0.16 }, // C5
        { freq: 659.25, time: 0.06, dur: 0.18 }, // E5
        { freq: 783.99, time: 0.12, dur: 0.20 }, // G5
        { freq: 1046.50, time: 0.18, dur: 0.35 } // C6
      ];

      notes.forEach(({ freq, time, dur }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + time);

        gain.gain.setValueAtTime(0.001, now + time);
        gain.gain.exponentialRampToValueAtTime(0.25, now + time + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur);

        // Armónico brillante cristalino tipo azúcar
        const sparkle = this.ctx.createOscillator();
        const sparkleGain = this.ctx.createGain();
        sparkle.type = 'triangle';
        sparkle.frequency.setValueAtTime(freq * 2, now + time);

        sparkleGain.gain.setValueAtTime(0.001, now + time);
        sparkleGain.gain.exponentialRampToValueAtTime(0.07, now + time + 0.015);
        sparkleGain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur * 0.7);

        sparkle.connect(sparkleGain);
        sparkleGain.connect(this.ctx.destination);

        sparkle.start(now + time);
        sparkle.stop(now + time + dur * 0.7);
      });
    } catch (e) {
      console.warn('[SoundEngine] Error al reproducir audio de carrito:', e);
    }
  }

  /**
   * Pop juguetón al abrir el carrito o cambiar pestañas
   */
  public playBubblePopSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(920, now + 0.08);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * Celebración triunfal al confirmar pedido
   */
  public playCelebrationSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const chords = [
        [523.25, 659.25, 783.99],
        [587.33, 739.99, 880.00],
        [659.25, 830.61, 987.77],
        [783.99, 987.77, 1174.66, 1567.98]
      ];

      chords.forEach((chord, i) => {
        const chordTime = now + (i * 0.14);
        chord.forEach(freq => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, chordTime);

          const dur = i === chords.length - 1 ? 0.75 : 0.25;
          gain.gain.setValueAtTime(0.001, chordTime);
          gain.gain.exponentialRampToValueAtTime(0.16 / chord.length, chordTime + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, chordTime + dur);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(chordTime);
          osc.stop(chordTime + dur);
        });
      });
    } catch (e) {
      console.warn(e);
    }
  }
}

export const soundEngine = new CandySoundEngine();

