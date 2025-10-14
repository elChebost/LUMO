import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrendingUp, FiTarget, FiCheckCircle } from 'react-icons/fi';
import StatCard from '../components/StatCard';
import MissionCard from '../components/MissionCard';

const API_URL = 'http://localhost:4000/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [activeMissions, setActiveMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Cargar estadísticas generales
      const statsRes = await fetch(`${API_URL}/stats`);
      const statsData = await statsRes.json();
      setStats(statsData);

      // Cargar misiones activas
      const missionsRes = await fetch(`${API_URL}/missions`);
      const missionsData = await missionsRes.json();
      const active = missionsData.filter(m => m.status === 'activa').slice(0, 3);
      setActiveMissions(active);

    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '0' }}>
      {/* Header de la página */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: '0 0 0.5rem 0'
        }}>
          Panel principal
        </h1>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)',
          margin: 0
        }}>
          Resumen general del curso y accesos rápidos
        </p>
      </div>

      {/* Fila de estadísticas (StatCards) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <StatCard
          icon={FiTrendingUp}
          label="XP Promedio"
          value={loading ? '...' : stats?.avgXP || 0}
          loading={loading}
        />
        <StatCard
          icon={FiTarget}
          label="Misiones Activas"
          value={loading ? '...' : stats?.activeMissions || 0}
          loading={loading}
        />
        <StatCard
          icon={FiCheckCircle}
          label="Total Alumnos"
          value={loading ? '...' : stats?.totalStudents || 0}
          loading={loading}
        />
      </div>

      {/* Sección: Accesos rápidos */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          margin: '0 0 1rem 0'
        }}>
          Accesos rápidos
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <button
            onClick={() => navigate('/students')}
            style={{
              padding: '1.5rem',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
              cursor: 'pointer',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 0.5rem 0'
            }}>
              Gestionar Alumnos
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              margin: 0
            }}>
              Ver lista completa y perfiles
            </p>
          </button>

          <button
            onClick={() => navigate('/missions')}
            style={{
              padding: '1.5rem',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
              cursor: 'pointer',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 0.5rem 0'
            }}>
              Crear Misión
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              margin: 0
            }}>
              Asignar nuevas tareas al curso
            </p>
          </button>

          <button
            onClick={() => navigate('/settings')}
            style={{
              padding: '1.5rem',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
              cursor: 'pointer',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 0.5rem 0'
            }}>
              Ver Estadísticas
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              margin: 0
            }}>
              Métricas y análisis del curso
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
          marginBottom: '1rem'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: 0
          }}>
            Misiones activas
          </h2>
          <button
            onClick={() => navigate('/missions')}
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-primary)',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'color var(--transition-fast)',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--color-primary-hover)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--color-primary)'}
          >
            Ver todas →
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          {loading ? (
            <>
              <MissionCard loading />
              <MissionCard loading />
              <MissionCard loading />
            </>
          ) : activeMissions.length > 0 ? (
            activeMissions.map(mission => (
              <MissionCard key={mission.id} mission={mission} />
            ))
          ) : (
            <p style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              color: 'var(--color-text-secondary)',
              fontSize: '0.875rem',
              padding: '2rem'
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

