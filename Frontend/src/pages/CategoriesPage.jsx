import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';
import { createLog } from '../services/logService';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las categorías',
          confirmButtonColor: '#3085d6'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Delete category
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar categoría?',
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
        await api.delete(`/categories/${id}`);
        setCategories(categories.filter(category => category.id !== id));

        // Registrar log
        await createLog({ action: 'Elimino una categoria', affected_table: 'categories'});

        Swal.fire(
          '¡Eliminado!',
          'La categoría ha sido eliminada.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error',
          'No se pudo eliminar la categoría',
          'error'
        );
      }
    }
  };

  // Filter categories by search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

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
    <div className="categories-page">
      {/* Header with title and actions */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 d-flex align-items-center">
          <i className="bi bi-tags me-2 text-primary"></i>
          Gestión de Categorías
        </h2>
        <Link to="/categorias/nuevo" className="btn btn-primary">
          <i className="bi bi-plus-lg me-2"></i> Nueva Categoría
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
                  placeholder="Buscar categorías..."
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
                Mostrando {currentItems.length} de {filteredCategories.length} categorías
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories table */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th width="60px">ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th width="150px">Fecha Creación</th>
                  <th width="120px" className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map(category => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>
                        <Link to={`/categorias/${category.id}`} className="text-decoration-none">
                          {category.name}
                        </Link>
                      </td>
                      <td className="text-truncate" style={{ maxWidth: '200px' }} title={category.description}>
                        {category.description || '-'}
                      </td>
                      <td>{new Date(category.created_at).toLocaleDateString()}</td>
                      <td className="text-center">
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            onClick={() => navigate(`/categorias/${category.id}/editar`)}
                            className="btn btn-outline-primary"
                            title="Editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
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
                    <td colSpan="5" className="text-center py-4">
                      {searchTerm ? (
                        <div>
                          <i className="bi bi-search text-muted fs-1"></i>
                          <p className="mt-2">No se encontraron categorías</p>
                          <button 
                            className="btn btn-sm btn-outline-primary mt-2"
                            onClick={() => setSearchTerm('')}
                          >
                            Limpiar búsqueda
                          </button>
                        </div>
                      ) : (
                        <div>
                          <i className="bi bi-tags text-muted fs-1"></i>
                          <p className="mt-2">No hay categorías registradas</p>
                          <Link to="/categorias/nuevo" className="btn btn-sm btn-primary mt-2">
                            <i className="bi bi-plus-lg me-2"></i> Agregar categoría
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
      {filteredCategories.length > itemsPerPage && (
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

export default CategoriesPage;