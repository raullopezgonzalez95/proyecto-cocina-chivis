import db from '../config/database.js';

class Venta {
  // Obtener todas las ventas con información del producto
  static findAll({ fecha_inicio, fecha_fin, producto_id } = {}) {
    let query = `
      SELECT
        v.*,
        p.nombre as producto_nombre,
        p.descripcion as producto_descripcion
      FROM ventas v
      JOIN productos p ON v.producto_id = p.id
      WHERE 1=1
    `;
    const params = [];

    if (fecha_inicio) {
      query += ' AND v.fecha >= ?';
      params.push(fecha_inicio);
    }

    if (fecha_fin) {
      query += ' AND v.fecha <= ?';
      params.push(fecha_fin);
    }

    if (producto_id) {
      query += ' AND v.producto_id = ?';
      params.push(producto_id);
    }

    query += ' ORDER BY v.fecha DESC, v.created_at DESC';

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  // Obtener venta por ID
  static findById(id) {
    const stmt = db.prepare(`
      SELECT
        v.*,
        p.nombre as producto_nombre,
        p.descripcion as producto_descripcion
      FROM ventas v
      JOIN productos p ON v.producto_id = p.id
      WHERE v.id = ?
    `);
    return stmt.get(id);
  }

  // Crear nueva venta
  static create({ producto_id, cantidad, precio_unitario, fecha, notas }) {
    const total = cantidad * precio_unitario;
    const stmt = db.prepare(`
      INSERT INTO ventas (producto_id, cantidad, precio_unitario, total, fecha, notas)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(producto_id, cantidad, precio_unitario, total, fecha, notas);
    return this.findById(result.lastInsertRowid);
  }

  // Eliminar venta
  static delete(id) {
    const stmt = db.prepare('DELETE FROM ventas WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  // Obtener reporte de ventas por producto
  static getReporte({ fecha_inicio, fecha_fin } = {}) {
    let query = `
      SELECT
        p.id,
        p.nombre,
        COUNT(v.id) as numero_ventas,
        SUM(v.cantidad) as cantidad_total,
        SUM(v.total) as ingresos_totales,
        AVG(v.precio_unitario) as precio_promedio
      FROM productos p
      LEFT JOIN ventas v ON p.id = v.producto_id
    `;
    const params = [];

    if (fecha_inicio || fecha_fin) {
      query += ' WHERE 1=1';
      if (fecha_inicio) {
        query += ' AND (v.fecha >= ? OR v.fecha IS NULL)';
        params.push(fecha_inicio);
      }
      if (fecha_fin) {
        query += ' AND (v.fecha <= ? OR v.fecha IS NULL)';
        params.push(fecha_fin);
      }
    }

    query += `
      GROUP BY p.id, p.nombre
      HAVING numero_ventas > 0
      ORDER BY ingresos_totales DESC
    `;

    const stmt = db.prepare(query);
    const productos = stmt.all(...params);

    // Calcular totales generales
    const totalStmt = db.prepare(`
      SELECT
        COUNT(id) as total_ventas,
        SUM(cantidad) as total_cantidad,
        SUM(total) as total_ingresos
      FROM ventas
      WHERE 1=1
      ${fecha_inicio ? 'AND fecha >= ?' : ''}
      ${fecha_fin ? 'AND fecha <= ?' : ''}
    `);

    const totalesParams = [];
    if (fecha_inicio) totalesParams.push(fecha_inicio);
    if (fecha_fin) totalesParams.push(fecha_fin);

    const totales = totalStmt.get(...totalesParams);

    return {
      productos,
      totales: {
        total_ventas: totales.total_ventas || 0,
        total_cantidad: totales.total_cantidad || 0,
        total_ingresos: totales.total_ingresos || 0
      }
    };
  }
}

export default Venta;
