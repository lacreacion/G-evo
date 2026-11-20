'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TermsAcceptanceBox } from '@/components/legal/TermsAcceptanceBox';
import {
  Sparkles,
  ShoppingBag,
  Flame,
  Gift,
  Ruler,
  Palette,
  Wind,
  Heart,
  Plus,
  Minus,
  Trash2,
  Send,
  CheckCircle2,
  ArrowLeft,
  Star,
  PackageCheck,
} from 'lucide-react';

export interface AureaProduct {
  id: string;
  sku: string;
  name: string;
  category: 'figuras' | 'deseos-frascos' | 'combos';
  categoryLabel: string;
  price: number;
  dimensionsCm: string;
  shortDesc: string;
  image: string;
  colors: { name: string; hex: string }[];
  aromas: string[];
  allowDedication?: boolean;
  isCombo?: boolean;
  comboIncludes?: string[];
  badge?: string;
}

export interface CartLineItem {
  cartItemId: string;
  product: AureaProduct;
  quantity: number;
  selectedColor: string;
  selectedAroma: string;
  dedicationFrom?: string;
  dedicationTo?: string;
  dedicationMessage?: string;
  customComboPieces?: string;
}

const AUREA_COLORS = [
  { name: 'Dorado Champagne', hex: '#D4AF37' },
  { name: 'Blanco Nieve', hex: '#F9FAFB' },
  { name: 'Rojo Navidad', hex: '#DC2626' },
  { name: 'Verde Pino', hex: '#15803D' },
  { name: 'Marfil Cálido', hex: '#F3E5AB' },
];

const AUREA_AROMAS = [
  'Canela & Clavo',
  'Pino Navideño',
  'Vainilla Francesa',
  'Manzana Especiada',
  'Frutos Rojos',
];

