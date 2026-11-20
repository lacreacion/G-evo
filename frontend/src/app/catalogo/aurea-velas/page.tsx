'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Playfair_Display, Cinzel } from 'next/font/google';
import { TermsAcceptanceBox } from '@/components/legal/TermsAcceptanceBox';
import {
  ShoppingBag,
  Gift,
  Heart,
  Plus,
  Minus,
  Trash2,
  Send,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  X,
} from 'lucide-react';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  style: ['normal', 'italic'],
});

export interface AureaProduct {
  id: string;
  sku: string;
  name: string;
  category: 'figuras' | 'deseos-frascos' | 'combos';
  price: number;
  priceSuffix?: string;
  dimensionsCm: string;
  shortDesc: string;
  savingsText?: string;
  image: string;
  colors: { name: string; hex: string }[];
  aromas: string[];
  allowDedication?: boolean;
  isCombo?: boolean;
}

export interface CartLineItem {
  cartItemId: string;
  product: AureaProduct;
  quantity: number;
  selectedColor: string;
  selectedAroma: string;
  dedicationFrom?: string;
  dedicationTo?: string;
  customComboNote?: string;
}

const COLOR_SWATCH: Record<string, string> = {
  Rojo: '#B91C1C',
  Verde: '#14532D',
  Blanco: '#FFFFFF',
  Beige: '#E8D5B7',
  Café: '#6F4E37',
  Surtidos: '#D4AF37',
};

