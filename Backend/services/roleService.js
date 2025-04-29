
// roleService.js

// Importamos el Role Model
const roleModel = require('../models/roleModel');

class RoleService {

    // Metodo para obtener todos los Roles
    async getRoles(){
        return await roleModel.getAllRoles();
    }


    // Metodo para obtner un Role por id
    async getRoleById(id){
        return await roleModel.getRoleById(id);
    }

    // Metodo para agregar un Role
    async addRole(data){
        return await roleModel.createRole(data);
    }

    // Metodo para editar un Role
    async modifyRole(id, data){
        return await roleModel.updateRole(id, data);
    }

    // Metodo para eliminar un Role
    async removeRole(id){
        await roleModel.deleteRole(id);
    }

}

// Exportamos una instancia de RoleService
module.exports = new RoleService();
    