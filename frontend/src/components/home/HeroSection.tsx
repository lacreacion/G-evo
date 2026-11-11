'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GevoText } from '@/components/common/GevoText';
import {
  Wifi,
  ShoppingBag,
  Bot,
  Smartphone,
  BookOpen,
  Globe,
  Store,
  ArrowUpRight,
  Pause,
  Rotate3d
} from 'lucide-react';

interface HeroScreenItem {
  index: number;
  stepNumber: string;
  boxTitle: string;
  hudTitle: string;
  hudSubtitle: string;
  imageSrc: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeText: string;
}

const HERO_SCREENS: HeroScreenItem[] = [
  {
    index: 0,
    stepNumber: '1',
    boxTitle: '1. Tarjeta Digital',
    hudTitle: 'DIGITAL CARD CREATION',
    hudSubtitle: 'UI/UX DESIGN • NFC & QR VCARD',
    imageSrc: '/images/hero/01-digital-card.webp',
    icon: Smartphone,
    badgeText: 'DIGITAL CARD CREATION'
  },
  {
    index: 1,
    stepNumber: '2',
    boxTitle: '2. Catálogo Digital',
    hudTitle: 'DIGITAL CATALOG CREATION',
    hudSubtitle: 'UI/UX DESIGN • STOCK & WHATSAPP',
    imageSrc: '/images/hero/02-digital-catalog.webp',
    icon: BookOpen,
    badgeText: 'DIGITAL CATALOG CREATION'
  },
  {
    index: 2,
    stepNumber: '3',
    boxTitle: '3. Páginas Web',
    hudTitle: 'CREACIÓN DE PÁGINAS WEB',
    hudSubtitle: 'WEB DESIGN & CREATIVE STUDIO',
    imageSrc: '/images/hero/03-web-creation.webp',
    icon: Globe,
    badgeText: 'CREACIÓN DE PÁGINAS WEB'
  },
  {
    index: 3,
    stepNumber: '4',
    boxTitle: '4. Tienda E-Commerce',
    hudTitle: 'CREACIÓN DE E-COMMERCE',
    hudSubtitle: 'WEB DESIGN & ONLINE SHOP STUDIO',
    imageSrc: '/images/hero/04-ecommerce-creation.webp',
    icon: Store,
    badgeText: 'CREACIÓN DE E-COMMERCE'
  }
];

