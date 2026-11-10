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
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-3 sm:px-5 pt-4 md:pt-6 transition-all duration-300">
        <nav
          className={`w-[96%] max-w-[1480px] rounded-2xl px-6 py-3 md:px-10 md:py-3.5 transition-all duration-300 flex items-center justify-between gevo-header-bar ${
            isScrolled
              ? 'shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
              : 'shadow-lg'
          }`}
        >
          {/* Logo Principal con colores oficiales G-evo (Regla de Oro intacta) */}
          <Logo size="md" />

          {/* Menú de Navegación Desktop Minimalista con Pastilla Blanca Luminosa + Punto Dorado en Hover */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-12 text-sm font-semibold text-[#555E5A]">
            <Link
              href="/"
              className="group/item relative inline-flex flex-col items-center justify-center px-5 pt-2 pb-1.5 rounded-2xl border-[1.5px] border-transparent text-[#555E5A] transition-all duration-200 hover:bg-[#F3F6F4] hover:border-white hover:text-[#147A50] hover:shadow-[-4px_-4px_14px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.12)]"
            >
              <span>Inicio</span>
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#C59B27] opacity-0 scale-50 group-hover/item:opacity-100 group-hover/item:scale-100 transition-all duration-200" />
            </Link>

            <Link
              href="#servicios"
              className="group/item relative inline-flex flex-col items-center justify-center px-5 pt-2 pb-1.5 rounded-2xl border-[1.5px] border-transparent text-[#555E5A] transition-all duration-200 hover:bg-[#F3F6F4] hover:border-white hover:text-[#147A50] hover:shadow-[-4px_-4px_14px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.12)]"
            >
              <span>Servicios</span>
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#C59B27] opacity-0 scale-50 group-hover/item:opacity-100 group-hover/item:scale-100 transition-all duration-200" />
            </Link>

            <Link
              href="#ai-demo"
              className="group/item relative inline-flex flex-col items-center justify-center px-5 pt-2 pb-1.5 rounded-2xl border-[1.5px] border-transparent text-[#555E5A] transition-all duration-200 hover:bg-[#F3F6F4] hover:border-white hover:text-[#147A50] hover:shadow-[-4px_-4px_14px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.12)]"
            >
              <span>Agente IA</span>
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#C59B27] opacity-0 scale-50 group-hover/item:opacity-100 group-hover/item:scale-100 transition-all duration-200" />
            </Link>

            {/* Menú Desplegable Interactivo: Quiénes somos (Visión, Misión, Historia) */}
            <div className="relative group/nav">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`group/item relative inline-flex flex-col items-center justify-center px-5 pt-2 pb-1.5 rounded-2xl border-[1.5px] transition-all duration-200 cursor-pointer ${
                  dropdownOpen
                    ? 'bg-[#F3F6F4] border-white text-[#147A50] shadow-[-4px_-4px_14px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.12)]'
                    : 'border-transparent text-[#555E5A] hover:bg-[#F3F6F4] hover:border-white hover:text-[#147A50] hover:shadow-[-4px_-4px_14px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.12)]'
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span>Quiénes somos</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#B5892E] stroke-[2.5] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </span>
                <span className={`mt-1 w-1.5 h-1.5 rounded-full bg-[#C59B27] transition-all duration-200 ${
                  dropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover/item:opacity-100 group-hover/item:scale-100'
                }`} />
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
              className="group/item relative inline-flex flex-col items-center justify-center px-5 pt-2 pb-1.5 rounded-2xl border-[1.5px] border-transparent text-[#555E5A] transition-all duration-200 hover:bg-[#F3F6F4] hover:border-white hover:text-[#147A50] hover:shadow-[-4px_-4px_14px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.12)]"
            >
              <span>Contacto</span>
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#C59B27] opacity-0 scale-50 group-hover/item:opacity-100 group-hover/item:scale-100 transition-all duration-200" />
            </Link>
          </div>

          {/* Redes Sociales Squircle Blancos + Ícono Verde Esmeralda (Exacto a Segunda Imagen) + Portal Clientes */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Botón Oficial de Facebook (Squircle Blanco Luminoso + Ícono Verde #146343) */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar Facebook oficial de G-evo"
              title="Síguenos en Facebook"
              className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#F2F6F3] border-[1.5px] border-white text-[#146343] shadow-[0_0_16px_rgba(255,255,255,0.75),0_4px_10px_rgba(20,99,67,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:border-[#22C58B] hover:shadow-[0_10px_24px_-4px_rgba(23,165,117,0.65),0_0_16px_2px_rgba(0,122,83,0.45)] group/fb"
            >
              <FacebookIcon className="w-4 h-4 transition-transform duration-300 group-hover/fb:scale-110" />
            </a>

            {/* Botón Oficial de Instagram (Squircle Blanco Luminoso + Ícono Verde #146343) */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar Instagram oficial de G-evo"
              title="Síguenos en Instagram"
              className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#F2F6F3] border-[1.5px] border-white text-[#146343] shadow-[0_0_16px_rgba(255,255,255,0.75),0_4px_10px_rgba(20,99,67,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:border-[#22C58B] hover:shadow-[0_10px_24px_-4px_rgba(23,165,117,0.65),0_0_16px_2px_rgba(0,122,83,0.45)] group/ig"
            >
              <InstagramIcon className="w-4 h-4 transition-transform duration-300 group-hover/ig:scale-110" />
            </a>

            {/* Botón Portal Clientes */}
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#146343] rounded-2xl bg-[#F2F6F3] border-[1.5px] border-white shadow-[0_0_16px_rgba(255,255,255,0.75),0_4px_10px_rgba(20,99,67,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:border-[#22C58B] hover:shadow-[0_10px_24px_-4px_rgba(23,165,117,0.65),0_0_16px_2px_rgba(0,122,83,0.45)]"
              title="Portal de Gestión para Clientes"
            >
              <LogIn className="w-3.5 h-3.5 text-[#146343]" />
              <span>Portal Clientes</span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-[#146343] rounded-2xl bg-[#F2F6F3] border border-white shadow-xs"
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
              {/* Redes Sociales antes de Portal Clientes en Mobile (Squircle Blanco + Ícono Verde #146343) */}
              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visitar Facebook oficial de G-evo"
                  className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#F2F6F3] border-[1.5px] border-white text-[#146343] shadow-[0_0_16px_rgba(255,255,255,0.75)] transition-all duration-300 hover:scale-105"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visitar Instagram oficial de G-evo"
                  className="w-10 h-10 rounded-2xl flex items-center justify-center bg-[#F2F6F3] border-[1.5px] border-white text-[#146343] shadow-[0_0_16px_rgba(255,255,255,0.75)] transition-all duration-300 hover:scale-105"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-2xl bg-[#F2F6F3] border-[1.5px] border-white text-xs font-semibold text-[#146343] flex items-center justify-center gap-1.5 shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5 text-[#146343]" />
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
