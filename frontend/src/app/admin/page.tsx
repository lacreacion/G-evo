'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/common/Logo';
import { INITIAL_TENANTS, TenantData } from '@/lib/mockData';
import { 
  ShieldCheck, 
  PlusCircle, 
  Key, 
  Store, 
  Users, 
  Bot, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Search, 
  Sparkles, 
  LogOut, 
  Lock,
  Layers,
  ArrowRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';

export default function AdminMasterPage() {
  const [tenants, setTenants] = useState<TenantData[]>(INITIAL_TENANTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState<{
    businessName: string;
    email: string;
    temporaryPassword: string;
    slug: string;
  } | null>(null);

  // Form states for creating a new store/card
  const [newBusinessName, setNewBusinessName] = useState('');
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newPhoneWhatsapp, setNewPhoneWhatsapp] = useState('');
  const [newCategory, setNewCategory] = useState('Consultoría');
  const [newSlug, setNewSlug] = useState('');

  // Licensing Generator states
  const [selectedTenantForLicense, setSelectedTenantForLicense] = useState<string>('');
  const [generatedLicenseKey, setGeneratedLicenseKey] = useState<string | null>(null);
  const [licenseCopied, setLicenseCopied] = useState(false);

  const handleCreateStore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBusinessName || !newClientEmail) return;

    const generatedSlug = newSlug || newBusinessName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const tempPassword = `Gevo${Math.floor(1000 + Math.random() * 9000)}!`;

    const newTenant: TenantData = {
      id: `t-${Date.now()}`,
      slug: generatedSlug,
      businessName: newBusinessName,
      clientName: newClientName,
      clientEmail: newClientEmail,
      phoneWhatsapp: newPhoneWhatsapp || '+57 300 000 0000',
      category: newCategory,
      productsCount: 0,
      hasAiSupport: false,
      status: 'Activo',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTenants([newTenant, ...tenants]);
    setShowCreateModal(false);

    // Open Credentials Delivery Modal
    setShowCredentialsModal({
      businessName: newBusinessName,
      email: newClientEmail,
      temporaryPassword: tempPassword,
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
    setTenants(
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

  const filteredTenants = tenants.filter(
    (t) =>
      t.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Gestión Centralizada de Ecosistemas
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Solo tú puedes crear y activar nuevas tiendas y tarjetas digitales para tus clientes de negocio.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 to-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-black" />
            <span>Crear Nueva Tienda / Tarjeta</span>
          </button>
        </div>

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0E1524] border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Tiendas Creadas</span>
              <Store className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">{tenants.length}</div>
            <div className="text-[10px] text-emerald-400 font-semibold">100% Operativas</div>
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
            <div className="text-[10px] text-gray-400 font-medium">Gestión Autónoma</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0E1524] border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Seguridad Multi-Tenant</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">Activa</div>
            <div className="text-[10px] text-gray-400 font-medium">Aislamiento por TenantId</div>
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
              disabled={!selectedTenantForLicense}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 to-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Emitir Código de Licencia</span>
            </button>
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
                className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
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

        {/* Tabla de Tiendas y Tarjetas Creadas */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>Listado de Tiendas / Tarjetas Activas</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-semibold">
                {tenants.length}
              </span>
            </h2>

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
                    <th className="py-3.5 px-4">Slug / Enlace</th>
                    <th className="py-3.5 px-4">Cliente Responsable</th>
                    <th className="py-3.5 px-4">Agente IA</th>
                    <th className="py-3.5 px-4">Estado</th>
                    <th className="py-3.5 px-4 text-right">Acciones</th>
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
                        <span className="font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          /{t.slug}
                        </span>
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
                      <td className="py-3.5 px-4">
                        <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-300">
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setShowCredentialsModal({
                              businessName: t.businessName,
                              email: t.clientEmail,
                              temporaryPassword: 'Cliente@2026',
                              slug: t.slug
                            });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 font-medium text-[11px] transition-colors"
                        >
                          Ver Credenciales
                        </button>
                        <Link
                          href="/portal"
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-medium text-[11px] transition-colors"
                        >
                          Entrar a Portal
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>

      {/* Modal: Crear Nueva Tienda / Tarjeta */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="absolute inset-0"
            onClick={() => setShowCreateModal(false)}
          />

          <div className="relative w-full max-w-lg bg-[#0E1524] rounded-3xl border border-amber-500/40 p-6 md:p-8 z-10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">
                  Crear Nueva Tienda / Tarjeta Digital
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStore} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Nombre Comercial del Negocio *
                </label>
                <input
                  type="text"
                  required
                  value={newBusinessName}
                  onChange={(e) => {
                    setNewBusinessName(e.target.value);
                    if (!newSlug) {
                      setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                    }
                  }}
                  placeholder="Ej. Joyería Amatista"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Slug / Subdirectorio Único *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    placeholder="joyeria-amatista"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-emerald-400 font-mono placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Categoría de Negocio
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Consultoría">Consultoría</option>
                    <option value="Gastronomía & Café">Gastronomía &amp; Café</option>
                    <option value="Moda y Calzado">Moda y Calzado</option>
                    <option value="Salud y Belleza">Salud y Belleza</option>
                    <option value="Servicios Profesionales">Servicios Profesionales</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Nombre del Cliente / Dueño *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="Ej. Andrés Gómez"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    WhatsApp para Pedidos
                  </label>
                  <input
                    type="tel"
                    value={newPhoneWhatsapp}
                    onChange={(e) => setNewPhoneWhatsapp(e.target.value)}
                    placeholder="+57 300 123 4567"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Correo Electrónico del Cliente (Login de Acceso) *
                </label>
                <input
                  type="email"
                  required
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                  placeholder="cliente@joyeriaamatista.com"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-amber-400 to-emerald-400 shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-black" />
                  <span>Crear Tienda y Generar Credenciales</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Entregar Credenciales al Cliente */}
      {showCredentialsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div
            className="absolute inset-0"
            onClick={() => setShowCredentialsModal(null)}
          />

          <div className="relative w-full max-w-md bg-[#0E1524] rounded-3xl border border-emerald-500/40 p-6 md:p-8 z-10 shadow-2xl space-y-5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                ¡Tienda Creada Exitosamente!
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Entrega estas credenciales a tu cliente para que ingrese a su portal y gestione sus productos con total autonomía.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-left text-xs space-y-2.5">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                  Negocio
                </span>
                <span className="text-white font-bold">{showCredentialsModal.businessName}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                  Enlace de Catálogo
                </span>
                <span className="font-mono text-emerald-400">
                  https://g-evo.com/{showCredentialsModal.slug}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                  Usuario / Correo
                </span>
                <span className="font-mono text-amber-300">{showCredentialsModal.email}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                  Contraseña Temporal
                </span>
                <span className="font-mono text-amber-300 font-bold">
                  {showCredentialsModal.temporaryPassword}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                const text = `¡Hola! Tu tienda en G-evo ha sido creada.\n\nEnlace: https://g-evo.com/${showCredentialsModal.slug}\nPortal de Gestión: https://g-evo.com/login\nUsuario: ${showCredentialsModal.email}\nContraseña Temporal: ${showCredentialsModal.temporaryPassword}`;
                navigator.clipboard.writeText(text);
                setShowCredentialsModal(null);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4 text-black" />
              <span>Copiar Mensaje para WhatsApp del Cliente</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