export const HeroSection: React.FC = () => {
  // cascadeStep: 0 -> Paso 1, 1 -> Paso 2, 2 -> Paso 3, 3 -> Paso 4, 4 -> Fase 5 (Anillo Orbital 3D Continuo)
  const [cascadeStep, setCascadeStep] = useState<number>(0);
  // orbitAngle: ángulo continuo en grados del anillo orbital 3D
  const [orbitAngle, setOrbitAngle] = useState<number>(0);
  // targetAngle: cuando el usuario hace clic en una Caja Blanca Soft UI, rotamos suavemente hacia ese ángulo
  const [targetAngle, setTargetAngle] = useState<number | null>(null);
  // isHoverPaused: pausa estricta e inmediata cuando el mouse entra al escenario 3D o a cualquiera de las 4 pantallas
  const [isHoverPaused, setIsHoverPaused] = useState<boolean>(false);
  // hoveredBoxIndex: caja blanca de la izquierda sobre la que está el mouse
  const [hoveredBoxIndex, setHoveredBoxIndex] = useState<number | null>(null);

  const orbitAngleRef = useRef<number>(0);
  const targetAngleRef = useRef<number | null>(null);
  const isHoverPausedRef = useRef<boolean>(false);
  const cascadeStepRef = useRef<number>(0);

  useEffect(() => {
    isHoverPausedRef.current = isHoverPaused;
  }, [isHoverPaused]);

  useEffect(() => {
    targetAngleRef.current = targetAngle;
  }, [targetAngle]);

  useEffect(() => {
    cascadeStepRef.current = cascadeStep;
  }, [cascadeStep]);

  // Secuencia Encadenada en Cascada (Pasos 1 ➔ 2 ➔ 3 ➔ 4 cada 2.15 segundos)
  useEffect(() => {
    if (cascadeStep >= 4 || isHoverPaused) return;

    const timer = window.setTimeout(() => {
      const nextStep = cascadeStep + 1;
      setCascadeStep(nextStep);
      if (nextStep < 4) {
        const nextOrbit = -nextStep * 90;
        orbitAngleRef.current = nextOrbit;
        setOrbitAngle(nextOrbit);
      } else {
        // Al iniciar Fase 5 (Anillo Orbital 3D continuo), partimos exactamente desde el ángulo del Paso 4 (-270°)
        orbitAngleRef.current = -270;
        setOrbitAngle(-270);
      }
    }, 2150);

    return () => window.clearTimeout(timer);
  }, [cascadeStep, isHoverPaused]);

  // Fase 5 Automática: Giro Continuo en Anillo Orbital 3D (requestAnimationFrame con pausa exacta en hover)
  useEffect(() => {
    if (cascadeStep < 4) return;

    let animationFrameId: number;
    let lastTimestamp: number | null = null;

    const animateOrbit = (timestamp: number) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }
      const deltaMs = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const desiredTarget = targetAngleRef.current;

      if (desiredTarget !== null) {
        // Rotación suave hacia la pantalla seleccionada desde las 4 Cajas Blancas Soft UI
        const diff = desiredTarget - orbitAngleRef.current;
        if (Math.abs(diff) < 0.35) {
          orbitAngleRef.current = desiredTarget;
          targetAngleRef.current = null;
          setTargetAngle(null);
          setOrbitAngle(desiredTarget);
        } else {
          orbitAngleRef.current += diff * Math.min(1, deltaMs * 0.0085);
          setOrbitAngle(orbitAngleRef.current);
        }
      } else if (!isHoverPausedRef.current) {
        // Velocidad de órbita continua suave (~14 grados por segundo)
        orbitAngleRef.current -= (deltaMs / 1000) * 14.5;
        setOrbitAngle(orbitAngleRef.current);
      }

      animationFrameId = window.requestAnimationFrame(animateOrbit);
    };

    animationFrameId = window.requestAnimationFrame(animateOrbit);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [cascadeStep]);

  // Determinar cuál de las 4 pantallas está actualmente al frente (0°) para sincronizar las 4 Cajas Blancas Soft UI
  const getFrontScreenIndex = (): number => {
    if (hoveredBoxIndex !== null) return hoveredBoxIndex;
    if (cascadeStep < 4) return cascadeStep;

    let bestIndex = 0;
    let maxCos = -2;
    for (let i = 0; i < 4; i++) {
      const deg = i * 90 + orbitAngle;
      const rad = (deg * Math.PI) / 180;
      const c = Math.cos(rad);
      if (c > maxCos) {
        maxCos = c;
        bestIndex = i;
      }
    }
    return bestIndex;
  };

  const activeScreenIndex = getFrontScreenIndex();

  // Al hacer clic en cualquiera de las 4 Cajas Blancas Soft UI, rotar suavemente esa pantalla al frente (0°)
  const handleSelectBox = (index: number) => {
    if (cascadeStep < 4) {
      setCascadeStep(4);
    }
    const current = orbitAngleRef.current;
    const desiredMod = (-index * 90) % 360;
    const currentMod = current % 360;
    let delta = desiredMod - currentMod;
    while (delta > 180) delta -= 360;
    while (delta < -180) delta += 360;

    const nextTarget = current + delta;
    targetAngleRef.current = nextTarget;
    setTargetAngle(nextTarget);
  };

  return (
    <section className="relative min-h-[94vh] pt-32 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden gevo-hero-bg">
      {/* Rejilla Arquitectónica Sutil (42px x 42px, #22C58B al 8% de opacidad) + Halos Ambientales */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden gevo-hero-arch-grid">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[560px] md:w-[820px] h-[340px] md:h-[460px] bg-gradient-to-tr from-[#0D4A34]/45 via-[#22C58B]/12 to-transparent rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-8 w-[420px] h-[420px] bg-[#38BDF8]/12 rounded-full blur-[130px]" />
        <div className="absolute bottom-8 left-10 w-80 h-80 bg-[#F4C145]/10 rounded-full blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          
          {/* =================================================================
              COLUMNA IZQUIERDA: BLOQUES 0 AL 5 EN CASCADA + 4 CAJAS BLANCAS SOFT UI
              ================================================================= */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-5">
            
            {/* Bloque 0 (delay: 0.00s): Píldora Superior */}
            <div
              className="animate-hero-stagger inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#05281C]/90 border border-[#22C58B]/35 backdrop-blur-md shadow-md"
              style={{ animationDelay: '0s' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#24D28D] animate-ping" />
              <span className="text-xs font-semibold tracking-wide text-[#F0F7F8]">
                Ecosistema Comercial de Nueva Generación
              </span>
              <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-[#F4C145]/20 text-[#F4C145] border border-[#F4C145]/40">
                G-EVO 2.0
              </span>
            </div>

            {/* Bloque 1 (delay: 0.11s): Título Principal con Shimmer Dorado/Esmeralda en "G-evo." */}
            <h1
              className="animate-hero-stagger text-4xl sm:text-5xl xl:text-[54px] font-black tracking-tight leading-[1.08] text-white"
              style={{ animationDelay: '0.11s' }}
            >
              Haz que tu negocio evolucione con{' '}
              <span className="inline-block drop-shadow-[0_0_24px_rgba(36,210,141,0.35)]">
                <GevoText />
              </span>
            </h1>

            {/* Bloque 2 (delay: 0.22s): Párrafo Comercial con Resaltados Exactos */}
            <p
              className="animate-hero-stagger text-sm sm:text-base md:text-[17px] text-gray-200 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
              style={{ animationDelay: '0.22s' }}
            >
              Diseñamos y desplegamos tus{' '}
              <span className="text-[#F4C145] font-semibold">
                tarjetas digitales inteligentes (URL/QR)
              </span>
              ,{' '}
              <span className="text-[#24D28D] font-semibold">
                catálogos digitales, tiendas E-commerce y páginas web
              </span>
              . Soluciones tecnológicas de alto impacto diseñadas para destacar tu marca, conectar con más clientes y potenciar tus ventas.
            </p>

            {/* Bloque 3: Las 3 Píldoras Blancas Interactivas cayendo una tras otra en Cascada */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs pt-1">
              <div
                className="animate-box-cascade group gevo-keycap-idle px-3.5 py-2 gap-2 cursor-default"
                style={{ animationDelay: '0.32s' }}
              >
                <span className="w-6 h-6 rounded-lg bg-[#DDF8EC] text-[#157A54] flex items-center justify-center group-hover:-rotate-6 transition-transform">
                  <Wifi className="w-3.5 h-3.5" />
                </span>
                <span className="text-[#2C3531] font-semibold">URL &amp; QR Dinámico</span>
              </div>

              <div
                className="animate-box-cascade group gevo-keycap-idle px-3.5 py-2 gap-2 cursor-default"
                style={{ animationDelay: '0.46s' }}
              >
                <span className="w-6 h-6 rounded-lg bg-[#DDF8EC] text-[#157A54] flex items-center justify-center group-hover:-rotate-6 transition-transform">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </span>
                <span className="text-[#2C3531] font-semibold">Pedidos a WhatsApp</span>
              </div>

              <div
                className="animate-box-cascade group gevo-keycap-idle px-3.5 py-2 gap-2 cursor-default"
                style={{ animationDelay: '0.60s' }}
              >
                <span className="w-6 h-6 rounded-lg bg-[#DDF8EC] text-[#157A54] flex items-center justify-center group-hover:-rotate-6 transition-transform">
                  <Bot className="w-3.5 h-3.5" />
                </span>
                <span className="text-[#2C3531] font-semibold">Agente IA 24/7 Disponible</span>
              </div>
            </div>

            {/* Bloque 4: Las 4 Cajas Blancas Soft UI con Efecto de Cascada (Caída Secuencial 1➔2➔3➔4 + Desfase Escalonado) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 pb-2">
              {HERO_SCREENS.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeScreenIndex === item.index;

                // Desfase visual en cascada (peldaños escalonados 1 ➔ 2 ➔ 3 ➔ 4)
                const cascadeOffsetClass =
                  item.index === 0
                    ? 'sm:translate-y-0 sm:translate-x-0'
                    : item.index === 1
                    ? 'sm:translate-y-2.5 sm:translate-x-1'
                    : item.index === 2
                    ? 'sm:translate-y-1 sm:translate-x-2.5'
                    : 'sm:translate-y-3.5 sm:translate-x-3.5';

                return (
                  <div
                    key={item.index}
                    className="animate-box-cascade"
                    style={{ animationDelay: `${0.68 + item.index * 0.22}s` }}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectBox(item.index)}
                      onMouseEnter={() => setHoveredBoxIndex(item.index)}
                      onMouseLeave={() => setHoveredBoxIndex(null)}
                      className={`w-full group relative bg-gradient-to-r from-[#E5F8EF] via-[#FFFFFF] to-[#FFF6DE] rounded-2xl p-3.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-between gap-3 text-left cursor-pointer ${cascadeOffsetClass} ${
                        isActive
                          ? '-translate-y-1.5 scale-[1.03] z-20 border-[1.5px] border-[#22C58B] shadow-[0_14px_34px_-4px_rgba(23,165,117,0.82),0_0_22px_5px_rgba(0,122,83,0.65),inset_0_2px_4px_rgba(255,255,255,0.95)]'
                          : 'border border-[#BCE0CC] shadow-[inset_0_3px_6px_rgba(20,80,50,0.08),0_8px_18px_-6px_rgba(0,0,0,0.35)] hover:-translate-y-1 hover:scale-[1.02] hover:border-[#22C58B] hover:shadow-[0_12px_30px_-4px_rgba(23,165,117,0.75),0_0_20px_4px_rgba(0,122,83,0.6),inset_0_2px_4px_rgba(255,255,255,0.9)]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl bg-[#DDF8EC] text-[#157A54] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                            isActive ? '-rotate-6 scale-110' : 'group-hover:-rotate-6'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-[#2C3531] truncate">
                            {item.boxTitle}
                          </div>
                          <div className="text-[11px] font-medium text-[#6E7873] truncate tracking-wide">
                            {item.badgeText}
                          </div>
                        </div>
                      </div>

                      <ArrowUpRight
                        className={`w-4 h-4 text-[#A389F4] shrink-0 transition-transform duration-300 ${
                          isActive
                            ? 'translate-x-0.5 -translate-y-0.5 scale-110'
                            : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Bloque 5 (delay: 0.55s): Contadores Inferiores Animados */}
            <div
              className="animate-hero-stagger grid grid-cols-3 gap-4 pt-5 border-t border-white/10 max-w-lg mx-auto lg:mx-0"
              style={{ animationDelay: '0.55s' }}
            >
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-white">
                  +500
                </div>
                <div className="text-[11px] text-gray-300">
                  Tarjetas y Tiendas Activas
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#24D28D]">
                  0%
                </div>
                <div className="text-[11px] text-gray-300">
                  Comisión por Ventas
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-[#F4C145]">
                  24/7
                </div>
                <div className="text-[11px] text-gray-300">
                  Soporte y Asistencia IA
                </div>
              </div>
            </div>

          </div>

          {/* =================================================================
              COLUMNA DERECHA: CASCADA 1➔2➔3➔4 + ANILLO ORBITAL 3D CYBER-HUD SIN CRUCES
              ================================================================= */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            
            {/* Barra de Estado del Escenario Orbital 3D */}
            <div className="mb-3 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#02120C]/85 border border-[#38BDF8]/40 text-xs text-[#67E8F9] shadow-[0_0_25px_rgba(56,189,248,0.25)] backdrop-blur-md z-30">
              {isHoverPaused ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#F4C145] animate-pulse" />
                  <span className="font-semibold text-[#F4C145]">
                    Giro 3D en Pausa • Inspeccionando Pantalla
                  </span>
                </>
              ) : cascadeStep < 4 ? (
                <>
                  <Rotate3d className="w-3.5 h-3.5 text-[#67E8F9] animate-spin" />
                  <span className="font-semibold">
                    Ensamblando Cascada {cascadeStep + 1}/4: {HERO_SCREENS[cascadeStep].boxTitle}
                  </span>
                </>
              ) : (
                <>
                  <Rotate3d className="w-3.5 h-3.5 text-[#24D28D] animate-spin" />
                  <span className="font-semibold text-[#F0F7F8]">
                    Anillo Orbital 3D Activo •{' '}
                    <span className="text-[#67E8F9]">{HERO_SCREENS[activeScreenIndex].boxTitle}</span>
                  </span>
                </>
              )}
            </div>

            {/* Escenario 3D Principal con Pausa Inmediata al Pasar el Mouse (onMouseEnter / onMouseLeave) */}
            <div
              onMouseEnter={() => setIsHoverPaused(true)}
              onMouseLeave={() => setIsHoverPaused(false)}
              className="relative w-full h-[360px] sm:h-[430px] md:h-[470px] flex items-center justify-center select-none"
              style={{
                perspective: '2100px'
              }}
            >
              {/* Halo Base del Anillo Orbital 3D */}
              <div
                className="absolute w-[340px] sm:w-[480px] h-[140px] rounded-full border border-[#38BDF8]/25 bg-[#38BDF8]/5 blur-xl pointer-events-none"
                style={{
                  transform: 'rotateX(75deg) translateZ(-120px)'
                }}
              />

              {/* Contenedor Preserve-3D de las 4 Pantallas Azules Cyber-HUD */}
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                {HERO_SCREENS.map((screen) => {
                  // Durante la cascada (cascadeStep < 4), las pantallas con index > cascadeStep aún no han caído
                  const isVisibleInCascade = cascadeStep >= 4 || screen.index <= cascadeStep;
                  if (!isVisibleInCascade) return null;

                  const isDroppingNow = cascadeStep < 4 && screen.index === cascadeStep;

                  // Cálculo trigonométrico sobre el perímetro del Anillo Orbital 3D (CERO CRUCES)
                  let translateX = 0;
                  let translateY = 0;
                  let translateZ = 240;
                  let rotateY = 0;
                  let scale = 0.84;
                  let opacity = 1;
                  let zIndex = 110;

                  if (cascadeStep < 4) {
                    // Posicionamiento durante los Pasos 1 al 4 de la cascada
                    const stepsBehind = cascadeStep - screen.index;
                    if (stepsBehind === 0) {
                      // Pantalla recién caída al frente
                      translateX = 0;
                      translateY = 0;
                      translateZ = 240;
                      rotateY = 0;
                      scale = 0.84;
                      opacity = 1;
                      zIndex = 110;
                    } else if (stepsBehind === 1) {
                      // Ranura orbital trasera izquierda (especificación exacta del Paso 2)
                      translateX = -210;
                      translateY = -22;
                      translateZ = -260;
                      rotateY = 22;
                      scale = 0.62;
                      opacity = 0.58;
                      zIndex = 55;
                    } else if (stepsBehind === 2) {
                      // Ranura orbital trasera central-superior
                      translateX = 0;
                      translateY = -36;
                      translateZ = -320;
                      rotateY = 0;
                      scale = 0.56;
                      opacity = 0.38;
                      zIndex = 35;
                    } else {
                      // Ranura orbital trasera derecha
                      translateX = 210;
                      translateY = -22;
                      translateZ = -260;
                      rotateY = -22;
                      scale = 0.62;
                      opacity = 0.58;
                      zIndex = 55;
                    }
                  } else {
                    // Fase 5 Automática: Trigonometría exacta del Anillo Orbital 3D (index * 90° + orbitAngle)
                    const currentDeg = screen.index * 90 + orbitAngle;
                    const rad = (currentDeg * Math.PI) / 180;
                    translateX = Math.sin(rad) * 215;
                    translateZ = Math.cos(rad) * 240;
                    rotateY = Math.sin(rad) * 28;
                    const depthFactor = (Math.cos(rad) + 1) / 2;
                    scale = 0.56 + depthFactor * 0.28;
                    opacity = 0.28 + depthFactor * 0.72;
                    zIndex = Math.round(depthFactor * 100) + 10;
                  }

                  const isFrontCard = activeScreenIndex === screen.index;

                  return (
                    <div
                      key={screen.index}
                      onClick={() => handleSelectBox(screen.index)}
                      className={`absolute w-[310px] sm:w-[440px] md:w-[500px] aspect-[16/9] cursor-pointer ${
                        cascadeStep < 4
                          ? 'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'
                          : ''
                      }`}
                      style={{
                        zIndex,
                        opacity,
                        transform: `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`
                      }}
                    >
                      {/* Sub-contenedor que ejecuta la caída en cascada translateY(-115px) -> 0 con rebote suave */}
                      <div
                        className={`relative w-full h-full rounded-2xl overflow-hidden bg-[#031322] border-2 border-[#38BDF8] shadow-[0_0_55px_rgba(34,211,238,0.42)] group/hud ${
                          isDroppingNow ? 'animate-cascade-drop' : ''
                        }`}
                      >
                        {/* Esquinas L-Bracket Iluminadas (#67E8F9) del Chasis Holográfico Cyber-HUD */}
                        <span className="pointer-events-none absolute top-1.5 left-1.5 w-5 h-5 border-t-2 border-l-2 border-[#67E8F9] rounded-tl-md z-20 drop-shadow-[0_0_8px_#67E8F9]" />
                        <span className="pointer-events-none absolute top-1.5 right-1.5 w-5 h-5 border-t-2 border-r-2 border-[#67E8F9] rounded-tr-md z-20 drop-shadow-[0_0_8px_#67E8F9]" />
                        <span className="pointer-events-none absolute bottom-1.5 left-1.5 w-5 h-5 border-b-2 border-l-2 border-[#67E8F9] rounded-bl-md z-20 drop-shadow-[0_0_8px_#67E8F9]" />
                        <span className="pointer-events-none absolute bottom-1.5 right-1.5 w-5 h-5 border-b-2 border-r-2 border-[#67E8F9] rounded-br-md z-20 drop-shadow-[0_0_8px_#67E8F9]" />

                        {/* Barra Superior Cyber-HUD */}
                        <div className="absolute top-0 inset-x-0 z-20 px-3.5 py-1.5 bg-gradient-to-b from-[#020B14]/90 via-[#020B14]/60 to-transparent flex items-center justify-between text-[10px] font-mono tracking-wider text-[#67E8F9]">
                          <span className="flex items-center gap-1.5 font-bold">
                            <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
                            0{screen.stepNumber} // {screen.hudTitle}
                          </span>
                          <span className="hidden sm:inline text-[#38BDF8]/90">
                            {screen.hudSubtitle}
                          </span>
                        </div>

                        {/* Imagen Oficial Azul Cyber-HUD */}
                        <img
                          src={screen.imageSrc}
                          alt={`${screen.boxTitle} - ${screen.hudTitle}`}
                          className="w-full h-full object-cover object-center brightness-105 contrast-105"
                          draggable={false}
                        />

                        {/* Brillo Holográfico y Etiqueta Inferior Interactiva */}
                        <div className="absolute bottom-0 inset-x-0 z-20 px-3.5 py-2 bg-gradient-to-t from-[#020B14]/95 via-[#020B14]/65 to-transparent flex items-center justify-between">
                          <span className="text-xs font-bold text-white drop-shadow">
                            {screen.boxTitle}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                              isFrontCard
                                ? 'bg-[#22C58B]/25 border-[#22C58B] text-[#6EE7B7]'
                                : 'bg-[#38BDF8]/15 border-[#38BDF8]/40 text-[#67E8F9]'
                            }`}
                          >
                            {isFrontCard ? 'EN FRENTE • ACTIVO' : 'CLIC PARA TRAER AL FRENTE'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Indicadores Rápidos de Paso (1 ➔ 2 ➔ 3 ➔ 4) debajo del Anillo 3D */}
            <div className="mt-2 flex items-center gap-2 z-30">
              {HERO_SCREENS.map((item) => {
                const isActive = activeScreenIndex === item.index;
                return (
                  <button
                    key={item.index}
                    type="button"
                    onClick={() => handleSelectBox(item.index)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#22C58B] text-[#02120C] border-[#67E8F9] shadow-[0_0_16px_rgba(34,197,139,0.7)] scale-105'
                        : 'bg-[#05281C]/80 text-gray-300 border-white/15 hover:border-[#38BDF8]'
                    }`}
                  >
                    0{item.stepNumber} • {item.boxTitle.split('. ')[1]}
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
