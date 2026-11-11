'use client';

import React, { useState, useEffect } from 'react';
import { GevoText } from '@/components/common/GevoText';
import {
  Wifi,
  ShoppingBag,
  Bot,
  Pause,
  Sparkles
} from 'lucide-react';

interface SatelliteLayer {
  id: string;
  label: string;
  clipPath: string;
  delaySec: number;
}

interface HeroCascadeScene {
  index: number;
  stepNumber: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  mainBoxClipPath: string;
  satellites: SatelliteLayer[];
}

const HERO_SCENES: HeroCascadeScene[] = [
  {
    index: 0,
    stepNumber: '01',
    title: 'Tarjeta Digital',
    subtitle: 'URL / QR & VCARD INTERACTIVA',
    imageSrc: '/images/hero/scene-01-card.jpg',
    // Caja principal azul central (Smartphone Tarjeta Digital)
    mainBoxClipPath: 'inset(12% 39.2% 17.5% 40.5%)',
    satellites: [
      {
        id: 'card-tl',
        label: 'Nota Superior Izquierda',
        clipPath: 'inset(15% 59.5% 68.5% 18%)',
        delaySec: 0.22
      },
      {
        id: 'card-tr',
        label: 'Nota Superior Derecha',
        clipPath: 'inset(18% 18% 61% 60.8%)',
        delaySec: 0.38
      },
      {
        id: 'card-left-panel',
        label: 'Panel de Botones',
        clipPath: 'inset(29% 59.5% 45% 18%)',
        delaySec: 0.54
      },
      {
        id: 'card-right-share',
        label: 'Enviar Contacto & Escanear QR',
        clipPath: 'inset(38% 18% 38% 60.8%)',
        delaySec: 0.70
      },
      {
        id: 'card-bl',
        label: 'Red y Nodo Inferior Izquierdo',
        clipPath: 'inset(54% 59.5% 18% 18%)',
        delaySec: 0.86
      },
      {
        id: 'card-right-qr',
        label: 'Etiqueta QR Code',
        clipPath: 'inset(61% 18% 20% 60.8%)',
        delaySec: 1.02
      },
      {
        id: 'card-bottom-map',
        label: 'Mapa de Ubicación Inferior',
        clipPath: 'inset(80.5% 18% 1% 38%)',
        delaySec: 1.18
      }
    ]
  },
  {
    index: 1,
    stepNumber: '02',
    title: 'Catálogo Digital',
    subtitle: 'PRODUCTOS, PRECIOS Y PEDIDOS',
    imageSrc: '/images/hero/scene-02-catalog.jpg',
    // Caja principal azul central (Smartphone Catálogo Digital)
    mainBoxClipPath: 'inset(12% 39.2% 17.5% 40.5%)',
    satellites: [
      {
        id: 'cat-tl',
        label: 'Nota Superior Izquierda',
        clipPath: 'inset(15% 59.5% 68.5% 18%)',
        delaySec: 0.20
      },
      {
        id: 'cat-tr-filter',
        label: 'Filtros de Búsqueda',
        clipPath: 'inset(16% 18% 65% 60.8%)',
        delaySec: 0.35
      },
      {
        id: 'cat-left-buttons',
        label: 'Panel Botones',
        clipPath: 'inset(29% 59.5% 50.5% 18%)',
        delaySec: 0.50
      },
      {
        id: 'cat-right-prices',
        label: 'Lista de Precios y Deseos',
        clipPath: 'inset(33% 12% 48% 60.8%)',
        delaySec: 0.65
      },
      {
        id: 'cat-left-flow',
        label: 'Esquema de Categorías',
        clipPath: 'inset(47% 59.5% 18% 14%)',
        delaySec: 0.80
      },
      {
        id: 'cat-right-actions',
        label: 'Compartir Catálogo y Ver Detalles',
        clipPath: 'inset(46% 18% 20% 60.8%)',
        delaySec: 0.95
      },
      {
        id: 'cat-bottom-qr',
        label: 'Panel QR Catálogo Inferior',
        clipPath: 'inset(80.5% 18% 1% 38%)',
        delaySec: 1.10
      }
    ]
  },
  {
    index: 2,
    stepNumber: '03',
    title: 'Páginas Web',
    subtitle: 'PORTAFOLIO, PROYECTOS Y SERVICIOS',
    imageSrc: '/images/hero/scene-03-web.jpg',
    // Caja principal azul central (Ventana Web Creative Studio)
    mainBoxClipPath: 'inset(16% 36% 10% 41%)',
    satellites: [
      {
        id: 'web-tl-code',
        label: 'Nota Superior y Código Fuente',
        clipPath: 'inset(16% 59% 49% 18%)',
        delaySec: 0.20
      },
      {
        id: 'web-tr-edit',
        label: 'Editar Sección',
        clipPath: 'inset(18% 18% 64% 64%)',
        delaySec: 0.36
      },
      {
        id: 'web-left-tree',
        label: 'Árbol de Estructura',
        clipPath: 'inset(28% 65% 50% 18%)',
        delaySec: 0.52
      },
      {
        id: 'web-right-gallery',
        label: 'Galería de Imágenes',
        clipPath: 'inset(33% 18% 48% 64%)',
        delaySec: 0.68
      },
      {
        id: 'web-right-services',
        label: 'Módulo de Servicios',
        clipPath: 'inset(49% 18% 36% 64%)',
        delaySec: 0.84
      },
      {
        id: 'web-bl-nodes',
        label: 'Bloques Inferiores Izquierdos',
        clipPath: 'inset(50% 59% 10% 18%)',
        delaySec: 1.00
      },
      {
        id: 'web-br-contact',
        label: 'Bloques de Mapa y Contacto',
        clipPath: 'inset(64% 18% 10% 64%)',
        delaySec: 1.16
      }
    ]
  },
  {
    index: 3,
    stepNumber: '04',
    title: 'Tienda E-Commerce',
    subtitle: 'CARRITO, PRODUCTOS Y PASARELAS',
    imageSrc: '/images/hero/scene-04-ecommerce.jpg',
    // Caja principal azul central (Ventana E-Commerce Studio)
    mainBoxClipPath: 'inset(16% 36% 10% 41%)',
    satellites: [
      {
        id: 'ec-tl-code',
        label: 'Nota Superior y Código',
        clipPath: 'inset(16% 59% 49% 18%)',
        delaySec: 0.20
      },
      {
        id: 'ec-tr-cart',
        label: 'Añadir a la Cesta / Carrito de Compras',
        clipPath: 'inset(18% 18% 57% 64%)',
        delaySec: 0.38
      },
      {
        id: 'ec-left-sales',
        label: 'Panel Venta de Compras',
        clipPath: 'inset(28% 65% 50% 18%)',
        delaySec: 0.56
      },
      {
        id: 'ec-right-gallery',
        label: 'Galería y Detalles de Producto',
        clipPath: 'inset(41% 18% 35% 64%)',
        delaySec: 0.74
      },
      {
        id: 'ec-bl-nodes',
        label: 'Nodo Inferior Izquierdo',
        clipPath: 'inset(50% 59% 10% 18%)',
        delaySec: 0.92
      },
      {
        id: 'ec-br-map',
        label: 'Bloque Inferior Derecho',
        clipPath: 'inset(64% 18% 10% 64%)',
        delaySec: 1.10
      }
    ]
  },
  {
    index: 4,
    stepNumber: '05',
    title: 'Agente IA 24/7',
    subtitle: 'ENTRENAMIENTO, CHAT Y AUTOMATIZACIÓN',
    imageSrc: '/images/hero/scene-05-ai.jpg',
    // Caja principal azul central (Ventana Agente IA)
    mainBoxClipPath: 'inset(16% 36% 10% 41%)',
    satellites: [
      {
        id: 'ai-tl-code',
        label: 'Nota Superior y Código IA',
        clipPath: 'inset(16% 59% 49% 18%)',
        delaySec: 0.20
      },
      {
        id: 'ai-tr-history',
        label: 'Historial de Chat',
        clipPath: 'inset(18% 18% 64% 64%)',
        delaySec: 0.36
      },
      {
        id: 'ai-left-tree',
        label: 'Estructura del Agente',
        clipPath: 'inset(28% 65% 50% 18%)',
        delaySec: 0.52
      },
      {
        id: 'ai-right-training',
        label: 'Entrenamiento del Modelo y Flujos',
        clipPath: 'inset(33% 16% 40% 64%)',
        delaySec: 0.68
      },
      {
        id: 'ai-bl-nodes',
        label: 'Nodos de Base de Conocimiento',
        clipPath: 'inset(50% 59% 10% 18%)',
        delaySec: 0.84
      },
      {
        id: 'ai-br-auto',
        label: 'Configurar Automatizaciones y QR Agente',
        clipPath: 'inset(58% 18% 10% 64%)',
        delaySec: 1.00
      }
    ]
  }
];

