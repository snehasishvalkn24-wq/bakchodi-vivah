/**
 * Audio synthesis helper to play a soft, soothing tanpura/harp chime
 * when users click to preview an Indian voice bio or prompt.
 */

let audioCtx: AudioContext | null = null;

export function playAudioPreviewNote(duration = 2.5) {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const notes = [220, 277.18, 329.63, 440]; // A3, C#4, E4, A4 (A major resonant Indian tanpura harmony)

    notes.forEach((freq, idx) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.15);

      gain.gain.setValueAtTime(0.001, now + idx * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.15 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + idx * 0.15);
      osc.stop(now + duration + 0.5);
    });
  } catch {
    // Audio context may be restricted by autoplay policy; silent fail
  }
}
