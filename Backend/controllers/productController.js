// Importamos el product service
const productService = require('../services/productService');

// Importamos nuestra instancia de errores
const ApiError = require('../errors/apiError');

class ProductController {

    // ========================================== METODOS GET ==========================================

    // Metodo para obtener los productos
    async getProducts(req, res, next){
        try {
            const products = await productService.getProducts();
            res.json(products);

        } catch(error) {
            next(ApiError.internal('Error al obtener los productos'));
        }

    }

    
    // Metodo para obtener un producto por ID
    async getProductById(req, res, next){
        const { id } = req.params;

        try {
            const product = await productService.getProductById(id);

            if(!product) {
                return next(ApiError.notFound('Producto no encontrado'));
            }

            res.json(product);
            
        } catch(error){
            next(ApiError.internal('Error al obtener el producto'));
        }
    }



    // ========================================== METODO POST ==========================================

    // Metodo para agregar un producto
    async createProduct(req, res, next){

        try {
            const { nombre, precio, descripcion } = req.body;
            const newProducto = await productService.addProduct({ nombre, precio, descripcion });
            res.status(201).json(newProducto);

        } catch(error){
            next(ApiError.internal('Error al crear el producto'));
        }
    }



    // ========================================== METODO PUT ==========================================

    // Metodo para actualizar un producto
    async updateProduct(req, res, next){
        try {
            const { id } = req.params;
            const { nombre, precio, descripcion } = req.body;
            const updatedProduct = await productService.modifyProduct(id, { nombre, precio, descripcion });
            
            if (!updatedProduct) {
                return next(ApiError.notFound('Producto no encontrado para actualizar'));
            }
            
            res.json(updatedProduct);

        } catch(error){
            next(ApiError.internal('Error al actualizar el producto'));
        }
    }



    // ========================================== METODO DELETE ==========================================
    async deleteProduct(req, res, next){
        try {
            const { id } = req.params;
            await productService.removeProduct(id);
            res.sendStatus(204);
            
        } catch(error){
            next(ApiError.internal('Error al eliminar el producto'));
        }
    }

}

// Exportamos la instancia de la clase
module.exports = new ProductController();