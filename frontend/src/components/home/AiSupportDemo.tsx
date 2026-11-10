'use client';

import React, { useState, useRef } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Key, 
  Clock, 
  Coins, 
  } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const AiSupportDemo: React.FC = () => {
  const messageCounterRef = useRef(10);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: '¡Hola! Soy el Agente de Soporte IA de G-evo. Estoy entrenado con el catálogo de Laura Restrepo. Puedes preguntarme por precios, horarios de asesoría, servicios de branding o disponibilidad de stock.',
      time: 'Ahora'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const predefinedQuestions = [
    '¿Cuánto cuesta la Auditoría y Diagnóstico 360°?',
    '¿Qué incluye el Manual de Marca?',
    '¿Tienen disponibilidad de asesorías esta semana?',
    '¿Cómo compro un servicio por WhatsApp?'
  ];

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || inputValue;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + (messageCounterRef.current++),
      sender: 'user',
      text: textToSend,
      time: 'Ahora'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputValue('');
    setIsTyping(true);

    // Simulated Knowledge-base grounded response from G-evo AI Engine
    setTimeout(() => {
      let botReply = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('auditor') || lower.includes('diagnóstico') || lower.includes('precio')) {
        botReply = 'La Auditoría y Diagnóstico de Marca 360° tiene un valor de $850.000 COP. Incluye una sesión intensiva 1 a 1 de 3 horas, análisis de coherencia gráfica y un reporte ejecutivo con plan de acción de 30 días.';
      } else if (lower.includes('manual') || lower.includes('identidad')) {
        botReply = 'El paquete de Identidad Corporativa & Manual de Marca cuesta $2.400.000 COP e incluye el diseño del imagotipo en formatos vectoriales, paleta cromática, tipografías corporativas y mockups comerciales.';
      } else if (lower.includes('horario') || lower.includes('disponib') || lower.includes('semana')) {
        botReply = 'Las asesorías 1 a 1 se programan de lunes a viernes entre 8:00 AM y 6:00 PM. Actualmente hay 5 cupos disponibles para agendar esta semana.';
      } else {
        botReply = `Entendido tu consulta sobre "${textToSend}". Como agente de IA entrenado para este catálogo, puedo canalizar tu pedido directamente a WhatsApp con el detalle exacto del servicio o producto.`;
      }

      const aiMsg: ChatMessage = {
        id: 'msg-' + (messageCounterRef.current++),
        sender: 'ai',
        text: botReply,
        time: 'Ahora'
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <section id="ai-demo" className="py-20 bg-[#042419]/80 relative border-t border-white/10 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#22C58B]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0A3C2A] border border-[#22C58B]/40 text-emerald-300 text-xs font-semibold">
            <Bot className="w-3.5 h-3.5" />
            <span>Módulo Monetizado de Inteligencia Artificial</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F0F7F8] tracking-tight">
            Agente de Soporte IA <span className="text-green-vibrant">Integrado 24/7</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Tus clientes finales disfrutan de una demostración gratuita. Si desean mantener el agente respondiendo dudas de stock, precios y horarios 24/7, pagan el módulo y tú les generas su código único de activación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Columna Izquierda: Simulador Interactivo del Chatbot con Catálogo Real */}
          <div className="lg:col-span-7 gevo-chassis rounded-3xl overflow-hidden flex flex-col h-[560px]">
            
            {/* Header del Chatbot (Cabezote Teal Satinado) */}
            <div className="p-4 gevo-header-bar flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-black" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#141C2E]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Agente IA G-evo</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                      Demo en Vivo
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Conocimiento activo: Catálogo Laura Restrepo
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  24/7 Activo
                </span>
              </div>
            </div>

            {/* Ventana de Mensajes */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0A0F1A]/70">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium rounded-tr-none'
                        : 'bg-[#162033] text-gray-200 border border-white/10 rounded-tl-none shadow-md'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`block text-[9px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-black/60' : 'text-gray-400'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-[#162033] border border-white/10 text-xs text-emerald-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] text-gray-400">Consultando catálogo...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sugerencias Rápidas (Soft UI Blanco Luminoso + Hover Seda Esmeralda) */}
            <div className="p-2.5 bg-[#042419]/90 border-t border-white/10 flex gap-2 overflow-x-auto scrollbar-none">
              {predefinedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="gevo-keycap-idle whitespace-nowrap px-3 py-1.5 text-[11px] cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#02140E]/90 border-t border-white/10 flex items-center gap-2.5">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe una pregunta sobre precios, productos o stock..."
                className="flex-1 bg-[#042419] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-[#F0F7F8] placeholder-gray-400 focus:outline-none focus:border-[#22C58B]"
              />
              <button
                onClick={() => handleSend()}
                className="gevo-keycap-active p-2.5 cursor-pointer"
                aria-label="Enviar mensaje"
              >
                <Send className="w-4 h-4 text-[#157A54]" />
              </button>
            </div>

          </div>

          {/* Columna Derecha: Modelo Comercial & Sistema de Licencias */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tarjeta del Flujo de Monetización */}
            <div className="rounded-3xl gevo-chassis border border-amber-500/30 p-6 md:p-8 space-y-5">
              <div className="flex items-center gap-2.5 text-amber-400">
                <Coins className="w-5 h-5" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs">
                  Flujo Comercial de Licenciamiento
                </h3>
              </div>

              <div className="space-y-4 text-xs text-gray-300">
                <div className="flex items-start gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="text-white">Demostración Gratuita:</strong> Cada cliente recibe su tienda con una prueba del chatbot para ver cómo responde con su propio inventario.
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="text-white">Pago del Módulo Adicional:</strong> Si desea mantener el bot activo 24/7 sin límites, realiza el pago mensual o anual a tu cuenta.
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="text-white">Emisión de Código Criptográfico:</strong> Generas desde tu Panel Maestro un código único e intransferible.
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <strong className="text-white">Activación Inmediata:</strong> El cliente ingresa el código en su panel y el sistema habilita el agente permanentemente.
                  </div>
                </div>
              </div>

              {/* Ejemplo Visual del Código de Activación */}
              <div className="p-3.5 rounded-2xl bg-black/50 border border-emerald-500/40 text-center space-y-1.5">
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  Estructura de Código de Licencia G-evo
                </div>
                <div className="font-mono text-sm sm:text-base font-black text-emerald-300 tracking-wider">
                  GEVO-LAUR-AI24-8F92A1
                </div>
                <div className="text-[10px] text-gray-500">
                  Firmado con SHA-256 • Aislamiento estricto por inquilino
                </div>
              </div>
            </div>

            {/* Asistente de Redacción e Imágenes */}
            <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Asistente de Redacción e Imágenes</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Herramienta interna para ayudarte a ti y a tus clientes a redactar descripciones persuasivas de productos, generar sugerencias SEO y optimizar fotografías en segundos antes de publicar.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

