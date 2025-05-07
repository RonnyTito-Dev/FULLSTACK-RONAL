import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'


import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

import CategoriesPage from './pages/CategoriesPage.jsx'
import CategoryForm from './pages/CategoryForm.jsx'

import RolesPage from './pages/RolesPage'
import RolesForm from './pages/RolesForm';

import UsersPage from './pages/UsersPage'
import UserForm from './pages/UserForm'
import UserPasswordForm from './pages/UserPasswordForm'


import PaymentMethodsPage from './pages/PaymentMethodsPage.jsx'
import PaymentMethodForm from './pages/PaymentMethodForm.jsx'

import ProductsPage from './pages/ProductsPage'
import ProductForm from './pages/ProductForm'

import CustomersPage from './pages/CustomersPage'
import CustomerForm from './pages/CustomerForm'

import SalesPage from './pages/SalesPage'
import SalesForm from './pages/SalesForm'
import SaleDetailsPage from './pages/SalesDetailsPage.jsx'

import LogsPage from './pages/LogsPage.jsx'

function App() {
  return (
    <Routes>
      {/* Ruta publica */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas protegidas con layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="inicio" element={<HomePage />} />


        <Route path="categorias" element={<CategoriesPage />} />
        <Route path="categorias/nuevo" element={<CategoryForm />} />
        <Route path="categorias/:id/editar" element={<CategoryForm />} />

        <Route path="productos" element={<ProductsPage />} />
        <Route path="productos/nuevo" element={<ProductForm />} />
        <Route path="productos/:id/editar" element={<ProductForm />} />

        <Route path="clientes" element={<CustomersPage />} />
        <Route path="clientes/nuevo" element={<CustomerForm />} />
        <Route path="clientes/:id/editar" element={<CustomerForm />} />


        <Route path="ventas" element={<SalesPage />} />
        <Route path="ventas/nueva" element={<SalesForm />} />
        <Route path="ventas/:id/editar" element={<SalesForm />} />
        <Route path="ventas/:id/detalles" element={<SaleDetailsPage />} />

        <Route path="roles" element={<RolesPage />} />
        <Route path="roles/nuevo" element={<RolesForm />} />
        <Route path="roles/:id/editar" element={<RolesForm />} />

        <Route path="usuarios" element={<UsersPage />} />
        <Route path="usuarios/nuevo" element={<UserForm />} />
        <Route path="usuarios/:id/editar" element={<UserForm />} />
        <Route path="usuarios/:id/password" element={<UserPasswordForm />} />

        <Route path="metodos-pago" element={<PaymentMethodsPage />} />
        <Route path="metodos-pago/nuevo" element={<PaymentMethodForm />} />
        <Route path="metodos-pago/:id/editar" element={<PaymentMethodForm />} />

        <Route path="registros" element={<LogsPage />} />

      </Route>
      
      {/* Redireccion para rutas no encontradas */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App