
// customerRouter.js

const express = require('express'); // Importamos express
const router = express.Router(); // Inicializamos rutas de express
const customerController = require('../controllers/customerController'); // Importamos el controlador de clientes

// Importamos el middleware auth
const authMiddleware = require('../middleware/autMiddleware');

// Proteger las rutas
router.use(authMiddleware);

// ======================================= SOLICITUD GET =======================================

// Obtener todos los clientes
router.get('/', customerController.getCustomers);

// Obtener un cliente por ID
router.get('/:id', customerController.getCustomerById);

// ======================================= SOLICITUD POST =======================================

// Crear un nuevo cliente
router.post('/', customerController.createCustomer);

// ======================================= SOLICITUD PUT =======================================

// Actualizar un cliente existente
router.put('/:id', customerController.updateCustomer);

// ======================================= SOLICITUD DELETE =======================================

// Eliminar un cliente
router.delete('/:id', customerController.deleteCustomer);

module.exports = router; // Exportamos el router
