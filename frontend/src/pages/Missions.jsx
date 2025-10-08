import React, { useState, useEffect } from 'react';
import { FiPlus, FiFilter, FiSearch } from 'react-icons/fi';
import MissionCard from '../components/MissionCard';
import MissionFormModal from '../components/MissionFormModal';

const API_URL = 'http://localhost:4000/api';

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadMissions();
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
    const matchesSearch = mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mission.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || mission.status === filterStatus;
    return matchesSearch && matchesStatus;
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
          Misiones
        </h1>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)',
          margin: 0
        }}>
          Administra las misiones del curso
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
          maxWidth: '400px'
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
          gap: '0.5rem'
        }}>
          <FiFilter size={18} style={{ color: 'var(--color-text-secondary)' }} />
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
              backgroundPosition: 'right 1rem center'
            }}
          >
            <option value="all">Todas las misiones</option>
            <option value="activa">Activas</option>
            <option value="cerrada">Cerradas</option>
          </select>
        </div>

        {/* Botón Crear Misión */}
        <button
          onClick={() => setShowModal(true)}
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
          <FiPlus size={18} />
          Crear Misión
        </button>
      </div>

      {/* Grid de misiones */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1rem'
      }}>
        {loading ? (
          <>
            <MissionCard loading />
            <MissionCard loading />
            <MissionCard loading />
            <MissionCard loading />
            <MissionCard loading />
            <MissionCard loading />
          </>
        ) : filteredMissions.length > 0 ? (
          filteredMissions.map(mission => (
            <MissionCard key={mission.id} mission={mission} />
          ))
        ) : (
          <div style={{
            gridColumn: '1 / -1',
            padding: '3rem',
            textAlign: 'center',
            backgroundColor: 'var(--color-card-bg)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)'
          }}>
            <p style={{
              color: 'var(--color-text-secondary)',
              fontSize: '0.875rem',
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
            Mostrando {filteredMissions.length} de {missions.length} misiones
          </p>
        </div>
      )}

      {/* Modal para crear misión */}
      {showModal && (
        <MissionFormModal
          onClose={() => setShowModal(false)}
          onMissionCreated={loadMissions}
        />
      )}
    </div>
  );
};

export default Missions;

