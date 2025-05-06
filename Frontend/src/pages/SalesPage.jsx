import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [salesPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const { data } = await api.get('/sales');
        setSales(data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las ventas',
          confirmButtonColor: '#3085d6'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar venta?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/sales/${id}`);
        setSales(sales.filter(sale => sale.id !== id));
        Swal.fire('¡Eliminado!', 'La venta ha sido eliminada.', 'success');
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar la venta', 'error');
      }
    }
  };

  const filteredSales = sales.filter(sale =>
    String(sale.id).includes(searchTerm) ||
    String(sale.customer_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(sale.payment_method_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);
  const totalPages = Math.ceil(filteredSales.length / salesPerPage);

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
    <div className="sales-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 d-flex align-items-center">
          <i className="bi bi-receipt-cutoff me-2 text-primary"></i>
          Gestión de Ventas
        </h2>
        <Link to="/ventas/nueva" className="btn btn-primary">
          <i className="bi bi-plus-lg me-2"></i> Nueva Venta
        </Link>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-search"></i></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por ID, cliente o método de pago"
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
                Mostrando {currentSales.length} de {filteredSales.length} ventas
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
                  <th width="60px">ID</th>
                  <th>Cliente</th>
                  <th>Método de Pago</th>
                  <th width="120px">Total</th>
                  <th width="180px">Fecha</th>
                  <th>Atendido por</th>
                  <th width="150px" className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentSales.length > 0 ? (
                  currentSales.map(sale => (
                    <tr key={sale.id}>
                      <td>{sale.id}</td>
                      <td>{sale.customer_name || 'N/A'}</td>
                      <td>{sale.payment_method_name || 'N/A'}</td>
                      <td className="fw-bold text-success">S/ {sale.total}</td>
                      <td>{new Date(sale.created_at).toLocaleString()}</td>
                      <td>{sale.user_name}</td>
                      <td className="text-center">
                        <div className="btn-group btn-group-sm">
                          <button
                            onClick={() => navigate(`/ventas/${sale.id}`)}
                            className="btn btn-outline-primary"
                            disabled={true}
                            title="Ver detalle"
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(sale.id)}
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
                        <>
                          <i className="bi bi-search text-muted fs-1"></i>
                          <p className="mt-2">No se encontraron ventas</p>
                          <button
                            className="btn btn-sm btn-outline-primary mt-2"
                            onClick={() => setSearchTerm('')}
                          >
                            Limpiar búsqueda
                          </button>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-receipt text-muted fs-1"></i>
                          <p className="mt-2">No hay ventas registradas</p>
                          <Link to="/ventas/nueva" className="btn btn-sm btn-primary mt-2">
                            <i className="bi bi-plus-lg me-2"></i> Agregar venta
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

      {filteredSales.length > salesPerPage && (
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

export default SalesPage;
