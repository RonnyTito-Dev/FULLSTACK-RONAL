
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


    // Obtener una categoría por Nombre
    async getCategoryByName(name) {
        const result = await db.query('SELECT * FROM categories WHERE name = $1', [name]);
        return result.rows[0];
    }



    // ============================= METODO POST =============================

    // Crear una nueva categoría
    async createCategory({ name, description }) {
        const result = await db.query(
            `INSERT INTO categories (name, description)
             VALUES ($1, $2)
             RETURNING *`,
            [name, description]
        );
        return result.rows[0];
    }



    // ============================= METODO PUT ==============================

    // Actualizar una categoría
    async updateCategory(id, { name, description}) {
        const result = await db.query(
            `UPDATE categories
             SET name = $1, description = $2
             WHERE id = $3
             RETURNING *`,
            [name, description, id]
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
    