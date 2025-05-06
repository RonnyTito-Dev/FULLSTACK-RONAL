
// movementReasonRouter.js

const express = require('express');          // Importamos express
const router = express.Router();             // Inicializamos rutas de express
const movementReasonController = require('../controllers/movementReasonController'); // Importamos instancia movementReason controller

// Importamos el middleware auth
const authMiddleware = require('../middleware/autMiddleware');

// Proteger las rutas
router.use(authMiddleware);

// ======================================= SOLICITUD GET =======================================

router.get('/', movementReasonController.getMovementReasons); 

router.get('/:id', movementReasonController.getMovementReasonById);

// ======================================= SOLICITUD POST =======================================

router.post('/', movementReasonController.createMovementReason);

// ======================================= SOLICITUD PUT =======================================

router.put('/:id', movementReasonController.updateMovementReason);

// ======================================= SOLICITUD DELETE =======================================

router.delete('/:id', movementReasonController.deleteMovementReason);

module.exports = router; // Exportamos el router movementReasons
