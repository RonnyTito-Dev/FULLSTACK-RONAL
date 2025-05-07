import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api/axiosInstance';

const Sidebar = ({ collapsed }) => {
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  // 1. Obtenemos el rol del usuario al cargar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await api.get('/auth/me');
        
        setUserRole(data.role);
      } catch (error) {
        console.error('Error obteniendo datos de usuario:', error)
        // Redirigir a login o manejar el error
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // 2. Definición completa de rutas con permisos por rol
  const allMenuItems = [
    { path: '/inicio', label: 'Inicio', icon: 'bi-house-fill', roles: [1, 2, 3, 4] },
    { path: '/categorias', label: 'Categorías', icon: 'bi-tags-fill', roles: [1, 2] },
    { path: '/productos', label: 'Productos', icon: 'bi-box-seam', roles: [1, 2, 3] },
    { path: '/clientes', label: 'Clientes', icon: 'bi-people-fill', roles: [1, 2, 3] },
    { path: '/ventas', label: 'Ventas', icon: 'bi-cart-fill', roles: [1, 2, 3, 4] },
    { path: '/usuarios', label: 'Usuarios', icon: 'bi-person-badge-fill', roles: [1, 2] },
    { path: '/roles', label: 'Roles', icon: 'bi-shield-lock-fill', roles: [1, 2] },
    { path: '/metodos-pago', label: 'Métodos de Pago', icon: 'bi-credit-card-2-front-fill', roles: [1, 2] },
    { path: '/registros', label: 'Registros', icon: 'bi-clipboard-data-fill', roles: [1, 2] }
  ]

  // 3. Filtramos las rutas según el rol del usuario
  const filteredMenuItems = allMenuItems.filter(item => 
    userRole && item.roles.includes(userRole)
  )

  // 4. Mientras carga mostramos un spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  // 5. Renderizamos el sidebar con las rutas permitidas
  return (
    <div 
      className={`bg-primary text-white ${collapsed ? 'w-auto' : 'w-25'} d-flex flex-column`}
      style={{ 
        minWidth: collapsed ? '80px' : '250px',
        transition: 'width 0.3s ease',
        height: '100vh'
      }}
    >
      <nav className="nav flex-column flex-grow-1 p-3">
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-link mb-2 rounded d-flex align-items-center ${
                isActive ? 'bg-white text-primary' : 'text-white hover-bg-primary-dark'
              }`
            }
            end
          >
            <i className={`bi ${item.icon} fs-5`}></i>
            {!collapsed && <span className="ms-3">{item.label}</span>}
          </NavLink>
        ))}
        
        <div className="mt-auto">
          {/* Espacio para elementos adicionales al final */}
        </div>
      </nav>
    </div>
  )
}

export default Sidebar