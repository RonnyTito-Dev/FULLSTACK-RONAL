import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from "../api/axiosInstance";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [productCount, setProductCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, customersRes, salesRes] = await Promise.all([
          api.get("/products"),
          api.get("/customers"),
          api.get("/sales"),
        ]);

        setProductCount(productsRes.data.length);
        setCustomerCount(customersRes.data.length);
        setSalesCount(salesRes.data.length);
      } catch (error) {
        console.error("Error al cargar los datos del panel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <div className="home-page">
      <h2 className="mb-4 d-flex align-items-center">
        <i className="bi bi-speedometer2 me-2 text-primary"></i>
        Panel de Control
      </h2>

      {/* Tarjetas de Resumen */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card border-primary h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title text-muted">Productos</h5>
                  <h3 className="mb-0">{productCount}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded">
                  <i className="bi bi-box-seam text-primary fs-3"></i>
                </div>
              </div>
              <Link to="/productos" className="btn btn-link ps-0 mt-2 text-decoration-none">
                Ver todos <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-success h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title text-muted">Clientes</h5>
                  <h3 className="mb-0">{customerCount}</h3>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded">
                  <i className="bi bi-people text-success fs-3"></i>
                </div>
              </div>
              <Link to="/clientes" className="btn btn-link ps-0 mt-2 text-decoration-none">
                Ver todos <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-warning h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title text-muted">Ventas</h5>
                  <h3 className="mb-0">{salesCount}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 p-3 rounded">
                  <i className="bi bi-cart-check text-warning fs-3"></i>
                </div>
              </div>
              <Link to="/ventas" className="btn btn-link ps-0 mt-2 text-decoration-none">
                Ver todos <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Últimas Ventas */}
      {/* <div className="card shadow-sm mb-4">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="bi bi-clock-history me-2"></i>
            Últimas Ventas
          </h5>
          <Link to="/ventas" className="btn btn-sm btn-outline-primary">
            Ver todas
          </Link>
        </div>
        <div className="card-body">
          <div className="text-center py-4 text-muted">
            <i className="bi bi-receipt fs-1"></i>
            <p className="mt-2">No hay ventas recientes</p>
          </div>
        </div>
      </div> */}

      {/* Acciones Rápidas */}
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">
            <i className="bi bi-lightning-charge me-2"></i>
            Acciones Rápidas
          </h5>
        </div>
        <div className="card-body">
          <div className="d-flex flex-wrap gap-3">
            <Link to="/ventas/nueva" className="btn btn-primary">
              <i className="bi bi-plus-circle me-2"></i> Nueva Venta
            </Link>
            <Link to="/productos/nuevo" className="btn btn-outline-primary">
              <i className="bi bi-box-seam me-2"></i> Agregar Producto
            </Link>
            <Link to="/clientes/nuevo" className="btn btn-outline-primary">
              <i className="bi bi-person-plus me-2"></i> Nuevo Cliente
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
