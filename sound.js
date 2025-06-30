// sound.js
export function playDropSound() {
  playNote(['C2', 'D2', 'E2', 'G2', 'C3']);
}

export function playToggleSound() {
  playNote(['A3', 'B3', 'G3', 'D3']);
}

function playNote(noteOptions) {
  const randomNote =
    noteOptions[Math.floor(Math.random() * noteOptions.length)];

  const synth = new Tone.MembraneSynth({
    volume: -12,
    envelope: { attack: 0.001, decay: 0.2, sustain: 0.1, release: 0.4 },
  }).toDestination();

  Tone.start();
  synth.triggerAttackRelease(randomNote, '8n');
}
