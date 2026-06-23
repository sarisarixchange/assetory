-- 1. Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tabla de Artistas
CREATE TABLE IF NOT EXISTS artists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artist_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    thumbnail TEXT,
    banner_image TEXT,
    cards JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,          -- 🔥 AÑADIDO
    deleted_at TIMESTAMP DEFAULT NULL,       -- 🔥 AÑADIDO
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seguro para columnas de Soft Delete en Artistas (si la tabla ya existía)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='artists' AND column_name='is_active') THEN 
        ALTER TABLE artists ADD COLUMN is_active BOOLEAN DEFAULT true; 
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='artists' AND column_name='deleted_at') THEN 
        ALTER TABLE artists ADD COLUMN deleted_at TIMESTAMP DEFAULT NULL; 
    END IF;
END $$;

-- 3. Tabla de Assets
CREATE TABLE IF NOT EXISTS assets (
    id SERIAL PRIMARY KEY,
    artist_id UUID REFERENCES artists(id) ON DELETE CASCADE, 
    asset_name VARCHAR(255) NOT NULL,
    creator_name VARCHAR(255),
    keywords TEXT,
    email VARCHAR(255),
    story TEXT,
    asset_type VARCHAR(50) DEFAULT '3D Model',
    creation_method VARCHAR(100),
    copyright VARCHAR(100),
    acknowledgement TEXT,
    files JSONB DEFAULT '[]',
    representative_image TEXT,
    status VARCHAR(50) DEFAULT 'approved',
    is_active BOOLEAN DEFAULT true,
    is_visible BOOLEAN DEFAULT true,          
    deleted_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Índices
CREATE INDEX IF NOT EXISTS idx_assets_artist_id ON assets(artist_id);
CREATE INDEX IF NOT EXISTS idx_artists_slug ON artists(slug);
CREATE INDEX IF NOT EXISTS idx_artists_active ON artists(is_active); -- Optimiza GETs
CREATE INDEX IF NOT EXISTS idx_assets_active ON assets(is_active);   -- Optimiza GETs
CREATE INDEX IF NOT EXISTS idx_assets_visible ON assets(is_visible); -- 🔥 OPTIONAL: Speeds up public asset catalog queries
