import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';
import { createLog } from '../services/logService';

const CustomerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        dni: '',
        email: '',
        phone: '',
        address: '',
        date_of_birth: ''
    });

    const [errors, setErrors] = useState({});
    const [searching, setSearching] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const loadCustomer = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const res = await api.get(`/customers/${id}`);
                const customer = res.data;
                setFormData({
                    name: customer.name || '',
                    dni: customer.dni || '',
                    email: customer.email || '',
                    phone: customer.phone || '',
                    address: customer.address || '',
                    date_of_birth: formatDate(customer.date_of_birth)
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar el cliente',
                    confirmButtonColor: '#3085d6'
                });
                navigate('/clientes');
            } finally {
                setLoading(false);
            }
        };

        loadCustomer();
    }, [id, navigate]);

    const validateForm = () => {
        const newErrors = {};
        
        // Validación de nombre
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }
        
        // Validación de DNI
        if (!formData.dni.trim()) {
            newErrors.dni = 'El DNI es requerido';
        } else if (!/^\d{8}$/.test(formData.dni)) {
            newErrors.dni = 'DNI debe tener 8 dígitos';
        }
        
        // Validación de email
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email no válido';
        }
        
        // Validación de teléfono
        if (!formData.phone.trim()) {
            newErrors.phone = 'El celular es requerido';
        }
        
        // Validación de dirección
        if (!formData.address.trim()) {
            newErrors.address = 'La dirección es requerida';
        }
        
        // Validación de fecha de nacimiento
        if (!formData.date_of_birth) {
            newErrors.date_of_birth = 'La fecha de nacimiento es requerida';
        } else {
            const birthDate = new Date(formData.date_of_birth);
            const currentDate = new Date();
            if (birthDate >= currentDate) {
                newErrors.date_of_birth = 'La fecha debe ser anterior a hoy';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpiar error cuando se modifica el campo
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSearchDni = async () => {
        if (!/^\d{8}$/.test(formData.dni)) {
            setErrors(prev => ({ ...prev, dni: 'DNI debe tener 8 dígitos' }));
            return;
        }

        try {
            setSearching(true);
            const res = await api.get(`/reniec/${formData.dni}`);
            const { nombres, apellidoPaterno, apellidoMaterno } = res.data;
            const nombreCompleto = `${nombres} ${apellidoPaterno} ${apellidoMaterno}`;
            
            if (nombreCompleto.trim()) {
                // Registrar log
                await createLog({ action: 'Usó la Api Reniec', affected_table: 'ninguno'});
                setFormData(prev => ({
                    ...prev,
                    name: nombreCompleto
                }));
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'No encontrado',
                    text: 'No se encontró información para el DNI ingresado',
                    confirmButtonColor: '#3085d6'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al consultar el DNI',
                confirmButtonColor: '#3085d6'
            });
        } finally {
            setSearching(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);
            const customerData = {
                ...formData,
                date_of_birth: formData.date_of_birth || null
            };

            if (id) {
                await api.put(`/customers/${id}`, customerData);
                // Registrar log
                await createLog({ action: 'Editó un cliente', affected_table: 'customers'});
                Swal.fire({
                    icon: 'success',
                    title: '¡Cliente actualizado!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                await api.post('/customers', customerData);
                // Registrar log
                await createLog({ action: 'Creó un cliente', affected_table: 'customers'});
                Swal.fire({
                    icon: 'success',
                    title: '¡Cliente creado!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            navigate('/clientes');
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error al guardar el cliente';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMsg,
                confirmButtonColor: '#3085d6'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/clientes');
    };

    if (loading && id) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="customer-form">
            <div className="card shadow-sm">
                <div className="card-header bg-white">
                    <h3 className="mb-0">
                        <i className={`bi ${id ? 'bi-pencil' : 'bi-person-plus'} me-2`}></i>
                        {id ? 'Editar Cliente' : 'Nuevo Cliente'}
                    </h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Nombre */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Nombre *</label>
                                <input
                                    type="text"
                                    name="name"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            </div>

                            {/* DNI */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">DNI *</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="dni"
                                        className={`form-control ${errors.dni ? 'is-invalid' : ''}`}
                                        value={formData.dni}
                                        onChange={handleChange}
                                        disabled={loading}
                                        maxLength="8"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={handleSearchDni}
                                        disabled={loading || formData.dni.length !== 8 || searching}
                                    >
                                        {searching ? (
                                            <span className="spinner-border spinner-border-sm" />
                                        ) : (
                                            <i className="bi bi-search"></i>
                                        )}
                                    </button>
                                </div>
                                {errors.dni && <div className="invalid-feedback d-block">{errors.dni}</div>}
                            </div>

                            {/* Email */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            {/* Celular */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Celular *</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                            </div>

                            {/* Dirección */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Dirección *</label>
                                <input
                                    type="text"
                                    name="address"
                                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                    value={formData.address}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                            </div>

                            {/* Fecha de nacimiento */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Fecha de nacimiento *</label>
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    className={`form-control ${errors.date_of_birth ? 'is-invalid' : ''}`}
                                    value={formData.date_of_birth}
                                    onChange={handleChange}
                                    disabled={loading}
                                    max={new Date().toISOString().split('T')[0]}
                                />
                                {errors.date_of_birth && <div className="invalid-feedback">{errors.date_of_birth}</div>}
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={loading}>
                                <i className="bi bi-x-lg me-2"></i> Cancelar
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        {id ? 'Actualizando...' : 'Creando...'}
                                    </>
                                ) : (
                                    <>
                                        <i className={`bi ${id ? 'bi-check-lg' : 'bi-save'} me-2`}></i>
                                        {id ? 'Actualizar cliente' : 'Guardar cliente'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerForm;