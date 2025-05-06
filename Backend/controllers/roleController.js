
// roleController.js

// Importamos el RoleService
const roleService = require('../services/roleService');


class RoleController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todos los roles
    async getRoles(req, res, next) {
        try {
            const roles = await roleService.getRoles();
            res.json(roles);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener un rol por ID
    async getRoleById(req, res, next) {
        const { id } = req.params;

        try {
            const role = await roleService.getRoleById(id);
            res.json(role);

        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO POST ==========================================

    // Método para agregar un nuevo rol
    async createRole(req, res, next) {
        const { name, description } = req.body;

        try {
            const newRole = await roleService.addRole({ name, description });
            res.status(201).json(newRole);
        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO PUT ==========================================

    // Método para actualizar un rol
    async updateRole(req, res, next) {
        const { id } = req.params;
        const { name, description } = req.body;

        try {
            const updatedRole = await roleService.modifyRole(id, { name, description });
            res.json(updatedRole);

        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO DELETE ==========================================

    // Método para eliminar un rol
    async deleteRole(req, res, next) {
        const { id } = req.params;

        try {
            await roleService.removeRole(id);
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new RoleController();
