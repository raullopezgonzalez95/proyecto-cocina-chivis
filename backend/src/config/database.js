import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = process.env.DB_PATH || join(__dirname, '../../database.sqlite');
const db = new Database(dbPath);

// Habilitar foreign keys
db.pragma('foreign_keys = ON');

// Crear tablas si no existen
const initDatabase = () => {
  // Tabla de productos
  db.exec(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre VARCHAR(255) NOT NULL,
      descripcion TEXT,
      precio DECIMAL(10, 2) NOT NULL,
      activo BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabla de ventas
  db.exec(`
    CREATE TABLE IF NOT EXISTS ventas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      producto_id INTEGER NOT NULL,
      cantidad INTEGER NOT NULL,
      precio_unitario DECIMAL(10, 2) NOT NULL,
      total DECIMAL(10, 2) NOT NULL,
      fecha DATE NOT NULL,
      notas TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (producto_id) REFERENCES productos(id)
    )
  `);

  // Agregar columna visible_en_menu si no existe (para productos existentes)
  try {
    db.exec(`
      ALTER TABLE productos ADD COLUMN visible_en_menu BOOLEAN DEFAULT 1
    `);
    console.log('✅ Columna visible_en_menu agregada');
  } catch (error) {
    // La columna ya existe, no hacer nada
    if (!error.message.includes('duplicate column name')) {
      console.error('Error al agregar columna:', error.message);
    }
  }

  console.log('✅ Base de datos inicializada correctamente');
};

// Inicializar base de datos al importar
initDatabase();

export default db;
