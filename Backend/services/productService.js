// Importamos el product model
const productModel = require('../models/productModel');

// Importamos el handle error
const ApiError = require('../errors/apiError');

class ProductService {
    
    // Metodo para obtner todos los productos
    async getProducts(){
        const products = await productModel.getAllProducts();
        if(!products || products.length === 0) {
            throw ApiError.notFound('No hay productos disponibles');
        }
        return products;
    }

    // Metodo para obtner un producto por ID
    async getProductById(id){
        const product = await productModel.getProductById(id);
        if (!product) {
            throw ApiError.notFound(`Producto con ID ${id} no encontrado`);
        }
        return product;
    }

    // Metodo para agregar un producto
    async addProduct(data){
        if (!data.name || !data.price || !data.stock) {
            throw ApiError.badRequest('Nombre, precio y stock son requeridos');
        }
        return await productModel.createProduct(data);
    }

    // Metodo para editar un producto
    async modifyProduct(id, data){
        if (!data.name || !data.price || !data.stock) {
            throw ApiError.badRequest('Nombre, precio y stock son requeridos');
        }

        const existing = await productModel.getProductById(id);
        if (!existing) {
            throw ApiError.notFound(`Producto con ID ${id} no existe`);
        }

        return await productModel.updateProduct(id, data);
    }

    
    // Método para editar solo el stock de un producto
    async modifyProductStock(id, stock) {
        if (stock === undefined || stock === null) {
            throw ApiError.badRequest('El stock es requerido');
        }

        const existing = await productModel.getProductById(id);
        if (!existing) {
            throw ApiError.notFound(`Producto con ID ${id} no existe`);
        }

        return await productModel.updateProductStock(id, stock);
    }




    // Metodo para eliminar un producto
    async removeProduct(id){
        const existing = await productModel.getProductById(id);
        if (!existing) {
            throw ApiError.notFound(`No se encontró el producto con ID ${id}`);
        }
        await productModel.deleteProduct(id);
    }
}


module.exports = new ProductService();