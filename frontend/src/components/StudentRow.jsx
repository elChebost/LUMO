import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentRow = ({ student, loading = false }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <tr style={{
        height: '64px',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <td style={{ padding: '1rem' }}>
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
        </td>
        <td style={{ padding: '1rem' }}>
          <div style={{
            width: '60px',
            height: '24px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-bg)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
        </td>
        <td style={{ padding: '1rem' }}>
          <div style={{
            width: '50px',
            height: '14px',
            borderRadius: '4px',
            backgroundColor: 'var(--color-bg)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
        </td>
        <td style={{ padding: '1rem' }}>
          <div style={{
            width: '40px',
            height: '14px',
            borderRadius: '4px',
            backgroundColor: 'var(--color-bg)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
        </td>
        <td style={{ padding: '1rem' }}>
          <div style={{
            width: '70px',
            height: '14px',
            borderRadius: '4px',
            backgroundColor: 'var(--color-bg)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
        </td>
      </tr>
    );
  }

  const { id, name, email, level, xp, missions = [] } = student || {};
  const missionsCompleted = missions.length;

  const handleClick = () => {
    if (id) {
      navigate(`/students/${id}`);
    }
  };

  return (
    <tr
      onClick={handleClick}
      style={{
        height: '64px',
        borderBottom: '1px solid var(--color-border)',
        cursor: 'pointer',
        transition: 'background-color var(--transition-fast)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-bg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {/* Avatar y nombre */}
      <td style={{ padding: '1rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <img
            src="/avatar.png"
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
        </div>
      </td>

      {/* Nivel */}
      <td style={{ padding: '1rem' }}>
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
      </td>

      {/* XP */}
      <td style={{ padding: '1rem' }}>
        <p style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          margin: 0
        }}>
          {xp} XP
        </p>
      </td>

      {/* Misiones completadas */}
      <td style={{ padding: '1rem' }}>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-primary)',
          margin: 0
        }}>
          {missionsCompleted}
        </p>
      </td>

      {/* Última actividad */}
      <td style={{ padding: '1rem' }}>
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--color-text-secondary)',
          margin: 0
        }}>
          Hace 2 días
        </p>
      </td>
    </tr>
  );
};

export default StudentRow;
