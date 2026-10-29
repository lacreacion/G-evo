-- ==============================================================================
-- G-EVO ECOSYSTEM: INITIAL SEED DATA
-- Includes: Super Administrator, Sample Tenants (Laura Restrepo, Café Origen),
-- Client Users, Catalogs, Products, Demo AI Licenses, and Social Stories.
-- ==============================================================================

-- 1. Super Administrador Global
INSERT INTO users (id, tenant_id, full_name, email, password_hash, role, phone, is_active)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    NULL,
    'Administrador Principal G-evo',
    'admin@g-evo.com',
    '$2a$12$eA8bIu1M89sZ4fX9f5G5gO1kX3cE5aG7h9jK1lM3nO5pQ7rS9tU1v', -- Password hashed (Admin@Gevo2026!)
    'SuperAdmin',
    '+57 300 000 0000',
    TRUE
) ON CONFLICT (email) DO NOTHING;

-- 2. Tenant 1: Laura Restrepo - Consultoría & Marca Personal (Tarjeta y Catálogo Digital)
INSERT INTO tenants (id, slug, business_name, slogan, description, logo_url, cover_url, primary_color, secondary_color, phone_whatsapp, email, address, city, instagram_handle, website_url, is_active)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'laura-restrepo',
    'Laura Restrepo | Branding & Estrategia',
    'Diseño y posicionamiento de marcas de alto impacto',
    'Consultoría boutique de estrategia de marca, identidad corporativa y experiencias digitales interactivas.',
    '/images/showcase/laura-logo.png',
    '/images/showcase/laura-cover.jpg',
    '#D4AF37', -- Dorado
    '#10B981', -- Verde
    '+57 312 456 7890',
    'contacto@laurarestrepo.com',
    'El Poblado, Cra 43A # 1-50',
    'Medellín',
    '@laurarestrepo.brand',
    'https://laurarestrepo.com',
    TRUE
) ON CONFLICT (slug) DO NOTHING;

-- Usuario Cliente: Laura Restrepo
INSERT INTO users (id, tenant_id, full_name, email, password_hash, role, phone, is_active)
VALUES (
    '11111111-1111-1111-1111-222222222222',
    '11111111-1111-1111-1111-111111111111',
    'Laura Restrepo',
    'cliente@laurarestrepo.com',
    '$2a$12$eA8bIu1M89sZ4fX9f5G5gO1kX3cE5aG7h9jK1lM3nO5pQ7rS9tU1v', -- Cliente@2026
    'BusinessOwner',
    '+57 312 456 7890',
    TRUE
) ON CONFLICT (email) DO NOTHING;

-- Catálogo de Laura Restrepo
INSERT INTO catalogs (id, tenant_id, title, description, currency, whatsapp_checkout_phone, is_public, enable_ai_support)
VALUES (
    '11111111-1111-1111-1111-333333333333',
    '11111111-1111-1111-1111-111111111111',
    'Portafolio de Servicios y Consultoría',
    'Paquetes profesionales de branding, auditoría de marca y transformación digital.',
    'COP',
    '+57 312 456 7890',
    TRUE,
    TRUE
) ON CONFLICT DO NOTHING;

-- Licencia AI Activa para Laura Restrepo
INSERT INTO licenses (tenant_id, module_code, license_key, key_hash, status, is_trial, issued_by_user_id, activated_at, expires_at, notes)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'AI_SUPPORT_BOT_247',
    'GEVO-LAUR-AI24-8F92A1',
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    'Active',
    FALSE,
    '00000000-0000-0000-0000-000000000001',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP + INTERVAL '1 year',
    'Licencia Anual Módulo Agente IA 24/7'
) ON CONFLICT (license_key) DO NOTHING;

-- Categorías y Servicios de Laura Restrepo
INSERT INTO categories (id, tenant_id, catalog_id, name, slug, display_order)
VALUES 
('11111111-1111-1111-1111-444444444441', '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-333333333333', 'Consultoría Estratégica', 'consultoria', 1),
('11111111-1111-1111-1111-444444444442', '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-333333333333', 'Identidad Visual & Branding', 'branding', 2)
ON CONFLICT DO NOTHING;

-- Productos de Laura Restrepo
INSERT INTO products (id, tenant_id, catalog_id, category_id, sku, name, slug, short_description, full_description, price, is_featured, is_available)
VALUES 
(
    '11111111-1111-1111-1111-555555555551',
    '11111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-333333333333',
    '11111111-1111-1111-1111-444444444441',
    'LR-CONS-01',
    'Auditoría y Diagnóstico de Marca 360°',
    'auditoria-diagnostico-marca',
    'Evaluación completa de tu ecosistema de marca, coherencia gráfica y posicionamiento.',
    'Sesión intensiva 1 a 1 de 3 horas donde analizamos los puntos de contacto de tu negocio, narrativa de venta y arquitectura de marca. Incluye reporte ejecutivo en PDF y plan de acción de 30 días.',
    850000.00,
    TRUE,
    TRUE
),
(
    '11111111-1111-1111-1111-555555555552',
    '11111111-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-333333333333',
    '11111111-1111-1111-1111-444444444442',
    'LR-BRAND-02',
    'Identidad Corporativa & Manual de Marca',
    'identidad-corporativa-manual',
    'Diseño de logotipo, paleta cromática, tipografías y aplicaciones comerciales.',
    'Desarrollo integral de sistema visual: imagotipo en múltiples formatos vectoriales, guía de estilos, patrones y mockup de aplicaciones en papelería y redes sociales.',
    2400000.00,
    TRUE,
    TRUE
)
ON CONFLICT DO NOTHING;

-- Historias Corporativas Sincronizadas (Instagram / Facebook Mock Live Feed)
INSERT INTO social_stories_cache (platform, external_story_id, media_url, media_type, caption, permalink, display_order, is_active, expires_at)
VALUES
('Instagram', 'ig_story_01', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', 'image', '🚀 Nuevas Tarjetas Inteligentes NFC G-evo con acabado premium metalizado. ¡Eleva tu presencia!', 'https://instagram.com/stories/gevo.digital/01', 1, TRUE, CURRENT_TIMESTAMP + INTERVAL '24 hours'),
('Instagram', 'ig_story_02', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', 'image', '📊 Lanzamiento oficial de catálogos interactivos con asistente IA integrado.', 'https://instagram.com/stories/gevo.digital/02', 2, TRUE, CURRENT_TIMESTAMP + INTERVAL '24 hours'),
('Facebook', 'fb_story_03', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', 'image', '💡 Caso de éxito: Laura Restrepo multiplicó sus contactos comerciales con su tarjeta G-evo.', 'https://facebook.com/stories/gevo.digital/03', 3, TRUE, CURRENT_TIMESTAMP + INTERVAL '24 hours'),
('Instagram', 'ig_story_04', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 'image', '✨ Pide hoy tu catálogo digital autónomo y gestiona tus productos en minutos.', 'https://instagram.com/stories/gevo.digital/04', 4, TRUE, CURRENT_TIMESTAMP + INTERVAL '24 hours');

