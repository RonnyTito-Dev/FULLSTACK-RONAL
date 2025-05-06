import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import api from '../api/axiosInstance';

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/auth/me'); // Verifica si hay sesión activa
        setLoading(false);
      } catch (error) {
        navigate('/login', { replace: true }); // Redirige si no hay sesión
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className="d-flex flex-grow-1 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} />
        
        <main className="flex-grow-1 overflow-auto p-3">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout