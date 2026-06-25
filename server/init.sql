-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Artists Table
CREATE TABLE IF NOT EXISTS artists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artist_name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    thumbnail TEXT,
    banner_image TEXT,
    cards JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,          
    deleted_at TIMESTAMP DEFAULT NULL,       
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Safeguard for soft delete columns in artists (if table already exists)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='artists' AND column_name='is_active') THEN 
        ALTER TABLE artists ADD COLUMN is_active BOOLEAN DEFAULT true; 
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='artists' AND column_name='deleted_at') THEN 
        ALTER TABLE artists ADD COLUMN deleted_at TIMESTAMP DEFAULT NULL; 
    END IF;
END $$;

-- 3. Assets Table
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

-- 4. Events table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    thumbnail VARCHAR(255) DEFAULT 'events/placeholder.png',
    banner_image VARCHAR(255) DEFAULT 'events/placeholder.png',
    cards JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -- 2. Tabla Intermedia: Vinculación de Assets a un Evento específico
-- -- Esto mapea el arreglo "assets" del JSON conectando un evento con un asset existente
-- CREATE TABLE IF NOT EXISTS event_assets (
--     id SERIAL PRIMARY KEY,
--     event_id INT REFERENCES events(id) ON DELETE CASCADE,
--     asset_id INT NOT NULL, -- ID numérico o UUID según uses en tu tabla assets
--     UNIQUE(event_id, asset_id)
-- );

-- 4. Índices
CREATE INDEX IF NOT EXISTS idx_assets_artist_id ON assets(artist_id);
CREATE INDEX IF NOT EXISTS idx_artists_slug ON artists(slug);
CREATE INDEX IF NOT EXISTS idx_artists_active ON artists(is_active); -- Optimize GETs
CREATE INDEX IF NOT EXISTS idx_assets_active ON assets(is_active);   -- Optimize GETs
CREATE INDEX IF NOT EXISTS idx_assets_visible ON assets(is_visible); -- OPTIONAL: Speeds up public asset catalog queries