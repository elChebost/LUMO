import React, { useState } from 'react';
import { FiX, FiAlertCircle, FiImage, FiAward } from 'react-icons/fi';

// ⚠️ Cambiado de 4000 a 3000 para coincidir con el backend
const API_URL = 'http://localhost:3000';

const MissionFormModal = ({ onClose, onMissionCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    previewImage: '',
    grade: '1° Primaria',
    status: 'activa',
    // Roles
    logicTitle: '',
    logicStory: '',
    logicReward: 10,
    creativityTitle: '',
    creativityStory: '',
    creativityReward: 10,
    writingTitle: '',
    writingStory: '',
    writingReward: 10
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
      // Construir el objeto narrative con los 3 roles
      const narrative = {
        logicTitle: formData.logicTitle,
        logicStory: formData.logicStory,
        logicReward: formData.logicReward,
        creativityTitle: formData.creativityTitle,
        creativityStory: formData.creativityStory,
        creativityReward: formData.creativityReward,
        writingTitle: formData.writingTitle,
        writingStory: formData.writingStory,
        writingReward: formData.writingReward
      };

      // ✅ Adaptado al endpoint /api/missions con mapeo de status
      const response = await fetch(`${API_URL}/api/missions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          summary: formData.summary,
          previewImage: formData.previewImage || null,
          description: formData.summary, // Backend espera description
          grade: formData.grade,
          status: formData.status === 'activa' ? 'active' : 'inactive',
          narrative: JSON.stringify(narrative),
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
    } catch {
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
      padding: 'var(--spacing-lg)',
      overflowY: 'auto',
      maxHeight: 'calc(90vh - 200px)'
    },
    errorBox: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-sm)',
      padding: 'var(--spacing-sm) var(--spacing-md)',
      backgroundColor: '#fee',
      border: '1px solid #fcc',
      borderRadius: 'var(--radius-md)',
      marginBottom: 'var(--spacing-md)'
    },
    errorIcon: {
      color: '#c00',
      flexShrink: 0
    },
    formGroup: {
      marginBottom: 'var(--spacing-md)'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--spacing-md)',
      marginBottom: 'var(--spacing-md)'
    },
    label: {
      display: 'block',
      marginBottom: 'var(--spacing-xs)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-primary)'
    },
    required: {
      color: '#c00'
    },
    input: {
      width: '100%',
      padding: 'var(--spacing-sm) var(--spacing-md)',
      fontSize: 'var(--text-sm)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-color)',
      backgroundColor: 'var(--panel-bg)',
      color: 'var(--text-primary)',
      outline: 'none',
      transition: 'all 0.2s ease'
    },
    textarea: {
      resize: 'vertical',
      minHeight: '100px',
      fontFamily: 'inherit'
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
            backgroundColor: 'var(--panel-bg)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div style={{
            padding: 'var(--spacing-lg)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h2 style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Crear Nueva Misión
            </h2>
            <button
              onClick={onClose}
              style={{
                padding: 'var(--spacing-sm)',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-page)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary)';
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

          {/* Información básica */}
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
              placeholder="Ej: La Aventura del Reino Matemático"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Resumen <span style={styles.required}>*</span>
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              style={{ ...styles.input, ...styles.textarea, minHeight: '80px' }}
              placeholder="Breve descripción de la misión..."
              rows="3"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <FiImage size={14} style={{ marginRight: '0.25rem', verticalAlign: 'text-bottom' }} />
              URL Imagen de Preview
            </label>
            <input
              type="url"
              name="previewImage"
              value={formData.previewImage}
              onChange={handleChange}
              style={styles.input}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {formData.previewImage && (
              <div style={{ 
                marginTop: 'var(--spacing-sm)', 
                width: '100%', 
                height: '100px', 
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-page)'
              }}>
                <img 
                  src={formData.previewImage} 
                  alt="Preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          <div style={styles.formRow}>
            <div>
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

            <div>
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
          </div>

          {/* Separador */}
          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'var(--border-color)',
            margin: 'var(--spacing-xl) 0'
          }} />

          {/* Sección de roles */}
          <h3 style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: '0 0 var(--spacing-md) 0'
          }}>
            Roles de la Misión
          </h3>

          {/* Rol Lógica */}
          <div style={{
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--bg-page)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-md)'
          }}>
            <h4 style={{
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-sm) 0',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-xs)'
            }}>
              <FiAward size={16} style={{ color: 'var(--primary)' }} />
              Rol Lógica
            </h4>
            <div style={styles.formGroup}>
              <label style={styles.label}>Título del Rol</label>
              <input
                type="text"
                name="logicTitle"
                value={formData.logicTitle}
                onChange={handleChange}
                style={styles.input}
                placeholder="Ej: El Estratega"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Historia</label>
              <textarea
                name="logicStory"
                value={formData.logicStory}
                onChange={handleChange}
                style={{ ...styles.input, ...styles.textarea }}
                placeholder="Describe la historia de este rol..."
                rows="3"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Recompensa (puntos)</label>
              <input
                type="number"
                name="logicReward"
                value={formData.logicReward}
                onChange={handleChange}
                style={styles.input}
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* Rol Creatividad */}
          <div style={{
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--bg-page)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-md)'
          }}>
            <h4 style={{
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-sm) 0',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-xs)'
            }}>
              <FiAward size={16} style={{ color: 'var(--primary)' }} />
              Rol Creatividad
            </h4>
            <div style={styles.formGroup}>
              <label style={styles.label}>Título del Rol</label>
              <input
                type="text"
                name="creativityTitle"
                value={formData.creativityTitle}
                onChange={handleChange}
                style={styles.input}
                placeholder="Ej: El Artista"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Historia</label>
              <textarea
                name="creativityStory"
                value={formData.creativityStory}
                onChange={handleChange}
                style={{ ...styles.input, ...styles.textarea }}
                placeholder="Describe la historia de este rol..."
                rows="3"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Recompensa (puntos)</label>
              <input
                type="number"
                name="creativityReward"
                value={formData.creativityReward}
                onChange={handleChange}
                style={styles.input}
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* Rol Lengua */}
          <div style={{
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--bg-page)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-md)'
          }}>
            <h4 style={{
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-sm) 0',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-xs)'
            }}>
              <FiAward size={16} style={{ color: 'var(--primary)' }} />
              Rol Lengua
            </h4>
            <div style={styles.formGroup}>
              <label style={styles.label}>Título del Rol</label>
              <input
                type="text"
                name="writingTitle"
                value={formData.writingTitle}
                onChange={handleChange}
                style={styles.input}
                placeholder="Ej: El Cronista"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Historia</label>
              <textarea
                name="writingStory"
                value={formData.writingStory}
                onChange={handleChange}
                style={{ ...styles.input, ...styles.textarea }}
                placeholder="Describe la historia de este rol..."
                rows="3"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Recompensa (puntos)</label>
              <input
                type="number"
                name="writingReward"
                value={formData.writingReward}
                onChange={handleChange}
                style={styles.input}
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* Footer */}
          <div style={{
            padding: 'var(--spacing-lg) 0 0 0',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            gap: 'var(--spacing-md)',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: 'var(--spacing-sm) var(--spacing-lg)',
                backgroundColor: 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                color: 'var(--text-secondary)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-page)';
                  e.currentTarget.style.borderColor = 'var(--text-secondary)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: 'var(--spacing-sm) var(--spacing-lg)',
                backgroundColor: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
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
