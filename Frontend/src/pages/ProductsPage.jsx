import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los productos',
          confirmButtonColor: '#3085d6'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter(product => product.id !== id));
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error',
          'No se pudo eliminar el producto',
          'error'
        );
      }
    }
  };

  // Filter products by search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* Header with title and actions */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 d-flex align-items-center">
          <i className="bi bi-box-seam me-2 text-primary"></i>
          Gestion de Productos
        </h2>
        <Link to="/productos/nuevo" className="btn btn-primary">
          <i className="bi bi-plus-lg me-2"></i> Nuevo Producto
        </Link>
      </div>

      {/* Search and filter bar */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-end">
              <span className="me-3">
                Mostrando {currentProducts.length} de {filteredProducts.length} productos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products table */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th width="60px">ID</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th width="120px">Precio</th>
                  <th width="100px">Stock</th>
                  <th width="150px" className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length > 0 ? (
                  currentProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <Link to={`/productos/${product.id}`} className="text-decoration-none">
                          {product.name}
                        </Link>
                      </td>
                      <td className="text-truncate" style={{ maxWidth: '200px' }} title={product.description}>
                        {product.description || '-'}
                      </td>
                      <td className="fw-bold text-success">S/ {product.price}</td>
                      <td>
                        <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            onClick={() => navigate(`/productos/${product.id}/editar`)}
                            className="btn btn-outline-primary"
                            title="Editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="btn btn-outline-danger"
                            title="Eliminar"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      {searchTerm ? (
                        <div>
                          <i className="bi bi-search text-muted fs-1"></i>
                          <p className="mt-2">No se encontraron productos</p>
                          <button 
                            className="btn btn-sm btn-outline-primary mt-2"
                            onClick={() => setSearchTerm('')}
                          >
                            Limpiar búsqueda
                          </button>
                        </div>
                      ) : (
                        <div>
                          <i className="bi bi-box text-muted fs-1"></i>
                          <p className="mt-2">No hay productos registrados</p>
                          <Link to="/productos/nuevo" className="btn btn-sm btn-primary mt-2">
                            <i className="bi bi-plus-lg me-2"></i> Agregar producto
                          </Link>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {filteredProducts.length > productsPerPage && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => paginate(currentPage - 1)}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
            </li>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => paginate(currentPage + 1)}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ProductsPage;