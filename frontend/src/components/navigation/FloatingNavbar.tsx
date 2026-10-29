'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { 
  ChevronDown, 
  ChevronUp,
  ArrowUpRight, 
  Menu, 
  X,
  CreditCard,
  ShoppingBag,
  UtensilsCrossed,
  Bot,
  Compass,
  Target,
  BookOpen
} from 'lucide-react';
import { FacebookIcon, InstagramIcon } from '@/components/common/SocialIcons';
import { CorporateModal, CorporateTab } from '@/components/modals/CorporateModal';

export const FloatingNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [activeCorporateTab, setActiveCorporateTab] = useState<CorporateTab>(null);

  const openCorporateModal = (tab: 'vision' | 'mision' | 'historia') => {
    setActiveCorporateTab(tab);
    setAboutDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleServiceClick = (targetId: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Barra de Menú Principal - Diseño y Colores Fieles a la Referencia */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#E6E9EE]/95 backdrop-blur-md border-b border-[#D3D7DD] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-[70px] flex items-center justify-between">
          
          {/* 1. Logotipo Oficial G-evo en el Extremo Izquierdo */}
          <Logo size="md" />

          {/* 2. Menú de Navegación Central (Desktop) */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 text-sm font-medium text-gray-700">
            
            {/* Inicio */}
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg hover:text-emerald-600 transition-colors"
            >
              Inicio
            </Link>

            {/* Servicios con Menú Desplegable Flotante */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
                  servicesDropdownOpen
                    ? 'bg-white text-emerald-600 font-bold pill-button-shadow'
                    : 'hover:text-emerald-600 text-gray-700'
                }`}
              >
                <span>Servicios</span>
                {servicesDropdownOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                )}
              </button>

              {/* Tarjeta Desplegable de Servicios */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl dropdown-card-shadow border border-gray-100 p-2.5 z-50 animate-fadeIn">
                  <div className="space-y-1">
                    
                    {/* Servicio 1: Tarjetas Digitales */}
                    <button
                      onClick={() => handleServiceClick('servicios-tarjetas')}
                      className="w-full p-2.5 rounded-xl hover:bg-emerald-50/60 flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700">
                            Tarjetas Digitales (NFC &amp; QR)
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Conexión instantánea sin papel
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 shrink-0" />
                    </button>

                    {/* Servicio 2: Catálogos E-commerce */}
                    <button
                      onClick={() => handleServiceClick('servicios-catalogos')}
                      className="w-full p-2.5 rounded-xl hover:bg-emerald-50/60 flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                          <ShoppingBag className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700">
                            Catálogos E-commerce
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Pedidos directos a WhatsApp
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 shrink-0" />
                    </button>

                    {/* Servicio 3: Menús Digitales */}
                    <button
                      onClick={() => handleServiceClick('servicios-menus')}
                      className="w-full p-2.5 rounded-xl hover:bg-emerald-50/60 flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                          <UtensilsCrossed className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700">
                            Menús y Vitrinas Digitales
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Experiencia visual gastronómica
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 shrink-0" />
                    </button>

                    {/* Servicio 4: Agente de Soporte IA */}
                    <button
                      onClick={() => handleServiceClick('servicios-ia')}
                      className="w-full p-2.5 rounded-xl hover:bg-emerald-50/60 flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700">
                            Agente de Soporte IA 24/7
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Atención automática de stock
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 shrink-0" />
                    </button>

                  </div>
                </div>
              )}
            </div>

            {/* Agente de IA */}
            <Link
              href="#ai-demo"
              className="px-3 py-1.5 rounded-lg hover:text-emerald-600 transition-colors"
            >
              Agente de IA
            </Link>

            {/* Quiénes somos (Píldora Activa con Menú Desplegable Idéntico a la Imagen) */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="px-4 py-1.5 rounded-full bg-white text-emerald-600 font-bold text-sm pill-button-shadow flex items-center gap-1.5 border border-white/80 cursor-pointer"
              >
                <span>Quiénes somos</span>
                {aboutDropdownOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-emerald-600" />
                )}
              </button>

              {/* Ventana Flotante Idéntica a la Imagen de Referencia */}
              {aboutDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl dropdown-card-shadow border border-gray-100 p-2.5 z-50 animate-fadeIn">
                  <div className="space-y-1">
                    
                    {/* Visión */}
                    <button
                      onClick={() => openCorporateModal('vision')}
                      className="w-full p-2.5 rounded-xl hover:bg-emerald-50/60 flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700">
                            Visión
                          </div>
                          <div className="text-[11px] text-gray-500">
                            El futuro que queremos crear
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </button>

                    {/* Misión */}
                    <button
                      onClick={() => openCorporateModal('mision')}
                      className="w-full p-2.5 rounded-xl hover:bg-emerald-50/60 flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <Target className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700">
                            Misión
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Lo que hacemos cada día
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </button>

                    {/* Historia */}
                    <button
                      onClick={() => openCorporateModal('historia')}
                      className="w-full p-2.5 rounded-xl hover:bg-emerald-50/60 flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700">
                            Historia
                          </div>
                          <div className="text-[11px] text-gray-500">
                            La idea detrás de G-evo
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </button>

                  </div>
                </div>
              )}
            </div>

          </nav>

          {/* 3. Extremo Derecho: Botones de Facebook, Instagram y Portal Clientes */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Botón Facebook (Píldora Redonda Blanca) */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white pill-button-shadow flex items-center justify-center text-gray-700 hover:text-blue-600 hover:scale-105 transition-all border border-gray-100/60 cursor-pointer"
              aria-label="Ir a Facebook de G-evo"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>

            {/* Botón Instagram (Píldora Redonda Blanca) */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white pill-button-shadow flex items-center justify-center text-gray-700 hover:text-pink-600 hover:scale-105 transition-all border border-gray-100/60 cursor-pointer"
              aria-label="Ir a Instagram de G-evo"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            {/* Botón Portal Clientes (Píldora Blanca Destacada con Flecha ↗) */}
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-white pill-button-shadow text-xs sm:text-sm font-semibold text-gray-800 hover:text-emerald-600 flex items-center gap-1.5 border border-gray-100/60 hover:scale-[1.02] transition-all cursor-pointer group"
            >
              <span>Portal clientes</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
            </Link>

          </div>

          {/* Botón Hamburguesa en Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white pill-button-shadow text-gray-700 hover:text-black border border-gray-200"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Menú Desplegable Responsivo para Móviles */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-5 py-4 space-y-4 shadow-xl animate-fadeIn">
            <div className="flex flex-col gap-2 text-sm font-semibold text-gray-700">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                Inicio
              </Link>

              {/* Servicios en Mobile */}
              <div className="p-2 border-t border-gray-100">
                <div className="text-xs uppercase font-bold text-emerald-600 mb-1">
                  Servicios
                </div>
                <div className="space-y-1 pl-2">
                  <button
                    onClick={() => handleServiceClick('servicios-tarjetas')}
                    className="w-full text-left py-1 text-xs text-gray-600 hover:text-emerald-600"
                  >
                    • Tarjetas Digitales (NFC &amp; QR)
                  </button>
                  <button
                    onClick={() => handleServiceClick('servicios-catalogos')}
                    className="w-full text-left py-1 text-xs text-gray-600 hover:text-emerald-600"
                  >
                    • Catálogos E-commerce Autónomos
                  </button>
                  <button
                    onClick={() => handleServiceClick('servicios-menus')}
                    className="w-full text-left py-1 text-xs text-gray-600 hover:text-emerald-600"
                  >
                    • Menús y Vitrinas Digitales
                  </button>
                  <button
                    onClick={() => handleServiceClick('servicios-ia')}
                    className="w-full text-left py-1 text-xs text-gray-600 hover:text-emerald-600"
                  >
                    • Agente de Soporte IA 24/7
                  </button>
                </div>
              </div>

              <Link
                href="#ai-demo"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                Agente de IA
              </Link>

              {/* Quiénes somos en Mobile */}
              <div className="p-2 border-t border-gray-100">
                <div className="text-xs uppercase font-bold text-emerald-600 mb-2">
                  Quiénes somos
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => openCorporateModal('vision')}
                    className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-center font-bold text-gray-700"
                  >
                    Visión ↗
                  </button>
                  <button
                    onClick={() => openCorporateModal('mision')}
                    className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-center font-bold text-gray-700"
                  >
                    Misión ↗
                  </button>
                  <button
                    onClick={() => openCorporateModal('historia')}
                    className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-center font-bold text-gray-700"
                  >
                    Historia ↗
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <span>Portal clientes</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Modal Popup para Visión, Misión e Historia */}
      <CorporateModal
        activeTab={activeCorporateTab}
        onClose={() => setActiveCorporateTab(null)}
        onSelectTab={(tab) => setActiveCorporateTab(tab)}
      />
    </>
  );
};
