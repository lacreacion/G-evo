'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCart, NewProductInput } from '@/context/CartContext';
import { CANDY_CATEGORIES } from '@/data/products';
import { Product, OrderDeliveryStatus } from '@/types';
import {
  Lock,
  LogOut,
  Plus,
  Search,
  Edit3,
  Tag,
  EyeOff,
  Eye,
  Trash2,
  BarChart3,
  Package,
  ShoppingBag,
  Download,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  X,
  TrendingUp,
  CreditCard,
  Percent,
  ShieldCheck,
  Activity,
  Database,
  Layers,
  ExternalLink,
} from 'lucide-react';

/**
 * Componente del Logo Oficial G-evo. Grande y Ejecutivo
 */
function GevoOfficialBrand({ size = 'lg' }: { size?: 'md' | 'lg' | 'xl' }) {
  const sizeClasses =
    size === 'xl'
      ? 'text-4xl sm:text-5xl'
      : size === 'lg'
      ? 'text-2xl sm:text-3xl'
      : 'text-xl sm:text-2xl';

  return (
    <span className={`font-black tracking-tight leading-none select-none ${sizeClasses}`}>
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
  );
}

export default function SweetHouseAdminPlatform() {
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    applyProductPromo,
    removeProductPromo,
    toggleBlockProduct,
    deleteProduct,
    updateOrderStatus,
  } = useCart();

  // --- AUTENTICACIÓN EXCLUSIVA DEL ADMINISTRADOR ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('sweet_house_admin_auth') === 'true';
    }
    return false;
  });
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // --- NAVEGACIÓN DE LOS 3 MÓDULOS DE LA PLATAFORMA ---
  const [activeModule, setActiveModule] = useState<'catalogo' | 'balances' | 'pedidos'>('catalogo');

  // --- ESTADOS MÓDULO 1: CATÁLOGO Y 4 ACCIONES POR PRODUCTO ---
  const [categoryFilter, setCategoryFilter] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkus, setSelectedSkus] = useState<string[]>([]);

  // Modal 1: Ingresar Nuevo Producto / Editar Producto
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('cajas-regalo');
  const [formDescription, setFormDescription] = useState('');
  const [formCostPrice, setFormCostPrice] = useState<number>(10);
  const [formSalePrice, setFormSalePrice] = useState<number>(20);
  const [formStock, setFormStock] = useState<number>(25);
  const [formWeight, setFormWeight] = useState('500g');
  const [formImage, setFormImage] = useState('');

  // Modal 2: Insertar Promoción (Individual o Selección Múltiple)
  const [promoModalTargets, setPromoModalTargets] = useState<Product[] | null>(null);
  const [promoMode, setPromoMode] = useState<'percent' | 'fixed'>('percent');
  const [promoValue, setPromoValue] = useState<number>(15);

  // Modal 4: Confirmación de Eliminación ("¿Estás seguro?")
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  // --- ESTADOS MÓDULO 2: BALANCES Y ANALÍTICA ---
  const [dateRangeFilter, setDateRangeFilter] = useState<'hoy' | 'mes' | 'todos'>('todos');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (username.trim().toLowerCase() === 'admin' || username.includes('sweet')) &&
      (password === 'SweetHouse2026!' || password === 'admin123')
    ) {
      setIsAuthenticated(true);
      setLoginError('');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('sweet_house_admin_auth', 'true');
      }
    } else {
      setLoginError('Credenciales inválidas. Usa admin / SweetHouse2026!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('sweet_house_admin_auth');
    }
  };

  // --- ESTADÍSTICAS RÁPIDAS DEL SISTEMA ---
  const systemStats = useMemo(() => {
    const activeCount = products.filter((p) => !p.isBlocked && (p.gEvo?.stock ?? 0) > 0).length;
    const blockedCount = products.filter((p) => p.isBlocked).length;
    const promoCount = products.filter((p) => p.oldPrice && p.oldPrice > p.price).length;
    const lowStockCount = products.filter((p) => (p.gEvo?.stock ?? 0) <= 5).length;
    return { activeCount, blockedCount, promoCount, lowStockCount };
  }, [products]);

  // --- FILTRADO DEL CATÁLOGO EN EL ADMIN ---
  const filteredAdminProducts = useMemo(() => {
    return products.filter((p) => {
      const catMatch = categoryFilter === 'todas' || p.category === categoryFilter;
      if (!catMatch) return false;
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
      );
    });
  }, [products, categoryFilter, searchTerm]);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('cajas-regalo');
    setFormDescription('');
    setFormCostPrice(12);
    setFormSalePrice(24.99);
    setFormStock(30);
    setFormWeight('750g');
    setFormImage('https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&auto=format&fit=crop&q=80');
    setIsProductModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormDescription(product.description);
    setFormCostPrice(product.costPrice ?? Number((product.price * 0.55).toFixed(2)));
    setFormSalePrice(product.price);
    setFormStock(product.gEvo?.stock ?? 20);
    setFormWeight(product.weight);
    setFormImage(product.image);
    setIsProductModalOpen(true);
  };

  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingProduct) {
      updateProduct(editingProduct.sku, {
        name: formName.trim(),
        category: formCategory,
        description: formDescription.trim(),
        costPrice: Number(formCostPrice),
        price: Number(formSalePrice),
        stock: Number(formStock),
        weight: formWeight,
        image: formImage.trim() || editingProduct.image,
      });
    } else {
      const input: NewProductInput = {
        name: formName,
        category: formCategory,
        description: formDescription,
        costPrice: Number(formCostPrice),
        price: Number(formSalePrice),
        stock: Number(formStock),
        weight: formWeight,
        image: formImage,
      };
      addProduct(input);
    }
    setIsProductModalOpen(false);
  };

  const handleConfirmPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoModalTargets || promoModalTargets.length === 0) return;
    const skus = promoModalTargets.map((p) => p.sku);
    applyProductPromo(skus, promoMode, Number(promoValue));
    setPromoModalTargets(null);
    setSelectedSkus([]);
  };

  // --- CÁLCULO DE LOS 4 BALANCES FINANCIEROS ---
  const filteredOrdersByDate = useMemo(() => {
    const now = Date.now();
    return orders.filter((o) => {
      if (dateRangeFilter === 'hoy') {
        return now - o.timestamp <= 86400000;
      }
      if (dateRangeFilter === 'mes') {
        return now - o.timestamp <= 86400000 * 30;
      }
      return true;
    });
  }, [orders, dateRangeFilter]);

  const financialBalances = useMemo(() => {
    let grossRevenue = 0;
    let totalWompiFee = 0;
    let netProfit = 0;
    let promoRevenue = 0;
    let regularRevenue = 0;
    let promoUnits = 0;
    let regularUnits = 0;

    const paymentBreakdown: Record<string, { count: number; total: number }> = {
      Nequi: { count: 0, total: 0 },
      PSE: { count: 0, total: 0 },
      'Botón Bancolombia': { count: 0, total: 0 },
      'Tarjeta de Crédito/Débito': { count: 0, total: 0 },
      WhatsApp: { count: 0, total: 0 },
    };

    const productSalesMap: Record<
      string,
      { sku: string; name: string; units: number; revenue: number }
    > = {};

    filteredOrdersByDate.forEach((order) => {
      grossRevenue += order.total;
      const fee = order.estimatedFee ?? Number((order.total * 0.029).toFixed(2));
      totalWompiFee += fee;

      const orderCost = order.items.reduce(
        (sum, item) => sum + (item.costPrice ?? item.price * 0.55) * item.quantity,
        0
      );
      const profit = order.netProfit ?? Math.max(0, order.total - orderCost - fee);
      netProfit += profit;

      const methodKey = order.paymentMethod.includes('Tarjeta')
        ? 'Tarjeta de Crédito/Débito'
        : order.paymentMethod.includes('WhatsApp')
        ? 'WhatsApp'
        : order.paymentMethod;
      if (!paymentBreakdown[methodKey]) {
        paymentBreakdown[methodKey] = { count: 0, total: 0 };
      }
      paymentBreakdown[methodKey].count += 1;
      paymentBreakdown[methodKey].total += order.total;

      order.items.forEach((item) => {
        const lineTotal = item.price * item.quantity;
        if (item.wasPromo) {
          promoRevenue += lineTotal;
          promoUnits += item.quantity;
        } else {
          regularRevenue += lineTotal;
          regularUnits += item.quantity;
        }

        if (!productSalesMap[item.sku]) {
          productSalesMap[item.sku] = {
            sku: item.sku,
            name: item.name,
            units: 0,
            revenue: 0,
          };
        }
        productSalesMap[item.sku].units += item.quantity;
        productSalesMap[item.sku].revenue += lineTotal;
      });
    });

    const topSelling = Object.values(productSalesMap).sort((a, b) => b.units - a.units);
    const lowSelling = [...products]
      .filter((p) => !productSalesMap[p.sku])
      .slice(0, 6);

    return {
      grossRevenue,
      totalWompiFee,
      netProfit,
      ordersCount: filteredOrdersByDate.length,
      promoRevenue,
      regularRevenue,
      promoUnits,
      regularUnits,
      paymentBreakdown,
      topSelling,
      lowSelling,
    };
  }, [filteredOrdersByDate, products]);

  const handleExportCSV = () => {
    const headers = [
      'ID Pedido',
      'Fecha',
      'Recibe (Dato 1)',
      'WhatsApp (Dato 2)',
      'Direccion y Ciudad (Dato 3)',
      'Medio de Pago',
      'Estado',
      'Ingreso Bruto',
      'Comision Pasarela',
      'Ganancia Neta',
    ];
    const rows = filteredOrdersByDate.map((o) => [
      o.id,
      `"${o.date}"`,
      `"${o.customer.name}"`,
      `"${o.customer.phone}"`,
      `"${o.customer.address} (${o.customer.city})"`,
      `"${o.paymentMethod}"`,
      o.orderStatus || 'PAGADO',
      o.total.toFixed(2),
      (o.estimatedFee ?? o.total * 0.029).toFixed(2),
      (o.netProfit ?? o.total * 0.42).toFixed(2),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `balance_sweet_house_${dateRangeFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ===========================================================================
  // PANTALLA DE LOGIN CORPORATIVO DE LA PLATAFORMA (ESTÉTICA ENTERPRISE SaaS)
  // ===========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070B14] text-white flex flex-col justify-between p-4 relative overflow-hidden">
        {/* Luces de fondo corporativas */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="max-w-7xl w-full mx-auto pt-4 flex items-center justify-between">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 inline-flex items-center gap-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Ir a la Vista Pública de la Tienda</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <span className="text-xs text-gray-400 hidden sm:inline">Tecnología Empresarial</span>
            <GevoOfficialBrand size="lg" />
          </div>
        </div>

        <div className="w-full max-w-md mx-auto bg-[#0D1424] rounded-3xl border border-amber-500/35 shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-8 space-y-6 z-10">
          <div className="text-center space-y-2 border-b border-white/10 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CONSOLA DE ADMINISTRACIÓN &amp; ERP</span>
            </div>
            <div className="pt-1">
              <GevoOfficialBrand size="xl" />
            </div>
            <h1 className="text-lg font-extrabold text-white tracking-tight">
              Plataforma de Gestión • Sweet House
            </h1>
            <p className="text-xs text-gray-400">
              Control centralizado de inventario, motor de ofertas, balances financieros y despacho.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-300 mb-1.5 uppercase tracking-wider text-[10px]">
                ID de Operador / Administrador
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-white font-mono outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-300 mb-1.5 uppercase tracking-wider text-[10px]">
                Clave de Seguridad
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-white font-mono outline-none focus:border-emerald-400"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 font-semibold text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-400 text-black font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-black" />
              <span>Iniciar Sesión en Plataforma</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setUsername('admin');
                setPassword('SweetHouse2026!');
              }}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-amber-300 font-bold text-[11px] cursor-pointer transition-all"
            >
              ⚡ Cargar Credenciales Demo (admin / SweetHouse2026!)
            </button>
          </form>
        </div>

        <div className="text-center pb-2 text-xs text-gray-500">
          Infraestructura de Gestión Comercial impulsada por <GevoOfficialBrand size="md" />
        </div>
      </div>
    );
  }

  // ===========================================================================
  // CONSOLA EMPRESARIAL CON SIDEBAR LATERAL FIJO (PLATAFORMA ERP / BACK-OFFICE)
  // ===========================================================================
  return (
    <div className="min-h-screen bg-[#070B14] text-gray-100 flex flex-col lg:flex-row">
      {/* SIDEBAR LATERAL CORPORATIVO */}
      <aside className="w-full lg:w-72 bg-[#0B1120] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between shrink-0">
        <div className="p-5 space-y-6">
          {/* Marca Protagonista G-evo. + Licencia Cliente */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#111C33] to-[#080E1A] border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <GevoOfficialBrand size="xl" />
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                ERP v2.0
              </span>
            </div>
            <div className="pt-1 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                Licencia Activa para:
              </div>
              <div className="text-sm font-extrabold text-white truncate">
                Sweet House Candy Store
              </div>
            </div>
          </div>

          {/* Menú de Módulos de la Plataforma */}
          <nav className="space-y-1.5">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 px-3 pb-1">
              Módulos de Operación
            </div>

            <button
              type="button"
              onClick={() => setActiveModule('catalogo')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeModule === 'catalogo'
                  ? 'bg-gradient-to-r from-amber-500/25 to-emerald-500/25 text-amber-300 border border-amber-400/40 shadow-md'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>1. Inventario &amp; Catálogo</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-black/50 text-gray-200 font-mono text-[11px]">
                {products.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModule('balances')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeModule === 'balances'
                  ? 'bg-gradient-to-r from-amber-500/25 to-emerald-500/25 text-amber-300 border border-amber-400/40 shadow-md'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <span>2. Balances &amp; Finanzas</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                4 KPIs
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveModule('pedidos')}
              className={`w-full px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeModule === 'pedidos'
                  ? 'bg-gradient-to-r from-amber-500/25 to-emerald-500/25 text-amber-300 border border-amber-400/40 shadow-md'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <span>3. Despacho de Pedidos</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-[11px]">
                {orders.length}
              </span>
            </button>
          </nav>

          {/* Telemetría Rápida de Base de Datos & Pasarela */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5 text-xs">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>Estado de Infraestructura</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-400">SKUs Activos:</span>
              <span className="font-mono font-bold text-emerald-400">{systemStats.activeCount}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-400">SKUs Bloqueados:</span>
              <span className="font-mono font-bold text-amber-400">{systemStats.blockedCount}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Ofertas Activas:</span>
              <span className="font-mono font-bold text-pink-400">{systemStats.promoCount}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Pasarela Wompi:</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                Sandbox Temporal
              </span>
            </div>
          </div>
        </div>

        {/* Pie del Sidebar con Acciones de Salida */}
        <div className="p-5 border-t border-white/10 space-y-2.5">
          <Link
            href="/"
            target="_blank"
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir Tienda Pública</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión Segura</span>
          </button>
        </div>
      </aside>

      {/* ÁREA DE TRABAJO PRINCIPAL DE LA PLATAFORMA */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          {/* Topbar Ejecutiva */}
          <header className="bg-[#0B1120]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20">
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" />
                <span>
                  {activeModule === 'catalogo'
                    ? 'Módulo 01 // Control de Inventario, Precios y Promociones'
                    : activeModule === 'balances'
                    ? 'Módulo 02 // Inteligencia Financiera y Cuadre de Caja'
                    : 'Módulo 03 // Centro de Despacho Guest Checkout (3 Datos)'}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-white mt-0.5">
                {activeModule === 'catalogo'
                  ? 'Administración General del Catálogo'
                  : activeModule === 'balances'
                  ? 'Balances Diarios, Mensuales y Rendimiento'
                  : 'Recepción y Despacho de Pedidos Pagados'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-gray-300 font-semibold">Sincronización en Tiempo Real</span>
              </div>
              <GevoOfficialBrand size="lg" />
            </div>
          </header>

          {/* CONTENIDO DE CADA MÓDULO */}
          <main className="p-5 sm:p-7 space-y-6">
            {/* =============================================================== */}
            {/* MÓDULO 1: CATÁLOGO Y 4 ACCIONES OBLIGATORIAS POR PRODUCTO       */}
            {/* =============================================================== */}
            {activeModule === 'catalogo' && (
              <div className="space-y-5">
                {/* Barra de Herramientas de Inventario */}
                <div className="p-5 rounded-2xl bg-[#0E1628] border border-white/10 space-y-4 shadow-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Filtrar inventario por SKU, nombre o línea..."
                        className="w-full bg-black/50 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {selectedSkus.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const targets = products.filter((p) =>
                              selectedSkus.includes(p.sku)
                            );
                            setPromoModalTargets(targets);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs inline-flex items-center gap-1.5 shadow-lg cursor-pointer"
                        >
                          <Percent className="w-3.5 h-3.5" />
                          <span>Aplicar Oferta a Seleccionados ({selectedSkus.length})</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={openCreateModal}
                        data-testid="btn-ingresar-nuevo-producto"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-black text-xs inline-flex items-center gap-2 shadow-lg hover:brightness-110 cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-black" />
                        <span>Ingresar Nuevo Producto</span>
                      </button>
                    </div>
                  </div>

                  {/* Filtro por Tipos de Producto */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {CANDY_CATEGORIES.map((cat) => {
                      const active = categoryFilter === cat.id;
                      const count =
                        cat.id === 'todas'
                          ? products.length
                          : products.filter((p) => p.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategoryFilter(cat.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                            active
                              ? 'bg-emerald-500 text-black font-black shadow-md'
                              : 'bg-black/40 text-gray-300 border border-white/10 hover:border-white/25'
                          }`}
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                          <span className="text-[10px] opacity-80">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Grid Técnico de Control de Productos (4 Acciones por Tarjeta) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredAdminProducts.map((product) => {
                    const hasPromo = Boolean(
                      product.oldPrice && product.oldPrice > product.price
                    );
                    const isBlocked = Boolean(product.isBlocked);
                    const stock = product.gEvo?.stock ?? 0;
                    const isSelected = selectedSkus.includes(product.sku);

                    return (
                      <div
                        key={product.sku}
                        className={`rounded-2xl bg-[#0E1628] border transition-all overflow-hidden shadow-lg flex flex-col justify-between ${
                          isBlocked
                            ? 'border-red-500/40 opacity-75'
                            : hasPromo
                            ? 'border-amber-400/70'
                            : 'border-white/10 hover:border-emerald-500/40'
                        }`}
                      >
                        <div>
                          {/* Cabecera Técnica de SKU y Estado */}
                          <div className="px-3.5 py-2.5 bg-black/40 border-b border-white/10 flex items-center justify-between gap-2">
                            <label className="flex items-center gap-2 text-[11px] font-mono font-bold text-gray-300 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedSkus((prev) => [...prev, product.sku]);
                                  } else {
                                    setSelectedSkus((prev) =>
                                      prev.filter((s) => s !== product.sku)
                                    );
                                  }
                                }}
                                className="accent-emerald-400 w-3.5 h-3.5"
                              />
                              <span>{product.sku}</span>
                            </label>

                            <div className="flex items-center gap-1.5">
                              {hasPromo && (
                                <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-extrabold">
                                  OFERTA
                                </span>
                              )}
                              {isBlocked ? (
                                <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-extrabold">
                                  BLOQUEADO
                                </span>
                              ) : stock <= 0 ? (
                                <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-extrabold">
                                  AGOTADO
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-extrabold">
                                  STOCK: {stock}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Fila de Miniatura Técnica + Datos Financieros del SKU */}
                          <div className="p-3.5 space-y-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-14 h-14 rounded-xl object-cover border border-white/15 shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="text-[10px] font-bold text-emerald-400 uppercase truncate">
                                  {product.categoryName}
                                </div>
                                <h3 className="font-bold text-xs text-white line-clamp-2 leading-snug">
                                  {product.name}
                                </h3>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs">
                              <div>
                                <span className="text-[10px] text-gray-400 block">
                                  Costo Interno
                                </span>
                                <span className="font-mono font-bold text-gray-200">
                                  ${(product.costPrice ?? product.price * 0.55).toFixed(2)}
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] text-gray-400 block">
                                  Precio Público
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono font-black text-amber-300 text-sm">
                                    ${product.price.toFixed(2)}
                                  </span>
                                  {hasPromo && (
                                    <span className="text-[10px] text-gray-500 line-through font-mono">
                                      ${product.oldPrice!.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* LAS 4 ACCIONES OBLIGATORIAS DE PLATAFORMA */}
                        <div className="p-3.5 pt-0 grid grid-cols-2 gap-1.5 text-[11px] font-bold">
                          {/* 1. Editar */}
                          <button
                            type="button"
                            onClick={() => openEditModal(product)}
                            className="py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-gray-200 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>1. Editar</span>
                          </button>

                          {/* 2. Insertar / Quitar Promoción */}
                          {hasPromo ? (
                            <button
                              type="button"
                              onClick={() => removeProductPromo(product.sku)}
                              className="py-2 px-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                            >
                              <Tag className="w-3.5 h-3.5" />
                              <span>Quitar Promo</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setPromoModalTargets([product])}
                              className="py-2 px-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                            >
                              <Tag className="w-3.5 h-3.5" />
                              <span>2. Promoción</span>
                            </button>
                          )}

                          {/* 3. Bloquear / Desbloquear */}
                          <button
                            type="button"
                            onClick={() => toggleBlockProduct(product.sku)}
                            className={`py-2 px-2.5 rounded-xl border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                              isBlocked
                                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                                : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300'
                            }`}
                          >
                            {isBlocked ? (
                              <>
                                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Desbloquear</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                                <span>3. Bloquear</span>
                              </>
                            )}
                          </button>

                          {/* 4. Eliminar */}
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(product)}
                            className="py-2 px-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>4. Eliminar</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* MÓDULO 2: LOS 4 BALANCES FINANCIEROS Y ANALÍTICA DE VENTAS      */}
            {/* =============================================================== */}
            {activeModule === 'balances' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-[#0E1628] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-extrabold text-white">
                      Consola de Balances Financieros &amp; Rentabilidad
                    </h2>
                    <p className="text-xs text-gray-400">
                      Cálculo automático descontando costo interno de adquisición y comisión estimada de pasarela.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/10 text-xs font-bold">
                      {[
                        { id: 'hoy', label: 'Diario (Hoy)' },
                        { id: 'mes', label: 'Mensual (30d)' },
                        { id: 'todos', label: 'Consolidado Total' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() =>
                            setDateRangeFilter(t.id as typeof dateRangeFilter)
                          }
                          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            dateRangeFilter === t.id
                              ? 'bg-emerald-500 text-black font-black'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-black text-xs inline-flex items-center gap-1.5 shadow-lg cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Exportar CSV / Excel</span>
                    </button>
                  </div>
                </div>

                {/* Tarjetas de KPIs Financieros */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#0E1628] border border-white/10 space-y-1">
                    <span className="text-xs font-bold text-gray-400">
                      1. Ingresos Brutos
                    </span>
                    <div className="text-2xl font-black text-white font-mono">
                      ${financialBalances.grossRevenue.toFixed(2)}
                    </div>
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      {financialBalances.ordersCount} órdenes procesadas
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0E1628] border border-emerald-500/40 space-y-1">
                    <span className="text-xs font-bold text-emerald-400">
                      2. Ganancia Neta Real
                    </span>
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      ${financialBalances.netProfit.toFixed(2)}
                    </div>
                    <span className="text-[11px] text-gray-400">
                      Comisión pasarela: ~${financialBalances.totalWompiFee.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0E1628] border border-amber-500/40 space-y-1">
                    <span className="text-xs font-bold text-amber-300">
                      3. Ventas con Promoción
                    </span>
                    <div className="text-2xl font-black text-amber-300 font-mono">
                      ${financialBalances.promoRevenue.toFixed(2)}
                    </div>
                    <span className="text-[11px] text-gray-400">
                      {financialBalances.promoUnits} unidades vendidas en oferta
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0E1628] border border-white/10 space-y-1">
                    <span className="text-xs font-bold text-gray-400">
                      4. Ventas Precio Normal
                    </span>
                    <div className="text-2xl font-black text-white font-mono">
                      ${financialBalances.regularRevenue.toFixed(2)}
                    </div>
                    <span className="text-[11px] text-gray-400">
                      {financialBalances.regularUnits} unidades sin descuento
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Ranking Más Vendidos y Alerta Baja Rotación */}
                  <div className="p-5 rounded-2xl bg-[#0E1628] border border-white/10 space-y-4">
                    <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-3">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>Balance de Artículos Más Vendidos</span>
                    </h3>

                    <div className="space-y-2">
                      {financialBalances.topSelling.map((item, idx) => (
                        <div
                          key={item.sku}
                          className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-black flex items-center justify-center">
                              #{idx + 1}
                            </span>
                            <div>
                              <div className="font-bold text-white">{item.name}</div>
                              <div className="text-[10px] text-gray-400 font-mono">
                                {item.sku}
                              </div>
                            </div>
                          </div>
                          <div className="text-right font-mono">
                            <div className="font-black text-emerald-400">
                              ${item.revenue.toFixed(2)}
                            </div>
                            <div className="text-[10px] text-gray-400">
                              {item.units} uds
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        <span>SKUs de Baja Rotación (Candidatos a Promoción)</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {financialBalances.lowSelling.map((p) => (
                          <span
                            key={p.sku}
                            className="px-2 py-0.5 rounded bg-black/50 border border-white/10 text-[10px] font-mono text-gray-300"
                          >
                            {p.sku} • {p.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Balance por Métodos de Pago */}
                  <div className="p-5 rounded-2xl bg-[#0E1628] border border-white/10 space-y-4">
                    <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-3">
                      <CreditCard className="w-4 h-4 text-amber-400" />
                      <span>Balance por Métodos de Pago (Cuadre de Caja)</span>
                    </h3>

                    <div className="space-y-2.5">
                      {Object.entries(financialBalances.paymentBreakdown).map(
                        ([method, info]) => (
                          <div
                            key={method}
                            className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 text-xs"
                          >
                            <div>
                              <div className="font-bold text-white">{method}</div>
                              <div className="text-[11px] text-gray-400">
                                {info.count} pagos confirmados
                              </div>
                            </div>
                            <div className="text-base font-mono font-black text-amber-300">
                              ${info.total.toFixed(2)}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* MÓDULO 3: CENTRO DE DESPACHO DE PEDIDOS PAGADOS                 */}
            {/* =============================================================== */}
            {activeModule === 'pedidos' && (
              <div className="rounded-2xl bg-[#0E1628] border border-white/10 overflow-hidden shadow-xl">
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-extrabold text-white">
                      Bandeja de Despacho • Guest Checkout (3 Datos)
                    </h2>
                    <p className="text-xs text-gray-400">
                      Contacta al destinatario por WhatsApp con un clic y actualiza el estado logístico del pedido.
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-white/10">
                  {orders.map((order) => {
                    const currentStatus: OrderDeliveryStatus =
                      order.orderStatus || 'PAGADO';
                    const cleanPhone = order.customer.phone.replace(/[^0-9]/g, '');

                    return (
                      <div
                        key={order.id}
                        className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-white/[0.02]"
                      >
                        <div className="space-y-3 flex-1">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="font-mono font-black text-sm text-amber-300">
                              {order.id}
                            </span>
                            <span className="text-xs text-gray-400">• {order.date}</span>
                            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-emerald-300">
                              {order.paymentMethod}
                            </span>
                          </div>

                          {/* Los 3 Datos Obligatorios del Comprador */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs">
                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase block">
                                1. Destinatario
                              </span>
                              <span className="font-bold text-white">
                                {order.customer.name}
                              </span>
                            </div>

                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase block">
                                2. WhatsApp Directo
                              </span>
                              <a
                                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                  `¡Hola ${order.customer.name}! Te escribimos de Sweet House sobre tu pedido ${order.id}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:underline"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>{order.customer.phone}</span>
                              </a>
                            </div>

                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase block">
                                3. Ciudad y Dirección
                              </span>
                              <span className="font-semibold text-gray-200">
                                {order.customer.address} ({order.customer.city})
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {order.items.map((item) => (
                              <span
                                key={item.sku}
                                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-gray-200"
                              >
                                {item.quantity}x {item.name} (${item.price.toFixed(2)})
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0">
                          <div className="text-right">
                            <span className="text-[10px] text-gray-400 block">
                              Total Orden
                            </span>
                            <span className="text-lg font-mono font-black text-amber-300">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {(
                              ['PAGADO', 'ENVIADO', 'ENTREGADO'] as OrderDeliveryStatus[]
                            ).map((st) => {
                              const active = currentStatus === st;
                              return (
                                <button
                                  key={st}
                                  type="button"
                                  onClick={() => updateOrderStatus(order.id, st)}
                                  className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${
                                    active
                                      ? st === 'ENTREGADO'
                                        ? 'bg-emerald-500 text-black'
                                        : st === 'ENVIADO'
                                        ? 'bg-cyan-400 text-black'
                                        : 'bg-amber-400 text-black'
                                      : 'bg-black/50 text-gray-400 border border-white/10 hover:text-white'
                                  }`}
                                >
                                  {st}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Footer Corporativo con Logo G-evo. Grande */}
        <footer className="bg-[#0B1120] border-t border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-gray-400">
            Consola de Administración Empresarial • Sweet House Candy Store
          </div>
          <a
            href="https://g-evo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-black/60 border border-amber-500/40 hover:border-emerald-400/60 transition-all"
          >
            <span className="text-xs font-semibold text-gray-300">
              Plataforma &amp; Tienda E-commerce • Creada y respaldada por
            </span>
            <GevoOfficialBrand size="lg" />
          </a>
        </footer>
      </div>

      {/* ===================================================================== */}
      {/* MODAL 1: INGRESAR NUEVO PRODUCTO / EDITAR PRODUCTO                    */}
      {/* ===================================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0E1628] text-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-500/40 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-extrabold text-white">
                {editingProduct
                  ? `Editar SKU: ${editingProduct.sku}`
                  : 'Ingresar Nuevo Producto al Inventario'}
              </h3>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 text-gray-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProductForm} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-300 mb-1">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Categoría *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2.5 text-white"
                  >
                    {CANDY_CATEGORIES.filter((c) => c.id !== 'todas').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Peso / Presentación
                  </label>
                  <input
                    type="text"
                    value={formWeight}
                    onChange={(e) => setFormWeight(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">
                    Costo Interno ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formCostPrice}
                    onChange={(e) => setFormCostPrice(Number(e.target.value))}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-amber-300 mb-1">
                    Precio Venta ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formSalePrice}
                    onChange={(e) => setFormSalePrice(Number(e.target.value))}
                    className="w-full bg-black/50 border border-amber-400/50 rounded-xl px-3 py-2.5 font-mono font-bold text-amber-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-300 mb-1">
                    Stock *
                  </label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full bg-black/50 border border-emerald-400/50 rounded-xl px-3 py-2.5 font-mono text-emerald-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">
                  URL de Fotografía
                </label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">
                  Descripción
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl p-3 text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-black text-xs cursor-pointer"
              >
                {editingProduct ? 'Guardar Cambios en Base de Datos' : 'Registrar Producto'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: INSERTAR PROMOCIÓN                                           */}
      {/* ===================================================================== */}
      {promoModalTargets && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0E1628] text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-400/50 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-extrabold text-amber-300 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>Activar Promoción ({promoModalTargets.length} SKU)</span>
              </h3>
              <button
                type="button"
                onClick={() => setPromoModalTargets(null)}
                className="p-1.5 rounded-lg bg-white/10 text-gray-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmPromo} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPromoMode('percent')}
                  className={`py-2.5 rounded-xl font-bold border cursor-pointer ${
                    promoMode === 'percent'
                      ? 'bg-amber-400 text-black border-amber-400'
                      : 'bg-black/40 text-gray-300 border-white/15'
                  }`}
                >
                  Porcentaje (%)
                </button>
                <button
                  type="button"
                  onClick={() => setPromoMode('fixed')}
                  className={`py-2.5 rounded-xl font-bold border cursor-pointer ${
                    promoMode === 'fixed'
                      ? 'bg-amber-400 text-black border-amber-400'
                      : 'bg-black/40 text-gray-300 border-white/15'
                  }`}
                >
                  Monto Fijo ($)
                </button>
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">
                  {promoMode === 'percent' ? 'Descuento (%)' : 'Descuento ($)'}
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={promoValue}
                  onChange={(e) => setPromoValue(Number(e.target.value))}
                  className="w-full bg-black/50 border border-amber-400/50 rounded-xl px-3.5 py-2.5 text-sm font-mono font-black text-amber-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Publicar Oferta con Precio Tachado</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 4: CONFIRMACIÓN DE ELIMINACIÓN                                  */}
      {/* ===================================================================== */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0E1628] text-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-red-500/40 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-white">
                ¿Confirmas eliminar este SKU?
              </h3>
              <p className="text-xs text-gray-400">
                Se eliminará <strong>{deleteTarget.name}</strong> ({deleteTarget.sku}) del catálogo.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="py-2.5 rounded-xl bg-white/10 text-gray-300 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteProduct(deleteTarget.sku);
                  setDeleteTarget(null);
                }}
                className="py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white cursor-pointer"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
