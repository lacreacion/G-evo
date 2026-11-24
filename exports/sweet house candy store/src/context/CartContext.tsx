'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon, Order, CustomerData, OrderDeliveryStatus } from '@/types';
import { CANDY_PRODUCTS, CANDY_CATEGORIES } from '@/data/products';
import { fireCandyConfetti, fireCelebrationSalvo } from '@/lib/confetti';
import { soundEngine } from '@/lib/soundEngine';
import { gEvoService } from '@/lib/gEvoService';

export interface NewProductInput {
  name: string;
  category: string;
  description: string;
  costPrice: number;
  price: number;
  stock: number;
  weight: string;
  image: string;
}

interface CartContextType {
  products: Product[];
  items: CartItem[];
  isCartOpen: boolean;
  coupon: Coupon | null;
  orders: Order[];
  activeTab: 'catalog' | 'orders' | 'about';
  searchQuery: string;
  selectedCategory: string;
  highlightedSku: string | null;
  isMuted: boolean;
  totalCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  addItem: (product: Product, quantity?: number, event?: React.MouseEvent) => void;
  updateQuantity: (sku: string, delta: number) => void;
  removeItem: (sku: string) => void;
  openCart: (event?: React.MouseEvent) => void;
  closeCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  processOrder: (customer: CustomerData, paymentMethod: string, initialStatus?: OrderDeliveryStatus) => Promise<Order>;
  reorder: (orderId: string) => void;
  switchTab: (tab: 'catalog' | 'orders' | 'about') => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  highlightProduct: (sku: string) => void;
  toggleMute: () => boolean;
  // Back-Office Admin Actions
  addProduct: (input: NewProductInput) => Product;
  updateProduct: (sku: string, changes: Partial<Product> & { stock?: number }) => void;
  applyProductPromo: (skus: string[], mode: 'percent' | 'fixed', value: number) => void;
  removeProductPromo: (sku: string) => void;
  toggleBlockProduct: (sku: string) => void;
  deleteProduct: (sku: string) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderDeliveryStatus) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const enrichSeedProducts = (list: Product[]): Product[] =>
  list.map((p) => ({
    ...p,
    costPrice: p.costPrice ?? Number((p.price * 0.55).toFixed(2)),
    isBlocked: p.isBlocked ?? false,
    promoDiscountPercent:
      p.oldPrice && p.oldPrice > p.price
        ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
        : null,
  }));

