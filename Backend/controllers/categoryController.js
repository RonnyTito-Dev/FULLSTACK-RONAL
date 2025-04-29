
// categoryController.js

// Importamos el CategoryService
const categoryService = require('../services/categoryService');

// Importamos nuestra instancia de errores
const ApiError = require('../errors/apiError');

class CategoryController {

    // ========================================== METODOS GET ==========================================

    // Método para obtener todas las categorías
    async getCategories(req, res, next) {
        try {
            const categories = await categoryService.getAllCategories();
            res.json(categories);
        } catch (error) {
            next(ApiError.internal('Error al obtener las categorías'));
        }
    }

    // Método para obtener una categoría por ID
    async getCategoryById(req, res, next) {
        const { id } = req.params;

        try {
            const category = await categoryService.getCategoryById(id);

            if (!category) {
                return next(ApiError.notFound('Categoría no encontrada'));
            }

            res.json(category);

        } catch (error) {
            next(ApiError.internal('Error al obtener la categoría'));
        }
    }

    // ========================================== METODO POST ==========================================

    // Método para agregar una nueva categoría
    async createCategory(req, res, next) {
        const { name } = req.body;

        try {
            const newCategory = await categoryService.createCategory(name);
            res.status(201).json(newCategory);
        } catch (error) {
            next(ApiError.internal('Error al crear la categoría'));
        }
    }

    // ========================================== METODO PUT ==========================================

    // Método para actualizar una categoría
    async updateCategory(req, res, next) {
        const { id } = req.params;
        const { name } = req.body;

        try {
            const updatedCategory = await categoryService.updateCategory(id, name);

            if (!updatedCategory) {
                return next(ApiError.notFound('Categoría no encontrada para actualizar'));
            }

            res.json(updatedCategory);

        } catch (error) {
            next(ApiError.internal('Error al actualizar la categoría'));
        }
    }

    // ========================================== METODO DELETE ==========================================

    // Método para eliminar una categoría
    async deleteCategory(req, res, next) {
        const { id } = req.params;

        try {
            await categoryService.deleteCategory(id);
            res.sendStatus(204); // Sin contenido
        } catch (error) {
            next(ApiError.internal('Error al eliminar la categoría'));
        }
    }
}

// Exportamos la instancia de la clase
module.exports = new CategoryController();
