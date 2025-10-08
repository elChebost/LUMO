import React, { useState } from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';

const API_URL = 'http://localhost:4000';

const StudentFormModal = ({ isOpen, onClose, onStudentAdded }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El correo no es válido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: 'alumno',
          xp: 0,
          level: 1
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error && data.error.includes('correo')) {
          setErrors({ email: 'Este correo ya está registrado' });
        } else {
          setErrors({ general: data.error || 'Error al crear el alumno' });
        }
        setLoading(false);
        return;
      }

      // TODO: Aquí se enviaría el email de invitación
      console.log('Enviar email a:', formData.email);
      console.log('Mensaje: El profesor te invitó a su aula en LUMO');

      // Limpiar formulario y cerrar modal
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      setErrors({});
      onStudentAdded();
      onClose();
    } catch (error) {
      setErrors({ general: 'Error de conexión. Por favor, intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="fade-in" style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-xl)',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: 0
          }}>
            Agregar Alumno
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              color: 'var(--color-text-secondary)',
              transition: 'color var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          {/* Error general */}
          {errors.general && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.875rem 1rem',
              backgroundColor: '#FEE',
              border: '1px solid #FCC',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem'
            }}>
              <FiAlertCircle size={20} color="#D32F2F" />
              <span style={{
                fontSize: '0.875rem',
                color: '#D32F2F'
              }}>
                {errors.general}
              </span>
            </div>
          )}

          {/* Nombre */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem'
            }}>
              Nombre *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              style={{
                width: '100%',
                height: '44px',
                padding: '0 1rem',
                border: `1px solid ${errors.firstName ? '#D32F2F' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-text-primary)',
                transition: 'all var(--transition-fast)'
              }}
              onFocus={(e) => {
                if (!errors.firstName) {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                }
              }}
              onBlur={(e) => {
                if (!errors.firstName) {
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.firstName && (
              <p style={{
                fontSize: '0.75rem',
                color: '#D32F2F',
                margin: '0.25rem 0 0 0'
              }}>
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Apellido */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem'
            }}>
              Apellido *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              style={{
                width: '100%',
                height: '44px',
                padding: '0 1rem',
                border: `1px solid ${errors.lastName ? '#D32F2F' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-text-primary)',
                transition: 'all var(--transition-fast)'
              }}
              onFocus={(e) => {
                if (!errors.lastName) {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                }
              }}
              onBlur={(e) => {
                if (!errors.lastName) {
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.lastName && (
              <p style={{
                fontSize: '0.75rem',
                color: '#D32F2F',
                margin: '0.25rem 0 0 0'
              }}>
                {errors.lastName}
              </p>
            )}
          </div>

          {/* Email */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem'
            }}>
              Correo *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              style={{
                width: '100%',
                height: '44px',
                padding: '0 1rem',
                border: `1px solid ${errors.email ? '#D32F2F' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-text-primary)',
                transition: 'all var(--transition-fast)'
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                }
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.email && (
              <p style={{
                fontSize: '0.75rem',
                color: '#D32F2F',
                margin: '0.25rem 0 0 0'
              }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem'
            }}>
              Contraseña asignada *
            </label>
            <input
              type="text"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Mínimo 6 caracteres"
              style={{
                width: '100%',
                height: '44px',
                padding: '0 1rem',
                border: `1px solid ${errors.password ? '#D32F2F' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-text-primary)',
                transition: 'all var(--transition-fast)'
              }}
              onFocus={(e) => {
                if (!errors.password) {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                }
              }}
              onBlur={(e) => {
                if (!errors.password) {
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.password && (
              <p style={{
                fontSize: '0.75rem',
                color: '#D32F2F',
                margin: '0.25rem 0 0 0'
              }}>
                {errors.password}
              </p>
            )}
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-secondary)',
              margin: '0.5rem 0 0 0'
            }}>
              Se enviará un email de invitación al correo proporcionado
            </p>
          </div>

          {/* Botones */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                height: '44px',
                padding: '0 1.5rem',
                backgroundColor: 'transparent',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                height: '44px',
                padding: '0 1.5rem',
                backgroundColor: loading ? '#ccc' : 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                }
              }}
            >
              {loading ? 'Creando...' : 'Agregar Alumno'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;
