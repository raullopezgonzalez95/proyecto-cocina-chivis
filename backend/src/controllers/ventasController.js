import Venta from '../models/Venta.js';
import Producto from '../models/Producto.js';
import { validationResult } from 'express-validator';

export const obtenerVentas = (req, res) => {
  try {
    const { fecha_inicio, fecha_fin, producto_id } = req.query;
    const ventas = Venta.findAll({ fecha_inicio, fecha_fin, producto_id });
    res.json(ventas);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
};

export const crearVenta = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { producto_id, cantidad, fecha, notas } = req.body;

    // Verificar que el producto existe
    const producto = Producto.findById(producto_id);
    if (!producto || !producto.activo) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Usar el precio actual del producto
    const precio_unitario = producto.precio;

    const venta = Venta.create({
      producto_id,
      cantidad,
      precio_unitario,
      fecha,
      notas
    });

    res.status(201).json(venta);
  } catch (error) {
    console.error('Error al crear venta:', error);
    res.status(500).json({ error: 'Error al crear venta' });
  }
};

export const eliminarVenta = (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = Venta.delete(id);

    if (!eliminado) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    res.json({ message: 'Venta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar venta:', error);
    res.status(500).json({ error: 'Error al eliminar venta' });
  }
};

export const obtenerReporte = (req, res) => {
  try {
    const { fecha_inicio, fecha_fin } = req.query;
    const reporte = Venta.getReporte({ fecha_inicio, fecha_fin });
    res.json(reporte);
  } catch (error) {
    console.error('Error al obtener reporte:', error);
    res.status(500).json({ error: 'Error al obtener reporte' });
  }
};
