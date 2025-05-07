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

        const existingName = await productModel.getProductByName(data.name);
        if (existingName) {
            throw ApiError.badRequest(`El producto con nombre "${data.name}" ya existe`);
        }

        return await productModel.createProduct(data);
    }

    // Método para editar un producto
    async modifyProduct(id, data) {
        if (!data.name || !data.price || !data.stock) {
            throw ApiError.badRequest('Nombre, precio y stock son requeridos');
        }

        const existingProduct = await productModel.getProductById(id);
        if (!existingProduct) {
            throw ApiError.notFound(`Producto con ID ${id} no existe`);
        }

        // Validar duplicado solo si el nombre fue modificado
        if (data.name.trim() !== existingProduct.name) {
            const duplicate = await productModel.getProductByName(data.name.trim());
            if (duplicate) {
                throw ApiError.conflict(`Ya existe un producto con el nombre "${data.name}"`);
            }
        }

        // Limpieza antes de actualizar
        data.name = data.name.trim();

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