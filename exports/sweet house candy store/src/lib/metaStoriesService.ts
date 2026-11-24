import { Story } from '@/types';

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-1',
    user: 'sweethouse.candy',
    title: 'Novedades 🍭',
    avatar: '/logo.png',
    isLive: false,
    hasUnseen: true,
    slides: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=800&auto=format&fit=crop&q=80',
        caption: '¡Llegaron los nuevos Ositos Azucarados Colosales de 1.2kg! 🐻🎉 Jugosos y listos para regalar.',
        timeAgo: 'hace 18m',
        productLinkSku: 'SH-BOX-031',
        ctaText: 'Ver Caja de Ositos'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80',
        caption: 'Bombones belgas con chocolate 72% y praliné de avellana fundente 🍫✨',
        timeAgo: 'hace 2h',
        productLinkSku: 'SH-BOX-032',
        ctaText: 'Ver Bombones Belgas'
      }
    ]
  },
  {
    id: 'story-2',
    user: 'sweethouse.candy',
    title: 'Cajas Mix 🎁',
    avatar: 'https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=150&auto=format&fit=crop&q=80',
    isLive: false,
    hasUnseen: true,
    slides: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=800&auto=format&fit=crop&q=80',
        caption: 'Unboxing de la Mega Fiesta Box 1.5kg con más de 60 variedades 🎁🎈',
        timeAgo: 'hace 3h',
        productLinkSku: 'SH-BOX-001',
        ctaText: 'Comprar Mega Fiesta'
      }
    ]
  },
  {
    id: 'story-3',
    user: 'sweethouse.candy',
    title: 'Gomitas Top 🐻',
    avatar: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=150&auto=format&fit=crop&q=80',
    isLive: false,
    hasUnseen: true,
    slides: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&auto=format&fit=crop&q=80',
        caption: 'Gusanos Neón Ácidos: la combinación perfecta de azúcar chispeante y elasticidad 🐛⚡',
        timeAgo: 'hace 5h',
        productLinkSku: 'SH-BOX-017',
        ctaText: 'Ver Gusanos Neón'
      }
    ]
  },
  {
    id: 'story-4',
    user: 'sweethouse.candy',
    title: 'Mega Ácidos ⚡',
    avatar: 'https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?w=150&auto=format&fit=crop&q=80',
    isLive: false,
    hasUnseen: true,
    slides: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?w=800&auto=format&fit=crop&q=80',
        caption: '¿Te atreves con la Caja Danger Sour? 3 niveles de ácido extremo 😝🍋',
        timeAgo: 'hace 7h',
        productLinkSku: 'SH-BOX-048',
        ctaText: 'Aceptar el Reto'
      }
    ]
  },
  {
    id: 'story-5',
    user: 'sweethouse.candy',
    title: 'Choco Dubai 🍫',
    avatar: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=150&auto=format&fit=crop&q=80',
    isLive: false,
    hasUnseen: true,
    slides: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&auto=format&fit=crop&q=80',
        caption: 'Tabletas rellenas de crema de pistacho esmeralda y masa kataifi crujiente. ¡Sensación total! 🤤',
        timeAgo: 'hace 10h',
        productLinkSku: 'SH-BOX-042',
        ctaText: 'Probar Choco Dubai'
      }
    ]
  },
  {
    id: 'story-6',
    user: 'sweethouse.candy',
    title: 'Ofertas 2x1 🏷️',
    avatar: 'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?w=150&auto=format&fit=crop&q=80',
    isLive: false,
    hasUnseen: true,
    slides: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?w=800&auto=format&fit=crop&q=80',
        caption: 'Usa el cupón secreto DULCE10 en el carrito para 10% OFF en toda tu compra 🏷️🎟️',
        timeAgo: 'hace 14h',
        productLinkSku: null,
        ctaText: 'Ir al Catálogo'
      }
    ]
  },
  {
    id: 'story-7',
    user: 'sweethouse.candy',
    title: 'En Vivo 🔴',
    avatar: '/logo.png',
    isLive: true,
    hasUnseen: true,
    slides: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&auto=format&fit=crop&q=80',
        caption: '🔴 Estamos empacando cajas de dulces en directo desde la tienda física de Sweet House.',
        timeAgo: 'EN VIVO AHORA',
        productLinkSku: null,
        ctaText: 'Ver Transmisión'
      }
    ]
  }
];

export class MetaStoriesService {
  public async syncWithMeta(): Promise<{ success: boolean; account: string; storiesCount: number }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          account: '@sweethouse.candy',
          storiesCount: INITIAL_STORIES.length
        });
      }, 700);
    });
  }
}

export const metaStoriesService = new MetaStoriesService();

