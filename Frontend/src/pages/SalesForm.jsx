import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import Swal from "sweetalert2";

const SalesForm = () => {
    const { id } = useParams(); // Si hay un ID, es edición; si no, es creación.
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isEditing] = useState(!!id); // Determina si es modo edición.
    const [currentUserId, setCurrentUserId] = useState(null); // Nuevo estado para el usuario actual


    // Estado del formulario
    const [formData, setFormData] = useState({
        customer_id: "",
        payment_method_id: "",
        products: [], // Array de productos: { product_id, quantity, price }
        total: 0,
    });

    // Datos para selects (ejemplo: métodos de pago y productos)
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [clients, setClients] = useState([]); // Datos de clientes

    // Cargar datos iniciales (para edición o selects)
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);

                // Obtener datos de usuario actual
                const authRes = await api.get("/auth/me");
                setCurrentUserId(authRes.data.id);

                // Cargar métodos de pago, productos disponibles y clientes
                const [methodsRes, productsRes, clientsRes] = await Promise.all([
                    api.get("/payment-methods"),
                    api.get("/products"),
                    api.get("/customers"), // Asumiendo que hay una API para los clientes
                ]);
                setPaymentMethods(methodsRes.data);
                setAvailableProducts(productsRes.data);
                setClients(clientsRes.data);

                // Si es edición, cargar los datos de la venta
                if (id) {
                    const { data } = await api.get(`/sales/${id}`);
                    setFormData({
                        customer_id: data.customer_id,
                        payment_method_id: data.payment_method_id,
                        products: data.products.map(p => ({
                            product_id: p.id,
                            quantity: p.quantity,
                            price: p.price,
                        })),
                        total: data.total,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudieron cargar los datos necesarios",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [id]);

    // Manejador de cambios en inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...formData.products];

        if (field === "product_id") {
            const selectedProductId = Number(value);

            // Verificar si ya existe este producto en otra fila
            const isDuplicate = updatedProducts.some(
                (p, i) => i !== index && p.product_id === selectedProductId
            );

            if (isDuplicate) {
                Swal.fire({
                    icon: "warning",
                    title: "Producto duplicado",
                    text: "Este producto ya ha sido agregado. Por favor selecciona otro.",
                });
                return; // Evitar que se actualice el producto duplicado
            }

            const selectedProduct = availableProducts.find(
                (prod) => prod.id === selectedProductId
            );

            if (selectedProduct) {
                updatedProducts[index] = {
                    ...updatedProducts[index],
                    product_id: selectedProductId,
                    price: parseFloat(selectedProduct.price),
                    quantity: 1, // opción por defecto
                };
            }
        } else if (field === "quantity") {
            updatedProducts[index][field] = Number(value);
        } else {
            updatedProducts[index][field] = value;
        }

        // Recalcular total
        const total = updatedProducts.reduce(
            (sum, product) =>
                sum + (Number(product.quantity) || 0) * (Number(product.price) || 0),
            0
        );

        setFormData({
            ...formData,
            products: updatedProducts,
            total: parseFloat(total.toFixed(2)),
        });
    };


    // Agregar nuevo producto al formulario
    const addProduct = () => {
        setFormData({
            ...formData,
            products: [
                ...formData.products,
                { product_id: "", quantity: 1, price: 0 },
            ],
        });
    };

    // Eliminar producto del formulario
    const removeProduct = (index) => {
        const updatedProducts = formData.products.filter((_, i) => i !== index);

        // Recalcular total después de eliminar el producto
        const total = updatedProducts.reduce(
            (sum, product) =>
                sum + (Number(product.quantity) || 0) * (Number(product.price) || 0),
            0
        );

        setFormData({
            ...formData,
            products: updatedProducts,
            total: parseFloat(total.toFixed(2)), // Actualiza el total
        });
    };



    // Enviar formulario (POST o PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            if (!formData.products || formData.products.length === 0) {
                throw new Error("Debe agregar productos a la venta.");
            }

            // Paso 1: Registrar la venta
            const salesPayload = {
                user_id: currentUserId,
                customer_id: formData.customer_id,
                payment_method_id: formData.payment_method_id,
                total: formData.total.toFixed(2),
            };

            let saleResponse;
            if (isEditing) {
                saleResponse = await api.put(`/sales/${id}`, salesPayload);
                Swal.fire("¡Actualizado!", "La venta se actualizó correctamente.", "success");
            } else {
                saleResponse = await api.post("/sales", salesPayload);
                Swal.fire("¡Creado!", "La venta se registró correctamente.", "success");
            }

            const saleId = saleResponse.data.id;

            // Paso 2: Enviar cada detalle de producto individualmente
            for (const p of formData.products) {
                if (!p.product_id || !p.quantity || !p.price) {
                    throw new Error("Los productos deben tener un ID, cantidad y precio válidos.");
                }

                // Obtener el stock del producto desde la base de datos
                const productResponse = await api.get(`/products/${p.product_id}`);
                const productStock = productResponse.data.stock;

                // Verificar que el stock esté disponible
                if (productStock < p.quantity) {
                    throw new Error(`No hay suficiente stock para el producto ${p.product_id}.`);
                }

                const detailPayload = {
                    sale_id: saleId,
                    product_id: p.product_id,
                    quantity: parseInt(p.quantity),
                    unit_price: parseFloat(p.price),
                };

                // Agregar a detalles de venta
                await api.post("/sale-details", detailPayload);

                // 3. Actualizar stock: Restamos la cantidad vendida al stock actual
                const updatedStock = {
                    stock: productStock - p.quantity, // restamos la cantidad vendida
                };

                await api.put(`/products/stock/${p.product_id}`, updatedStock);
            }

            navigate("/ventas");

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "Error al procesar la venta",
            });
        } finally {
            setLoading(false);
        }
    };





    if (loading && !formData.products) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="sales-form">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">
                        <i className="bi bi-receipt me-2"></i>
                        {isEditing ? "Editar Venta" : "Nueva Venta"}
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Cliente */}
                        <div className="mb-3">
                            <label className="form-label">Cliente</label>
                            <select
                                className="form-select"
                                name="customer_id"
                                value={formData.customer_id}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Seleccionar...</option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.name} - {client.dni}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Método de pago */}
                        <div className="mb-3">
                            <label className="form-label">Método de Pago</label>
                            <select
                                className="form-select"
                                name="payment_method_id"
                                value={formData.payment_method_id}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Seleccionar...</option>
                                {paymentMethods.map((method) => (
                                    <option key={method.id} value={method.id}>
                                        {method.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Lista de productos */}
                        <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0">Productos</h5>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary"
                                    onClick={addProduct}
                                >
                                    <i className="bi bi-plus-lg me-1"></i> Agregar
                                </button>
                            </div>

                            {formData.products.length === 0 ? (
                                <div className="alert alert-info">
                                    No hay productos agregados.
                                </div>
                            ) : (
                                formData.products.map((product, index) => (

                                    <div key={index} className="row g-3 mb-3 align-items-end">
                                        <div className="col-md-5">
                                            <label className="form-label">Producto</label>
                                            <select
                                                className="form-select"
                                                value={product.product_id}
                                                onChange={(e) =>
                                                    handleProductChange(index, "product_id", e.target.value)
                                                }
                                                required
                                            >
                                                <option value="">Seleccionar...</option>
                                                {availableProducts.map((prod) => (
                                                    <option key={prod.id} value={prod.id}>
                                                        {prod.name} (S/ {prod.price})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <label className="form-label">Cantidad</label>
                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control"
                                                value={product.quantity}
                                                onChange={(e) =>
                                                    handleProductChange(index, "quantity", e.target.value)
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="col-md-2">
                                            <label className="form-label">Precio Unitario</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={`S/ ${product.price}`}
                                                disabled
                                            />
                                        </div>

                                        <div className="col-md-2">
                                            <label className="form-label mt-2">Subtotal</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={`S/ ${(product.quantity * product.price).toFixed(2)}`}
                                                disabled
                                            />
                                        </div>


                                        <div className="col-md-1">
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger w-100"
                                                onClick={() => removeProduct(index)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Total */}
                        <div className="mb-4 p-3 bg-light rounded">
                            <h4 className="text-end mb-0">
                                Total: <span className="text-success">S/ {formData.total.toFixed(2)}</span>
                            </h4>
                        </div>

                        {/* Botones */}
                        <div className="d-flex justify-content-end gap-2">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => navigate("/ventas")}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Procesando...
                                    </>
                                ) : isEditing ? (
                                    "Actualizar Venta"
                                ) : (
                                    "Registrar Venta"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SalesForm;
