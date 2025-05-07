import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';
import { createLog } from '../services/logService';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role_id: '',
    password: '',
    password_confirmation: ''
  });

  // Fetch user data if editing and roles list
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Always fetch roles
        const rolesRes = await api.get('/roles');
        setRoles(rolesRes.data);
        
        // If editing, fetch user data
        if (id) {
          const userRes = await api.get(`/users/${id}`);
          setFormData(prev => ({
            ...prev,
            name: userRes.data.name,
            email: userRes.data.email,
            role_id: userRes.data.role_id,
            password: '',
            password_confirmation: ''
          }));
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los datos',
          confirmButtonColor: '#3085d6'
        });
        navigate('/usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare data to send (exclude password fields if editing)
    const dataToSend = id 
      ? { 
          name: formData.name,
          email: formData.email,
          role_id: formData.role_id
        }
      : formData;

    try {
      if (id) {
        // Update existing user (without password)
        await api.put(`/users/${id}`, dataToSend);
        // Registrar log actualizar
        await createLog({ action: 'Editó datos un usuario', affected_table: 'users'});
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'El usuario ha sido actualizado correctamente',
          confirmButtonColor: '#3085d6'
        });
      } else {
        // Create new user (with password)
        if (formData.password !== formData.password_confirmation) {
          throw new Error('Las contraseñas no coinciden');
        }
        await api.post('/users', dataToSend);
        
        // Registrar log agregar
        await createLog({ action: 'Agregó un usuario', affected_table: 'users'});

        Swal.fire({
          icon: 'success',
          title: '¡Creado!',
          text: 'El usuario ha sido creado correctamente',
          confirmButtonColor: '#3085d6'
        });
      }
      navigate('/usuarios');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || error.message || 'Ocurrió un error al guardar el usuario',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-form">
      {/* Header with title and back button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 d-flex align-items-center">
          <i className={`bi ${id ? 'bi-pencil' : 'bi-plus-lg'} me-2 text-primary`}></i>
          {id ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h2>
        <button 
          onClick={() => navigate('/usuarios')} 
          className="btn btn-outline-secondary"
        >
          <i className="bi bi-arrow-left me-2"></i> Volver
        </button>
      </div>

      {/* Form */}
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre Completo <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="role_id" className="form-label">
                Rol <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                id="role_id"
                name="role_id"
                value={formData.role_id}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Seleccionar rol</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>

            {!id && (
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!id}
                    disabled={loading}
                    minLength="8"
                  />
                  <div className="form-text">Mínimo 8 caracteres</div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="password_confirmation" className="form-label">
                    Confirmar Contraseña <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    required={!id}
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            <div className="d-flex justify-content-end mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {id ? 'Actualizando...' : 'Creando...'}
                  </>
                ) : (
                  <>
                    <i className={`bi ${id ? 'bi-check-lg' : 'bi-save'} me-2`}></i>
                    {id ? 'Actualizar Usuario' : 'Guardar Usuario'}
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

export default UserForm;