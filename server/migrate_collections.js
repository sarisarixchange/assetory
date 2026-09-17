const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || process.env.PGUSER,
  host: process.env.DB_HOST || process.env.PGHOST,
  database: process.env.DB_NAME || process.env.PGDATABASE,
  password: process.env.DB_PASSWORD || process.env.PGPASSWORD,
  port: process.env.DB_PORT || process.env.PGPORT || 5432,
});

const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
};

const migrateCollections = async () => {
  try {
    // Read your collections JSON file
    const rawData = fs.readFileSync('../client/src/data/collections.json', 'utf8');
    const collections = JSON.parse(rawData);

    console.log('Resetting collections table...');
    await pool.query('TRUNCATE TABLE collections RESTART IDENTITY CASCADE');

    for (const collection of collections) {
      console.log(`Migrating collection: "${collection.title}"...`);
      const slug = generateSlug(collection.title);

      // 1. Insert collection record into PostgreSQL
      const collectionRes = await pool.query(
        `INSERT INTO collections (title, slug, thumbnail, banner_image, cards, is_active)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
          collection.title,
          slug,
          collection.thumbnail || 'collections/placeholder.png',
          collection.bannerImage || 'collections/placeholder.png',
          JSON.stringify(collection.cards || []),
          true,
        ]
      );

      const collectionId = collectionRes.rows[0].id;
      console.log(`  -> Inserted Collection ID: ${collectionId} (slug: ${slug})`);

      // 2. Link assets to collection (if collection_assets junction table is active)
      if (collection.assets && collection.assets.length > 0) {
        for (const assetRef of collection.assets) {
          // Lookup matching asset ID by name
          const assetRes = await pool.query(
            `SELECT id FROM assets WHERE asset_name = $1 LIMIT 1`,
            [assetRef.name]
          );

          if (assetRes.rows.length > 0) {
            const assetId = assetRes.rows[0].id;
            await pool.query(
              `INSERT INTO collection_assets (collection_id, asset_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
              [collectionId, assetId]
            );
            console.log(`     Linked asset: "${assetRef.name}" (ID: ${assetId})`);
          } else {
            console.warn(`     Warning: Asset "${assetRef.name}" not found in assets table.`);
          }
        }
      }
    }

    console.log('\nCollections migration completed successfully!');
  } catch (err) {
    console.error('Error migrating collections:', err);
  } finally {
    await pool.end();
  }
};

migrateCollections();