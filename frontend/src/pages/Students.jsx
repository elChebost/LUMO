import React, { useState, useEffect } from 'react';
import { FiSearch, FiUserPlus } from 'react-icons/fi';
import StudentRow from '../components/StudentRow';
import StudentFormModal from '../components/StudentFormModal';

const API_URL = 'http://localhost:4000/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, submitted, pending
  const [sortBy, setSortBy] = useState('name-asc'); // name-asc, name-desc, activity-recent, activity-old
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    loadStudents();
    
    // Detectar móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

  // Función de ordenamiento
  const getSortedStudents = (studentsList) => {
    const sorted = [...studentsList];
    
    switch (sortBy) {
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'activity-recent':
        return sorted.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
      case 'activity-old':
        return sorted.sort((a, b) => new Date(a.lastActivity) - new Date(b.lastActivity));
      default:
        return sorted;
    }
  };

  // Filtrar y ordenar estudiantes
  const filteredAndSortedStudents = getSortedStudents(
    students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (student.firstName && student.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (student.lastName && student.lastName.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Por ahora, todos los alumnos se consideran "sin entregar" ya que no hay sistema de entregas
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'pending' && true) || 
                           (filterStatus === 'submitted' && false);
      
      return matchesSearch && matchesStatus;
    })
  );

  return (
    <div style={{ padding: '0' }}>
      {/* Header */}
      <div className={isMobile ? 'mobile-page-header' : ''} style={{ marginBottom: isMobile ? '1.5rem' : '2rem' }}>
        <h1 style={{
          fontSize: isMobile ? '1.5rem' : '2rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: '0 0 0.5rem 0'
        }}>
          Alumnos
        </h1>
        {!isMobile && (
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
            margin: 0
          }}>
            Gestión y seguimiento de estudiantes
          </p>
        )}
      </div>

      {/* Barra de acciones */}
      <div className={isMobile ? 'mobile-actions' : ''} style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        {/* Buscador */}
        <div className={isMobile ? 'mobile-search' : ''} style={{
          position: 'relative',
          flex: isMobile ? 'none' : '1',
          minWidth: isMobile ? '100%' : '300px',
          maxWidth: isMobile ? '100%' : '520px',
          width: isMobile ? '100%' : 'auto'
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

        {/* Filtros en fila para móvil */}
        {isMobile ? (
          <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  height: '44px',
                  width: '100%',
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
                <option value="all">Todos</option>
                <option value="submitted">Entregados</option>
                <option value="pending">Sin entregar</option>
              </select>
            </div>

            <div style={{ position: 'relative', flex: 1 }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  height: '44px',
                  width: '100%',
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
                <option value="name-asc">A - Z</option>
                <option value="name-desc">Z - A</option>
                <option value="activity-recent">Reciente</option>
                <option value="activity-old">Antigua</option>
              </select>
            </div>
          </div>
        ) : (
          <>
            {/* Filtro por estado de entrega */}
            <div style={{ position: 'relative' }}>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
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
                  backgroundPosition: 'right 1rem center',
                  minWidth: '150px'
                }}
              >
                <option value="all">Todos</option>
                <option value="submitted">Entregados</option>
                <option value="pending">Sin entregar</option>
              </select>
            </div>

            {/* Ordenar por */}
            <div style={{ position: 'relative' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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
                  backgroundPosition: 'right 1rem center',
                  minWidth: '180px'
                }}
              >
                <option value="name-asc">A - Z</option>
                <option value="name-desc">Z - A</option>
                <option value="activity-recent">Actividad reciente</option>
                <option value="activity-old">Actividad antigua</option>
              </select>
            </div>
          </>
        )}

        {/* Botón Agregar Alumno */}
        <button
          onClick={() => setModalOpen(true)}
          style={{
            height: '44px',
            width: isMobile ? '100%' : 'auto',
            padding: '0 1.5rem',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all var(--transition-fast)',
            whiteSpace: 'nowrap'
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
      <div className={isMobile ? 'mobile-table-responsive' : ''} style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        overflow: isMobile ? 'hidden' : 'hidden'
      }}>
        {/* Header de tabla (oculto en móvil) */}
        {!isMobile && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1.5fr 1fr 1fr 0.5fr',
            padding: '1rem 1.5rem',
            backgroundColor: 'var(--color-bg)',
            borderBottom: '1px solid var(--color-border)',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <div>Alumno</div>
            <div>Email</div>
            <div>Nivel</div>
            <div>XP</div>
            <div></div>
          </div>
        )}

        {/* Contenido de tabla */}
        <div style={{
          minHeight: isMobile ? '200px' : '300px'
        }}>
          {loading ? (
            <div style={{
              padding: isMobile ? '2rem 1rem' : '3rem',
              textAlign: 'center',
              color: 'var(--color-text-secondary)',
              fontSize: isMobile ? '0.8rem' : '0.875rem'
            }}>
              Cargando alumnos...
            </div>
          ) : filteredAndSortedStudents.length > 0 ? (
            filteredAndSortedStudents.map(student => (
              <StudentRow key={student.id} student={student} />
            ))
          ) : (
            <div style={{
              padding: isMobile ? '2rem 1rem' : '3rem',
              textAlign: 'center',
              color: 'var(--color-text-secondary)',
              fontSize: isMobile ? '0.8rem' : '0.875rem'
            }}>
              {searchTerm || filterStatus !== 'all' 
                ? 'No se encontraron alumnos con los filtros aplicados' 
                : 'No hay alumnos registrados aún'}
            </div>
          )}
        </div>
      </div>

      {/* Resumen */}
      <div style={{
        marginTop: '1rem',
        fontSize: isMobile ? '0.75rem' : '0.875rem',
        color: 'var(--color-text-secondary)'
      }}>
        Mostrando {filteredAndSortedStudents.length} de {students.length} alumnos
      </div>

      {/* Modal de agregar alumno */}
      <StudentFormModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onStudentAdded={loadStudents}
      />
    </div>
  );
};

export default Students;

