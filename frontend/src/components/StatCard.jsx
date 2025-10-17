import React from 'react';

const StatCard = ({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  loading = false,
  type = 'number', // 'number' o 'bar'
  max = 100, // valor máximo para barras
  color = 'var(--primary)' // color de la barra
}) => {
  // Loading state para barra horizontal
  if (loading && type === 'bar') {
    return (
      <div className="card" style={{
        padding: 'var(--spacing-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-sm)'
      }}>
        <div style={{
          width: '40%',
          height: '14px',
          borderRadius: '4px',
          backgroundColor: 'var(--bg-page)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        <div style={{
          width: '100%',
          height: '18px',
          borderRadius: '9px',
          backgroundColor: 'var(--bg-page)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
      </div>
    );
  }

  // Loading state para número
  if (loading && type === 'number') {
    return (
      <div className="card" style={{
        padding: 'var(--spacing-lg)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-md)'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-page)',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        <div style={{ flex: 1 }}>
          <div style={{
            width: '60%',
            height: '12px',
            borderRadius: '4px',
            backgroundColor: 'var(--bg-page)',
            marginBottom: 'var(--spacing-sm)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
          <div style={{
            width: '80%',
            height: '24px',
            borderRadius: '4px',
            backgroundColor: 'var(--bg-page)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
        </div>
      </div>
    );
  }

  // Renderizado de barra horizontal
  if (type === 'bar') {
    const percentage = Math.min((value / max) * 100, 100);
    
    return (
      <div className="card" style={{
        padding: 'var(--spacing-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-sm)',
        transition: 'all 0.2s ease'
      }}>
        {/* Label y valor */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--text-primary)'
          }}>
            {label}
          </span>
          <span style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: 'var(--text-muted)'
          }}>
            {Math.round(value)}/{max}
          </span>
        </div>

        {/* Barra de progreso */}
        <div style={{
          width: '100%',
          height: '18px',
          backgroundColor: 'var(--bg-page)',
          borderRadius: '9px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: '9px',
            transition: 'width 0.8s ease-out'
          }} />
        </div>
      </div>
    );
  }

  // Renderizado de número con ícono (default)
  return (
    <div className="card" style={{
      padding: 'var(--spacing-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-md)',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
    }}
    >
      {/* Ícono a la izquierda */}
      {Icon && (
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(29, 215, 91, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
          flexShrink: 0
        }}>
          <Icon size={24} />
        </div>
      )}

      {/* Valor y label */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 500,
          color: 'var(--text-muted)',
          margin: '0 0 var(--spacing-xs) 0',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {label}
        </p>
        
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 'var(--spacing-sm)'
        }}>
          <p style={{
            fontSize: '1.75rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: 1
          }}>
            {value}
          </p>
          
          {trend && (
            <span style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: trend > 0 ? 'var(--success)' : 'var(--danger)'
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

