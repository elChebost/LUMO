import React, { useState, useEffect } from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';

// ⚠️ Cambiado de 4000 a 3000 para coincidir con el backend
const API_URL = 'http://localhost:3000';

const MissionFormModal = ({ onClose, onMissionCreated }) => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    grade: '1° Primaria',
    status: 'activa'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ⚠️ Comentado - no se necesita cargar estudiantes para este formulario simplificado
  // useEffect(() => {
  //   loadStudents();
  // }, []);

  // const loadStudents = async () => {
  //   try {
  //     const response = await fetch(`${API_URL}/api/students`);
  //     const data = await response.json();
  //     setStudents(data);
  //   } catch (error) {
  //     console.error('Error cargando alumnos:', error);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ✅ Adaptado al endpoint /api/missions con mapeo de status
      const response = await fetch(`${API_URL}/api/missions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          grade: formData.grade,
          status: formData.status === 'activa' ? 'active' : 'inactive', // ✅ Mapear status
          teacherId: 1  // ⚠️ Valor temporal - cambiar cuando se implemente auth
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al crear la misión');
        setLoading(false);
        return;
      }

      // Limpiar formulario y cerrar modal
      if (onMissionCreated) {
        onMissionCreated();
      }
      onClose();
    } catch (err) {
      setError('Error de conexión. Por favor, intenta de nuevo.');
      setLoading(false);
    }
  };

  // ⚠️ Funciones comentadas - no se usan en la versión simplificada
  // const toggleStudent = (studentId) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     studentIds: prev.studentIds.includes(studentId)
  //       ? prev.studentIds.filter(id => id !== studentId)
  //       : [...prev.studentIds, studentId]
  //   }));
  // };

  // const toggleAllStudents = () => {
  //   setFormData(prev => ({
  //     ...prev,
  //     studentIds: prev.studentIds.length === students.length
  //       ? []
  //       : students.map(s => s.id)
  //   }));
  // };

  const styles = {
    form: {
      padding: '1.5rem',
      overflowY: 'auto',
      maxHeight: 'calc(90vh - 200px)'
    },
    errorBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      backgroundColor: '#fee',
      border: '1px solid #fcc',
      borderRadius: 'var(--radius-md)',
      marginBottom: '1rem'
    },
    errorIcon: {
      color: '#c00',
      flexShrink: 0
    },
    formGroup: {
      marginBottom: '1.25rem'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '1rem',
      marginBottom: '1.25rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      color: 'var(--color-text-primary)'
    },
    required: {
      color: '#c00'
    },
    input: {
      width: '100%',
      padding: '0.625rem 0.875rem',
      fontSize: '0.875rem',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-bg)',
      color: 'var(--color-text-primary)',
      outline: 'none',
      transition: 'all var(--transition-fast)'
    },
    textarea: {
      resize: 'vertical',
      minHeight: '100px'
    },
    checkboxGroup: {
      marginBottom: '0.75rem',
      paddingBottom: '0.75rem',
      borderBottom: '1px solid var(--color-border)'
    },
    studentList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      maxHeight: '200px',
      overflowY: 'auto',
      padding: '0.5rem',
      backgroundColor: 'var(--color-bg)',
      borderRadius: 'var(--radius-md)'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: 'var(--radius-sm)',
      transition: 'background-color 0.2s'
    },
    checkbox: {
      width: '16px',
      height: '16px',
      cursor: 'pointer'
    },
    checkboxText: {
      fontSize: '0.875rem',
      color: 'var(--color-text-primary)'
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="fade-in"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: 0
            }}>
              Crear Nueva Misión
            </h2>
            <button
              onClick={onClose}
              style={{
                padding: '0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)',
                transition: 'all var(--transition-fast)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && (
            <div style={styles.errorBox}>
              <FiAlertCircle style={styles.errorIcon} />
              <span>{error}</span>
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Título <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ej: Ejercicios de matemáticas"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Descripción <span style={styles.required}>*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ ...styles.input, ...styles.textarea }}
              placeholder="Describe la misión..."
              rows="4"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Grado <span style={styles.required}>*</span>
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="1° Primaria">1° Primaria</option>
              <option value="2° Primaria">2° Primaria</option>
              <option value="3° Primaria">3° Primaria</option>
              <option value="4° Primaria">4° Primaria</option>
              <option value="5° Primaria">5° Primaria</option>
              <option value="6° Primaria">6° Primaria</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Estado</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="activa">Activa</option>
              <option value="cerrada">Cerrada</option>
            </select>
          </div>

          {/* Footer */}
          <div style={{
            padding: '1.5rem 0 0 0',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn-secondary"
              style={{
                padding: '0.625rem 1.25rem',
                backgroundColor: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                padding: '0.625rem 1.25rem',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Creando...' : 'Crear Misión'}
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default MissionFormModal;
