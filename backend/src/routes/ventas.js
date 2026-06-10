import express from 'express';
import { body } from 'express-validator';
import {
  obtenerVentas,
  crearVenta,
  eliminarVenta,
  obtenerReporte
} from '../controllers/ventasController.js';

const router = express.Router();

// Validaciones
const validacionVenta = [
  body('es_venta_libre')
    .optional()
    .isBoolean().withMessage('es_venta_libre debe ser true o false')
    .toBoolean(),
  body('producto_id')
    .if((value, { req }) => req.body.es_venta_libre !== true)
    .isInt({ min: 1 }).withMessage('ID de producto inválido')
    .toInt(),
  body('descripcion')
    .if((value, { req }) => req.body.es_venta_libre === true)
    .notEmpty().withMessage('La descripción es requerida para venta libre')
    .trim(),
  body('precio_unitario')
    .if((value, { req }) => req.body.es_venta_libre === true)
    .isFloat({ min: 0.01 }).withMessage('El precio debe ser mayor a 0')
    .toFloat(),
  body('cantidad')
    .isInt({ min: 1 }).withMessage('La cantidad debe ser mayor a 0')
    .toInt(),
  body('fecha')
    .isDate().withMessage('Fecha inválida'),
  body('notas')
    .optional()
    .trim()
];

// Rutas
router.get('/', obtenerVentas);
router.get('/reporte', obtenerReporte);
router.post('/', validacionVenta, crearVenta);
router.delete('/:id', eliminarVenta);

export default router;
