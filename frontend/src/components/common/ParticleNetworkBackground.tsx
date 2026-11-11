'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

/**
 * Fondo interactivo de partículas conectándose en movimiento suave (Red / Constelación G-evo)
 */
export const ParticleNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -9999,
      y: -9999,
      radius: 170,
    };

    const palette = [
      '52, 211, 153',  // Verde Esmeralda Luminoso (#34D399)
      '36, 210, 141',  // Jade G-evo (#24D28D)
      '167, 243, 208', // Menta Suave (#A7F3D0)
      '244, 193, 69',  // Destello Dorado Sutil (#F4C145)
    ];

    const createParticles = (): ParticleNode[] => {
      const count = Math.min(Math.max(Math.floor((width * height) / 16500), 48), 95);
      const nodes: ParticleNode[] = [];
      for (let i = 0; i < count; i++) {
        const isGold = i % 9 === 0;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.42,
          vy: (Math.random() - 0.5) * 0.42,
          radius: isGold ? Math.random() * 1.6 + 1.4 : Math.random() * 1.8 + 1.1,
          color: isGold ? palette[3] : palette[i % 3],
          alpha: Math.random() * 0.45 + 0.35,
        });
      }
      return nodes;
    };

    let particles = createParticles();
    const maxConnectDistance = 155;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = createParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Actualizar posiciones y dibujar nodos
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Rebote suave en los bordes de la ventana
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Dibujar partícula con halo sutil
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${p.color}, 0.55)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Conectar con partículas cercanas mediante líneas suaves
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            const lineOpacity = (1 - dist / maxConnectDistance) * 0.26;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(52, 211, 153, ${lineOpacity.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Conectar suavemente con el cursor si pasa cerca
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < mouse.radius) {
          const cursorLineOpacity = (1 - mDist / mouse.radius) * 0.34;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(110, 231, 183, ${cursorLineOpacity.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
};
