// Importamos el product model
const productModel = require('../models/productModel');

class ProductService {
    
    // Metodo para obtner todos los productos
    async getProducts(){
        return await productModel.getAllProducts()
    }

    // Metodo para obtner un producto por ID
    async getProductById(id){
        return await productModel.getProductById(id);
    }

    // Metodo para agregar un producto
    async addProduct(data){
        return await productModel.createProduct(data);
    }

    // Metodo para editar un producto
    async modifyProduct(id, data){
        return await productModel.updateProduct(id, data);
    }

    // Metodo para eliminar un producto
    async removeProduct(id){
        await productModel.deleteProduct(id);
    }
}


module.exports = new ProductService();