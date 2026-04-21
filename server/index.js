const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
const cron = require('node-cron');

// --- CONFIGURACIÓN DE CARPETAS ---
// Solo necesitamos una carpeta base: uploads
const uploadBaseDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadBaseDir)) {
  fs.mkdirSync(uploadBaseDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Servir archivos estáticos (Ahora solo una ruta)
app.use('/uploads', express.static(uploadBaseDir));

// Esta tarea se ejecutará el primer día de cada mes a las 03:00 AM
// (Cuando hay poco tráfico en el servidor de McMaster)
cron.schedule('0 3 1 * *', async () => {
  console.log('🕒 [CRON] Iniciando limpieza mensual programada...');

  try {
    // Definimos el periodo de gracia (30 días)
    const gracePeriod = "30 days";


    // 1. Artistas inactivos antiguos
    const result = await pool.query(
      `DELETE FROM artists 
       WHERE is_active = false 
       AND deleted_at < NOW() - INTERVAL '${gracePeriod}'`
    );

    // 2. Assets inactivos antiguos
    const assetResult = await pool.query(
      `DELETE FROM assets 
       WHERE is_active = false 
       AND deleted_at < NOW() - INTERVAL '${gracePeriod}'`
    );

    console.log(`🧹 [CRON] Limpieza automática exitosa. Removidos: ${result.rowCount} artistas y ${assetResult.rowCount} assets.`);
  } catch (err) {
    console.error('❌ [CRON] Error en la limpieza automática:', err.message);
  }
});

// --- CONFIGURACIÓN DE MULTER UNIFICADA ---
// Creamos una subcarpeta única por cada "envío" o "artista" para evitar colisión de nombres
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Si ya existe una carpeta para este request (ej. varios archivos a la vez), la usamos
    // Si no, creamos una nueva basada en la fecha o el slug del artista
    if (!req.uploadSessionDir) {
      req.uploadSessionDir = Date.now() + '-' + Math.round(Math.random() * 1E4);
    }

    // DETECTAMOS EL DESTINO:
    // Si la ruta contiene '3d' o 'submit', va a assets. Si no, a artists.
    const subFolder = (req.path.includes('3d') || req.path.includes('submit'))
      ? 'assets'
      : 'artists';

    const targetDir = path.join(uploadBaseDir, subFolder, req.uploadSessionDir);

    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
    cb(null, targetDir);
  },

  filename: function (req, file, cb) {
    // Mantenemos el nombre original pero podrías añadir un timestamp si prefieres
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// --- BASE DE DATOS ---
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

// ... (Resto de la lógica de initializeDatabase)

const initializeDatabase = async () => {
  try {
    const sqlPath = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    await pool.query(sql);
    console.log("✅ Database structure verified/created.");
  } catch (err) {
    console.error("❌ Error initializing the database:", err);
    process.exit(1);
  }
};

initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

// --- RUTAS ---

app.get("/", (req, res) => res.send("SSX Assetory backend running 🚀"));


app.get('/api/artists/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await pool.query('SELECT * FROM artists WHERE slug = $1 AND is_active = true', [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    const artist = result.rows[0];

    const assetsResult = await pool.query(
      `SELECT * FROM assets WHERE artist_id = $1 
       AND is_active = true 
       AND is_visible = true
       ORDER BY id DESC`,
      [artist.id]
    );

    const formattedAssets = assetsResult.rows.map(asset => {
      // Extraemos el primer archivo del array JSONB 'files'
      const modelFile = (asset.files && asset.files.length > 0) ? asset.files[0] : '';

      return {
        id: asset.id,
        name: asset.asset_name,
        creator: asset.creator_name,
        // Añadimos thumbnail que es lo que busca el componente de la galería
        thumbnail: asset.representative_image,
        tags: asset.keywords ? asset.keywords.split(',').map(t => t.trim()) : [],
        description: asset.story,
        assetType: asset.asset_type,
        creationMethod: asset.creation_method,
        copyright: asset.copyright,
        acknowledgement: asset.acknowledgement,
        // Usamos modelFile que extrajimos de la columna 'files'
        gltfModel: modelFile,
        downloadLink: modelFile
      };
    });

    res.json({
      ...artist,
      title: artist.artist_name, // Traducción fundamental para el frontend
      // bannerImage: artist.banner_image,
      assets: formattedAssets
    });

  } catch (err) {
    console.error("Error fetching artist and assets: ", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Upload new 3D asset from ArtistsManager inside admin
// Reemplaza tu app.post('/api/upload-3d' con esto:
app.post('/api/upload-3d', upload.single('model'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded.');

    const { artist_id, asset_name, creator_name } = req.body;

    // Ruta relativa para la DB
    const filePath = `${req.uploadSessionDir}/${req.file.filename}`;

    // Imagen por defecto (Asegúrate de tener un placeholder.jpg en uploads/assets/)
    const defaultThumb = 'assets/placeholder.jpg';

    const query = `
      INSERT INTO assets (
        asset_name, creator_name, artist_id, files, 
        representative_image, status, is_active
      )
      VALUES ($1, $2, $3, $4, $5, 'approved', true)
      RETURNING *;
    `;

    const values = [
      asset_name || req.file.originalname,
      creator_name || 'Admin Upload',
      artist_id || null,
      JSON.stringify([filePath]),
      defaultThumb
    ];

    const result = await pool.query(query, values);
    console.log(`📦 Asset 3D subido con éxito: ${result.rows[0].asset_name}`);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error en upload-3d:", err.message);
    res.status(500).send(err.message);
  }
});

//By using a specific endpoint (PATCH), we only modify the is_active column. The file still exists in uploads/assets/ and the record remains in the database. If the user changes their mind, they simply turn the switch back on.
app.patch('/api/assets/:id/visibility', async (req, res) => {
  const { id } = req.params;
  const { is_visible } = req.body;

  try {
    await pool.query(
      'UPDATE assets SET is_visible = $1 WHERE id = $2',
      [is_visible, id]
    );
    res.json({ message: "Pulic visibility updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- RESTO DE TUS RUTAS (Submissions, CRUD Artistas, etc) ---

app.get('/api/artists', async (req, res) => {
  try {
    // 1. Traemos los datos de la nueva tabla
    const result = await pool.query('SELECT * FROM artists WHERE is_active = true ORDER BY created_at DESC');
    // const result = await pool.query('SELECT * FROM artists ORDER BY artist_name ASC');

    // 2. Mapeamos para que el frontend reciba "title" en lugar de "artist_name"
    const formattedArtists = result.rows.map(artist => ({
      ...artist,
      title: artist.artist_name, // Mapamos artist_name -> title
      // Opcional: Aseguramos que el bannerImage también coincida si el JSON usaba CamelCase
      bannerImage: artist.banner_image
    }));

    res.json(formattedArtists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// upload new artist image from ArtistsManager inside admin
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded.');

    // req.uploadSessionDir ya contiene algo como "173859201-4421"
    // Construimos la ruta relativa: "173859201-4421/foto.jpg"
    const relativePath = `artists/${req.uploadSessionDir}/${req.file.filename}`;

    res.json({
      message: 'Upload successful',
      // Enviamos la ruta completa relativa a 'uploads/'
      dbPath: relativePath
    });
  } catch (err) {
    console.error("Error en upload artista:", err.message);
    res.status(500).send(err.message);
  }
});

app.put('/api/artists/:id', async (req, res) => {

  const { id } = req.params; // Este id es el UUID
  const { artist_name, slug, cards, banner_image, thumbnail } = req.body;

  try {
    // 1. OBTENER LOS DATOS ACTUALES ANTES DE SOBREESCRIBIRLOS
    // Necesitamos saber qué thumbnail tenía antes para poder borrar su carpeta
    const currentData = await pool.query(
      'SELECT thumbnail FROM artists WHERE id = $1',
      [id]
    );

    if (currentData.rows.length > 0) {
      const oldThumb = currentData.rows[0].thumbnail;

      // 2. ¿EL NUEVO THUMBNAIL ES DIFERENTE AL QUE YA TENÍAMOS?
      // Si el usuario subió una foto nueva, la ruta será distinta (nuevo timestamp)
      if (oldThumb && oldThumb !== thumbnail) {
        const pathParts = oldThumb.split('/');

        // SEGURIDAD: Solo borramos si tiene el formato "artists/ID-SESION/archivo"
        // y NO es el placeholder raíz (para no borrar la "semilla")
        if (pathParts.length >= 2 && pathParts[1] !== 'placeholder.png') {
          const folderToDelete = path.join(uploadBaseDir, 'artists', pathParts[1]);

          if (fs.existsSync(folderToDelete)) {
            // Borrado físico total de la carpeta de la imagen anterior
            fs.rmSync(folderToDelete, { recursive: true, force: true });
            console.log(`♻️ Reemplazo: Carpeta de imagen anterior eliminada: ${folderToDelete}`);
          }
        }
      }
    }

    // 3. Actualizamos solo los datos del perfil del artista
    // Eliminamos 'assets' de aquí porque ya no es una columna de esta tabla
    await pool.query(
      `UPDATE artists 
       SET artist_name=$1, slug=$2, cards=$3, banner_image=$4, thumbnail=$5 
       WHERE id=$6`,
      [
        artist_name,
        slug,
        JSON.stringify(cards || []),
        banner_image,
        thumbnail,
        id
      ]
    );

    res.json({ message: "Artist profile updated successfully" });
  } catch (err) {
    console.error("Error updating artist:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/artists', async (req, res) => {
  const {
    artist_name,
    title,
    slug,
    cards = [],
    banner_image,
    thumbnail,
  } = req.body;

  // --- LOG CRÍTICO DE ENTRADA ---
  console.log("📥 Datos recibidos en el Body:");
  console.log("- artist_name:", artist_name);
  console.log("- thumbnail recibido:", `"${thumbnail}"`); // Las comillas ayudan a ver espacios vacíos
  console.log("- tipo de thumbnail:", typeof thumbnail);

  const finalName = artist_name || title || 'Untitled';
  const finalSlug = slug || (finalName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now());

  let finalThumbnail = thumbnail || '';

  // AJUSTE AQUÍ: Detectamos si es un string vacío O si es la ruta del placeholder por defecto
  const isPlaceholder = finalThumbnail === '' || finalThumbnail === 'artists/placeholder.png';

  if (isPlaceholder) {
    const sessionDir = Date.now() + '-' + Math.round(Math.random() * 1E4);
    const targetDir = path.join(uploadBaseDir, 'artists', sessionDir);

    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    // El archivo maestro que debe existir en /uploads/placeholder.png
    const placeholderSource = path.join(uploadBaseDir, 'artists', 'placeholder.png');
    const placeholderDest = path.join(targetDir, 'placeholder.png');

    // --- DEBUG LOGS ---
    console.log("------------------------------------------");
    console.log("🔍 BUSCANDO MAESTRO EN:", placeholderSource);
    console.log("❓ ¿EXISTE EL ARCHIVO?:", fs.existsSync(placeholderSource));
    console.log("📂 CONTENIDO DE UPLOADS:", fs.readdirSync(uploadBaseDir));
    console.log("------------------------------------------");

    try {
      if (fs.existsSync(placeholderSource)) {
        fs.copyFileSync(placeholderSource, placeholderDest);
        // Ahora la ruta apunta a la nueva carpeta de sesión
        finalThumbnail = `artists/${sessionDir}/placeholder.png`;
      }
    } catch (err) {
      console.error("Error copiando placeholder:", err);
    }
  }

  // Si el banner también era el placeholder, lo actualizamos a la nueva ruta
  const finalBanner = (banner_image === 'artists/placeholder.png' || !banner_image)
    ? finalThumbnail
    : banner_image;

  try {
    const result = await pool.query(
      `INSERT INTO artists (artist_name, slug, cards, banner_image, thumbnail) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [finalName, finalSlug, JSON.stringify(cards), finalBanner, finalThumbnail]
    );

    console.log(`✅ Artista creado con sesión propia: ${finalName}`);
    res.json({ message: 'Artist created', id: result.rows[0].id });
  } catch (err) {
    console.error("Error en INSERT artista:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/submissions", async (req, res) => {
  console.log("Petición recibida en GET /api/submissions");
  try {
    // Hacemos un LEFT JOIN para traer el nombre del artista si existe
    // Si artist_id es NULL, el asset_name y creator_name de la tabla assets mandan
    const query = `
      SELECT 
        a.*, 
        art.artist_name as official_artist_name,
        art.slug as artist_slug
      FROM assets a
      LEFT JOIN artists art ON a.artist_id = art.id
      WHERE a.is_active = true
      ORDER BY a.created_at DESC
    `;

    const result = await pool.query(query);

    // Mapeamos para que el frontend reciba nombres consistentes
    const formattedSubmissions = result.rows.map(asset => ({
      ...asset,
      // Si tiene un artista vinculado, usamos ese nombre, si no, el creator_name
      display_name: asset.official_artist_name || asset.creator_name || 'Anonymous',
      // Convertimos el array de archivos para el frontend
      model_url: (asset.files && asset.files.length > 0) ? asset.files[0] : null
    }));

    res.json(formattedSubmissions);
  } catch (err) {
    console.error("Error en GET /submissions:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// upload new 3D asset from Submit form
app.post("/api/submit", upload.fields([
  { name: "assetFiles", maxCount: 5 },
  { name: "representativeImage", maxCount: 1 }
]), async (req, res) => {
  try {
    // Extraemos los datos (soportando camelCase del frontend)
    const {
      assetName, asset_name,
      creatorName, creator_name,
      keywords, email, story,
      assetType, asset_type,
      creationMethod, creation_method,
      copyright, acknowledgement
    } = req.body;

    // Usamos la carpeta de sesión generada por nuestro nuevo Multer
    const folder = req.uploadSessionDir;

    // Construimos las rutas relativas para la DB
    const representative_image = (req.files['representativeImage'] && req.files['representativeImage'][0])
      ? `${folder}/${req.files['representativeImage'][0].filename}`
      : null;

    const filesArray = (req.files['assetFiles'])
      ? req.files['assetFiles'].map(f => `${folder}/${f.filename}`)
      : [];

    const query = `
        INSERT INTO assets (
          asset_name, creator_name, keywords, email, story, 
          asset_type, creation_method, copyright, acknowledgement, 
          files, representative_image, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'pending') 
        RETURNING *;
      `;

    const values = [
      asset_name || assetName,
      creator_name || creatorName,
      keywords,
      email,
      story,
      asset_type || assetType || '3D Model',
      creation_method || creationMethod,
      copyright,
      acknowledgement,
      JSON.stringify(filesArray),
      representative_image
    ];

    const result = await pool.query(query, values);

    console.log(`✅ Nueva submission recibida: ${asset_name || assetName}`);
    res.json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error("❌ Error en /submit:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// index.js

// Obtener assets vinculados a un artista específico
app.get('/api/artists/:id/assets', async (req, res) => {
  try {
    const { id } = req.params; // El UUID del artista
    // Buscamos assets que pertenezcan a este ID y que no estén borrados
    const query = `
      SELECT * FROM assets 
      WHERE artist_id = $1 AND is_active = true 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [id]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching artist assets:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/submissions/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // En lugar de borrar, marcamos la fecha y desactivamos
    const query = `
      UPDATE assets 
      SET 
        deleted_at = CURRENT_TIMESTAMP, 
        is_active = false 
      WHERE id = $1 
      RETURNING id, asset_name;
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Asset no encontrado" });
    }

    console.log(`☁️ Soft Delete aplicado al asset: ${result.rows[0].asset_name}`);

    res.json({
      success: true,
      message: "Asset movido a la papelera (Soft Delete)"
    });
  } catch (err) {
    console.error("❌ Error en Soft Delete:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/artists/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Marcamos al artista como inactivo y registramos la fecha de borrado
    const query = `
      UPDATE artists 
      SET 
        is_active = false, 
        deleted_at = CURRENT_TIMESTAMP,
        slug = slug || '-deleted-' || EXTRACT(EPOCH FROM NOW())::bigint -- 🔥 LIBERA EL SLUG
      WHERE id = $1 
      RETURNING artist_name;
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Artista no encontrado" });
    }

    // 2. Desactivamos sus ASSETS en cascada (Opcional pero recomendado)
    await pool.query(
      'UPDATE assets SET is_active = false, deleted_at = CURRENT_TIMESTAMP WHERE artist_id = $1',
      [id]
    );

    console.log(`👤 Artist softly deleted: ${result.rows[0].artist_name}`);
    res.json({ success: true, message: "Artist de-activated correctly" });
  } catch (err) {
    console.error("Error with the Soft Delete of the artist:", err.message);
    res.status(500).json({ error: "Error in database when de-activating artist" });
  }
});

////////// DEBUGGING HELPER FUNCTIONS
// http://localhost:3000/api/debug-assets
app.get('/api/debug-assets', async (req, res) => {
  try {
    // Traemos los últimos 10 assets, incluyendo los "borrados" para que puedas ver el estado
    const result = await pool.query(`
      SELECT *
      FROM assets 
      ORDER BY created_at DESC 
    `);

    // Añadimos un contador simple para el log
    console.log(`debugging assets: se encontraron ${result.rows.length} registros.`);
    res.json(result.rows);
  } catch (err) {
    console.error("Error en debug-assets:", err.message);
    res.status(500).send(err.message);
  }
});

// http://localhost:3000/api/debug-artists
app.get('/api/debug-artists', async (req, res) => {
  try {
    // Traemos los últimos 10 assets, incluyendo los "borrados" para que puedas ver el estado
    const result = await pool.query('SELECT * FROM artists WHERE is_active = true ORDER BY created_at DESC');
    // const result = await pool.query(`
    //   SELECT *
    //   FROM artists 
    //   ORDER BY created_at DESC 
    //   LIMIT 10
    // `);

    // Añadimos un contador simple para el log
    console.log(`debugging artists:  ${result.rows.length} found entries.`);
    res.json(result.rows);
  } catch (err) {
    console.error("Error en debug-artists:", err.message);
    res.status(500).send(err.message);
  }
});

// see deleted artists: http://localhost:3000/api/lookup-deleted-artists
app.get('/api/lookup-deleted-artists', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM artists WHERE is_active = false ORDER BY created_at DESC');

    console.log(`Soft deleted artists:  ${result.rows.length} found entries.`);
    res.json(result.rows);
  } catch (err) {
    console.error("Error is lookup-deleted-artists:", err.message);
    res.status(500).send(err.message);
  }
});

app.get('/api/maintenance/clean-garbage', async (req, res) => {
  try {
    console.log("🚀 Iniciando mantenimiento integral...");
    // "3O days" o "1 second", o el tiempo que prefieras
    const gracePeriod = "1 second";
    let orphansCount = 0;
    let softDeletedCount = 0;

    // --- PARTE 1: LIMPIEZA DE ARTISTAS EN SOFT-DELETE (Tu código original) ---
    const oldArtists = await pool.query(
      `SELECT thumbnail, banner_image FROM artists 
       WHERE is_active = false AND deleted_at < NOW() - INTERVAL '${gracePeriod}'`
    );

    oldArtists.rows.forEach(artist => {
      const pathParts = artist.thumbnail ? artist.thumbnail.split('/') : [];
      if (pathParts.length >= 2 && pathParts[1] !== 'placeholder.png') {
        const folderToDelete = path.join(uploadBaseDir, 'artists', pathParts[1]);
        if (fs.existsSync(folderToDelete)) {
          fs.rmSync(folderToDelete, { recursive: true, force: true });
          softDeletedCount++;
        }
      }
    });

    // Borrado definitivo en la DB
    await pool.query(
      `DELETE FROM artists WHERE is_active = false AND deleted_at < NOW() - INTERVAL '${gracePeriod}'`
    );


    // --- PARTE 2: LIMPIEZA DE CARPETAS HUÉRFANAS (La nueva técnica) ---
    const artistsDir = path.join(uploadBaseDir, 'artists');
    const physicalFolders = fs.readdirSync(artistsDir).filter(f =>
      fs.lstatSync(path.join(artistsDir, f)).isDirectory()
    );

    // Obtenemos TODO lo que la DB considera activo actualmente
    const dbResult = await pool.query('SELECT thumbnail, banner_image FROM artists');
    const activeFoldersInDb = new Set();
    dbResult.rows.forEach(row => {
      [row.thumbnail, row.banner_image].forEach(pathStr => {
        if (pathStr) {
          const parts = pathStr.split('/');
          if (parts.length >= 2) activeFoldersInDb.add(parts[1]);
        }
      });
    });

    const now = Date.now();
    // Margen para no borrar lo que se está subiendo justo ahora
    // const TWO_HOURS = 2 * 60 * 60 * 1000; 
    const TWO_HOURS = 0;

    physicalFolders.forEach(folder => {
      if (folder !== 'placeholder.png' && !activeFoldersInDb.has(folder)) {
        const folderPath = path.join(artistsDir, folder);
        const stats = fs.statSync(folderPath);

        // Si no está en la DB y es una carpeta "vieja" (más de 2 horas), es basura real
        if (now - stats.mtimeMs > TWO_HOURS) {
          fs.rmSync(folderPath, { recursive: true, force: true });
          orphansCount++;
        }
      }
    });

    res.json({
      success: true,
      orphansRemoved: orphansCount,
      expiredArtistsRemoved: softDeletedCount,
      message: `Limpieza profunda completada.`
    });

  } catch (err) {
    console.error("❌ Error en mantenimiento:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// Endpoint para limpiar carpetas que se crearon pero no se confirmaron (Cancel o abandono)
app.post('/api/cleanup/temp-folder', async (req, res) => {
  const { folderName } = req.body;

  // Validación de seguridad: No permitir borrar carpetas raíz o el placeholder
  if (!folderName || folderName === 'placeholder.png' || folderName.includes('..')) {
    return res.status(400).json({ error: "Nombre de carpeta inválido" });
  }

  try {
    // Construimos la ruta: /uploads/artists/NOMBRE_CARPETA
    const targetDir = path.join(uploadBaseDir, 'artists', folderName);

    if (fs.existsSync(targetDir)) {
      // fs.rmSync borra la carpeta y todo lo que tenga dentro
      fs.rmSync(targetDir, { recursive: true, force: true });
      console.log(`🧹 Limpieza manual: Carpeta temporal eliminada: ${folderName}`);
      res.json({ message: "Carpeta temporal eliminada con éxito" });
    } else {
      // Si ya no existe, probablemente el mantenimiento automático se adelantó
      res.json({ message: "La carpeta ya no existe o ya fue limpiada" });
    }
  } catch (err) {
    console.error("Error en /api/cleanup/temp-folder:", err);
    res.status(500).json({ error: "No se pudo eliminar la carpeta temporal" });
  }
});