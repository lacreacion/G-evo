'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { INITIAL_PRODUCTS, ProductItem } from '@/lib/mockData';
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  Bot, 
  Key, 
  ExternalLink, 
  LogOut, 
  Search, 
  AlertCircle,
  Eye,
  Settings,
  CreditCard
} from 'lucide-react';

export default function ClientPortalPage() {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'digital-card' | 'products' | 'branding' | 'ai-module'>('digital-card');
  
  // Product Modal (Create or Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Product Form states
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Consultoría Estratégica');
  const [prodPrice, setProdPrice] = useState<number>(0);
  const [prodStock, setProdStock] = useState<number>(10);
  const [prodSku, setProdSku] = useState('');
  const [prodDescription, setProdDescription] = useState('');
  const [prodImageUrl, setProdImageUrl] = useState('');

  // AI Support Bot Activation State
  const [hasAiActive, setHasAiActive] = useState(true);
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [licenseSuccess, setLicenseSuccess] = useState(false);
  const [licenseError, setLicenseError] = useState('');

  // Business Info States
  const [businessName, setBusinessName] = useState('Laura Restrepo | Branding & Consultoría');
  const [slogan, setSlogan] = useState('Diseño y posicionamiento de marcas de alto impacto');
  const [whatsappPhone, setWhatsappPhone] = useState('+57 312 456 7890');
  const [infoSaved, setInfoSaved] = useState(false);

  // Digital Card Profile & Legal Consent (v1.1) States
  const [cardFullName, setCardFullName] = useState('Laura Restrepo');
  const [cardJobTitle, setCardJobTitle] = useState('Directora de Branding & Estrategia Comercial');
  const [cardOrganization, setCardOrganization] = useState('Laura Restrepo Studio');
  const [cardWhatsapp, setCardWhatsapp] = useState('+573124567890');
  const [cardEmail, setCardEmail] = useState('hola@laurarestrepo.com');
  const [cardTheme, setCardTheme] = useState('gold_metallic');
  const [cardInstagram, setCardInstagram] = useState('https://instagram.com/laurarestrepo');
  const cardPortfolio = 'https://g-evo.com';
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [cardSaveSuccess, setCardSaveSuccess] = useState(false);
  const [cardAuditTimestamp, setCardAuditTimestamp] = useState<string | null>(null);
  const [iframeKey, setIframeKey] = useState(0);

  const handleSaveDigitalCardProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;

    const acceptedAtUtc = new Date().toISOString();
    const parts = cardFullName.trim().split(' ');
    const firstName = parts[0] || cardFullName;
    const lastName = parts.slice(1).join(' ') || '';

    try {
      const storageKey = 'gevo_card_profile_laura-restrepo';
      const existingRaw = localStorage.getItem(storageKey);
      const existing = existingRaw ? JSON.parse(existingRaw) : {};
      const updatedProfile = {
        ...existing,
        id: 'laura-restrepo',
        firstName,
        lastName,
        fullName: cardFullName.trim(),
        title: cardJobTitle.trim(),
        organization: cardOrganization.trim(),
        phone: cardWhatsapp.trim(),
        email: cardEmail.trim(),
        theme: cardTheme,
        instagram: cardInstagram.trim(),
        portfolio: cardPortfolio.trim(),
        terms_accepted: true,
        terms_accepted_at: acceptedAtUtc,
        terms_version: '1.1',
      };
      localStorage.setItem(storageKey, JSON.stringify(updatedProfile));
    } catch {
      // Ignore storage errors
    }

    setCardAuditTimestamp(acceptedAtUtc);
    setCardSaveSuccess(true);
    setIframeKey((prev) => prev + 1);
    setTimeout(() => setCardSaveSuccess(false), 5000);
  };

  const handleOpenCreateProduct = () => {
    setEditingProduct(null);
    setProdName('');
    setProdCategory('Consultoría Estratégica');
    setProdPrice(500000);
    setProdStock(10);
    setProdSku(`PROD-${Math.floor(100 + Math.random() * 900)}`);
    setProdDescription('');
    setProdImageUrl('https://images.unsplash.com/photo-1542744094-3a31727221eb?auto=format&fit=crop&w=600&q=80');
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: ProductItem) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdCategory(prod.category);
    setProdPrice(prod.price);
    setProdStock(prod.stock);
    setProdSku(prod.sku);
    setProdDescription(prod.description);
    setProdImageUrl(prod.imageUrl);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName) return;

    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: prodName,
                category: prodCategory,
                price: Number(prodPrice),
                stock: Number(prodStock),
                sku: prodSku,
                description: prodDescription,
                imageUrl: prodImageUrl
              }
            : p
        )
      );
    } else {
      const newProduct: ProductItem = {
        id: `prod-${Date.now()}`,
        tenantSlug: 'laura-restrepo',
        name: prodName,
        category: prodCategory,
        price: Number(prodPrice),
        stock: Number(prodStock),
        sku: prodSku,
        description: prodDescription,
        imageUrl: prodImageUrl || 'https://images.unsplash.com/photo-1542744094-3a31727221eb?auto=format&fit=crop&w=600&q=80',
        isAvailable: true,
        featured: false
      };
      setProducts([newProduct, ...products]);
    }

    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto de tu catálogo?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleToggleAvailability = (id: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, isAvailable: !p.isAvailable } : p))
    );
  };

  const handleRedeemLicense = (e: React.FormEvent) => {
    e.preventDefault();
    setLicenseError('');

    if (licenseKeyInput.trim().toUpperCase().startsWith('GEVO-')) {
      setHasAiActive(true);
      setLicenseSuccess(true);
      setLicenseKeyInput('');
      setTimeout(() => setLicenseSuccess(false), 4000);
    } else {
      setLicenseError('Código inválido. Asegúrate de ingresar el formato emitido por G-evo (ej. GEVO-LAUR-AI24-8F92A1).');
    }
  };

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    setInfoSaved(true);
    setTimeout(() => setInfoSaved(false), 3000);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      
      {/* Header del Portal de Clientes */}
      <header className="border-b border-white/10 bg-[#0A0F1D]/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <div className="h-5 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white hidden sm:inline">
              Portal de Gestión Autónomo
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Laura Restrepo
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/t/laura-restrepo"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-semibold text-emerald-300 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ver mi Tarjeta Pública</span>
          </Link>

          <Link
            href="/login"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-8">
        
        {/* Banner de Bienvenida y Pestañas */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Administración de tu Tarjeta &amp; Catálogo
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Edita tu tarjeta digital interactiva (NFC/QR), tus productos, fotos y precios en tiempo real.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0E1524] rounded-2xl border border-white/10 self-start lg:self-auto">
            <button
              onClick={() => setActiveTab('digital-card')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'digital-card'
                  ? 'bg-gradient-to-r from-amber-500/30 to-emerald-500/30 text-amber-300 border border-amber-500/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Mi Tarjeta Digital (NFC/QR)</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-emerald-300 border border-emerald-500/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Inventario ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('branding')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'branding'
                  ? 'bg-gradient-to-r from-amber-500/30 to-yellow-500/30 text-amber-300 border border-amber-500/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Datos &amp; Textos</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-module')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'ai-module'
                  ? 'bg-gradient-to-r from-emerald-500/30 to-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Módulo IA 24/7</span>
              {hasAiActive && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PESTAÑA 0: MI TARJETA DIGITAL INTERACTIVA (EN VIVO Y EDITABLE) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'digital-card' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1524] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Modo Propietario Activado • Edita tu Tarjeta en Vivo</span>
                </div>
                <p className="text-xs text-gray-300">
                  Actualiza los datos, enlaces externos y acabado de tu Tarjeta Digital Inteligente (NFC/QR) o usa el botón <strong className="text-emerald-400">&quot;Editar&quot;</strong> dentro de la vista interactiva.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href="/t/laura-restrepo"
                  target="_blank"
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Vista Pública</span>
                </Link>
                <Link
                  href="/t/laura-restrepo?owner=1"
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-xs font-bold text-black flex items-center gap-1.5 transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5 text-black" />
                  <span>Abrir en Pantalla Completa</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Formulario de Edición de Perfil de Tarjeta Digital + Autorización Legal Obligatoria */}
              <form
                onSubmit={handleSaveDigitalCardProfile}
                data-testid="digital-card-profile-form"
                className="lg:col-span-5 p-6 rounded-3xl bg-[#0E1524] border border-white/10 shadow-xl space-y-4"
              >
                <div className="border-b border-white/10 pb-3">
                  <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-amber-400" />
                    <span>Configuración de Perfil &amp; Enlaces</span>
                  </h2>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Personaliza tu Tarjeta Digital Inteligente y gestiona tus enlaces oficiales.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label htmlFor="card-full-name" className="block text-gray-300 font-semibold mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      id="card-full-name"
                      type="text"
                      required
                      value={cardFullName}
                      onChange={(e) => setCardFullName(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="card-organization" className="block text-gray-300 font-semibold mb-1">
                      Empresa / Marca *
                    </label>
                    <input
                      id="card-organization"
                      type="text"
                      required
                      value={cardOrganization}
                      onChange={(e) => setCardOrganization(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label htmlFor="card-job-title" className="block text-gray-300 font-semibold mb-1">
                    Cargo / Especialidad Profesional *
                  </label>
                  <input
                    id="card-job-title"
                    type="text"
                    required
                    value={cardJobTitle}
                    onChange={(e) => setCardJobTitle(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label htmlFor="card-whatsapp" className="block text-gray-300 font-semibold mb-1">
                      WhatsApp Comercial *
                    </label>
                    <input
                      id="card-whatsapp"
                      type="text"
                      required
                      value={cardWhatsapp}
                      onChange={(e) => setCardWhatsapp(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-emerald-400 font-semibold focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="card-email" className="block text-gray-300 font-semibold mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      id="card-email"
                      type="email"
                      required
                      value={cardEmail}
                      onChange={(e) => setCardEmail(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label htmlFor="card-instagram" className="block text-gray-300 font-semibold mb-1">
                      Enlace Instagram
                    </label>
                    <input
                      id="card-instagram"
                      type="url"
                      value={cardInstagram}
                      onChange={(e) => setCardInstagram(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="card-theme" className="block text-gray-300 font-semibold mb-1">
                      Acabado / Tema Visual
                    </label>
                    <select
                      id="card-theme"
                      value={cardTheme}
                      onChange={(e) => setCardTheme(e.target.value)}
                      className="w-full bg-[#0A0F1D] border border-white/10 rounded-xl px-3 py-2 text-amber-300 font-semibold focus:outline-none focus:border-amber-400"
                    >
                      <option value="gold_metallic">✨ Oro 24K Metalizado</option>
                      <option value="emerald">Esmeralda G-evo</option>
                      <option value="silver_chrome">✨ Plata Cromo Metalizado</option>
                      <option value="rose_gold">✨ Oro Rosa Metalizado</option>
                      <option value="titanium_cyan">✨ Titanio Azul Metalizado</option>
                      <option value="cobalt">Cobalto</option>
                      <option value="violet">Violeta</option>
                      <option value="crimson">Carmesí</option>
                    </select>
                  </div>
                </div>

                {/* Bloque de Autorización Legal Obligatoria (Habeas Data / GDPR - Versión 1.1) */}
                <div className="p-3.5 rounded-2xl bg-black/50 border border-amber-500/30 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <input
                      id="terms-accepted-checkbox"
                      name="terms_accepted"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded accent-emerald-500 cursor-pointer shrink-0"
                    />
                    <label
                      htmlFor="terms-accepted-checkbox"
                      className="text-[11px] text-gray-200 leading-relaxed cursor-pointer select-none"
                    >
                      Sí autorizo el tratamiento de mis datos personales y acepto los términos de manejo de enlaces y uso de la Tarjeta Digital.
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pl-6 pt-1">
                    <a
                      href="/docs/terminos-y-autorizacion-tarjeta-digital.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 underline underline-offset-2"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Ver documento legal (PDF)</span>
                    </a>
                    <Link
                      href="/legal/autorizacion-tarjeta-digital"
                      target="_blank"
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 underline"
                    >
                      Vista lectura web (v1.1)
                    </Link>
                  </div>
                </div>

                {cardSaveSuccess && (
                  <div
                    role="status"
                    data-testid="card-save-success-toast"
                    className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold text-center space-y-0.5"
                  >
                    <div>✓ ¡Tarjeta Digital actualizada con éxito!</div>
                    {cardAuditTimestamp && (
                      <div className="text-[10px] font-mono text-emerald-200/80">
                        Auditoría legal v1.1 registrada: {cardAuditTimestamp}
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  data-testid="btn-save-digital-card"
                  disabled={!termsAccepted}
                  className="w-full py-3 px-4 rounded-xl font-extrabold text-xs text-black bg-gradient-to-r from-amber-400 to-emerald-400 hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none cursor-pointer"
                >
                  Guardar / Actualizar Tarjeta
                </button>
              </form>

              {/* Vista Previa Interactiva en Vivo */}
              <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#070709] h-[780px]">
                <iframe
                  key={iframeKey}
                  src="/card-engine.html?slug=laura-restrepo&admin_preview=1"
                  title="Editor en Vivo de Mi Tarjeta Digital"
                  className="w-full h-full border-0 block"
                  allow="clipboard-write; web-share"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PESTAÑA 1: GESTIÓN DE PRODUCTOS / INVENTARIO */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por referencia, nombre o SKU..."
                  className="w-full bg-[#0E1524] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                onClick={handleOpenCreateProduct}
                className="px-4 py-2.5 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 to-emerald-400 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>Agregar Nuevo Producto / Servicio</span>
              </button>
            </div>

            {/* Grid de Productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="rounded-3xl bg-[#0E1524] border border-white/10 overflow-hidden shadow-xl flex flex-col justify-between group"
                >
                  <div className="relative h-44 bg-black/40 overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-white/10">
                      SKU: {p.sku}
                    </div>

                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => handleToggleAvailability(p.id)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
                          p.isAvailable
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-red-500/20 text-red-300 border-red-500/30'
                        }`}
                      >
                        {p.isAvailable ? 'Disponible' : 'Agotado'}
                      </button>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        {p.category}
                      </div>
                      <h3 className="font-bold text-white text-sm line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase font-semibold">Precio</div>
                        <div className="text-base font-extrabold text-amber-300">
                          ${p.price.toLocaleString('es-CO')} COP
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                          title="Editar producto"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PESTAÑA 2: DATOS, TEXTOS & BRANDING */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'branding' && (
          <div className="max-w-2xl bg-[#0E1524] rounded-3xl border border-white/10 p-6 md:p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-lg font-bold text-white">
                Personalización de Textos e Información de Contacto
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Actualiza el slogan de tu negocio y el número de WhatsApp donde recibes los pedidos del catálogo.
              </p>
            </div>

            <form onSubmit={handleSaveBranding} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Nombre Comercial Mostrado
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Slogan o Frase de Presentación
                </label>
                <input
                  type="text"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Número de WhatsApp para Pedidos Automáticos *
                </label>
                <input
                  type="text"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-emerald-400 font-bold focus:outline-none focus:border-emerald-400"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">
                  Los clientes que hagan clic en &quot;Pedir por WhatsApp&quot; en tu catálogo enviarán el pedido directamente a este número.
                </span>
              </div>

              {infoSaved && (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-center font-bold">
                  ✓ ¡Información de catálogo actualizada con éxito!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 to-emerald-400 hover:shadow-lg transition-all"
              >
                Guardar Cambios de Branding
              </button>
            </form>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* PESTAÑA 3: MÓDULO AGENTE DE SOPORTE IA (LICENCIA Y ACTIVACIÓN) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'ai-module' && (
          <div className="max-w-3xl space-y-6 animate-fadeIn">
            
            {/* Estado Actual del Agente IA */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#0E1524] border border-emerald-500/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Agente de Soporte IA 24/7</span>
                      {hasAiActive ? (
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                          Licencia Activa
                        </span>
                      ) : (
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                          Modo Prueba Gratuita
                        </span>
                      )}
                    </h2>
                    <p className="text-xs text-gray-400">
                      Entrenado en tiempo real con los {products.length} productos de tu catálogo.
                    </p>
                  </div>
                </div>
              </div>

              {hasAiActive ? (
                <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Licencia Vigente:</span>
                    <span className="font-mono text-emerald-300 font-bold">
                      GEVO-LAUR-AI24-8F92A1
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Estado del Asistente:</span>
                    <span className="text-emerald-400 font-semibold">
                      ● Respondiendo dudas de stock, precios y horarios 24/7
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs">
                  <div className="text-amber-300 font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Estás en el periodo de demostración gratuita</span>
                  </div>
                  <p className="text-gray-300">
                    Para activar permanentemente el bot en tu tienda y que atienda a tus clientes sin restricciones de horario, contacta al administrador de G-evo para obtener tu código de licenciamiento.
                  </p>
                </div>
              )}
            </div>

            {/* Canje / Validación de Código de Activación */}
            <div className="p-6 md:p-8 rounded-3xl bg-[#0E1524] border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Key className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Activar o Renovar Licencia con Código
                </h3>
              </div>

              <p className="text-xs text-gray-300">
                Ingresa a continuación el código de licenciamiento entregado por tu asesor G-evo tras efectuar el pago del módulo adicional:
              </p>

              <form onSubmit={handleRedeemLicense} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={licenseKeyInput}
                  onChange={(e) => setLicenseKeyInput(e.target.value)}
                  placeholder="Ej. GEVO-LAUR-AI24-8F92A1"
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-emerald-300 font-mono tracking-wider placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                />

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 to-emerald-400 hover:shadow-lg transition-all"
                >
                  Validar y Activar
                </button>
              </form>

              {licenseSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold text-center">
                  ✓ ¡Código validado! Tu Agente de Soporte IA 24/7 ha sido habilitado permanentemente.
                </div>
              )}

              {licenseError && (
                <div className="p-3 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-medium text-center">
                  {licenseError}
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* Modal: Crear o Editar Producto */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div
            className="absolute inset-0"
            onClick={() => setIsProductModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-[#0E1524] rounded-3xl border border-emerald-500/40 p-6 md:p-8 z-10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">
                {editingProduct ? 'Editar Producto / Referencia' : 'Nuevo Producto / Referencia'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Nombre del Producto o Servicio *
                </label>
                <input
                  type="text"
                  required
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="Ej. Diagnóstico Estratégico 360°"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Precio (COP) *
                  </label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Código SKU / Referencia
                  </label>
                  <input
                    type="text"
                    value={prodSku}
                    onChange={(e) => setProdSku(e.target.value)}
                    placeholder="LR-01"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Categoría
                  </label>
                  <input
                    type="text"
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    placeholder="Ej. Consultoría"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Stock / Cupos Disponibles
                  </label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  URL de la Fotografía o Imagen
                </label>
                <input
                  type="text"
                  value={prodImageUrl}
                  onChange={(e) => setProdImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Descripción Comercial (Leída por el Asistente IA)
                </label>
                <textarea
                  rows={3}
                  value={prodDescription}
                  onChange={(e) => setProdDescription(e.target.value)}
                  placeholder="Detalla qué incluye el producto, materiales, tiempos de entrega o condiciones..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 to-emerald-400 shadow-lg hover:shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  {editingProduct ? 'Guardar Cambios' : 'Publicar en mi Catálogo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
