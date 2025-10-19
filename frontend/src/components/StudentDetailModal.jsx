import React from 'react';
import { FiMail, FiUser, FiTrendingUp, FiStar, FiCalendar } from 'react-icons/fi';

const StudentDetailModal = ({ student, isOpen, onClose }) => {
  if (!isOpen || !student) return null;

  // Calcular datos del estudiante
  const statLogic = student.statLogic || 0;
  const statCreativity = student.statCreativity || 0;
  const statWriting = student.statWriting || 0;
  const avgTimeMinutes = student.avgTimeMinutes || 0;
  const missionsCompleted = student.missionsCompleted || 0;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: 'var(--spacing-md)',
        cursor: 'pointer'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--panel-bg)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-2xl)',
          maxWidth: '720px',
          width: '100%',
          maxHeight: '85vh',
          overflow: 'auto',
          boxShadow: 'var(--shadow-strong)',
          position: 'relative',
          cursor: 'default'
        }}
      >

        {/* Header con Avatar y Nombre */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-xl)',
          marginBottom: 'var(--spacing-2xl)',
          paddingBottom: 'var(--spacing-xl)',
          borderBottom: `1px solid var(--border-color)`
        }}>
          {/* Avatar 72px */}
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: `3px solid var(--primary)`,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-page)'
          }}>
            <img
              src={student.profile?.avatar || '/src/assets/avatar.png'}
              alt={`Avatar de ${student.name}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Nombre y estadísticas rápidas */}
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-xs) 0'
            }}>
              {student.name}
            </h2>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-muted)',
              margin: 0
            }}>
              {student.email}
            </p>
          </div>

          {/* Métricas inline */}
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-xl)',
            fontSize: 'var(--text-sm)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 600,
                color: 'var(--primary)'
              }}>
                {avgTimeMinutes}'
              </div>
              <div style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-muted)',
                textTransform: 'uppercase'
              }}>
                Tiempo prom.
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 600,
                color: 'var(--primary)'
              }}>
                {missionsCompleted}
              </div>
              <div style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-muted)',
                textTransform: 'uppercase'
              }}>
                Completadas
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal: Stats Chart */}
        <div style={{
          marginBottom: 'var(--spacing-2xl)'
        }}>
          <h3 style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: '0 0 var(--spacing-lg) 0'
          }}>
            Habilidades
          </h3>

          {/* Chart con 3 barras verticales */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--spacing-xl)',
            padding: 'var(--spacing-xl)',
            backgroundColor: 'var(--bg-page)',
            borderRadius: 'var(--radius-lg)'
          }}>
            {/* Lógica */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-sm)'
            }}>
              <div style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Lógica
              </div>
              <div style={{
                width: '60px',
                height: '180px',
                backgroundColor: 'rgba(29, 215, 91, 0.1)',
                borderRadius: 'var(--radius-md)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '100%',
                  height: `${(statLogic / 100) * 100}%`,
                  backgroundColor: 'var(--primary)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'height 0.8s ease-out'
                }} />
              </div>
              <div style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 600,
                color: 'var(--primary)'
              }}>
                {statLogic}
              </div>
            </div>

            {/* Creatividad */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-sm)'
            }}>
              <div style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Creatividad
              </div>
              <div style={{
                width: '60px',
                height: '180px',
                backgroundColor: 'rgba(156, 39, 176, 0.1)',
                borderRadius: 'var(--radius-md)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '100%',
                  height: `${(statCreativity / 100) * 100}%`,
                  backgroundColor: '#9C27B0',
                  borderRadius: 'var(--radius-md)',
                  transition: 'height 0.8s ease-out'
                }} />
              </div>
              <div style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 600,
                color: '#9C27B0'
              }}>
                {statCreativity}
              </div>
            </div>

            {/* Lengua */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-sm)'
            }}>
              <div style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                Lengua
              </div>
              <div style={{
                width: '60px',
                height: '180px',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                borderRadius: 'var(--radius-md)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '100%',
                  height: `${(statWriting / 100) * 100}%`,
                  backgroundColor: '#2196F3',
                  borderRadius: 'var(--radius-md)',
                  transition: 'height 0.8s ease-out'
                }} />
              </div>
              <div style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 600,
                color: '#2196F3'
              }}>
                {statWriting}
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional simplificada */}
        <div>
          <h3 style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: '0 0 var(--spacing-md) 0'
          }}>
            Información
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--spacing-md)'
          }}>
            {/* Nivel */}
            <div className="card" style={{
              padding: 'var(--spacing-md)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)'
            }}>
              <FiTrendingUp size={20} color="var(--primary)" />
              <div>
                <div style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  Nivel
                </div>
                <div style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}>
                  {student.level}
                </div>
              </div>
            </div>

            {/* XP */}
            <div className="card" style={{
              padding: 'var(--spacing-md)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)'
            }}>
              <FiStar size={20} color="#FF8F00" />
              <div>
                <div style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  Experiencia
                </div>
                <div style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}>
                  {student.xp} XP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;