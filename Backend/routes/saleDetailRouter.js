
// saleDetailRouter.js

const express = require('express');
const router = express.Router();
const saleDetailController = require('../controllers/saleDetailController');

// ======================================= SOLICITUD GET =======================================

// Obtener todos los detalles de ventas
router.get('/', saleDetailController.getSaleDetails);

// Obtener un detalle de venta por ID
router.get('/:id', saleDetailController.getSaleDetailById);

// Obtener detalles de venta por ID de venta (sale_id)
router.get('/sale/:sale_id', saleDetailController.getSaleDetailsBySaleId);

// ======================================= SOLICITUD POST =======================================

// Crear un nuevo detalle de venta
router.post('/', saleDetailController.createSaleDetail);

// ======================================= SOLICITUD PUT =======================================

// Actualizar un detalle de venta
router.put('/:id', saleDetailController.updateSaleDetail);

// ======================================= SOLICITUD DELETE =======================================

// Eliminar un detalle de venta
router.delete('/:id', saleDetailController.deleteSaleDetail);

module.exports = router;
