export interface StoryItem {
  id: string;
  platform: 'Instagram' | 'Facebook';
  userName: string;
  avatarUrl: string;
  mediaUrl: string;
  caption: string;
  timeAgo: string;
  actionText?: string;
  actionUrl?: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  videoPreviewUrl: string; // Simulated video preview or iframe
  videoThumbnail: string;
  features: string[];
  competitiveAdvantages: string[];
}

export interface ShowcaseItem {
  id: string;
  title: string;
  clientName: string;
  category: 'Tarjeta Digital' | 'Catálogo E-commerce' | 'Menú Interactivo';
  slug: string;
  image: string;
  qrCodeUrl: string;
  description: string;
  tags: string[];
  metrics: string;
}

export interface TenantData {
  id: string;
  slug: string;
  businessName: string;
  clientName: string;
  clientEmail: string;
  phoneWhatsapp: string;
  category: string;
  productsCount: number;
  hasAiSupport: boolean;
  aiLicenseKey?: string;
  status: 'Activo' | 'Pendiente' | 'Suspendido';
  createdAt: string;
}

export interface ProductItem {
  id: string;
  tenantSlug: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
  featured: boolean;
}

// -------------------------------------------------------------
// HISTORIAS CORPORATIVAS SINCRONIZADAS (INSTAGRAM & FACEBOOK)
// -------------------------------------------------------------
export const MOCK_STORIES: StoryItem[] = [
  {
    id: 'story-1',
    platform: 'Instagram',
    userName: 'g_evo.digital',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=160&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
    caption: '🚀 Nuevas Tarjetas Inteligentes URL/QR con diseño ejecutivo. ¡Haz networking como un verdadero líder de industria!',
    timeAgo: 'Hace 45 min',
    actionText: 'Cotizar Tarjeta',
    actionUrl: '#contacto'
  },
  {
    id: 'story-2',
    platform: 'Instagram',
    userName: 'g_evo.digital',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=160&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    caption: '📈 Tu catálogo ahora vende las 24 horas del día. Respuestas automáticas con IA a las dudas de stock y precios de tus clientes.',
    timeAgo: 'Hace 2 horas',
    actionText: 'Ver Demostración IA',
    actionUrl: '#ai-demo'
  },
  {
    id: 'story-3',
    platform: 'Facebook',
    userName: 'GEVO Ecosistema',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    caption: '💎 Caso de Éxito: Laura Restrepo integró su tarjeta QR y catálogo digital boutique, duplicando sus reuniones comerciales.',
    timeAgo: 'Hace 4 horas',
    actionText: 'Ver Caso de Estudio',
    actionUrl: '#mostrario'
  },
  {
    id: 'story-4',
    platform: 'Instagram',
    userName: 'g_evo.digital',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=160&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    caption: '⚡ Configuración ultra-rápida. Te entregamos tu tienda armada y tú administras tus productos con un solo clic.',
    timeAgo: 'Hace 6 horas',
    actionText: 'Explorar Servicios',
    actionUrl: '#servicios'
  }
];