export const AUREA_PRODUCTS: AureaProduct[] = [
  {
    id: 'aur-01',
    sku: 'AUR-NAV-01',
    name: 'ÁRBOL DE NAVIDAD',
    category: 'figuras',
    price: 13000,
    priceSuffix: 'c/u',
    dimensionsCm: '9 cm de alto',
    shortDesc: 'Vela con aroma de pastel de navidad',
    image: '/images/aurea/img_03_442x663.webp',
    colors: [
      { name: 'Rojo', hex: COLOR_SWATCH.Rojo },
      { name: 'Verde', hex: COLOR_SWATCH.Verde },
      { name: 'Blanco', hex: COLOR_SWATCH.Blanco },
    ],
    aromas: ['Pastel de Navidad'],
  },
  {
    id: 'aur-02',
    sku: 'AUR-NAV-02',
    name: 'RENO 3D',
    category: 'figuras',
    price: 16000,
    priceSuffix: 'c/u',
    dimensionsCm: '9 cm de alto',
    shortDesc: 'Vela con aroma de pastel de navidad',
    image: '/images/aurea/img_04_442x442.webp',
    colors: [
      { name: 'Beige', hex: COLOR_SWATCH.Beige },
      { name: 'Café', hex: COLOR_SWATCH.Café },
      { name: 'Blanco', hex: COLOR_SWATCH.Blanco },
    ],
    aromas: ['Pastel de Navidad'],
  },
  {
    id: 'aur-03',
    sku: 'AUR-NAV-03',
    name: 'VELAS DE DESEOS',
    category: 'deseos-frascos',
    price: 25000,
    dimensionsCm: '12 cm de alto',
    shortDesc: 'Caja x 6 velas de deseos (Salud, Éxito, Viajes, Sabiduría, Dinero)',
    image: '/images/aurea/img_05_384x512.webp',
    colors: [{ name: 'Colores surtidos', hex: COLOR_SWATCH.Surtidos }],
    aromas: ['Pastel de Navidad', 'Dulce Navidad'],
    allowDedication: true,
  },
  {
    id: 'aur-04',
    sku: 'AUR-NAV-04',
    name: 'RENO',
    category: 'figuras',
    price: 10000,
    priceSuffix: 'c/u',
    dimensionsCm: '11 cm de alto',
    shortDesc: 'Vela con aroma de pastel de navidad',
    image: '/images/aurea/img_06_401x717.webp',
    colors: [
      { name: 'Beige', hex: COLOR_SWATCH.Beige },
      { name: 'Café', hex: COLOR_SWATCH.Café },
      { name: 'Blanco', hex: COLOR_SWATCH.Blanco },
    ],
    aromas: ['Pastel de Navidad'],
  },
  {
    id: 'aur-05',
    sku: 'AUR-NAV-05',
    name: 'ESFERA',
    category: 'figuras',
    price: 8000,
    priceSuffix: 'c/u',
    dimensionsCm: '5 cm',
    shortDesc: 'Vela con aroma de pastel de navidad',
    image: '/images/aurea/img_07_400x400.webp',
    colors: [
      { name: 'Verde', hex: COLOR_SWATCH.Verde },
      { name: 'Rojo', hex: COLOR_SWATCH.Rojo },
      { name: 'Blanco', hex: COLOR_SWATCH.Blanco },
    ],
    aromas: ['Pastel de Navidad'],
  },
  {
    id: 'aur-06',
    sku: 'AUR-NAV-06',
    name: 'COPO DE NIEVE',
    category: 'figuras',
    price: 8000,
    priceSuffix: 'c/u',
    dimensionsCm: '5 cm',
    shortDesc: 'Vela con aroma de pastel de navidad',
    image: '/images/aurea/img_08_480x480.webp',
    colors: [{ name: 'Blanco', hex: COLOR_SWATCH.Blanco }],
    aromas: ['Pastel de Navidad'],
  },
  {
    id: 'aur-07',
    sku: 'AUR-NAV-07',
    name: 'BUBBLE',
    category: 'deseos-frascos',
    price: 18000,
    priceSuffix: 'c/u',
    dimensionsCm: '5 cm',
    shortDesc: 'Vela con aroma de pastel de navidad',
    image: '/images/aurea/img_09_432x540.webp',
    colors: [
      { name: 'Verde', hex: COLOR_SWATCH.Verde },
      { name: 'Rojo', hex: COLOR_SWATCH.Rojo },
      { name: 'Blanco', hex: COLOR_SWATCH.Blanco },
      { name: 'Beige', hex: COLOR_SWATCH.Beige },
    ],
    aromas: ['Pastel de Navidad'],
  },
  {
    id: 'aur-08',
    sku: 'AUR-NAV-08',
    name: 'MUÑECO DE JENGIBRE',
    category: 'figuras',
    price: 18000,
    priceSuffix: 'c/u',
    dimensionsCm: '5 cm',
    shortDesc: 'Vela con aroma de pastel de navidad',
    image: '/images/aurea/img_10_461x576.webp',
    colors: [
      { name: 'Verde', hex: COLOR_SWATCH.Verde },
      { name: 'Rojo', hex: COLOR_SWATCH.Rojo },
      { name: 'Blanco', hex: COLOR_SWATCH.Blanco },
    ],
    aromas: ['Pastel de Navidad'],
  },
  {
    id: 'aur-09',
    sku: 'AUR-NAV-09',
    name: 'VELA EN FRASCO DE VIDRIO',
    category: 'deseos-frascos',
    price: 25000,
    priceSuffix: 'c/u',
    dimensionsCm: 'Frasco vidrio con tapa corcho',
    shortDesc: 'Vela en frasco de vidrio con tapa estilo corcho',
    image: '/images/aurea/img_12_525x480.webp',
    colors: [{ name: 'Cristal Navideño', hex: COLOR_SWATCH.Blanco }],
    aromas: ['Pastel de Navidad', 'Café', 'Dulce Navidad'],
    allowDedication: true,
  },
  {
    id: 'aur-10',
    sku: 'AUR-CMB-01',
    name: 'COMBO 1',
    category: 'combos',
    price: 20000,
    dimensionsCm: 'Caja de cartón con relleno y moño',
    shortDesc: 'Combo de 3 velas: Reno, Árbol de Navidad, Muñeco Jengibre',
    savingsText: 'Ahorra: $5.500',
    image: '/images/aurea/img_11_432x540.webp',
    colors: [
      { name: 'Tradicional Navideño', hex: COLOR_SWATCH.Verde },
      { name: 'Rojo & Blanco', hex: COLOR_SWATCH.Rojo },
      { name: 'Beige & Blanco', hex: COLOR_SWATCH.Beige },
    ],
    aromas: ['Pastel de Navidad', 'Dulce Navidad'],
    isCombo: true,
    allowDedication: true,
  },
  {
    id: 'aur-11',
    sku: 'AUR-CMB-02',
    name: 'COMBO 2',
    category: 'combos',
    price: 60000,
    dimensionsCm: 'Caja de cartón con relleno y moño',
    shortDesc: 'Combo de 5 velas: Reno 3D, Reno, Muñeco de Jengibre, Árbol 3D y Árbol',
    savingsText: 'Ahorra: $14.500',
    image: '/images/aurea/img_15_383x512.webp',
    colors: [
      { name: 'Colección AÚREA', hex: COLOR_SWATCH.Beige },
      { name: 'Rojo & Verde', hex: COLOR_SWATCH.Rojo },
      { name: 'Blanco Nieve', hex: COLOR_SWATCH.Blanco },
    ],
    aromas: ['Pastel de Navidad', 'Dulce Navidad'],
    isCombo: true,
    allowDedication: true,
  },
  {
    id: 'aur-12',
    sku: 'AUR-CMB-03',
    name: 'COMBO 3',
    category: 'combos',
    price: 30000,
    dimensionsCm: 'Caja de cartón con relleno y moño',
    shortDesc: 'Combo de 3 velas: Reno 3D, Árbol 3D y Copo de Nieve',
    savingsText: 'Ahorra: $7.000',
    image: '/images/aurea/img_14_615x410.webp',
    colors: [
      { name: 'Blanco & Marfil', hex: COLOR_SWATCH.Blanco },
      { name: 'Rojo & Verde', hex: COLOR_SWATCH.Rojo },
      { name: 'Beige & Café', hex: COLOR_SWATCH.Beige },
    ],
    aromas: ['Pastel de Navidad', 'Dulce Navidad'],
    isCombo: true,
    allowDedication: true,
  },
];

