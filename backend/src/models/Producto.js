import db from '../config/database.js';

class Producto {
  // Obtener todos los productos activos
  static findAll() {
    const stmt = db.prepare('SELECT * FROM productos WHERE activo = 1 ORDER BY nombre');
    return stmt.all();
  }

  // Obtener solo productos visibles en el menú
  static findVisibles() {
    const stmt = db.prepare('SELECT * FROM productos WHERE activo = 1 AND visible_en_menu = 1 ORDER BY nombre');
    return stmt.all();
  }

  // Obtener producto por ID
  static findById(id) {
    const stmt = db.prepare('SELECT * FROM productos WHERE id = ?');
    return stmt.get(id);
  }

  // Crear nuevo producto
  static create({ nombre, descripcion, precio, visible_en_menu = true }) {
    const stmt = db.prepare(`
      INSERT INTO productos (nombre, descripcion, precio, visible_en_menu)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(nombre, descripcion, precio, visible_en_menu ? 1 : 0);
    return this.findById(result.lastInsertRowid);
  }

  // Actualizar producto
  static update(id, { nombre, descripcion, precio, visible_en_menu }) {
    const stmt = db.prepare(`
      UPDATE productos
      SET nombre = ?, descripcion = ?, precio = ?, visible_en_menu = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    const result = stmt.run(nombre, descripcion, precio, visible_en_menu ? 1 : 0, id);
    if (result.changes === 0) {
      return null;
    }
    return this.findById(id);
  }

  // Eliminar producto (soft delete)
  static delete(id) {
    const stmt = db.prepare(`
      UPDATE productos
      SET activo = 0, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    const result = stmt.run(id);
    return result.changes > 0;
  }

  // Verificar si existe
  static exists(id) {
    const stmt = db.prepare('SELECT id FROM productos WHERE id = ? AND activo = 1');
    return stmt.get(id) !== undefined;
  }
}

export default Producto;