export const AUREA_PRODUCTS: AureaProduct[] = [
  {
    id: 'aur-01',
    sku: 'AUR-NAV-01',
    name: 'Árbol de Navidad',
    category: 'figuras',
    categoryLabel: 'Figuras Navideñas',
    price: 13000,
    dimensionsCm: '10 cm alto × 7 cm base',
    shortDesc: 'Vela escultórica de pino navideño en cera de soya 100% natural con relieve nevado y destellos dorados.',
    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=800&q=80',
    colors: [AUREA_COLORS[3], AUREA_COLORS[1], AUREA_COLORS[0], AUREA_COLORS[2]],
    aromas: ['Pino Navideño', 'Canela & Clavo', 'Vainilla Francesa'],
    badge: 'Favorito Navidad',
  },
  {
    id: 'aur-02',
    sku: 'AUR-NAV-02',
    name: 'Reno 3D',
    category: 'figuras',
    categoryLabel: 'Figuras Navideñas',
    price: 16000,
    dimensionsCm: '12 cm alto × 8 cm ancho',
    shortDesc: 'Figura tridimensional de reno nórdico tallado con acabado satinado de lujo para centros de mesa.',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80',
    colors: [AUREA_COLORS[0], AUREA_COLORS[4], AUREA_COLORS[1], AUREA_COLORS[2]],
    aromas: ['Canela & Clavo', 'Vainilla Francesa', 'Manzana Especiada'],
    badge: 'Escultura 3D',
  },
  {
    id: 'aur-03',
    sku: 'AUR-NAV-03',
    name: 'Velas de Deseos x6',
    category: 'deseos-frascos',
    categoryLabel: 'Velas de Deseos & Frascos',
    price: 25000,
    dimensionsCm: '14 cm alto × 1.8 cm Ø c/u (Caja x6)',
    shortDesc: 'Estuche especial de 6 velas rituales para Noche de Velitas y Año Nuevo con tarjeta personalizada "De / Para".',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    colors: [AUREA_COLORS[0], AUREA_COLORS[1], AUREA_COLORS[4], AUREA_COLORS[2]],
    aromas: ['Vainilla Francesa', 'Canela & Clavo', 'Frutos Rojos', 'Pino Navideño'],
    allowDedication: true,
    badge: 'Incluye Dedicatoria De/Para',
  },
  {
    id: 'aur-04',
    sku: 'AUR-NAV-04',
    name: 'Reno',
    category: 'figuras',
    categoryLabel: 'Figuras Navideñas',
    price: 10000,
    dimensionsCm: '9 cm alto × 6 cm ancho',
    shortDesc: 'Vela silueta de reno clásico ideal para obsequios corporativos, cenas navideñas y recordatorios.',
    image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80',
    colors: [AUREA_COLORS[4], AUREA_COLORS[0], AUREA_COLORS[1], AUREA_COLORS[2]],
    aromas: ['Vainilla Francesa', 'Canela & Clavo', 'Manzana Especiada'],
  },
  {
    id: 'aur-05',
    sku: 'AUR-NAV-05',
    name: 'Esfera',
    category: 'figuras',
    categoryLabel: 'Figuras Navideñas',
    price: 8000,
    dimensionsCm: '6 cm diámetro',
    shortDesc: 'Esfera navideña tallada con patrones invernales en alto relieve y pabilo de algodón orgánico.',
    image: 'https://images.unsplash.com/photo-1576692155415-95f820a2c4c1?auto=format&fit=crop&w=800&q=80',
    colors: [AUREA_COLORS[2], AUREA_COLORS[0], AUREA_COLORS[1], AUREA_COLORS[3]],
    aromas: ['Frutos Rojos', 'Canela & Clavo', 'Pino Navideño'],
  },
  {
    id: 'aur-06',
    sku: 'AUR-NAV-06',
    name: 'Copo de Nieve',
    category: 'figuras',
    categoryLabel: 'Figuras Navideñas',
    price: 8000,
    dimensionsCm: '7 cm diámetro × 3 cm grosor',
    shortDesc: 'Vela geométrica de copo invernal con acabado perlado, ideal para combinar en sets de regalo.',
    image: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=800&q=80',
    colors: [AUREA_COLORS[1], AUREA_COLORS[0], AUREA_COLORS[4]],
    aromas: ['Pino Navideño', 'Vainilla Francesa', 'Manzana Especiada'],
  },
  {
    id: 'aur-07',
    sku: 'AUR-NAV-07',
    name: 'Bubble',
    category: 'deseos-frascos',
    categoryLabel: 'Velas de Deseos & Frascos',
    price: 18000,
    dimensionsCm: '6 cm × 6 cm × 6 cm',
    shortDesc: 'Icónica vela cubo burbuja de diseño minimalista contemporáneo con fragancia premium envolvente.',
    image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=800&q=80',
    colors: [AUREA_COLORS[4], AUREA_COLORS[1], AUREA_COLORS[2], AUREA_COLORS[3], AUREA_COLORS[0]],
    aromas: ['Vainilla Francesa', 'Frutos Rojos', 'Canela & Clavo'],
    badge: 'Tendencia Deco',
  },
  {
    id: 'aur-08',
    sku: 'AUR-NAV-08',
    name: 'Muñeco de Jengibre',
    category: 'figuras',
    categoryLabel: 'Figuras Navideñas',
    price: 18000,
    dimensionsCm: '11 cm alto × 8 cm ancho',
    shortDesc: 'Figura artesanal de galleta de jengibre con notas cálidas de especias dulces y canela.',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=800&q=80',
    colors: [AUREA_COLORS[0], AUREA_COLORS[4], AUREA_COLORS[2]],
    aromas: ['Canela & Clavo', 'Manzana Especiada', 'Vainilla Francesa'],
  },
  {
    id: 'aur-09',
    sku: 'AUR-NAV-09',
    name: 'Vela en Frasco de Vidrio',
    category: 'deseos-frascos',
    categoryLabel: 'Velas de Deseos & Frascos',
    price: 25000,
    dimensionsCm: '9 cm alto × 7.5 cm Ø (200 g)',
    shortDesc: 'Vela aromática de larga duración (+35 horas) en frasco de cristal con decoración navideña y etiqueta personalizable.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    colors: [AUREA_COLORS[1], AUREA_COLORS[2], AUREA_COLORS[3], AUREA_COLORS[0]],
    aromas: AUREA_AROMAS,
    allowDedication: true,
    badge: '+35h Combustión',
  },
  {
    id: 'aur-10',
    sku: 'AUR-CMB-01',
    name: 'Combo 1 • Dúo Detalle Navideño',
    category: 'combos',
    categoryLabel: 'Combos Navideños',
    price: 20000,
    dimensionsCm: 'Caja Regalo 15 cm × 12 cm',
    shortDesc: 'Incluye 1 Figura Principal (Árbol de Navidad o Reno) + 1 Figura Complemento (Esfera o Copo de Nieve) en caja con cinta.',
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80',
    colors: [AUREA_COLORS[0], AUREA_COLORS[2], AUREA_COLORS[3], AUREA_COLORS[1]],
    aromas: ['Pino Navideño', 'Canela & Clavo', 'Vainilla Francesa'],
    isCombo: true,
    allowDedication: true,
    comboIncludes: ['1 Árbol de Navidad (10 cm) o Reno (9 cm)', '1 Esfera (6 cm) o Copo de Nieve (7 cm)', 'Empaque de regalo con tarjeta De / Para'],
    badge: 'Ahorro Especial',
  },
  {
    id: 'aur-11',
    sku: 'AUR-CMB-02',
    name: 'Combo 2 • Gran Colección Imperial AUREA',
    category: 'combos',
    categoryLabel: 'Combos Navideños',
    price: 60000,
    dimensionsCm: 'Cofre Luxury 24 cm × 20 cm',
    shortDesc: 'El cofre insignia de la Navidad: Vela en Frasco de Vidrio + Velas de Deseos x6 + Árbol de Navidad + Reno 3D.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    colors: [AUREA_COLORS[0], AUREA_COLORS[4], AUREA_COLORS[2], AUREA_COLORS[3]],
    aromas: AUREA_AROMAS,
    isCombo: true,
    allowDedication: true,
    comboIncludes: [
      '1 Vela en Frasco de Vidrio (200 g)',
      '1 Caja de Velas de Deseos x6 (14 cm)',
      '1 Árbol de Navidad (10 cm) + 1 Reno 3D (12 cm)',
      'Cofre de lujo con lazo dorado y dedicatoria De / Para',
    ],
    badge: 'Cofre Estrella VIP',
  },
  {
    id: 'aur-12',
    sku: 'AUR-CMB-03',
    name: 'Combo 3 • Trío Magia de Nochebuena',
    category: 'combos',
    categoryLabel: 'Combos Navideños',
    price: 30000,
    dimensionsCm: 'Caja Regalo 18 cm × 15 cm',
    shortDesc: 'Equilibrio perfecto: 1 Bubble (o Muñeco de Jengibre) + 1 Árbol de Navidad + 1 Copo de Nieve.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    colors: [AUREA_COLORS[0], AUREA_COLORS[1], AUREA_COLORS[2], AUREA_COLORS[3]],
    aromas: ['Manzana Especiada', 'Canela & Clavo', 'Vainilla Francesa'],
    isCombo: true,
    allowDedication: true,
    comboIncludes: [
      '1 Vela Bubble (6 cm) o Muñeco de Jengibre (11 cm)',
      '1 Árbol de Navidad (10 cm)',
      '1 Copo de Nieve (7 cm) + Empaque Regalo',
    ],
    badge: 'Trío Regalo',
  },
];

export default function AureaVelasCatalogPage() {
  const [activeCategory, setActiveCategory] = useState<'todos' | 'figuras' | 'deseos-frascos' | 'combos'>('todos');

  // Per-product selected color, aroma & "De / Para" dedication state
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>(() =>
    Object.fromEntries(AUREA_PRODUCTS.map((p) => [p.id, p.colors[0].name]))
  );
  const [selectedAromas, setSelectedAromas] = useState<Record<string, string>>(() =>
    Object.fromEntries(AUREA_PRODUCTS.map((p) => [p.id, p.aromas[0]]))
  );
  const [dedicationFromMap, setDedicationFromMap] = useState<Record<string, string>>({});
  const [dedicationToMap, setDedicationToMap] = useState<Record<string, string>>({});
  const [dedicationMsgMap, setDedicationMsgMap] = useState<Record<string, string>>({});

  // Interactive "Arma tu Combo Navideño" Configurator State
  const [activeComboBuilderId, setActiveComboBuilderId] = useState<'aur-10' | 'aur-12' | 'aur-11'>('aur-10');
  const [comboMainPiece, setComboMainPiece] = useState<string>('Árbol de Navidad (10 cm)');
  const [comboSecondPiece, setComboSecondPiece] = useState<string>('Esfera (6 cm)');
  const [comboColor, setComboColor] = useState<string>('Dorado Champagne');
  const [comboAroma, setComboAroma] = useState<string>('Canela & Clavo');
  const [comboFrom, setComboFrom] = useState<string>('');
  const [comboTo, setComboTo] = useState<string>('');

  // Shopping Cart & Legal Acceptance State
  const [cart, setCart] = useState<CartLineItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('Medellín');
  const [catalogTermsAccepted, setCatalogTermsAccepted] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'todos') return AUREA_PRODUCTS;
    return AUREA_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleAddToCart = (product: AureaProduct, customPieces?: string) => {
    const color = selectedColors[product.id] || product.colors[0].name;
    const aroma = selectedAromas[product.id] || product.aromas[0];
    const from = (dedicationFromMap[product.id] || '').trim();
    const to = (dedicationToMap[product.id] || '').trim();
    const msg = (dedicationMsgMap[product.id] || '').trim();

    const cartItemId = `${product.id}-${color}-${aroma}-${from}-${to}-${customPieces || ''}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          quantity: 1,
          selectedColor: color,
          selectedAroma: aroma,
          dedicationFrom: from || undefined,
          dedicationTo: to || undefined,
          dedicationMessage: msg || undefined,
          customComboPieces: customPieces,
        },
      ];
    });

    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1600);
  };

  const handleAddConfiguredCombo = () => {
    const comboProduct =
      AUREA_PRODUCTS.find((p) => p.id === activeComboBuilderId) || AUREA_PRODUCTS[9];
    const customSummary =
      activeComboBuilderId === 'aur-10'
        ? `Pieza 1: ${comboMainPiece} + Pieza 2: ${comboSecondPiece}`
        : activeComboBuilderId === 'aur-12'
        ? `Pieza 1: ${comboMainPiece} + Árbol de Navidad (10 cm) + ${comboSecondPiece}`
        : `Frasco de Vidrio (200 g) + Velas Deseos x6 + Árbol (10 cm) + Reno 3D (12 cm)`;

    const cartItemId = `${comboProduct.id}-${comboColor}-${comboAroma}-${comboFrom}-${comboTo}-${customSummary}`;

    setCart((prev) => [
      ...prev,
      {
        cartItemId,
        product: comboProduct,
        quantity: 1,
        selectedColor: comboColor,
        selectedAroma: comboAroma,
        dedicationFrom: comboFrom.trim() || undefined,
        dedicationTo: comboTo.trim() || undefined,
        customComboPieces: customSummary,
      },
    ]);
    setIsCartOpen(true);
  };

  const updateCartQty = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalItemsCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const subtotalAmount = useMemo(
    () => cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [cart]
  );

  const handleSendWhatsAppOrder = () => {
    if (!catalogTermsAccepted || cart.length === 0) return;

    const lines: string[] = [
      '✨🕯️ *NUEVO PEDIDO — AUREA VELAS ARTESANALES (COLECCIÓN NAVIDEÑA 2026)* 🕯️✨',
      '----------------------------------------',
      `👤 *Cliente:* ${customerName.trim() || 'Cliente Catálogo Digital'}`,
      `📍 *Ciudad/Entrega:* ${customerCity.trim() || 'Por confirmar'}`,
      '----------------------------------------',
      '*DETALLE DE VELAS Y COMBOS SELECCIONADOS:*',
    ];

    cart.forEach((item, index) => {
      lines.push(
        `\n${index + 1}. *${item.product.name}* (x${item.quantity}) — *$${(
          item.product.price * item.quantity
        ).toLocaleString('es-CO')} COP*`
      );
      lines.push(`   📏 Medida: ${item.product.dimensionsCm}`);
      lines.push(`   🎨 Color: ${item.selectedColor} | 🌸 Aroma: ${item.selectedAroma}`);
      if (item.customComboPieces) {
        lines.push(`   🎁 Configuración Combo: ${item.customComboPieces}`);
      }
      if (item.dedicationFrom || item.dedicationTo) {
        lines.push(
          `   💌 Tarjeta Dedicatoria: De "${item.dedicationFrom || '---'}" Para "${
            item.dedicationTo || '---'
          }"${item.dedicationMessage ? ` (${item.dedicationMessage})` : ''}`
        );
      }
    });

    lines.push('\n----------------------------------------');
    lines.push(`💰 *TOTAL PEDIDO: $${subtotalAmount.toLocaleString('es-CO')} COP*`);
    lines.push('✅ *Consentimiento Legal:* Términos de Catálogo Digital, Privacidad y Cookies aceptados (v2.0).');
    lines.push('🚀 _Pedido generado desde Catálogo Digital G-evo._');

    const encoded = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/573004567890?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#130E07] via-[#0B1F17] to-[#071510] text-[#F9F6F0] selection:bg-amber-400 selection:text-black">
      {/* Top Luxury Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#120D06]/85 border-b border-amber-400/25 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-amber-400/25 text-xs font-bold text-amber-200 inline-flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Ecosistema G-evo</span>
            </Link>
            <div className="h-5 w-px bg-amber-400/20 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="font-black tracking-widest text-sm sm:text-base bg-gradient-to-r from-[#FFF3B0] via-[#F5BE18] to-[#D4AF37] bg-clip-text text-transparent">
                  AUREA
                </span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-300 font-bold">
                  Navidad 2026
                </span>
              </div>
              <p className="text-[10px] text-amber-100/70 hidden sm:block">
                Velas Artesanales en Cera de Soya • Hechas a Mano con Luz &amp; Intención
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="#configurador-combos"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-200 text-xs font-extrabold transition-all"
            >
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>Arma tu Combo</span>
            </a>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              data-testid="open-aurea-cart-btn"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F5BE18] via-[#D4AF37] to-[#10B981] text-black font-black text-xs inline-flex items-center gap-2 shadow-[0_4px_0_#785610,0_10px_25px_rgba(212,175,55,0.35)] active:translate-y-[2px] transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-black" />
              <span>Mi Pedido</span>
              <span className="px-2 py-0.5 rounded-full bg-black/80 text-amber-300 font-mono text-[11px]">
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Editorial Navideño AUREA */}
      <section className="relative overflow-hidden border-b border-amber-400/20 py-10 sm:py-14 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-300 text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>CATÁLOGO DIGITAL INTERACTIVO • COLECCIÓN NAVIDEÑA 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.12]">
              Ilumina tu Navidad con la Magia Dorada de{' '}
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #FFF3B0 0%, #F5BE18 35%, #D4AF37 70%, #996515 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AUREA Velas Artesanales
              </span>
            </h1>

            <p className="text-sm sm:text-base text-amber-100/80 max-w-2xl leading-relaxed">
              Personaliza cada vela con nuestros selectores táctiles{' '}
              <strong className="text-amber-300">3D Keycap</strong>: elige el{' '}
              <strong className="text-white">color</strong>, el{' '}
              <strong className="text-white">aroma navideño</strong>, verifica su{' '}
              <strong className="text-emerald-300">medida en cm</strong>, agrega la dedicatoria{' '}
              <strong className="text-amber-300">&quot;De / Para&quot;</strong> en tus Velas de Deseos y envía tu pedido directo a WhatsApp.
            </p>

            {/* Quick Price Highlights Pills */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <div className="px-3.5 py-2 rounded-2xl bg-black/40 border border-amber-400/25 text-xs">
                <span className="text-amber-300 font-extrabold">9 Figuras &amp; Velas:</span>{' '}
                <span className="text-gray-200">Desde $8.000 hasta $25.000 COP</span>
              </div>
              <div className="px-3.5 py-2 rounded-2xl bg-black/40 border border-emerald-400/25 text-xs">
                <span className="text-emerald-300 font-extrabold">3 Combos Regalo:</span>{' '}
                <span className="text-gray-200">$20.000 • $30.000 • $60.000 COP</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Card */}
          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#1E160A] via-[#12261C] to-[#0A1812] border border-amber-400/40 shadow-[0_25px_60px_rgba(0,0,0,0.75)] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Tabla Oficial de Precios Navidad 2026</span>
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">
                  12 Referencias
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {AUREA_PRODUCTS.map((item) => (
                  <div
                    key={item.id}
                    className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-2"
                  >
                    <span className="font-semibold text-amber-50 truncate">
                      {item.name.replace(/ • .*/, '')}
                    </span>
                    <span className="font-mono font-extrabold text-amber-300 shrink-0">
                      ${item.price.toLocaleString('es-CO')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-14">
        {/* 3D Keycap Category Filter Bar */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Explora y Personaliza tus Velas (Botones 3D Keycap)</span>
              </h2>
              <p className="text-xs text-amber-100/70 mt-0.5">
                Presiona cada tecla 3D para elegir categoría, color, aroma y dedicatoria antes de agregar al carrito.
              </p>
            </div>

            {/* 3D Keycap Category Buttons */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'todos', label: '✨ Todas (12)' },
                { id: 'figuras', label: '🎄 Figuras Navideñas (6)' },
                { id: 'deseos-frascos', label: '🕯️ Deseos & Frascos (3)' },
                { id: 'combos', label: '🎁 Combos Navideños (3)' },
              ].map((tab) => {
                const active = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer select-none ${
                      active
                        ? 'bg-gradient-to-b from-[#FFE57F] via-[#F5BE18] to-[#C8961E] text-black border border-amber-200 shadow-[0_4px_0_#6E4F0B,0_8px_20px_rgba(245,190,24,0.35)] translate-y-0'
                        : 'bg-gradient-to-b from-[#1A2F24] to-[#0E1D15] text-amber-100 border border-amber-400/25 shadow-[0_4px_0_#07100B] hover:border-amber-400/50 active:translate-y-[2px]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pt-2">
            {filteredProducts.map((product) => {
              const currentColor = selectedColors[product.id] || product.colors[0].name;
              const currentAroma = selectedAromas[product.id] || product.aromas[0];
              const isAdded = justAddedId === product.id;

              return (
                <article
                  key={product.id}
                  data-testid={`aurea-product-card-${product.sku}`}
                  className="rounded-3xl bg-gradient-to-b from-[#17130C]/95 via-[#0E2219]/95 to-[#091711]/95 border border-amber-400/30 shadow-[0_20px_45px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Product Image + Badges + Measure in cm */}
                    <div className="relative h-52 bg-black/50 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#091711] via-transparent to-black/30" />

                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/35 text-[10px] font-extrabold text-amber-300">
                          {product.categoryLabel}
                        </span>
                        {product.badge && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-400 text-black text-[10px] font-black shadow">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Measure in cm badge */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-emerald-400/35 text-[11px] font-bold text-emerald-300">
                          <Ruler className="w-3.5 h-3.5 text-amber-400" />
                          <span>{product.dimensionsCm}</span>
                        </span>
                        <span className="px-3 py-1 rounded-xl bg-amber-400 text-black font-black text-sm shadow-lg">
                          ${product.price.toLocaleString('es-CO')}
                        </span>
                      </div>
                    </div>

                    {/* Product Body */}
                    <div className="p-5 space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-amber-300/75">
                          <span>REF: {product.sku}</span>
                          <span>Cera de Soya 100% Natural</span>
                        </div>
                        <h3 className="text-lg font-black text-white mt-0.5">
                          {product.name}
                        </h3>
                        <p className="text-xs text-amber-100/75 leading-relaxed mt-1">
                          {product.shortDesc}
                        </p>
                      </div>

                      {/* Combo contents list if combo */}
                      {product.isCombo && product.comboIncludes && (
                        <div className="p-3 rounded-2xl bg-black/35 border border-amber-400/25 space-y-1">
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                            <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>¿Qué incluye este Combo?</span>
                          </div>
                          <ul className="text-[11px] text-gray-200 space-y-0.5 pl-4 list-disc">
                            {product.comboIncludes.map((inc, i) => (
                              <li key={i}>{inc}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 3D Keycap Color Selector */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-amber-200 flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5 text-amber-400" />
                          <span>Color (3D Keycap):</span>
                          <span className="text-emerald-300 font-bold">{currentColor}</span>
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {product.colors.map((c) => {
                            const isSelected = currentColor === c.name;
                            return (
                              <button
                                key={c.name}
                                type="button"
                                onClick={() =>
                                  setSelectedColors((prev) => ({ ...prev, [product.id]: c.name }))
                                }
                                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer select-none ${
                                  isSelected
                                    ? 'bg-gradient-to-b from-[#FFE57F] to-[#D4AF37] text-black border border-white shadow-[0_3px_0_#785610] translate-y-0'
                                    : 'bg-gradient-to-b from-[#1C2E24] to-[#0F1B15] text-gray-200 border border-white/15 shadow-[0_3px_0_#060D09] hover:border-amber-400/40 active:translate-y-[2px]'
                                }`}
                              >
                                <span
                                  className="w-3 h-3 rounded-full border border-black/40 shrink-0"
                                  style={{ backgroundColor: c.hex }}
                                />
                                <span>{c.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 3D Keycap Aroma Selector */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-extrabold text-amber-200 flex items-center gap-1.5">
                          <Wind className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Aroma (3D Keycap):</span>
                          <span className="text-amber-300 font-bold">{currentAroma}</span>
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {product.aromas.map((aroma) => {
                            const isSelected = currentAroma === aroma;
                            return (
                              <button
                                key={aroma}
                                type="button"
                                onClick={() =>
                                  setSelectedAromas((prev) => ({ ...prev, [product.id]: aroma }))
                                }
                                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer select-none ${
                                  isSelected
                                    ? 'bg-gradient-to-b from-[#6EE7B7] to-[#10B981] text-black border border-emerald-200 shadow-[0_3px_0_#065F46]'
                                    : 'bg-gradient-to-b from-[#1C2E24] to-[#0F1B15] text-gray-200 border border-white/15 shadow-[0_3px_0_#060D09] hover:border-emerald-400/40 active:translate-y-[2px]'
                                }`}
                              >
                                {aroma}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Campo Especial de Dedicatoria "De / Para" (Velas de Deseos x6, Frasco y Combos) */}
                      {product.allowDedication && (
                        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-emerald-500/10 border border-amber-400/35 space-y-2">
                          <div className="text-[11px] font-extrabold text-amber-300 flex items-center gap-1.5">
                            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span>Etiqueta Personalizada &quot;De / Para&quot; (Opcional)</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="De: (Ej. Familia Gómez)"
                              value={dedicationFromMap[product.id] || ''}
                              onChange={(e) =>
                                setDedicationFromMap((prev) => ({
                                  ...prev,
                                  [product.id]: e.target.value,
                                }))
                              }
                              className="bg-black/50 border border-amber-400/30 rounded-xl px-2.5 py-1.5 text-[11px] text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                            />
                            <input
                              type="text"
                              placeholder="Para: (Ej. Abuelita Marta)"
                              value={dedicationToMap[product.id] || ''}
                              onChange={(e) =>
                                setDedicationToMap((prev) => ({
                                  ...prev,
                                  [product.id]: e.target.value,
                                }))
                              }
                              className="bg-black/50 border border-amber-400/30 rounded-xl px-2.5 py-1.5 text-[11px] text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                            />
                          </div>
                          {product.id === 'aur-03' && (
                            <input
                              type="text"
                              placeholder="Deseos especiales para la caja x6 (Ej. Amor, Salud, Prosperidad...)"
                              value={dedicationMsgMap[product.id] || ''}
                              onChange={(e) =>
                                setDedicationMsgMap((prev) => ({
                                  ...prev,
                                  [product.id]: e.target.value,
                                }))
                              }
                              className="w-full bg-black/50 border border-amber-400/30 rounded-xl px-2.5 py-1.5 text-[11px] text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart 3D Keycap Button */}
                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      data-testid={`add-to-cart-${product.sku}`}
                      className={`w-full py-3 px-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer select-none ${
                        isAdded
                          ? 'bg-emerald-400 text-black shadow-[0_4px_0_#065F46]'
                          : 'bg-gradient-to-r from-[#FFE57F] via-[#F5BE18] to-[#D4AF37] text-black shadow-[0_4px_0_#785610,0_10px_20px_rgba(212,175,55,0.25)] hover:brightness-105 active:translate-y-[3px] active:shadow-[0_1px_0_#785610]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-black" />
                          <span>¡Agregado a tu Pedido Navideño!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-black" />
                          <span>
                            Agregar al Pedido • ${product.price.toLocaleString('es-CO')} COP
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ===================================================================== */}
        {/* CONFIGURADOR INTERACTIVO "ARMA TU COMBO NAVIDEÑO"                     */}
        {/* ===================================================================== */}
        <section
          id="configurador-combos"
          className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1D1508] via-[#0F241B] to-[#08150F] border-2 border-amber-400/45 shadow-[0_25px_70px_rgba(0,0,0,0.75)] space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-400/20 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold">
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                <span>EXPERIENCIA INTERACTIVA G-EVO • PERSONALIZADOR 3D</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Configurador &quot;Arma tu Combo Navideño AUREA&quot;
              </h2>
              <p className="text-xs sm:text-sm text-amber-100/80">
                Elige uno de nuestros 3 Combos Oficiales ($20.000, $30.000 o $60.000), personaliza sus figuras, colores, aromas y tarjeta &quot;De / Para&quot; en segundos.
              </p>
            </div>
          </div>

          {/* Step 1: Select Combo Base */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: 'aur-10' as const,
                title: 'Combo 1 • Dúo Detalle',
                price: '$20.000 COP',
                desc: '1 Figura Principal (Árbol o Reno) + 1 Complemento (Esfera o Copo)',
              },
              {
                id: 'aur-12' as const,
                title: 'Combo 3 • Trío Nochebuena',
                price: '$30.000 COP',
                desc: '1 Bubble o Muñeco Jengibre + 1 Árbol de Navidad + 1 Copo o Esfera',
              },
              {
                id: 'aur-11' as const,
                title: 'Combo 2 • Gran Colección Imperial',
                price: '$60.000 COP',
                desc: 'Frasco de Vidrio + Velas de Deseos x6 + Árbol de Navidad + Reno 3D',
              },
            ].map((cmb) => {
              const active = activeComboBuilderId === cmb.id;
              return (
                <button
                  key={cmb.id}
                  type="button"
                  onClick={() => setActiveComboBuilderId(cmb.id)}
                  className={`p-4 rounded-2xl text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-gradient-to-br from-amber-400/25 to-emerald-500/20 border-2 border-amber-400 shadow-[0_5px_0_#785610]'
                      : 'bg-black/40 border border-white/15 hover:border-amber-400/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-amber-300 uppercase">
                      {cmb.title}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-black font-black text-xs">
                      {cmb.price}
                    </span>
                  </div>
                  <p className="text-xs text-gray-200 mt-2">{cmb.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Step 2: Customize Pieces, Color, Aroma & Dedication */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="block text-xs font-extrabold text-amber-200 mb-1.5">
                1. Elige Figura Principal del Combo
              </label>
              <select
                value={comboMainPiece}
                onChange={(e) => setComboMainPiece(e.target.value)}
                className="w-full bg-black/60 border border-amber-400/35 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {activeComboBuilderId === 'aur-12' ? (
                  <>
                    <option value="Vela Bubble (6x6x6 cm)">Vela Bubble (6×6×6 cm)</option>
                    <option value="Muñeco de Jengibre (11 cm)">Muñeco de Jengibre (11 cm)</option>
                  </>
                ) : (
                  <>
                    <option value="Árbol de Navidad (10 cm)">Árbol de Navidad (10 cm)</option>
                    <option value="Reno Clásico (9 cm)">Reno Clásico (9 cm)</option>
                    <option value="Reno 3D (12 cm)">Reno 3D (12 cm)</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-amber-200 mb-1.5">
                2. Elige Figura Complemento
              </label>
              <select
                value={comboSecondPiece}
                onChange={(e) => setComboSecondPiece(e.target.value)}
                className="w-full bg-black/60 border border-amber-400/35 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Esfera Navideña (6 cm)">Esfera Navideña (6 cm)</option>
                <option value="Copo de Nieve (7 cm)">Copo de Nieve (7 cm)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-amber-200 mb-1.5">
                3. Paleta de Color del Combo
              </label>
              <select
                value={comboColor}
                onChange={(e) => setComboColor(e.target.value)}
                className="w-full bg-black/60 border border-amber-400/35 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {AUREA_COLORS.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-amber-200 mb-1.5">
                4. Aroma Navideño del Combo
              </label>
              <select
                value={comboAroma}
                onChange={(e) => setComboAroma(e.target.value)}
                className="w-full bg-black/60 border border-amber-400/35 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {AUREA_AROMAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-amber-200 mb-1">
                Tarjeta Regalo — De:
              </label>
              <input
                type="text"
                value={comboFrom}
                onChange={(e) => setComboFrom(e.target.value)}
                placeholder="Ej. Andrea & Carlos"
                className="w-full bg-black/50 border border-amber-400/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-200 mb-1">
                Tarjeta Regalo — Para:
              </label>
              <input
                type="text"
                value={comboTo}
                onChange={(e) => setComboTo(e.target.value)}
                placeholder="Ej. Familia Restrepo"
                className="w-full bg-black/50 border border-amber-400/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              type="button"
              onClick={handleAddConfiguredCombo}
              className="py-3 px-5 rounded-2xl bg-gradient-to-r from-[#FFE57F] via-[#F5BE18] to-[#10B981] text-black font-black text-xs shadow-[0_4px_0_#785610] hover:brightness-105 active:translate-y-[2px] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Gift className="w-4 h-4 text-black" />
              <span>Agregar Combo Personalizado al Pedido</span>
            </button>
          </div>
        </section>
      </main>

      {/* Floating Bottom Cart Bar */}
      {totalItemsCount > 0 && !isCartOpen && (
        <div className="fixed bottom-20 left-4 right-4 z-40 max-w-2xl mx-auto">
          <div className="p-3.5 sm:px-6 rounded-2xl bg-gradient-to-r from-[#1A1307]/95 via-[#0E281D]/95 to-[#1A1307]/95 backdrop-blur-xl border-2 border-amber-400 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-black font-black flex items-center justify-center text-sm">
                {totalItemsCount}
              </div>
              <div>
                <div className="text-xs font-extrabold text-white">
                  Tu Pedido Navideño AUREA está listo
                </div>
                <div className="text-sm font-black text-amber-300">
                  Subtotal: ${subtotalAmount.toLocaleString('es-CO')} COP
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-black text-xs inline-flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <span>Revisar y Pedir por WhatsApp</span>
              <Send className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      )}

      {/* Slide-Over Cart & WhatsApp Checkout Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md">
          <div
            className="flex-1"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="w-full max-w-lg bg-[#0D1A14] border-l border-amber-400/35 h-full flex flex-col justify-between p-6 overflow-y-auto shadow-2xl space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-black text-white">
                    Resumen de tu Pedido AUREA
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-3 py-1 rounded-lg bg-white/10 text-gray-300 hover:text-white text-xs font-bold cursor-pointer"
                >
                  Cerrar ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-12 text-center space-y-2 text-gray-400 text-xs">
                  <Flame className="w-8 h-8 text-amber-400/50 mx-auto" />
                  <p>Aún no has seleccionado velas o combos navideños.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="p-3.5 rounded-2xl bg-black/45 border border-amber-400/25 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-black text-white">
                            {item.product.name}
                          </div>
                          <div className="text-[11px] text-amber-300 font-bold">
                            Color: {item.selectedColor} • Aroma: {item.selectedAroma}
                          </div>
                          <div className="text-[10px] text-emerald-300">
                            Medida: {item.product.dimensionsCm}
                          </div>
                          {item.customComboPieces && (
                            <div className="text-[10px] text-amber-200 mt-0.5">
                              🎁 {item.customComboPieces}
                            </div>
                          )}
                          {(item.dedicationFrom || item.dedicationTo) && (
                            <div className="text-[10px] text-amber-100/90 mt-0.5 italic">
                              💌 De: {item.dedicationFrom || '-'} / Para: {item.dedicationTo || '-'}
                              {item.dedicationMessage ? ` ("${item.dedicationMessage}")` : ''}
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-black text-amber-300">
                            ${(item.product.price * item.quantity).toLocaleString('es-CO')}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.cartItemId, -1)}
                              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.cartItemId, 1)}
                              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => updateCartQty(item.cartItemId, -item.quantity)}
                              className="p-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 cursor-pointer ml-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Datos de Entrega y Consentimiento Legal Específico de Catálogo Digital */}
              {cart.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">
                        Tu Nombre *
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ej. Carolina Restrepo"
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-bold mb-1">
                        Ciudad / Barrio de Entrega
                      </label>
                      <input
                        type="text"
                        value={customerCity}
                        onChange={(e) => setCustomerCity(e.target.value)}
                        placeholder="Ej. Medellín - El Poblado"
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Cuadro Obligatorio de Aceptación Legal para Catálogo Digital */}
                  <TermsAcceptanceBox
                    serviceType="catalogo"
                    id="aurea-catalog-terms-checkbox"
                    checked={catalogTermsAccepted}
                    onChange={setCatalogTermsAccepted}
                  />
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300 font-bold">Total a Pagar:</span>
                  <span className="text-xl font-black text-amber-300">
                    ${subtotalAmount.toLocaleString('es-CO')} COP
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!catalogTermsAccepted}
                  onClick={handleSendWhatsAppOrder}
                  data-testid="send-aurea-whatsapp-order-btn"
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#F5BE18] via-[#D4AF37] to-[#10B981] text-black font-black text-xs flex items-center justify-center gap-2 shadow-xl disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Enviar Pedido Estructurado a WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer con Sello Corporativo Oficial G-evo */}
      <footer className="mt-16 border-t border-amber-400/20 bg-[#070D0A] py-8 px-4 text-center space-y-3">
        <div className="text-xs text-amber-100/75 font-semibold">
          AUREA Velas Artesanales • Colección Navideña 2026 • Cera de Soya 100% Natural
        </div>

        <div className="pt-2">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-amber-400/25 text-xs text-gray-300 hover:text-white transition-all"
          >
            <span>Catálogo Digital • Creado y respaldado por</span>
            <span className="font-black tracking-tight text-sm">
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #FFF3B0 0%, #F5BE18 25%, #D4AF37 60%, #996515 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                G-
              </span>
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #A7F3D0 0%, #22C55E 30%, #10B981 70%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                evo.
              </span>
            </span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
