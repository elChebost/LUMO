import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiTarget, FiUsers, FiCheckCircle } from 'react-icons/fi';
import StatCard from '../components/StatCard';
import MissionCard from '../components/MissionCard';
import MissionPreviewModal from '../components/MissionPreviewModal';
import { API_URL } from '../config/api.js';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [activeMissions, setActiveMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [showMissionPreview, setShowMissionPreview] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    loadDashboardData();
    
    // Detectar móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // ✅ Usar el nuevo endpoint /dashboard que incluye todas las stats
      const dashboardRes = await fetch(`${API_URL}/dashboard`);
      const dashboardData = await dashboardRes.json();

      // Estructura: { avgLogic, avgCreativity, avgLanguage, activeMissionsCount, onlineStudentsCount, totalStudents, avgTimeMinutes }
      setStats(dashboardData);

      // Cargar misiones activas
      const missionsActiveRes = await fetch(`${API_URL}/missions/active`);
      const missionsActiveData = await missionsActiveRes.json();
      
      // ✅ Mapear status de "active" a "activa" para el frontend
      const activeMissionsWithStatus = missionsActiveData.map(m => ({
        ...m,
        status: m.status === 'active' ? 'activa' : 'cerrada'
      })).slice(0, 3);
      
      setActiveMissions(activeMissionsWithStatus);

    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMissionClick = (mission) => {
    setSelectedMission(mission);
    setShowMissionPreview(true);
  };

  return (
    <div style={{ padding: '0' }}>
      {/* Saludo personalizado */}
      <div style={{ marginBottom: isMobile ? 'var(--spacing-lg)' : 'var(--spacing-xl)' }}>
        <h1 style={{
          fontSize: isMobile ? 'var(--text-2xl)' : '2.25rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: '0 0 var(--spacing-xs) 0'
        }}>
          Bienvenido, {user.name || 'Profesor'}
        </h1>
        <p style={{
          fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)',
          color: 'var(--text-muted)',
          margin: 0
        }}>
          Resumen de la actividad de tus estudiantes
        </p>
      </div>

      {/* Layout principal: Izquierda (stats barras) + Derecha (métricas) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr',
        gap: isMobile ? 'var(--spacing-md)' : 'var(--spacing-lg)',
        marginBottom: isMobile ? 'var(--spacing-xl)' : 'var(--spacing-2xl)'
      }}>
        {/* IZQUIERDA: Tarjeta única con 3 barras horizontales */}
        <div className="card" style={{
          padding: isMobile ? 'var(--spacing-lg)' : 'var(--spacing-xl)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-md)'
        }}>
          <h3 style={{
            fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: '0 0 var(--spacing-sm) 0'
          }}>
            Promedio de Habilidades
          </h3>

          {/* Barra Lógica */}
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-xs)',
              fontSize: 'var(--text-base)',
              fontWeight: 600
            }}>
              <span style={{ color: 'var(--text-primary)' }}>🧩 Lógica</span>
              <span style={{ color: '#1DD75B', fontWeight: 700, fontSize: 'var(--text-lg)' }}>
                {loading ? '...' : `${stats?.avgLogic || 0}%`}
              </span>
            </div>
            <div style={{
              height: '24px',
              backgroundColor: '#E8F5E9',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #C8E6C9'
            }}>
              <div style={{
                height: '100%',
                width: `${loading ? 0 : stats?.avgLogic || 0}%`,
                backgroundColor: '#1DD75B',
                transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(29, 215, 91, 0.3)'
              }} />
            </div>
          </div>

          {/* Barra Creatividad */}
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-xs)',
              fontSize: 'var(--text-base)',
              fontWeight: 600
            }}>
              <span style={{ color: 'var(--text-primary)' }}>🎨 Creatividad</span>
              <span style={{ color: '#E91E63', fontWeight: 700, fontSize: 'var(--text-lg)' }}>
                {loading ? '...' : `${stats?.avgCreativity || 0}%`}
              </span>
            </div>
            <div style={{
              height: '24px',
              backgroundColor: '#FCE4EC',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #F8BBD0'
            }}>
              <div style={{
                height: '100%',
                width: `${loading ? 0 : stats?.avgCreativity || 0}%`,
                backgroundColor: '#E91E63',
                transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(233, 30, 99, 0.3)'
              }} />
            </div>
          </div>

          {/* Barra Lengua */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-xs)',
              fontSize: 'var(--text-base)',
              fontWeight: 600
            }}>
              <span style={{ color: 'var(--text-primary)' }}>✏️ Lengua</span>
              <span style={{ color: '#2196F3', fontWeight: 700, fontSize: 'var(--text-lg)' }}>
                {loading ? '...' : `${stats?.avgLanguage || 0}%`}
              </span>
            </div>
            <div style={{
              height: '24px',
              backgroundColor: '#E3F2FD',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #BBDEFB'
            }}>
              <div style={{
                height: '100%',
                width: `${loading ? 0 : stats?.avgLanguage || 0}%`,
                backgroundColor: '#2196F3',
                transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)'
              }} />
            </div>
          </div>
        </div>

        {/* DERECHA: 4 tarjetas de métricas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? 'var(--spacing-md)' : 'var(--spacing-md)'
        }}>
          {/* Tiempo promedio */}
          <StatCard
            icon={FiClock}
            label="Tiempo promedio"
            value={loading ? '...' : `${stats?.avgTimeMinutes || 0} min`}
            loading={loading}
            type="number"
          />
          {/* Misiones activas */}
          <StatCard
            icon={FiTarget}
            label="Misiones Activas"
            value={loading ? '...' : stats?.activeMissionsCount || 0}
            loading={loading}
            type="number"
          />
          {/* Estudiantes en línea */}
          <StatCard
            icon={FiUsers}
            label="Estudiantes en línea"
            value={loading ? '...' : stats?.onlineStudentsCount || 0}
            loading={loading}
            type="number"
          />
          {/* Total estudiantes */}
          <StatCard
            icon={FiCheckCircle}
            label="Total Estudiantes"
            value={loading ? '...' : stats?.totalStudents || 0}
            loading={loading}
            type="number"
          />
        </div>
      </div>

      {/* Sección "Accesos rápidos" removida según feedback Sprint 9 */}

      {/* Sección: Misiones activas (ahora clickeables para abrir modal) */}
      <section>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--spacing-md)'
        }}>
          <h2 style={{
            fontSize: isMobile ? 'var(--text-lg)' : 'var(--text-xl)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: 0
          }}>
            Misiones activas
          </h2>
          <button
            onClick={() => navigate('/missions')}
            style={{
              fontSize: isMobile ? 'var(--text-xs)' : 'var(--text-sm)',
              color: 'var(--primary)',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'opacity 0.15s ease',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 'var(--spacing-xs) var(--spacing-sm)'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.7'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            Ver todas →
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: isMobile ? 'var(--spacing-md)' : 'var(--spacing-lg)'
        }}>
          {loading ? (
            <>
              <MissionCard loading />
              {!isMobile && <MissionCard loading />}
              {!isMobile && <MissionCard loading />}
            </>
          ) : activeMissions.length > 0 ? (
            activeMissions.map(mission => (
              <MissionCard 
                key={mission.id} 
                mission={mission}
                onClick={() => handleMissionClick(mission)}
              />
            ))
          ) : (
            <p style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: isMobile ? 'var(--text-xs)' : 'var(--text-sm)',
              padding: isMobile ? 'var(--spacing-xl)' : 'var(--spacing-2xl)'
            }}>
              No hay misiones activas en este momento
            </p>
          )}
        </div>
      </section>

      {/* Modal de preview de misión */}
      {showMissionPreview && selectedMission && (
        <MissionPreviewModal
          mission={selectedMission}
          onClose={() => {
            setShowMissionPreview(false);
            setSelectedMission(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;