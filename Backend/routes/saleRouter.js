
// saleRouter.js

const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

// Importamos el middleware auth
const authMiddleware = require('../middleware/autMiddleware');

// Proteger las rutas
router.use(authMiddleware);

// ======================================= SOLICITUD GET =======================================

// Obtener todas las ventas
router.get('/', saleController.getAllSales);

// Obtener una venta por ID
router.get('/:id', saleController.getSaleById);

// Obtener ventas por ID de usuario
router.get('/user/:user_id', saleController.getSalesByUserId);

// Obtener ventas por ID de cliente
router.get('/customer/:customer_id', saleController.getSalesByCustomerId);

// Obtener ventas por método de pago
router.get('/payment-method/:payment_method_id', saleController.getSalesByPaymentMethod);

// ======================================= SOLICITUD POST =======================================

// Crear una nueva venta
router.post('/', saleController.createSale);

// ======================================= SOLICITUD PUT =======================================

// Actualizar una venta
router.put('/:id', saleController.updateSale);

// ======================================= SOLICITUD DELETE =======================================

// Eliminar una venta
router.delete('/:id', saleController.deleteSale);

module.exports = router;
