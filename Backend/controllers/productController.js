// Importamos el product service
const productService = require('../services/productService');

class ProductController {

    // ========================================== METODOS GET ==========================================

    // Metodo para obtener los productos
    async getProducts(req, res, next){
        try {
            const products = await productService.getProducts();
            res.json(products);

        } catch(error) {
            next(error);
        }

    }

    
    // Metodo para obtener un producto por ID
    async getProductById(req, res, next){
        const { id } = req.params;

        try {
            const product = await productService.getProductById(id);
            res.json(product);
            
        } catch(error){
            next(error);
        }
    }



    // ========================================== METODO POST ==========================================

    // Metodo para agregar un producto
    async createProduct(req, res, next){

        try {
            const { name, description, price, stock, category_id } = req.body;
            const newProducto = await productService.addProduct({ name, description, price, stock, category_id });
            res.status(201).json(newProducto);

        } catch(error){
            
            next(error);
        }
    }



    // ========================================== METODO PUT ==========================================

    // Metodo para actualizar un producto
    async updateProduct(req, res, next){
        try {
            const { id } = req.params;
            const { name, description, price, stock, category_id } = req.body;
            const updatedProduct = await productService.modifyProduct(id, { name, description, price, stock, category_id });
            res.json(updatedProduct);

        } catch(error){
            next(error);
        }
    }


    // Método para actualizar solo el stock de un producto
    async updateProductStock(req, res, next) {
        try {
            const { id } = req.params;
            const { stock } = req.body;

            // Llamamos al servicio que solo modifica el stock
            const updatedProduct = await productService.modifyProductStock(id, stock);

            res.json(updatedProduct); // Devolvemos el producto actualizado

        } catch (error) {
            next(error); // Pasamos el error al manejador global de errores
        }
    }




    // ========================================== METODO DELETE ==========================================
    async deleteProduct(req, res, next){
        try {
            const { id } = req.params;
            await productService.removeProduct(id);
            res.sendStatus(204);
            
        } catch(error){
            next(error);
        }
    }

}

// Exportamos la instancia de la clase
module.exports = new ProductController();