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

const migrateEvents = async () => {
  try {
    // Read your events JSON file (adjust relative path if necessary)
    const rawData = fs.readFileSync('../client/src/data/events.json', 'utf8');
    const events = JSON.parse(rawData);

    console.log('Resetting events table...');
    await pool.query('TRUNCATE TABLE events RESTART IDENTITY CASCADE');

    for (const event of events) {
      console.log(`Migrating event: "${event.title}"...`);
      const slug = generateSlug(event.title);

      // 1. Insert event record into PostgreSQL
      const eventRes = await pool.query(
        `INSERT INTO events (title, slug, thumbnail, banner_image, cards, is_active)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
          event.title,
          slug,
          event.thumbnail || 'events/placeholder.png',
          event.bannerImage || 'events/placeholder.png',
          JSON.stringify(event.cards || []),
          true,
        ]
      );

      const eventId = eventRes.rows[0].id;
      console.log(`  -> Inserted Event ID: ${eventId} (slug: ${slug})`);

      // 2. Optional: Link assets to event (if event_assets junction table is active)
      if (event.assets && event.assets.length > 0) {
        for (const assetRef of event.assets) {
          // If you have an event_assets table enabled in init.sql, uncomment this block:
          /*
          // Lookup matching asset ID by name
          const assetRes = await pool.query(
            `SELECT id FROM assets WHERE asset_name = $1 LIMIT 1`,
            [assetRef.name]
          );
          if (assetRes.rows.length > 0) {
            const assetId = assetRes.rows[0].id;
            await pool.query(
              `INSERT INTO event_assets (event_id, asset_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
              [eventId, assetId]
            );
            console.log(`     Linked asset: "${assetRef.name}" (ID: ${assetId})`);
          } else {
            console.warn(`     Warning: Asset "${assetRef.name}" not found in assets table.`);
          }
          */
        }
      }
    }

    console.log('\nEvents migration completed successfully!');
  } catch (err) {
    console.error('Error migrating events:', err);
  } finally {
    await pool.end();
  }
};

migrateEvents();