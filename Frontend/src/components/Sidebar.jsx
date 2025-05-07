import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api/axiosInstance'

const Sidebar = ({ collapsed }) => {
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await api.get('/auth/me')
        setUserRole(data.role)
      } catch (error) {
        console.error('Error obteniendo datos de usuario:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const allMenuItems = [
    { path: '/inicio', label: 'Inicio', icon: 'bi-house-fill', roles: [1, 2, 3, 4] },
    { path: '/ventas', label: 'Ventas', icon: 'bi-cart-fill', roles: [1, 2, 3, 4] },
    { path: '/clientes', label: 'Clientes', icon: 'bi-people-fill', roles: [1, 2, 3] },
    { path: '/productos', label: 'Productos', icon: 'bi-box-seam', roles: [1, 2, 3] },
    { path: '/categorias', label: 'Categorías', icon: 'bi-tags-fill', roles: [1, 2] },
    { path: '/metodos-pago', label: 'Métodos de Pago', icon: 'bi-credit-card-2-front-fill', roles: [1, 2] },
    { path: '/usuarios', label: 'Usuarios', icon: 'bi-person-badge-fill', roles: [1, 2] },
    { path: '/roles', label: 'Roles', icon: 'bi-shield-lock-fill', roles: [1, 2] },
    { path: '/registros', label: 'Registros', icon: 'bi-clipboard-data-fill', roles: [1, 2] }
  ]

  const filteredMenuItems = allMenuItems.filter(item =>
    userRole && item.roles.includes(userRole)
  )

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-primary text-white d-flex flex-column sidebar-transition`}
      style={{
        maxWidth: collapsed ? '80px' : '300px',
        overflow: 'hidden',
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
            <span className={`ms-3 sidebar-label ${collapsed ? 'collapsed' : ''}`}>
              {item.label}
            </span>
          </NavLink>
        ))}

        <div className="mt-auto">
          {/* Elementos al final del sidebar, si se desea */}
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
