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
} from 'lucide-react';

export default function SweetHouseAdminPage() {
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

  // --- NAVEGACIÓN DE LOS 3 MÓDULOS DEL BACK-OFFICE ---
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

  // Abrir Modal para Ingresar Nuevo Producto
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

  // Acción 1: Abrir Modal para Editar Producto
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

  // Acción 2: Confirmar Inserción de Promoción
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

      // Medio de pago
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

      // Artículos y Promociones
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
      .slice(0, 5);

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

  // Exportar Reporte en CSV / Excel
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

  // --- VISTA DE LOGIN PRIVADO DEL ADMINISTRADOR ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-2xl p-7 space-y-5">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xs font-bold text-stone-500 hover:text-pink-600 inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la Tienda</span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-extrabold">
              Back-Office Privado
            </span>
          </div>

          <div className="text-center space-y-1">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 text-white flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-heading text-xl font-bold text-stone-900 pt-2">
              Administrador Sweet House
            </h1>
            <p className="text-xs text-stone-500">
              Acceso exclusivo para gestión de inventario, promociones, balances y pedidos.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Usuario Administrador
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-800 outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="SweetHouse2026!"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-800 outline-none focus:border-pink-500"
              />
            </div>

            {loginError && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 font-semibold text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="candy-btn-gradient w-full py-3 rounded-xl font-bold text-sm shadow-md cursor-pointer"
            >
              Ingresar al Panel de Control
            </button>

            <button
              type="button"
              onClick={() => {
                setUsername('admin');
                setPassword('SweetHouse2026!');
              }}
              className="w-full py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-[11px] cursor-pointer"
            >
              ⚡ Autocompletar Credenciales de Administrador
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col justify-between">
      <div>
        {/* Barra Superior del Back-Office */}
        <header className="sticky top-0 z-30 bg-white border-b border-stone-200 shadow-sm px-4 sm:px-8 py-3">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png?v=4"
                alt="Sweet House"
                className="w-10 h-10 rounded-full border border-pink-300 object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading text-base font-bold text-stone-900">
                    Sweet House • Back-Office
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                    Admin Activo
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Gestión ligera de catálogo, promociones, balances y pedidos
                </p>
              </div>
            </div>

            {/* Selector de los 3 Módulos del Panel */}
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-2xl border border-stone-200">
              <button
                type="button"
                onClick={() => setActiveModule('catalogo')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeModule === 'catalogo'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>1. Catálogo ({products.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModule('balances')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeModule === 'balances'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>2. Balances y Ventas</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModule('pedidos')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeModule === 'pedidos'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>3. Pedidos ({orders.length})</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-pink-600" />
                <span>Ver Tienda Pública</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
          {/* ================================================================= */}
          {/* MÓDULO 1: VISTA GENERAL DEL CATÁLOGO Y 4 ACCIONES POR PRODUCTO    */}
          {/* ================================================================= */}
          {activeModule === 'catalogo' && (
            <div className="space-y-5">
              {/* Cabecera de Acciones y Buscador */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar dulce por nombre, tipo o SKU..."
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs outline-none focus:border-pink-500"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {selectedSkus.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const targets = products.filter((p) => selectedSkus.includes(p.sku));
                          setPromoModalTargets(targets);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <Percent className="w-3.5 h-3.5" />
                        <span>Promoción Masiva ({selectedSkus.length})</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={openCreateModal}
                      data-testid="btn-ingresar-nuevo-producto"
                      className="candy-btn-gradient px-5 py-2.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ingresar Nuevo Producto</span>
                    </button>
                  </div>
                </div>

                {/* Barra de Filtro por Tipos de Producto */}
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
                        className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                          active
                            ? 'bg-stone-900 text-white'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                        <span className="text-[10px] opacity-75">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cuadrícula de Productos con las 4 Acciones Obligatorias en cada Caja */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredAdminProducts.map((product) => {
                  const hasPromo = Boolean(product.oldPrice && product.oldPrice > product.price);
                  const isBlocked = Boolean(product.isBlocked);
                  const stock = product.gEvo?.stock ?? 0;
                  const isSelected = selectedSkus.includes(product.sku);

                  return (
                    <div
                      key={product.sku}
                      className={`rounded-2xl bg-white border transition-all overflow-hidden shadow-sm flex flex-col justify-between ${
                        isBlocked
                          ? 'border-stone-300 opacity-75 bg-stone-100/60'
                          : hasPromo
                          ? 'border-amber-400 ring-1 ring-amber-300'
                          : 'border-stone-200'
                      }`}
                    >
                      <div>
                        {/* Imagen y Estado */}
                        <div className="relative h-40 bg-stone-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />

                          {/* Checkbox para selección múltiple de promociones */}
                          <label className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-stone-200 flex items-center gap-1.5 text-[10px] font-bold cursor-pointer shadow-sm">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedSkus((prev) => [...prev, product.sku]);
                                } else {
                                  setSelectedSkus((prev) => prev.filter((s) => s !== product.sku));
                                }
                              }}
                              className="accent-pink-600"
                            />
                            <span>{product.sku}</span>
                          </label>

                          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end">
                            {isBlocked ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-stone-900 text-white text-[10px] font-extrabold">
                                ⏸ Bloqueado (Oculto)
                              </span>
                            ) : stock <= 0 ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold">
                                Agotado (0)
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold">
                                Activo • Stock: {stock}
                              </span>
                            )}

                            {hasPromo && (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold shadow">
                                🔥 Oferta Activa
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Info Producto */}
                        <div className="p-3.5 space-y-2">
                          <div className="text-[10px] font-bold text-pink-600 uppercase">
                            {product.categoryName}
                          </div>
                          <h3 className="font-heading font-bold text-sm text-stone-900 line-clamp-1">
                            {product.name}
                          </h3>

                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-100 text-xs">
                            <div>
                              <span className="text-[10px] text-stone-400 block">
                                Costo Interno
                              </span>
                              <span className="font-bold text-stone-600">
                                ${(product.costPrice ?? product.price * 0.55).toFixed(2)}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] text-stone-400 block">
                                Precio Venta
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-pink-600 text-sm">
                                  ${product.price.toFixed(2)}
                                </span>
                                {hasPromo && (
                                  <span className="text-[11px] text-stone-400 line-through">
                                    ${product.oldPrice!.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* LAS 4 ACCIONES OBLIGATORIAS DENTRO DE CADA TARJETA */}
                      <div className="p-3 pt-0 grid grid-cols-2 gap-1.5 text-[11px] font-bold">
                        {/* 1. Editar */}
                        <button
                          type="button"
                          onClick={() => openEditModal(product)}
                          className="py-1.5 px-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                          <span>1. Editar</span>
                        </button>

                        {/* 2. Insertar / Quitar Promoción */}
                        {hasPromo ? (
                          <button
                            type="button"
                            onClick={() => removeProductPromo(product.sku)}
                            className="py-1.5 px-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Tag className="w-3.5 h-3.5 text-amber-700" />
                            <span>Quitar Promo</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setPromoModalTargets([product])}
                            className="py-1.5 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Tag className="w-3.5 h-3.5 text-amber-600" />
                            <span>2. Promoción</span>
                          </button>
                        )}

                        {/* 3. Bloquear / Desbloquear */}
                        <button
                          type="button"
                          onClick={() => toggleBlockProduct(product.sku)}
                          className={`py-1.5 px-2.5 rounded-xl flex items-center justify-center gap-1 cursor-pointer ${
                            isBlocked
                              ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                          }`}
                        >
                          {isBlocked ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-emerald-700" />
                              <span>Desbloquear</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-stone-600" />
                              <span>3. Bloquear</span>
                            </>
                          )}
                        </button>

                        {/* 4. Eliminar (con confirmación) */}
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(product)}
                          className="py-1.5 px-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 flex items-center justify-center gap-1 cursor-pointer"
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

          {/* ================================================================= */}
          {/* MÓDULO 2: BALANCES Y ANALÍTICA DE VENTAS (LOS 4 BALANCES)         */}
          {/* ================================================================= */}
          {activeModule === 'balances' && (
            <div className="space-y-6">
              {/* Barra Superior de Filtro de Fechas y Exportación CSV */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading text-lg font-bold text-stone-900">
                    Balances Financieros y Analítica de Ventas
                  </h2>
                  <p className="text-xs text-stone-500">
                    Control de ingresos brutos, ganancia neta (descontando costo interno y comisión Wompi), promociones y medios de pago.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-bold">
                    {[
                      { id: 'hoy', label: 'Balance Diario (Hoy)' },
                      { id: 'mes', label: 'Balance Mensual (30d)' },
                      { id: 'todos', label: 'Histórico Total' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setDateRangeFilter(t.id as typeof dateRangeFilter)}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          dateRangeFilter === t.id
                            ? 'bg-white text-pink-600 shadow-sm'
                            : 'text-stone-600'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar CSV / Excel</span>
                  </button>
                </div>
              </div>

              {/* BALANCE 1: DIARIO Y MENSUAL DE COMPRAS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                  <span className="text-xs font-bold text-stone-500">
                    1. Ingresos Brutos Totales
                  </span>
                  <div className="text-2xl font-black text-stone-900">
                    ${financialBalances.grossRevenue.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    {financialBalances.ordersCount} pedidos concretados
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-emerald-300 shadow-sm space-y-1">
                  <span className="text-xs font-bold text-emerald-700">
                    2. Ganancia Neta Estimada
                  </span>
                  <div className="text-2xl font-black text-emerald-600">
                    ${financialBalances.netProfit.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-stone-500">
                    Descontando costo interno y comisión Wompi (~$
                    {financialBalances.totalWompiFee.toFixed(2)})
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-amber-300 shadow-sm space-y-1">
                  <span className="text-xs font-bold text-amber-700">
                    3. Ventas con Promoción
                  </span>
                  <div className="text-2xl font-black text-amber-600">
                    ${financialBalances.promoRevenue.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-stone-500">
                    {financialBalances.promoUnits} unidades vendidas en oferta
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                  <span className="text-xs font-bold text-stone-500">
                    4. Ventas a Precio Regular
                  </span>
                  <div className="text-2xl font-black text-stone-900">
                    ${financialBalances.regularRevenue.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-stone-500">
                    {financialBalances.regularUnits} unidades sin descuento
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* BALANCE 2: ARTÍCULOS MÁS VENDIDOS (Y ALERTA DE MENOS VENDIDOS) */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <h3 className="font-heading font-bold text-base text-stone-900 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-pink-600" />
                      <span>Balance de Artículos Más Vendidos</span>
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {financialBalances.topSelling.map((item, idx) => (
                      <div
                        key={item.sku}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 font-black flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="font-bold text-stone-900">{item.name}</div>
                            <div className="text-[10px] text-stone-400 font-mono">
                              SKU: {item.sku}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-black text-stone-900">
                            ${item.revenue.toFixed(2)}
                          </div>
                          <div className="text-[10px] font-bold text-emerald-600">
                            {item.units} uds vendidas
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Alerta de Menos Vendidos */}
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
                    <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Alerta de Baja Rotación (Sugeridos para Promoción)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {financialBalances.lowSelling.map((p) => (
                        <span
                          key={p.sku}
                          className="px-2 py-0.5 rounded-lg bg-white border border-amber-200 text-[11px] font-semibold text-stone-700"
                        >
                          {p.name} ({p.sku})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BALANCE 4: DESGLOSE POR MÉTODOS DE PAGO (CUADRE DE CAJA WOMPI) */}
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <h3 className="font-heading font-bold text-base text-stone-900 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <span>Balance de Métodos de Pago (Cuadre de Caja)</span>
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {Object.entries(financialBalances.paymentBreakdown).map(
                      ([method, info]) => (
                        <div
                          key={method}
                          className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs"
                        >
                          <div>
                            <div className="font-bold text-stone-900">{method}</div>
                            <div className="text-[11px] text-stone-500">
                              {info.count} transacciones registradas
                            </div>
                          </div>
                          <div className="text-base font-black text-emerald-700">
                            ${info.total.toFixed(2)}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* BALANCE 3 RESUMEN: PROMOCIÓN VS NORMAL */}
                  <div className="p-4 rounded-xl bg-pink-50/70 border border-pink-200 space-y-2 text-xs">
                    <div className="font-bold text-pink-900">
                      Balance Comparativo: Ofertas Activas vs. Precio Regular
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-2.5 rounded-lg border border-pink-100">
                        <span className="text-[10px] text-stone-500 block">
                          Ingresos por Ofertas
                        </span>
                        <span className="font-black text-pink-600 text-sm">
                          ${financialBalances.promoRevenue.toFixed(2)} (
                          {financialBalances.promoUnits} uds)
                        </span>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-pink-100">
                        <span className="text-[10px] text-stone-500 block">
                          Ingresos Precio Normal
                        </span>
                        <span className="font-black text-stone-800 text-sm">
                          ${financialBalances.regularRevenue.toFixed(2)} (
                          {financialBalances.regularUnits} uds)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* MÓDULO 3: GESTIÓN BÁSICA DE PEDIDOS PAGADOS (3 DATOS DE ENVÍO)    */}
          {/* ================================================================= */}
          {activeModule === 'pedidos' && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-heading text-lg font-bold text-stone-900">
                    Gestión de Pedidos Recibidos (Guest Checkout 3 Datos)
                  </h2>
                  <p className="text-xs text-stone-500">
                    Verifica los 3 datos de envío del comprador, abre su chat de WhatsApp con un clic y actualiza el estado de entrega.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-stone-200">
                {orders.map((order) => {
                  const currentStatus: OrderDeliveryStatus =
                    order.orderStatus || 'PAGADO';
                  const cleanPhone = order.customer.phone.replace(/[^0-9]/g, '');

                  return (
                    <div
                      key={order.id}
                      className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-stone-50/70"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono font-black text-sm text-pink-600">
                            {order.id}
                          </span>
                          <span className="text-xs text-stone-400">• {order.date}</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-[11px] font-bold text-stone-700">
                            💳 {order.paymentMethod}
                          </span>
                        </div>

                        {/* LOS 3 DATOS DE ENVÍO DEL COMPRADOR */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs">
                          <div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase block">
                              1. Quien Recibe
                            </span>
                            <span className="font-bold text-stone-900">
                              {order.customer.name}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase block">
                              2. Celular / WhatsApp
                            </span>
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                `¡Hola ${order.customer.name}! Te escribimos de Sweet House Candy Store sobre tu pedido ${order.id} 🍭`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:underline"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>{order.customer.phone}</span>
                            </a>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-stone-400 uppercase block">
                              3. Ciudad, Dirección y Barrio
                            </span>
                            <span className="font-semibold text-stone-800">
                              {order.customer.address} ({order.customer.city})
                            </span>
                          </div>
                        </div>

                        {/* Dulces Comprados */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {order.items.map((item) => (
                            <span
                              key={item.sku}
                              className="px-2.5 py-1 rounded-lg bg-pink-50 border border-pink-200 text-[11px] font-semibold text-pink-900"
                            >
                              {item.quantity}x {item.name} (${item.price.toFixed(2)})
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Total y Cambio de Estado (Pagado -> Enviado -> Entregado) */}
                      <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-stone-200">
                        <div className="text-right">
                          <span className="text-[10px] text-stone-400 block">
                            Total Pagado
                          </span>
                          <span className="text-lg font-black text-stone-900">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {(['PAGADO', 'ENVIADO', 'ENTREGADO'] as OrderDeliveryStatus[]).map(
                            (st) => {
                              const active = currentStatus === st;
                              return (
                                <button
                                  key={st}
                                  type="button"
                                  onClick={() => updateOrderStatus(order.id, st)}
                                  className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${
                                    active
                                      ? st === 'ENTREGADO'
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : st === 'ENVIADO'
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'bg-amber-500 text-white shadow-sm'
                                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                  }`}
                                >
                                  {st}
                                </button>
                              );
                            }
                          )}
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

      {/* ===================================================================== */}
      {/* MODAL: INGRESAR NUEVO PRODUCTO / ACCIÓN 1: EDITAR PRODUCTO            */}
      {/* ===================================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-heading text-lg font-bold text-stone-900">
                {editingProduct ? `Editar: ${editingProduct.name}` : 'Ingresar Nuevo Producto'}
              </h3>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProductForm} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Nombre del Dulce o Caja *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ej. Caja Gomitas Sandía Pica-Rica 1kg"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-stone-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Tipo / Categoría *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                  >
                    {CANDY_CATEGORIES.filter((c) => c.id !== 'todas').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Peso / Presentación
                  </label>
                  <input
                    type="text"
                    value={formWeight}
                    onChange={(e) => setFormWeight(e.target.value)}
                    placeholder="Ej. 800g"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-stone-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Costo Interno ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formCostPrice}
                    onChange={(e) => setFormCostPrice(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-pink-600 mb-1">
                    Precio Venta ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formSalePrice}
                    onChange={(e) => setFormSalePrice(Number(e.target.value))}
                    className="w-full bg-pink-50 border border-pink-200 rounded-xl px-3 py-2 font-bold text-pink-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Stock Disponible *
                  </label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  URL de la Fotografía
                </label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-stone-800"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Descripción del Producto
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe los dulces que incluye..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-800 resize-none"
                />
              </div>

              <button
                type="submit"
                className="candy-btn-gradient w-full py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer"
              >
                {editingProduct ? 'Guardar Cambios del Producto' : 'Crear y Publicar en la Tienda'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL ACCIÓN 2: INSERTAR PROMOCIÓN                                    */}
      {/* ===================================================================== */}
      {promoModalTargets && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-300 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-heading text-base font-bold text-stone-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-500" />
                <span>Insertar Promoción ({promoModalTargets.length} prod.)</span>
              </h3>
              <button
                type="button"
                onClick={() => setPromoModalTargets(null)}
                className="p-1.5 rounded-full bg-stone-100 text-stone-600 cursor-pointer"
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
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  Por Porcentaje (%)
                </button>
                <button
                  type="button"
                  onClick={() => setPromoMode('fixed')}
                  className={`py-2.5 rounded-xl font-bold border cursor-pointer ${
                    promoMode === 'fixed'
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  Valor Fijo ($)
                </button>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {promoMode === 'percent'
                    ? 'Porcentaje de Descuento (%)'
                    : 'Monto a Descontar ($)'}
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={promoValue}
                  onChange={(e) => setPromoValue(Number(e.target.value))}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm font-black text-amber-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-pink-600 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Aplicar Oferta y Mostrar Precio Tachado en Web</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL ACCIÓN 4: CONFIRMACIÓN DE ELIMINACIÓN ("¿ESTÁS SEGURO?")        */}
      {/* ===================================================================== */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-red-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading text-base font-bold text-stone-900">
                ¿Estás seguro de eliminar este producto?
              </h3>
              <p className="text-xs text-stone-500">
                Se eliminará <strong>{deleteTarget.name}</strong> ({deleteTarget.sku}) del catálogo.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteProduct(deleteTarget.sku);
                  setDeleteTarget(null);
                }}
                className="py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer con Sello Oficial de Respaldo G-evo. */}
      <footer className="bg-white border-t border-stone-200 py-4 px-6 mt-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
          <span>Sweet House Candy Store • Panel de Administración Ligero</span>
          <a
            href="https://g-evo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900 text-stone-200 text-xs"
          >
            <span>Tienda E-commerce • Creada y respaldada por</span>
            <span className="font-extrabold tracking-tight">
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
          </a>
        </div>
      </footer>
    </div>
  );
}
