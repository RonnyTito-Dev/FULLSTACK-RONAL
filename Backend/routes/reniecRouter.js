const express = require('express');
const router = express.Router();
const reniecController = require('../controllers/reniecController');

// Importamos el middleware auth
const authMiddleware = require('../middleware/autMiddleware');

// Proteger las rutas
router.use(authMiddleware);

// Ruta para obtener datos por DNI
router.get('/:dni', reniecController.getByDni);

module.exports = router;
