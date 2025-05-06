
// logRouter.js

const express = require('express'); // Importamos express
const router = express.Router(); // Inicializamos rutas de express
const logController = require('../controllers/logController'); // Importamos el controlador de logs

// Importamos el middleware auth
const authMiddleware = require('../middleware/autMiddleware');

// Proteger las rutas
router.use(authMiddleware);

// ======================================= SOLICITUD GET =======================================

// Obtener todos los logs
router.get('/', logController.getLogs);

// Obtener un log por ID
router.get('/:id', logController.getLogById);

// Obtener logs por ID de usuario
router.get('/user/:user_id', logController.getLogsByUserId);

// ======================================= SOLICITUD POST =======================================

// Crear un nuevo log
router.post('/', logController.createLog);

module.exports = router; // Exportamos el router
