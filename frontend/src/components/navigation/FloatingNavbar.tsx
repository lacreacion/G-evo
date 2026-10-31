'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { 
  ChevronDown, 
  Sparkles, 
  Compass, 
  Target, 
  BookOpen, 
  Menu, 
  X, 
  ArrowUpRight,
  LogIn
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
          className={`w-full max-w-6xl rounded-2xl md:rounded-full px-5 py-3 md:px-7 md:py-3.5 transition-all duration-300 flex items-center justify-between border ${
            isScrolled
              ? 'bg-[#0B101B]/90 backdrop-blur-xl border-amber-500/20 nav-floating-shadow'
              : 'bg-[#0B101B]/75 backdrop-blur-lg border-white/10 shadow-lg'
          }`}
        >
          {/* Logo Principal con colores oficiales G-evo */}
          <Logo size="md" />

          {/* Menú de Navegación Desktop */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-300">
            <Link
              href="/"
              className="hover:text-emerald-400 transition-colors"
            >
              Inicio
            </Link>

            <Link
              href="#servicios"
              className="hover:text-emerald-400 transition-colors"
            >
              Servicios
            </Link>

            <Link
              href="#ai-demo"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Agente IA</span>
            </Link>

            {/* Menú Desplegable Interactivo: Quiénes Somos (Visión, Misión, Historia) */}
            <div className="relative group">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                className="flex items-center gap-1 hover:text-emerald-400 transition-colors py-1 cursor-pointer"
              >
                <span>Quiénes Somos</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>

              {/* Dropdown Window Popover */}
              {dropdownOpen && (
                <div
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 p-2 bg-[#0E1524] border border-amber-500/30 rounded-2xl shadow-2xl backdrop-blur-2xl animate-fadeIn"
                >
                  <div className="p-2 text-[11px] font-bold uppercase tracking-wider text-amber-400/80 border-b border-white/5">
                    Conoce el Ecosistema
                  </div>

                  <button
                    onClick={() => openCorporateModal('vision')}
                    className="w-full mt-1 p-2.5 rounded-xl hover:bg-white/5 flex items-start gap-3 text-left transition-colors group/item cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover/item:border-emerald-400">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover/item:text-emerald-400">
                        Nuestra Visión
                      </div>
                      <div className="text-[11px] text-gray-400 line-clamp-1">
                        Hacia dónde proyectamos la marca.
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => openCorporateModal('mision')}
                    className="w-full p-2.5 rounded-xl hover:bg-white/5 flex items-start gap-3 text-left transition-colors group/item cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover/item:border-amber-400">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover/item:text-amber-400">
                        Nuestra Misión
                      </div>
                      <div className="text-[11px] text-gray-400 line-clamp-1">
                        Propósito y valor comercial.
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => openCorporateModal('historia')}
                    className="w-full p-2.5 rounded-xl hover:bg-white/5 flex items-start gap-3 text-left transition-colors group/item cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover/item:border-emerald-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover/item:text-emerald-400">
                        Nuestra Historia
                      </div>
                      <div className="text-[11px] text-gray-400 line-clamp-1">
                        Génesis de la evolución dorada.
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <Link
              href="#contacto"
              className="hover:text-emerald-400 transition-colors"
            >
              Contacto
            </Link>
          </div>

          {/* Botones de Acción (Acceso de Cliente & Cotización) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Acceso para Clientes Finales */}
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-gray-300 hover:text-white rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="Portal de Gestión para Clientes"
            >
              <LogIn className="w-3.5 h-3.5 text-emerald-400" />
              <span>Portal Clientes</span>
            </Link>

            {/* CTA Principal de Cotización */}
            <Link
              href="#contacto"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-black rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all transform hover:scale-[1.02]"
            >
              <span>Cotizar Ahora</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
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
          <div className="lg:hidden absolute top-20 left-4 right-4 p-5 bg-[#0D1321] border border-amber-500/30 rounded-2xl shadow-2xl backdrop-blur-2xl animate-fadeIn space-y-4">
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

              {/* Opciones Institucionales en Mobile */}
              <div className="pt-2 border-t border-white/10">
                <div className="text-xs uppercase font-bold text-amber-400 px-2 py-1">
                  Quiénes Somos (G-evo)
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <button
                    onClick={() => openCorporateModal('vision')}
                    className="p-2 rounded-lg bg-white/5 text-xs text-center hover:bg-white/10"
                  >
                    Visión
                  </button>
                  <button
                    onClick={() => openCorporateModal('mision')}
                    className="p-2 rounded-lg bg-white/5 text-xs text-center hover:bg-white/10"
                  >
                    Misión
                  </button>
                  <button
                    onClick={() => openCorporateModal('historia')}
                    className="p-2 rounded-lg bg-white/5 text-xs text-center hover:bg-white/10"
                  >
                    Historia
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

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-200"
              >
                Ingreso Portal Clientes
              </Link>
              <Link
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-xs font-bold text-black"
              >
                Cotizar Tarjeta o Catálogo
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
