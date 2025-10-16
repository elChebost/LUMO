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
  const missionsCompleted = missions.length;

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

  // Vista desktop: tabla (original)
  return (
    <div
      onClick={handleClick}
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.5fr 1fr 1fr 0.5fr',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid var(--color-border)',
        cursor: 'pointer',
        transition: 'background-color var(--transition-fast)',
        alignItems: 'center'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-bg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {/* Avatar y nombre */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
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
        <div style={{ minWidth: 0 }}>
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
        </div>
      </div>

      {/* Email */}
      <div>
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-secondary)',
          margin: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {email}
        </p>
      </div>

      {/* Nivel */}
      <div>
        <div style={{
          display: 'inline-block',
          padding: '0.25rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(46, 125, 50, 0.1)',
          border: '1px solid rgba(46, 125, 50, 0.2)',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--color-primary)'
        }}>
          Nv. {level}
        </div>
      </div>

      {/* XP */}
      <div>
        <p style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          margin: 0
        }}>
          {xp} XP
        </p>
      </div>

      {/* Indicador visual */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <span style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1rem'
        }}>
          →
        </span>
      </div>
    </div>
  );
};

export default StudentRow;