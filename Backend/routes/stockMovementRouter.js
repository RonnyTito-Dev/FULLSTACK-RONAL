
// stockMovementRouter.js

const express = require('express');
const router = express.Router();
const stockMovementController = require('../controllers/stockMovementController');

// Importamos el middleware auth
const authMiddleware = require('../middleware/autMiddleware');

// Proteger las rutas
router.use(authMiddleware);

// ======================================= SOLICITUDES GET =======================================

// Obtener todos los movimientos de stock
router.get('/', stockMovementController.getAllStockMovements);

// Obtener un movimiento de stock por ID
router.get('/:id', stockMovementController.getStockMovementById);

// Obtener movimientos de stock por ID de producto
router.get('/product/:product_id', stockMovementController.getStockMovementsByProductId);

// Obtener movimientos de stock por tipo (in/out)
router.get('/type/:type', stockMovementController.getStockMovementsByType);

// Obtener movimientos de stock por ID de usuario
router.get('/user/:user_id', stockMovementController.getStockMovementsByUserId);

// ======================================= SOLICITUD POST =======================================

// Crear un nuevo movimiento de stock
router.post('/', stockMovementController.createStockMovement);

// ======================================= SOLICITUD PUT =======================================

// Actualizar un movimiento de stock
router.put('/:id', stockMovementController.updateStockMovement);

// ======================================= SOLICITUD DELETE =======================================

// Eliminar un movimiento de stock
router.delete('/:id', stockMovementController.deleteStockMovement);

module.exports = router;
