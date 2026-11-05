-- ==============================================================================
-- G-EVO ECOSYSTEM: MIGRATION 03 - LEGAL CONSENT & AUDIT TRAIL (v1.1)
-- Agent: 04-db-sql.md
-- Purpose: Add terms_accepted, terms_accepted_at, and terms_version columns
--          to tenants and digital_cards while enforcing tenant_id isolation.
-- ==============================================================================

ALTER TABLE tenants
    ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMP WITH TIME ZONE NULL,
    ADD COLUMN IF NOT EXISTS terms_version VARCHAR(10) NOT NULL DEFAULT '1.1';

CREATE TABLE IF NOT EXISTS digital_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    job_title VARCHAR(150),
    organization VARCHAR(200),
    location VARCHAR(150),
    bio TEXT,
    avatar_url TEXT,
    cover_bg_url TEXT,
    phone_whatsapp VARCHAR(50),
    email VARCHAR(150),
    theme VARCHAR(50) NOT NULL DEFAULT 'gold_metallic',
    owner_pin VARCHAR(20) NOT NULL DEFAULT '1234',
    instagram_url VARCHAR(250),
    facebook_url VARCHAR(250),
    linkedin_url VARCHAR(250),
    portfolio_url VARCHAR(250),
    terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    terms_accepted_at TIMESTAMP WITH TIME ZONE NULL,
    terms_version VARCHAR(10) NOT NULL DEFAULT '1.1',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE digital_cards
    ADD COLUMN IF NOT EXISTS terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS terms_accepted_at TIMESTAMP WITH TIME ZONE NULL,
    ADD COLUMN IF NOT EXISTS terms_version VARCHAR(10) NOT NULL DEFAULT '1.1';

CREATE INDEX IF NOT EXISTS idx_digital_cards_tenant_id ON digital_cards(tenant_id);
CREATE INDEX IF NOT EXISTS idx_digital_cards_slug ON digital_cards(slug);
