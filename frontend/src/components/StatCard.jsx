import React from 'react';

const StatCard = ({ label, value, icon: Icon, trend, loading = false }) => {
  if (loading) {
    return (
      <div style={{
        minWidth: '240px',
        height: '120px',
        backgroundColor: 'var(--color-card-bg)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-bg)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        <div style={{ flex: 1 }}>
          <div style={{
            width: '60%',
            height: '12px',
            borderRadius: '4px',
            backgroundColor: 'var(--color-bg)',
            marginBottom: '0.5rem',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
          <div style={{
            width: '80%',
            height: '24px',
            borderRadius: '4px',
            backgroundColor: 'var(--color-bg)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minWidth: '240px',
      height: '120px',
      backgroundColor: 'var(--color-card-bg)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'all var(--transition-fast)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
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
      {/* Ícono a la izquierda */}
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-primary)',
        flexShrink: 0
      }}>
        {Icon && <Icon size={24} />}
      </div>

      {/* Valor y label */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: '0.75rem',
          fontWeight: 500,
          color: 'var(--color-text-secondary)',
          margin: '0 0 0.25rem 0',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {label}
        </p>
        
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.5rem'
        }}>
          <p style={{
            fontSize: '1.75rem',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            margin: 0,
            lineHeight: 1
          }}>
            {value}
          </p>
          
          {trend && (
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: trend > 0 ? 'var(--color-success)' : 'var(--color-danger)'
            }}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