export const HeroSection: React.FC = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [isHoverPaused, setIsHoverPaused] = useState<boolean>(false);
  // cascadeCycleKey fuerza el re-disparo limpio de la cascada cada vez que cambia la escena
  const [cascadeCycleKey, setCascadeCycleKey] = useState<number>(0);

  // Cambio automático entre las 5 escenas cada 5.2 segundos (se pausa al pasar el mouse)
  useEffect(() => {
    if (isHoverPaused) return;

    const timer = window.setTimeout(() => {
      setActiveSceneIndex((prev) => (prev + 1) % HERO_SCENES.length);
      setCascadeCycleKey((prev) => prev + 1);
    }, 5200);

    return () => window.clearTimeout(timer);
  }, [activeSceneIndex, isHoverPaused]);

  // Escuchar selección directa desde el menú desplegable "Servicios" del Navbar
  useEffect(() => {
    const handleMenuSceneSelect = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === 'number') {
        setActiveSceneIndex(customEvent.detail);
        setCascadeCycleKey((prev) => prev + 1);
      }
    };
    window.addEventListener('gevo:select-hero-scene', handleMenuSceneSelect);
    return () => window.removeEventListener('gevo:select-hero-scene', handleMenuSceneSelect);
  }, []);

  const handleSelectScene = (index: number) => {
    setActiveSceneIndex(index);
    setCascadeCycleKey((prev) => prev + 1);
  };

  const currentScene = HERO_SCENES[activeSceneIndex];

  return (
    <section className="relative min-h-[95vh] pt-28 pb-12 md:pt-32 md:pb-20 flex items-center justify-center overflow-hidden gevo-hero-bg">
      {/* Rejilla Arquitectónica Sutil (42px x 42px, #22C58B al 8% de opacidad) + Halos Ambientales */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden gevo-hero-arch-grid">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[560px] md:w-[780px] h-[340px] md:h-[460px] bg-gradient-to-tr from-[#0D4A34]/45 via-[#22C58B]/12 to-transparent rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[550px] h-[550px] bg-[#38BDF8]/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-8 left-10 w-80 h-80 bg-[#F4C145]/10 rounded-full blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* =================================================================
              COLUMNA IZQUIERDA: PROPUESTA DE VALOR COMERCIAL
              ================================================================= */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-5 z-20">
            
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
              COLUMNA DERECHA (GRANDE A ESPACIO COMPLETO):
              CAJA PRINCIPAL AZUL + CAJAS SATÉLITES CAYENDO EN CASCADA UNA POR UNA
              ================================================================= */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center">
            
            {/* Indicador Superior de Escena Activa */}
            <div className="mb-2 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#02120C]/85 border border-[#38BDF8]/40 text-xs text-[#67E8F9] shadow-[0_0_25px_rgba(56,189,248,0.25)] backdrop-blur-md z-30">
              {isHoverPaused ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#F4C145] animate-pulse" />
                  <span className="font-semibold text-[#F4C145]">
                    Escena en Pausa • {currentScene.stepNumber} {currentScene.title}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#24D28D] animate-pulse" />
                  <span className="font-semibold text-[#F0F7F8]">
                    {currentScene.stepNumber} •{' '}
                    <span className="text-[#67E8F9]">{currentScene.title}</span>
                    <span className="hidden sm:inline text-gray-400 font-normal">
                      {' '}— {currentScene.subtitle}
                    </span>
                  </span>
                </>
              )}
            </div>

            {/* Lienzo Grande a Espacio Completo (Sin Marco Exterior, ocupando todo el ancho y alto disponible) */}
            <div
              key={`${currentScene.index}-${cascadeCycleKey}`}
              onMouseEnter={() => setIsHoverPaused(true)}
              onMouseLeave={() => setIsHoverPaused(false)}
              className="relative w-full h-[380px] sm:h-[490px] md:h-[560px] lg:h-[600px] flex items-center justify-center overflow-visible select-none"
            >
              {/* Contenedor Escalado para que la Caja Azul y sus Cajas Alrededor se vean GRANDES ocupando todo el espacio */}
              <div
                className="relative w-full h-full scale-[1.16] sm:scale-[1.26] lg:scale-[1.34] transition-transform duration-500"
                style={{
                  mixBlendMode: 'lighten',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 68% 68% at 50% 52%, #000 72%, transparent 100%)',
                  maskImage:
                    'radial-gradient(ellipse 68% 68% at 50% 52%, #000 72%, transparent 100%)'
                }}
              >
                {/* 1. CAJA PRINCIPAL AZUL EN EL CENTRO (Cae Primero en t = 0s) */}
                <img
                  src={currentScene.imageSrc}
                  alt={`${currentScene.title} - Caja Principal Azul`}
                  draggable={false}
                  className="animate-central-blue-drop absolute inset-0 w-full h-full object-contain pointer-events-none"
                  style={{
                    clipPath: currentScene.mainBoxClipPath,
                    animationDelay: '0s'
                  }}
                />

                {/* 2. CADA CAJA SATÉLITE ALREDEDOR DE LA CAJA AZUL (Caen una tras otra en Cascada) */}
                {currentScene.satellites.map((sat) => (
                  <img
                    key={sat.id}
                    src={currentScene.imageSrc}
                    alt={`${currentScene.title} - ${sat.label}`}
                    draggable={false}
                    className="animate-satellite-cascade absolute inset-0 w-full h-full object-contain pointer-events-none"
                    style={{
                      clipPath: sat.clipPath,
                      animationDelay: `${sat.delaySec}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Selector Inferior de las 5 Escenas para Reproducir Cualquier Cascada al Instante */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 z-30">
              {HERO_SCENES.map((scene) => {
                const isActive = activeSceneIndex === scene.index;
                return (
                  <button
                    key={scene.index}
                    type="button"
                    onClick={() => handleSelectScene(scene.index)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#22C58B] text-[#02120C] border-[#67E8F9] shadow-[0_0_18px_rgba(34,197,139,0.75)] scale-105'
                        : 'bg-[#05281C]/85 text-gray-300 border-white/15 hover:border-[#38BDF8] hover:text-white'
                    }`}
                  >
                    {scene.stepNumber} • {scene.title}
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
