const express = require('express');         // Importamos express
const router = express.Router();            // Inicializamos rutas de express
const productController = require('../controllers/productController'); // Importamos instancia product controller

// Importamos el middleware auth
const authMiddleware = require('../middleware/autMiddleware');

// Proteger las rutas
router.use(authMiddleware);

// ======================================= SOLICITUD GET =======================================

router.get('/', productController.getProducts); 

router.get('/:id', productController.getProductById);



// ======================================= SOLICITUD POST =======================================

router.post('/', productController.createProduct);



// ======================================= SOLICITUD PUT =======================================

router.put('/:id', productController.updateProduct);
router.put('/stock/:id', productController.updateProductStock);



// ======================================= SOLICITUD DELETE =======================================

router.delete('/:id', productController.deleteProduct);



module.exports = router; // Exportamos el router products