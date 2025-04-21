const db = require('../config/db'); // Importamos la DB

class ProductModel {

    //======================================= METODOS GET =======================================

    // Metodo para obtener todos los registros
    async getAllProducts(){
        const result = await db.query('SELECT * FROM products');
        return result.rows;
    }

    // Metodo para obtener un producto por ID
    async getProductById(id){
        const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    }



    //======================================= METODO POST =======================================

    // Metodo para agregar un nuevo producto
    async createProduct({ nombre, precio, descripcion }){
        const result = await db.query('INSERT INTO products (nombre, precio, descripcion) VALUES ($1, $2, $3) RETURNING *', [nombre, precio, descripcion]);
        return result.rows[0];
    }



    //======================================= METODO PUT =======================================

    // Metodo para actualizar un producto
    async updateProduct(id, { nombre, precio, descripcion }){
        const result = await db.query('UPDATE products SET nombre = $1, precio = $2, descripcion = $3 WHERE id = $4 RETURNING *', [nombre, precio, descripcion, id]);
        return result.rows[0];
    }



    //====================================== METODO DELETE =====================================

    // Metodo para eliminar un producto
    async deleteProduct(id){
        await db.query('DELETE FROM products WHERE id = $1', [id]);
    }

}

module.exports = new ProductModel(); // Exportar la instancia de Product Model