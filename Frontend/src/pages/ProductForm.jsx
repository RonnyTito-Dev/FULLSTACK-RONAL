import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: ''
  });
  const [errors, setErrors] = useState({});

  // Cargar categorías y datos del producto si estamos editando
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Cargar categorías
        const categoriesResponse = await api.get('/categories');
        setCategories(categoriesResponse.data);
        
        // Si hay ID, cargar datos del producto
        if (id) {
          const productResponse = await api.get(`/products/${id}`);
          const product = productResponse.data;
          setFormData({
            name: product.name,
            description: product.description || '',
            price: product.price.toString(),
            stock: product.stock.toString(),
            category_id: product.category_id || ''
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: id ? 'No se pudo cargar el producto' : 'No se pudieron cargar las categorías',
          confirmButtonColor: '#3085d6'
        });
        navigate('/productos');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    else if (formData.name.length < 3) newErrors.name = 'Mínimo 3 caracteres';
    
    if (!formData.price) newErrors.price = 'El precio es requerido';
    else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) 
      newErrors.price = 'Debe ser un número positivo';
    
    if (!formData.stock) newErrors.stock = 'El stock es requerido';
    else if (!Number.isInteger(Number(formData.stock)) || Number(formData.stock) < 0) 
      newErrors.stock = 'Debe ser un número entero positivo';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando se modifica el campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      const productData = {
        name: formData.name,
        description: formData.description || null,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category_id: formData.category_id || null
      };

      if (id) {
        await api.put(`/products/${id}`, productData);
        Swal.fire({
          icon: 'success',
          title: '¡Producto actualizado!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        await api.post('/products', productData);
        Swal.fire({
          icon: 'success',
          title: '¡Producto creado!',
          showConfirmButton: false,
          timer: 1500
        });
      }
      
      navigate('/productos');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error al guardar el producto';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMsg,
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/productos');
  };

  if (loading && id) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="product-form">
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h3 className="mb-0">
            <i className={`bi ${id ? 'bi-pencil' : 'bi-plus-lg'} me-2`}></i>
            {id ? 'Editar Producto' : 'Nuevo Producto'}
          </h3>
        </div>
        
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Columna izquierda */}
              <div className="col-md-6">
                {/* Nombre */}
                <div className={`mb-3 ${errors.name ? 'has-error' : ''}`}>
                  <label className="form-label">Nombre *</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                
                {/* Descripción */}
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    name="description"
                    rows="3"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                
                {/* Categoría */}
                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <select
                    name="category_id"
                    className="form-select"
                    value={formData.category_id}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">Seleccione una categoría</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Columna derecha */}
              <div className="col-md-6">
                {/* Precio */}
                <div className={`mb-3 ${errors.price ? 'has-error' : ''}`}>
                  <label className="form-label">Precio *</label>
                  <div className="input-group">
                    <span className="input-group-text">S/</span>
                    <input
                      type="number"
                      name="price"
                      step="0.01"
                      min="0"
                      className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                      value={formData.price}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                  </div>
                </div>
                
                {/* Stock */}
                <div className={`mb-3 ${errors.stock ? 'has-error' : ''}`}>
                  <label className="form-label">Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    min="0"
                    className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                    value={formData.stock}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                </div>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                <i className="bi bi-x-lg me-2"></i>
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {id ? 'Actualizando...' : 'Creando...'}
                  </>
                ) : (
                  <>
                    <i className={`bi ${id ? 'bi-check-lg' : 'bi-save'} me-2`}></i>
                    {id ? 'Actualizar producto' : 'Guardar producto'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;