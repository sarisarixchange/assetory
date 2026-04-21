const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sarisari_db',
  password: 'test', 
  port: 5432,
});

const generateSlug = (text) => {
  return text.toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-') 
    .replace(/[^\w-]+/g, ''); 
};

const migrate = async () => {
  try {
    const data = JSON.parse(fs.readFileSync('../client/src/data/artists.json', 'utf8'));

    // Limpiamos todo para empezar de cero (Hard Reset)
    await pool.query('TRUNCATE TABLE artists, assets CASCADE');

    for (const artist of data) {
      console.log(`Migrando artista: ${artist.title}...`);
      const slug = generateSlug(artist.title);

      // 1. Insertamos el Artista y obtenemos su UUID generado
      const artistRes = await pool.query(
        `INSERT INTO artists (artist_name, slug, thumbnail, banner_image, cards) 
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [
          artist.title, 
          slug,
          artist.thumbnail, 
          artist.bannerImage || 'placeholder.png', 
          JSON.stringify(artist.cards || [])
        ]
      );
      
      const artistId = artistRes.rows[0].id;

      // 2. Si el artista tiene assets en el JSON, los insertamos en la tabla de assets
      if (artist.assets && artist.assets.length > 0) {
        for (const asset of artist.assets) {
          await pool.query(
            `INSERT INTO assets (
              artist_id, asset_name, creator_name, keywords, story, 
              asset_type, creation_method, copyright, acknowledgement, 
              files, representative_image
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [
              artistId,                       // El UUID vinculado
              asset.name, 
              artist.title,                   // Nombre del creador como respaldo
              (asset.tags || []).join(', '),  // Convertimos array a string
              asset.description,
              asset.assetType || '3D Model',
              asset.creationMethod || '',
              asset.copyright || '',
              asset.acknowledgement || '',
              JSON.stringify([asset.gltfModel]), // Guardamos la URL en el array files
              asset.thumbnail                 // Guardamos la imagen en representative_image
            ]
          );
        }
      }
    }
    console.log("¡Hard Reset completed and Artists migrated to table artists.");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await pool.end();
  }
};

migrate();
