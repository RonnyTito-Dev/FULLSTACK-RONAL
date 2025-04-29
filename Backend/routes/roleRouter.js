
// roleRouter.js

const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// ======================================= SOLICITUD GET =======================================

// Obtener todos los roles
router.get('/', roleController.getRoles);

// Obtener un rol por ID
router.get('/:id', roleController.getRoleById);

// ======================================= SOLICITUD POST =======================================

// Crear un nuevo rol
router.post('/', roleController.createRole);

// ======================================= SOLICITUD PUT =======================================

// Actualizar un rol existente
router.put('/:id', roleController.updateRole);

// ======================================= SOLICITUD DELETE =======================================

// Eliminar un rol
router.delete('/:id', roleController.deleteRole);

module.exports = router;
