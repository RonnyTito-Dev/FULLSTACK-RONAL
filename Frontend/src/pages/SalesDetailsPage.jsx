import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import { createLog } from '../services/logService';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SaleDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saleDetails, setSaleDetails] = useState([]);
  const [saleInfo, setSaleInfo] = useState(null);
  const [productsInfo, setProductsInfo] = useState({});
  const [customers, setCustomers] = useState({});
  const [paymentMethods, setPaymentMethods] = useState({});
  const [users, setUsers] = useState({});
  const [roles, setRoles] = useState({});
  const pdfRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const saleRes = await api.get(`/sales/${id}`);
        setSaleInfo(saleRes.data);
        
        const detailsRes = await api.get(`/sale-details/sale/${id}`);
        setSaleDetails(detailsRes.data);

        const [customersRes, methodsRes, usersRes, productsRes, rolesRes] = await Promise.all([
          api.get('/customers'),
          api.get('/payment-methods'),
          api.get('/users'),
          api.get('/products', {
            params: { ids: detailsRes.data.map(d => d.product_id).join(',') }
          }),
          api.get('/roles')
        ]);

        const customersMap = {};
        customersRes.data.forEach(c => customersMap[c.id] = c);
        setCustomers(customersMap);

        const methodsMap = {};
        methodsRes.data.forEach(m => methodsMap[m.id] = m);
        setPaymentMethods(methodsMap);

        const usersMap = {};
        usersRes.data.forEach(u => usersMap[u.id] = u);
        setUsers(usersMap);

        const productsMap = {};
        productsRes.data.forEach(p => productsMap[p.id] = p);
        setProductsInfo(productsMap);

        const rolesMap = {};
        rolesRes.data.forEach(r => rolesMap[r.id] = r.name);
        setRoles(rolesMap);

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los detalles de la venta',
          confirmButtonColor: '#3085d6'
        });
        console.error('Error loading sale details:', error);
        navigate('/ventas');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  // Obtener la fecha y hora en Perú
  const now = new Date();
  const formattedDate = now.toLocaleString('es-PE', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  }).replace(/[^\w\s]/gi, '_'); // Reemplaza caracteres no permitidos como ":" con "_"



  const generatePDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Guardar el PDF con el nombre que incluye la fecha y hora
    const fileName = `venta_${id}_${formattedDate}.pdf`;
    pdf.save(fileName);

    // Registrar log
    await createLog({ action: `Generó un pdf de la venta - #${id}`, affected_table: 'ninguno'});
    
    Swal.fire({
      icon: 'success',
      title: 'PDF generado',
      text: 'El comprobante de venta se ha descargado correctamente',
      timer: 2000,
      showConfirmButton: false
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!saleInfo) {
    return (
      <div className="alert alert-danger mt-4">
        No se encontró información para esta venta
      </div>
    );
  }

  const customer = customers[saleInfo.customer_id] || {};
  const paymentMethod = paymentMethods[saleInfo.payment_method_id] || {};
  const user = users[saleInfo.user_id] || {};
  const roleName = roles[user.role_id] || 'N/A';

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary mb-0">
          <i className="bi bi-receipt me-2"></i> Detalles de Venta #{id}
        </h2>
        <div>
          <button 
            onClick={() => navigate('/ventas')} 
            className="btn btn-outline-secondary me-2"
          >
            <i className="bi bi-arrow-left me-2"></i> Volver
          </button>
          <button 
            onClick={generatePDF}
            className="btn btn-danger"
          >
            <i className="bi bi-file-earmark-pdf me-2"></i> Generar PDF
          </button>
        </div>
      </div>

      {/* Contenido para PDF */}
      <div ref={pdfRef} className="p-4 bg-white">
        {/* Encabezado del PDF */}
        <div className="text-center mb-4">
          <h1 className="text-primary">NOVA SALUD</h1>
          <h3 className="text-secondary">Comprobante de Venta #{id}</h3>
            <p className="text-muted">
              Fecha: {new Date(saleInfo.created_at).toLocaleDateString('es-PE')} - 
              Hora: {new Date(saleInfo.created_at).toLocaleTimeString('es-PE', { hour12: true })}
            </p>

          <hr className="border-primary" />
        </div>

        {/* Información general de la venta */}
        <div className="mb-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Información del Cliente</h5>
              <p className="mb-1"><strong>Nombre:</strong> {customer.name || 'N/A'}</p>
              {customer.dni && <p className="mb-1"><strong>DNI:</strong> {customer.dni}</p>}
              {customer.phone && <p className="mb-1"><strong>Teléfono:</strong> {customer.phone}</p>}
            </div>
            <div className="col-md-6 mb-3">
              <h5 className="text-primary">Información de Pago</h5>
              <p className="mb-1"><strong>Método:</strong> {paymentMethod.name || 'N/A'}</p>
              <p className="mb-1"><strong>Atendido por:</strong> {user.name || 'N/A'} ({roleName})</p>
              <p className="mb-1"><strong>Total:</strong> S/ {parseFloat(saleInfo.total).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="mb-4">
          <h5 className="text-primary mb-3">Detalle de Productos</h5>
          <table className="table table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Producto</th>
                <th className="text-center">Cantidad</th>
                <th className="text-end">P. Unitario</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {saleDetails.length > 0 ? (
                saleDetails.map(detail => {
                  const product = productsInfo[detail.product_id] || {};
                  return (
                    <tr key={detail.id}>
                      <td>
                        <strong>{product.name || `ID: ${detail.product_id}`}</strong>
                        {product.description && (
                          <div className="text-muted small">{product.description}</div>
                        )}
                      </td>
                      <td className="text-center">{detail.quantity}</td>
                      <td className="text-end">S/ {parseFloat(detail.unit_price).toFixed(2)}</td>
                      <td className="text-end fw-bold">
                        S/ {(detail.quantity * detail.unit_price).toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No hay productos en esta venta
                  </td>
                </tr>
              )}
            </tbody>
            {saleDetails.length > 0 && (
              <tfoot className="table-secondary">
                <tr>
                  <td colSpan="3" className="text-end fw-bold">Total:</td>
                  <td className="text-end fw-bold">
                    S/ {saleDetails.reduce((sum, d) => sum + d.quantity * d.unit_price, 0).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {/* Información adicional */}
        <div className="row mt-4">
          <div className="col-md-6 mb-4">
            <div className="p-3 border rounded">
              <h5 className="text-primary">Datos del Cliente</h5>
              {customer.id ? (
                <>
                  <p className="mb-1"><strong>Nombre:</strong> {customer.name}</p>
                  {customer.dni && <p className="mb-1"><strong>DNI:</strong> {customer.dni}</p>}
                  {customer.email && <p className="mb-1"><strong>Email:</strong> {customer.email}</p>}
                  {customer.phone && <p className="mb-1"><strong>Teléfono:</strong> {customer.phone}</p>}
                  {customer.address && <p className="mb-1"><strong>Dirección:</strong> {customer.address}</p>}
                </>
              ) : (
                <p className="text-muted">No hay información del cliente</p>
              )}
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="p-3 border rounded">
              <h5 className="text-primary">Datos del Vendedor</h5>
              {user.id ? (
                <>
                  <p className="mb-1"><strong>Nombre:</strong> {user.name}</p>
                  {user.email && <p className="mb-1"><strong>Email:</strong> {user.email}</p>}
                  <p className="mb-1"><strong>Rol:</strong> {roleName}</p>
                </>
              ) : (
                <p className="text-muted">No hay información del vendedor</p>
              )}
            </div>
          </div>
        </div>

        {/* Pie de página del PDF */}
        <div className="mt-5 pt-4 border-top text-center text-muted small">
          <p>Este documento es un comprobante de venta generado automáticamente</p>
          <p>¡Gracias por su compra!🙂</p>
          <p>NOVA SALUD - {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Versión normal para la web (oculta en PDF) */}
      <div className="d-none">
        {/* Información general de la venta */}
        <div className="card shadow-sm border-primary mb-4">
          <div className="card-header bg-primary text-white">
            Información General de la Venta
          </div>
          <div className="card-body bg-light">
            <div className="row">
              <div className="col-md-4 mb-3">
                <h6 className="text-muted">Cliente</h6>
                <p className="mb-0">
                  <strong>{customer.name || 'N/A'}</strong><br />
                  {customer.dni && <small>DNI: {customer.dni}</small>}<br />
                  {customer.phone && <small>Tel: {customer.phone}</small>}
                </p>
              </div>
              <div className="col-md-4 mb-3">
                <h6 className="text-muted">Método de Pago</h6>
                <p className="mb-0">
                  <strong>{paymentMethod.name || 'N/A'}</strong><br />
                  {paymentMethod.description && <small>{paymentMethod.description}</small>}
                </p>
              </div>
              <div className="col-md-4">
                <h6 className="text-muted">Datos de Venta</h6>
                <p className="mb-0">
                  <strong>Fecha:</strong> {new Date(saleInfo.created_at).toLocaleString()}<br />
                  <strong>Atendido por:</strong> {user.name || 'N/A'}<br />
                  <strong>Total:</strong> <span className="text-success">S/ {parseFloat(saleInfo.total).toFixed(2)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="card shadow-sm border-secondary">
          <div className="card-header bg-secondary text-white">
            Productos Vendidos
          </div>
          <div className="card-body p-0 bg-white">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Precio Unitario</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {saleDetails.map(detail => {
                    const product = productsInfo[detail.product_id] || {};
                    return (
                      <tr key={detail.id}>
                        <td>
                          <strong>{product.name || `ID: ${detail.product_id}`}</strong>
                          {product.description && (
                            <div className="text-muted small">{product.description}</div>
                          )}
                        </td>
                        <td className="text-center">{detail.quantity}</td>
                        <td className="text-end">S/ {parseFloat(detail.unit_price).toFixed(2)}</td>
                        <td className="text-end fw-bold">
                          S/ {(detail.quantity * detail.unit_price).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end fw-bold">Total:</td>
                    <td className="text-end fw-bold text-success">
                      S/ {saleDetails.reduce((sum, d) => sum + d.quantity * d.unit_price, 0).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="row mt-4">
          <div className="col-md-6 mb-4">
            <div className="card border-info shadow-sm">
              <div className="card-header bg-info text-white">Información del Cliente</div>
              <div className="card-body bg-light">
                {customer.id ? (
                  <>
                    <p><strong>Nombre:</strong> {customer.name}</p>
                    {customer.dni && <p><strong>DNI:</strong> {customer.dni}</p>}
                    {customer.email && <p><strong>Email:</strong> {customer.email}</p>}
                    {customer.phone && <p><strong>Teléfono:</strong> {customer.phone}</p>}
                    {customer.address && <p><strong>Dirección:</strong> {customer.address}</p>}
                  </>
                ) : (
                  <p className="text-muted">No hay información del cliente</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card border-warning shadow-sm">
              <div className="card-header bg-warning text-dark">Información del Vendedor</div>
              <div className="card-body bg-light">
                {user.id ? (
                  <>
                    <p><strong>Nombre:</strong> {user.name}</p>
                    {user.email && <p><strong>Email:</strong> {user.email}</p>}
                    <p><strong>Rol:</strong> {roleName}</p>
                  </>
                ) : (
                  <p className="text-muted">No hay información del vendedor</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailsPage;