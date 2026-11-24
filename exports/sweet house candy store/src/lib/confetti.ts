import confetti from 'canvas-confetti';

const CANDY_PALETTE = [
  '#ff2a85', // Fresa Neón
  '#00f0ff', // Mora Eléctrica
  '#ffe600', // Limón Sol
  '#05ffa1', // Menta Ácida
  '#b537f2', // Uva Mágica
  '#ff7b00', // Naranja Jugosa
  '#ff69b4', // Chicle Rosa
  '#ffffff'  // Azúcar Glass
];

/**
 * Dispara una explosión de confeti de caramelos y estrellas en pantalla
 * @param originX Normalizado (0 a 1) o basado en coordenadas del click
 * @param originY Normalizado (0 a 1) o basado en coordenadas del click
 */
export function fireCandyConfetti(originX?: number, originY?: number, particleCount = 75) {
  if (typeof window === 'undefined') return;

  let x = 0.5;
  let y = 0.5;

  if (originX !== undefined && originY !== undefined) {
    x = Math.max(0.05, Math.min(0.95, originX / window.innerWidth));
    y = Math.max(0.05, Math.min(0.95, originY / window.innerHeight));
  }

  confetti({
    particleCount,
    angle: 90,
    spread: 80,
    origin: { x, y },
    colors: CANDY_PALETTE,
    ticks: 200,
    gravity: 0.85,
    scalar: 1.15,
    shapes: ['circle', 'square'],
    zIndex: 999999
  });
}

/**
 * Salva festiva desde ambos extremos para checkout confirmado
 */
export function fireCelebrationSalvo() {
  if (typeof window === 'undefined') return;

  const end = Date.now() + 1500;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: CANDY_PALETTE,
      zIndex: 999999
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: CANDY_PALETTE,
      zIndex: 999999
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

