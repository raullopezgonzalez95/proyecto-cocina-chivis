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
  body('producto_id')
    .isInt({ min: 1 }).withMessage('ID de producto inválido')
    .toInt(),
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
