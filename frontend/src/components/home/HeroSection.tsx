'use client';

import React from 'react';
import Link from 'next/link';
import { GevoText } from '@/components/common/GevoText';
import { 
  Sparkles, 
  ArrowRight, 
  Smartphone, 
  ShoppingBag, 
  ShieldCheck, 
  Bot, 
  TrendingUp, 
  Wifi, 
  QrCode 
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-16 md:pt-40 md:pb-24 flex items-center justify-center overflow-hidden">
      {/* Background Animated Dynamic Video-Inspired Glows & Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[350px] md:h-[500px] bg-gradient-to-tr from-amber-500/15 via-emerald-500/15 to-transparent rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />

        {/* Dynamic Grid / Cyber Mesh */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Mensaje Central & Propuesta de Valor */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Pill Flotante de Estado */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-amber-500/30 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-semibold tracking-wide text-gray-200">
                Ecosistema Comercial de Nueva Generación
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                G-evo 2.0
              </span>
            </div>

            {/* Titular Principal con Identidad Tipográfica Oficial */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Haz que tu negocio evolucione con{' '}
              <GevoText />
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Diseñamos y desplegamos tus <span className="text-amber-300 font-semibold">Tarjetas Digitales Inteligentes (NFC/QR)</span> y <span className="text-emerald-400 font-semibold">Catálogos E-commerce Autónomos</span>. Una vez creados por nosotros, tú gestionas tus productos, fotos y precios con total libertad.
            </p>

            {/* Badges de Autoridad */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-gray-400 pt-2">
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <Wifi className="w-4 h-4 text-amber-400" />
                <span>NFC &amp; QR Dinámico</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <span>Pedidos a WhatsApp</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Agente IA 24/7 Disponible</span>
              </div>
            </div>

            {/* Botones de Acción / CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="#mostrario"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 hover:shadow-xl hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>Explorar Mostrario de Ejemplos</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="#servicios"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <span>Ver Servicios en Cascada</span>
              </Link>
            </div>

            {/* Métricas de Impacto */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-white">
                  +500
                </div>
                <div className="text-[11px] text-gray-400">
                  Tarjetas y Tiendas Activas
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-emerald-400">
                  0%
                </div>
                <div className="text-[11px] text-gray-400">
                  Comisión por Ventas
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-amber-400">
                  24/7
                </div>
                <div className="text-[11px] text-gray-400">
                  Soporte y Asistencia IA
                </div>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Mockup Interactivo de la Experiencia Móvil / Tarjeta G-evo */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Contenedor del Mockup Celular con Efecto Flotante */}
            <div className="relative w-[300px] sm:w-[320px] rounded-[42px] p-3.5 bg-gradient-to-b from-amber-500/30 via-white/10 to-emerald-500/30 shadow-2xl border border-white/20 backdrop-blur-2xl">
              
              {/* Pantalla del Celular */}
              <div className="w-full bg-[#0B101C] rounded-[34px] p-5 overflow-hidden border border-white/5 space-y-4">
                
                {/* Barra superior de estado */}
                <div className="flex items-center justify-between text-[11px] text-gray-400 pb-2 border-b border-white/5">
                  <span className="font-semibold text-white">9:41</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3 text-emerald-400" />
                    <span>5G</span>
                  </div>
                </div>

                {/* Tarjeta Virtual Intermedia de Laura Restrepo (Caso Real Mostrario) */}
                <div className="relative rounded-2xl p-4 bg-gradient-to-br from-[#161F33] to-[#0D1322] border border-amber-500/40 shadow-lg overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
                  
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Smart Business Card
                    </div>
                    <div className="p-1 rounded-md bg-white/5 text-emerald-400">
                      <Wifi className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center font-bold text-amber-300 text-lg">
                      LR
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">
                        Laura Restrepo
                      </div>
                      <div className="text-[11px] text-emerald-400 font-medium">
                        Branding &amp; Estrategia
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-gray-400">Verificado G-evo</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                      NFC Activo
                    </span>
                  </div>
                </div>

                {/* Vista Previa de Catálogo E-commerce con Carrito */}
                <div className="rounded-2xl p-3.5 bg-white/[0.03] border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-200">
                      Catálogo Disponible
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium">
                      Pedido a WhatsApp
                    </span>
                  </div>

                  {/* Item 1 */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 text-xs">
                    <div>
                      <div className="font-medium text-white text-[11px]">
                        Diagnóstico 360°
                      </div>
                      <div className="text-[10px] text-gray-400">
                        1 servicio
                      </div>
                    </div>
                    <span className="font-bold text-amber-400 text-xs">
                      $850.000
                    </span>
                  </div>

                  {/* Agente IA interactivo respondiendo */}
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[10px]">
                      <Bot className="w-3 h-3" />
                      Agente IA de Soporte
                    </div>
                    <p className="text-gray-300 text-[10px] leading-tight">
                      &quot;Hola, tenemos disponibilidad para auditorías esta semana. ¿Te gustaría agendar?&quot;
                    </p>
                  </div>
                </div>

                {/* Botón de Toque Rápido */}
                <div className="text-center pt-1">
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-gray-400">
                    <QrCode className="w-3.5 h-3.5 text-amber-400" />
                    <span>Toca para guardar contacto</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Tarjetas Flotantes Satélite para Efecto Tridimensional */}
            <div className="hidden sm:flex absolute -bottom-6 -left-8 p-3 rounded-2xl bg-[#0D1524]/90 border border-emerald-500/30 backdrop-blur-xl shadow-xl items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-gray-400 uppercase font-semibold">
                  Tasa de Respuesta
                </div>
                <div className="text-xs font-bold text-white">
                  Menos de 2 segundos (IA)
                </div>
              </div>
            </div>

            <div className="hidden sm:flex absolute -top-4 -right-6 p-3 rounded-2xl bg-[#0D1524]/90 border border-amber-500/30 backdrop-blur-xl shadow-xl items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-gray-400 uppercase font-semibold">
                  Control Central
                </div>
                <div className="text-xs font-bold text-white">
                  Multi-Tenant Aislado
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

