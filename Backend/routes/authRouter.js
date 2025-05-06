
// authRouter.js

// Importamos express
const express = require('express');

// Inicializamos rutas de express
const router = express.Router();

// importamos Auth Controller
const authController = require('../controllers/authController');

// Importamos el middleware auth
const authMiddleware = require('../middleware/autMiddleware');

// ================================= METODOS POST ==================================

// Ruta para login
router.post('/login', authController.login);

// Ruta para el me
router.get('/me', authMiddleware, authController.me);

// Ruta para logout
router.post('/logout', authController.logout);



// Exportar router auth
module.exports = router;