import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentCard = ({ student, loading = false }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: 'var(--radius-md)',
        padding: '0.75rem',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        minWidth: '140px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-bg)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        <div style={{
          width: '80%',
          height: '12px',
          borderRadius: '4px',
          backgroundColor: 'var(--color-bg)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        <div style={{
          width: '50%',
          height: '16px',
          borderRadius: '6px',
          backgroundColor: 'var(--color-bg)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
      </div>
    );
  }

  const { id, name, level, xp } = student || {};

  const handleClick = () => {
    if (id) {
      navigate(`/students/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: 'var(--radius-md)',
        padding: '0.75rem',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all var(--transition-fast)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        minWidth: '140px'
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
      {/* Avatar */}
      <img
        src="/assets/avatar.png"
        alt={name}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid var(--color-primary)',
          objectFit: 'cover'
        }}
      />

      {/* Nombre */}
      <p style={{
        fontSize: '0.875rem',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        margin: 0,
        textAlign: 'center',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        {name}
      </p>

      {/* Badge de nivel */}
      <div style={{
        padding: '0.25rem 0.625rem',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        border: '1px solid rgba(46, 125, 50, 0.2)',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
      }}>
        <span>Nv. {level}</span>
      </div>

      {/* XP */}
      {xp !== undefined && (
        <p style={{
          fontSize: '0.6875rem',
          color: 'var(--color-text-secondary)',
          margin: 0
        }}>
          {xp} XP
        </p>
      )}
    </div>
  );
};

export default StudentCard;

