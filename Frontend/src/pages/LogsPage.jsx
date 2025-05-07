import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);
  const [userData, setUserData] = useState({}); // Para mapear user_id a {name, role}

  // Fetch logs, users and roles from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch logs, users and roles in parallel
        const [logsRes, usersRes, rolesRes] = await Promise.all([
          api.get('/logs'),
          api.get('/users'),
          api.get('/roles')
        ]);
        
        setLogs(logsRes.data);
        
        // Create roles lookup object
        const rolesObj = {};
        rolesRes.data.forEach(role => {
          rolesObj[role.id] = role.name;
        });

        // Create users lookup object with name and role
        const usersObj = {};
        usersRes.data.forEach(user => {
          usersObj[user.id] = {
            name: user.name,
            role: rolesObj[user.role_id] || 'Sin rol'
          };
        });
        setUserData(usersObj);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los registros de logs',
          confirmButtonColor: '#3085d6'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter logs by search term
  const filteredLogs = logs.filter(log => {
    const user = userData[log.user_id] || {};
    return (
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.affected_table.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

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
    <div className="logs-page">
      {/* Header with title */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 d-flex align-items-center">
          <i className="bi bi-journal-text me-2 text-primary"></i>
          Registros de Actividad
        </h2>
      </div>

      {/* Search bar */}
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
                  placeholder="Buscar en registros..."
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
                Mostrando {currentLogs.length} de {filteredLogs.length} registros
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Logs table */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th width="60px">ID</th>
                  <th>Usuario</th>
                  <th>Rol</th>
                  <th>Acción</th>
                  <th>Tabla Afectada</th>
                  <th width="180px">Fecha/Hora</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.length > 0 ? (
                  currentLogs.map(log => {
                    const user = userData[log.user_id] || {};
                    return (
                      <tr key={log.id}>
                        <td>{log.id}</td>
                        <td>
                          <span className="badge bg-primary">
                            {user.name || `ID: ${log.user_id}`}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-info text-dark">
                            {user.role || 'Desconocido'}
                          </span>
                        </td>
                        <td>{log.action}</td>
                        <td>
                          <span className="badge bg-secondary">
                            {log.affected_table}
                          </span>
                        </td>
                        <td>
                          {new Date(log.created_at).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      {searchTerm ? (
                        <div>
                          <i className="bi bi-search text-muted fs-1"></i>
                          <p className="mt-2">No se encontraron registros</p>
                          <button 
                            className="btn btn-sm btn-outline-primary mt-2"
                            onClick={() => setSearchTerm('')}
                          >
                            Limpiar búsqueda
                          </button>
                        </div>
                      ) : (
                        <div>
                          <i className="bi bi-journal-text text-muted fs-1"></i>
                          <p className="mt-2">No hay registros de actividad</p>
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
      {filteredLogs.length > logsPerPage && (
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

export default LogsPage;