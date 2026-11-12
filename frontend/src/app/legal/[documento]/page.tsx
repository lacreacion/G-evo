import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { ShieldCheck, FileText, Download, ArrowLeft, CheckCircle2, Scale, Lock, Cookie } from 'lucide-react';

interface LegalDocumentContent {
  slug: string;
  pdfFile: string;
  badge: string;
  title: string;
  subtitle: string;
  version: string;
  category: 'servicio' | 'transversal';
  sections: {
    heading: string;
    body: string;
  }[];
}

const LEGAL_DOCUMENTS: Record<string, LegalDocumentContent> = {
  'terminos-tarjeta-digital': {
    slug: 'terminos-tarjeta-digital',
    pdfFile: '/docs/terminos-tarjeta-digital.pdf',
    badge: 'Servicio 01 • Tarjeta Digital (URL & QR)',
    title: 'Términos y Condiciones — Tarjeta Personal Digital Interactiva',
    subtitle: 'Regulación de perfil público interactivo, código QR dinámico, descarga vCard (.vcf) y responsabilidad sobre enlaces.',
    version: '2.0',
    category: 'servicio',
    sections: [
      {
        heading: '1. Objeto del Servicio y Alcance del Perfil Público',
        body: 'El presente documento regula el aprovisionamiento y uso de la Tarjeta Personal Digital Interactiva de G-evo (/t/[slug]), equipada con enlace URL personalizado, código QR dinámico y ficha de contacto descargable (.vcf). Al activar o actualizar su tarjeta, el Titular autoriza que los datos profesionales configurados sean visibles públicamente para quienes accedan a su enlace o código QR.'
      },
      {
        heading: '2. Responsabilidad Exclusiva sobre Enlaces Externos y Redes Sociales',
        body: 'El Titular y/o Comercio Cliente es el único y exclusivo responsable de la legitimidad, titularidad, seguridad y veracidad de las URLs externas, perfiles de redes sociales (Instagram, LinkedIn, Facebook, TikTok), números de WhatsApp y portafolios vinculados en su Tarjeta Digital.'
      },
      {
        heading: '3. Prohibiciones de Uso y Suspensión Preventiva',
        body: 'Queda estrictamente prohibido utilizar la Tarjeta Digital para alojar enlaces de suplantación de identidad (phishing), software malicioso, esquemas fraudulentos o contenidos que vulneren derechos de autor. G-evo podrá suspender preventivamente cualquier perfil que incumpla estas normas.'
      },
      {
        heading: '4. Protección mediante PIN de Propietario y Aislamiento Multi-Tenant',
        body: 'La edición en vivo de la tarjeta está resguardada por un PIN de propietario y validación de sesión JWT aislada por tenant_id, garantizando que ningún tercero no autorizado pueda modificar la información del titular.'
      }
    ]
  },
  'terminos-catalogo-digital': {
    slug: 'terminos-catalogo-digital',
    pdfFile: '/docs/terminos-catalogo-digital.pdf',
    badge: 'Servicio 02 • Catálogo Digital Autónomo',
    title: 'Términos y Condiciones — Catálogo Digital Autónomo',
    subtitle: 'Exhibición de referencias, fotografías de productos, precios informativos y estructuración de pedidos directos a WhatsApp.',
    version: '2.0',
    category: 'servicio',
    sections: [
      {
        heading: '1. Naturaleza del Catálogo Digital Autónomo',
        body: 'El Catálogo Digital Autónomo de G-evo permite al Comercio Cliente exhibir sus referencias, categorías, precios, variantes y disponibilidad en tiempo real, facilitando a sus visitantes armar un pedido estructurado que se envía directamente al WhatsApp oficial del negocio sin comisiones por venta.'
      },
      {
        heading: '2. Derechos de Imagen, Marcas y Exactitud del Inventario',
        body: 'El Comercio Cliente declara ser titular o contar con autorización sobre todas las fotografías, descripciones, logotipos y referencias publicadas en su catálogo, y se compromete a mantener actualizados los precios y el stock conforme al Estatuto del Consumidor (Ley 1480 de 2011).'
      },
      {
        heading: '3. Independencia en la Relación Comercial con el Comprador Final',
        body: 'G-evo provee la infraestructura tecnológica de exhibición y canalización del pedido hacia WhatsApp. El cierre de la venta, facturación, recaudo, despacho y garantía del producto o servicio son responsabilidad exclusiva del Comercio Cliente.'
      }
    ]
  },
  'terminos-pagina-web': {
    slug: 'terminos-pagina-web',
    pdfFile: '/docs/terminos-pagina-web.pdf',
    badge: 'Servicio 03 • Creación de Páginas Web',
    title: 'Términos y Condiciones — Creación de Páginas Web de Alto Impacto',
    subtitle: 'Propiedad intelectual de contenidos, soporte técnico, entrega autónoma (Standalone Export) y sello oficial de respaldo.',
    version: '2.0',
    category: 'servicio',
    sections: [
      {
        heading: '1. Modalidad de Proyecto Independiente (Standalone Export)',
        body: 'Las Páginas Web corporativas y Landing Pages desarrolladas por G-evo se construyen bajo arquitectura moderna desacoplada y pueden entregarse como paquete autónomo listo para despliegue en el dominio y servidor propio del cliente o bajo alojamiento administrado.'
      },
      {
        heading: '2. Propiedad Intelectual de Contenidos del Cliente',
        body: 'El Cliente conserva el 100% de la titularidad sobre sus signos distintivos, manual de marca, textos corporativos, fotografías y material audiovisual suministrado para la construcción de su página web.'
      },
      {
        heading: '3. Garantía Técnica, Soporte y Sello Oficial G-evo',
        body: 'G-evo garantiza la correcta compilación, diseño responsivo Mobile-First y optimización SEO base al momento de la entrega. Toda página web creada e impulsada por nuestra fábrica integra en su pie de página el sello oficial: "Página Web • Creada y respaldada por G-evo." con enlace hacia la plataforma principal.'
      }
    ]
  },
  'terminos-tienda-ecommerce': {
    slug: 'terminos-tienda-ecommerce',
    pdfFile: '/docs/terminos-tienda-ecommerce.pdf',
    badge: 'Servicio 04 • Tiendas E-Commerce Completas',
    title: 'Términos y Condiciones — Tiendas E-Commerce Completas & Autogestionables',
    subtitle: 'Regulación de comercio electrónico, integración con pasarelas de pago, garantías legales, retracto y logística de envíos.',
    version: '2.0',
    category: 'servicio',
    sections: [
      {
        heading: '1. Operación de Comercio Electrónico y Pasarelas de Pago',
        body: 'Las Tiendas E-Commerce desarrolladas por G-evo integran carrito de compras avanzado, cálculo de envíos y conexión con pasarelas de pago certificadas PCI-DSS (tarjetas débito/crédito, PSE, Nequi, etc.). Los fondos recaudados ingresan directamente a la cuenta comercial del Cliente en su pasarela.'
      },
      {
        heading: '2. Obligaciones del Comercio frente al Consumidor Final (Ley 1480 de 2011)',
        body: 'El Comercio titular de la Tienda E-Commerce actúa como proveedor directo ante los compradores finales y asume de manera exclusiva las obligaciones de entrega oportuna, calidad, idoneidad, garantía legal, reversión de pagos y derecho de retracto.'
      },
      {
        heading: '3. Paquete Entregable y Sello de Respaldo',
        body: 'La tienda se estructura como un proyecto autónomo exportable (/exports/[cliente]/) listo para producción en dominio propio e incluye en su Footer el sello oficial: "Tienda E-commerce • Creada y respaldada por G-evo."'
      }
    ]
  },
  'terminos-agente-ia': {
    slug: 'terminos-agente-ia',
    pdfFile: '/docs/terminos-agente-ia.pdf',
    badge: 'Servicio 05 • Agente de Soporte IA 24/7',
    title: 'Términos y Condiciones — Agente de Soporte IA 24/7',
    subtitle: 'Uso de licencia criptográfica GEVO, respuestas automatizadas 24/7 y entrenamiento aislado con datos del catálogo.',
    version: '2.0',
    category: 'servicio',
    sections: [
      {
        heading: '1. Licenciamiento Criptográfico Único e Intransferible',
        body: 'El módulo de Agente de Soporte IA 24/7 cuenta con un modo de demostración inicial y se desbloquea de forma permanente mediante un código criptográfico único con formato GEVO-{SLUG}-{MOD}-{CHECKSUM} firmado con SHA-256 por el Administrador Maestro tras la verificación del pago.'
      },
      {
        heading: '2. Entrenamiento Aislado por Inquilino (Multi-Tenant Isolation)',
        body: 'El Agente IA utiliza exclusivamente la información de productos, precios, descripciones, stock y horarios registrados por el propio Comercio Cliente en su catálogo aislado. Los datos de un inquilino jamás se mezclan ni se exponen en las respuestas de otro comercio.'
      },
      {
        heading: '3. Alcance de las Respuestas Automatizadas',
        body: 'El Comercio Cliente es responsable de verificar que los precios, condiciones y descripciones cargadas en su inventario sean exactos, dado que el asistente automatizado utiliza dicha base de conocimiento para orientar a los visitantes las 24 horas.'
      }
    ]
  },
  'politica-privacidad-habeas-data': {
    slug: 'politica-privacidad-habeas-data',
    pdfFile: '/docs/politica-privacidad-habeas-data.pdf',
    badge: 'Documento Transversal Obligatorio • Habeas Data & GDPR',
    title: 'Política de Privacidad y Tratamiento de Datos Personales',
    subtitle: 'Cumplimiento integral de la Ley Estatutaria 1581 de 2012, Decreto 1377 de 2013 (Colombia) y estándares GDPR.',
    version: '2.0',
    category: 'transversal',
    sections: [
      {
        heading: '1. Identificación del Responsable y Encargado del Tratamiento',
        body: 'G-evo Digital Hub actúa como Responsable del Tratamiento respecto de los datos de registro, facturación y auditoría legal de sus clientes empresariales, y como Encargado del Tratamiento respecto de la información comercial alojada en cada entorno multi-tenant aislado por tenant_id.'
      },
      {
        heading: '2. Finalidades del Tratamiento y Auditoría Legal Diferenciada',
        body: 'Los datos recolectados se utilizan para: (a) aprovisionar y operar los 5 servicios del ecosistema G-evo; (b) autenticar usuarios mediante tokens JWT; y (c) registrar en la tabla inmutable tenant_legal_consents el servicio aceptado, versión documental, dirección IP y marca de tiempo exacta en UTC.'
      },
      {
        heading: '3. Ejercicio de Derechos de Habeas Data (Conocer, Actualizar, Rectificar y Suprimir)',
        body: 'Todo titular de datos personales puede ejercer gratuitamente sus derechos de consulta, actualización, rectificación o revocatoria de autorización desde su Panel de Gestión Autónomo (/portal) o a través de los canales oficiales de soporte de G-evo.'
      }
    ]
  },
  'politica-de-cookies': {
    slug: 'politica-de-cookies',
    pdfFile: '/docs/politica-de-cookies.pdf',
    badge: 'Documento Transversal Obligatorio • Cookies & Sesión JWT',
    title: 'Política de Cookies, Seguridad JWT y Almacenamiento Local',
    subtitle: 'Transparencia sobre el uso de cookies técnicas de sesión, aislamiento de seguridad y analítica de rendimiento.',
    version: '2.0',
    category: 'transversal',
    sections: [
      {
        heading: '1. Cookies Técnicas Estrictamente Necesarias y Seguridad JWT',
        body: 'La plataforma G-evo y las tiendas exportables utilizan cookies técnicas y almacenamiento local seguro para mantener activa la sesión autenticada del usuario mediante JSON Web Tokens (JWT), prevenir ataques CSRF y garantizar el aislamiento multi-tenant.'
      },
      {
        heading: '2. Persistencia de Preferencias, Carrito de Compras y Consentimiento',
        body: 'Utilizamos almacenamiento local en el navegador (localStorage) para recordar los productos agregados al carrito de compras, el PIN de sesión del propietario de la tarjeta y la confirmación del banner flotante de Aviso de Cookies (gevo_cookie_consent_v2).'
      },
      {
        heading: '3. Analítica Agregada sin Venta de Datos a Terceros',
        body: 'Las métricas de escaneos QR, visitas a tarjetas digitales y aperturas de catálogo se procesan con fines exclusivamente estadísticos para el propietario del negocio, sin comercializar perfiles de navegación con redes publicitarias externas.'
      }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(LEGAL_DOCUMENTS).map((documento) => ({ documento }));
}

export default async function LegalDocumentDynamicPage({
  params,
}: {
  params: Promise<{ documento: string }>;
}) {
  const resolved = await params;
  const cleanKey = resolved.documento.replace(/\.pdf$/i, '').toLowerCase();
  const doc =
    LEGAL_DOCUMENTS[cleanKey] || LEGAL_DOCUMENTS['politica-privacidad-habeas-data'];

  return (
    <div className="min-h-screen gevo-forest-bg text-white py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-emerald-400/20">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
              Centro Legal Modular G-evo • v{doc.version}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
              <span>Volver al Inicio</span>
            </Link>
            <a
              href={doc.pdfFile}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black text-xs font-extrabold inline-flex items-center gap-1.5 shadow-lg hover:brightness-110 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>Descargar PDF Oficial</span>
            </a>
          </div>
        </div>

        {/* Selector rápido de los 7 documentos legales */}
        <div className="p-4 rounded-2xl bg-[#041C13]/90 border border-emerald-400/20 space-y-2.5 shadow-xl">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
            <span>Documentos Legales por Servicio y Políticas Transversales</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Object.values(LEGAL_DOCUMENTS).map((item) => {
              const isCurrent = item.slug === doc.slug;
              return (
                <Link
                  key={item.slug}
                  href={`/legal/${item.slug}`}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${
                    isCurrent
                      ? 'bg-gradient-to-r from-amber-400/25 to-emerald-400/25 text-amber-300 border-amber-400/50 shadow-md'
                      : 'bg-black/30 text-gray-300 border-white/10 hover:text-white hover:border-emerald-400/30'
                  }`}
                >
                  {item.slug === 'politica-privacidad-habeas-data'
                    ? '🔒 Privacidad & Habeas Data'
                    : item.slug === 'politica-de-cookies'
                    ? '🍪 Política de Cookies'
                    : item.badge.replace(/^Servicio \d+ • /, '')}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Cuerpo del documento legal */}
        <article className="p-6 sm:p-8 rounded-3xl bg-[#041C13]/95 border border-emerald-400/25 shadow-[0_24px_60px_rgba(0,0,0,0.65)] space-y-6">
          <header className="space-y-2 border-b border-white/10 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              {doc.category === 'transversal' ? (
                doc.slug.includes('cookies') ? (
                  <Cookie className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                )
              ) : (
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{doc.badge}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {doc.title}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              {doc.subtitle}
            </p>
          </header>

          <div className="space-y-4">
            {doc.sections.map((sec, idx) => (
              <section
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-black/35 border border-white/10 space-y-1.5"
              >
                <h2 className="text-sm font-extrabold text-amber-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{sec.heading}</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed pl-6">
                  {sec.body}
                </p>
              </section>
            ))}
          </div>

          <footer className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>
                Archivo oficial asociado:{' '}
                <code className="text-emerald-300 font-mono">{doc.pdfFile}</code>
              </span>
            </div>
            <div>
              Auditoría registrada en <code className="text-amber-300 font-mono">tenant_legal_consents</code> (UTC + IP)
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
