'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { FacebookIcon, InstagramIcon } from '@/components/common/SocialIcons';
import { 
  ChevronDown, 
  Sparkles, 
  Compass, 
  Target, 
  BookOpen, 
  Menu, 
  X, 
  LogIn,
  ArrowUpRight
} from 'lucide-react';
import { CorporateModal, CorporateTab } from '@/components/modals/CorporateModal';

export const FloatingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCorporateTab, setActiveCorporateTab] = useState<CorporateTab>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openCorporateModal = (tab: 'vision' | 'mision' | 'historia') => {
    setActiveCorporateTab(tab);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating Navbar Container */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 md:pt-6 transition-all duration-300">
        <nav
          className={`w-full max-w-6xl rounded-2xl px-5 py-3 md:px-7 md:py-3.5 transition-all duration-300 flex items-center justify-between gevo-header-bar ${
            isScrolled
              ? 'shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
              : 'shadow-lg'
          }`}
        >
          {/* Logo Principal con colores oficiales G-evo (Regla de Oro intacta) */}
          <Logo size="md" />

          {/* Menú de Navegación Desktop con Botones Soft UI Blanco Luminoso + Hover Seda Esmeralda */}
          <div className="hidden lg:flex items-center gap-2.5 text-xs font-semibold text-[#2C3531]">
            <Link
              href="/"
              className="gevo-keycap-idle px-3.5 py-2 text-xs"
            >
              Inicio
            </Link>

            <Link
              href="#servicios"
              className="gevo-keycap-idle px-3.5 py-2 text-xs"
            >
              Servicios
            </Link>

            <Link
              href="#ai-demo"
              className="gevo-keycap-idle px-3.5 py-2 text-xs gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#157A54]" />
              <span>Agente IA</span>
            </Link>

            {/* Menú Desplegable Interactivo: Quiénes Somos (Visión, Misión, Historia) */}
            <div className="relative group/nav">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className="gevo-keycap-idle px-3.5 py-2 text-xs gap-1 cursor-pointer"
              >
                <span>Quiénes Somos</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#157A54] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Window Popover con Tarjetas Soft UI Blanco Luminoso (Imagen 3 + Hover Imagen 2) */}
              {dropdownOpen && (
                <div
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 p-3 gevo-chassis animate-fadeIn space-y-2.5"
                >
                  <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300 border-b border-white/10">
                    Conoce el Ecosistema G-evo
                  </div>

                  {/* Tarjeta 1: Visión (Réplica 1:1 de Imagen 3 + Hover Imagen 2) */}
                  <button
                    onClick={() => openCorporateModal('vision')}
                    className="w-full text-left cursor-pointer flex items-center justify-between gap-3 group relative bg-gradient-to-r from-[#E5F8EF] via-[#FFFFFF] to-[#FFF6DE] border border-[#BCE0CC] rounded-2xl p-4 shadow-[inset_0_3px_6px_rgba(20,80,50,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#22C58B] hover:shadow-[0_12px_30px_-4px_rgba(23,165,117,0.75),0_0_20px_4px_rgba(0,122,83,0.6),inset_0_2px_4px_rgba(255,255,255,0.9)]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-[#DDF8EC] text-[#157A54] flex items-center justify-center shrink-0 group-hover:-rotate-6 transition-transform duration-300 shadow-xs">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#2C3531]">
                          Visión
                        </div>
                        <div className="text-xs text-[#6E7873] line-clamp-1">
                          El futuro que queremos crear
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#A389F4] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  {/* Tarjeta 2: Misión (Soft UI Blanco Luminoso + Hover Seda Esmeralda) */}
                  <button
                    onClick={() => openCorporateModal('mision')}
                    className="w-full text-left cursor-pointer flex items-center justify-between gap-3 group relative bg-gradient-to-r from-[#E5F8EF] via-[#FFFFFF] to-[#FFF6DE] border border-[#BCE0CC] rounded-2xl p-4 shadow-[inset_0_3px_6px_rgba(20,80,50,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#22C58B] hover:shadow-[0_12px_30px_-4px_rgba(23,165,117,0.75),0_0_20px_4px_rgba(0,122,83,0.6),inset_0_2px_4px_rgba(255,255,255,0.9)]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-[#DDF8EC] text-[#157A54] flex items-center justify-center shrink-0 group-hover:-rotate-6 transition-transform duration-300 shadow-xs">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#2C3531]">
                          Misión
                        </div>
                        <div className="text-xs text-[#6E7873] line-clamp-1">
                          Propósito y valor comercial
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#A389F4] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  {/* Tarjeta 3: Historia (Soft UI Blanco Luminoso + Hover Seda Esmeralda) */}
                  <button
                    onClick={() => openCorporateModal('historia')}
                    className="w-full text-left cursor-pointer flex items-center justify-between gap-3 group relative bg-gradient-to-r from-[#E5F8EF] via-[#FFFFFF] to-[#FFF6DE] border border-[#BCE0CC] rounded-2xl p-4 shadow-[inset_0_3px_6px_rgba(20,80,50,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#22C58B] hover:shadow-[0_12px_30px_-4px_rgba(23,165,117,0.75),0_0_20px_4px_rgba(0,122,83,0.6),inset_0_2px_4px_rgba(255,255,255,0.9)]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-[#DDF8EC] text-[#157A54] flex items-center justify-center shrink-0 group-hover:-rotate-6 transition-transform duration-300 shadow-xs">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#2C3531]">
                          Historia
                        </div>
                        <div className="text-xs text-[#6E7873] line-clamp-1">
                          Génesis de la evolución dorada
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#A389F4] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              )}
            </div>

            <Link
              href="#contacto"
              className="gevo-keycap-idle px-3.5 py-2 text-xs"
            >
              Contacto
            </Link>
          </div>

          {/* Redes Sociales + Botón Portal Clientes */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Botón Oficial de Facebook con efecto glow y elevación */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar Facebook oficial de G-evo"
              title="Síguenos en Facebook"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-300 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white hover:shadow-[0_0_16px_rgba(24,119,242,0.55)] group/fb"
            >
              <FacebookIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover/fb:scale-110" />
            </a>

            {/* Botón Oficial de Instagram con efecto gradiente, giro y glow */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar Instagram oficial de G-evo"
              title="Síguenos en Instagram"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-300 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:border-pink-500/60 hover:text-white hover:shadow-[0_0_16px_rgba(236,72,153,0.55)] group/ig"
            >
              <InstagramIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover/ig:scale-110 group-hover/ig:rotate-6" />
            </a>

            {/* Botón Portal Clientes con Soft UI Blanco Luminoso + Hover Seda Esmeralda */}
            <Link
              href="/login"
              className="gevo-keycap-active px-4 py-2 text-xs gap-1.5"
              title="Portal de Gestión para Clientes"
            >
              <LogIn className="w-3.5 h-3.5 text-[#157A54]" />
              <span>Portal Clientes</span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-4 right-4 p-5 gevo-chassis animate-fadeIn space-y-4">
            <div className="flex flex-col gap-3 text-sm font-medium text-gray-200">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg"
              >
                Inicio
              </Link>
              <Link
                href="#servicios"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg"
              >
                Servicios
              </Link>
              <Link
                href="#ai-demo"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Demostración Agente IA</span>
              </Link>

              {/* Opciones Institucionales en Mobile (Tarjetas Soft UI Blanco Luminoso + Hover Seda Esmeralda) */}
              <div className="pt-2 border-t border-white/10">
                <div className="text-xs uppercase font-bold text-amber-400 px-2 py-1">
                  Quiénes Somos (G-evo)
                </div>
                <div className="flex flex-col gap-2.5 mt-2">
                  <button
                    onClick={() => openCorporateModal('vision')}
                    className="w-full text-left flex items-center justify-between gap-3 group relative bg-gradient-to-r from-[#E5F8EF] via-[#FFFFFF] to-[#FFF6DE] border border-[#BCE0CC] rounded-2xl p-3.5 shadow-[inset_0_3px_6px_rgba(20,80,50,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#22C58B] hover:shadow-[0_12px_30px_-4px_rgba(23,165,117,0.75),0_0_20px_4px_rgba(0,122,83,0.6),inset_0_2px_4px_rgba(255,255,255,0.9)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#DDF8EC] text-[#157A54] flex items-center justify-center shrink-0 group-hover:-rotate-6 transition-transform">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#2C3531]">Visión</div>
                        <div className="text-[11px] text-[#6E7873]">El futuro que queremos crear</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#A389F4]" />
                  </button>
                  <button
                    onClick={() => openCorporateModal('mision')}
                    className="w-full text-left flex items-center justify-between gap-3 group relative bg-gradient-to-r from-[#E5F8EF] via-[#FFFFFF] to-[#FFF6DE] border border-[#BCE0CC] rounded-2xl p-3.5 shadow-[inset_0_3px_6px_rgba(20,80,50,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#22C58B] hover:shadow-[0_12px_30px_-4px_rgba(23,165,117,0.75),0_0_20px_4px_rgba(0,122,83,0.6),inset_0_2px_4px_rgba(255,255,255,0.9)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#DDF8EC] text-[#157A54] flex items-center justify-center shrink-0 group-hover:-rotate-6 transition-transform">
                        <Target className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#2C3531]">Misión</div>
                        <div className="text-[11px] text-[#6E7873]">Propósito y valor comercial</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#A389F4]" />
                  </button>
                  <button
                    onClick={() => openCorporateModal('historia')}
                    className="w-full text-left flex items-center justify-between gap-3 group relative bg-gradient-to-r from-[#E5F8EF] via-[#FFFFFF] to-[#FFF6DE] border border-[#BCE0CC] rounded-2xl p-3.5 shadow-[inset_0_3px_6px_rgba(20,80,50,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#22C58B] hover:shadow-[0_12px_30px_-4px_rgba(23,165,117,0.75),0_0_20px_4px_rgba(0,122,83,0.6),inset_0_2px_4px_rgba(255,255,255,0.9)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#DDF8EC] text-[#157A54] flex items-center justify-center shrink-0 group-hover:-rotate-6 transition-transform">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#2C3531]">Historia</div>
                        <div className="text-[11px] text-[#6E7873]">Génesis de la evolución dorada</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#A389F4]" />
                  </button>
                </div>
              </div>

              <Link
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg"
              >
                Contacto
              </Link>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
              {/* Redes Sociales antes de Portal Clientes en Mobile */}
              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visitar Facebook oficial de G-evo"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-300 transition-all duration-300 hover:scale-110 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white hover:shadow-[0_0_16px_rgba(24,119,242,0.55)]"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visitar Instagram oficial de G-evo"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-300 transition-all duration-300 hover:scale-110 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:border-pink-500/60 hover:text-white hover:shadow-[0_0_16px_rgba(236,72,153,0.55)]"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 text-xs font-bold text-black flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-black" />
                <span>Portal Clientes</span>
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
