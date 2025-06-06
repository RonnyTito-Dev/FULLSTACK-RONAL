import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';
import { createLog } from '../services/logService';


const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  // Fetch category data if editing
  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          setLoading(true);
          const { data } = await api.get(`/categories/${id}`);
          setFormData({
            name: data.name,
            description: data.description || ''
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cargar la categoría',
            confirmButtonColor: '#3085d6'
          });
          navigate('/categorias');
        } finally {
          setLoading(false);
        }
      };

      fetchCategory();
    }
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

    try {
      if (id) {
        // Update existing category
        await api.put(`/categories/${id}`, formData);

        // Registrar log
        await createLog({ action: 'Editó una categoria', affected_table: 'categories'});

        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'La categoría ha sido actualizada correctamente',
          confirmButtonColor: '#3085d6'
        });

      } else {
        // Create new category
        await api.post('/categories', formData);

        // Registrar log
        await createLog({ action: 'Creó una categoria', affected_table: 'categories'});

        Swal.fire({
          icon: 'success',
          title: '¡Creado!',
          text: 'La categoría ha sido creada correctamente',
          confirmButtonColor: '#3085d6'
        });
      }
      navigate('/categorias');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Ocurrió un error al guardar la categoría',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-form">
      {/* Header with title and back button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 d-flex align-items-center">
          <i className={`bi ${id ? 'bi-pencil' : 'bi-plus-lg'} me-2 text-primary`}></i>
          {id ? 'Editar Categoría' : 'Nueva Categoría'}
        </h2>
        <button 
          onClick={() => navigate('/categorias')} 
          className="btn btn-outline-secondary"
        >
          <i className="bi bi-arrow-left me-2"></i> Volver
        </button>
      </div>

      {/* Form */}
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre <span className="text-danger">*</span>
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

            <div className="mb-4">
              <label htmlFor="description" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="d-flex justify-content-end">
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
                    {id ? 'Actualizar Categoría' : 'Guardar Categoría'}
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

export default CategoryForm;