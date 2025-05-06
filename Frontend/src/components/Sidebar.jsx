
import { NavLink } from 'react-router-dom'

const Sidebar = ({ collapsed }) => {
  const menuItems = [
    { path: '/inicio', label: 'Inicio', icon: 'bi-house-fill' },
    { path: '/productos', label: 'Productos', icon: 'bi-box-seam' },
    { path: '/clientes', label: 'Clientes', icon: 'bi-people-fill' },
    { path: '/ventas', label: 'Ventas', icon: 'bi-cart-fill' },
    { path: '/usuarios', label: 'Usuarios', icon: 'bi-person-fill' }

  ]

  return (
    <div 
      className={`bg-primary text-white ${collapsed ? 'w-auto' : 'w-25'} d-flex flex-column`}
      style={{ 
        minWidth: collapsed ? '80px' : '250px',
        transition: 'width 0.3s ease'
      }}
    >
      <nav className="nav flex-column flex-grow-1 p-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-link text-primary mb-2 rounded d-flex align-items-center ${
                isActive ? 'bg-white text-primary' : 'text-white hover-bg-primary-dark'
              }`
            }
          >
            <i className={`bi ${item.icon} fs-5`}></i>
            {!collapsed && <span className="ms-3">{item.label}</span>}
          </NavLink>
        ))}
        
        <div className="mt-auto">
        </div>
      </nav>
    </div>
  )
}

export default Sidebar