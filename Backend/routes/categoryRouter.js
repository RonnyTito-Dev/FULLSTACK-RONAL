
// categoryRouter.js

const express = require('express'); // Importamos express
const router = express.Router(); // Inicializamos rutas de express
const categoryController = require('../controllers/categoryController'); // Importamos el controlador de categorías

// ======================================= SOLICITUD GET =======================================

// Obtener todas las categorías
router.get('/', categoryController.getCategories);

// Obtener una categoría por ID
router.get('/:id', categoryController.getCategoryById);

// ======================================= SOLICITUD POST =======================================

// Crear una nueva categoría
router.post('/', categoryController.createCategory);

// ======================================= SOLICITUD PUT =======================================

// Actualizar una categoría existente
router.put('/:id', categoryController.updateCategory);

// ======================================= SOLICITUD DELETE =======================================

// Eliminar una categoría
router.delete('/:id', categoryController.deleteCategory);

module.exports = router; // Exportamos el router
