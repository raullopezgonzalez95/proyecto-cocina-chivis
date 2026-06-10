import db from '../config/database.js';

class Venta {
  // Obtener todas las ventas con información del producto
  static async findAll({ fecha_inicio, fecha_fin, producto_id } = {}) {
    let query = `
      SELECT
        v.*,
        COALESCE(v.descripcion_personalizada, p.nombre) as producto_nombre,
        p.descripcion as producto_descripcion
      FROM ventas v
      LEFT JOIN productos p ON v.producto_id = p.id
      WHERE 1=1
    `;
    const params = [];

    if (fecha_inicio) {
      query += ' AND v.fecha >= $' + (params.length + 1);
      params.push(fecha_inicio);
    }

    if (fecha_fin) {
      query += ' AND v.fecha <= $' + (params.length + 1);
      params.push(fecha_fin);
    }

    if (producto_id) {
      query += ' AND v.producto_id = $' + (params.length + 1);
      params.push(producto_id);
    }

    query += ' ORDER BY v.fecha DESC, v.created_at DESC';

    const result = await db.query(query, params);
    return result.rows;
  }

  // Obtener venta por ID
  static async findById(id) {
    const result = await db.query(`
      SELECT
        v.*,
        COALESCE(v.descripcion_personalizada, p.nombre) as producto_nombre,
        p.descripcion as producto_descripcion
      FROM ventas v
      LEFT JOIN productos p ON v.producto_id = p.id
      WHERE v.id = $1
    `, [id]);
    return result.rows[0];
  }

  // Crear nueva venta
  static async create({ producto_id, cantidad, precio_unitario, fecha, notas, descripcion_personalizada }) {
    const total = cantidad * precio_unitario;
    const result = await db.query(`
      INSERT INTO ventas (producto_id, cantidad, precio_unitario, total, fecha, notas, descripcion_personalizada)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [producto_id, cantidad, precio_unitario, total, fecha, notas, descripcion_personalizada || null]);

    // Obtener con información del producto
    return this.findById(result.rows[0].id);
  }

  // Eliminar venta
  static async delete(id) {
    const result = await db.query('DELETE FROM ventas WHERE id = $1', [id]);
    return result.rowCount > 0;
  }

  // Obtener reporte de ventas por producto
  static async getReporte({ fecha_inicio, fecha_fin } = {}) {
    const params = [];
    let fechaCondition = '';
    let fechaConditionParams = '';

    if (fecha_inicio) {
      fechaCondition += ' AND v.fecha >= $' + (params.length + 1);
      params.push(fecha_inicio);
      fechaConditionParams += ' AND fecha >= $' + (params.length);
    }
    if (fecha_fin) {
      fechaCondition += ' AND v.fecha <= $' + (params.length + 1);
      params.push(fecha_fin);
      fechaConditionParams += ' AND fecha <= $' + (params.length);
    }

    // Query para productos del catálogo
    let productosQuery = `
      SELECT
        p.id,
        p.nombre,
        COUNT(v.id) as numero_ventas,
        SUM(v.cantidad) as cantidad_total,
        SUM(v.total) as ingresos_totales,
        AVG(v.precio_unitario) as precio_promedio
      FROM productos p
      LEFT JOIN ventas v ON p.id = v.producto_id ${fechaCondition ? 'WHERE 1=1' + fechaCondition : ''}
      GROUP BY p.id, p.nombre
      HAVING COUNT(v.id) > 0
      ORDER BY ingresos_totales DESC
    `;

    // Query para ventas libres (producto_id IS NULL)
    let ventasLibresQuery = `
      SELECT
        NULL as id,
        'Ventas Libres' as nombre,
        COUNT(*) as numero_ventas,
        SUM(cantidad) as cantidad_total,
        SUM(total) as ingresos_totales,
        AVG(precio_unitario) as precio_promedio
      FROM ventas
      WHERE producto_id IS NULL ${fechaConditionParams}
    `;

    // Combinar ambos resultados
    let combinedQuery = `
      SELECT * FROM (${productosQuery}) as productos
      UNION ALL
      ${ventasLibresQuery}
      ORDER BY ingresos_totales DESC
    `;

    const productosResult = await db.query(combinedQuery, params);

    // Calcular totales generales
    let totalQuery = `
      SELECT
        COUNT(id) as total_ventas,
        SUM(cantidad) as total_cantidad,
        SUM(total) as total_ingresos
      FROM ventas
      WHERE 1=1 ${fechaConditionParams}
    `;

    const totalesResult = await db.query(totalQuery, params);
    const totales = totalesResult.rows[0] || {};

    return {
      productos: productosResult.rows,
      totales: {
        total_ventas: totales.total_ventas || 0,
        total_cantidad: totales.total_cantidad || 0,
        total_ingresos: totales.total_ingresos || 0
      }
    };
  }
}

export default Venta;
