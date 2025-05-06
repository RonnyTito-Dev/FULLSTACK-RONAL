import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get('/customers');
        setCustomers(data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los clientes',
          confirmButtonColor: '#3085d6'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar Cliente?',
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
        await api.delete(`/customers/${id}`);
        setCustomers(customers.filter(customer => customer.id !== id));
        Swal.fire('¡Eliminado!', 'El cliente ha sido eliminado.', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el cliente', 'error');
      }
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 d-flex align-items-center">
          <i className="bi bi-box-seam me-2 text-primary"></i>
          Gestion de Clientes
        </h2>
        <Link to="/clientes/nuevo" className="btn btn-primary">
          <i className="bi bi-plus-lg me-2"></i> Nuevo Cliente
        </Link>
      </div>

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
                  placeholder="Buscar Cliente..."
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
                Mostrando {currentCustomers.length} de {filteredCustomers.length} clientes
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>DNI</th>
                  <th>Email</th>
                  <th>Celular</th>
                  <th>Dirección</th>
                  <th>Naciemiento</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.length > 0 ? (
                  currentCustomers.map(customer => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>
                        <Link to={`/clientes/${customer.id}`} className="text-decoration-none">
                          {customer.name}
                        </Link>
                      </td>
                      <td>{customer.dni || '-'}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.address}</td>
                      <td>{customer.date_of_birth ? new Date(customer.date_of_birth).toLocaleDateString('es-PE') : '-'}</td>

                      <td className="text-center">
                        <div className="btn-group btn-group-sm">
                          <button
                            onClick={() => navigate(`/clientes/${customer.id}/editar`)}
                            className="btn btn-outline-primary"
                            title="Editar"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(customer.id)}
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
                    <td colSpan="7" className="text-center py-4">
                      {searchTerm ? (
                        <>
                          <i className="bi bi-search text-muted fs-1"></i>
                          <p className="mt-2">No se encontraron clientes</p>
                          <button 
                            className="btn btn-sm btn-outline-primary mt-2"
                            onClick={() => setSearchTerm('')}
                          >
                            Limpiar busqueda
                          </button>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box text-muted fs-1"></i>
                          <p className="mt-2">No hay clientes registrados</p>
                          <Link to="/clientes/nuevo" className="btn btn-sm btn-primary mt-2">
                            <i className="bi bi-plus-lg me-2"></i> Agregar cliente
                          </Link>
                        </>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {filteredCustomers.length > customersPerPage && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                <i className="bi bi-chevron-left"></i>
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                <i className="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default CustomersPage;
