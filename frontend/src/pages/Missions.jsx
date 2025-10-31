import React, { useState, useEffect } from 'react';
import { FiPlus, FiFilter, FiSearch } from 'react-icons/fi';
import MissionCard from '../components/MissionCard';
import MissionModal from '../components/MissionModal';
import TutorialModal from '../components/TutorialModal';
import useTutorialModal from '../hooks/useTutorialModal';
import { API_URL } from '../config/api.js';

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'create'

  // ✅ Hook para modal de tutorial (tecla "T")
  const { showModal: showTutorialModal, setShowModal: setShowTutorialModal } = useTutorialModal();

  useEffect(() => {
    loadMissions();
    
    // Detectar móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const loadMissions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/missions`);
      const data = await response.json();
      setMissions(data);
    } catch (error) {
      console.error('Error cargando misiones:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar misiones
  const filteredMissions = missions.filter(mission => {
    const matchesSearch = mission.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mission.descripcionBreve.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || mission.estado === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Handler para abrir modal de vista/edición
  const handleMissionClick = (mission) => {
    setSelectedMission(mission);
    setModalMode('view');
    setShowModal(true);
  };

  // Handler para crear nueva misión
  const handleCreateMission = () => {
    setSelectedMission(null);
    setModalMode('create');
    setShowModal(true);
  };

  // Handler para cerrar modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMission(null);
    setModalMode('view');
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
          Misiones
        </h1>
        {!isMobile && (
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
            margin: 0
          }}>
            Administra las misiones del curso
          </p>
        )}
      </div>

      {/* Barra de acciones */}
      <div className="missions-filters" style={{
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
          maxWidth: isMobile ? '100%' : '400px',
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
            className="missions-search-input"
            placeholder="Buscar misiones..."
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

        {/* Filtro por estado */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          width: isMobile ? '100%' : 'auto'
        }}>
          {!isMobile && <FiFilter size={18} style={{ color: 'var(--color-text-secondary)' }} />}
          <select
            className="missions-filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              height: '44px',
              width: isMobile ? '100%' : 'auto',
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
            <option value="all">Todas las misiones</option>
            <option value="activa">Activas</option>
            <option value="proxima">Próximas</option>
            <option value="inactiva">Inactivas</option>
            <option value="finalizada">Finalizadas</option>
          </select>
        </div>

        {/* Botón Crear Misión */}
        <button
          className="missions-create-btn"
          onClick={handleCreateMission}
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
            transition: 'all var(--transition-fast)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap',
            marginLeft: isMobile ? '0' : 'auto'
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
          <FiPlus size={18} />
          Crear Misión
        </button>
      </div>

      {/* Grid de misiones - Responsive: 3 cols → 2 cols → 1 col */}
      <div className="missions-grid" style={{
        display: 'grid',
        gridTemplateColumns: isMobile 
          ? '1fr' 
          : window.innerWidth >= 1024 
            ? 'repeat(3, 1fr)' 
            : 'repeat(2, 1fr)',
        gap: 'var(--spacing-lg)',
        justifyItems: 'center'
      }}>
        {loading ? (
          <>
            <MissionCard loading />
            {!isMobile && <MissionCard loading />}
            {!isMobile && <MissionCard loading />}
            {window.innerWidth >= 1024 && (
              <>
                <MissionCard loading />
                <MissionCard loading />
                <MissionCard loading />
              </>
            )}
          </>
        ) : filteredMissions.length > 0 ? (
          filteredMissions.map(mission => (
            <MissionCard 
              key={mission.id} 
              mission={mission}
              onClick={handleMissionClick}
            />
          ))
        ) : (
          <div style={{
            gridColumn: '1 / -1',
            padding: isMobile ? '2rem 1rem' : '3rem',
            textAlign: 'center',
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)'
          }}>
            <p style={{
              color: 'var(--color-text-secondary)',
              fontSize: isMobile ? '0.8rem' : '0.875rem',
              margin: 0
            }}>
              {searchTerm || filterStatus !== 'all'
                ? 'No se encontraron misiones con esos criterios'
                : 'No hay misiones creadas aún'}
            </p>
          </div>
        )}
      </div>

      {/* Footer con información */}
      {!loading && filteredMissions.length > 0 && (
        <div style={{
          marginTop: '1.5rem',
          padding: isMobile ? '0.75rem 0' : '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <p style={{
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            color: 'var(--color-text-secondary)',
            margin: 0
          }}>
            Mostrando {filteredMissions.length} de {missions.length} misiones
          </p>
        </div>
      )}

      {/* Modal unificado para ver/crear/editar */}
      <MissionModal
        mission={selectedMission}
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={loadMissions}
        mode={modalMode}
      />

      {/* Modal de Tutorial - Se abre con tecla "T" */}
      <TutorialModal 
        isOpen={showTutorialModal} 
        onClose={() => setShowTutorialModal(false)} 
      />
    </div>
  );
};

export default Missions;

