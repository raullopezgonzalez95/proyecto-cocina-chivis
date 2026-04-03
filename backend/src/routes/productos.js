import express from 'express';
import { body } from 'express-validator';
import {
  obtenerProductos,
  obtenerProductosVisibles,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../controllers/productosController.js';

const router = express.Router();

// Validaciones
const validacionProducto = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ max: 255 }).withMessage('El nombre no puede exceder 255 caracteres'),
  body('descripcion')
    .optional()
    .trim(),
  body('precio')
    .isFloat({ min: 0.01 }).withMessage('El precio debe ser mayor a 0')
    .toFloat()
];

// Rutas
router.get('/', obtenerProductos);
router.get('/visibles/menu', obtenerProductosVisibles); // Debe ir antes de /:id
router.get('/:id', obtenerProducto);
router.post('/', validacionProducto, crearProducto);
router.put('/:id', validacionProducto, actualizarProducto);
router.delete('/:id', eliminarProducto);

export default router;
