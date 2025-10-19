import React from 'react';
import { FiAward } from 'react-icons/fi';

/**
 * ActivityCard - Vista previa de una actividad en el carrusel
 */

const ActivityCard = ({ activity, showPoints = true }) => {
  // Configuración por tipo de actividad
  const activityConfig = {
    logic: {
      label: 'Lógica',
      icon: '🧩',
      color: '#1DD75B',
      bg: '#E8F5E9'
    },
    creativity: {
      label: 'Creatividad',
      icon: '🎨',
      color: '#E91E63',
      bg: '#FCE4EC'
    },
    writing: {
      label: 'Lengua',
      icon: '✏️',
      color: '#2196F3',
      bg: '#E3F2FD'
    }
  };

  const config = activityConfig[activity.type] || activityConfig.logic;

  return (
    <div style={{
      padding: 'var(--spacing-xl)',
      backgroundColor: 'var(--panel-bg)',
      borderRadius: 'var(--radius-lg)',
      border: `2px solid ${config.color}20`,
      minHeight: '280px',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-md)',
      transition: 'all 0.3s ease'
    }}>
      {/* Header con tipo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 'var(--spacing-sm)',
        borderBottom: `2px solid ${config.color}30`
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-sm)'
        }}>
          <span style={{ fontSize: '1.5rem' }}>{config.icon}</span>
          <span style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: config.color
          }}>
            {config.label}
          </span>
        </div>
        
        {showPoints && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)',
            padding: 'var(--spacing-xs) var(--spacing-sm)',
            backgroundColor: config.bg,
            borderRadius: 'var(--radius-md)',
            color: config.color,
            fontSize: 'var(--text-sm)',
            fontWeight: 700
          }}>
            <FiAward size={14} />
            <span>+{activity.points} pts</span>
          </div>
        )}
      </div>

      {/* Título */}
      <h3 style={{
        fontSize: 'var(--text-xl)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        margin: 0
      }}>
        {activity.title || 'Sin título'}
      </h3>

      {/* Descripción */}
      <p style={{
        fontSize: 'var(--text-base)',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        margin: 0,
        flex: 1
      }}>
        {activity.description || 'Sin descripción'}
      </p>
    </div>
  );
};

export default ActivityCard;
