'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { FacebookIcon, InstagramIcon } from '@/components/common/SocialIcons';
import { 
  ChevronDown, 
  Sparkles, 
  Target, 
  Menu, 
  X, 
  LogIn,
  ArrowUpRight,
  Smartphone,
  BookOpen,
  Globe,
  Store,
  Bot
} from 'lucide-react';
import { CorporateModal, CorporateTab } from '@/components/modals/CorporateModal';

export const FloatingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCorporateTab, setActiveCorporateTab] = useState<CorporateTab>(null);

  const selectServiceScene = (sceneIndex: number, targetAnchor: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gevo:select-hero-scene', { detail: sceneIndex }));
      const el = document.querySelector(targetAnchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const triggerInicioCascade = (e?: React.MouseEvent) => {
    if (e && window.location.pathname === '/') {
      e.preventDefault();
    }
    setDropdownOpen(false);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('gevo:restart-hero-cascade'));
  };

  return (
    <>
      {/* Floating Navbar Container: Logo afuera a la izquierda + Barra de Menú flotando al mismo tiempo */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 sm:px-6 pt-4 md:pt-6 transition-all duration-300 pointer-events-none">
        <div className="w-[96%] max-w-[1480px] flex items-center justify-between gap-4 md:gap-8">
          {/* Logo Principal FUERA de la barra de menú, con el mismo efecto flotante simultáneo */}
          <div
            onClick={triggerInicioCascade}
            className={`pointer-events-auto shrink-0 px-4 py-2.5 rounded-2xl transition-all duration-300 cursor-pointer ${
              isScrolled
                ? 'bg-[#042419]/75 backdrop-blur-md border border-white/10 shadow-[0_14px_34px_rgba(0,0,0,0.65)]'
                : 'drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)]'
            }`}
          >
            <Logo size="md" />
          </div>

          <nav
            className={`pointer-events-auto flex-1 rounded-2xl px-6 py-2.5 md:px-10 md:py-3 transition-all duration-300 flex items-center justify-end lg:justify-between gevo-header-bar ${
              isScrolled
                ? 'shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
                : 'shadow-lg'
            }`}
          >
            {/* Menú de Navegación Desktop Minimalista con Pastilla Blanca Luminosa en Hover (Sin puntos amarillos) */}
            <div className="hidden lg:flex items-center gap-7 xl:gap-12 text-sm font-semibold text-[#555E5A]">
              <Link
                href="/"
                onClick={triggerInicioCascade}
                className="relative inline-flex items-center justify-center px-5 py-2 rounded-2xl border-[1.5px] border-transparent text-[#555E5A] transition-all duration-200 hover:bg-[#F3F6F4] hover:border-white hover:text-[#147A50] hover:shadow-[-4px_-4px_14px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.12)]"
              >
                <span>Inicio</span>
              </Link>

              {/* Menú Desplegable Interactivo: Servicios (5 opciones exactas solicitadas) */}
              <div className="relative group/srv">
                <button
                  onClick={() => {
                    setServicesDropdownOpen(!servicesDropdownOpen);
                    setDropdownOpen(false);
                  }}
                  onMouseEnter={() => {
                    setServicesDropdownOpen(true);
                    setDropdownOpen(false);
                  }}
                  className={`relative inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-2xl border-[1.5px] transition-all duration-200 cursor-pointer ${
                    servicesDropdownOpen
                      ? 'bg-[#F3F6F4] border-white text-[#147A50] shadow-[-4px_-4px_14px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.12)]'
                      : 'border-transparent text-[#555E5A] hover:bg-[#F3F6F4] hover:border-white hover:text-[#147A50] hover:shadow-[-4px_-4px_14px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.12)]'
                  }`}
                >
                  <span>Servicios</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#B5892E] stroke-[2.5] transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {servicesDropdownOpen && (
                  <div
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-76 p-2 rounded-2xl bg-[#F3F6F4] border-[1.5px] border-white shadow-[-6px_-6px_18px_rgba(255,255,255,0.85),0_16px_32px_rgba(0,0,0,0.16)] animate-fadeIn space-y-0.5"
                  >
                    {/* 1. Tarjeta Presentación Digital */}
                    <button
                      onClick={() => selectServiceScene(0, '#servicios')}
                      className="w-full text-left cursor-pointer flex items-center justify-between gap-2.5 group/drop relative rounded-xl px-2.5 py-1.5 border-[1.5px] border-transparent bg-transparent transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E5F8EF] hover:via-[#FFFFFF] hover:to-[#FFF6DE] hover:border-[#BCE0CC] hover:shadow-[inset_0_2px_5px_rgba(20,80,50,0.09)]"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#EAEFEC] text-[#157A54] flex items-center justify-center shrink-0 border border-white/80 shadow-[inset_1.5px_1.5px_4px_rgba(0,0,0,0.10),inset_-1.5px_-1.5px_4px_rgba(255,255,255,0.95)] transition-all duration-300 group-hover/drop:bg-[#DDF8EC] group-hover/drop:border-transparent group-hover/drop:shadow-none group-hover/drop:-rotate-6">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div className="leading-tight">
                          <div className="text-xs font-semibold text-[#2C3531]">
                            Tarjeta Presentación Digital
                          </div>
                          <div className="text-[11px] text-[#6E7873]">
                            URL, QR y vCard inteligente
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#A389F4] shrink-0 opacity-0 -translate-x-1 translate-y-1 group-hover/drop:opacity-100 group-hover/drop:translate-x-0 group-hover/drop:translate-y-0 transition-all duration-300" />
                    </button>

                    {/* 2. Catálogo Digital */}
                    <button
                      onClick={() => selectServiceScene(1, '#servicios')}
                      className="w-full text-left cursor-pointer flex items-center justify-between gap-2.5 group/drop relative rounded-xl px-2.5 py-1.5 border-[1.5px] border-transparent bg-transparent transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E5F8EF] hover:via-[#FFFFFF] hover:to-[#FFF6DE] hover:border-[#BCE0CC] hover:shadow-[inset_0_2px_5px_rgba(20,80,50,0.09)]"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#EAEFEC] text-[#157A54] flex items-center justify-center shrink-0 border border-white/80 shadow-[inset_1.5px_1.5px_4px_rgba(0,0,0,0.10),inset_-1.5px_-1.5px_4px_rgba(255,255,255,0.95)] transition-all duration-300 group-hover/drop:bg-[#DDF8EC] group-hover/drop:border-transparent group-hover/drop:shadow-none group-hover/drop:-rotate-6">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div className="leading-tight">
                          <div className="text-xs font-semibold text-[#2C3531]">
                            Catálogo Digital
                          </div>
                          <div className="text-[11px] text-[#6E7873]">
                            Productos, precios y pedidos
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#A389F4] shrink-0 opacity-0 -translate-x-1 translate-y-1 group-hover/drop:opacity-100 group-hover/drop:translate-x-0 group-hover/drop:translate-y-0 transition-all duration-300" />
                    </button>

                    {/* 3. Páginas Web */}
                    <button
                      onClick={() => selectServiceScene(2, '#servicios')}
                      className="w-full text-left cursor-pointer flex items-center justify-between gap-2.5 group/drop relative rounded-xl px-2.5 py-1.5 border-[1.5px] border-transparent bg-transparent transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E5F8EF] hover:via-[#FFFFFF] hover:to-[#FFF6DE] hover:border-[#BCE0CC] hover:shadow-[inset_0_2px_5px_rgba(20,80,50,0.09)]"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#EAEFEC] text-[#157A54] flex items-center justify-center shrink-0 border border-white/80 shadow-[inset_1.5px_1.5px_4px_rgba(0,0,0,0.10),inset_-1.5px_-1.5px_4px_rgba(255,255,255,0.95)] transition-all duration-300 group-hover/drop:bg-[#DDF8EC] group-hover/drop:border-transparent group-hover/drop:shadow-none group-hover/drop:-rotate-6">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div className="leading-tight">
                          <div className="text-xs font-semibold text-[#2C3531]">
                            Páginas Web
                          </div>
                          <div className="text-[11px] text-[#6E7873]">
                            Diseño web y estudio creativo
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#A389F4] shrink-0 opacity-0 -translate-x-1 translate-y-1 group-hover/drop:opacity-100 group-hover/drop:translate-x-0 group-hover/drop:translate-y-0 transition-all duration-300" />
                    </button>

                    {/* 4. Tienda E-Commerce */}
                    <button
                      onClick={() => selectServiceScene(3, '#servicios')}
                      className="w-full text-left cursor-pointer flex items-center justify-between gap-2.5 group/drop relative rounded-xl px-2.5 py-1.5 border-[1.5px] border-transparent bg-transparent transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E5F8EF] hover:via-[#FFFFFF] hover:to-[#FFF6DE] hover:border-[#BCE0CC] hover:shadow-[inset_0_2px_5px_rgba(20,80,50,0.09)]"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#EAEFEC] text-[#157A54] flex items-center justify-center shrink-0 border border-white/80 shadow-[inset_1.5px_1.5px_4px_rgba(0,0,0,0.10),inset_-1.5px_-1.5px_4px_rgba(255,255,255,0.95)] transition-all duration-300 group-hover/drop:bg-[#DDF8EC] group-hover/drop:border-transparent group-hover/drop:shadow-none group-hover/drop:-rotate-6">
                          <Store className="w-4 h-4" />
                        </div>
                        <div className="leading-tight">
                          <div className="text-xs font-semibold text-[#2C3531]">
                            Tienda E-Commerce
                          </div>
                          <div className="text-[11px] text-[#6E7873]">
                            Carrito de compras y pasarelas
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#A389F4] shrink-0 opacity-0 -translate-x-1 translate-y-1 group-hover/drop:opacity-100 group-hover/drop:translate-x-0 group-hover/drop:translate-y-0 transition-all duration-300" />
                    </button>

                    {/* 5. Agente IA */}
                    <button
                      onClick={() => selectServiceScene(4, '#servicios')}
                      className="w-full text-left cursor-pointer flex items-center justify-between gap-2.5 group/drop relative rounded-xl px-2.5 py-1.5 border-[1.5px] border-transparent bg-transparent transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E5F8EF] hover:via-[#FFFFFF] hover:to-[#FFF6DE] hover:border-[#BCE0CC] hover:shadow-[inset_0_2px_5px_rgba(20,80,50,0.09)]"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#EAEFEC] text-[#157A54] flex items-center justify-center shrink-0 border border-white/80 shadow-[inset_1.5px_1.5px_4px_rgba(0,0,0,0.10),inset_-1.5px_-1.5px_4px_rgba(255,255,255,0.95)] transition-all duration-300 group-hover/drop:bg-[#DDF8EC] group-hover/drop:border-transparent group-hover/drop:shadow-none group-hover/drop:-rotate-6">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="leading-tight">
                          <div className="text-xs font-semibold text-[#2C3531]">
                            Agente IA
                          </div>
                          <div className="text-[11px] text-[#6E7873]">
                            Soporte y automatización 24/7
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#A389F4] shrink-0 opacity-0 -translate-x-1 translate-y-1 group-hover/drop:opacity-100 group-hover/drop:translate-x-0 group-hover/drop:translate-y-0 transition-all duration-300" />
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => selectServiceScene(4, '#servicios')}
                className="relative inline-flex items-center justify-center px-5 py-2 rounded-2xl border-[1.5px] border-transparent text-[#555E5A] transition-all duration-200 hover:bg-[#F3F6F4] hover:border-white hover:text-[#147A50] hover:shadow-[-4px_-4px_14px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.12)] cursor-pointer"
              >
                <span>Agente IA</span>
              </button>

              {/* Menú Desplegable Interactivo: Quiénes somos (Visión, Misión, Historia) */}
              <div className="relative group/nav">
                <button
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                    setServicesDropdownOpen(false);
                  }}
                  onMouseEnter={() => {
                    setDropdownOpen(true);
                    setServicesDropdownOpen(false);
                  }}
                  className={`relative inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-2xl border-[1.5px] transition-all duration-200 cursor-pointer ${
                    dropdownOpen
                      ? 'bg-[#F3F6F4] border-white text-[#147A50] shadow-[-4px_-4px_14px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.12)]'
                      : 'border-transparent text-[#555E5A] hover:bg-[#F3F6F4] hover:border-white hover:text-[#147A50] hover:shadow-[-4px_-4px_14px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.12)]'
                  }`}
                >
                  <span>Quiénes somos</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#B5892E] stroke-[2.5] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

              {/* Dropdown Window Popover Blanco Marfil Delgado (Reposo limpio vs Hover iluminado) */}
              {dropdownOpen && (
                <div
                  onMouseLeave={() => setDropdownOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-72 p-2 rounded-2xl bg-[#F3F6F4] border-[1.5px] border-white shadow-[-6px_-6px_18px_rgba(255,255,255,0.85),0_16px_32px_rgba(0,0,0,0.16)] animate-fadeIn space-y-0.5"
                >
                  {/* Opción 1: Visión */}
                  <button
                    onClick={() => openCorporateModal('vision')}
                    className="w-full text-left cursor-pointer flex items-center justify-between gap-2.5 group/drop relative rounded-xl px-2.5 py-1.5 border-[1.5px] border-transparent bg-transparent transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E5F8EF] hover:via-[#FFFFFF] hover:to-[#FFF6DE] hover:border-[#BCE0CC] hover:shadow-[inset_0_2px_5px_rgba(20,80,50,0.09)]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#EAEFEC] text-[#157A54] flex items-center justify-center shrink-0 border border-white/80 shadow-[inset_1.5px_1.5px_4px_rgba(0,0,0,0.10),inset_-1.5px_-1.5px_4px_rgba(255,255,255,0.95)] transition-all duration-300 group-hover/drop:bg-[#DDF8EC] group-hover/drop:border-transparent group-hover/drop:shadow-none group-hover/drop:-rotate-6">
                        <Target className="w-4 h-4" />
                      </div>
                      <div className="leading-tight">
                        <div className="text-xs font-semibold text-[#2C3531]">
                          Visión
                        </div>
                        <div className="text-[11px] text-[#6E7873]">
                          El futuro que queremos crear
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A389F4] shrink-0 opacity-0 -translate-x-1 translate-y-1 group-hover/drop:opacity-100 group-hover/drop:translate-x-0 group-hover/drop:translate-y-0 transition-all duration-300" />
                  </button>

                  {/* Opción 2: Misión */}
                  <button
                    onClick={() => openCorporateModal('mision')}
                    className="w-full text-left cursor-pointer flex items-center justify-between gap-2.5 group/drop relative rounded-xl px-2.5 py-1.5 border-[1.5px] border-transparent bg-transparent transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E5F8EF] hover:via-[#FFFFFF] hover:to-[#FFF6DE] hover:border-[#BCE0CC] hover:shadow-[inset_0_2px_5px_rgba(20,80,50,0.09)]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#EAEFEC] text-[#157A54] flex items-center justify-center shrink-0 border border-white/80 shadow-[inset_1.5px_1.5px_4px_rgba(0,0,0,0.10),inset_-1.5px_-1.5px_4px_rgba(255,255,255,0.95)] transition-all duration-300 group-hover/drop:bg-[#DDF8EC] group-hover/drop:border-transparent group-hover/drop:shadow-none group-hover/drop:-rotate-6">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
                        </svg>
                      </div>
                      <div className="leading-tight">
                        <div className="text-xs font-semibold text-[#2C3531]">
                          Misión
                        </div>
                        <div className="text-[11px] text-[#6E7873]">
                          Lo que hacemos cada día
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A389F4] shrink-0 opacity-0 -translate-x-1 translate-y-1 group-hover/drop:opacity-100 group-hover/drop:translate-x-0 group-hover/drop:translate-y-0 transition-all duration-300" />
                  </button>

                  {/* Opción 3: Historia */}
                  <button
                    onClick={() => openCorporateModal('historia')}
                    className="w-full text-left cursor-pointer flex items-center justify-between gap-2.5 group/drop relative rounded-xl px-2.5 py-1.5 border-[1.5px] border-transparent bg-transparent transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E5F8EF] hover:via-[#FFFFFF] hover:to-[#FFF6DE] hover:border-[#BCE0CC] hover:shadow-[inset_0_2px_5px_rgba(20,80,50,0.09)]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#EAEFEC] text-[#157A54] flex items-center justify-center shrink-0 border border-white/80 shadow-[inset_1.5px_1.5px_4px_rgba(0,0,0,0.10),inset_-1.5px_-1.5px_4px_rgba(255,255,255,0.95)] transition-all duration-300 group-hover/drop:bg-[#DDF8EC] group-hover/drop:border-transparent group-hover/drop:shadow-none group-hover/drop:-rotate-6">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12c2.5-2.5 4.5 2.5 7 0s4.5 2.5 7 0" />
                        </svg>
                      </div>
                      <div className="leading-tight">
                        <div className="text-xs font-semibold text-[#2C3531]">
                          Historia
                        </div>
                        <div className="text-[11px] text-[#6E7873]">
                          La idea detrás de G-evo
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A389F4] shrink-0 opacity-0 -translate-x-1 translate-y-1 group-hover/drop:opacity-100 group-hover/drop:translate-x-0 group-hover/drop:translate-y-0 transition-all duration-300" />
                  </button>
                </div>
              )}
            </div>

              <Link
                href="#contacto"
                className="relative inline-flex items-center justify-center px-5 py-2 rounded-2xl border-[1.5px] border-transparent text-[#555E5A] transition-all duration-200 hover:bg-[#F3F6F4] hover:border-white hover:text-[#147A50] hover:shadow-[-4px_-4px_14px_rgba(255,255,255,0.9),0_6px_16px_rgba(0,0,0,0.12)]"
              >
                <span>Contacto</span>
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
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto lg:hidden absolute top-20 left-4 right-4 p-5 gevo-chassis animate-fadeIn space-y-4">
            <div className="flex flex-col gap-3 text-sm font-medium text-gray-200">
              <Link
                href="/"
                onClick={triggerInicioCascade}
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
              <button
                type="button"
                onClick={() => selectServiceScene(4, '#servicios')}
                className="p-2 hover:bg-white/5 rounded-lg flex items-center gap-2 text-left cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Agente IA 24/7</span>
              </button>

              {/* Opciones Institucionales en Mobile (Contenedor Blanco Marfil: Reposo limpio vs Hover iluminado) */}
              <div className="pt-2 border-t border-white/10">
                <div className="text-xs uppercase font-bold text-amber-400 px-2 py-1">
                  Quiénes Somos (G-evo)
                </div>
                <div className="flex flex-col gap-1 mt-2 p-2 rounded-2xl bg-[#F3F6F4] border border-white">
                  <button
                    onClick={() => openCorporateModal('vision')}
                    className="w-full text-left flex items-center justify-between gap-3 group/drop relative rounded-xl px-3 py-2.5 border border-transparent bg-transparent transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E5F8EF] hover:via-[#FFFFFF] hover:to-[#FFF6DE] hover:border-[#BCE0CC] hover:shadow-[inset_0_3px_6px_rgba(20,80,50,0.10)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#EAEFEC] text-[#157A54] flex items-center justify-center shrink-0 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.10),inset_-2px_-2px_5px_rgba(255,255,255,0.95)] group-hover/drop:bg-[#DDF8EC] group-hover/drop:shadow-none group-hover/drop:-rotate-6 transition-all">
                        <Target className="w-4 h-4" />
                      </div>
                      <div className="leading-tight">
                        <div className="text-xs font-semibold text-[#2C3531]">Visión</div>
                        <div className="text-[11px] text-[#6E7873]">El futuro que queremos crear</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#A389F4] opacity-0 group-hover/drop:opacity-100 transition-opacity" />
                  </button>
                  <button
                    onClick={() => openCorporateModal('mision')}
                    className="w-full text-left flex items-center justify-between gap-3 group/drop relative rounded-xl px-3 py-2.5 border border-transparent bg-transparent transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E5F8EF] hover:via-[#FFFFFF] hover:to-[#FFF6DE] hover:border-[#BCE0CC] hover:shadow-[inset_0_3px_6px_rgba(20,80,50,0.10)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#EAEFEC] text-[#157A54] flex items-center justify-center shrink-0 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.10),inset_-2px_-2px_5px_rgba(255,255,255,0.95)] group-hover/drop:bg-[#DDF8EC] group-hover/drop:shadow-none group-hover/drop:-rotate-6 transition-all">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
                        </svg>
                      </div>
                      <div className="leading-tight">
                        <div className="text-xs font-semibold text-[#2C3531]">Misión</div>
                        <div className="text-[11px] text-[#6E7873]">Lo que hacemos cada día</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#A389F4] opacity-0 group-hover/drop:opacity-100 transition-opacity" />
                  </button>
                  <button
                    onClick={() => openCorporateModal('historia')}
                    className="w-full text-left flex items-center justify-between gap-3 group/drop relative rounded-xl px-3 py-2.5 border border-transparent bg-transparent transition-all duration-300 hover:bg-gradient-to-r hover:from-[#E5F8EF] hover:via-[#FFFFFF] hover:to-[#FFF6DE] hover:border-[#BCE0CC] hover:shadow-[inset_0_3px_6px_rgba(20,80,50,0.10)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#EAEFEC] text-[#157A54] flex items-center justify-center shrink-0 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.10),inset_-2px_-2px_5px_rgba(255,255,255,0.95)] group-hover/drop:bg-[#DDF8EC] group-hover/drop:shadow-none group-hover/drop:-rotate-6 transition-all">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12c2.5-2.5 4.5 2.5 7 0s4.5 2.5 7 0" />
                        </svg>
                      </div>
                      <div className="leading-tight">
                        <div className="text-xs font-semibold text-[#2C3531]">Historia</div>
                        <div className="text-[11px] text-[#6E7873]">La idea detrás de G-evo</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#A389F4] opacity-0 group-hover/drop:opacity-100 transition-opacity" />
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
