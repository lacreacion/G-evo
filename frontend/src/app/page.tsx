import React from 'react';
import { FloatingNavbar } from '@/components/navigation/FloatingNavbar';
import { HeroSection } from '@/components/home/HeroSection';
import { StoriesSection } from '@/components/home/StoriesSection';
import { CascadeServices } from '@/components/home/CascadeServices';
import { PublicShowcase } from '@/components/home/PublicShowcase';
import { AiSupportDemo } from '@/components/home/AiSupportDemo';
import { Footer } from '@/components/footer/Footer';
import { ParticleNetworkBackground } from '@/components/common/ParticleNetworkBackground';

export default function HomePage() {
  return (
    <div className="relative min-h-screen gevo-forest-bg text-[#F0F7F8] selection:bg-[#22C58B] selection:text-[#02140E]">
      {/* 0. Efecto Global de Partículas Conectándose en Movimiento Suave */}
      <ParticleNetworkBackground />

      {/* 1. Barra de Navegación Flotante con Sombras & Ventanas Modales */}
      <FloatingNavbar />

      <main className="relative z-10">
        {/* 2. Hero Section con Dinámica de Video Moderno y Animación Fluida */}
        <HeroSection />

        {/* 3. Módulo de Historias Sincronizadas (Instagram & Facebook) Inmediatamente Debajo del Hero */}
        <StoriesSection />

        {/* 4. Sección de Servicios con Efecto Cascada (4 Cajas con Video y Ventajas Competitivas) */}
        <CascadeServices />

        {/* 5. Mostrario Público de Ejemplos Reales (Autoridad de Marca) */}
        <PublicShowcase />

        {/* 6. Demostración y Modelo Comercial del Agente de Soporte IA 24/7 (Monetizado) */}
        <AiSupportDemo />
      </main>

      {/* 7. Footer con Soporte, Enlaces Sociales y Tarjeta de Contacto Interactiva (vCard) */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
