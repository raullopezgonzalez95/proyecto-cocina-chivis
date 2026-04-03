import Producto from '../models/Producto.js';
import { validationResult } from 'express-validator';

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

export const obtenerProductosVisibles = async (req, res) => {
  try {
    const productos = await Producto.findVisibles();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos visibles:', error);
    res.status(500).json({ error: 'Error al obtener productos visibles' });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findById(id);

    if (!producto || !producto.activo) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, descripcion, precio, visible_en_menu } = req.body;
    const producto = await Producto.create({ nombre, descripcion, precio, visible_en_menu });

    res.status(201).json(producto);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { nombre, descripcion, precio, visible_en_menu } = req.body;

    const producto = await Producto.update(id, { nombre, descripcion, precio, visible_en_menu });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Producto.delete(id);

    if (!eliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
