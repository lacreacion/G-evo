'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { 
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
      {/* Barra de Menú Principal - Colores y Sombras Exactas de la Imagen */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#CCD1D5] border-b border-[#BAC0C5] transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-[68px] flex items-center justify-between">
          
          {/* 1. Logotipo Oficial con Colores y Relieve 3D Exactos */}
          <Logo size="md" />

          {/* 2. Navegación Central */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-3 text-sm font-medium text-[#374151]">
            
            {/* Inicio */}
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg text-[#374151] hover:text-[#0E8A54] transition-colors"
            >
              Inicio
            </Link>

            {/* Servicios con Menú Desplegable */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
                  servicesDropdownOpen
                    ? 'bg-white text-[#0E8A54] font-bold shadow-[0_4px_14px_rgba(0,0,0,0.08)]'
                    : 'text-[#374151] hover:text-[#0E8A54]'
                }`}
              >
                <span>Servicios</span>
                <span className={`text-[10px] ml-0.5 transition-transform ${servicesDropdownOpen ? 'rotate-180 text-[#DCA81A]' : 'text-gray-500'}`}>
                  ▼
                </span>
              </button>

              {/* Tarjeta Desplegable de Servicios */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 p-2.5 z-50 animate-fadeIn">
                  <div className="space-y-1">
                    
                    {/* Servicio 1 */}
                    <button
                      onClick={() => handleServiceClick('servicios-tarjetas')}
                      className="w-full p-2.5 rounded-xl hover:bg-[#E6F9F0] flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#D1FAE5] text-[#0E8A54] flex items-center justify-center shrink-0">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111827] group-hover:text-[#0E8A54]">
                            Tarjetas Digitales (NFC &amp; QR)
                          </div>
                          <div className="text-[11px] text-[#6B7280]">
                            Conexión instantánea sin papel
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0E8A54] shrink-0" />
                    </button>

                    {/* Servicio 2 */}
                    <button
                      onClick={() => handleServiceClick('servicios-catalogos')}
                      className="w-full p-2.5 rounded-xl hover:bg-[#E6F9F0] flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#D1FAE5] text-[#0E8A54] flex items-center justify-center shrink-0">
                          <ShoppingBag className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111827] group-hover:text-[#0E8A54]">
                            Catálogos E-commerce
                          </div>
                          <div className="text-[11px] text-[#6B7280]">
                            Pedidos directos a WhatsApp
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0E8A54] shrink-0" />
                    </button>

                    {/* Servicio 3 */}
                    <button
                      onClick={() => handleServiceClick('servicios-menus')}
                      className="w-full p-2.5 rounded-xl hover:bg-[#E6F9F0] flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#D1FAE5] text-[#0E8A54] flex items-center justify-center shrink-0">
                          <UtensilsCrossed className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111827] group-hover:text-[#0E8A54]">
                            Menús y Vitrinas Digitales
                          </div>
                          <div className="text-[11px] text-[#6B7280]">
                            Experiencia visual gastronómica
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0E8A54] shrink-0" />
                    </button>

                    {/* Servicio 4 */}
                    <button
                      onClick={() => handleServiceClick('servicios-ia')}
                      className="w-full p-2.5 rounded-xl hover:bg-[#E6F9F0] flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#D1FAE5] text-[#0E8A54] flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111827] group-hover:text-[#0E8A54]">
                            Agente de Soporte IA 24/7
                          </div>
                          <div className="text-[11px] text-[#6B7280]">
                            Atención automática de stock
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0E8A54] shrink-0" />
                    </button>

                  </div>
                </div>
              )}
            </div>

            {/* Agente de IA */}
            <Link
              href="#ai-demo"
              className="px-3 py-1.5 rounded-lg text-[#374151] hover:text-[#0E8A54] transition-colors"
            >
              Agente de IA
            </Link>

            {/* Quiénes somos - Píldora Activa Exacta con Sombra y Flecha Dorada ▲ */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="px-4 py-2 rounded-full bg-white text-[#0E8A54] font-bold text-sm shadow-[0_4px_16px_rgba(255,255,255,0.9),0_2px_8px_rgba(0,0,0,0.08)] flex items-center gap-1.5 cursor-pointer border border-white"
              >
                <span>Quiénes somos</span>
                <span className="text-[10px] text-[#DCA81A] font-extrabold ml-0.5">
                  ▲
                </span>
              </button>

              {/* Ventana Flotante Exacta con Resplandor Blanco */}
              {aboutDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-76 bg-white rounded-[24px] shadow-[0_20px_45px_rgba(0,0,0,0.12),0_0_25px_rgba(255,255,255,0.8)] border border-gray-100 p-3 z-50 animate-fadeIn">
                  <div className="space-y-1.5">
                    
                    {/* Visión (Resaltado con Fondo Pastel Degradado) */}
                    <button
                      onClick={() => openCorporateModal('vision')}
                      className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-[#E6F9F0] via-[#F4FBF0] to-[#FFFBEB] border border-emerald-200/50 flex items-center justify-between text-left transition-all hover:scale-[1.01] cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#D1FAE5] text-[#0E8A54] flex items-center justify-center shrink-0">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111827]">
                            Visión
                          </div>
                          <div className="text-[11px] text-[#6B7280]">
                            El futuro que queremos crear
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#A855F7] shrink-0" />
                    </button>

                    {/* Misión */}
                    <button
                      onClick={() => openCorporateModal('mision')}
                      className="w-full p-2.5 rounded-2xl hover:bg-gray-50 flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#F0FDF4] text-[#10B981] flex items-center justify-center shrink-0">
                          <Target className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111827] group-hover:text-[#0E8A54]">
                            Misión
                          </div>
                          <div className="text-[11px] text-[#6B7280]">
                            Lo que hacemos cada día
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#0E8A54] shrink-0" />
                    </button>

                    {/* Historia */}
                    <button
                      onClick={() => openCorporateModal('historia')}
                      className="w-full p-2.5 rounded-2xl hover:bg-gray-50 flex items-center justify-between text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#F0FDF4] text-[#10B981] flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111827] group-hover:text-[#0E8A54]">
                            Historia
                          </div>
                          <div className="text-[11px] text-[#6B7280]">
                            La idea detrás de G-evo
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#0E8A54] shrink-0" />
                    </button>

                  </div>
                </div>
              )}
            </div>

          </nav>

          {/* 3. Extremo Derecho: Facebook, Instagram y Portal Clientes */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Botón Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06),0_0_8px_rgba(255,255,255,0.8)] flex items-center justify-center text-[#1E293B] hover:text-[#1877F2] hover:scale-105 transition-all cursor-pointer border border-white"
              aria-label="Facebook de G-evo"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>

            {/* Botón Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06),0_0_8px_rgba(255,255,255,0.8)] flex items-center justify-center text-[#1E293B] hover:text-[#E4405F] hover:scale-105 transition-all cursor-pointer border border-white"
              aria-label="Instagram de G-evo"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            {/* Botón Portal Clientes */}
            <Link
              href="/login"
              className="px-4 py-2 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.08),0_0_10px_rgba(255,255,255,0.9)] text-xs sm:text-sm font-semibold text-[#1E293B] hover:text-[#0E8A54] flex items-center gap-1.5 hover:scale-[1.02] transition-all cursor-pointer border border-white group"
            >
              <span>Portal clientes</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0E8A54] transition-colors" />
            </Link>

          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white shadow-sm text-gray-700 hover:text-black border border-gray-200"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile Menu */}
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

              <div className="p-2 border-t border-gray-100">
                <div className="text-xs uppercase font-bold text-[#0E8A54] mb-1">
                  Servicios
                </div>
                <div className="space-y-1 pl-2">
                  <button
                    onClick={() => handleServiceClick('servicios-tarjetas')}
                    className="w-full text-left py-1 text-xs text-gray-600 hover:text-[#0E8A54]"
                  >
                    • Tarjetas Digitales (NFC &amp; QR)
                  </button>
                  <button
                    onClick={() => handleServiceClick('servicios-catalogos')}
                    className="w-full text-left py-1 text-xs text-gray-600 hover:text-[#0E8A54]"
                  >
                    • Catálogos E-commerce Autónomos
                  </button>
                  <button
                    onClick={() => handleServiceClick('servicios-menus')}
                    className="w-full text-left py-1 text-xs text-gray-600 hover:text-[#0E8A54]"
                  >
                    • Menús y Vitrinas Digitales
                  </button>
                  <button
                    onClick={() => handleServiceClick('servicios-ia')}
                    className="w-full text-left py-1 text-xs text-gray-600 hover:text-[#0E8A54]"
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

              <div className="p-2 border-t border-gray-100">
                <div className="text-xs uppercase font-bold text-[#0E8A54] mb-2">
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
                  className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-700"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-full bg-[#0E8A54] text-white font-bold text-xs flex items-center gap-1.5"
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
