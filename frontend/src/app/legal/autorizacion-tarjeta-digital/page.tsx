'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileDown, Printer, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/common/Logo';

export default function LegalAutorizacionTarjetaDigitalPage() {
  return (
    <div className="min-h-screen bg-[#060913] text-white py-10 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black print:py-2">
      <div className="max-w-4xl mx-auto">
        {/* Barra superior de acciones (oculta al imprimir) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4 text-[#FFCC00]" />
            <span>Volver al inicio</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="/docs/terminos-y-autorizacion-tarjeta-digital.pdf"
              download="terminos-y-autorizacion-tarjeta-digital-v1.1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFCC00]/15 border border-[#FFCC00]/40 text-[#FFCC00] hover:bg-[#FFCC00]/25 text-xs font-bold transition"
            >
              <FileDown className="w-4 h-4" />
              <span>Descargar PDF Oficial (v1.1)</span>
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#060913] text-xs font-extrabold transition"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar PDF</span>
            </button>
          </div>
        </div>

        {/* Contenedor del Documento Legal Oficial */}
        <article className="rounded-3xl bg-[#0D1326] border border-white/15 p-6 sm:p-10 shadow-2xl space-y-6 print:bg-white print:border-gray-300 print:shadow-none print:text-black">
          <header className="border-b border-white/10 pb-6 space-y-3 print:border-gray-300">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Logo size="md" />
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold print:text-emerald-800 print:border-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                Versión Oficial 1.1
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white print:text-black pt-2">
              AUTORIZACIÓN DE TRATAMIENTO DE DATOS PERSONALES Y TÉRMINOS DE USO DE TARJETA DIGITAL INTELIGENTE — ECOSISTEMA G-EVO
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-300 print:text-gray-700 pt-1">
              <div><strong className="text-[#FFCC00] print:text-black">Versión del documento:</strong> 1.1</div>
              <div><strong className="text-[#FFCC00] print:text-black">Plataforma:</strong> G-evo Digital Hub</div>
              <div><strong className="text-[#FFCC00] print:text-black">Cumplimiento:</strong> Habeas Data / GDPR</div>
            </div>
            <p className="text-xs text-gray-400 print:text-gray-600">
              <strong>Marco Normativo Aplicable:</strong> Ley Estatutaria 1581 de 2012, Decreto 1377 de 2013 (Habeas Data - Colombia), Ley 527 de 1999 (Comercio Electrónico y Firmas Digitales) y estándares internacionales de protección de datos (GDPR).
            </p>
          </header>

          {/* 1. OBJETO */}
          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-extrabold text-[#FFCC00] print:text-black">
              1. OBJETO DEL DOCUMENTO
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed print:text-gray-800">
              El presente documento regula la autorización expresa para el tratamiento y publicación de datos personales y comerciales, así como las condiciones legales de uso, gestión de enlaces externos y responsabilidades aplicables al titular (en adelante, <strong>EL CLIENTE</strong>) al configurar, crear o actualizar su Tarjeta Digital Inteligente (NFC/QR) dentro de la plataforma administrada por <strong>G-evo</strong>.
            </p>
          </section>

          {/* 2. HABEAS DATA */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-extrabold text-[#FFCC00] print:text-black">
              2. AUTORIZACIÓN DE TRATAMIENTO Y PUBLICACIÓN DE DATOS (HABEAS DATA)
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed print:text-gray-800">
              Al marcar la casilla <em>&ldquo;Sí autorizo&rdquo;</em> en el panel de administración de su perfil, <strong>EL CLIENTE</strong> otorga su consentimiento previo, expreso e informado a <strong>G-evo</strong> para recolectar, almacenar, procesar y mostrar públicamente la información ingresada en su Tarjeta Digital, teniendo en cuenta que:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed list-disc pl-5 print:text-gray-800">
              <li>
                <strong>Naturaleza pública de la Tarjeta Digital:</strong> EL CLIENTE comprende y acepta que la finalidad principal de la Tarjeta Digital Inteligente es compartir información de contacto, perfil profesional o comercial con terceros mediante enlaces web, códigos QR o tecnología NFC. Por tanto, los datos allí consignados (nombre, cargo, fotografías, teléfonos, correos electrónicos, dirección comercial y redes sociales) serán de acceso público para cualquier persona que escanee o acceda al enlace de la tarjeta.
              </li>
              <li>
                <strong>Derechos del Titular (ARCO):</strong> EL CLIENTE conserva en todo momento sus derechos constitucionales y legales a conocer, actualizar, rectificar y suprimir sus datos personales, así como a revocar esta autorización mediante la edición directa en su panel privado o solicitando la baja del servicio al administrador de G-evo.
              </li>
              <li>
                <strong>Seguridad y Aislamiento Multi-Tenant:</strong> G-evo garantiza que las credenciales de acceso (login/PIN) y la administración interna del perfil se encuentran protegidas bajo esquemas de aislamiento seguro, impidiendo que otros usuarios no autorizados modifiquen su información.
              </li>
            </ul>
          </section>

          {/* 3. ENLACES EXTERNOS */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-extrabold text-[#FFCC00] print:text-black">
              3. RESPONSABILIDAD SOBRE ENLACES EXTERNOS (LINKS), CATÁLOGOS Y CONTENIDOS
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed print:text-gray-800">
              La Tarjeta Digital Inteligente permite vincular botones interactivos hacia sitios externos tales como perfiles de redes sociales (Instagram, Facebook, LinkedIn, TikTok), líneas de WhatsApp, catálogos digitales, páginas web y pasarelas de pago. Respecto a estos enlaces, <strong>EL CLIENTE</strong> declara y acepta que:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed list-disc pl-5 print:text-gray-800">
              <li>
                <strong>Titularidad y Control Exclusivo:</strong> EL CLIENTE es el único responsable de la veracidad, legalidad, seguridad y titularidad de las URLs, números de contacto, archivos, fotografías, textos y enlaces externos que agregue o modifique desde su panel de usuario.
              </li>
              <li>
                <strong>Prohibición de Contenidos Ilícitos:</strong> Queda estrictamente prohibido utilizar la Tarjeta Digital de G-evo para redirigir a sitios de phishing, estafas, malware, contenido fraudulento, suplantación de identidad, material sin derechos de autor o actividades contrarias a la ley. El incumplimiento de esta cláusula facultará al Administrador Principal de G-evo para suspender o dar de baja la tarjeta de manera inmediata sin derecho a indemnización.
              </li>
              <li>
                <strong>Exoneración de Responsabilidad de G-evo:</strong> G-evo actúa exclusivamente como proveedor de la infraestructura tecnológica y de diseño de la Tarjeta Digital. G-evo no audita en tiempo real ni asume responsabilidad civil, comercial, penal o administrativa por las transacciones, caídas de servicio de terceros, fraudes o perjuicios derivados del acceso a los enlaces externos configurados por EL CLIENTE.
              </li>
            </ul>
          </section>

          {/* 4. PROPIEDAD INTELECTUAL */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-extrabold text-[#FFCC00] print:text-black">
              4. PROPIEDAD INTELECTUAL Y LICENCIA DE USO
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed list-disc pl-5 print:text-gray-800">
              <li>
                <strong>Marca y Plataforma:</strong> El diseño estructural, código fuente, arquitectura e identidad visual del ecosistema G-evo son propiedad exclusiva de G-evo. La emisión de la tarjeta digital otorga al CLIENTE una licencia de uso sobre su perfil activo, sin transferir propiedad sobre el software base.
              </li>
              <li>
                <strong>Contenido del Cliente:</strong> Las marcas, logotipos comerciales, fotografías de productos y reseñas profesionales subidas por EL CLIENTE a su perfil seguirán siendo de su exclusiva propiedad, otorgando a G-evo una licencia no exclusiva únicamente para alojarlos y visualizarlos dentro de la tarjeta digital y, salvo pacto en contrario, como referencia en el mostrario corporativo de G-evo.
              </li>
            </ul>
          </section>

          {/* 5. FIRMA ELECTRÓNICA */}
          <section className="space-y-2">
            <h2 className="text-sm sm:text-base font-extrabold text-[#FFCC00] print:text-black">
              5. REGISTRO DE ACEPTACIÓN ELECTRÓNICA (AUDITORÍA)
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed print:text-gray-800">
              De conformidad con la Ley 527 de 1999 sobre comercio electrónico y firmas digitales, la marcación de la casilla <em>&ldquo;Sí autorizo&rdquo;</em> en el formulario de creación o edición de perfil dentro de la plataforma G-evo constituye una firma electrónica válida y vinculante. El sistema registrará de forma automática la fecha, hora exacta (<code>Timestamp UTC</code>) y versión de los términos aceptados (<code>1.1</code>) como soporte de auditoría legal.
            </p>
          </section>

          {/* 6. VIGENCIA Y SOPORTE */}
          <section className="space-y-2.5">
            <h2 className="text-sm sm:text-base font-extrabold text-[#FFCC00] print:text-black">
              6. VIGENCIA, RENOVACIÓN Y ALCANCE DEL SOPORTE TÉCNICO
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed list-disc pl-5 print:text-gray-800">
              <li>
                <strong>Vigencia y Renovación del Servicio:</strong> La licencia de uso y alojamiento de la Tarjeta Digital Inteligente en la infraestructura de G-evo estará sujeta al periodo de vigencia contratado (mensual o anual) por EL CLIENTE. En caso de no efectuarse la renovación oportuna dentro de los plazos acordados, G-evo podrá suspender temporalmente la visualización pública del enlace/QR conservando la información en el panel privado por un periodo de gracia de treinta (30) días calendario antes de su eliminación definitiva.
              </li>
              <li>
                <strong>Disponibilidad y Soporte Técnico:</strong> G-evo garantiza el mantenimiento correctivo de la plataforma base y la disponibilidad del enlace público. La actualización de datos de contacto, cambio de fotografías, ajuste de enlaces o modificación de textos dentro del perfil es un proceso de autogestión a cargo de EL CLIENTE desde su panel administrativo; cualquier solicitud para que el Administrador de G-evo realice cambios manuales o rediseños estructurales podrá generar costos operativos adicionales.
              </li>
            </ul>
          </section>

          <footer className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400 print:border-gray-300 print:text-gray-600">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold print:text-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
              Documento Auditado por 15-agente-legal • Ecosistema G-evo.
            </span>
            <span>Versión 1.1 • Vigente</span>
          </footer>
        </article>
      </div>
    </div>
  );
}

