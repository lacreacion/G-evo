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
    title: 'Tarjetas Persoales Digitales Interactivas (URL & QR)',
    badge: 'Presencia Digital',
    tagline: 'Conexión instantánea sin papel, con impacto memorable.',
    description: 'Transforma tu primera impresión comercial con tarjetas digitales inteligentes equipadas con enlace URL personalizado y código QR dinámico.  Comparte en directo por redes sociales, ubicación y catálogo en segundos.',
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
    title: 'Catálogos Digitales Autónomos',
    badge: 'Venta Digital Directa',
    tagline: 'Tu vitrina de ventas con pedido directo a WhatsApp sin comisiones abusivas.',
    description: 'Páginas de catálogo de carga instantánea diseñadas para negocios que desean exhibir referencias, fotos de alta resolución, precios actualizados y recibir pedidos formateados directamente en su WhatsApp Business.',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-online-shopping-on-a-smartphone-40871-large.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    features: [
      'flujode compras con cálculo de subtotal y envío.',
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
    title: 'Creación de Páginas Web de Alto Impacto',
    badge: 'Desarrollo & Diseño Web Profesional',
    tagline: 'Presencia digital corporativa, rápida y optimizada para convertir visitantes en clientes.',
    description: 'Diseñamos y desarrollamos páginas web corporativas, landing pages y portafolios modernos a medida de tu marca. Estructuras visuales de carga ultra-rápida con certificado de seguridad SSL, optimización para buscadores (SEO) y conexión directa a tu WhatsApp y redes sociales.',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-web-developer-working-on-code-on-multiple-screens-42515-large.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80',
    features: [
      'Diseño 100% adaptable a celulares, tablets y computadores (Mobile-First).',
      'Velocidad de carga ultra-rápida y estructura optimizada para aparecer en Google (SEO).',
      'Secciones personalizadas: Inicio, Servicios, Portafolio, Ubicación y Formulario/WhatsApp.',
      'Certificado de seguridad SSL (HTTPS) y dominio personalizado incluido.'
    ],
    competitiveAdvantages: [
      'Diseño exclusivo alineado con la identidad visual de tu empresa, sin plantillas genéricas.',
      'Integración directa con tu Tarjeta Digital, Catálogo y Agente de Soporte IA 24/7.',
      'Arquitectura moderna y escalable lista para crecer junto con tu negocio.'
    ]
  },
  {
    id: 4,
    title: 'Tiendas E-Commerce Completas & Autogestionables',
    badge: 'Comercio Electrónico & Pagos Online',
    tagline: 'Vende en automático las 24 horas con carrito de compras, inventario en vivo y pasarelas de pago.',
    description: 'Desplegamos tu tienda virtual profesional lista para procesar pagos en línea con tarjetas débito, crédito, PSE, Nequi y transferencias, o cerrar pedidos por WhatsApp. Controla tu stock, cupones de descuento, costos de envío y clientes desde un panel intuitivo.',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-online-shopping-on-a-smartphone-40871-large.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80',
    features: [
      'Carrito de compras avanzado con pasarela de pagos integrada (Tarjetas, PSE, Nequi, etc.).',
      'Control automático de inventario, variantes (tallas/colores) y alertas de stock.',
      'Cálculo de envíos por ciudad/zona, cupones promocionales y seguimiento de pedidos.',
      'Panel administrativo autónomo para crear o editar productos y precios en segundos.'
    ],
    competitiveAdvantages: [
      '0% de comisión para G-evo sobre tus ventas: el 100% de tus ingresos va directo a tu cuenta.',
      'Ecosistema conectado con tu Tarjeta Digital, QR y Agente de Soporte IA 24/7.',
      'Diseño de alta conversión ultra-rápido optimizado para compras desde el celular.'
    ]
  },
  {
    id: 5,
    title: 'Agente de Soporte IA 24/7 (Monetizado)',
    badge: 'Inteligencia Artificial Especializada',
    tagline: 'Tu vendedor experto que nunca duerme y conoce tu stock al milímetro.',
    description: 'Un asistente conversacional inteligente entrenado exclusivamente con los productos, políticas, horarios y precios de tu tienda. Responde al instante dudas complejas y guía al cliente hacia el cierre de la compra.',
    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-41223-large.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    features: [
      'Entrenado con tu catálogo real: no inventa datos ni precios.',
      'Disponible 24/7 en tu web y conector directo a WhatsApp.',
"Infraestructura preinstalada en tu panel y optimizada para automatizar la operación de tu negocio",
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
    id: 'showcase-aurea',
    title: 'AUREA Velas Artesanales | Navidad 2026',
    clientName: 'AUREA Velas Artesanales',
    category: 'Catálogo E-commerce',
    slug: 'aurea-velas',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    qrCodeUrl: '/qr-preview.png',
    description: 'Catálogo Digital Navideño con selectores 3D Keycap de color y aroma, personalizador "De / Para" y Configurador de Combos a WhatsApp.',
    tags: ['3D Keycaps', 'Combos Navideños', 'Checkout WhatsApp', 'Velas Artesanales'],
    metrics: '12 referencias interactivas'
  },
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
    id: 't-aurea',
    slug: 'aurea-velas',
    businessName: 'AUREA Velas Artesanales — Colección Navideña 2026',
    clientName: 'AUREA Studio Artesanal',
    clientEmail: 'pedidos@aureavelas.com',
    phoneWhatsapp: '+57 300 456 7890',
    category: 'Catálogo Digital • Velas & Regalos',
    productsCount: 12,
    hasAiSupport: true,
    aiLicenseKey: 'GEVO-AURE-AI24-9C41E2',
    status: 'Activo',
    createdAt: '2026-11-20'
  },
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

