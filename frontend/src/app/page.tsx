import React from 'react';
import { FloatingNavbar } from '@/components/navigation/FloatingNavbar';
import { HeroSection } from '@/components/home/HeroSection';
import { StoriesSection } from '@/components/home/StoriesSection';
import { CascadeServices } from '@/components/home/CascadeServices';
import { PublicShowcase } from '@/components/home/PublicShowcase';
import { AiSupportDemo } from '@/components/home/AiSupportDemo';
import { Footer } from '@/components/footer/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen gevo-ambient-bg">
      {/* 1. Barra de Navegación Flotante con Sombras & Ventanas Modales */}
      <FloatingNavbar />

      <main>
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
      <Footer />
    </div>
  );
}
