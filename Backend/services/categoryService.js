
// categoryService.js

// Importamos el Category Model
const categoryModel = require('../models/categoryModel');

// Importamos el handle error
const ApiError = require('../errors/apiError');

class CategoryService {

    // Metodo para obtener todas las categorías
    async getAllCategories(){
        const categories = await categoryModel.getAllCategories();
        if (!categories || categories.length === 0) {
            throw ApiError.notFound('No hay categorías disponibles');
        }
        return categories;
    }

    // Metodo para obtener una categoría por ID
    async getCategoryById(id){
        const category = await categoryModel.getCategoryById(id);
        if (!category) {
            throw ApiError.notFound(`Categoría con ID ${id} no encontrada`);
        }
        return category;
    }

    // Metodo para agregar una categoría
    async addCategory(data){
        if (!data.name || data.name.trim() === '') {
            throw ApiError.badRequest('El nombre de la categoría es requerido');
        }

        const exists = await categoryModel.getCategoryByName(data.name);
        if (exists) {
            throw ApiError.badRequest('La categoría ya existe');
        }

        return await categoryModel.createCategory(data);
    }

    // Metodo para editar una categoría
    async modifyCategory(id, data){
        if (!data.name || data.name.trim() === '') {
            throw ApiError.badRequest('El nombre de la categoría es requerido');
        }

        const existingCategory = await categoryModel.getCategoryById(id);

        if (!existingCategory) {
            throw ApiError.notFound(`Categoría con ID ${id} no encontrada`);
        }

        return await categoryModel.updateCategory(id, data);
    }

    // Metodo para eliminar una categoría
    async removeCategory(id){
        const existing = await categoryModel.getCategoryById(id);
        if (!existing) {
            throw ApiError.notFound(`Categoría con ID ${id} no encontrada`);
        }

        await categoryModel.deleteCategory(id);
    }

}

// Exportamos una instancia de CategoryService
module.exports = new CategoryService();
    