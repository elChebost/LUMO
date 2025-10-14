import React, { useState, useEffect } from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';

const API_URL = 'http://localhost:4000';

const MissionFormModal = ({ onClose, onMissionCreated }) => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: 'Matemáticas',
    dueDate: '',
    timeLimit: '23:59',
    activationDate: new Date().toISOString().split('T')[0],
    status: 'activa',
    studentIds: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`);
      const data = await response.json();
      const studentsOnly = data.filter(user => user.role === 'alumno');
      setStudents(studentsOnly);
    } catch (error) {
      console.error('Error cargando alumnos:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/missions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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

  const toggleStudent = (studentId) => {
    setFormData(prev => ({
      ...prev,
      studentIds: prev.studentIds.includes(studentId)
        ? prev.studentIds.filter(id => id !== studentId)
        : [...prev.studentIds, studentId]
    }));
  };

  const toggleAllStudents = () => {
    setFormData(prev => ({
      ...prev,
      studentIds: prev.studentIds.length === students.length
        ? []
        : students.map(s => s.id)
    }));
  };

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
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={styles.input}
              placeholder="Ej: Ejercicios de matemáticas"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Asignatura <span style={styles.required}>*</span>
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              style={styles.input}
              required
            >
              <option value="Matemáticas">Matemáticas</option>
              <option value="Lengua">Lengua</option>
              <option value="Ciencias Naturales">Ciencias Naturales</option>
              <option value="Historia">Historia</option>
              <option value="Inglés">Inglés</option>
              <option value="Educación Física">Educación Física</option>
              <option value="Artes">Artes</option>
              <option value="General">General</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Descripción <span style={styles.required}>*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ ...styles.input, ...styles.textarea }}
              placeholder="Describe la misión..."
              rows="4"
              required
            />
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Fecha de activación <span style={styles.required}>*</span>
              </label>
              <input
                type="date"
                value={formData.activationDate}
                onChange={(e) => setFormData({ ...formData, activationDate: e.target.value })}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Fecha de entrega <span style={styles.required}>*</span>
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                style={styles.input}
                min={formData.activationDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Hora límite <span style={styles.required}>*</span>
              </label>
              <input
                type="time"
                value={formData.timeLimit}
                onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value })}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Estado</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={styles.input}
            >
              <option value="activa">Activa</option>
              <option value="cerrada">Cerrada</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Asignar a alumnos <span style={styles.required}>*</span>
            </label>
            <div style={styles.checkboxGroup}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.studentIds.length === students.length && students.length > 0}
                  onChange={toggleAllStudents}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>Seleccionar todos</span>
              </label>
            </div>
            <div style={styles.studentList}>
              {students.map(student => (
                <label key={student.id} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.studentIds.includes(student.id)}
                    onChange={() => toggleStudent(student.id)}
                    style={styles.checkbox}
                  />
                  <span style={styles.checkboxText}>
                    {student.firstName} {student.lastName}
                  </span>
                </label>
              ))}
            </div>
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
