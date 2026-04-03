import db from '../config/database.js';

class Producto {
  // Obtener todos los productos activos
  static async findAll() {
    const result = await db.query('SELECT * FROM productos WHERE activo = true ORDER BY nombre');
    return result.rows;
  }

  // Obtener solo productos visibles en el menú
  static async findVisibles() {
    const result = await db.query('SELECT * FROM productos WHERE activo = true AND visible_en_menu = true ORDER BY nombre');
    return result.rows;
  }

  // Obtener producto por ID
  static async findById(id) {
    const result = await db.query('SELECT * FROM productos WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Crear nuevo producto
  static async create({ nombre, descripcion, precio, visible_en_menu = true }) {
    const result = await db.query(`
      INSERT INTO productos (nombre, descripcion, precio, visible_en_menu)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [nombre, descripcion, precio, visible_en_menu]);
    return result.rows[0];
  }

  // Actualizar producto
  static async update(id, { nombre, descripcion, precio, visible_en_menu }) {
    const result = await db.query(`
      UPDATE productos
      SET nombre = $1, descripcion = $2, precio = $3, visible_en_menu = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *
    `, [nombre, descripcion, precio, visible_en_menu, id]);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  }

  // Eliminar producto (soft delete)
  static async delete(id) {
    const result = await db.query(`
      UPDATE productos
      SET activo = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `, [id]);
    return result.rowCount > 0;
  }

  // Verificar si existe
  static async exists(id) {
    const result = await db.query('SELECT id FROM productos WHERE id = $1 AND activo = true', [id]);
    return result.rows.length > 0;
  }
}

export default Producto;
