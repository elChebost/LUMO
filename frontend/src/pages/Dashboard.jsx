import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrendingUp, FiTarget, FiCheckCircle } from 'react-icons/fi';
import StatCard from '../components/StatCard';
import MissionCard from '../components/MissionCard';

// ⚠️ Cambiado de 4000 a 3000 para coincidir con el backend
const API_URL = 'http://localhost:3000/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [activeMissions, setActiveMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

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

      // Estructura: { avgLogic, avgCreativity, avgWriting, activeMissionsCount, onlineStudentsCount, totalStudents }
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

  return (
    <div style={{ padding: '0' }}>
      {/* Header de la página - Removido según especificación (el título ya está en Navbar) */}

      {/* Fila de estadísticas (StatCards con barras horizontales) */}
      <div className={isMobile ? 'mobile-stats-grid' : ''} style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? 'var(--spacing-md)' : 'var(--spacing-lg)',
        marginBottom: isMobile ? 'var(--spacing-xl)' : 'var(--spacing-2xl)'
      }}>
        <StatCard
          label="Lógica"
          value={loading ? 0 : stats?.avgLogic || 0}
          max={100}
          color="var(--primary)"
          loading={loading}
          type="bar"
        />
        <StatCard
          label="Creatividad"
          value={loading ? 0 : stats?.avgCreativity || 0}
          max={100}
          color="#9C27B0"
          loading={loading}
          type="bar"
        />
        <StatCard
          label="Escritura"
          value={loading ? 0 : stats?.avgWriting || 0}
          max={100}
          color="#2196F3"
          loading={loading}
          type="bar"
        />
      </div>

      {/* Métricas adicionales: Misiones y Estudiantes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: isMobile ? 'var(--spacing-md)' : 'var(--spacing-lg)',
        marginBottom: isMobile ? 'var(--spacing-xl)' : 'var(--spacing-2xl)'
      }}>
        <StatCard
          icon={FiTarget}
          label="Misiones Activas"
          value={loading ? '...' : stats?.activeMissionsCount || 0}
          loading={loading}
          type="number"
        />
        <StatCard
          icon={FiCheckCircle}
          label="Total Estudiantes"
          value={loading ? '...' : stats?.totalStudents || 0}
          loading={loading}
          type="number"
        />
      </div>

      {/* Sección: Accesos rápidos */}
      <section style={{ marginBottom: isMobile ? 'var(--spacing-xl)' : 'var(--spacing-2xl)' }}>
        <h2 style={{
          fontSize: isMobile ? 'var(--text-lg)' : 'var(--text-xl)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: '0 0 var(--spacing-md) 0'
        }}>
          Accesos rápidos
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? 'var(--spacing-md)' : 'var(--spacing-lg)'
        }}>
          <button
            onClick={() => navigate('/students')}
            className="card"
            style={{
              padding: isMobile ? 'var(--spacing-lg)' : 'var(--spacing-xl)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              textAlign: 'left',
              border: 'none',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={{
              fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-xs) 0'
            }}>
              Gestionar Alumnos
            </h3>
            <p style={{
              fontSize: isMobile ? 'var(--text-xs)' : 'var(--text-sm)',
              color: 'var(--text-muted)',
              margin: 0
            }}>
              Ver lista completa y perfiles
            </p>
          </button>

          <button
            onClick={() => navigate('/missions')}
            className="card"
            style={{
              padding: isMobile ? 'var(--spacing-lg)' : 'var(--spacing-xl)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              textAlign: 'left',
              border: 'none',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={{
              fontSize: isMobile ? 'var(--text-base)' : 'var(--text-lg)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-xs) 0'
            }}>
              Crear Misión
            </h3>
            <p style={{
              fontSize: isMobile ? 'var(--text-xs)' : 'var(--text-sm)',
              color: 'var(--text-muted)',
              margin: 0
            }}>
              Asignar nuevas tareas al curso
            </p>
          </button>
        </div>
      </section>

      {/* Sección: Misiones activas */}
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
              <MissionCard key={mission.id} mission={mission} />
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
    </div>
  );
};

export default Dashboard;