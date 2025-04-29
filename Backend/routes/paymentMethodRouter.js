
// paymentMethodRouter.js

const express = require('express');
const router = express.Router();
const paymentMethodController = require('../controllers/paymentMethodController');

// ======================================= SOLICITUD GET =======================================

// Obtener todos los métodos de pago
router.get('/', paymentMethodController.getPaymentMethods);

// Obtener un método de pago por ID
router.get('/:id', paymentMethodController.getPaymentMethodById);

// ======================================= SOLICITUD POST =======================================

// Crear un nuevo método de pago
router.post('/', paymentMethodController.createPaymentMethod);

// ======================================= SOLICITUD PUT =======================================

// Actualizar un método de pago existente
router.put('/:id', paymentMethodController.updatePaymentMethod);

// ======================================= SOLICITUD DELETE =======================================

// Eliminar un método de pago
router.delete('/:id', paymentMethodController.deletePaymentMethod);

module.exports = router;
