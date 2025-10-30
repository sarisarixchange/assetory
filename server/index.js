import express from "express";
import cors from "cors";
import multer from "multer";
import pkg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const { Pool } = pkg;
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload setup
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// PostgreSQL setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

// Routes
app.get("/", (req, res) => {
  res.send("SSX Assetory backend running 🚀");
});

app.get("/submissions", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM myassets ORDER BY id DESC");
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
      const {
        assetName,
        creatorName,
        keywords,
        email,
        story,
        assetType,
        creationMethod,
        copyright,
        acknowledgement,
      } = req.body;

      const assetFiles = req.files.assetFiles?.map(f => f.filename) || [];
      const representativeImage = req.files.representativeImage?.[0]?.filename || null;

      const query = `
        INSERT INTO myassets (
          asset_name, creator_name, keywords, email, story,
          asset_type, creation_method, copyright, acknowledgement,
          files, representative_image
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING id
      `;

      const values = [
        assetName,
        creatorName,
        keywords,
        email,
        story,
        assetType,
        creationMethod,
        copyright,
        acknowledgement,
        JSON.stringify(assetFiles),
        representativeImage,
      ];

      const result = await pool.query(query, values);
      res.json({ success: true, id: result.rows[0].id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);


// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
