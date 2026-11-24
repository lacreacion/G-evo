'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { INITIAL_TENANTS, TenantData, GevoServiceGroup } from '@/lib/mockData';
import { TermsAcceptanceBox, GevoLegalServiceType } from '@/components/legal/TermsAcceptanceBox';
import { 
  ShieldCheck, 
  PlusCircle, 
  Key, 
  Users, 
  Bot, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Search, 
  Sparkles, 
  LogOut, 
  CreditCard,
  Edit3
} from 'lucide-react';

export default function AdminMasterPage() {
  const [tenants, setTenants] = useState<TenantData[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('gevo_tenants_registry_v1');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // Fallback to initial tenants
      }
    }
    return INITIAL_TENANTS;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeGroupTab, setActiveGroupTab] = useState<'todos' | GevoServiceGroup>('todos');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState<{
    businessName: string;
    clientName: string;
    email: string;
    temporaryPassword: string;
    ownerPin: string;
    slug: string;
  } | null>(null);

  // Form states for creating a new store/card
  const [newBusinessName, setNewBusinessName] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [newClientRole, setNewClientRole] = useState('Director General & Fundador');
  const [newClientLocation, setNewClientLocation] = useState('Medellín / Colombia');
  const [newClientBio, setNewClientBio] = useState('Conecta conmigo, descarga mi contacto directo o agenda una reunión desde mi tarjeta digital inteligente.');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newPhoneWhatsapp, setNewPhoneWhatsapp] = useState('');
  const newCategory = 'Consultoría';
  const [newCardTheme, setNewCardTheme] = useState('gold_metallic');
  const [newOwnerPin, setNewOwnerPin] = useState('1234');
  const [newSlug, setNewSlug] = useState('');
  const [adminServiceType, setAdminServiceType] = useState<GevoLegalServiceType>('tarjeta');
  const [adminTermsAccepted, setAdminTermsAccepted] = useState(false);

  // Licensing Generator states
  const [selectedTenantForLicense, setSelectedTenantForLicense] = useState<string>('');
  const [generatedLicenseKey, setGeneratedLicenseKey] = useState<string | null>(null);
  const [licenseTermsAccepted, setLicenseTermsAccepted] = useState(false);
  const [licenseCopied, setLicenseCopied] = useState(false);
  const [kitCopied, setKitCopied] = useState(false);

  const saveTenantsList = (updated: TenantData[]) => {
    setTenants(updated);
    try {
      localStorage.setItem('gevo_tenants_registry_v1', JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const handleCreateStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBusinessName || !newClientEmail) return;

    const generatedSlug = (newSlug || newBusinessName)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const tempPassword = `Gevo${Math.floor(1000 + Math.random() * 9000)}!`;
    const pinToSave = newOwnerPin.trim() || '1234';

    // Split client name into firstName and lastName for the digital card (.vcf & UI)
    const nameParts = newClientName.trim().split(/\s+/);
    const firstName = nameParts[0] || 'Cliente';
    const lastName = nameParts.slice(1).join(' ') || 'G-evo';

    // Save the digital card profile in localStorage so /t/[slug] loads it immediately
    const cardProfileData = {
      id: generatedSlug,
      firstName,
      lastName,
      fullName: newClientName.trim(),
      title: newClientRole.trim() || 'Director Comercial',
      organization: newBusinessName.trim(),
      location: newClientLocation.trim() || 'Colombia',
      bio: newClientBio.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=320&q=80',
      coverBg: '',
      phone: newPhoneWhatsapp.trim() || '+573000000000',
      email: newClientEmail.trim(),
      theme: newCardTheme,
      ownerPin: pinToSave,
      service_type: adminServiceType,
      terms_accepted: true,
      privacy_accepted: true,
      cookies_accepted: true,
      terms_accepted_at: new Date().toISOString(),
      terms_version: '2.0',
      note: `Contacto guardado desde Tarjeta Digital G-evo (${newBusinessName.trim()}).`
    };

    try {
      localStorage.setItem(`gevo_card_profile_${generatedSlug}`, JSON.stringify(cardProfileData));
    } catch {
      // Ignore storage errors
    }

    const resolvedGroup: GevoServiceGroup =
      adminServiceType === 'catalogo'
        ? 'catalogos'
        : adminServiceType === 'web' || adminServiceType === 'ecommerce'
        ? 'ecommerce-web'
        : 'tarjetas';

    const newTenant: TenantData = {
      id: `t-${Date.now()}`,
      slug: generatedSlug,
      businessName: newBusinessName,
      clientName: newClientName,
      clientEmail: newClientEmail,
      phoneWhatsapp: newPhoneWhatsapp || '+57 300 000 0000',
      category: newCategory,
      serviceGroup: resolvedGroup,
      maxImagesAllowed: resolvedGroup === 'tarjetas' ? 3 : resolvedGroup === 'catalogos' ? 20 : undefined,
      publicRoute: resolvedGroup === 'catalogos' ? `/catalogo/${generatedSlug}` : `/t/${generatedSlug}`,
      exportFolderPath: resolvedGroup === 'ecommerce-web' ? `/exports/${generatedSlug}/` : undefined,
      productsCount: 0,
      hasAiSupport: false,
      status: 'Activo',
      createdAt: new Date().toISOString().split('T')[0]
    };

    saveTenantsList([newTenant, ...tenants]);
    setShowCreateModal(false);

    // Open Credentials & Card Delivery Kit Modal
    setShowCredentialsModal({
      businessName: newBusinessName,
      clientName: newClientName,
      email: newClientEmail,
      temporaryPassword: tempPassword,
      ownerPin: pinToSave,
      slug: generatedSlug
    });

    // Reset Form
    setNewBusinessName('');
    setNewClientName('');
    setNewClientEmail('');
    setNewPhoneWhatsapp('');
    setNewSlug('');
  };

  const handleGenerateLicense = () => {
    if (!selectedTenantForLicense) return;

    const tenant = tenants.find((t) => t.id === selectedTenantForLicense);
    if (!tenant) return;

    const prefix = tenant.slug.substring(0, 4).toUpperCase();
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    const newKey = `GEVO-${prefix}-AI24-${randomHex}`;

    setGeneratedLicenseKey(newKey);

    // Mark tenant as having AI support
    saveTenantsList(
      tenants.map((t) =>
        t.id === selectedTenantForLicense
          ? { ...t, hasAiSupport: true, aiLicenseKey: newKey }
          : t
      )
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setLicenseCopied(true);
    setTimeout(() => setLicenseCopied(false), 2500);
  };

  const resolveTenantGroup = (t: TenantData): GevoServiceGroup => {
    if (t.serviceGroup) return t.serviceGroup;
    if (t.slug === 'aurea-velas' || t.slug === 'cafe-origen' || t.category.toLowerCase().includes('catálogo')) {
      return 'catalogos';
    }
    if (t.slug === 'urban-trend' || t.category.toLowerCase().includes('e-commerce') || t.category.toLowerCase().includes('web')) {
      return 'ecommerce-web';
    }
    return 'tarjetas';
  };

  const filteredTenants = tenants.filter((t) => {
    const matchesSearch =
      t.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (activeGroupTab === 'todos') return true;
    return resolveTenantGroup(t) === activeGroupTab;
  });

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  return (
    <div className="min-h-screen bg-[#070B14] text-white">
      
      {/* Top Bar Navigation */}
      <header className="border-b border-white/10 bg-[#0A0F1D]/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <div className="h-5 w-px bg-white/10 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Panel Maestro del Administrador Principal</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/t/elena-vance?owner=1"
            target="_blank"
            className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Ver Tarjeta Base (Demo)</span>
          </Link>
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Ver Sitio Web
          </Link>
          <Link
            href="/login"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-8">
        
        {/* Welcome & Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Gestión Centralizada de Tarjetas &amp; Ecosistemas
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Crea tarjetas digitales interactivas (URL/QR) y tiendas para tus clientes, y envíales su enlace y PIN de edición con un clic.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 to-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-black" />
            <span>Crear Nueva Tarjeta Digital / Tienda</span>
          </button>
        </div>

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0E1524] border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Tarjetas &amp; Tiendas</span>
              <CreditCard className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">{tenants.length}</div>
            <div className="text-[10px] text-emerald-400 font-semibold">100% Operativas con QR &amp; URL</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E1524] border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Módulos IA Activos</span>
              <Bot className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white">
              {tenants.filter((t) => t.hasAiSupport).length}
            </div>
            <div className="text-[10px] text-amber-400 font-semibold">Licencias Monetizadas</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E1524] border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Usuarios Clientes</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-white">{tenants.length}</div>
            <div className="text-[10px] text-gray-400 font-medium">Autonomía con PIN de Dueño</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E1524] border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Seguridad Multi-Tenant</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">Activa</div>
            <div className="text-[10px] text-gray-400 font-medium">Aislamiento por Ruta /t/[slug]</div>
          </div>
        </div>

        {/* Motor de Licenciamiento IA (Para monetizar el Agente de Soporte) */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0E1524] to-[#121B2F] border border-amber-500/30 space-y-4">
          <div className="flex items-center gap-2.5 text-amber-400">
            <Key className="w-5 h-5" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Generador Criptográfico de Licencias para Agente IA 24/7
            </h2>
          </div>
          <p className="text-xs text-gray-300 max-w-3xl">
            Cuando un cliente efectúa el pago del módulo adicional de Inteligencia Artificial para su tienda, selecciona su negocio a continuación y genera su código de activación único para entregárselo.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <select
              value={selectedTenantForLicense}
              onChange={(e) => {
                setSelectedTenantForLicense(e.target.value);
                setGeneratedLicenseKey(null);
              }}
              className="w-full sm:w-80 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="">-- Selecciona el Cliente que Pagó --</option>
              {tenants.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.businessName} ({t.slug}) {t.hasAiSupport ? '✓ Ya tiene IA' : '★ Sin Licencia'}
                </option>
              ))}
            </select>

            <button
              onClick={handleGenerateLicense}
              disabled={!selectedTenantForLicense || !licenseTermsAccepted}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 to-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Emitir Código de Licencia</span>
            </button>
          </div>

          <div className="pt-2">
            <TermsAcceptanceBox
              serviceType="ia"
              id="admin-ai-license-terms-checkbox"
              checked={licenseTermsAccepted}
              onChange={setLicenseTermsAccepted}
            />
          </div>

          {/* Resultado de la Licencia Generada */}
          {generatedLicenseKey && (
            <div className="mt-4 p-4 rounded-2xl bg-black/60 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Código de Licenciamiento Generado Exitosamente
                </div>
                <div className="font-mono text-base font-black text-white tracking-widest">
                  {generatedLicenseKey}
                </div>
                <div className="text-[11px] text-gray-400">
                  Copia y envía este código a tu cliente para que lo ingrese en su panel y desbloquee el Agente IA 24/7.
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(generatedLicenseKey)}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {licenseCopied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Código</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Tabla de Tiendas y Tarjetas Creadas Separadas en 3 Archivos */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="space-y-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Registros Separados por Línea de Servicio</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-semibold">
                  {filteredTenants.length}
                </span>
              </h2>

              {/* Pestañas de los 3 Archivos Separados */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'todos', label: '📂 Todos', badge: '' },
                  { id: 'tarjetas', label: '1. Tarjetas Digitales', badge: 'tarjetas.ts • Máx 3 fotos' },
                  { id: 'catalogos', label: '2. Catálogos Digitales', badge: 'catalogos.ts • Máx 20 fotos' },
                  { id: 'ecommerce-web', label: '3. E-Commerce & Páginas Web', badge: 'ecommerce-paginas-web.ts • /exports/' },
                ].map((tab) => {
                  const active = activeGroupTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveGroupTab(tab.id as typeof activeGroupTab)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        active
                          ? 'bg-gradient-to-r from-amber-400/25 to-emerald-400/25 text-amber-300 border border-amber-400/50'
                          : 'bg-[#0E1524] text-gray-400 border border-white/10 hover:text-white'
                      }`}
                    >
                      <span>{tab.label}</span>
                      {tab.badge && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/50 text-emerald-300 font-mono">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre o slug..."
                className="w-full bg-[#0E1524] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0A0F1D]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#0E1524] text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="py-3.5 px-4">Negocio / Tarjeta</th>
                    <th className="py-3.5 px-4">Enlace Tarjeta URL/QR</th>
                    <th className="py-3.5 px-4">Cliente Responsable</th>
                    <th className="py-3.5 px-4">Agente IA</th>
                    <th className="py-3.5 px-4 text-right">Acciones de Tarjeta &amp; Entrega</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredTenants.map((t) => (
                    <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{t.businessName}</div>
                        <div className="text-[11px] text-gray-400">{t.category}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <Link
                          href={`/t/${t.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 font-mono text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/20 transition-colors"
                        >
                          <span>/t/{t.slug}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-white font-medium">{t.clientName}</div>
                        <div className="text-[11px] text-gray-400">{t.clientEmail}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        {t.hasAiSupport ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <Bot className="w-3 h-3" />
                            Activo 24/7
                          </span>
                        ) : (
                          <span className="text-[11px] text-gray-500">Demostración</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center justify-end gap-2 flex-wrap">
                          {t.slug === 'aurea-velas' && (
                            <Link
                              href="/catalogo/aurea-velas"
                              target="_blank"
                              className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 font-extrabold text-[11px] inline-flex items-center gap-1 transition-colors"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Abrir Catálogo Navideño</span>
                            </Link>
                          )}
                          <Link
                            href={`/t/${t.slug}`}
                            target="_blank"
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px] inline-flex items-center gap-1 transition-colors"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Ver Tarjeta</span>
                          </Link>
                          <Link
                            href={`/t/${t.slug}?owner=1`}
                            target="_blank"
                            className="px-2.5 py-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 border border-indigo-500/30 font-semibold text-[11px] inline-flex items-center gap-1 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Editar Tarjeta</span>
                          </Link>
                          <button
                            onClick={() => {
                              setShowCredentialsModal({
                                businessName: t.businessName,
                                clientName: t.clientName,
                                email: t.clientEmail,
                                temporaryPassword: 'Cliente@2026',
                                ownerPin: '1234',
                                slug: t.slug
                              });
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 font-semibold text-[11px] transition-colors cursor-pointer"
                          >
                            Enviar Kit al Cliente
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>

      {/* Modal: Crear Nueva Tarjeta Digital / Tienda */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="absolute inset-0"
            onClick={() => setShowCreateModal(false)}
          />

          <div className="relative w-full max-w-xl bg-[#0E1524] rounded-3xl border border-amber-500/40 p-6 md:p-7 z-10 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base md:text-lg font-bold text-white">
                  Crear Nueva Tarjeta Digital Interactiva (URL/QR)
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStore} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Nombre del Cliente (En la Tarjeta) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => {
                      setNewClientName(e.target.value);
                      if (!newSlug) {
                        setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
                      }
                    }}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Empresa / Negocio *
                  </label>
                  <input
                    type="text"
                    required
                    value={newBusinessName}
                    onChange={(e) => setNewBusinessName(e.target.value)}
                    placeholder="Ej. Kinetix Digital Studio"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Cargo / Profesión en la Tarjeta *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClientRole}
                    onChange={(e) => setNewClientRole(e.target.value)}
                    placeholder="Ej. Director Comercial & CEO"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Ciudad / Ubicación
                  </label>
                  <input
                    type="text"
                    value={newClientLocation}
                    onChange={(e) => setNewClientLocation(e.target.value)}
                    placeholder="Ej. Medellín / Remoto"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Enlace Único (/t/slug) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    placeholder="carlos-mendoza"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-emerald-400 font-mono placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Acabado / Tema Inicial de la Tarjeta
                  </label>
                  <select
                    value={newCardTheme}
                    onChange={(e) => setNewCardTheme(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="gold_metallic">✨ Oro 24K Metalizado (Luxury)</option>
                    <option value="emerald">Esmeralda G-evo</option>
                    <option value="silver_chrome">✨ Plata Cromo Metalizado</option>
                    <option value="rose_gold">✨ Oro Rosa Metalizado</option>
                    <option value="titanium_cyan">✨ Titanio Azul Metalizado</option>
                    <option value="cobalt">Azul Cobalto</option>
                    <option value="violet">Violeta Real</option>
                    <option value="crimson">Carmesí</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    WhatsApp del Cliente *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newPhoneWhatsapp}
                    onChange={(e) => setNewPhoneWhatsapp(e.target.value)}
                    placeholder="+573001234567"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Correo del Cliente *
                  </label>
                  <input
                    type="email"
                    required
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    placeholder="cliente@empresa.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-amber-300 font-semibold mb-1">
                    PIN de Edición Dueño *
                  </label>
                  <input
                    type="text"
                    required
                    value={newOwnerPin}
                    onChange={(e) => setNewOwnerPin(e.target.value)}
                    placeholder="1234"
                    className="w-full bg-black/40 border border-amber-500/30 rounded-xl px-3.5 py-2 text-amber-300 font-mono placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Biografía breve inicial (el cliente podrá editarla después)
                </label>
                <textarea
                  rows={2}
                  value={newClientBio}
                  onChange={(e) => setNewClientBio(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <TermsAcceptanceBox
                serviceType={adminServiceType}
                id="admin-terms-checkbox"
                checked={adminTermsAccepted}
                onChange={setAdminTermsAccepted}
                showServiceSelector={true}
                onServiceTypeChange={(nextType) => {
                  setAdminServiceType(nextType);
                  setAdminTermsAccepted(false);
                }}
              />

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!adminTermsAccepted}
                  className="w-full py-3 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 to-emerald-400 shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <PlusCircle className="w-4 h-4 text-black" />
                  <span>Guardar / Actualizar Tarjeta y Generar Kit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Kit de Entrega para el Cliente */}
      {showCredentialsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div
            className="absolute inset-0"
            onClick={() => setShowCredentialsModal(null)}
          />

          <div className="relative w-full max-w-md bg-[#0E1524] rounded-3xl border border-emerald-500/40 p-6 md:p-7 z-10 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                ¡Kit de Tarjeta Digital Listo!
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Envía estos datos a <strong className="text-white">{showCredentialsModal.clientName}</strong> para que abra su tarjeta, la comparta por QR/URL y la edite cuando quiera.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-left text-xs space-y-3">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                  1. Enlace Público de su Tarjeta (Para URL, QR y Redes)
                </span>
                <a
                  href={`${originUrl}/t/${showCredentialsModal.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-emerald-400 hover:underline break-all flex items-center gap-1 mt-0.5"
                >
                  <span>{originUrl}/t/{showCredentialsModal.slug}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                  2. Enlace Directo Modo Dueño (Para que el cliente la edite)
                </span>
                <a
                  href={`${originUrl}/t/${showCredentialsModal.slug}?owner=1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-indigo-300 hover:underline break-all flex items-center gap-1 mt-0.5"
                >
                  <span>{originUrl}/t/${showCredentialsModal.slug}?owner=1</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                    PIN de Edición en Tarjeta
                  </span>
                  <span className="font-mono text-amber-300 font-bold text-sm">
                    {showCredentialsModal.ownerPin}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                    Clave Portal (/login)
                  </span>
                  <span className="font-mono text-amber-300 font-bold">
                    {showCredentialsModal.temporaryPassword}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  const text = `¡Hola ${showCredentialsModal.clientName}! 🚀 Tu Tarjeta Digital Interactiva (URL & QR) de G-evo. ya está activa.\n\n🔗 1. Tu Enlace Público (para compartir por URL, QR y redes):\n${originUrl}/t/${showCredentialsModal.slug}\n\n✏️ 2. Tu Enlace para Editar tu Tarjeta (cambiar fotos, colores metalizados, teléfono, redes y ver estadísticas):\n${originUrl}/t/${showCredentialsModal.slug}?owner=1\n🔑 PIN de Propietario: ${showCredentialsModal.ownerPin}\n\n💻 3. Acceso a tu Portal Clientes (${originUrl}/login):\nUsuario: ${showCredentialsModal.email}\nContraseña: ${showCredentialsModal.temporaryPassword}`;
                  navigator.clipboard.writeText(text);
                  setKitCopied(true);
                  setTimeout(() => setKitCopied(false), 2500);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="w-4 h-4 text-black" />
                <span>{kitCopied ? '¡Mensaje Copiado al Portapapeles!' : 'Copiar Mensaje Completo para WhatsApp del Cliente'}</span>
              </button>

              <Link
                href={`/t/${showCredentialsModal.slug}?owner=1`}
                target="_blank"
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                <span>Abrir y Probar la Tarjeta Ahora</span>
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