// -------------------------------------------------------------
// SECCIÓN DE SERVICIOS (EFECTO CASCADA: 4 CAJAS)
// -------------------------------------------------------------
export const CASCADE_SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: 'Tarjetas Digitales Interactivas (URL & QR)',
    badge: 'Presencia Digital & Web Premium',
    tagline: 'Conexión instantánea sin papel, con impacto memorable.',
    description: 'Transforma tu primera impresión comercial con tarjetas digitales inteligentes equipadas con enlace URL personalizado y código QR dinámico. Al compartirla en cualquier smartphone, entrega tu contacto directo (vCard), redes sociales, ubicación y catálogo en segundos.',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-smartphone-with-a-green-screen-42517-large.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
    features: [
      'Enlace URL personalizado de alta velocidad compatible con iOS y Android sin apps extras.',
      'Código QR vectorizado dinámico que nunca caduca.',
      'Botón de descarga instantánea vCard para la agenda telefónica del prospecto.',
      'Estadísticas de visualizaciones y toques en tiempo real.'
    ],
    competitiveAdvantages: [
      'Personalización con acabados dorados mate y verde corporativo de lujo.',
      'Actualización remota: Si cambias de número o dirección, tu tarjeta se actualiza sola al instante.',
      'Cero aplicaciones requeridas para tus clientes.'
    ]
  },
  {
    id: 2,
    title: 'Catálogos E-commerce Autónomos',
    badge: 'Venta Digital Directa',
    tagline: 'Tu vitrina de ventas con pedido directo a WhatsApp sin comisiones abusivas.',
    description: 'Páginas de catálogo de carga instantánea diseñadas para negocios que desean exhibir referencias, fotos de alta resolución, precios actualizados y recibir pedidos formateados directamente en su WhatsApp Business.',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-online-shopping-on-a-smartphone-40871-large.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    features: [
      'Carrito de compras fluido con cálculo de subtotal y envío.',
      'Generador de mensaje ordenado a WhatsApp con los items seleccionados.',
      'Soporte multi-categoría, variantes de talla, color y presentaciones.',
      'Diseño 100% responsivo optimizado para móviles (Mobile-First).'
    ],
    competitiveAdvantages: [
      '100% libre de comisiones por venta: el dinero va directo a tus cuentas.',
      'Panel de cliente amigable donde cambias precios o fotos en 10 segundos.',
      'Optimización SEO local para que tus productos aparezcan en Google.'
    ]
  },
  {
    id: 3,
    title: 'Menús y Vitrinas Digitales de Alto Impacto',
    badge: 'Experiencia Gastronómica & Retail',
    tagline: 'Atractivo visual que abre el apetito y eleva el ticket promedio.',
    description: 'Ideal para restaurantes, cafeterías, boutiques y salones de belleza. Ofrece a tus clientes una experiencia visual limpia, sin menús manchados o PDFs pesados que gastan datos.',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-table-with-food-in-a-restaurant-42999-large.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    features: [
      'Lectura de QR en mesa ultra-rápida (menos de 0.8 segundos de carga).',
      'Etiquetas de destacados, promociones del día y alérgenos.',
      'Actualización inmediata de platos agotados para no generar fricción.',
      'Fotografías en alta fidelidad con zoom interactivo.'
    ],
    competitiveAdvantages: [
      'Reducción de costos de reimpresión de cartas de menú a cero.',
      'Mayor velocidad de rotación de mesas al facilitar la decisión de compra.',
      'Posibilidad de integrar pedidos en mesa asistidos.'
    ]
  },
  {
    id: 4,
    title: 'Agente de Soporte IA 24/7 (Monetizado)',
    badge: 'Inteligencia Artificial Especializada',
    tagline: 'Tu vendedor experto que nunca duerme y conoce tu stock al milímetro.',
    description: 'Un asistente conversacional inteligente entrenado exclusivamente con los productos, políticas, horarios y precios de tu tienda. Responde al instante dudas complejas y guía al cliente hacia el cierre de la compra.',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-41223-large.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    features: [
      'Entrenado con tu catálogo real: no inventa datos ni precios.',
      'Disponible 24/7 en tu web y conector directo a WhatsApp.',
      'Demostración gratuita incluida en tu plataforma para que compruebes su efectividad.',
      'Activación permanente mediante código de licenciamiento único tras el pago.'
    ],
    competitiveAdvantages: [
      'Cero pérdida de clientes nocturnos o de fin de semana.',
      'Atención multilingüe instantánea y capacidad de atender a cientos de usuarios a la vez.',
      'Fórmula comercial accesible que multiplica el retorno de tu inversión.'
    ]
  }
];

// -------------------------------------------------------------
// MOSTRARIO PÚBLICO (SHOWCASE DE AUTORIDAD)
// -------------------------------------------------------------
export const MOCK_SHOWCASE: ShowcaseItem[] = [
  {
    id: 'showcase-1',
    title: 'Laura Restrepo | Branding & Consultoría',
    clientName: 'Laura Restrepo',
    category: 'Tarjeta Digital',
    slug: 'laura-restrepo',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    qrCodeUrl: '/qr-preview.png',
    description: 'Tarjeta de presentación digital inteligente y portafolio de servicios con agendamiento directo y descarga vCard.',
    tags: ['URL Gold', 'QR Dinámico', 'Consultoría', 'Medellín'],
    metrics: '+1,420 contactos guardados'
  },
  {
    id: 'showcase-2',
    title: 'Café Origen | Selección de Altura',
    clientName: 'Cooperativa de Café',
    category: 'Catálogo E-commerce',
    slug: 'cafe-origen',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    qrCodeUrl: '/qr-preview.png',
    description: 'Catálogo de café de especialidad con pedidos automatizados a WhatsApp y selector de molienda y gramaje.',
    tags: ['E-commerce', 'Checkout WhatsApp', 'Café Especial'],
    metrics: '$18.4M COP ventas mensuales'
  },
  {
    id: 'showcase-3',
    title: 'Boutique Urbana & Calzado',
    clientName: 'Urban Trend Co.',
    category: 'Catálogo E-commerce',
    slug: 'urban-trend',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    qrCodeUrl: '/qr-preview.png',
    description: 'Catálogo interactivo con selector de tallas, galerías múltiples por producto y Agente de Soporte IA activo.',
    tags: ['Moda', 'IA Soporte 24/7', 'Inventario Dinámico'],
    metrics: '94% satisfacción en soporte'
  }
];

