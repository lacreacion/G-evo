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

-- Auditoría Legal Inicial (tenant_legal_consents) para Laura Restrepo
INSERT INTO tenant_legal_consents (tenant_id, service_type, terms_accepted, privacy_accepted, cookies_accepted, terms_version, document_slug, ip_address, user_agent, accepted_at)
VALUES
('11111111-1111-1111-1111-111111111111', 'tarjeta', TRUE, TRUE, TRUE, '2.0', 'terminos-tarjeta-digital.pdf', '181.58.10.24', 'Mozilla/5.0 (Seed Initial Consent)', CURRENT_TIMESTAMP),
('11111111-1111-1111-1111-111111111111', 'catalogo', TRUE, TRUE, TRUE, '2.0', 'terminos-catalogo-digital.pdf', '181.58.10.24', 'Mozilla/5.0 (Seed Initial Consent)', CURRENT_TIMESTAMP),
('11111111-1111-1111-1111-111111111111', 'ia', TRUE, TRUE, TRUE, '2.0', 'terminos-agente-ia.pdf', '181.58.10.24', 'Mozilla/5.0 (Seed Initial Consent)', CURRENT_TIMESTAMP);

-- ==============================================================================
-- 3. Tenant 2: AUREA Velas Artesanales — Colección Navideña 2026 (Catálogo Digital)
-- ==============================================================================
INSERT INTO tenants (id, slug, business_name, slogan, description, logo_url, cover_url, primary_color, secondary_color, phone_whatsapp, email, address, city, instagram_handle, website_url, terms_accepted, terms_accepted_at, terms_version, is_active)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    'aurea-velas',
    'AUREA Velas Artesanales',
    'Colección Navideña 2026 • Luz, aroma y magia hecha a mano',
    'Catálogo Digital Interactivo de velas artesanales de soya 100% ecológicas, figuras navideñas escultóricas, velas de los deseos y combos regalo.',
    '/images/showcase/aurea-logo.png',
    '/images/showcase/aurea-cover.jpg',
    '#D4AF37', -- Dorado AUREA
    '#10B981', -- Esmeralda G-evo
    '+57 300 456 7890',
    'pedidos@aureavelas.com',
    'Taller Artesanal AUREA',
    'Medellín',
    '@aurea.velas.artesanales',
    'https://g-evo.com/catalogo/aurea-velas',
    TRUE,
    CURRENT_TIMESTAMP,
    '2.0',
    TRUE
) ON CONFLICT (slug) DO NOTHING;

-- Catálogo de AUREA Velas Artesanales
INSERT INTO catalogs (id, tenant_id, title, description, currency, whatsapp_checkout_phone, is_public, enable_ai_support)
VALUES (
    '22222222-2222-2222-2222-333333333333',
    '22222222-2222-2222-2222-222222222222',
    'AUREA Velas Artesanales — Colección Navideña 2026',
    'Selecciona color, aroma y medida en cm. Personaliza tus Velas de Deseos y arma tu Combo Navideño con pedido directo a WhatsApp.',
    'COP',
    '+57 300 456 7890',
    TRUE,
    TRUE
) ON CONFLICT DO NOTHING;

-- Categorías de AUREA Velas Artesanales
INSERT INTO categories (id, tenant_id, catalog_id, name, slug, display_order)
VALUES
('22222222-2222-2222-2222-444444444401', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', 'Figuras Navideñas', 'figuras-navidenas', 1),
('22222222-2222-2222-2222-444444444402', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', 'Velas de Deseos & Frascos', 'deseos-y-frascos', 2),
('22222222-2222-2222-2222-444444444403', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', 'Combos Navideños', 'combos-navidenos', 3)
ON CONFLICT DO NOTHING;

-- 12 Productos de AUREA (9 Individuales + 3 Combos) con medidas en cm, colores y aromas
INSERT INTO products (id, tenant_id, catalog_id, category_id, sku, name, slug, short_description, full_description, price, stock_quantity, is_featured, is_available, dimensions_cm, available_colors, available_aromas, is_combo, allow_dedication)
VALUES
('22222222-2222-2222-2222-555555555501', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', '22222222-2222-2222-2222-444444444401', 'AUR-NAV-01', 'Árbol de Navidad', 'arbol-de-navidad', 'Vela escultórica pino navideño con relieve nevado artesanal.', 'Elaborada en cera de soya 100% natural con pabilo de algodón ecológico y destellos dorados.', 13000.00, 30, TRUE, TRUE, '10 cm alto × 7 cm base', ARRAY['Verde Pino', 'Blanco Nieve', 'Dorado Champagne', 'Rojo Navidad'], ARRAY['Pino Navideño', 'Canela & Clavo', 'Vainilla Francesa'], FALSE, FALSE),
('22222222-2222-2222-2222-555555555502', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', '22222222-2222-2222-2222-444444444401', 'AUR-NAV-02', 'Reno 3D', 'reno-3d', 'Figura tridimensional de reno nórdico de alto detalle.', 'Vela decorativa 3D ideal para centros de mesa y obsequios corporativos de fin de año.', 16000.00, 25, TRUE, TRUE, '12 cm alto × 8 cm ancho', ARRAY['Dorado Champagne', 'Marfil Cálido', 'Blanco Nieve', 'Rojo Navidad'], ARRAY['Canela & Clavo', 'Vainilla Francesa', 'Manzana Especiada'], FALSE, FALSE),
('22222222-2222-2222-2222-555555555503', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', '22222222-2222-2222-2222-444444444402', 'AUR-NAV-03', 'Velas de Deseos x6', 'velas-de-deseos-x6', 'Caja regalo con 6 velas rituales de deseos y tarjeta dedicatoria De / Para.', 'Incluye 6 velas de intenciones (Amor, Prosperidad, Salud, Paz, Gratitud, Éxito) con etiqueta personalizada De / Para.', 25000.00, 40, TRUE, TRUE, '14 cm alto × 1.8 cm diámetro c/u (Caja x6)', ARRAY['Blanco & Dorado', 'Surtido Navideño', 'Marfil & Oro', 'Rojo & Verde'], ARRAY['Vainilla Francesa', 'Canela & Clavo', 'Frutos Rojos', 'Pino Navideño'], FALSE, TRUE),
('22222222-2222-2222-2222-555555555504', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', '22222222-2222-2222-2222-444444444401', 'AUR-NAV-04', 'Reno', 'reno-clasico', 'Vela silueta de reno navideño con acabado satinado.', 'Detalle encantador para iluminar cenas navideñas o complementar anchetas y regalos.', 10000.00, 35, FALSE, TRUE, '9 cm alto × 6 cm ancho', ARRAY['Marfil Cálido', 'Dorado Champagne', 'Blanco Nieve', 'Rojo Navidad'], ARRAY['Vainilla Francesa', 'Canela & Clavo', 'Manzana Especiada'], FALSE, FALSE),
('22222222-2222-2222-2222-555555555505', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', '22222222-2222-2222-2222-444444444401', 'AUR-NAV-05', 'Esfera', 'esfera-navidena', 'Esfera tallada con motivos invernales y destellos perlados.', 'Inspirada en las bolas clásicas del árbol navideño con textura en relieve.', 8000.00, 50, FALSE, TRUE, '6 cm diámetro', ARRAY['Rojo Navidad', 'Dorado Champagne', 'Blanco Nieve', 'Verde Pino'], ARRAY['Frutos Rojos', 'Canela & Clavo', 'Pino Navideño'], FALSE, FALSE),
('22222222-2222-2222-2222-555555555506', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', '22222222-2222-2222-2222-444444444401', 'AUR-NAV-06', 'Copo de Nieve', 'copo-de-nieve', 'Vela geométrica de copo invernal con acabado cristalino.', 'Perfecta para combinar en sets de regalo y mesas blancas o doradas.', 8000.00, 50, FALSE, TRUE, '7 cm diámetro × 3 cm grosor', ARRAY['Blanco Nieve', 'Dorado Champagne', 'Marfil Cálido'], ARRAY['Pino Navideño', 'Vainilla Francesa', 'Manzana Especiada'], FALSE, FALSE),
('22222222-2222-2222-2222-555555555507', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', '22222222-2222-2222-2222-444444444402', 'AUR-NAV-07', 'Bubble', 'vela-bubble', 'Vela cubo burbuja minimalista de diseño contemporáneo.', 'Tendencia estética en decoración de interiores con fragancia envolvente.', 18000.00, 30, TRUE, TRUE, '6 cm × 6 cm × 6 cm', ARRAY['Marfil Cálido', 'Blanco Nieve', 'Rojo Navidad', 'Verde Pino', 'Dorado Champagne'], ARRAY['Vainilla Francesa', 'Frutos Rojos', 'Canela & Clavo'], FALSE, FALSE),
('22222222-2222-2222-2222-555555555508', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', '22222222-2222-2222-2222-444444444401', 'AUR-NAV-08', 'Muñeco de Jengibre', 'muneco-de-jengibre', 'Tierna figura navideña con aroma a galleta recién horneada.', 'Cera vegetal moldeada artesanalmente con notas dulces de jengibre y canela.', 18000.00, 28, TRUE, TRUE, '11 cm alto × 8 cm ancho', ARRAY['Caramelo & Dorado', 'Marfil Cálido', 'Rojo Navidad'], ARRAY['Canela & Clavo', 'Manzana Especiada', 'Vainilla Francesa'], FALSE, FALSE),
('22222222-2222-2222-2222-555555555509', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', '22222222-2222-2222-2222-444444444402', 'AUR-NAV-09', 'Vela en Frasco de Vidrio', 'vela-frasco-vidrio', 'Vela aromática premium en vaso de cristal con tapa y decoración navideña.', 'Más de 35 horas de combustión limpia con aceites esenciales de alta concentración.', 25000.00, 30, TRUE, TRUE, '9 cm alto × 7.5 cm diámetro (200 g)', ARRAY['Blanco Nieve & Oro', 'Rojo Rubí', 'Verde Esmeralda'], ARRAY['Canela & Clavo', 'Pino Navideño', 'Vainilla Francesa', 'Frutos Rojos'], FALSE, TRUE),
('22222222-2222-2222-2222-555555555510', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', '22222222-2222-2222-2222-444444444403', 'AUR-CMB-01', 'Combo 1 • Dúo Detalle Navideño', 'combo-1-navideno', '1 Árbol de Navidad (o Reno) + 1 Esfera o Copo de Nieve en empaque de regalo.', 'Ideal para amigo secreto y detalles ejecutivos. Personaliza tus colores y aromas.', 20000.00, 40, TRUE, TRUE, 'Caja Regalo 15 cm × 12 cm', ARRAY['Rojo & Dorado', 'Verde & Blanco', 'Marfil & Oro'], ARRAY['Pino Navideño', 'Canela & Clavo', 'Vainilla Francesa'], TRUE, TRUE),
('22222222-2222-2222-2222-555555555511', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', '22222222-2222-2222-2222-444444444403', 'AUR-CMB-02', 'Combo 2 • Gran Colección Imperial AUREA', 'combo-2-navideno', 'Vela en Frasco de Vidrio + Velas de Deseos x6 + Árbol de Navidad + Reno 3D.', 'El regalo estrella de la temporada en cofre de lujo con lazo dorado y tarjeta De / Para.', 60000.00, 20, TRUE, TRUE, 'Cofre Luxury 24 cm × 20 cm', ARRAY['Colección Oro & Marfil', 'Tradición Rojo & Verde', 'Blanco Invernal'], ARRAY['Canela & Clavo', 'Pino Navideño', 'Vainilla Francesa', 'Frutos Rojos'], TRUE, TRUE),
('22222222-2222-2222-2222-555555555512', '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-333333333333', '22222222-2222-2222-2222-444444444403', 'AUR-CMB-03', 'Combo 3 • Trío Magia de Nochebuena', 'combo-3-navideno', '1 Bubble o Muñeco de Jengibre + 1 Árbol de Navidad + 1 Copo de Nieve.', 'Combinación equilibrada de diseño y aroma lista para obsequiar.', 30000.00, 30, TRUE, TRUE, 'Caja Regalo 18 cm × 15 cm', ARRAY['Dorado Champagne', 'Rojo Navidad & Blanco', 'Verde Pino & Oro'], ARRAY['Manzana Especiada', 'Canela & Clavo', 'Vainilla Francesa'], TRUE, TRUE)
ON CONFLICT DO NOTHING;

-- Auditoría Legal Específica de Catálogo Digital para AUREA Velas Artesanales
INSERT INTO tenant_legal_consents (tenant_id, service_type, terms_accepted, privacy_accepted, cookies_accepted, terms_version, document_slug, ip_address, user_agent, accepted_at)
VALUES
('22222222-2222-2222-2222-222222222222', 'catalogo', TRUE, TRUE, TRUE, '2.0', 'terminos-catalogo-digital.pdf', '181.58.10.25', 'Mozilla/5.0 (AUREA Catalog Provisioning)', CURRENT_TIMESTAMP);



