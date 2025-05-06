
// categoryController.js

// Importamos el CategoryService
const categoryService = require('../services/categoryService');

class CategoryController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todas las categorías
    async getCategories(req, res, next) {
        try {
            const categories = await categoryService.getAllCategories();
            res.json(categories);
        } catch (error) {
            next(error);
        }
    }

    // Método para obtener una categoría por ID
    async getCategoryById(req, res, next) {
        const { id } = req.params;

        try {
            const category = await categoryService.getCategoryById(id);
            res.json(category);

        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO POST ==========================================

    // Método para agregar una nueva categoría
    async createCategory(req, res, next) {
        const { name, description } = req.body;
        
        try {
            const newCategory = await categoryService.addCategory({ name, description});
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO PUT ==========================================

    // Método para actualizar una categoría
    async updateCategory(req, res, next) {
        const { id } = req.params;
        const { name, description } = req.body;

        try {
            const updatedCategory = await categoryService.modifyCategory(id, { name, description});
            res.json(updatedCategory);

        } catch (error) {
            next(error);
        }
    }

    // ========================================== METODO DELETE ==========================================

    // Método para eliminar una categoría
    async deleteCategory(req, res, next) {
        const { id } = req.params;

        try {
            await categoryService.removeCategory(id);
            res.sendStatus(204); // Sin contenido
        } catch (error) {
            next(error);
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new CategoryController();
