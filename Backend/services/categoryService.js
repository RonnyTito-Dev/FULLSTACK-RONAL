
// categoryService.js

// Importamos el Category Model
const categoryModel = require('../models/categoryModel');

class CategoryService {

    // Metodo para obtener todas las categorías
    async getCategories(){
        return await categoryModel.getAllCategories();
    }

    // Metodo para obtener una categoría por ID
    async getCategoryById(id){
        return await categoryModel.getCategoryById(id);
    }

    // Metodo para agregar una categoría
    async addCategory(data){
        return await categoryModel.createCategory(data);
    }

    // Metodo para editar una categoría
    async modifyCategory(id, data){
        return await categoryModel.updateCategory(id, data);
    }

    // Metodo para eliminar una categoría
    async removeCategory(id){
        await categoryModel.deleteCategory(id);
    }

}

// Exportamos una instancia de CategoryService
module.exports = new CategoryService();
    