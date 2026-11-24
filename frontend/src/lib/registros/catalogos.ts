import { TenantData } from '@/lib/mockData';

/**
 * ARCHIVO 2 DE 3: REGISTRO EXCLUSIVO DE CATÁLOGOS DIGITALES AUTÓNOMOS
 * Regla operativa: Máximo 20 imágenes / productos por cliente con pedido directo a WhatsApp.
 * Ruta dentro de G-evo.: /catalogo/[slug]
 */
export const MAX_IMAGES_PER_DIGITAL_CATALOG = 20;

export const REGISTRO_CATALOGOS_DIGITALES: TenantData[] = [
  {
    id: 't-aurea',
    slug: 'aurea-velas',
    businessName: 'AÚREA Velas Artesanales — Colección Navideña 2026',
    clientName: 'AÚREA Studio Artesanal',
    clientEmail: 'pedidos@aureavelas.com',
    phoneWhatsapp: '+57 300 456 7890',
    category: 'Catálogo Digital • Velas & Regalos Navideños',
    serviceGroup: 'catalogos',
    maxImagesAllowed: MAX_IMAGES_PER_DIGITAL_CATALOG,
    publicRoute: '/catalogo/aurea-velas',
    productsCount: 12,
    hasAiSupport: true,
    aiLicenseKey: 'GEVO-AURE-AI24-9C41E2',
    status: 'Activo',
    createdAt: '2026-11-20',
  },
  {
    id: 't-2',
    slug: 'cafe-origen',
    businessName: 'Café & Bar Origen',
    clientName: 'Carlos M. Rodríguez',
    clientEmail: 'contacto@caforigen.com',
    phoneWhatsapp: '+57 301 987 6543',
    category: 'Catálogo Digital • Gastronomía y Café',
    serviceGroup: 'catalogos',
    maxImagesAllowed: MAX_IMAGES_PER_DIGITAL_CATALOG,
    publicRoute: '/t/cafe-origen',
    productsCount: 12,
    hasAiSupport: false,
    status: 'Activo',
    createdAt: '2026-10-20',
  },
];
