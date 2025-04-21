const express = require('express');         // Importamos express
const router = express.Router();            // Inicializamos rutas de express
const productController = require('../controllers/productController'); // Importamos instancia product controller


// ======================================= SOLICITUD GET =======================================

router.get('/', productController.getProducts); 

router.get('/:id', productController.getProductById);



// ======================================= SOLICITUD POST =======================================

router.post('/', productController.createProduct);



// ======================================= SOLICITUD PUT =======================================

router.put('/:id', productController.updateProduct);



// ======================================= SOLICITUD DELETE =======================================

router.delete('/:id', productController.deleteProduct);



module.exports = router; // Exportamos el router products