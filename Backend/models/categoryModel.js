
// categoryModel.js

// Importamos la DB
const db = require('../config/db');

// Estructura basica de tu CategoryModel 
class CategoryModel {

    // ============================= METODOS GET ==============================

    // Obtener todas las categorías
    async getAllCategories() {
        const result = await db.query('SELECT * FROM categories');
        return result.rows;
    }

    // Obtener una categoría por ID
    async getCategoryById(id) {
        const result = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
        return result.rows[0];
    }



    // ============================= METODO POST =============================

    // Crear una nueva categoría
    async createCategory(name) {
        const result = await db.query(
            `INSERT INTO categories (name)
             VALUES ($1)
             RETURNING *`,
            [name]
        );
        return result.rows[0];
    }



    // ============================= METODO PUT ==============================

    // Actualizar una categoría
    async updateCategory(id, name) {
        const result = await db.query(
            `UPDATE categories
             SET name = $1
             WHERE id = $2
             RETURNING *`,
            [name, id]
        );
        return result.rows[0];
    }



    // ============================ METODO DELETE ============================

    // Eliminar una categoría
    async deleteCategory(id) {
        await db.query('DELETE FROM categories WHERE id = $1', [id]);
    }
    
}

// Exportar una instancia de la clase CategoryModel
module.exports = new CategoryModel();
    