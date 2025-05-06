// userRouter.js

const express = require('express');
const router = express.Router();

// Importamos el UserController
const userController = require('../controllers/userController');

// Importamos el middleware auth
const authMiddleware = require('../middleware/autMiddleware');

// Proteger las rutas
router.use(authMiddleware);

// ============================= RUTAS GET ==============================

// Obtener todos los usuarios
router.get('/', userController.getUsers);

// Obtener un usuario por ID
router.get('/:id', userController.getUserById);

// Obtener un usuario por email
router.get('/email/:email', userController.getUserByEmail);

// ============================= RUTAS POST ==============================

// Crear un nuevo usuario
router.post('/', userController.createUser);

// ============================= RUTAS PUT ==============================

// Actualizar los datos de un usuario
router.put('/:id', userController.updateUser);

// Actualizar la contraseña de un usuario
router.put('/password/:id', userController.updatePassword);

// ============================= RUTA DELETE ==============================

// Eliminar un usuario
router.delete('/:id', userController.deleteUser);

module.exports = router;
