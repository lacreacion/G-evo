'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Share2, 
  Download, 
  QrCode, 
  ShieldCheck, 
  Send, 
  Check, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from '@/components/common/SocialIcons';

export const Footer: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Function to generate and download a standard .vcf (vCard) file
  const handleDownloadVCard = () => {
    const vCardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:G-evo Ecosistema Digital',
      'ORG:G-evo Technologies',
      'TITLE:Tarjetas y Catálogos Digitales',
      'TEL;TYPE=WORK,VOICE:+573001234567',
      'EMAIL;TYPE=PREF,INTERNET:contacto@g-evo.com',
      'URL:https://g-evo.com',
      'ADR;TYPE=WORK:;;Cra 43A # 1-50;Medellín;Antioquia;;Colombia',
      'NOTE:Ecosistema de Tarjetas Digitales Inteligentes NFC y Catálogos E-commerce Autónomos.',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Contacto_G-evo_Digital.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;

    // Send formatted message to WhatsApp
    const whatsappText = `¡Hola G-evo! Mi nombre es ${contactName}. Teléfono: ${contactPhone}. Mensaje: ${contactMessage || 'Me interesa cotizar una tarjeta digital o catálogo e-commerce.'}`;
    const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(whatsappText)}`;
    
    setFormSubmitted(true);
    window.open(whatsappUrl, '_blank');
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <footer id="contacto" className="relative bg-[#070B12] text-white border-t border-white/10 pt-20 pb-12 overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10 space-y-16">
        
        {/* Sección Superior: Tarjeta de Contacto Interactiva + Canales de Soporte */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Columna Izquierda: Tarjeta de Contacto Interactiva (vCard Virtual de G-evo) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Tarjeta Virtual Oficial
            </div>

            {/* Tarjeta Visual de Alta Fidelidad */}
            <div className="rounded-3xl bg-gradient-to-br from-[#121929] to-[#0A0F1A] border border-amber-500/40 p-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header de la Tarjeta */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <Logo size="sm" />
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold flex items-center gap-1 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  Verificado Oficial
                </span>
              </div>

              {/* Información de Contacto Directo */}
              <div className="mt-5 space-y-3.5 text-xs text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5 text-amber-400 border border-white/5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400">Atención Telefónica &amp; WhatsApp</div>
                    <a href="tel:+573001234567" className="font-semibold text-white hover:text-emerald-400 transition-colors">
                      +57 (300) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5 text-emerald-400 border border-white/5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400">Correo Electrónico Directo</div>
                    <a href="mailto:contacto@g-evo.com" className="font-semibold text-white hover:text-emerald-400 transition-colors">
                      contacto@g-evo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5 text-amber-400 border border-white/5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400">Sede Principal</div>
                    <div className="font-semibold text-white">
                      Medellín, Colombia • Envíos Nacionales e Internacionales
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5 text-emerald-400 border border-white/5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400">Horario de Soporte al Cliente</div>
                    <div className="font-semibold text-white">
                      Lunes a Sábado: 8:00 AM - 7:00 PM (COT)
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón Interactivo de Descarga vCard */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleDownloadVCard}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>¡Contacto Guardado!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-black" />
                      <span>Guardar en mi Teléfono (.vcf)</span>
                    </>
                  )}
                </button>

                <a
                  href="https://wa.me/573001234567?text=Hola%20G-evo,%20quiero%20cotizar%20mi%20tarjeta%20digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 flex items-center justify-center transition-colors"
                  title="Chatear por WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario Rápido de Cotización & Soporte */}
          <div className="lg:col-span-7 bg-[#0E1524] rounded-3xl border border-white/10 p-6 md:p-8 space-y-6">
            <div>
              <div className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Atención Inmediata
              </div>
              <h3 className="text-2xl font-bold text-white mt-1">
                ¿Listo para transformar la presencia de tu negocio?
              </h3>
              <p className="text-xs text-gray-400 mt-2">
                Déjanos tus datos y te contactaremos de inmediato con una cotización personalizada y demostración gratuita del Agente IA en tu tienda.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                    Nombre o Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Ej. Laura Restrepo"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                    WhatsApp o Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Ej. +57 300 123 4567"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                  ¿Qué solución necesitas?
                </label>
                <textarea
                  rows={3}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Ej. Deseo cotizar 5 tarjetas inteligentes NFC para mi equipo comercial y un catálogo digital e-commerce con asistente IA..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 shadow-xl hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-black" />
                <span>Enviar Solicitud a WhatsApp Directo</span>
              </button>
            </form>
          </div>

        </div>

        {/* Sección Media: Enlaces Sociales y Canales */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-medium">Síguenos en redes sociales:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-pink-400 border border-white/5 transition-colors"
                aria-label="Instagram de G-evo"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-blue-400 border border-white/5 transition-colors"
                aria-label="Facebook de G-evo"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-blue-300 border border-white/5 transition-colors"
                aria-label="LinkedIn de G-evo"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos de Navegación */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Inicio</Link>
            <Link href="#servicios" className="hover:text-emerald-400 transition-colors">Servicios</Link>
            <Link href="#mostrario" className="hover:text-amber-400 transition-colors">Mostrario</Link>
            <Link href="#ai-demo" className="hover:text-emerald-400 transition-colors">Agente IA</Link>
            <Link href="/login" className="hover:text-white transition-colors">Portal Clientes</Link>
          </div>
        </div>

        {/* Sección Inferior: Derechos, Ley y Cumplimiento Normativo */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-gray-500">
          <div>
            © 2026 <span className="text-gray-300 font-semibold">G-evo.</span> Todos los derechos reservados. Tecnología y Diseño Patentado.
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <span className="hover:text-gray-300 cursor-pointer">Protección de Datos (Habeas Data)</span>
            <span>•</span>
            <span className="hover:text-gray-300 cursor-pointer">Términos de Uso</span>
            <span>•</span>
            <span className="hover:text-gray-300 cursor-pointer">Política de Privacidad</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
