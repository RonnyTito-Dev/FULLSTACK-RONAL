import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'


import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

import UsersPage from './pages/UsersPage'

import ProductsPage from './pages/ProductsPage'
import ProductForm from './pages/ProductForm'

import CustomersPage from './pages/CustomersPage'
import CustomerForm from './pages/CustomerForm'

import SalesPage from './pages/SalesPage'
import SalesForm from './pages/SalesForm'

function App() {
  return (
    <Routes>
      {/* Ruta publica */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas protegidas con layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="inicio" element={<HomePage />} />

        <Route path="productos" element={<ProductsPage />} />
        <Route path="productos/nuevo" element={<ProductForm />} />
        <Route path="productos/:id/editar" element={<ProductForm />} />

        <Route path="clientes" element={<CustomersPage />} />
        <Route path="clientes/nuevo" element={<CustomerForm />} />
        <Route path="clientes/:id/editar" element={<CustomerForm />} />


        <Route path="ventas" element={<SalesPage />} />
        <Route path="ventas/nueva" element={<SalesForm />} />

        <Route path="usuarios" element={<UsersPage />} />

      </Route>
      
      {/* Redireccion para rutas no encontradas */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App