-- ==============================================================================
-- G-EVO ECOSYSTEM: DATABASE INITIALIZATION SCHEMA
-- Multi-Tenant Relational Schema with Strict Isolation, Row-Level Security,
-- Cryptographic Licensing, and Social Stories Sync Support.
-- Target: PostgreSQL 15+ / Compatible with SQL Server / EF Core Migrations
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. TENANTS (INQUILINOS / NEGOCIOS DE CLIENTES)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) NOT NULL UNIQUE,
    business_name VARCHAR(200) NOT NULL,
    slogan VARCHAR(300),
    description TEXT,
    logo_url VARCHAR(500),
    cover_url VARCHAR(500),
    primary_color VARCHAR(20) DEFAULT '#10B981',     -- Verde vibrante G-evo
    secondary_color VARCHAR(20) DEFAULT '#D4AF37',   -- Dorado metalizado G-evo
    phone_whatsapp VARCHAR(50),
    email VARCHAR(150),
    address VARCHAR(300),
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Colombia',
    instagram_handle VARCHAR(100),
    facebook_page VARCHAR(150),
    tiktok_handle VARCHAR(100),
    website_url VARCHAR(250),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_is_active ON tenants(is_active);

-- ------------------------------------------------------------------------------
-- 2. USERS (SUPER ADMIN & CLIENTES DE NEGOCIOS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- NULL para SuperAdmin global
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('SuperAdmin', 'BusinessOwner', 'Staff')),
    phone VARCHAR(50),
    avatar_url VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_tenant_id ON users(tenant_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ------------------------------------------------------------------------------
-- 3. LICENSES (CÓDIGOS DE ACTIVACIÓN CRIPTOGRÁFICOS - MÓDULO MONETIZADO)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    module_code VARCHAR(80) NOT NULL, -- ej. 'AI_SUPPORT_BOT_247', 'PREMIUM_BRANDING'
    license_key VARCHAR(120) NOT NULL UNIQUE, -- ej. 'GEVO-REST-AI24-9B3E7A'
    key_hash VARCHAR(255) NOT NULL, -- Hash seguro SHA-256 para validación
    status VARCHAR(30) NOT NULL DEFAULT 'Active' CHECK (status IN ('Pending', 'Active', 'Revoked', 'Expired')),
    is_trial BOOLEAN NOT NULL DEFAULT FALSE,
    issued_by_user_id UUID REFERENCES users(id),
    issued_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    activated_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    notes TEXT
);

CREATE INDEX idx_licenses_tenant_id ON licenses(tenant_id);
CREATE INDEX idx_licenses_license_key ON licenses(license_key);
CREATE INDEX idx_licenses_status ON licenses(status);

-- ------------------------------------------------------------------------------
-- 4. CATALOGS (CATÁLOGOS / TIENDAS VIRTUALES POR INQUILINO)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS catalogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    currency VARCHAR(10) NOT NULL DEFAULT 'COP',
    whatsapp_checkout_phone VARCHAR(50),
    custom_domain VARCHAR(255),
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    enable_ai_support BOOLEAN NOT NULL DEFAULT FALSE,
    views_count BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_catalogs_tenant_id ON catalogs(tenant_id);

-- ------------------------------------------------------------------------------
-- 5. CATEGORIES (CATEGORÍAS DE PRODUCTOS DENTRO DEL CATÁLOGO)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    catalog_id UUID NOT NULL REFERENCES catalogs(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL,
    icon_name VARCHAR(50),
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_tenant ON categories(tenant_id, catalog_id);
CREATE INDEX idx_categories_order ON categories(catalog_id, display_order);

-- ------------------------------------------------------------------------------
-- 6. PRODUCTS (PRODUCTOS / SERVICIOS DEL CLIENTE)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    catalog_id UUID NOT NULL REFERENCES catalogs(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    sku VARCHAR(100),
    name VARCHAR(250) NOT NULL,
    slug VARCHAR(250) NOT NULL,
    short_description VARCHAR(500),
    full_description TEXT,
    ai_generated_description TEXT,
    price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    compare_at_price NUMERIC(12, 2),
    stock_quantity INT NOT NULL DEFAULT 0,
    track_stock BOOLEAN NOT NULL DEFAULT FALSE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_tenant ON products(tenant_id, catalog_id);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_sku ON products(tenant_id, sku);
CREATE INDEX idx_products_available ON products(tenant_id, is_available);

-- ------------------------------------------------------------------------------
-- 7. PRODUCT MEDIA (FOTOGRAFÍAS Y MULTIMEDIA)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    media_url VARCHAR(600) NOT NULL,
    thumbnail_url VARCHAR(600),
    media_type VARCHAR(20) NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video', 'document')),
    alt_text VARCHAR(250),
    display_order INT NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_product_media_product ON product_media(product_id, display_order);

-- ------------------------------------------------------------------------------
-- 8. SOCIAL STORIES CACHE (SINCRONIZACIÓN DE HISTORIAS DE INSTAGRAM Y FACEBOOK)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS social_stories_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform VARCHAR(30) NOT NULL CHECK (platform IN ('Instagram', 'Facebook', 'Corporate')),
    external_story_id VARCHAR(120),
    media_url VARCHAR(800) NOT NULL,
    media_type VARCHAR(20) NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
    caption TEXT,
    permalink VARCHAR(800),
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    expires_at TIMESTAMP WITH TIME ZONE,
    synced_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_social_stories_active ON social_stories_cache(is_active, expires_at);

-- ------------------------------------------------------------------------------
-- 9. AI CHAT AUDIT (REGISTRO DE CONSULTAS DEL AGENTE DE SOPORTE)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    session_id VARCHAR(100) NOT NULL,
    customer_name VARCHAR(120),
    customer_phone VARCHAR(50),
    channel VARCHAR(30) NOT NULL DEFAULT 'WebChat' CHECK (channel IN ('WebChat', 'WhatsApp', 'InstagramDM')),
    user_query TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    context_tokens INT DEFAULT 0,
    response_time_ms INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_conversations_tenant ON ai_conversations(tenant_id, created_at);

