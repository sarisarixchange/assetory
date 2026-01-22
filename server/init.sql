-- 1. Crea la tabla si no existe
CREATE TABLE IF NOT EXISTS assets (
    id SERIAL PRIMARY KEY,
    asset_name VARCHAR(255) NOT NULL,
    creator_name VARCHAR(255),
    keywords TEXT,
    email VARCHAR(255),
    story TEXT,
    asset_type VARCHAR(50),
    creation_method VARCHAR(100),
    copyright VARCHAR(100),
    acknowledgement TEXT,
    files JSONB DEFAULT '[]', 
    representative_image TEXT,
    deleted_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. "Seguro" para la columna deleted_at (por si la tabla ya existía sin ella)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='assets' AND column_name='deleted_at') THEN 
        ALTER TABLE assets ADD COLUMN deleted_at TIMESTAMP DEFAULT NULL; 
    END IF; 
END $$;

-- 3. Crea el índice solo si la columna existe (esto ya no fallará)
CREATE INDEX IF NOT EXISTS idx_assets_deleted_at ON assets(deleted_at);