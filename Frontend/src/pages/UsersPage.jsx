import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/axiosInstance';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.get('/users');
            setUsers(data);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('No se pudo obtener la lista de usuarios.');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo obtener la lista de usuarios.',
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleEdit = (userId) => {
        Swal.fire({
            title: 'Editar usuario',
            text: `¿Deseas editar el usuario con ID: ${userId}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, editar',
            cancelButtonText: 'Cancelar',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-warning mx-2',
                cancelButton: 'btn btn-secondary mx-2'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(`Editando usuario ${userId}`);
            }
        });
    };

    const handleDelete = async (userId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `Esta acción eliminará al usuario con ID: ${userId}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-danger mx-2',
                cancelButton: 'btn btn-secondary mx-2'
            }
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/users/${userId}`);
                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'El usuario ha sido eliminado.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn btn-success mx-2'
                    }
                });
                fetchUsers();
            } catch (err) {
                console.error('Error deleting user:', err);
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo eliminar el usuario',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn btn-primary mx-2'
                    }
                });
            }
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="text-center">
                    <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-3 h4">Cargando usuarios...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger text-center">
                    <p className="h4">{error}</p>
                    <button 
                        onClick={fetchUsers}
                        className="btn btn-primary mt-3"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h1 className="h3 mb-0">Gestión de Usuarios</h1>
                </div>
                <div className="card-body">
                    {users.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="h4 text-muted">No hay usuarios registrados</p>
                            <button 
                                onClick={fetchUsers}
                                className="btn btn-primary mt-3"
                            >
                                Refrescar
                            </button>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Email</th>
                                        <th scope="col" className="text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name || 'N/A'}</td>
                                            <td>{user.email || 'N/A'}</td>
                                            <td className="text-end">
                                                <button 
                                                    onClick={() => handleEdit(user.id)}
                                                    className="btn btn-warning btn-sm me-2"
                                                    disabled={true}
                                                >
                                                    <i className="bi bi-pencil-fill"></i>
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(user.id)}
                                                    className="btn btn-danger btn-sm"
                                                    disabled={true}
                                                >
                                                    <i className="bi bi-trash-fill"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserPage;