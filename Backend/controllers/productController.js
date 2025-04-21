// Importamos el product service
const productService = require('../services/productService');

class ProductController {

    // ========================================== METODOS GET ==========================================

    // Metodo para obtener los productos
    async getProducts(req, res){
        try {
            const products = await productService.getProducts();
            res.json(products);

        } catch(error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los productos' });
        }

    }

    
    // Metodo para obtener un producto por ID
    async getProductById(req, res){
        const { id } = req.params;

        try {
            const product = await productService.getProductById(id);

            if(!product) {
                return res.status(404).json({ message: 'Producto no encontrado' })
            }

            res.json(product);
            
        } catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el producto' });
        }
    }



    // ========================================== METODO POST ==========================================

    // Metodo para agregar un producto
    async createProduct(req, res){

        try {
            const { nombre, precio, descripcion } = req.body;
            const newProducto = await productService.addProduct({ nombre, precio, descripcion });
            res.status(201).json(newProducto);

        } catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error al crear el producto' });
        }
    }



    // ========================================== METODO PUT ==========================================

    // Metodo para actualizar un producto
    async updateProduct(req, res){
        try {
            const { id } = req.params;
            const { nombre, precio, descripcion } = req.body;
            const updatedProduct = await productService.modifyProduct(id, { nombre, precio, descripcion });
            res.json(updatedProduct);

        } catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar el producto' });
        }
    }



    // ========================================== METODO DELETE ==========================================
    async deleteProduct(req, res){
        try {
            const { id } = req.params;
            await productService.removeProduct(id);
            res.sendStatus(204);
            
        } catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar el producto' })
        }
    }

}

// Exportamos la instancia de la clase
module.exports = new ProductController();