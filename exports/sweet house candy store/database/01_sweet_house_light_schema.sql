-- ==============================================================================
-- SWEET HOUSE CANDY STORE — ESQUEMA MÍNIMO DE BASE DE DATOS (4 TABLAS LIGERAS)
-- Regla Crítica: Cero tabla de Usuarios_Clientes (100% Guest Checkout de 3 campos).
-- Optimizado para PostgreSQL / Supabase Free Tier y respaldado por G-evo.
-- ==============================================================================

-- 1. ADMIN_USER (Acceso exclusivo para el Administrador del Back-Office)
CREATE TABLE IF NOT EXISTS admin_user (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(80) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PRODUCTOS (Catálogo con Costo Interno, Precio Venta, Promoción y Bloqueo)
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(60) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(80) NOT NULL, -- Importados, Gomas, Chocolates, Cajas Regalo, Bolis, Bombones, Ácidos
    description TEXT,
    cost_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00, -- Costo interno de adquisición
    sale_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00, -- Precio regular de venta
    promo_price NUMERIC(12, 2) NULL,                 -- Precio promocional activo (NULL si no hay oferta)
    promo_discount_percent INT NULL,                 -- % de descuento aplicado
    stock INT NOT NULL DEFAULT 0,
    is_blocked BOOLEAN NOT NULL DEFAULT FALSE,       -- true = Pausado/Oculto en la tienda pública
    image_url TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_productos_category ON productos(category);
CREATE INDEX idx_productos_visible ON productos(is_blocked);

-- 3. PEDIDOS (Guest Checkout de solo 3 datos obligatorios + Balance Neto)
CREATE TABLE IF NOT EXISTS pedidos (
    id VARCHAR(30) PRIMARY KEY,                      -- Ej: SW-894120
    payment_ref VARCHAR(80) NOT NULL UNIQUE,         -- Referencia de pasarela (Wompi Temporal / Directo)
    recipient_name VARCHAR(150) NOT NULL,            -- Dato 1: Nombre completo de quien recibe
    recipient_whatsapp VARCHAR(40) NOT NULL,         -- Dato 2: Celular / WhatsApp de contacto
    delivery_address TEXT NOT NULL,                  -- Dato 3: Ciudad y Dirección exacta (barrio / apto)
    payment_method VARCHAR(50) NOT NULL,             -- Nequi | PSE | Botón Bancolombia | Tarjeta | WhatsApp
    status VARCHAR(30) NOT NULL DEFAULT 'PENDIENTE' CHECK (status IN ('PENDIENTE', 'PAGADO', 'ENVIADO', 'ENTREGADO')),
    gross_total NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    estimated_fee NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    net_profit NUMERIC(12, 2) NOT NULL DEFAULT 0.00, -- Ganancia Neta (Venta - Costo Interno - Comisión)
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pedidos_status ON pedidos(status, created_at DESC);
CREATE INDEX idx_pedidos_payment_method ON pedidos(payment_method);

-- 4. DETALLE_PEDIDOS (Artículos vendidos por pedido para Ranking y Balance de Promociones)
CREATE TABLE IF NOT EXISTS detalle_pedidos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(30) NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    product_sku VARCHAR(60) NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    unit_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    was_promo BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_detalle_pedidos_order ON detalle_pedidos(order_id);
CREATE INDEX idx_detalle_pedidos_sku ON detalle_pedidos(product_sku);
