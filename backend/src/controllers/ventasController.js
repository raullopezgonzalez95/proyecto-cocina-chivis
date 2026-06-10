import Venta from '../models/Venta.js';
import Producto from '../models/Producto.js';
import { validationResult } from 'express-validator';

export const obtenerVentas = async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin, producto_id } = req.query;
    const ventas = await Venta.findAll({ fecha_inicio, fecha_fin, producto_id });
    res.json(ventas);
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
};

export const crearVenta = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { es_venta_libre, producto_id, cantidad, fecha, notas, descripcion, precio_unitario } = req.body;

    let precioFinal;
    let descripcionPersonalizada = null;

    const esVentaLibre = es_venta_libre === true || es_venta_libre === 'true';

    if (esVentaLibre) {
      // Venta libre: usar precio y descripcion del body
      if (!descripcion || !precio_unitario) {
        return res.status(400).json({ error: 'Descripción y precio son requeridos para venta libre' });
      }
      precioFinal = parseFloat(precio_unitario);
      descripcionPersonalizada = descripcion;
    } else {
      // Venta normal: verificar que el producto existe
      const producto = await Producto.findById(producto_id);
      if (!producto || !producto.activo) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      precioFinal = parseFloat(producto.precio);
    }

    const venta = await Venta.create({
      producto_id: esVentaLibre ? null : producto_id,
      cantidad,
      precio_unitario: precioFinal,
      fecha,
      notas,
      descripcion_personalizada: descripcionPersonalizada
    });

    res.status(201).json(venta);
  } catch (error) {
    console.error('Error al crear venta:', error);
    res.status(500).json({ error: 'Error al crear venta' });
  }
};

export const eliminarVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Venta.delete(id);

    if (!eliminado) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }

    res.json({ message: 'Venta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar venta:', error);
    res.status(500).json({ error: 'Error al eliminar venta' });
  }
};

export const obtenerReporte = async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin } = req.query;
    const reporte = await Venta.getReporte({ fecha_inicio, fecha_fin });
    res.json(reporte);
  } catch (error) {
    console.error('Error al obtener reporte:', error);
    res.status(500).json({ error: 'Error al obtener reporte' });
  }
};
