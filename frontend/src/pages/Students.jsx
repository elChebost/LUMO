import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiUserPlus } from 'react-icons/fi';
import StudentRow from '../components/StudentRow';

const API_URL = 'http://localhost:4000/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      // Filtrar solo alumnos
      const studentsOnly = data.filter(user => user.role === 'alumno');
      setStudents(studentsOnly);
    } catch (error) {
      console.error('Error cargando alumnos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar estudiantes por búsqueda y nivel
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || student.level === parseInt(filterLevel);
    return matchesSearch && matchesLevel;
  });

  return (
    <div style={{ padding: '0' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: '0 0 0.5rem 0'
        }}>
          Alumnos
        </h1>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)',
          margin: 0
        }}>
          Gestión y seguimiento de estudiantes
        </p>
      </div>

      {/* Barra de acciones */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {/* Buscador */}
        <div style={{
          position: 'relative',
          flex: '1',
          minWidth: '300px',
          maxWidth: '520px'
        }}>
          <FiSearch 
            size={18} 
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-secondary)',
              pointerEvents: 'none'
            }}
          />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              height: '44px',
              padding: '0 1rem 0 3rem',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text-primary)',
              transition: 'all var(--transition-fast)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-primary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--color-border)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Filtro por nivel */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FiFilter size={18} style={{ color: 'var(--color-text-secondary)' }} />
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            style={{
              height: '44px',
              padding: '0 2.5rem 0 1rem',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              backgroundColor: 'var(--color-card-bg)',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23757575' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center'
            }}
          >
            <option value="all">Todos los niveles</option>
            <option value="1">Nivel 1</option>
            <option value="2">Nivel 2</option>
            <option value="3">Nivel 3</option>
            <option value="4">Nivel 4</option>
            <option value="5">Nivel 5</option>
          </select>
        </div>

        {/* Botón Agregar Alumno */}
        <button
          onClick={() => console.log('Agregar alumno')}
          style={{
            height: '44px',
            padding: '0 1.5rem',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap',
            marginLeft: 'auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <FiUserPlus size={18} />
          Agregar Alumno
        </button>
      </div>

      {/* Tabla de alumnos */}
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{
                backgroundColor: 'var(--color-bg)',
                borderBottom: '2px solid var(--color-border)',
                position: 'sticky',
                top: 0,
                zIndex: 10
              }}>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Alumno
                </th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Nivel
                </th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  XP
                </th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Misiones
                </th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Última actividad
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>
                  <StudentRow loading />
                  <StudentRow loading />
                  <StudentRow loading />
                  <StudentRow loading />
                  <StudentRow loading />
                </>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <StudentRow key={student.id} student={student} />
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.875rem',
                      margin: 0
                    }}>
                      {searchTerm || filterLevel !== 'all'
                        ? 'No se encontraron alumnos con esos criterios'
                        : 'No hay alumnos registrados aún'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer con información */}
      {!loading && filteredStudents.length > 0 && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
            margin: 0
          }}>
            Mostrando {filteredStudents.length} de {students.length} alumnos
          </p>
        </div>
      )}
    </div>
  );
};

export default Students;