export default function AureaVelasCatalogPage() {
  const [activeCategory, setActiveCategory] = useState<'todos' | 'figuras' | 'deseos-frascos' | 'combos'>('todos');

  const [selectedColors, setSelectedColors] = useState<Record<string, string>>(() =>
    Object.fromEntries(AUREA_PRODUCTS.map((p) => [p.id, p.colors[0].name]))
  );
  const [selectedAromas, setSelectedAromas] = useState<Record<string, string>>(() =>
    Object.fromEntries(AUREA_PRODUCTS.map((p) => [p.id, p.aromas[0]]))
  );
  const [dedicationFromMap, setDedicationFromMap] = useState<Record<string, string>>({});
  const [dedicationToMap, setDedicationToMap] = useState<Record<string, string>>({});

  // Compact Modal for "Arma tu Combo Navideño"
  const [isComboModalOpen, setIsComboModalOpen] = useState(false);
  const [comboBuilderId, setComboBuilderId] = useState<'aur-10' | 'aur-12' | 'aur-11'>('aur-10');
  const [comboCustomColors, setComboCustomColors] = useState('Rojo, Verde y Blanco');
  const [comboCustomAroma, setComboCustomAroma] = useState('Pastel de Navidad');
  const [comboFrom, setComboFrom] = useState('');
  const [comboTo, setComboTo] = useState('');

  // Cart & WhatsApp Order State
  const [cart, setCart] = useState<CartLineItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [catalogTermsAccepted, setCatalogTermsAccepted] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'todos') return AUREA_PRODUCTS;
    return AUREA_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleAddToCart = (product: AureaProduct) => {
    const color = selectedColors[product.id] || product.colors[0].name;
    const aroma = selectedAromas[product.id] || product.aromas[0];
    const from = (dedicationFromMap[product.id] || '').trim();
    const to = (dedicationToMap[product.id] || '').trim();

    const cartItemId = `${product.id}-${color}-${aroma}-${from}-${to}`;

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
        },
      ];
    });

    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1400);
  };

  const handleAddConfiguredCombo = () => {
    const comboProduct =
      AUREA_PRODUCTS.find((p) => p.id === comboBuilderId) || AUREA_PRODUCTS[9];
    const cartItemId = `${comboProduct.id}-${comboCustomColors}-${comboCustomAroma}-${comboFrom}-${comboTo}`;

    setCart((prev) => [
      ...prev,
      {
        cartItemId,
        product: comboProduct,
        quantity: 1,
        selectedColor: comboCustomColors,
        selectedAroma: comboCustomAroma,
        dedicationFrom: comboFrom.trim() || undefined,
        dedicationTo: comboTo.trim() || undefined,
        customComboNote: comboProduct.shortDesc,
      },
    ]);
    setIsComboModalOpen(false);
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
      '🎄🕯️ *PEDIDO NAVIDEÑO — AÚREA VELAS ARTESANALES (2026)* 🕯️🎄',
      '----------------------------------------',
      `👤 *Cliente:* ${customerName.trim() || 'Cliente Catálogo AÚREA'}`,
      `📍 *Ciudad/Dirección:* ${customerCity.trim() || 'Por confirmar'}`,
      '----------------------------------------',
    ];

    cart.forEach((item, index) => {
      lines.push(
        `${index + 1}. *${item.product.name}* (x${item.quantity}) — *$${(
          item.product.price * item.quantity
        ).toLocaleString('es-CO')}*`
      );
      lines.push(`   📏 ${item.product.dimensionsCm} | 🎨 Color: ${item.selectedColor} | 🌸 Aroma: ${item.selectedAroma}`);
      if (item.dedicationFrom || item.dedicationTo) {
        lines.push(`   💌 De: "${item.dedicationFrom || '-'}" Para: "${item.dedicationTo || '-'}"`);
      }
    });

    lines.push('----------------------------------------');
    lines.push(`💰 *TOTAL: $${subtotalAmount.toLocaleString('es-CO')} COP*`);
    lines.push('✨ _Enviado desde el Catálogo Digital creado y respaldado por G-evo._');

    const encoded = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/573004567890?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="min-h-screen text-[#3D2817] relative overflow-x-hidden"
      style={{
        background:
          'radial-gradient(circle at 20% 15%, #FFFFFF 0%, #FAF6F0 45%, #F2EAE0 100%)',
      }}
    >
      {/* Barra Superior Navideña Compacta (Rojo Terciopelo + Dorado AÚREA + Logo Oficial G-evo.) */}
      <header className="sticky top-0 z-40 bg-[#7F1D1D] text-white border-b-2 border-[#C59B27] shadow-md px-3 sm:px-6 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="px-2.5 py-1 rounded-lg bg-black/30 hover:bg-black/45 border border-[#D4AF37]/50 text-xs font-bold inline-flex items-center gap-1.5 transition-all"
              title="Volver a G-evo."
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#F5BE18]" />
              <span className="font-black tracking-tight">
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FFF3B0 0%, #F5BE18 40%, #D4AF37 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  G-
                </span>
                <span
                  style={{
                    background: 'linear-gradient(135deg, #A7F3D0 0%, #22C55E 40%, #10B981 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  evo.
                </span>
              </span>
            </Link>

            <div className="h-4 w-px bg-white/25 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className={`${cinzel.className} text-sm sm:text-base font-bold tracking-widest text-[#FDE68A]`}>
                AÚREA
              </span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#14532D] text-[#FDE68A] border border-[#D4AF37]/50 font-bold hidden sm:inline">
                Catálogo Navideño 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsComboModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#14532D] hover:bg-[#166534] text-[#FEF3C7] border border-[#D4AF37]/60 text-[11px] font-bold inline-flex items-center gap-1.5 shadow-[0_3px_0_#0A2E17] active:translate-y-[2px] cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 text-[#F5BE18]" />
              <span>Personalizar Combo</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              data-testid="open-aurea-cart-btn"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-b from-[#FFE57F] via-[#F5BE18] to-[#C8961E] text-[#3D2817] font-black text-xs inline-flex items-center gap-1.5 shadow-[0_3px_0_#6E4F0B] active:translate-y-[2px] cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Pedido</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#7F1D1D] text-white font-mono text-[10px]">
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Cabecera Compacta con Portada Real AÚREA + Esferas Navideñas Colgantes */}
      <section className="relative max-w-6xl mx-auto px-3 sm:px-6 pt-4 pb-5">
        <div className="rounded-3xl bg-gradient-to-r from-[#FDFBF7] via-[#F7F1E5] to-[#FDFBF7] border-2 border-[#C59B27]/50 shadow-[0_12px_35px_rgba(120,86,16,0.12)] overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Imagen Real de Portada del Catálogo */}
          <div className="md:col-span-4 h-48 md:h-60 relative overflow-hidden">
            <img
              src="/images/aurea/img_01_1076x1440.webp"
              alt="AÚREA Velas Artesanales - Catálogo Navideño 2026"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Títulos con Tipografía Navideña del Catálogo Original */}
          <div className="md:col-span-8 p-5 sm:p-6 text-center md:text-left space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#7F1D1D] text-[#FDE68A] text-[10px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3 h-3 text-[#F5BE18]" />
              <span>AÚREA • VELAS ARTESANALES</span>
            </div>

            <h1
              className={`${cinzel.className} text-2xl sm:text-4xl font-extrabold tracking-wide text-[#9A7432]`}
            >
              CATÁLOGO NAVIDEÑO 2026
            </h1>

            <p className={`${playfair.className} italic text-base sm:text-xl text-[#4A3525]`}>
              &ldquo;La magia de regalar momentos especiales.&rdquo;
            </p>

            {/* Divisor Clásico con Rombos idéntico al PDF */}
            <div className="flex items-center justify-center md:justify-start gap-2 py-0.5">
              <span className="w-2 h-2 rotate-45 bg-[#5C3A21]" />
              <div className="h-[2px] w-40 sm:w-56 bg-[#5C3A21]" />
              <span className="w-2 h-2 rotate-45 bg-[#5C3A21]" />
            </div>

            {/* Botones 3D Keycap de Filtro Rápido */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              {[
                { id: 'todos', label: '🎄 Todo el Catálogo (12)' },
                { id: 'figuras', label: '🦌 Figuras Navideñas (6)' },
                { id: 'deseos-frascos', label: '🕯️ Deseos, Bubble & Frasco (3)' },
                { id: 'combos', label: '🎁 Combos con Caja y Moño (3)' },
              ].map((tab) => {
                const active = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer select-none ${
                      active
                        ? 'bg-[#7F1D1D] text-[#FDE68A] border border-[#D4AF37] shadow-[0_3px_0_#450A0A]'
                        : 'bg-white text-[#4A3525] border border-[#C59B27]/50 shadow-[0_3px_0_#D6C7B2] hover:bg-[#FAF3E8] active:translate-y-[2px]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Cuadrícula Compacta de 4 Columnas con las Fotos Reales del Catálogo Original */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {filteredProducts.map((product) => {
            const currentColor = selectedColors[product.id] || product.colors[0].name;
            const currentAroma = selectedAromas[product.id] || product.aromas[0];
            const isAdded = justAddedId === product.id;

            return (
              <article
                key={product.id}
                data-testid={`aurea-product-card-${product.sku}`}
                className="rounded-2xl bg-white/95 border border-[#C59B27]/45 shadow-[0_8px_22px_rgba(92,58,33,0.1)] overflow-hidden flex flex-col justify-between transition-all hover:border-[#9A7432]"
              >
                <div>
                  {/* Imagen Real Extraída del PDF + Etiqueta Blanca de Precio Idéntica al PDF */}
                  <div className="relative aspect-square bg-[#F5EFE6] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />

                    {product.savingsText && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#14532D] text-[#FEF3C7] text-[10px] font-extrabold shadow">
                        {product.savingsText}
                      </div>
                    )}

                    {/* Etiqueta Blanca de Precio estilo Catálogo Original */}
                    <div className="absolute bottom-0 right-0 bg-white/95 px-2.5 py-1 rounded-tl-xl border-t border-l border-[#C59B27]/40 text-center shadow-sm">
                      <div className={`${playfair.className} text-xs sm:text-sm font-extrabold text-[#3D2817] leading-tight`}>
                        ${product.price.toLocaleString('es-CO')}
                      </div>
                      {product.priceSuffix && (
                        <div className={`${playfair.className} text-[10px] font-bold text-[#5C3A21] leading-none`}>
                          {product.priceSuffix}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Título Serif Navideño + Divisor de Rombos + Medidas del PDF */}
                  <div className="p-3 sm:p-3.5 text-center space-y-2">
                    <h2
                      className={`${cinzel.className} text-xs sm:text-sm font-extrabold text-[#4A2E1B] tracking-wide leading-snug`}
                    >
                      {product.name}
                    </h2>

                    {/* Divisor con rombos en los extremos igual al PDF */}
                    <div className="flex items-center justify-center gap-1">
                      <span className="w-1.5 h-1.5 rotate-45 bg-[#5C3A21]" />
                      <div className="h-[1.5px] w-full max-w-[130px] bg-[#5C3A21]" />
                      <span className="w-1.5 h-1.5 rotate-45 bg-[#5C3A21]" />
                    </div>

                    <div className="text-[11px] text-[#4A3525] leading-snug space-y-0.5">
                      <p className="line-clamp-2">{product.shortDesc}</p>
                      <p className="font-bold text-[#7F1D1D]">
                        Medida: {product.dimensionsCm}
                      </p>
                    </div>

                    {/* Botones Táctiles 3D Keycap Compactos para Color */}
                    <div className="pt-1 space-y-1 text-left">
                      <div className="text-[10px] font-bold text-[#5C3A21]">
                        Color:{' '}
                        <span className="text-[#7F1D1D] font-extrabold">{currentColor}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.colors.map((c) => {
                          const isSelected = currentColor === c.name;
                          return (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() =>
                                setSelectedColors((prev) => ({ ...prev, [product.id]: c.name }))
                              }
                              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold inline-flex items-center gap-1 transition-all cursor-pointer select-none ${
                                isSelected
                                  ? 'bg-[#7F1D1D] text-white border border-[#7F1D1D] shadow-[0_2px_0_#450A0A]'
                                  : 'bg-[#FAF6F0] text-[#4A3525] border border-[#C59B27]/50 shadow-[0_2px_0_#D6C7B2] active:translate-y-[1px]'
                              }`}
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-black/30 shrink-0"
                                style={{ backgroundColor: c.hex }}
                              />
                              <span>{c.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Selector de Aroma Compacto (Si tiene múltiples aromas como el Frasco o Combos) */}
                    {product.aromas.length > 1 && (
                      <div className="space-y-1 text-left">
                        <div className="text-[10px] font-bold text-[#5C3A21]">
                          Aroma: <span className="text-[#14532D] font-extrabold">{currentAroma}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {product.aromas.map((aroma) => {
                            const isSelected = currentAroma === aroma;
                            return (
                              <button
                                key={aroma}
                                type="button"
                                onClick={() =>
                                  setSelectedAromas((prev) => ({ ...prev, [product.id]: aroma }))
                                }
                                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#14532D] text-white shadow-[0_2px_0_#052E16]'
                                    : 'bg-[#FAF6F0] text-[#4A3525] border border-[#C59B27]/50 shadow-[0_2px_0_#D6C7B2]'
                                }`}
                              >
                                {aroma}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Campo Compacto "De / Para" en Velas de Deseos y Regalos */}
                    {product.allowDedication && (
                      <div className="pt-1 grid grid-cols-2 gap-1 text-left">
                        <input
                          type="text"
                          placeholder="De:"
                          value={dedicationFromMap[product.id] || ''}
                          onChange={(e) =>
                            setDedicationFromMap((prev) => ({
                              ...prev,
                              [product.id]: e.target.value,
                            }))
                          }
                          className="bg-[#FAF6F0] border border-[#C59B27]/60 rounded-lg px-2 py-1 text-[10px] text-[#3D2817] placeholder-[#8C735B] focus:outline-none focus:border-[#7F1D1D]"
                        />
                        <input
                          type="text"
                          placeholder="Para:"
                          value={dedicationToMap[product.id] || ''}
                          onChange={(e) =>
                            setDedicationToMap((prev) => ({
                              ...prev,
                              [product.id]: e.target.value,
                            }))
                          }
                          className="bg-[#FAF6F0] border border-[#C59B27]/60 rounded-lg px-2 py-1 text-[10px] text-[#3D2817] placeholder-[#8C735B] focus:outline-none focus:border-[#7F1D1D]"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Botón Agregar al Pedido (3D Keycap Navideño) */}
                <div className="p-3 pt-0">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    data-testid={`add-to-cart-${product.sku}`}
                    className={`w-full py-2 px-3 rounded-xl font-extrabold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none ${
                      isAdded
                        ? 'bg-[#14532D] text-white shadow-[0_3px_0_#052E16]'
                        : 'bg-gradient-to-b from-[#991B1B] to-[#7F1D1D] text-[#FEF3C7] border border-[#D4AF37]/50 shadow-[0_3px_0_#450A0A] hover:brightness-110 active:translate-y-[2px]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FDE68A]" />
                        <span>¡Agregado!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-[#FDE68A]" />
                        <span>Agregar • ${product.price.toLocaleString('es-CO')}</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Banner Compacto de Cierre con la Foto Real de la Página 5 del PDF ("HAZ TU PEDIDO") */}
        <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#7F1D1D] via-[#5C1313] to-[#14532D] text-white border-2 border-[#D4AF37] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-4 h-44 md:h-48 overflow-hidden">
            <img
              src="/images/aurea/img_02_765x1024.webp"
              alt="Haz tu pedido - AÚREA Velas Artesanales"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="md:col-span-8 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <div className={`${cinzel.className} text-xl sm:text-2xl font-extrabold text-[#FDE68A]`}>
                HAZ TU PEDIDO NAVIDEÑO
              </div>
              <p className={`${playfair.className} italic text-sm sm:text-base text-amber-100`}>
                &ldquo;La magia de regalar momentos especiales.&rdquo; — Incluye caja de cartón con relleno y moño en todos los combos.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsComboModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-[#FDE68A]/50 text-xs font-extrabold text-[#FDE68A] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Gift className="w-4 h-4" />
                <span>Personalizar Combo</span>
              </button>
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-b from-[#FFE57F] via-[#F5BE18] to-[#C8961E] text-[#3D2817] font-black text-xs inline-flex items-center gap-1.5 shadow-[0_3px_0_#6E4F0B] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar Pedido por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Compacto: Personalizador "Arma tu Combo Navideño" */}
      {isComboModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#FAF6F0] text-[#3D2817] border-2 border-[#C59B27] shadow-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#C59B27]/40 pb-3">
              <div>
                <h3 className={`${cinzel.className} text-base sm:text-lg font-extrabold text-[#7F1D1D]`}>
                  🎁 PERSONALIZA TU COMBO AÚREA
                </h3>
                <p className="text-xs text-[#5C3A21]">
                  Todos los combos incluyen caja de cartón con relleno y moño navideño.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsComboModalOpen(false)}
                className="p-1.5 rounded-lg bg-[#3D2817]/10 hover:bg-[#3D2817]/20 text-[#3D2817] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'aur-10' as const, name: 'COMBO 1', price: '$20.000', save: '3 velas • Ahorra $5.500' },
                { id: 'aur-12' as const, name: 'COMBO 3', price: '$30.000', save: '3 velas • Ahorra $7.000' },
                { id: 'aur-11' as const, name: 'COMBO 2', price: '$60.000', save: '5 velas • Ahorra $14.500' },
              ].map((c) => {
                const active = comboBuilderId === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setComboBuilderId(c.id)}
                    className={`p-2.5 rounded-xl text-center transition-all cursor-pointer ${
                      active
                        ? 'bg-[#7F1D1D] text-white border-2 border-[#D4AF37] shadow-[0_3px_0_#450A0A]'
                        : 'bg-white text-[#3D2817] border border-[#C59B27]/50'
                    }`}
                  >
                    <div className={`${cinzel.className} text-xs font-extrabold`}>{c.name}</div>
                    <div className="text-sm font-black text-[#D4AF37]">{c.price}</div>
                    <div className="text-[10px] opacity-85">{c.save}</div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-[#5C3A21] mb-1">
                  Combinación de Colores
                </label>
                <select
                  value={comboCustomColors}
                  onChange={(e) => setComboCustomColors(e.target.value)}
                  className="w-full bg-white border border-[#C59B27] rounded-xl px-3 py-2 text-xs text-[#3D2817]"
                >
                  <option value="Rojo, Verde y Blanco">Rojo, Verde y Blanco (Tradicional)</option>
                  <option value="Beige, Café y Blanco">Beige, Café y Blanco (Nórdico)</option>
                  <option value="Blanco Nieve">Todo Blanco Nieve</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-[#5C3A21] mb-1">
                  Aroma Navideño
                </label>
                <select
                  value={comboCustomAroma}
                  onChange={(e) => setComboCustomAroma(e.target.value)}
                  className="w-full bg-white border border-[#C59B27] rounded-xl px-3 py-2 text-xs text-[#3D2817]"
                >
                  <option value="Pastel de Navidad">Pastel de Navidad</option>
                  <option value="Dulce Navidad">Dulce Navidad</option>
                  <option value="Café">Café</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div>
                <label className="block font-bold text-[#5C3A21] mb-1">
                  Tarjeta De:
                </label>
                <input
                  type="text"
                  value={comboFrom}
                  onChange={(e) => setComboFrom(e.target.value)}
                  placeholder="Quién regala"
                  className="w-full bg-white border border-[#C59B27] rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-[#5C3A21] mb-1">
                  Para:
                </label>
                <input
                  type="text"
                  value={comboTo}
                  onChange={(e) => setComboTo(e.target.value)}
                  placeholder="Quién recibe"
                  className="w-full bg-white border border-[#C59B27] rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddConfiguredCombo}
              className="w-full py-3 rounded-xl bg-[#14532D] hover:bg-[#166534] text-[#FEF3C7] font-black text-xs shadow-[0_3px_0_#052E16] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Gift className="w-4 h-4 text-[#F5BE18]" />
              <span>Agregar Combo al Pedido</span>
            </button>
          </div>
        </div>
      )}

      {/* Barra Flotante Inferior de Carrito */}
      {totalItemsCount > 0 && !isCartOpen && (
        <div className="fixed bottom-16 left-3 right-3 z-40 max-w-xl mx-auto">
          <div className="p-3 sm:px-5 rounded-2xl bg-[#7F1D1D] text-white border-2 border-[#D4AF37] shadow-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#F5BE18] text-[#3D2817] font-black flex items-center justify-center text-xs">
                {totalItemsCount}
              </span>
              <div>
                <div className="text-xs font-bold text-[#FDE68A]">
                  Tu Pedido Navideño AÚREA
                </div>
                <div className="text-sm font-black">
                  Total: ${subtotalAmount.toLocaleString('es-CO')} COP
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#14532D] hover:bg-[#166534] text-[#FEF3C7] border border-[#D4AF37] font-black text-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Pedir por WhatsApp</span>
              <Send className="w-3.5 h-3.5 text-[#F5BE18]" />
            </button>
          </div>
        </div>
      )}

      {/* Drawer de Carrito & Checkout WhatsApp */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
          <div className="flex-1" onClick={() => setIsCartOpen(false)} />
          <div className="w-full max-w-md bg-[#0E1E16] text-white border-l-2 border-[#D4AF37] h-full flex flex-col justify-between p-5 overflow-y-auto shadow-2xl space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#F5BE18]" />
                  <h3 className={`${cinzel.className} text-base font-extrabold text-[#FDE68A]`}>
                    RESUMEN DE TU PEDIDO AÚREA
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-10 text-center text-xs text-gray-300">
                  Aún no has agregado velas a tu pedido navideño.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="p-3 rounded-2xl bg-black/40 border border-[#D4AF37]/35 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#D4AF37]/40 shrink-0"
                        />
                        <div>
                          <div className="text-xs font-extrabold text-white">
                            {item.product.name}
                          </div>
                          <div className="text-[10px] text-amber-300">
                            Color: {item.selectedColor} • Aroma: {item.selectedAroma}
                          </div>
                          {(item.dedicationFrom || item.dedicationTo) && (
                            <div className="text-[10px] text-emerald-300 flex items-center gap-1">
                              <Heart className="w-2.5 h-2.5" />
                              <span>
                                De: {item.dedicationFrom || '-'} / Para: {item.dedicationTo || '-'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-black text-[#FDE68A]">
                          ${(item.product.price * item.quantity).toLocaleString('es-CO')}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.cartItemId, -1)}
                            className="p-1 rounded bg-white/10 hover:bg-white/20 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.cartItemId, 1)}
                            className="p-1 rounded bg-white/10 hover:bg-white/20 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.cartItemId, -item.quantity)}
                            className="p-1 rounded bg-red-500/20 text-red-300 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Tu Nombre *"
                      className="bg-black/45 border border-white/15 rounded-xl px-3 py-2 text-white"
                    />
                    <input
                      type="text"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      placeholder="Ciudad / Dirección"
                      className="bg-black/45 border border-white/15 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

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
              <div className="pt-3 border-t border-white/15 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300 font-bold">Total Pedido:</span>
                  <span className="text-lg font-black text-[#FDE68A]">
                    ${subtotalAmount.toLocaleString('es-CO')} COP
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!catalogTermsAccepted}
                  onClick={handleSendWhatsAppOrder}
                  data-testid="send-aurea-whatsapp-order-btn"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F5BE18] via-[#D4AF37] to-[#10B981] text-black font-black text-xs flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Enviar Pedido a WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer con Sello Oficial de Marca G-evo. (Sin la palabra Ecosistema) */}
      <footer className="bg-[#7F1D1D] text-white border-t-2 border-[#C59B27] py-6 px-4 text-center space-y-2.5">
        <div className={`${cinzel.className} text-xs sm:text-sm font-bold tracking-wider text-[#FDE68A]`}>
          AÚREA VELAS ARTESANALES • CATÁLOGO NAVIDEÑO 2026
        </div>

        <div>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/35 hover:bg-black/50 border border-[#D4AF37]/50 text-xs text-amber-100 hover:text-white transition-all"
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