// -------------------------------------------------------------
// INFORMACIÓN INSTITUCIONAL DE G-EVO (MODALES VISIÓN, MISIÓN, HISTORIA)
// -------------------------------------------------------------
export const CORPORATE_INFO = {
  vision: {
    title: 'Nuestra Visión',
    badge: 'Horizonte Estratégico',
    p1: 'Consolidar a G-evo como el estándar tecnológico referente en América Latina para la digitalización comercial y el networking inteligente, permitiendo que profesionales y empresas de cualquier escala proyecten autoridad, eliminen la fricción en sus ventas y potencien su presencia mediante herramientas interactivas de vanguardia.',
    p2: 'Visualizamos un ecosistema donde ninguna oportunidad de negocio se pierda por falta de inmediatez, dotando a cada marca de herramientas de Inteligencia Artificial que trabajan incansablemente para convertir contactos en clientes leales.'
  },
  mision: {
    title: 'Nuestra Misión',
    badge: 'Propósito Fundamental',
    p1: 'Democratizar el acceso a tecnologías comerciales de alto impacto a través de tarjetas digitales con tecnología URL/QR y catálogos e-commerce autogestionables que combinan estética premium, simplicidad operativa y automatización inteligente.',
    p2: 'Brindamos a los empresarios el control total y autónomo de sus productos e inventarios, mientras nosotros nos encargamos de proveer la infraestructura, la seguridad multi-tenant y la innovación continua que respalda su crecimiento comercial.'
  },
  historia: {
    title: 'Nuestra Historia',
    badge: 'Génesis y Evolución',
    p1: 'G-evo nació al identificar una paradoja moderna: mientras el mundo avanzaba a pasos agigantados en digitalización, los profesionales seguían intercambiando tarjetas de papel que terminaban en la basura, y los pequeños comercios dependían de catálogos en PDF estáticos y desactualizados que resultaban incómodos de navegar.',
    p2: 'Concebimos un modelo híbrido: la sofisticación de un acabado físico de lujo con la potencia ilimitada de una plataforma en la nube. Unificamos la identidad de marca dorada (símbolo de valor, exclusividad y éxito) con el verde tecnológico (vitalidad, crecimiento y dinamismo digital), dando vida a G-evo: la evolución que tu negocio necesita.'
  }
};

// -------------------------------------------------------------
// CLIENTES / INQUILINOS DEMOSTRATIVOS PARA PANELES
// -------------------------------------------------------------
export const INITIAL_TENANTS: TenantData[] = [
  {
    id: 't-1',
    slug: 'laura-restrepo',
    businessName: 'Laura Restrepo | Branding & Consultoría',
    clientName: 'Laura Restrepo',
    clientEmail: 'cliente@laurarestrepo.com',
    phoneWhatsapp: '+57 312 456 7890',
    category: 'Consultoría y Marca Personal',
    productsCount: 4,
    hasAiSupport: true,
    aiLicenseKey: 'GEVO-LAUR-AI24-8F92A1',
    status: 'Activo',
    createdAt: '2026-10-15'
  },
  {
    id: 't-2',
    slug: 'cafe-origen',
    businessName: 'Café & Bar Origen',
    clientName: 'Carlos M. Rodríguez',
    clientEmail: 'contacto@caforigen.com',
    phoneWhatsapp: '+57 301 987 6543',
    category: 'Gastronomía y Café',
    productsCount: 12,
    hasAiSupport: false,
    status: 'Activo',
    createdAt: '2026-10-20'
  },
  {
    id: 't-3',
    slug: 'urban-trend',
    businessName: 'Urban Trend Footwear',
    clientName: 'Mariana Gómez',
    clientEmail: 'ventas@urbantrend.co',
    phoneWhatsapp: '+57 315 222 3344',
    category: 'Moda y Calzado',
    productsCount: 28,
    hasAiSupport: true,
    aiLicenseKey: 'GEVO-URBN-AI24-3C89D2',
    status: 'Activo',
    createdAt: '2026-10-24'
  }
];

// -------------------------------------------------------------
// PRODUCTOS DEMO DE LAURA RESTREPO (PARA EL PORTAL DE CLIENTE)
// -------------------------------------------------------------
export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    tenantSlug: 'laura-restrepo',
    name: 'Auditoría y Diagnóstico de Marca 360°',
    category: 'Consultoría Estratégica',
    price: 850000,
    stock: 5,
    sku: 'LR-CONS-01',
    description: 'Evaluación exhaustiva de identidad, narrativa de marca, consistencia visual y recomendaciones de posicionamiento en el mercado.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    featured: true
  },
  {
    id: 'prod-2',
    tenantSlug: 'laura-restrepo',
    name: 'Identidad Corporativa & Manual de Marca',
    category: 'Identidad Visual',
    price: 2400000,
    stock: 3,
    sku: 'LR-BRAND-02',
    description: 'Diseño integral de imagotipo, paleta cromática, tipografías corporativas, aplicaciones en papelería y formatos digitales.',
    imageUrl: 'https://images.unsplash.com/photo-1542744094-3a31727221eb?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    featured: true
  },
  {
    id: 'prod-3',
    tenantSlug: 'laura-restrepo',
    name: 'Sesión de Asesoría 1 a 1 (Virtual)',
    category: 'Consultoría Estratégica',
    price: 320000,
    stock: 10,
    sku: 'LR-1ON1-03',
    description: 'Sesión de 90 minutos para destrabar dudas puntuales sobre estrategia de lanzamiento y comunicación comercial.',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    featured: false
  }
];

