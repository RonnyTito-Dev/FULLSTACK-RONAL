const express = require('express');         // Importamos express
const router = express.Router();            // Inicializamos rutas de express
const productController = require('../controllers/productController'); // Importamos instancia product controller


// ======================================= SOLICITUD GET =======================================

router.get('/', (req, res) => productController.getProducts(req, res)); 

router.get('/:id', (req, res) => productController.getProductById(req, res));



// ======================================= SOLICITUD POST =======================================

router.post('/', (req, res) => productController.createProduct(req, res));



// ======================================= SOLICITUD PUT =======================================

router.put('/:id', (req, res) => productController.updateProduct(req, res));



// ======================================= SOLICITUD DELETE =======================================

router.delete('/:id', (req, res) => productController.deleteProduct(req, res));



module.exports = router; // Exportamos el router products