const SEED_ORDERS: Order[] = [
  {
    id: 'SW-894120',
    paymentReference: 'WOMPI-REF-894120',
    date: '24 de Noviembre de 2026, 14:30',
    timestamp: Date.now() - 3600000 * 3,
    customer: {
      name: 'Camila Morales',
      phone: '+57 312 456 7890',
      address: 'Cra 43A # 1-50, Barrio El Poblado, Apto 802',
      city: 'Medellín',
    },
    paymentMethod: 'Nequi',
    items: [
      {
        sku: 'SH-BOX-001',
        name: 'Caja Mega Fiesta Dulce 1.5kg',
        price: 34.99,
        costPrice: 19.24,
        wasPromo: true,
        quantity: 1,
        weight: '1500g',
        image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&auto=format&fit=crop&q=80',
      },
      {
        sku: 'SH-BOX-050',
        name: 'Caja Skittles Liofilizados Freeze-Dried Sour',
        price: 25.5,
        costPrice: 14.02,
        wasPromo: true,
        quantity: 2,
        weight: '350g',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300&auto=format&fit=crop&q=80',
      },
    ],
    subtotal: 85.99,
    discount: 0,
    shipping: 0.0,
    total: 85.99,
    estimatedFee: 2.49,
    netProfit: 36.22,
    orderStatus: 'PAGADO',
    status: 'Pagado • Listo para Despacho ✅',
    statusClass: 'status-preparing',
    trackingCode: 'TRK-SWEET-98214',
  },
  {
    id: 'SW-893044',
    paymentReference: 'WOMPI-REF-893044',
    date: '23 de Noviembre de 2026, 11:20',
    timestamp: Date.now() - 86400000,
    customer: {
      name: 'Diego Fernando Ruiz',
      phone: '+57 300 987 6543',
      address: 'Calle 93B # 15-34, Barrio Chicó, Of. 401',
      city: 'Bogotá',
    },
    paymentMethod: 'PSE',
    items: [
      {
        sku: 'SH-BOX-032',
        name: 'Caja Bombones Belgas Rellenos 32 pzas',
        price: 32.5,
        costPrice: 17.88,
        wasPromo: true,
        quantity: 1,
        weight: '500g',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=300&auto=format&fit=crop&q=80',
      },
      {
        sku: 'SH-BOX-042',
        name: 'Caja Tabletas Mini Gourmet con Pistacho',
        price: 31.0,
        costPrice: 17.05,
        wasPromo: false,
        quantity: 1,
        weight: '500g',
        image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&auto=format&fit=crop&q=80',
      },
    ],
    subtotal: 63.5,
    discount: 0.0,
    shipping: 0.0,
    total: 63.5,
    estimatedFee: 1.84,
    netProfit: 26.73,
    orderStatus: 'ENTREGADO',
    status: 'Entregado con éxito 🎉',
    statusClass: 'status-delivered',
    trackingCode: 'TRK-SWEET-77142',
  },
  {
    id: 'SW-892815',
    paymentReference: 'WOMPI-REF-892815',
    date: '22 de Noviembre de 2026, 17:10',
    timestamp: Date.now() - 172800000,
    customer: {
      name: 'Valentina Echeverri',
      phone: '+57 315 222 3344',
      address: 'Av. 4 Norte # 12N-45, Barrio Granada',
      city: 'Cali',
    },
    paymentMethod: 'Botón Bancolombia',
    items: [
      {
        sku: 'SH-BOX-016',
        name: 'Caja Ositos Azucarados Premium 1kg',
        price: 19.99,
        costPrice: 11.0,
        wasPromo: true,
        quantity: 2,
        weight: '1000g',
        image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&auto=format&fit=crop&q=80',
      },
    ],
    subtotal: 39.98,
    discount: 0,
    shipping: 4.5,
    total: 44.48,
    estimatedFee: 1.29,
    netProfit: 16.69,
    orderStatus: 'ENVIADO',
    status: 'Enviado en camino 🚚',
    statusClass: 'status-preparing',
    trackingCode: 'TRK-SWEET-64119',
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => enrichSeedProducts(CANDY_PRODUCTS));
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);
  const [activeTab, setActiveTab] = useState<'catalog' | 'orders' | 'about'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [highlightedSku, setHighlightedSku] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const freeShippingThreshold = 50.0;
  const standardShippingCost = 4.5;

  useEffect(() => {
    try {
      const savedCatalog = localStorage.getItem('sweet_house_catalog_v1');
      if (savedCatalog) {
        const parsed = JSON.parse(savedCatalog);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(enrichSeedProducts(parsed));
        }
      }

      const savedCart = localStorage.getItem('sweet_house_next_cart');
      if (savedCart) setItems(JSON.parse(savedCart));

      const savedCoupon = localStorage.getItem('sweet_house_next_coupon');
      if (savedCoupon) setCoupon(JSON.parse(savedCoupon));

      const savedOrders = localStorage.getItem('sweet_house_next_orders_v2');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders(SEED_ORDERS);
        localStorage.setItem('sweet_house_next_orders_v2', JSON.stringify(SEED_ORDERS));
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const persistProducts = (updated: Product[]) => {
    setProducts(updated);
    try {
      localStorage.setItem('sweet_house_catalog_v1', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const persistOrders = (updated: Order[]) => {
    setOrders(updated);
    try {
      localStorage.setItem('sweet_house_next_orders_v2', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('sweet_house_next_cart', JSON.stringify(items));
    } catch (e) {
      console.warn(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (coupon) {
        localStorage.setItem('sweet_house_next_coupon', JSON.stringify(coupon));
      } else {
        localStorage.removeItem('sweet_house_next_coupon');
      }
    } catch (e) {
      console.warn(e);
    }
  }, [coupon]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = coupon?.discountPercent ? (subtotal * coupon.discountPercent) / 100 : 0;
  const shipping =
    subtotal === 0 || coupon?.freeShipping || subtotal >= freeShippingThreshold
      ? 0
      : standardShippingCost;
  const total = Math.max(0, subtotal - discount + shipping);

  const toggleMute = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) soundEngine.playBubblePopSound();
    return nextMuted;
  };

  const addItem = (product: Product, quantity = 1, event?: React.MouseEvent) => {
    if (product.isBlocked || (product.gEvo && product.gEvo.stock <= 0)) return;
    const wasPromo = Boolean(product.oldPrice && product.oldPrice > product.price);

    setItems((prev) => {
      const existing = prev.find((i) => i.sku === product.sku);
      if (existing) {
        return prev.map((i) =>
          i.sku === product.sku ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          sku: product.sku,
          name: product.name,
          price: product.price,
          costPrice: product.costPrice ?? Number((product.price * 0.55).toFixed(2)),
          wasPromo,
          image: product.image,
          weight: product.weight,
          categoryName: product.categoryName,
          quantity,
          gEvoId: product.gEvo?.gEvoId,
        },
      ];
    });

    fireCandyConfetti(event?.clientX, event?.clientY, 85);
    soundEngine.playAddToCartSound();
  };

  const updateQuantity = (sku: string, delta: number) => {
    soundEngine.playBubblePopSound();
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.sku === sku) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (sku: string) => {
    soundEngine.playBubblePopSound();
    setItems((prev) => prev.filter((i) => i.sku !== sku));
  };

  const openCart = (event?: React.MouseEvent) => {
    fireCandyConfetti(event?.clientX, event?.clientY, 60);
    soundEngine.playBubblePopSound();
    setIsCartOpen(true);
  };

  const closeCart = () => setIsCartOpen(false);

  const applyCoupon = (code: string) => {
    const norm = code.trim().toUpperCase();
    if (norm === 'DULCE10') {
      const newCoupon = { code: 'DULCE10', discountPercent: 10, description: '10% OFF en toda la tienda' };
      setCoupon(newCoupon);
      fireCandyConfetti(undefined, undefined, 70);
      soundEngine.playAddToCartSound();
      return { success: true, message: '¡Cupón DULCE10 aplicado con éxito (-10%)! 🎉' };
    }
    if (norm === 'ENVIOGRATIS') {
      const newCoupon = { code: 'ENVIOGRATIS', freeShipping: true, description: 'Envío Gratis Especial' };
      setCoupon(newCoupon);
      fireCandyConfetti(undefined, undefined, 70);
      soundEngine.playAddToCartSound();
      return { success: true, message: '¡Cupón de Envío Gratis aplicado! 🚚' };
    }
    return { success: false, message: 'Cupón inválido. Prueba con "DULCE10".' };
  };

  const removeCoupon = () => setCoupon(null);

  const processOrder = async (
    customer: CustomerData,
    paymentMethod: string,
    initialStatus: OrderDeliveryStatus = 'PAGADO'
  ): Promise<Order> => {
    const orderId = `SW-${Date.now().toString().slice(-6)}`;
    const paymentRef = `WOMPI-REF-${Date.now().toString().slice(-6)}`;
    const totalCost = items.reduce(
      (sum, item) => sum + (item.costPrice ?? item.price * 0.55) * item.quantity,
      0
    );
    const estimatedFee = Number((total * 0.029).toFixed(2)); // ~2.9% comisión estimada pasarela
    const netProfit = Number(Math.max(0, total - totalCost - estimatedFee).toFixed(2));

    const newOrder: Order = {
      id: orderId,
      paymentReference: paymentRef,
      date: new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      timestamp: Date.now(),
      customer,
      paymentMethod,
      items: [...items],
      subtotal,
      discount,
      shipping,
      total,
      estimatedFee,
      netProfit,
      orderStatus: initialStatus,
      status:
        initialStatus === 'PAGADO'
          ? 'Pagado • En preparación 🍭'
          : 'Pendiente de confirmación',
      statusClass: 'status-preparing',
      trackingCode: `TRK-SWEET-${Math.floor(Math.random() * 89999 + 10000)}`,
    };

    // Descontar stock automáticamente al confirmar pago
    if (initialStatus === 'PAGADO') {
      const nextProducts = products.map((p) => {
        const bought = items.find((i) => i.sku === p.sku);
        if (!bought) return p;
        const nextStock = Math.max(0, (p.gEvo?.stock ?? 20) - bought.quantity);
        return {
          ...p,
          gEvo: {
            ...p.gEvo,
            stock: nextStock,
            lastModified: new Date().toISOString(),
          },
        };
      });
      persistProducts(nextProducts);
    }

    const updatedOrders = [newOrder, ...orders];
    persistOrders(updatedOrders);

    await gEvoService.notifyOrder(newOrder);
    fireCelebrationSalvo();
    soundEngine.playCelebrationSound();

    setItems([]);
    setCoupon(null);
    closeCart();

    return newOrder;
  };

  // --- ACCIONES DEL BACK-OFFICE (/admin) ---
  const addProduct = (input: NewProductInput): Product => {
    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const sku = `SH-BOX-${String(nextId).padStart(3, '0')}`;
    const catObj = CANDY_CATEGORIES.find((c) => c.id === input.category);

    const created: Product = {
      id: nextId,
      sku,
      name: input.name.trim(),
      category: input.category,
      categoryName: catObj ? catObj.name : input.category,
      costPrice: Number(input.costPrice),
      price: Number(input.price),
      oldPrice: null,
      promoDiscountPercent: null,
      isBlocked: false,
      weight: input.weight || '500g',
      badge: 'Nuevo ✨',
      rating: 5.0,
      reviews: 1,
      flavors: ['Especial Sweet House'],
      description: input.description.trim(),
      image:
        input.image.trim() ||
        'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&auto=format&fit=crop&q=80',
      gEvo: {
        gEvoId: `GEVO-SW-${String(nextId).padStart(4, '0')}`,
        barcode: `750100${String(100000 + nextId)}`,
        stock: Number(input.stock),
        syncStatus: 'synced',
        dynamicImageEndpoint: `/api/g-evo/images/${sku}`,
        lastModified: new Date().toISOString(),
      },
    };

    persistProducts([created, ...products]);
    return created;
  };

  const updateProduct = (sku: string, changes: Partial<Product> & { stock?: number }) => {
    const updated = products.map((p) => {
      if (p.sku !== sku) return p;
      const catObj = changes.category
        ? CANDY_CATEGORIES.find((c) => c.id === changes.category)
        : undefined;
      return {
        ...p,
        ...changes,
        categoryName: catObj ? catObj.name : changes.categoryName ?? p.categoryName,
        gEvo: {
          ...p.gEvo,
          stock: changes.stock !== undefined ? Number(changes.stock) : p.gEvo.stock,
          lastModified: new Date().toISOString(),
        },
      };
    });
    persistProducts(updated);
  };

  const applyProductPromo = (skus: string[], mode: 'percent' | 'fixed', value: number) => {
    const skuSet = new Set(skus);
    const updated = products.map((p) => {
      if (!skuSet.has(p.sku)) return p;
      const basePrice = p.oldPrice && p.oldPrice > p.price ? p.oldPrice : p.price;
      const newPrice =
        mode === 'percent'
          ? Number((basePrice * (1 - value / 100)).toFixed(2))
          : Number(Math.max(0.5, basePrice - value).toFixed(2));
      const pct = Math.round(((basePrice - newPrice) / basePrice) * 100);
      return {
        ...p,
        oldPrice: basePrice,
        price: newPrice,
        promoDiscountPercent: pct,
        badge: `Oferta -${pct}% 🔥`,
      };
    });
    persistProducts(updated);
  };

  const removeProductPromo = (sku: string) => {
    const updated = products.map((p) => {
      if (p.sku !== sku || !p.oldPrice) return p;
      return {
        ...p,
        price: p.oldPrice,
        oldPrice: null,
        promoDiscountPercent: null,
        badge: null,
      };
    });
    persistProducts(updated);
  };

  const toggleBlockProduct = (sku: string) => {
    const updated = products.map((p) =>
      p.sku === sku ? { ...p, isBlocked: !p.isBlocked } : p
    );
    persistProducts(updated);
  };

  const deleteProduct = (sku: string) => {
    persistProducts(products.filter((p) => p.sku !== sku));
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderDeliveryStatus) => {
    const labelMap: Record<OrderDeliveryStatus, string> = {
      PENDIENTE: 'Pendiente de pago ⏳',
      PAGADO: 'Pagado • Listo para Despacho ✅',
      ENVIADO: 'Enviado en camino 🚚',
      ENTREGADO: 'Entregado con éxito 🎉',
    };
    const updated = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            orderStatus: newStatus,
            status: labelMap[newStatus],
            statusClass:
              newStatus === 'ENTREGADO' ? 'status-delivered' : 'status-preparing',
          }
        : o
    );
    persistOrders(updated);
  };

  const reorder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    setItems((prev) => {
      const merged = [...prev];
      order.items.forEach((item) => {
        const existing = merged.find((i) => i.sku === item.sku);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          merged.push({ ...item });
        }
      });
      return merged;
    });

    fireCandyConfetti(undefined, undefined, 60);
    soundEngine.playAddToCartSound();
    setIsCartOpen(true);
  };

  const switchTab = (tab: 'catalog' | 'orders' | 'about') => {
    soundEngine.playBubblePopSound();
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const highlightProduct = (sku: string) => {
    switchTab('catalog');
    setSelectedCategory('todas');
    setSearchQuery('');
    setHighlightedSku(sku);

    setTimeout(() => {
      const el = document.querySelector(`[data-sku="${sku}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);

    setTimeout(() => {
      setHighlightedSku(null);
    }, 3000);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        items,
        isCartOpen,
        coupon,
        orders,
        activeTab,
        searchQuery,
        selectedCategory,
        highlightedSku,
        isMuted,
        totalCount,
        subtotal,
        discount,
        shipping,
        total,
        freeShippingThreshold,
        addItem,
        updateQuantity,
        removeItem,
        openCart,
        closeCart,
        applyCoupon,
        removeCoupon,
        processOrder,
        reorder,
        switchTab,
        setSearchQuery,
        setSelectedCategory,
        highlightProduct,
        toggleMute,
        addProduct,
        updateProduct,
        applyProductPromo,
        removeProductPromo,
        toggleBlockProduct,
        deleteProduct,
        updateOrderStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe ser usado dentro de CartProvider');
  return context;
}
