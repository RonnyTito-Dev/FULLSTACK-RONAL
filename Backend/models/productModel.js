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
    async createProduct({ name, description, price, stock, category_id }){
        const result = await db.query('INSERT INTO products (name, description, price, stock, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, description, price, stock, category_id]);
        return result.rows[0];
    }



    //======================================= METODO PUT =======================================

    // Metodo para actualizar un producto
    async updateProduct(id, { name, description, price, stock, category_id }){
        const result = await db.query('UPDATE products SET name = $1, description = $2, price = $3, stock = $4, category_id = $5 WHERE id = $6 RETURNING *', [name, description, price, stock, category_id, id]);
        return result.rows[0];
    }


    // Método para actualizar solo el stock de un producto
    async updateProductStock(id, stock) {
        const result = await db.query(
            'UPDATE products SET stock = $1 WHERE id = $2 RETURNING *',
            [stock, id]
        );
        return result.rows[0];
    }




    //====================================== METODO DELETE =====================================

    // Metodo para eliminar un producto
    async deleteProduct(id){
        await db.query('DELETE FROM products WHERE id = $1', [id]);
    }

}

module.exports = new ProductModel(); // Exportar la instancia de Product Model