
// roleService.js

// Importamos el Role Model
const roleModel = require('../models/roleModel');

const ApiError = require('../errors/apiError');

class RoleService {

    // Metodo para obtener todos los Roles
    async getRoles(){
        const roles = await roleModel.getAllRoles();
        if (!roles || roles.length === 0) {
            throw ApiError.notFound('No hay roles disponibles');
        }
        return roles;
    }


    // Metodo para obtner un Role por id
    async getRoleById(id){
        const role = await roleModel.getRoleById(id);
        if (!role) {
            throw ApiError.notFound(`Rol con ID ${id} no encontrado`);
        }
        return role;
    }

    // Metodo para agregar un Role
    async addRole(data){
        if (!data.name) {
            throw ApiError.badRequest('Nombre del rol es requerido');
        }

        const existingName = await roleModel.getRoleByName(data.name);
        
        if (existingName) {
            throw ApiError.conflict(`El rol con el nombre ${data.name} ya existe`);
        }

        return await roleModel.createRole(data);
    }

    // Metodo para editar un Role
    async modifyRole(id, data){
        if (!data.name) {
            throw ApiError.badRequest('Nombre de rol es requerido');
        }

        const existing = await roleModel.getRoleById(id);
        if (!existing) {
            throw ApiError.notFound(`No se encontró el rol con ID ${id}`);
        }

        const existingName = await roleModel.getRoleByName(data.name);
        if (existingName) {
            throw ApiError.conflict(`El rol con el nombre ${data.name} ya existe`);
        }

        return await roleModel.updateRole(id, data);
    }

    // Metodo para eliminar un Role
    async removeRole(id){
        const existing = await roleModel.getRoleById(id);
        if (!existing) {
            throw ApiError.notFound(`No se encontró el rol con ID ${id}`);
        }

        await roleModel.deleteRole(id);
    }

}

// Exportamos una instancia de RoleService
module.exports = new RoleService();
    