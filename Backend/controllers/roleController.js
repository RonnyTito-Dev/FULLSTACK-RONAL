
// roleController.js

// Importamos el RoleService
const roleService = require('../services/roleService');

// Importamos nuestra instancia de errores
const ApiError = require('../errors/apiError');

class RoleController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todos los roles
    async getRoles(req, res, next) {
        try {
            const roles = await roleService.getRoles();
            res.json(roles);
        } catch (error) {
            next(ApiError.internal('Error al obtener los roles'));
        }
    }

    // Método para obtener un rol por ID
    async getRoleById(req, res, next) {
        const { id } = req.params;

        try {
            const role = await roleService.getRoleById(id);

            if (!role) {
                return next(ApiError.notFound('Rol no encontrado'));
            }

            res.json(role);

        } catch (error) {
            next(ApiError.internal('Error al obtener el rol'));
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
            next(ApiError.internal('Error al crear el rol'));
        }
    }

    // ========================================== METODO PUT ==========================================

    // Método para actualizar un rol
    async updateRole(req, res, next) {
        const { id } = req.params;
        const { name, description } = req.body;

        try {
            const updatedRole = await roleService.modifyRole(id, { name, description });

            if (!updatedRole) {
                return next(ApiError.notFound('Rol no encontrado para actualizar'));
            }

            res.json(updatedRole);

        } catch (error) {
            next(ApiError.internal('Error al actualizar el rol'));
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
            next(ApiError.internal('Error al eliminar el rol'));
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new RoleController();
