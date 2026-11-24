import { TenantData } from '@/lib/mockData';

/**
 * ARCHIVO 3 DE 3: REGISTRO EXCLUSIVO DE TIENDAS E-COMMERCE Y PÁGINAS WEB
 * Regla operativa (ADR-006 Modo Fábrica): Proyectos 100% independientes y autónomos
 * alojados en /exports/[nombre-del-cliente]/ listos para subir a su propio hosting/dominio
 * con el sello oficial "Creada y respaldada por G-evo." en el Footer.
 */
export const REGISTRO_ECOMMERCE_Y_PAGINAS_WEB: TenantData[] = [
  {
    id: 't-3',
    slug: 'urban-trend',
    businessName: 'Urban Trend Footwear (Tienda E-Commerce)',
    clientName: 'Mariana Gómez',
    clientEmail: 'ventas@urbantrend.co',
    phoneWhatsapp: '+57 315 222 3344',
    category: 'Tienda E-Commerce & Panel Admin • Moda y Calzado',
    serviceGroup: 'ecommerce-web',
    exportFolderPath: '/exports/urban-trend/',
    publicRoute: '/t/urban-trend',
    productsCount: 28,
    hasAiSupport: true,
    aiLicenseKey: 'GEVO-URBN-AI24-3C89D2',
    status: 'Activo',
    createdAt: '2026-10-24',
  },
];
