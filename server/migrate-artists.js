const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sarisari_db',
  password: 'test', 
  port: 5432,
});

// Función auxiliar para crear el slug
const generateSlug = (text) => {
  return text.toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Quita acentos
    .replace(/\s+/g, '-') 
    .replace(/[^\w-]+/g, ''); 
};

const migrate = async () => {
  try {
    const data = JSON.parse(fs.readFileSync('../client/src/data/artists.json', 'utf8'));

    // Limpiamos la tabla primero para evitar mezclar IDs viejos con UUIDs
    await pool.query('TRUNCATE TABLE artists CASCADE');

    for (const artist of data) {
      console.log(`Migrando artista: ${artist.title}...`);
      
      const slug = generateSlug(artist.title);

      await pool.query(
        `INSERT INTO artists (title, slug, thumbnail, banner_image, cards, assets) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          artist.title, 
          slug,
          artist.thumbnail, 
          artist.bannerImage || 'placeholder.png', 
          JSON.stringify(artist.cards || []), 
          JSON.stringify(artist.assets || [])
        ]
      );
    }
    console.log("¡Migración completada! Se han generado UUIDs y Slugs automáticamente.");
  } catch (err) {
    console.error("Error en la migración:", err);
  } finally {
    await pool.end();
  }
};

migrate();