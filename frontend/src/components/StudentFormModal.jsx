import React, { useState } from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';
import { API_URL } from '../config/api';
import { getAuthHeaders } from '../utils/auth';

const StudentFormModal = ({ isOpen, onClose, onStudentAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '', // ✅ Campo para el registro de usuario
    age: '',
    grade: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El correo no es válido';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.age || formData.age < 1 || formData.age > 100) {
      newErrors.age = 'La edad debe ser válida';
    }

    if (!formData.grade.trim()) {
      newErrors.grade = 'El grado es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // ✅ Primero crear usuario con /api/users/register
      const userResponse = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'student'
        }),
      });

      const userData = await userResponse.json();

      if (!userResponse.ok) {
        if (userData.error && userData.error.includes('email')) {
          setErrors({ email: 'Este correo ya está registrado' });
        } else {
          setErrors({ general: userData.error || 'Error al crear el usuario' });
        }
        setLoading(false);
        return;
      }

      // ✅ Luego crear el alumno con el userId obtenido
      const studentResponse = await fetch(`${API_URL}/api/students`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          age: Number(formData.age),
          grade: formData.grade,
          level: 1,
          schedule: 'Matutino',
          schoolId: 1,
          teacherId: 1,
          classroomId: 1,
          userId: userData.id // ✅ Asociar usuario creado con el alumno
        }),
      });

      const studentData = await studentResponse.json();

      if (!studentResponse.ok) {
        setErrors({ general: studentData.error || 'Error al crear el alumno' });
        setLoading(false);
        return;
      }

      // Limpiar formulario y cerrar modal
      setFormData({ name: '', email: '', password: '', age: '', grade: '' });
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

          {/* Nombre completo */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem'
            }}>
              Nombre completo *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ej: Juan Pérez"
              style={{
                width: '100%',
                height: '44px',
                padding: '0 1rem',
                border: `1px solid ${errors.name ? '#D32F2F' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-text-primary)',
                transition: 'all var(--transition-fast)'
              }}
              onFocus={(e) => {
                if (!errors.name) {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                }
              }}
              onBlur={(e) => {
                if (!errors.name) {
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.name && (
              <p style={{
                fontSize: '0.75rem',
                color: '#D32F2F',
                margin: '0.25rem 0 0 0'
              }}>
                {errors.name}
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
              Correo electrónico *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Ej: alumno@ejemplo.com"
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

          {/* ✅ Contraseña */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem'
            }}>
              Contraseña *
            </label>
            <input
              type="password"
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
          </div>

          {/* Edad */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem'
            }}>
              Edad *
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              placeholder="Ej: 10"
              style={{
                width: '100%',
                height: '44px',
                padding: '0 1rem',
                border: `1px solid ${errors.age ? '#D32F2F' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-text-primary)',
                transition: 'all var(--transition-fast)'
              }}
              onFocus={(e) => {
                if (!errors.age) {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                }
              }}
              onBlur={(e) => {
                if (!errors.age) {
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            {errors.age && (
              <p style={{
                fontSize: '0.75rem',
                color: '#D32F2F',
                margin: '0.25rem 0 0 0'
              }}>
                {errors.age}
              </p>
            )}
          </div>

          {/* Grado */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem'
            }}>
              Grado *
            </label>
            <select
              value={formData.grade}
              onChange={(e) => handleChange('grade', e.target.value)}
              style={{
                width: '100%',
                height: '44px',
                padding: '0 1rem',
                border: `1px solid ${errors.grade ? '#D32F2F' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-text-primary)',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer'
              }}
              onFocus={(e) => {
                if (!errors.grade) {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                }
              }}
              onBlur={(e) => {
                if (!errors.grade) {
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              <option value="">Seleccionar grado</option>
              <option value="1° Primaria">1° Primaria</option>
              <option value="2° Primaria">2° Primaria</option>
              <option value="3° Primaria">3° Primaria</option>
              <option value="4° Primaria">4° Primaria</option>
              <option value="5° Primaria">5° Primaria</option>
              <option value="6° Primaria">6° Primaria</option>
            </select>
            {errors.grade && (
              <p style={{
                fontSize: '0.75rem',
                color: '#D32F2F',
                margin: '0.25rem 0 0 0'
              }}>
                {errors.grade}
              </p>
            )}
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
