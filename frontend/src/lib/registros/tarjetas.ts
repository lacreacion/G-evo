import { TenantData } from '@/lib/mockData';

/**
 * ARCHIVO 1 DE 3: REGISTRO EXCLUSIVO DE TARJETAS DIGITALES INTERACTIVAS (URL & QR)
 * Regla operativa: Máximo 3 imágenes por cliente (Avatar, Portada, Galería/Logo).
 * Ruta dentro de G-evo.: /t/[slug]
 */
export const MAX_IMAGES_PER_DIGITAL_CARD = 3;

export const REGISTRO_TARJETAS_DIGITALES: TenantData[] = [
  {
    id: 't-1',
    slug: 'laura-restrepo',
    businessName: 'Laura Restrepo | Branding & Consultoría',
    clientName: 'Laura Restrepo',
    clientEmail: 'cliente@laurarestrepo.com',
    phoneWhatsapp: '+57 312 456 7890',
    category: 'Tarjeta Digital • Consultoría y Marca Personal',
    serviceGroup: 'tarjetas',
    maxImagesAllowed: MAX_IMAGES_PER_DIGITAL_CARD,
    publicRoute: '/t/laura-restrepo',
    productsCount: 3,
    hasAiSupport: true,
    aiLicenseKey: 'GEVO-LAUR-AI24-8F92A1',
    status: 'Activo',
    createdAt: '2026-10-15',
  },
  {
    id: 't-elena',
    slug: 'elena-vance',
    businessName: 'Elena Vance | Arquitectura & Diseño',
    clientName: 'Elena Vance',
    clientEmail: 'elena@vancestudio.co',
    phoneWhatsapp: '+57 310 555 8899',
    category: 'Tarjeta Digital • Arquitectura Executiva',
    serviceGroup: 'tarjetas',
    maxImagesAllowed: MAX_IMAGES_PER_DIGITAL_CARD,
    publicRoute: '/t/elena-vance',
    productsCount: 3,
    hasAiSupport: false,
    status: 'Activo',
    createdAt: '2026-10-18',
  },
];
