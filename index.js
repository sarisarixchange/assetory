const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Pool } = require('pg');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Asegurar que la carpeta uploads exista
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Servir archivos estáticos para poder ver las imágenes subidas
app.use('/uploads', express.static('uploads'));

// File upload setup
// const storage = multer.diskStorage({
//   destination: uploadDir,
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// 1. Función para crear la carpeta destino dinámicamente
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Creamos un nombre de carpeta único usando la fecha y un ID corto
    // Si ya existe una carpeta para esta petición (req.uploadDir), la reusamos
    if (!req.uploadDir) {
      const uniqueFolder = Date.now() + '-' + Math.round(Math.random() * 1E9);
      req.uploadDir = uniqueFolder;
    }

    const dir = path.join(__dirname, 'uploads', req.uploadDir);

    // Crear la carpeta físicamente si no existe
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Guardamos el archivo con su nombre original dentro de esa carpeta
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// PostgreSQL setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

// Función para inicializar la base de datos
const initializeDatabase = async () => {
  try {
    // Leemos el archivo init.sql
    const sqlPath = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Ejecutamos el SQL en la base de datos
    await pool.query(sql);
    console.log("✅ Database structure verified/created.");
  } catch (err) {
    console.error("❌ Error initializing the database:", err);
    // Es mejor detener el servidor si la base de datos no está lista
    process.exit(1);
  }
};

// Llamamos a la función antes de que el servidor empiece a escuchar
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});



// Routes
app.get("/", (req, res) => {
  res.send("SSX Assetory backend running 🚀");
});

app.get("/submissions", async (req, res) => {
  console.log("Petición recibida en GET /submissions"); // <--- Añade esto
  try {
    const result = await pool.query("SELECT * FROM assets ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post(
  "/submit",
  upload.fields([
    { name: "assetFiles", maxCount: 5 },
    { name: "representativeImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // 1. Extraemos con los nombres que vienen del Frontend (CamelCase)
      const {
        assetName, creatorName, keywords, email, story,
        assetType, creationMethod, copyright, acknowledgement,
      } = req.body;

      const folder = req.uploadDir; 
      
      // 2. Usamos los nombres correctos definidos en upload.fields arriba
      const representative_image = req.files['representativeImage'] 
        ? `${folder}/${req.files['representativeImage'][0].originalname}` 
        : null;

      const filesArray = req.files['assetFiles'] 
        ? req.files['assetFiles'].map(f => `${folder}/${f.originalname}`) 
        : [];

      const query = `
        INSERT INTO assets (asset_name, creator_name, keywords, email, story, asset_type, creation_method, copyright, acknowledgement, files, representative_image)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *;
      `;

      // 3. Mapeamos las variables CamelCase a la posición correcta del query
      const values = [
        assetName,        // $1
        creatorName,      // $2
        keywords,         // $3
        email,            // $4
        story,            // $5
        assetType,        // $6
        creationMethod,   // $7
        copyright,        // $8
        acknowledgement,  // $9
        JSON.stringify(filesArray), // $10
        representative_image        // $11
      ];

      const result = await pool.query(query, values);
      res.json({ success: true, data: result.rows[0] });

    } catch (err) {
      console.error("Error detallado:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

app.delete("/submissions/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Primero obtenemos la ruta de la carpeta antes de borrar el registro
    const getAsset = await pool.query("SELECT representative_image FROM assets WHERE id = $1", [id]);
    
    if (getAsset.rows.length > 0) {
      const filePath = getAsset.rows[0].representative_image;
      if (filePath) {
        // Extraemos el nombre de la carpeta (la parte antes del /)
        const folderName = filePath.split('/')[0];
        const folderPath = path.join(__dirname, 'uploads', folderName);

        // 2. Borramos la carpeta física y todo su contenido
        if (fs.existsSync(folderPath)) {
          fs.rmSync(folderPath, { recursive: true, force: true });
          console.log(`Carpeta borrada: ${folderPath}`);
        }
      }
    }

    // 3. Ahora sí, borramos el registro de la base de datos
    await pool.query("DELETE FROM assets WHERE id = $1", [id]);

    res.json({ success: true, message: "Entrada y archivos borrados correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Error al borrar" });
  }
});