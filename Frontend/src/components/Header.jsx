// Header.jsx
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance'; // Tu instancia personalizada de Axios

const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Obtener información del usuario al cargar
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Se cerrará tu sesión actual.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await api.post('/auth/logout');
        navigate('/login', { replace: true });

        Swal.fire({
          title: '¡Sesión cerrada!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error cerrando sesión', error);
        Swal.fire('Error', 'No se pudo cerrar la sesión.', 'error');
      }
    }
  };

  const getInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : 'U';
  };

  return (
    <header className="d-flex justify-content-between align-items-center px-4 py-3 bg-primary text-white shadow">
      <div className="d-flex align-items-center">
        <button 
          className="btn btn-light me-3" 
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <i className="bi bi-list"></i>
        </button>
        <h1 className="h4 m-0">NOVA SALUD</h1>
      </div>

      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-light position-relative">
          <i className="bi bi-bell-fill text-primary"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          </span>
        </button>

        <div className="dropdown">
          <button 
            className="btn btn-light dropdown-toggle d-flex align-items-center"
            data-bs-toggle="dropdown"
          >
            <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" 
              style={{ width: '26px', height: '26px' }}>
              {getInitial(user?.email)}
            </div>
            <span className="ms-2 d-none d-sm-inline">
              {user?.email || 'Usuario'}
            </span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item">
                <i className="bi bi-person me-2"></i>Perfil
              </button>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i>Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
