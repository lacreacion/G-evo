'use client';

import React from 'react';
import Header from '@/components/Header';
import StoriesCarousel from '@/components/StoriesCarousel';
import HeroBanner from '@/components/HeroBanner';
import ProductCatalog from '@/components/ProductCatalog';
import CartDrawer from '@/components/CartDrawer';
import FloatingCartButton from '@/components/FloatingCartButton';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import SocialProofToast from '@/components/SocialProofToast';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div>
        <Header />

        <main className="container">
          {/* Carrusel de Historias estilo Instagram */}
          <StoriesCarousel />

          {/* Catálogo de Cajas de Dulces */}
          <div className="animate-in fade-in duration-300">
            <HeroBanner />
            <ProductCatalog />
          </div>
        </main>
      </div>

      {/* Componentes Flotantes y Cajones Globales */}
      <CartDrawer />
      <FloatingCartButton />
      <FloatingWhatsApp />
      <SocialProofToast />
      <Footer />
    </div>
  );
}

