import React, { useState, useEffect } from 'react';
import { FiSearch, FiUserPlus } from 'react-icons/fi';
import StudentRow from '../components/StudentRow';
import StudentFormModal from '../components/StudentFormModal';
import StudentDetailModal from '../components/StudentDetailModal';
import TutorialModal from '../components/TutorialModal';
import useTutorialModal from '../hooks/useTutorialModal';
import { API_URL } from '../config/api.js';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // Búsqueda por CI
  const [filterLetter, setFilterLetter] = useState(''); // Filtro A-Z
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Hook para modal de tutorial (tecla "T")
  const { showModal: showTutorialModal, setShowModal: setShowTutorialModal } = useTutorialModal();

  useEffect(() => {
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
      // ✅ Usar el nuevo endpoint con filtros query params
      let url = `${API_URL}/students`;
      const params = new URLSearchParams();
      
      if (filterLetter) {
        params.append('filter', filterLetter);
      }
      if (searchTerm) {
        params.append('search', searchTerm); // Búsqueda por CI
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error cargando alumnos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Recargar cuando cambien los filtros
  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterLetter, searchTerm]);

  // Estudiantes ordenados alfabéticamente (A-Z por defecto)
  const filteredAndSortedStudents = [...students].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  const handleStudentClick = async (studentId) => {
    try {
      const response = await fetch(`${API_URL}/data/student/${studentId}`);
      const studentData = await response.json();
      setSelectedStudent(studentData);
      setDetailModalOpen(true);
    } catch (error) {
      console.error('Error obteniendo datos del estudiante:', error);
    }
  };

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
      <div className="students-filters" style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        {/* Buscador */}
        <div style={{
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
            className="students-search-input"
            placeholder="Buscar por CI (ej: 1234567-8)..."
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

        {/* Filtro A-Z */}
        <div style={{ position: 'relative' }}>
          <select
            className="students-filter-select"
            value={filterLetter}
            onChange={(e) => setFilterLetter(e.target.value)}
            style={{
              height: '44px',
              padding: '0 2.5rem 0 var(--spacing-md)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              backgroundColor: 'var(--panel-bg)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23757575' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              minWidth: isMobile ? '100%' : '150px',
              width: isMobile ? '100%' : 'auto'
            }}
          >
            <option value="">Todas las letras</option>
            {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map(letter => (
              <option key={letter} value={letter}>{letter}</option>
            ))}
          </select>
        </div>

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
      <div className={`students-table ${isMobile ? 'mobile-table-responsive' : ''}`} style={{
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
            gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 0.5fr',
            padding: 'var(--spacing-md) var(--spacing-xl)',
            backgroundColor: 'var(--bg-page)',
            borderBottom: '1px solid var(--border-color)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <div>Alumno</div>
            <div>Email</div>
            <div>Estado</div>
            <div>Progreso</div>
            <div>Nivel</div>
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
              <StudentRow 
                key={student.id} 
                student={student} 
                onClick={() => handleStudentClick(student.id)}
              />
            ))
          ) : (
            <div style={{
              padding: isMobile ? '2rem 1rem' : '3rem',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: isMobile ? 'var(--text-xs)' : 'var(--text-sm)'
            }}>
              {searchTerm || filterLetter 
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

      {/* Modal de detalle del alumno */}
      <StudentDetailModal
        student={selectedStudent}
        isOpen={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedStudent(null);
        }}
      />

      {/* Modal de Tutorial - Se abre con tecla "T" */}
      <TutorialModal 
        isOpen={showTutorialModal} 
        onClose={() => setShowTutorialModal(false)} 
      />
    </div>
  );
};

export default Students;

