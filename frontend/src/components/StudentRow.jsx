import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentRow = ({ student, loading = false, onClick }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (loading) {
    return (
      <div style={{
        padding: isMobile ? '1rem' : '1rem 1.5rem',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-bg)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
          <div style={{ flex: 1 }}>
            <div style={{
              width: '120px',
              height: '14px',
              borderRadius: '4px',
              backgroundColor: 'var(--color-bg)',
              marginBottom: '0.25rem',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} />
            <div style={{
              width: '160px',
              height: '12px',
              borderRadius: '4px',
              backgroundColor: 'var(--color-bg)',
              animation: 'pulse 1.5s ease-in-out infinite'
            }} />
          </div>
        </div>
      </div>
    );
  }

  const { id, name, email, level, xp, missions = [] } = student || {};
  const missionsCount = missions.length;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (id) {
      navigate(`/students/${id}`);
    }
  };

  if (isMobile) {
    // Vista móvil: card compacta
    return (
      <div
        onClick={handleClick}
        style={{
          padding: '1rem',
          borderBottom: '1px solid var(--color-border)',
          cursor: 'pointer',
          transition: 'background-color var(--transition-fast)'
        }}
        onTouchStart={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-bg)';
        }}
        onTouchEnd={(e) => {
          setTimeout(() => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }, 200);
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.5rem'
        }}>
          <img
            src={student?.profile?.avatar || "/src/assets/avatar.png"}
            alt={name}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid var(--color-primary)',
              objectFit: 'cover',
              flexShrink: 0
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {name}
            </p>
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-secondary)',
              margin: '0.125rem 0 0 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {email}
            </p>
          </div>
          <div style={{
            display: 'inline-block',
            padding: '0.25rem 0.625rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(46, 125, 50, 0.1)',
            border: '1px solid rgba(46, 125, 50, 0.2)',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'var(--color-primary)',
            whiteSpace: 'nowrap'
          }}>
            Nv. {level}
          </div>
        </div>
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginLeft: '48px',
          fontSize: '0.75rem',
          color: 'var(--color-text-secondary)'
        }}>
          <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
            {xp} XP
          </span>
          <span>•</span>
          <span>{missionsCompleted} misiones</span>
        </div>
      </div>
    );
  }

  // Vista desktop: tabla con nuevas columnas (Estado y Progreso)
  const isOnline = student?.isOnline || false;
  const missionsCompleted = student?.missionsCompleted || 0;
  const totalMissions = 6; // Por ahora hardcoded, luego vendrá del backend
  
  return (
    <div
      onClick={handleClick}
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr 0.5fr',
        padding: 'var(--spacing-md) var(--spacing-xl)',
        borderBottom: '1px solid var(--border-color)',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease',
        alignItems: 'center'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-page)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {/* Avatar y nombre */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-md)'
      }}>
        <img
          src={student?.profile?.avatar || "/src/assets/avatar.png"}
          alt={name}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: `2px solid var(--primary)`,
            objectFit: 'cover',
            flexShrink: 0
          }}
        />
        <div style={{ minWidth: 0 }}>
          <p style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {name}
          </p>
        </div>
      </div>

      {/* Email */}
      <div>
        <p style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
          margin: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {email}
        </p>
      </div>

      {/* Estado (nuevo) */}
      <div>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--spacing-xs)',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: isOnline ? 'rgba(29, 215, 91, 0.1)' : 'rgba(158, 158, 158, 0.1)',
          border: `1px solid ${isOnline ? 'rgba(29, 215, 91, 0.3)' : 'rgba(158, 158, 158, 0.3)'}`,
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: isOnline ? 'var(--primary)' : 'var(--text-muted)'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: isOnline ? 'var(--primary)' : 'var(--text-muted)'
          }} />
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      {/* Progreso (nuevo) */}
      <div>
        <p style={{
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: 0
        }}>
          {missionsCompleted}/{totalMissions}
        </p>
      </div>

      {/* Nivel */}
      <div>
        <div style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(29, 215, 91, 0.1)',
          border: '1px solid rgba(29, 215, 91, 0.2)',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'var(--primary)'
        }}>
          Nv. {level}
        </div>
      </div>

      {/* Indicador visual */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <span style={{
          color: 'var(--text-muted)',
          fontSize: '1rem'
        }}>
          →
        </span>
      </div>
    </div>
  );
};

export default StudentRow;